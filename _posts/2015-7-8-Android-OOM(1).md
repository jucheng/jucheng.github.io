---
layout: post
title:  "Android 系统稳定性 - OOM（一）"
date:   2015-7-4
categories: Android
tags: [Android，图片加载]
---

Android 系统稳定性 - OOM（一）

<!-- more -->

##什么是内存溢出
 
##2.1.2 为什么会有内存溢出

**Android 主要应用在嵌入式设备当中，而嵌入式设备由于一些众所周知的条件限制，通常都不会有很高的配置，特别是内存比较有限。如果我们编写的代码当中有太多的对内存使用不当的地方，难免会使得我们的设备运行缓慢，甚至是死机。为了能够使系统安全且快速的运行，Android 的每个应用程序都运行在单独的进程中，这个进程是由 Zygote 进程孵化出来的，每个应用进程中都有且仅有一个虚拟机实例。如果程序在运行过程中出现了内存泄漏的问题，只会影响自己的进程，不会直接影响其他进程。
Java虽然有自己的垃圾回收机制，但并不是说用Java编写的程序就不会内存溢出了。Java程序运行在虚拟机中，虚拟机初始化时会设定它的堆内存的上限值，在Android中这个上限值默认是“16m”，而你可以根据实际的硬件配置来调整这个上限值，调整的方法是在系统启动时加载的某个配置文件中设置一个系统属性：**

     dalvik.vm.heapsize=24m

当然也可以设置成更大的值（例如“32m”）。这样Android中每个应用进程的DalvikVM实例的堆内存上限值就变成了24MB，也就是说一个应用进程中可以同时存在更多的Java数据对象了。有一些大型的应用程序（例如游戏）运行时需要比较多的内存，heapsize太小的话根本无法运行，此时就需要考虑调整heapsize的大小了。heapsize的大小是同时对整个系统生效的，原生代码中无法单独的调整某一个Java进程的heapsize（除非我们自己修改源码，不过我们从来没这么做过）。

当代码中的缺陷造成内存泄漏时，泄漏的内存无法在虚拟机GC的时候被释放，因为这些内存被一些数据对象占用着，而这些数据对象之所以没有被释放，可以归结为两类情况：

###a) 被强引用着

例如被一个正在运行的线程、一个类中的static变量强引用着，或者当前对象被注册进了framework中的一些接口中。

###b) 被JNI中的指针引用着

Framework中的一些类经常会在Java层创建一个对象，同时也在C++层创建一个对象，然后通过JNI让这两个对象相互引用（保存对方的地址），BinderProxy对象就是一个很典型的例子，在这种情况下，Java层的对象同样不会被释放。

当泄漏的内存随着程序的运行越来越多时，最终就会达到heapsize设定的上限值，此时虚拟机就会抛出OutOfMemoryError错误，内存溢出了。

##2.2 容易引起内存泄漏的常见问题

###2.2.1 Cursor对象未正确关闭

关于此类问题其实已经是老生常谈了，但是由于Android应用源码中的缺陷和使用的场合比较复杂，所以还是会时常出现这类问题。

1. 问题举例

        Cursor cursor = getContentResolver().query(...);
        if (cursor.moveToNext()) {
        ... ...
        }

2. 问题修正

        Cursor cursor = null;
        try {
        cursor = getContentResolver().query(...);
        if (cursor != null && cursor.moveToNext()) {
        ... ...
        }
        } catch (Exception e) {
        ... ...
        } finally {
        if (cursor != null) {
                cursor.close();
           }
        }
###3. 引申内容

(1) 实际在使用的时候代码的逻辑通常会比上述示例要复杂的多，但总的原则是一定要在使用完毕Cursor以后正确的关闭。

(2) 如果你的Cursor需要在Activity的不同的生命周期方法中打开和关闭，那么一般可以这样做：

在onCreate()中打开，在onDestroy()中关闭；

在onStart() 中打开，在onStop() 中关闭；

在onResume()中打开，在onPause() 中关闭；

