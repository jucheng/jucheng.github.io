---
layout: post
title: "碎片和活动之间进行通信"
date: 2015-8-4
categories: Android
tags: [Android，Fragment]
---
碎片和活动之间进行通信

<!-- more -->

虽然碎片都是嵌入在活动当中显示的，可是实际上它们的关系并没有那么亲密，你可以看到，碎片和活动中都是各自存在于一个独立的类当中，它们之间并没有那么明显的方式来直接进行通信，如果想要在活动当中调用碎片里的方法，或者是在碎片当中调用活动里的方法，它们是怎么实现的呢？

**1.为了方便碎片与活动之间进行通信，FragmentManager提供了一个类似于findViewById（）的方法，专门从布局文件中获取碎片的实例：**

    RightFragment rightFragment=(RightFragment)getFragmentManager（）
     .findFragmentById(R.id.right_fragment);

**（注释：调用FragmentManager的findFragmentById（）方法，可以在活动当中得到相应的碎片的实例，然后就能轻松地调用碎片里的方法了。）**

**2.反过来，在碎片中调用活动里的方法，实际也很简答，就是在每个碎片当中都可以通过调用getActivity()方法来得到和当前碎片相关联的活动实例：**

    MainActivity activity=（MainActivity）getActivity（）；

**（注释：有了活动实例之后，在碎片中调用活动里的方法就变得轻而易举了。另外在碎片当中需要使用Context对象时，也可以使用getActivity（）方法，因为获取到活动的本身就是一个context对象了。）**


**3.在这里还要讲一个碎片跟碎片之间进行通信的一个基本原理：**

**首先在一个碎片当中可以得到与它相关联的活动，然后再通过这个活动去获取另外一个碎片的实例。这样也就实现了不同的碎片之间的通信功能。**