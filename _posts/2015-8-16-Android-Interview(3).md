---
layout: post
title: "Android开发面试经验——3.常见Android进阶笔试题"
date: 2015-8-16
categories: Android
tags: [Android，面试]
---
Android开发面试经验——3.常见Android进阶笔试题

<!-- more -->

但是做为一个有经验的开发者，仅仅知道基础题还是不够的，你的简历上说有两年以上工作经验的话，那面试官肯定会问一些深入性的问题，看你能否回答的出。所以为了找一个更好的工作，我们还需要去了解一下Android进阶的笔试题目：

###1.什么是ANR，如何避免？ 
ANR：Application Not Responding。 

在 Android 中，活动管理器和窗口管理器这两个系统服务负责监视应用程序的响应。当出现下列情况时，Android 就会显示 ANR 对话框了： 

①.用户对应用程序的操作(如输入事件，按键、触摸屏事件)在5秒内无响应 

②. 广播接受器(BroadcastReceiver)在10秒内仍未执行完毕 

Android 应用程序完全运行在一个独立的线程中(例如 main)。

这就意味着，任何在主 线程中运行的，需要消耗大量时间的操作都会引发 ANR。因为此时，你的应用程序已经没有机会去响应输入事件和意向广播(Intentbroadcast)。 

避免方法：Activity 应该在它的关键生命周期方法（如 onCreate()和 onResume()）里尽可能少的去做创建操作， 

潜在的耗时操作。例如网络或数据库操作，或者高耗时的计算如改变位图尺寸，应该在子线程里（或者异步方式）来完成。 

主线程应该为子线程提供一个 Handler，以便完成时能够提交给主线程。

###2.Handler机制原理？ 
andriod 提供了 Handler 和 Looper 来满足线程间的通信。Handler 先进先出原则。 

Looper 类用来管理特定线程内对象之间的消息交换 (MessageExchange)。 

1)Looper: 一个线程可以产生一个 Looper 对象，由它来管理此线程里的 MessageQueue(消息队列)。 

2)Handler: 你可以构造 Handler 对象来与 Looper 沟通，以便 push 新消息到 MessageQueue 里;或者接收 Looper 从 MessageQueue 取出)所送来的消息。 

3) Message Queue(消息队列 ): 用来存放线程放入的消息。 

4)线程： UI thread 通常就是 main thread， 而 Android 启动程序时会替它建立一个 MessageQueue。

###3.请解释下在单线程模型中Message、Handler、Message Queue、Looper之间的关系。 
简单的说，Handler获取当前线程中的 looper对象，looper 用来从存放 Message 的 

MessageQueue中取出 Message，再有 Handler 进行 Message 的分发和处理. 

Message Queue(消息队列)： 用来存放通过 Handler 发布的消息， 通常附属于某一个创建它的线程，可以通过 Looper.myQueue()得到当前线程的消息队列 

Handler：可以发布或者处理一个消息或者操作一个 Runnable，通过 Handler发布消息， 消息将只会发送到与它关联的消息队列，然也只能处理该消息队列中的消息 

Looper：是 Handler 和消息队列之间通讯桥梁，程序组件首先通过 Handler 把消息传递给 Looper，Looper 把消息放入队列。Looper 也把消息队列里的消息广播给所有的 

Handler：Handler 接受到消息后调用 handleMessage进行处理 

Message：消息的类型，在 Handler 类中的 handleMessage 方法中得到单个的消息进行处理 

在单线程模型下， 为了线程通信问题， Android 设计了一个 Message Queue(消息队列)， 线程间可以通过该 Message Queue 并结合 Handler 和 Looper 组件进行信息交换。 

下面将对它 们进行分别介绍： 

####1.Message 
Message 消息，理解为线程间交流的信息，处理数据后台线程需要更新 UI ，则发送Message 内含一些数据给 UI 线程。 
####2.Handler 
Handler处理者，是 Message 的主要处理者，负责 Message 的发送，Message 内容的执行处理。后台线程就是通过传进来的 Handler对象引用来 sendMessage(Message)。 

而使用 Handler，需要 implement 该类的 handleMessage(Message)方法，它是处理这些 
Message 的操作内容，例如 Update UI 。通常需要子类化 Handler 来实现 handleMessage方法。 
####3.Message Queue 
Message Queue 消息队列，用来存放通过 Handler 发布的消息，按照先进先出执行。每个 message queue 都会有一个对应的 Handler。

Handler 会向 messagequeue 通过两种方法发送消息：sendMessage 或 post。

