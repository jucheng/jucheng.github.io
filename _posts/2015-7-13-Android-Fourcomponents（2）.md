---
layout: post
title: "Android四大（五大）基本组件简介（一）   "
date: 2015-7-13
categories: Android
tags: [Android，四大组件]
---
Android四大（五大）基本组件简介（一）  

<!-- more --> 

说到Android基本组件，很多人都认为是Activity，Service，Broadcast Receiver,Content Provider;但也有人认为是五大组件，Activity，Intent，Service，Broadcast Receiver，Content Provider。

其实所谓的四大五大都是说的Android中常用的几个组件。Intent在Android中作用极重要，完全可以和其它几大组件并列。

Activity：

一般称之为“活动”，在应用程序中一般一个 Activity就是一个单独的屏幕。每一个活动都被实现为一个独立的类，并且从活动基类中继 承而来，活动类将会显示由视图控件组成的用户接口，并对事件作出响应。Activity利用View来实现应用中的GUI（用户直接通过GUI和应用程序 做交互）。Activity窗口内的可见内容通过基类View提供。使用Activity.setContentView()方法设置当前 Activity中的View对象。

每个View对象控制着窗口内的一个矩形空间；

View是一种层次化结构，Parent View中的布局属性会被子View继承；

位于View层次关系最底层的子View对象所代表的矩形空间就是跟用户进行交互的地方

Activity的生命状态依次为：

onCreate

onStart

onRestart

onResume

onPause

onStop

onDestroy

如果要保存页面中一些数据的话，要在onPause（）中保存，在onResume（）中读取。
和 J2ME 的 MIDlet 一样，在 android 中，Activity 的生命周期交给系统统一管理。与 MIDlet 不同的是安装在 android 中的所有的 Activity 都是平等的。

在 android 中，Activity 拥有四种基本状态：

Active/Runing一个新 Activity 启动入栈后，它在屏幕最前端，处于栈的最顶端，此时它处于可见并可和用户交互的激活状态。

   
 Paused 当 Activity 被另一个透明或者 Dialog 样式的 Activity 覆盖时的状态。此时它依然与窗口管理器保持连接，系统继续维护其内部状态，所以它仍然可见，但它已经失去了焦点故不可与用户交互。
    
Stoped 当 Activity 被另外一个 Activity 覆盖、失去焦点并不可见时处于 Stoped状态。
    
Killed Activity 被系统杀死回收或者没有被启动时处于 Killed状态。

Activity共有四种加载模式：

1.standard
        
模式启动模式，每次激活Activity时都会创建Activity，并放入任务栈中。

2. singleTop
        
如果在任务的栈顶正好存在该Activity的实例， 就重用该实例，否者就会创建新的实例并放入栈顶(即使栈中
         
已经存在该Activity实例，只要不在栈顶，都会创建实例)。

3. singleTask
        
如果在栈中已经有该Activity的实例，就重用该实例(会调用实例的onNewIntent())。重用时，会让该实例回到
        
栈顶，因此在它上面的实例将会被移除栈。如果栈中不存在该实例，将会创建新的实例放入栈中。 

4. singleInstance

        
在一个新栈中创建该Activity实例，并让多个应用共享改栈中的该Activity实例。一旦改模式的Activity的实

例存在于某个栈中，任何应用再激活改Activity时都会重用该栈中的实例，其效果相当于多个应用程序共享一个应用，
不管谁激活该Activity都会进入同一个应用中。

Intent：

Intent是一种运行时绑定（runtime binding）机制，它能够在程序运行的过程中连接两个不同的组件。通过Intent，你的程序可以向Android表到某种请求或者意愿，Android会根据意愿的内容选择适当的组件来处理请求。

Intent对象抽象地描述了执行操作，Intent的主要组成部分；

1.目标组件名称

a) 组件名称是一个ComponentName对象，是目标组件类名和目标组件所在应用程序包的组合

b) 组件中的包名不一定要和manifes文件中包名完全匹配

c) 如果Intent消息中指明了目标组件的名称，这就是一个显示消息，Intent会传递给指明的组件。

d) 如果目标组件名称并没有指定，Android则通过Intent内的其他信息和已注册的IntentFilter的比较来选择合适的目标组件

2.Action

a)描述Intent所触发动作的名字字符串。

b)理论上Action可以为任何字符串，而与Android系统应用有关的Action字符串以静态字符串常量的形式定义在了Intent类中。

3.Data

a)描述Intent要操作的的数据的URI和数据类型。

b)正确设置Intent的数据对于Android寻找系统中匹配Intent请求的组件很重要。

4.Category

a)是对被请求组件的额外描述信息。

b)Android也在Intent类中定义了一组静态字符串常量表示Intent不同的类别。

5.Extra

a)当我们使用Intent连接不同组件时，有时需要在Intent中附加额外的信息，以便将数据传递给目标Activity。

b)Extra用键值对结构保存在Intent对象当中，Intent对象通过调用方法putExtras() 和 getExtras()来存储和获取Extra

c)Extra是以Bundle对象的形式来保存的，Bundle对象提供了一系列put和get方法来设置、提取相应键值信息。

d)在Intent类中同样为Android系统应用的一些Extra的键值定义了静态字符串常量。

6.Flag

决定Intent目标组件的因素：

在显式Intent消息中，决定目标组件的唯一要素就是组件名称（不用再定义其他Intent内容）

而隐式Intent消息中，由于没有目标组件名称，所以必须由Android系统帮助应用程序寻找与Intent请求意图最匹配的组件。

 隐式Intent消息中目标组件具体选择方 法是：android将Intent的请求内容和一个叫做IntentFilter的过滤器比 较，IntentFilter中包含系统中所有可能的待选组件。如果IntentFilter中某一个组件匹配隐式Intent请求内容，那么 Android就选择该组件作为该隐式Intent的目标组件。


激活一个新的Activity，或者让一个现有的Activity执行一个新的操作，可以通过调用如下两种方法(这两汇总方法需要传入的Intent参数称为Activity Action Intent)：

1.Context.startActivity()

2.Activity.startActivityForResult()

启动一个新的服务，或者向一个已有的服务传递新的指令，可以调用如下两种方法：

1.Context.startService()

2.Context.bindService()

发送广播Intent(所有已注册的拥有与之相匹配IntenFilter的BroadcastReceiv就会被激活)，可以调用如下三种方法：

1.Context.sendBroadcast()

2.Context.sendOrderBroadcast()

3.Context.sendStickBroadcast()

Intent一旦发出，Android都会准 确找到相匹配的一个或多个Activity、Service或BroadcastReceiver作响 应。所以，不同类型的Intent消息不会出现重叠，BroadcastIntent消息只会发送给BroadcastReceiver，而绝不可能发送 给Activity或Server。有startActivity()传递的消息也只可能发送给Activity，由startService()传递的 Intent只可能发送给Service。