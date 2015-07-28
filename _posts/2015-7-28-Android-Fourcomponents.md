---
layout: post
title: "有关于Activity的生命周期的认知"
date: 2015-7-28
categories: Android
tags: [Android，四大组件]
---
有关于Activity的生命周期的认知

<!-- more -->

今天又特地看了“第一行代码”那本书中的有关于活动生命周期的讲解的，然后用代码实现出来了，虽然以前是在概念上知道了活动的生命周期的流程，但是通过代码的实现之后，感觉更加清晰明了了。所以在此做一下相关的一些笔记，正所谓，好记性不如烂笔头。（由于之前在小米手机上测试的时候，不知道为什么在执行活动的跳转的时候，总是不执行restart()函数，所以只好在虚拟机上运行了，没办法，卡是卡了点。

1.在这里我就只用两个Activity来证明在活动的生命周期的相关状态的跳转：
![](http://img-storage.qiniudn.com/15-7-28/89506005.jpg)

2.在启动MainActivity第一次被创建时（也就是我们点击进入这个应用的时候），可以在logcat的打印日志中看到以下的打印结果：
![](http://img-storage.qiniudn.com/15-7-28/81775598.jpg)
分别是：
onCreate()->onstart()->onresume()

3.然后当我们点击了第一个按钮的视乎，也就是“start_normal_activity”的时候，就会进入另外一个界面：

![](http://img-storage.qiniudn.com/15-7-28/42750889.jpg)

又会看到以下的打印信息：

![](http://img-storage.qiniudn.com/15-7-28/75999918.jpg)

这是因为，这个时候NormalActivity已经把MainActivity完全给遮挡住了，所以onPause()和onStop()就会得到执行。

4.当我们按下返回键的时候，又会看到以下的打印日志：

![](http://img-storage.qiniudn.com/15-7-28/85078299.jpg)
我们可以看到以上的几个方法，那是因为，因为之前的MainActivity已经进入了停止的状态了，所以现在是重新启动的话，就会执行onRestart()的方法，之后又会一次执行onStart() 和onResume()方法。注意，这个时候是不会再去执行onCreate()方法了，因为MainActivity之前只是处于onstop()的状态，但是并没有销毁，所以，现在不要重新创建了。

5.接着我们按下第二个按钮的时候，也就是Start DialogActivity时，启动另一个Activity，

![](http://img-storage.qiniudn.com/15-7-28/60428990.jpg)

就会执行以下的相关方法。这时候，我们可以看到有一个特殊的地方就是这里跟之前不一样，这里只是执行了onpause()方法，
![](http://img-storage.qiniudn.com/15-7-28/2401907.jpg)

没有跟之前一样执行了onstop()方法，这是因为DialogActivity并没有完全遮挡住MainActivity，这个时候的MainActivity只是进入了暂停的状态，没有进入停止状态，所以，相应的，在按下返回键回到MainActivity的时候，也只是执行了onresume()的方法。
![](http://img-storage.qiniudn.com/15-7-28/3205820.jpg)

6.最后一步就是在我们按下Back键退出程序的时候，就会发现打印日志会执行以下的几个方法：
![](http://img-storage.qiniudn.com/15-7-28/81266725.jpg)


总结：
好了，以上就是我们大概的一个Activity的生命周期了，经过程序的验证之后，是不是感觉又深刻了一些。