---
layout: post
title:  "Android OOM 问题的总结"
date:   2015-7-8
categories: Android
tags: [Android，OOM]
---

Android OOM 问题的总结

<!-- more -->

##问题： 安卓系统经常遇到OOM问题，如何优化和应对？


Dalvik 主要管理的内存有 Java heap 和 native heap 两大块，而对于一个安卓应用来说，由于手机设备的限制，一般应用使用的RAM不能超过某个设定值，如果你想要分配超过大于该分配值的内存的话，就会报Out Of Memory 错误。不同产商默认值不太一样，一般常见的有16M，24M，32M,48M也就是说app的 Java heap + native heap < 默认值。只所以不等于是因为除了这2种我们主要关心的内存外，还有一些小块的内存块用做其他用途,如用于垃圾回收的markstack,markbits以及livebits。


##导致OOM 有以下几种情况：


###1 应用中需要加载大对象，例如Bitmap

 一张在pc机上用的1024*768图片，如果直接用在手机屏幕这种小屏幕上，不仅没有提高显示质量，还容易使内存吃紧。假设照片是用ARGB_8888格式，那么一张1024&times;768的图片需要占用3M的内存， 4-5张就OOM了。bitmap分辨率越高，所占用的内存就越大，这个是以2为指数级增长的。

      

  **解决方案：当我们需要显示大的bitmap对象或者较多的bitmap的时候，就需要进行压缩来防止OOM问题。我们可以通过设置BitmapFactory.Optiions的inJustDecodeBounds属性为true，这样的话不会加载图片到内存中，但是会将图片的width和height属性读取出来，我们可以利用这个属性来对bitmap进行压缩。Options.inSampleSize 可以设置压缩比。**



 ps: 在android 2.3和以前的版本，bitmap对象的像素数据都是分配在native heap中的，所以我们在调试过程中这部分内存是在java heap中看不到的，不过在android 3.0之后，bitmap对象就直接分配在java heap上了，这样便于调试和管理。因此在3.0之后我们可以复用bitmap的内存，而不必回收它，不过新的bitmap对象要大小和原来的一样，到了android 4.4之后，就只要高宽不超过原来的就行了

 此外，java heap 的大小是动态变化的，它像是一个容器，只有水快满了，在允许的范围内，它会扩充它的容量。当水常处于较少的情况下它会缩小其容量. 上面说过android 2.3之前bitmap对象都是在native heap中分配的，如果我们在生成一个bitmap对象之前，在java heap 分配了一块较大的内存，即使之后这段内存被回收了，但是我们的java heap大小不可能一下子就随着这块内存的回收而缩小，它需要一个过程。而我们又要在native上分配一个bitmap对象的内存，如果这时候 默认值-java heap(未缩小) = native heap的值不足以分配给这个bitmap对象，那么就会报OOM错误。



###2 持有无用的对象使其无法被gc，导致Memory Leak . 也就是我们说的内存泄漏。导致内存泄漏我了解的有以下几个方面。



####2.1 静态变量导致的Memory leak

 **静态变量的生命周期和类是息息相关的，它们分配在方法区上，垃圾回收一般不会回收这一块的内存。所以我们在代码中用到静态对象，在不用的时候如果不赋null值，消除对象的引用的话，那么这些对象是很难被垃圾回收的，如果这些对象一多或者比较大的话，程序出现OOM的概率就比较大了。因为静态变量而出现内存泄漏是很常见的。**

####2.2 不合理使用Context 导致的Memory leak

android 中很多地方都要用到context,连基本的Activty 和 Service都是从Context派生出来的，我们利用Context主要用来加载资源或者初始化组件，在Activity中有些地方需要用到Context的时候，我们经常会把context给传递过去了，将context传递出去就有可能延长了context的生命周期，最终导致了内存泄漏。

例如 我们将activty context对象传递给一个后台线程去执行某些操作，如果在这个过程中因为屏幕旋转而导致activity重建，那么原先的activity对象不会被回收，因为它还被后台线程引用着，如果这个activity消耗了比较多的内存，那么新建activity或者后续操作可能因为旧的activity没有被回收而导致内存泄漏。

所以，遇到需要用到context的时候，我们要合理选择不同的context，对于android应用来说还有一个单例的Application Context对象，该对象生命周期和应用的生命周期是绑定的。选择context应该考虑到它的生命周期，如果使用该context的组件的生命周期超过该context对象，那么我们就要考虑是否可以用application context。如果真的需要用到该context对象，可以考虑用弱引用来WeakReference来避免内存泄漏。

####2.3 非静态内部类导致的Memory leak

 非静态的内部类会持有外部类的一个引用，所以和前面context说到的一样，如果该内部类生命周期超过外部类的生命周期，就可能引起内存泄露了，如AsyncTask和Handler。因为在Activity中我们可能会用到匿名内部类，所以要小心管理其生命周期。 如果明确生命周期较外部类长的话，那么应该使用静态内部类。

####2.4 Drawable对象的回调隐含的Memory leak

 当我们为某一个view设置背景的时候，view会在drawable对象上注册一个回调，所以drawable对象就拥有了该view的引用了，进而对整个context都有了间接的引用了，如果该drawable对象没有管理好，例如设置为静态，那么就会导致Memory leak



**在手机版QQ中，对于图片的处理方法是先加载用户发送的图片的小图，只有用户点击了才去加载大图，这样即节省了流量也能防止bitmap过大造成OOM 。另外，对于离开屏幕内容的图片，也要及时的回收，不然聊天记录一多也就OOM了。 对于回收的图片，我们可以采用软引用来做缓存， 这样在内存不吃紧的情况下就能提高交互性,因为在Java中软引用在内存吃紧的时候才会被垃圾回收，比较适合用做cache.另外在Android 3.1版本起，官方还提供了LruCache来进行cache处理。对于不用的Bitmap对象，我们要及时回收，否则会造成Memory leak ，所以当我们确定Bitmap对象不用的时候要及时调用Bitmap.recycle（）方法来使它尽早被GC**


本文出自于：
<http://my.oschina.net/line926/blog/271175>