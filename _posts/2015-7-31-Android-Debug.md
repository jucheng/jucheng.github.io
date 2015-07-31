---
layout: post
title: "海贼王ListView开发过程中出现的错误"
date: 2015-7-31
categories: Android
tags: [Android，调试]
---
海贼王ListView开发过程中出现的错误

<!-- more -->
###1.activity_main cannot be resolved or is not a field

![](http://img-storage.qiniudn.com/15-7-30/38942521.jpg)

解决方法：

解决方法虽然很简答，但是这个问题你光是自己想的话，你会想半天都想不出来的，因为你可以看到MainActivity上边的导入包那里，是不是多了一个：

    import android.R;

**这个包是在开发过程中有时候eclipse自动导入的包，该包有时候会导致一些列明明可以通过的错误，再次出现该问题的时候，把import android.R;删掉。谨记！！！！**



###2.Android R.java文件丢失的问题

**R.java这个文件是会自动生成的。但是有时候你写错xml文件的时候，R.java是不会自动生成对应的值。这个时候我们会很习惯去clean一下这个项目，这个时候会突然发现，R.java竟然不见了。**

**R.java这个文件是会自动生成的。但是有时候你写错xml文件的时候，R.java是不会自动生成对应的值。这个时候我们会很习惯去clean一下这个项目，这个时候会突然发现，R.java竟然不见了。**


 **这个时候的你肯定非常的气愤，你可能会拼命在网上找答案，网上会有很多答案告诉你 右键项目--》Android Tools--> fix project properties。可能你怎么fix都不能把R.java弄出来。这个时候你就要考虑一下是不是某些xml写错了，出了问题。只要xml文件有问题，系统是绝对不会给你自动生成这个R.java文件，因为他要参照你的每张xml里的数据来生成R.java，所以自然就生成不了了。**


**所以当你clean项目以后，错误就变了，跟变成空包，错误也是src包中的错误，若果你遇到这样的错误，并且项目中几十个xml文件，那肯定要郁闷死了，甚至崩溃了。**


**不过没关系。这个时候你再clean项目 ，这时console会打印出一次错误的信息提示：**


例如E:\android_workplace\tongue\res\layout\register.xml:6: error: Error: No resource found that matches the given name (at 'src' with value '@drawable/uesrname').

**然后你根据错误提示的地方去进行修改！！！**


###3.**Duplicate local variable user(重复的局部变量名)**

解决方法：

**这个只要修改成不是一样的变量名就可以了。**

###4.引用参数出现问题了，具体的问题如下：

**haizeiwang_item cannot be resolved or is not a field**

![](http://img-storage.qiniudn.com/15-7-30/91139311.jpg)

这个是改正后的代码：

![](http://img-storage.qiniudn.com/15-7-30/47162408.jpg)

发现了错误了没：

    FruitAdapter adapter = new FruitAdapter(MainActivity.this,
				R.layout.fruit_item, fruitList);

而你那里是：

     HaizeiwangAdapter adapter=new HaizeiwangAdapter(MainActivity.this, 
				R.id.haizeiwang_item, haizeiwangList);

可能现在你看出来了，本来那个参数应该是引用相关的布局的，但是你却去引用了相关
id，结果这个看似简单的错误，你又伤了很久的脑筋了。