这两种消息都会插在 message queue 队尾并按先进先出执行。但通过这两种方法发送的消息执行的方式略有不同：通过 sendMessage发送的是一个 message 对象,会被 Handler 的 handleMessage()函数处理；而通过 post 方法发送的是一个 runnable 对象，则会自己执行。 

####4.Looper 
Looper 是每条线程里的 Message Queue 的管家。

Android 没有 Global 的MessageQueue，而 Android 会自动替主线程(UI 线程)建立 Message Queue，但在子线程里并没有建立 Message Queue。 所以调用 Looper.getMainLooper()得到的主线程的 Looper 不为 NULL，但调用 Looper.myLooper()得到当前线程的 Looper 就有可能为 NULL。

###4.Android 中线程与线程，进程与进程之间如何通信 

1、一个 Android 程序开始运行时，会单独启动一个 Process。 
默认情况下，所有这个程序中的 Activity 或者 Service 都会跑在这个 Process。 
默认情况下，一个 Android 程序也只有一个 Process，但一个 Process 下却可以有许多个 Thread。 

2、一个 Android 程序开始运行时，就有一个主线程 MainThread 被创建。该线程主要负责 UI 界面的显示、更新和控件交互，所以又叫 UI Thread。 

一个 Android 程序创建之初，一个 Process 呈现的是单线程模型–即 Main Thread， 
所有的任务都在一个线程中运行。所以，Main Thread 所调用的每一个函数，其耗时应该 
越短越好。而对于比较费时的工作，应该设法交给子线程去做，以避免阻塞主线程（主线程被阻塞，会导致程序假死 现象） 。 

3、Android 单线程模型：Android UI 操作并不是线程安全的并且这些操作必须在 UI 线程中执行。如果在子线程中直接修改 UI，会导致异常。 

4.Android 的 的 IPC （ 进程间通信 ） 机制 

IPC 是内部进程通信的简称， 是共享 ” 命名管道 ” 的资源。

Android 中的 IPC机制是为了让Activity 和 Service之间可以随时的进行交互，故在 Android 中该机制，只适用于 Activity 和 Service之间的通信，类似于远程方法调用，类似于 C/S 模式的访问。通过定义 AIDL 接口文件来定义 IPC 接口。Servier 端实现 IPC接口，Client 端调用 IPC接口本地代理。

###5.Android应用程序框架 

