---
layout: post
title: "关于android4.0中访问网络不能在主线程中进行"
date: 2015-7-4
categories: [线程，Android]
---

关于android4.0中访问网络不能在主线程中进行

<!-- more -->

##一、谷歌在4.0系统以后就禁止在主线程中进行网络访问了，原因是：

**主线程是负责UI的响应，如果在主线程进行网络访问，超过5秒的话就会引发强制关闭，所以这种耗时的操作不能放在主线程里。放在子线程里，而子线程里是不能对主线程的UI进行改变的，因此就引出了Handler,主线程里定义Handler,子线程里使用。**


**在Android4.0以后，会发现，只要是写在主线程（就是Activity）中的HTTP请求，运行时都会报错，这是因为Android在4.0以后为了防止应用的ANR（aplication Not Response）异常。**

##二、就针对此问题有两种解决的方法：

###1.可以再Activity的onCreate()方法中加入这样一段代码，如下：

    if (Build.VERSION.SDK_INT >= 11)
    {
    StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().detectDiskReads  ().detectDiskWrites().detectNetwork().penaltyLog().build());
    StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder().detectLeakedSqlLiteObjects().detectLeakedClosableObjects().penaltyLog().penaltyDeath().build());
     }

后就可以在主线程中进行网络操作了


###2.一般情况我们应该这样做

**启动一条子线程进行你的网络请求。**

当然，如果你的应用程序执行的网络请求数据量很小的话，可以使用第一种方案


##三、Android主线程不能访问网络异常解决办法
从两个方面说下这个问题：

##1.不让访问网络的原因：
**由于对于网络状况的不可预见性，很有可能在网络访问的时候造成阻塞，那么这样一来我们的主线程UI线程 就会出现假死的现象，产生很不好的用户体验。所以，默认的情况下如果直接在主线程中访问就报出了这个异常，名字是NetworkOnMainThreadException**

解决该问题的办法
###1. 独立线程

###2. 异步线程AsyncTask

###3. StrictMode修改默认的策略

###1) 独立线程的办法

启动一个新线程的代码：

    new Thread(){

    @Override

    public void run() {
 
    Dosomething();

    handler.sendEmptyMessage(0);

    }

    }.start();

此处我们重写了线程类的run方法，执行Dosomething. 在里面还有个handler对象，这又涉及到了跨线程修改UI元素内容的问题。在java中是不允许跨线程修改UI元素的，如我们在新启动的线程中想去修改UI主线程中TextView的文本时，会报错误的。如果想做这样的操作，我们就得借助Handler这个类来实现。

###2) 异步调用的方法 AsyncTask

这里关于AsyncTask 介绍的文章不错， 详细情况看作者的介绍吧  

<http://www.cnblogs.com/dawei/archive/2011/04/18/2019903.html#2824345>

接下来也将会有一篇博客专门介绍 关于更新主线程UI线程的所有办法

###3) StrictMode修改默认的策略

在我们的Activity类的onCreate方法中，设置如下规则：

    StrictMode.ThreadPolicy policy=new StrictMode.ThreadPolicy.Builder().permitAll().build();

    StrictMode.setThreadPolicy(policy);

这样也可以解决这个问题

关于StrictMode的具体介绍，请看另一个博客介绍的非常详细：

<http://hb.qq.com/a/20110914/000054.htm>