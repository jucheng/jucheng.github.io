---
layout: post
title:  "Android中Toast的用法简介"
date:   2015-7-8
categories: Android
tags: [Android，显示机制]
---

Android中Toast的用法简介

<!-- more -->

 **Toast是Android中用来显示显示信息的一种机制，和Dialog不一样的是:Toast是没有焦点的，而且Toast显示的时间有限，过一定的时间就会自动消失。**

   **Toast是一种提供给用户简洁信息的视图。Toast类帮助你创建和显示该信息。**

   **该视图已浮于应用程序之上的形式呈现给用户。因为它并不获得焦点，即使用户正在输入什么也不会受到影响。它的目标是尽可能已不显眼的方式，使用户看到你提供的信息。**

   **有两个例子就是音量控制和设置信息保存成功。**

   **使用该类最简单的方法就是调用一个静态方法，让他来构造你需要的一切并返回一个新的 Toast 对象。**

用以下代码说明Toast的几种用法：

###（1）默认：

    Toast.makeText(MainActivity.this, "这是默认效果的Toast",  Toast.LENGTH_LONG).show();

###（2）自定义显示位置：


    Toast toast = Toast.makeText(MainActivity.this, "这是自定义位置的Toast", Toast.LENGTH_LONG);
                //设置Toast在屏幕上显示的位置
    toast.setGravity(Gravity.CENTER, 20,80);
    toast.show();

###（3）自定义显示图标：

    Toast toast = Toast.makeText(MainActivity.this, "这是带图片的Toast", Toast.LENGTH_LONG);
    //创建一个子布局用于自定义Toast的内容
    LinearLayout toastView = (LinearLayout) toast.getView();
    //在这个子布局中定义一个ImageView用于添加Toast显示的图片
    ImageView  iv= new ImageView(MainActivity.this);
    iv.setImageResource(R.drawable.p3);
    //把ImageView添加到子布局当中
              toastView.addView(iv, 0);
              toast.show();

###（4）完全自定义的：

//创建一个布局，用于承载Toast中的内容

    LayoutInflater inflater = getLayoutInflater();
    View view = inflater.inflate(R.layout.cell, null);
    //Toast中的内容之一ImageView用于显示图片
    ImageView iv = (ImageView) view.findViewById(R.id.iv);
    iv.setImageResource(R.drawable.p4);
    //Toast中的内容之二TextView用于显示Toast的标题
    TextView title = (TextView) view.findViewById(R.id.tv_title);
    title.setText("注意：");
    //Toast中的内容之三TextView用于显示Toast的信息内容
    TextView text = (TextView) view.findViewById(R.id.tv_message);
    text.setText("这是完全自定义Toast");
    //创建一个Toast对象
    Toast toast = new Toast(MainActivity.this);
    //设置Toast的显示位置为屏幕的右上方
    toast.setGravity(Gravity.RIGHT | Gravity.TOP, 100,100);
    //设置Toast的显示时间
    toast.setDuration(Toast.LENGTH_LONG);
    //设置Toast显示的布局
    toast.setView(view);
    toast.show();

###（5）在线程中使用：

     Handler handler = new Handler();
       public void showToast() {
           handler.post(new Runnable() {
               @Override
               public void run() {
                   Toast.makeText(MainActivity.this, "线程中的Toast", Toast.LENGTH_LONG).show();
               }
           });
       }
    new Thread(new Runnable() {
                   public void run() {
                       showToast();
                   }
               }).start();


###以上就是常常使用到的Toast的使用方法，看一下显示效果：


![](http://img-storage.qiniudn.com/15-7-8/36285478.jpg)

![](http://img-storage.qiniudn.com/15-7-8/3730653.jpg)


![](http://img-storage.qiniudn.com/15-7-8/64205588.jpg)

![](http://img-storage.qiniudn.com/15-7-8/4275288.jpg)

![](http://img-storage.qiniudn.com/15-7-8/55957739.jpg)

![](http://img-storage.qiniudn.com/15-7-8/30403651.jpg)


此文转自:
<http://wangzhaoli.blog.51cto.com/7607113/1293322>