即要在成对的生命周期方法中打开/关闭。

(3) 如果程序中使用了CursorAdapter（例如Music），那么可以使用它的changeCursor(Cursor cursor)方法同时完成关闭旧Cursor使用新Cursor的操作。

(4) 至于在cursor.close时需不需要try...catch（cursor非空时），其实在close时做的工作就是释放资源，包括通过Binder跨进程注销ContentObserver时已经捕获了RemoteException异常，所以其实可以不用try...catch。

(5) 关于deactive和close，deactive不等同于close，看他们的API comments就能知道，如果deactive了一个Cursor，说明以后还是会用到它（利用requery方法），这个Cursor会释放一部分资源，但是并没有完全释放；如果确认不再使用这个Cursor了，一定要close。

(6)除了Cursor有时我们也会对Database对象做操作，例如要修正MediaProvider中的一个attachVolume方法，在每次检测到attach的是一个external的volume时就重新建立一个数据库，而不是采用以前的，那么在remove旧的数据库对象的时候不要忘记关闭它。<!-- 第6点关于Database是否考虑去掉 -->

###4. 影响范围

如果没有关闭Cursor，在测试次数足够多的情况下，就会出现：

####(1) 内存泄漏

我们先简单的看一下Cursor的结构，这样会更好理解。数据库操作涉及到服务端的ContentProvider和客户端程序，客户端通常会通过ContentResolver.query函数查询并获取一个结果集的Cursor对象。而这个Cursor对象实际上也只是一个代理，因为要考虑到客户端和服务端在不同进程的情况，所以Cursor的使用本身也是利用了Binder机制的，而客户端和服务端的数据共享是利用共享内存来实现的，如下图所示。

