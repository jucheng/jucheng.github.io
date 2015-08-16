---
layout: post
title: " Android开发面试经验——5.常见面试官提问Android题"
date: 2015-8-16
categories: Android
tags: [Android，面试]
---
Android开发面试经验——6.常见面试官提问Android题

<!-- more -->

###1.HttpURLConnection和HttpClient他们各自的优缺点是什么? 

HttpUrlConnection 在 2.3 以前的版本是有 bug 的，所以之前的版本推荐使用 HttpClient，但是 google 现在已经不维护 HttpClient 了，5.1里面已经把 HttpClient 标过期。

另外 HttpURLConnection 支持gzip压缩等，推荐首选它。 

在 Froyo(2.2) 之前，HttpURLConnection 有个重大 Bug，调用 close() 函数会影响连接池，导致连接复用失效，所以在 Froyo 之前使用 HttpURLConnection 需要关闭 keepAlive。
 
另外在 Gingerbread(2.3) HttpURLConnection 默认开启了 gzip 压缩，提高了 HTTPS 的性能，Ice Cream Sandwich(4.0) HttpURLConnection 支持了请求结果缓存。 

再加上 HttpURLConnection 本身 API 相对简单，所以对 Android 来说，在 2.3 之后建议使用 HttpURLConnection，之前建议使用 AndroidHttpClient。

###2.Android开发中XML解析方式的比较 ，及优缺点？ 

DOM,SAX,Pull解析。 

SAX解析器的优点是解析速度快，占用内存少；

DOM在内存中以树形结构存放，因此检索和更新效率会更高。但是对于特别大的文档，解析和加载整个文档将会很耗资源，不适合移动端；

PULL解析器的运行方式和SAX类似，都是基于事件的模式，PULL解析器小巧轻便，解析速度快，简单易用，非常适合在Android移动设备中使用，Android系统内部在解析各种XML时也是用PULL解析器。

###3.请问平时开发过程中，你是如何做到多分辨率适配的？ 
1.根据不同分辨率建立不同的布局文件 

2.根据分辨率不同建立不同分辨率的资源图片 

3.在程序启动时，获取当前屏幕的分辨率和密度，在代码中进行适配 

4.为不同分辨率的写不同的dimen文件。
 
5.其实还有就是多使用fragement

###4.谈谈你在工作中是怎样解决一个bug的? 

1.看Log日志 

2.Log解决不了就断点调试 

3.如果debug不行 

4.就在异常代码的附近Log.e(“error”,”1”);,2,3,4,5,6,7,8,9 每隔一行一个Log输出，看结果 

5.找到问题，自行找思路。如果是技术瓶颈，就google之

###5.声明ViewHolder内部类时，为什么建议使用static关键字? 
其实这个是考静态内部类和非静态内部类的主要区别之一。非静态内部类会隐式持有外部类的引用，就像大家经常将自定义的adapter在Activity类里，然后在adapter类里面是可以随意调用外部activity的方法的。

当你将内部类定义为static时，你就调用不了外部类的实例方法了，因为这时候静态内部类是不持有外部类的引用的。声明ViewHolder静态内部类，可以将ViewHolder和外部类解引用。大家会说一般ViewHolder都很简单，不定义为static也没事吧。确实如此，但是如果你将它定义为static的，说明你懂这些含义。

万一有一天你在这个ViewHolder加入一些复杂逻辑，做了一些耗时工作，那么如果ViewHolder是非静态内部类的话，就很容易出现内存泄露。如果是静态的话，你就不能直接引用外部类，迫使你关注如何避免相互引用。 所以将 ViewHolder内部类 定义为静态的，是一种好习惯. 

非静态内部类隐式持有外部类的强引用，只是可能会导致内存泄露，而一般情况下在使用viewhodler是不会导致内存泄露的，加static是一个比较好的习惯

###6.如何在不失真的条件下显示一张超高清的图片或者长图? 

1、通过计算BitmapFactory.Options 对象的inSamleSize 值 等比的压缩图片 。 

2、使用WebView来加载该图片； 

3、使用MapView或者TileView来显示图片（类似地图的机制）；

###7.Android中有哪些方法实现定时和延时任务？它们的适用场景是什么？ 
**倒计时类** 

用CountDownTimer

**延迟类** 

CountDownTimer，可巧妙的将countDownInterval设成和millisInFuture一样，这样就只会调用一次onTick和一次onFinish 

handler.sendMessageDelayed,可参考CountDownTimer的内部实现，简化一下，个人比较推荐这个 
TimerTask，代码写起来比较乱 

Thread.sleep，感觉这种不太好 
使用Handler方法postDelay(runnable, delayTime)

**定时类** 

参照延迟类的，自己计算好要延迟多少时间 
handler.sendMessageAtTime 
AlarmManager，适用于定时比较长远的时间，例如闹铃

###8.谈谈你对StrongReference、WeakReference和SoftReference的认识 
强引用（StrongReference）：