![](http://img-storage.qiniudn.com/15-8-16/2733806.jpg)

![](http://img-storage.qiniudn.com/15-8-16/2008386.jpg)

###6.View, surfaceView, GLSurfaceView的区别 
View 是最基础的，必须在 UI 主线程内更新画面，速度较慢。 

SurfaceView 是 view 的子类，类似使用双缓机制，在新的线程中更新画面所以刷新界面速度比 view 快 GLSurfaceView 是 SurfaceView 的子类，opengl 专用的。 

区别：SurfaceView是从View基类中派生出来的显示类，直接子类有GLSurfaceView和VideoView，可以看出GL和视频播放以及Camera摄像头一般均使用SurfaceView 

SurfaceView和View最本质的区别在于，surfaceView是在一个新起的单独线程中可以重新绘制画面而View必须在UI的主线程中更新画面。 

那么在UI的主线程中更新画面 可能会引发问题，比如你更新画面的时间过长，那么你的主UI线程会被你正在画的函数阻塞。那么将无法响应按键，触屏等消息。 

当使用surfaceView 由于是在新的线程中更新画面所以不会阻塞你的UI主线程。但这也带来了另外一个问题，就是事件同步。比如你触屏了一下，你需要surfaceView中thread处理，一般就需要有一个event queue的设计来保存touch event，这会稍稍复杂一点，因为涉及到线程同步。

###7.AIDL的全称是什么？如何工作？ 
AIDL 全称 Android Interface Definition Language（Android 接口描述语言）是一种接口描述语言 ; 编译器可以通过 aidl文件生成一段代码， 通过预先定义的接口达到两个进程内 
部通信进程跨界对象访问的目的.AIDL 的 IPC 的机制和 COM 或 CORBA 类似 , 是基于接口的， 但它是轻量级的。 它使用代理类在客户端和实现层间传递值 .

 如果要使用 AIDL, 需要完成2件事情 : 

1.引入AIDL的相关类 .; 

2.调用 aidl产生的 class.理论上 , 参数可以传递基本数据类型和String, 还有就是Bundle的派生类 

当A进程要去调用B进程中的service时，并实现通信，我们通常都是通过AIDL来操作的 。 

###8.关于AndroidOOM，以及如何避免？ 

Android的虚拟机是基于寄存器的Dalvik，它的最大堆大小一般是16M，有的机器为24M。因此我们所能利用的内存空间是有限的。如果我们的内存占用超过了一定的水平就会出现OutOfMemory的错误。
 
①.为什么会出现内存不够用的情况呢？

我想原因主要有两个：由于我们程序的失误，长期保持某些资源（如Context）的引用，造成内存泄露，资源造成得不到释放。保存了多个耗用内存过大的对象（如Bitmap），造成内存超出限制。 

② .如何避免优化？ 

1、应该尽量避免static成员变量引用资源耗费过多的实例，比如Context。Context尽量使用Application Context，因为Application的Context的生命周期比较长，引用它不会出现内存泄露的问题。使用WeakReference代替强引用。比如可以使用WeakReference mContextRef; 

2、线程也是造成内存泄露的一个重要的源头。线程产生内存泄露的主要原因在于线程生命周期的不可控。将线程的内部类，改为静态内部类。3、Bitmap问题：可以说出现OutOfMemory问题的绝大多数人，都是因为Bitmap的问题。因为Bitmap占用的内存实在是太多了，它是一个“超级大胖子”，特别是分辨率大的图片，如果要显示多张那问题就更显著了。 

如何解决Bitmap带给我们的内存问题？ 

3.及时的销毁。　　

虽然，系统能够确认Bitmap分配的内存最终会被销毁，但是由于它占用的内存过多，所以很可能会超过java堆的限制。因此，在用完Bitmap时，要及时的recycle掉。recycle并不能确定立即就会将Bitmap释放掉，但是会给虚拟机一个暗示：“该图片可以释放了”。设置一定的采样率。　

　有时候，我们要显示的区域很小，没有必要将整个图片都加载出来，而只需要记载一个缩小过的图片，这时候可以设置一定的采样率，那么就可以大大减小占用的内存。如下面的代码：　
  
    BitmapFactory.Options options = new BitmapFactory.Options(); options.inSampleSize = 2;//图片宽高都为原来的二分之一，即图片为原来的四分之一。 

4、巧妙的运用软引用（SoftRefrence）　　有些时候，我们使用Bitmap后没有保留对它的引用，因此就无法调用Recycle函数。这时候巧妙的运用软引用，可以使Bitmap在内存快不足时得到有效的释放 

5、及时释放Cursor； 

6、尽量使用9path图片。Adapter要使用convertView复用等等；

###9.AsyncTask 的介绍 
在开发 Android 移动客户端的时候往往要使用多线程来进行操作， 我们通常会将耗时的操作放在单独的线程执行， 避免其占用主线程而给用户带来不好的用户体验。 

但是在子线程中无法 去操作主线程（UI 线程） ，在子线程中操作 UI 线程会出现错误。因此 android 提供了一个类 Handler 来在子线程中来更新 UI 线程，用发消息的机制更新 UI 界面，呈现给用户。 这样就解决了子线程更新 UI 的问题。但是费时的任务操作总会启动一些匿名的子线程，太多的子线程给系统带来巨大的负担，随之带来一些性能问题。

因此 android 提供了一个工具类AsyncTask，顾名思义异步执行任务。这个 AsyncTask 生来就是处理一些后台的比较耗时的任务，给用户带来良好用户体验的，从编程的语法上显得优雅了许多，不再需要子线程和Handler就可以完成异步操作并且刷新用户界面。

###10.说说mvc模式的原理，它在android中的运用 
答：android的官方建议应用程序的开发采用mvc模式。何谓mvc？ 

　mvc是model,view,controller的缩写，mvc包含三个部分： 

　　l、模型（model）对象：是应用程序的主体部分，所有的业务逻辑都应该写在该层。 

　　2、视图（view）对象：是应用程序中负责生成用户界面的部分。也是在整个mvc架构中用户唯一可以看到的一层，接收用户的输入，显示处理结果。 

　　3、控制器（control）对象：是根据用户的输入，控制用户界面数据显示及更新model对象状态的部分，控制器更重要的一种导航功能，想用用户出发的相关事件，交给m处理。 

　android鼓励弱耦合和组件的重用，在android中mvc的具体体现如下： 

1)视图层（view）：一般采用xml文件进行界面的描述，使用的时候可以非常方便的引入，当然，如何你对android了解的比较的多了话，就一定 可以想到在android中也可以使用javascript+html等的方式作为view层，当然这里需要进行java和javascript之间的通 信，幸运的是，android提供了它们之间非常方便的通信实现。 

2)控制层（controller）：android的控制层的重 任通常落在了众多的acitvity的肩上，这句话也就暗含了不要在acitivity中写代码，要通过activity交割model业务逻辑层处理， 这样做的另外一个原因是android中的acitivity的响应时间是5s，如果耗时的操作放在这里，程序就很容易被回收掉。 