![](http://img-storage.qiniudn.com/15-7-8/85276399.jpg)


客户端和服务端使用的Cursor经过了层层封装，显得十分臃肿，但它们的工作其实可以简单的从控制流和数据流两个方面来看。

在控制流方面，客户端为了能和远端的服务端通信，使用实现了IBulkCursor接口的BulkCursorProxy和CusorToBulkCursorAdapter对象，例如要获取结果集数据时，客户端通过BulkCursoryProxy.onMove函数调用到CursorToBulkCursorAdapter.onMove函数，然后再调用到SQLiteCursor.onMove函数来填充数据的。

在数据流方面，服务端的SQLiteCursor将从数据库中查询到的结果集写入到共享内存中，然后Binder调用返回到客户端，客户端就可以从共享内存中获取到想要的数据了。客户端的控制流和数据流的访问由BulkCursorToCursorAdapter负责，服务端则是分别由CursorToBulkCursorAdapter和SQLiteCursor负责。

如果Cursor没有正常关闭，那么客户端和服务端的CursorWindow对象和申请的那块共享内存都不会被回收，尽管其他相关的Java对象可能由于没有强引用而被回收，但是真正占用内存的通常是存放结果集数据的共享内存。大量的Cursor没有关闭的话，你可能会看到以下类型的异常信息：

创建新的Java对象时发现没有足够的内存，抛出内存溢出错误：OutOfMemoryError

创建新的CursorWindow时无法申请到足够的内存，可能的异常信息有：

RuntimeException: No memory for native window object
IllegalStateException: Couldn't init cursor window
CursorWindow heap allocation failed 
failed to create the CursorWindow heap

####(2) 文件描述符泄漏

当然有可能很幸运，每次查询的结果集都很小，做几千次查询都不会内存溢出，但是Android的Linux内核还有另外一个限制，就是文件描述符的上限，这个上限默认是1024。

文件描述符本身是一个整数，用来表示每一个被进程所打开的文件和Socket，第一个打开的文件是0，第二个是1，依此类推。而Linux给每个进程能打开的文件数量设置了一个上限，可以使用命令“ulimit -n”查看。另外，操作系统还有一个系统级的限制。

每次创建一个Cursor对象，都会向内核申请创建一块共享内存，这块内存以文件形式提供给应用进程，应用进程会获得这个文件的描述符，并将其映射到自己的进程空间中。如果有大量的Cursor对象没有正常关闭，可想而知就会有大量的共享内存的文件描述符无法关闭，同时再加上应用进程中的其他文件描述符，就很容易达到1024这个上限，一旦达到，进程就挂掉了。



提示：可以到系统的“/proc/进程号/fd”目录中查看进程所有的文件描述符。
 
####(3) GREF has increased to 2001

先说明一下“死亡代理”的概念。利用Binder做进程间通信时，允许对Binder的客户端代理设置一个DeathRecipient对象，它只有一个名为binderDied的函数。当Binder的服务端进程死掉了，binder驱动会通知客户端进程，最终回调DeathRecipient对象的binderDied函数，客户端进程可以借此做一些清理工作。

需要注意的是，“死亡代理”的概念只对进程间通信有效，对进程内通信没有意义；

另外，Binder的客户端和服务端的概念是相对的，例如BulkCursorProxy是CursorToBulkCursorAdapter的客户端，而后者又有一个IContentObserver的客户端，其对应的服务端在BulkCursorToCursorAdapter的getObserver函数中创建。

这里需要关注的就是在CursorToBulkCursorAdapter对象被创建时，会同时将该对象注册为IContentObserver的客户端对象的“死亡代理”，代码如下：

CursorToBulkCursorAdaptor的内部类ContentObserverProxy的构造函数中

    public ContentObserverProxy(IContentObserver remoteObserver, DeathRecipient recipient) {
        super(null);
        mRemote = remoteObserver;
        try {
                //此处的recipient就是CursorToBulkCursorAdapter对象
                remoteObserver.asBinder().linkToDeath(recipient, 0);
        } catch (RemoteException e) {
        }
    }


“死亡代理”对象的引用会被Native层的Binder代理对象的mObituaries集合引用，所以“死亡代理”对象及其关联对象由于被强引用而不会被垃圾回收掉，同时JNI在实现linkToDeath函数的过程中也创建了一些具有全局性的引用，被称作“Global Reference（简写为GREF）”，每一个GREF都会被记录到虚拟机中维护的一个“全局引用表”中。

eng模式下，JNI全局引用计数(GREF)有一个上限值为2000，如果大量Cursor对象没有被正常关闭，服务端进程就会因为“死亡代理”对象的创建使得虚拟机中的全局引用计数增多，当超过2000时，虚拟机就会抛出异常，导致进程挂掉，典型的异常信息就是“GREF has increased to 2001”。


提示：全局引用计数的上限2000已经是一个比较大的值，正常情况下很难达到。Android在eng模式下开启这项检查，就是为了能够在开发阶段发现Native层的内存泄漏问题。在usr模式下这项检查会被禁用，此时如果有内存泄漏就只有等到抛出内存溢出错误或者文件描述符超出上限等其他异常时才能发现了。
Cursor未正常关闭是导致GREF越界的原因之一，后续会在其他章节中详细讨论。

##2.2.2 释放对象的引用

内存的问题是Bugzilla中的常客，经常会在不经意间遗留一些对象没有释放或销毁。

###1. 静态成员变量

有时因为一些原因(比如希望节省Activity初始化时间等)，将一些对象设置为static的，比如:

    private static TextView mTv;
       ... ...
     mTv = (TextView) findViewById(...);

而且没有在Activity退出时释放mTv的引用，那么此时mTv本身，和与mTv相关的那个Activity的对象也不会在GC时被释放掉，Activity强引用的其他对象也无法被释放掉，这样就造成了内存泄漏。如果没有充分的理由，或者不能够清楚的控制这样做带来的影响，请不要这样写代码。

###2. 正确注册/注销监听器对象
3. 
经常要用到一些XxxListener对象，或者是XxxObserver、XxxReceiver对象，然后用registerXxx方法注册，用unregisterXxx方法注销。本身用法也很简单，但是从一些实际开发中的代码来看，仍然会有一些问题：

(1) registerXxx和unregisterXxx方法的调用通常也和Cursor的打开/关闭类似，在Activity的生命周期中成对的出现即可：

在 onCreate() 中 register，在 onDestroy() 中 unregitster；

在 onStart() 中 register，在 onStop() 中 unregitster；

在 onResume() 中 register，在 onPause() 中 unregitster；

(2) 忘记unregister

以前看到过一段代码，在Activity中定义了一个PhoneStateListener的对象，将其注册到
TelephonyManager中：

TelephonyManager.listen(l，PhoneStateListener.LISTEN_SERVICE_STATE);

但是在Activity退出的时候注销掉这个监听，即没有调用以下方法：

TelephonyManager.listen(l，PhoneStateListener.LISTEN_NONE);

因为PhoneStateListener的成员变量callback，被注册到了TelephonyRegistry中，TelephonyRegistry是后台的一个服务会一直运行着。所以如果不注销，则callback对象无法被释放，PhoneStateListener对象也就无法被释放，最终导致Activity对象无法被释放。

3. 适当的使用SoftReference、WeakReference
如果要写一个缓存之类的类（例如图片缓存），建议使用SoftReference，而不要直接用强引用，例如：

    private final ConcurrentHashMap<Long， SoftReference<Bitmap>> mBitmapCache = new ConcurrentHashMap<Long， SoftReference<Bitmap>>();

当加载的图片过多，应用可用堆内存不足的时候，就可以自动的释放这些缓存的Bitmap对象。

关于Java中的强引用、软引用、弱引用和虚引用是一些比较重要的概念，在Android开发中经常会用到。

##2.2.3 构造 Adapter 时，没有使用缓存的 convertView

以构造 ListView 的 BaseAdapter 为例，在 BaseAdapter 中提供了以下方法:

public View getView(int position，View convertView，ViewGroup parent)

来向 ListView 提供每一个 item 所需要的 view 对象。初始时 ListView 会从 BaseAdapter 中根据当前的屏幕布局实例化一定数量的 view 对象，同时 ListView 会将这些 view 对象缓存起来 。

当向上滚动ListView 时，原先位于最上面的 list item 的 view 对象会被回收，然后被用来构造新出现的最下面的 listitem。这个构造过程就是由 getView()方法完成的，getView()的第二个形参 View convertView 就是被缓存起来的 list item 的 view 对象(初始化时缓存中没有 view对象则 convertView 是 null)。由此可以看出，如果我们不去使用 convertView，而是每次都在 getView()中重新实例化一个 View 对象的话，即浪费资源也浪费时间，也会使得内存占用越来越大ListView 回收listitem 的 view 对象的过程可以查看:android.widget.AbsListView类中的addScrapView(View scrap) 方法。

示例代码:

     public View getView(int position，View convertView，ViewGroup parent) {
        View view = new Xxx(...);
        ... ...
        return view;
     }

修正示例代码:

      public View getView(int position，View convertView，ViewGroup parent) {
        View view = null;
        if (convertView != null) {
                view = convertView;
                populate(view，getItem(position));
                ...
        } else {
                view = new Xxx(...);
                ...
        }
        return view;
     }

###2.2.4 Bitmap 对象不再使用时调用 recycle()释放内存

有时我们会自己操作 Bitmap 对象，如果一个 Bitmap 对象比较占内存，当它不再被使用的时候，可以调用 Bitmap.recycle()方法回收此对象的像素所占用的内存，但这不是必须的 ，视情况而定。可以看一下代码中的注释:


/**
* Free up the memory associated with this bitmap's pixels，and mark the
* bitmap as "dead"，meaning it will throw an exception if getPixels() or
* setPixels() is called，and will draw nothing. This operation cannot be
* reversed，so it should only be called if you are sure there are no
* further uses for the bitmap. This is an advanced call，and normally need
* not be called，since the normal GC process will free up this memory when
* there are no more references to this bitmap.
*/


本文转自于：
<http://rayleeya.iteye.com/blog/1956059>