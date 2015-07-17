---
layout: post
title: "Android的四大组件 "
date: 2015-7-13
categories: Android
tags: [Android，四大组件]
---

<!-- more --> 

Android的四大组件

Android的四大组件：Activity、Service、BroadcastReceiver、Content Provider。

Content Provider 属于Android应用程序的组件之一，作为应用程序之间唯一的共享数据的途径，Content Provider 主要的功能就是存储并检索数据以及向其他应用程序提供访问数据的接口

 

##① Activity

它是Android应用中负责与用户交互的组件——大致上把它想象成Swing编程中的JFrame控件。不过它与JFrame的区别在于：JFrame本身可以设置布局管理器，不断地向JFrame中添加组件，但Activity只能通过setContentView(View)来显示指定组件。

Activity为Android应用提供里可视化用户界面，如果该Android应用需要多个用户界面，那么这个Android应用将会包含多个Activity，多个Activity组成Activity栈。当前活动的Activity位于栈顶。

 

View组件是所有UI控件、容器控件的基类，View组件就是Android应用中用户实实在在看到的部分。但View组件需要放到容器组件中，或者使用Activity将它显示出来。如果需要通过某个Activity把指定View显示出来，调用Activity的setContentView()方法即可。

 

##② Service

它与Activity的地位是并列的，它也代表一个单独的Android组件。Service与Activity的区别在于：Service通常位于后台运行，它一般不需要与用户交互，因此Service组件没有图形用户界面。Service组件需要继承Service基类。一个Service组件被运行起来之后，它将拥有自己独立的生命周期，Service组件通常用于为其他组件提供后台服务或监控其他组件的运行状态。

 

##③ BroadcastReceiver

它是Android应用中另一个重要的组件，BroadcastReceiver代表广播消息接收器。从代码实现角度来看，BroadcastReceiver非常类似于事件编程中的监听器。与普通事件监听器不同的是：普通事件监听器监听的事件源是程序中的对象;而BroadcastReceiver监听的事件源Android应用中的其他组件。使用BroadcastReceiver组件接收广播消息比较简单，开发者只要实现自己的BroadcastReceiver子类，并重写onReceive(Context context,Intent intent)方法即可。当其他组件通过sendBroadcast()、sendStickyBroadcst()或sendOrderedBroadcast()方法发送广播时，如该BroadcastReceiver也对该消息“感兴趣”（通过IntentFilter配置），BroadcastReceiver的onReceive(Context context,Intent intent)方法将会被触发。   开发者实现里自己的BroadcastReceiver之后，通常有两种方式来注册这个系统级的“事件监听器”。

-->在Java代码中通过Context.registReceiver()方法注册BroadcastReceiver。

-->在AndroidManifest.xml文件中使用<receiver……>元素完成注册。

 

##④ ContentProvider

 对于Android应用而言，组件必须相互独立，如果这些Android应用之间需要实现实时的数据交换。例如我们开发里一个发送短信的程序，当发送短信时需要从联系人管理应用中读取指定联系人的数据----这就需要多个应用程序之间进行实时的数据交换。

    
Android系统为这种跨应用的数据交换提供里一个标准，ContentProvider。当用户实现自己的ContentProvider时，需要实现如下抽象方法。

Insert(Uri, ContentValues):向ContentProvider插入数据。

Deleter(Uri,ContentValues):删除ContentProvdier中指定数据。

Update(Uri, ContentValues, String, String[] ):更新ContentProvider中指定数据。

Query(Uri, String[], String, String[], String):从ContentProvider查询数据。

通常与ContentProvider结合使用的是ContentResolver，一个应用程序使用ContentProvider暴露自己的数据，而另一个应用程序则通过ContentResoler来访问数据。

Intent和IntentFilter  严格的说，Intent并不是Android的组件，但它对于Android应用的作用非常大----它是Android应用内不同组件之间通信的载体。当Android运行时需要连接不同的组件时，通常就需要借助于Intent来实现。Intent可以启动应用中另一个Activity,Service,BroadcastReceiver。