就是在代码中普遍存在的，类似Object obj = new Object()这类的引用，只要强引用还存在，GC永远不会回收掉被引用的对象。 

软引用（SoftReference）：

用来描述一些还有用但非必须的对象。对于软引用关联着的对象，在系统将要发生内存溢出异常时，将会把这些对象列入回收范围之中进行第二次回收。如果这次回收还没有足够的内存，才会抛出内存溢出异常。在JDK 1.2之后，提供了SoftReference类来实习软引用。

弱引用（WeakReference）：

也是用来描述非必须对象的，但是它的强度比软引用更弱一些，被弱引用关联的对象只能生存到了下一次GC发生之前。当GC工作时，无论当时内存是否足够，都会回收只被弱引用关联的对象。在JDK 1.2之后，提供了WeakReference类来实现弱引用。

虚引用（PhantomReference）：

这个引用po主没有提到，不过也可以顺带了解一下。虚引用也称幽灵引用或者幻影引用，它是最弱的一种引用关系。一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用来取得一个对象实例。为一个对象设置虚引用的唯一目的就是在这个对象被GC回收是收到一个系统通知。在JDK 1.2之后提供了PhantomReference类来实现虚引用。

###9.你应用中的网络层是怎么设计的？ 
1.android-async-http. 

封装了下常用的方法,get post 上传 下载 ,所有的请求我都是用的同步请求. 

具体的用法一般都是和业务逻辑在一起,而我的业务逻辑是用异步去处理的. 

关于网络请求结果的缓存,我是单独处理的.并没有放在网络层.

2.在HttpUrlConnection基础上封装, 包括请求成功, 失败, 请求中, 网络问题等封装, 利用广播与UI交互 

3.直接使用xUtils，afinal,okHttp，Volley等开源第三方框架；

Bitmap是android中经常使用的一个类，它代表了一个图片资源。
 
Bitmap消耗内存很严重，如果不注意优化代码，经常会出现OOM问题，优化方式通常有这么几种： 

1.使用缓存； 

2.压缩图片； 

3.及时回收；

###10.谈谈你对Bitmap的理解, 什么时候应该手动调用bitmap.recycle()？ 
至于什么时候需要手动调用recycle，这就看具体场景了，原则是当我们不再使用Bitmao时，需要回收之。

另外，我们需要注意，2.3之前Bitmap对象与像素数据是分开存放的，Bitmap对象存在java Heap中而像素数据存放在Native Memory中，这时很有必要调用recycle回收内存。但是2.3之后，Bitmap对象和像素数据都是存在Heap中，GC可以回收其内存。

###11.ViewPager中加载Fragment的优化问题？如何做到微信那样切换界面时的延时加载？ 
利用fragment中的setUserVisibleHint这个方法可以来做到.


###12什么是aar？aar和jar有什么区别？ 
“aar”包是 Android 的类库项目的二进制发行包。

文件扩展名是.aar，maven 项目类型应该也是aar，但文件本身是带有以下各项的 zip 文件：

/AndroidManifest.xml (mandatory) 
/classes.jar (mandatory) 
/res/ (mandatory) 
/R.txt (mandatory) 
/assets/ (optional) 
/libs/*.jar (optional) 
/jni//*.so (optional) 
/proguard.txt (optional) 
/lint.jar (optional) 

这些条目是直接位于 zip 文件根目录的。
 
其中R.txt 文件是aapt带参数–output-text-symbols的输出结果。

jar打包不能包含资源文件，比如一些drawable文件、xml资源文件之类的,aar可以。

###13.如何加密Url防止被黑？ 
加密到JNI里面还是会通过抓包工具抓取到.最后的方式就是进行HTTPS证书双向加密验证

###14.Android fragment和activity的区别 

你可以理解Fragment是一种特殊的View，负责一个模块或者一个特殊部分的展示。
 
大部分Fragment是依托于Activity存在的，由Activity的FragmentManager来管理 

Fragment可以解决多Activity的问题，即将3.0之前的频繁Activity跳转改成一个Activity内Fragment的切换。 

Fragment可以解决碎片化的问题。
 
fragment是android3.0新增的 

fragment可以重用 

fragment必须嵌套在activity中使用，它的生命周期受activity的影响。

###15.Service和广播 BroadcastReceivre会不会出现ANR？ 
Service，广播 会出现ANR
 
服务, 广播都是主线程中, 既然是主线程 当然会anr 所以耗时操作还是必须另起线程 

通俗的说超时时间：Activity 5秒, Broadcast 10秒, Server 20秒

###16.你在平时开发中会使用到哪些设计模式，能谈谈这些设计模式的使用场景吗？ 
平时用的比较多有单例模式（在内存中仅实例化一个对象时使用），适配器模式（典型的就是ListView和GridView的适配器），建造者模式（AlertDialog.Builder）,观察者模式可能比较隐蔽，在Android源码中BaseAdapater的NotifyDataSetChanged的实现（？） 

单例：DownloadManager

转自<http://blog.csdn.net/sbvfhp/article/details/44814915>