3)模型层（model）：对数据库的操作、对网络等的操作都应该在model里面处理，当然对业务计算等操作也是必须放在的该层的。 
　 
###11.根据自己的理解描述下Android数字签名。 

答：
(1)所有的应用程序都必须有数字证书，Android系统不会安装一个没有数字证书的应用程序 

(2)Android程序包使用的数字证书可以是自签名的，不需要一个权威的数字证书机构签名认证 

(3)如果要正式发布一个Android ，必须使用一个合适的私钥生成的数字证书来给程序签名，而不能使用adt插件或者ant工具生成的调试证书来发布。 

(4)数字证书都是有有效期的，Android只是在应用程序安装的时候才会检查证书的有效期。如果程序已经安装在系统中，即使证书过期也不会影响程序的正常功能

###12.谈谈对 Android NDK 的理解 
NDK 全称：Native Development Kit。 

1、NDK 是一系列工具的集合。 * NDK 提供了一系列的工具，帮助开发者快速开发 C（或 C++）的动态库，并能自动将 so 和 java 应用一起打包成 apk。这些工具对开发者的帮助是巨大的。

 * NDK 集成了交叉编译器，并提供了相应的 mk 文件隔离 CPU、平台、ABI 等差异，开发人员只需要简单修改 mk 文件（指出“哪些文件需要编译”、“编译特性要求”等） ，就可以创建出 so。 * NDK 可以自动地将so 和 Java 应用一起打包，极大地减轻了开发人员的打包工作。 

2、NDK 提供了一份稳定、功能有限的 API 头文件声明。 Google 明确声明该 API 是稳定的，在后续所有版本中都稳定支持当前发布的 API。从该版本的 NDK 中看出，这些 API 支持的功能非常有限， 
包含有：C 标准库（libc） 、标准数学库（libm） 、压缩库（libz） 、Log 库（liblog） 。

###13.ViewStub的应用 
在开发应用程序的时候，经常会遇到这样的情况，会在运行时动态根据条件来决定显示哪个View或某个布局。
那么最通常的想法就是把可能用到的View都写在上面，先把它们的可见性都设为View.GONE，然后在代码中动态的更改它的可见性。这样的做法的优点是逻辑简单而且控制起来比较灵活。但是它的缺点就是，耗费资源。虽然把View的初始可见View.GONE但是在Inflate布局的时候View仍然会被Inflate，也就是说仍然会创建对象，会被实例化，会被设置属性。也就是说，会耗费内存等资源。 

推荐的做法是使用android.view.ViewStub，ViewStub是一个轻量级的View，它一个看不见的，不占布局位置，占用资源非常小的控件。可以为ViewStub指定一个布局，在Inflate布局的时候，只有ViewStub会被初始化，然后当ViewStub被设置为可见的时候，或是调用了ViewStub.inflate()的时候，ViewStub所向的布局就会被Inflate和实例化，然后ViewStub的布局属性都会传给它所指向的布局。这样，就可以使用ViewStub来方便的在运行时，要还是不要显示某个布局。 

但ViewStub也不是万能的，下面总结下ViewStub能做的事儿和什么时候该用ViewStub，什么时候该用可见性的控制。 

首先来说说ViewStub的一些特点： 

1.ViewStub只能Inflate一次，之后ViewStub对象会被置为空。按句话说，某个被ViewStub指定的布局被Inflate后，就不会够再通过ViewStub来控制它了。 
2.ViewStub只能用来Inflate一个布局文件，而不是某个具体的View，当然也可以把View写在某个布局文件中。

基于以上的特点，那么可以考虑使用ViewStub的情况有：
 
1.在程序的运行期间，某个布局在Inflate后，就不会有变化，除非重新启动。 

因为ViewStub只能Inflate一次，之后会被置空，所以无法指望后面接着使用ViewStub来控制布局。所以当需要在运行时不止一次的显示和隐藏某个布局，那么ViewStub是做不到的。这时就只能使用View的可见性来控制了。
 
2.想要控制显示与隐藏的是一个布局文件，而非某个View。 

因为设置给ViewStub的只能是某个布局文件的Id，所以无法让它来控制某个View。 
所以，如果想要控制某个View(如Button或TextView)的显示与隐藏，或者想要在运行时不断的显示与隐藏某个布局或View，只能使用View的可见性来控制。

转自<http://blog.csdn.net/sbvfhp/article/details/44814809>