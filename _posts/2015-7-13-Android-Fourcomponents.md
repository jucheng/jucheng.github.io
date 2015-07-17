---
layout: post
title: "android四大组件详解 "
date: 2015-7-13
categories: Android
tags: [Android，四大组件]
---
android四大组件详解

<!-- more -->

###android四大组件分别为activity、service、content provider、broadcast receiver。

##一、android四大组件详解

##1、activity

（1）一个Activity通常就是一个单独的屏幕（窗口）。

（2）Activity之间通过Intent进行通信。

（3）android应用中每一个Activity都必须要在AndroidManifest.xml配置文件中声明，否则系统将不识别也不执行该Activity。

##2、service

###（1）service用于在后台完成用户指定的操作。service分为两种：

（a）started（启动）：当应用程序组件（如activity）调用startService()方法启动服务时，服务处于started状态。

（b）bound（绑定）：当应用程序组件调用bindService()方法绑定到服务时，服务处于bound状态。

###(2)startService()与bindService()区别：

(a)started service（启动服务）是由其他组件调用startService()方法启动的，这导致服务的onStartCommand()方法被调用。当服务是started状态时，其生命周期与启动它的组件无关，并且可以在后台无限期运行，即使启动服务的组件已经被销毁。因此，服务需要在完成任务后调用stopSelf()方法停止，或者由其他组件调用stopService()方法停止。

(b)使用bindService()方法启用服务，调用者与服务绑定在了一起，调用者一旦退出，服务也就终止，大有“不求同时生，必须同时死”的特点。

###(3)
开发人员需要在应用程序配置文件中声明全部的service，使用<service></service>标签。

###(4)
Service通常位于后台运行，它一般不需要与用户交互，因此Service组件没有图形用户界面。Service组件需要继承Service基类。Service组件通常用于为其他组件提供后台服务或监控其他组件的运行状态。

##3、content provider

###（1）

android平台提供了Content Provider使一个应用程序的指定数据集提供给其他应用程序。其他应用可以通过ContentResolver类从该内容提供者中获取或存入数据。

###（2）
只有需要在多个应用程序间共享数据是才需要内容提供者。例如，通讯录数据被多个应用程序使用，且必须存储在一个内容提供者中。它的好处是统一数据访问方式。

###（3）
ContentProvider实现数据共享。ContentProvider用于保存和获取数据，并使其对所有应用程序可见。这是不同应用程序间共享数据的唯一方式，因为android没有提供所有应用共同访问的公共存储区。

###（4）
开发人员不会直接使用ContentProvider类的对象，大多数是通过ContentResolver对象实现对ContentProvider的操作。

###（5）
ContentProvider使用URI来唯一标识其数据集，这里的URI以content://作为前缀，表示该数据由ContentProvider来管理。

##4、broadcast receiver

####（1）
你的应用可以使用它对外部事件进行过滤，只对感兴趣的外部事件(如当电话呼入时，或者数据网络可用时)进行接收并做出响应。广播接收器没有用户界面。然而，它们可以启动一个activity或serice来响应它们收到的信息，或者用NotificationManager来通知用户。通知可以用很多种方式来吸引用户的注意力，例如闪动背灯、震动、播放声音等。一般来说是在状态栏上放一个持久的图标，用户可以打开它并获取消息。

###（2）
广播接收者的注册有两种方法，分别是程序动态注册和AndroidManifest文件中进行静态注册。

###（3）
动态注册广播接收器特点是当用来注册的Activity关掉后，广播也就失效了。静态注册无需担忧广播接收器是否被关闭，只要设备是开启状态，广播接收器也是打开着的。也就是说哪怕app本身未启动，该app订阅的广播在触发时也会对它起作用。

##二、android四大组件总结：

###（1）4大组件的注册

4大基本组件都需要注册才能使用，每个Activity、service、Content Provider都需要在AndroidManifest文件中进行配置。AndroidManifest文件中未进行声明的activity、服务以及内容提供者将不为系统所见，从而也就不可用。而broadcast receiver广播接收者的注册分静态注册（在AndroidManifest文件中进行配置）和通过代码动态创建并以调用Context.registerReceiver()的方式注册至系统。需要注意的是在AndroidManifest文件中进行配置的广播接收者会随系统的启动而一直处于活跃状态，只要接收到感兴趣的广播就会触发（即使程序未运行）。

###（2）4大组件的激活

内容提供者的激活：当接收到ContentResolver发出的请求后，内容提供者被激活。而其它三种组件activity、服务和广播接收器被一种叫做intent的异步消息所激活。

###（3）4大组件的关闭

内容提供者仅在响应ContentResolver提出请求的时候激活。而一个广播接收器仅在响应广播信息的时候激活。所以，没有必要去显式的关闭这些组件。Activity关闭：可以通过调用它的finish()方法来关闭一个activity。服务关闭：对于通过startService()方法启动的服务要调用Context.stopService()方法关闭服务，使用bindService()方法启动的服务要调用Contex.unbindService()方法关闭服务。

###（4）android中的任务（activity栈）

（a）任务其实就是activity的栈，它由一个或多个Activity组成，共同完成一个完整的用户体验。栈底的是启动整个任务的Activity，栈顶的是当前运行的用户可以交互的Activity，当一个activity启动另外一个的时候，新的activity就被压入栈，并成为当前运行的activity。而前一个activity仍保持在栈之中。当用户按下BACK键的时候，当前activity出栈，而前一个恢复为当前运行的activity。栈中保存的其实是对象，栈中的Activity永远不会重排，只会压入或弹出。

（b）任务中的所有activity是作为一个整体进行移动的。整个的任务（即activity栈）可以移到前台，或退至后台。

（c）Android系统是一个多任务(Multi-Task)的操作系统，可以在用手机听音乐的同时，也执行其他多个程序。每多执行一个应用程序，就会多耗费一些系统内存，当同时执行的程序过多，或是关闭的程序没有正确释放掉内存，系统就会觉得越来越慢，甚至不稳定。为了解决这个问题，Android引入了一个新的机制，即生命周期(Life Cycle)。