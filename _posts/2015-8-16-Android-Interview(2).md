---
layout: post
title: "Android开发面试经验——2.常见Android基础笔试题"
date: 2015-8-16
categories: Android
tags: [Android，面试]
---
Android开发面试经验——2.常见Android基础笔试题

<!-- more -->

###1、Android四大组件是什么？作用以及应用场景？ 
Android 的四大组件分别是是Activity，Service，BroadcastReceiver和ContentProvider；

**Activity**

从字面上理解，Activity是活动的意思。一个Activity通常展现为一个可视化的用户界面，是Android程序与用户交互的窗口，也是Android组件中最基本也是最复杂的一个组件。从视觉效果来看，一个Activity占据当前的窗口，响应所有窗口事件，具备有控件，菜单等界面元素。从内部逻辑来看，Activity需要为了保持各个界面状态，需要做很多持久化的事情，还需要妥善管理生命周期，和一些转跳逻辑。

**Service**

服务是运行在后台的一个组件，从某从意义上说，服务就像一个没有界面的Activity。它们在很多Android的概念方面比较接近，**封装有一个完整的功能逻辑实现，接受上层指令，完成相关的事件，定义好需要接受的Intent提供同步和异步的接口**。

**BroadcastReceiver** 

广播接收者，不执行任何任务，广播是一种广泛运用的在应用程序之间传输信息的机制 。而 BroadcastReceiver 是对发送出来的广播进行过滤接收并响应的一类组件。Broadcast Receiver 不包含任何用户界面。然而它们可以启动一个Activity以响应接受到的信息，或者通过NotificationManager通知用户。可以通过多种方式使用户知道有新的通知产生：闪动背景灯、震动设备、发出声音等等。通常程序会在状态栏上放置一个持久的图标，用户可以打开这个图标并读取通知信息。在Android中还有一个很重要的概念就是Intent，如果说Intent是一个对动作和行为的抽象描述，负责组件之间程序之间进行消息传递。那么Broadcast Receiver组件就提供了一种把Intent作为一个消息广播出去，由所有对其感兴趣的程序对其作出反应的机制。

**Content Provider** 

即内容提供者，作为应用程序之间唯一的共享数据的途径，Content Provider 主要的功能就是存储并检索数据以及向其他应用程序提供访问数据。 

对应用而言，也可以将底层数据封装成ContentProvider，这样可以有效的屏蔽底层操作的细节，并且使程序保持良好的扩展性和开放性。Android提供了一些主要数据类型的Contentprovider，比如音频、视频、图片和私人通讯录等。可在android.provider包下面找到一些android提供的Contentprovider。可以获得这些Contentprovider，查询它们包含的数据，当然前提是已获得适当的读取权限。如果我们想公开自己应用程序的数据，可以创建自己的 Content provider 的接口。

###2、android中的动画有哪几类，它们的特点和区别是什么? 
两种，一种是Tween动画、还有一种是Frame动画。

Tween动画:这种实现方式可以使视图组件移动、放大、缩小以及产生透明度的变化;

Frame动画:传统的动画方法，通过顺序的播放排列好的图片来实现，类似电影。

###3、后台的activity被系统回收怎么办？如何在被系统回收之前保存当前状态？

当一个Activity被pause或者stop的时候,这个Activity的对象实际上还是保存在内存中,因此这个Activity中的信息(成员和状态信息)还可以重新获取到.
 
如果系统为了整理内存而销毁了Activity对象时,系统没法简单的原封不动地恢复先前的Activity对象及其状态信息. 

Activity中提供了一个方法:onSavedInstanceState(Bundle obj).当系统销毁一个Activity时,会将Activity的状态信息已键值对形式存放在bundle对象中. 

第一次启动Activity时,这个bundle对象是空的,null.如果Activity被系统销毁了,然后用户要回退回去看的话,系统会调用这个Activity的onCreate方法,并把bundle对象传递过去.

###4.请描述一下Activity 生命周期。 

![](http://img-storage.qiniudn.com/15-8-16/78146155.jpg)

###5. 如何将一个Activity设置成窗口的样式。 
在AndroidManifest.xml 中定义Activity的地方一句话

    android:theme=”@android:style/Theme.Dialog”
或

    android:theme=”@android:style/Theme.Translucent”

就变成半透明的

###6.注册广播有几种方式，有何优缺点？ 
有两种，一种是代码动态注册： 

//生成广播处理 

    smsBroadCastReceiver = new SmsBroadCastReceiver(); 

//实例化过滤器并设置要过滤的广播

    IntentFilter intentFilter = new IntentFilter(“android.provider.Telephony.SMS_RECEIVED”);

//注册广播 

    BroadCastReceiverActivity.this.registerReceiver(smsBroadCastReceiver, intentFilter); 

一种是在AndroidManifest.xml中配置广播

两种注册类型的区别是： 

1)第一种不是常驻型广播，也就是说广播跟随程序的生命周期 

2)第二种是常驻型，也就是说当应用程序关闭后，如果有信息广播来，程序也会被系统调用自动运行。 
注册的方法有两种，一种是静态注册，一种是动态注册。 

动态注册优点： 在 Android 的广播机制中， 动态注册的优先级是要高于静态注册优先级的 ， 因此在必要的情况下，我们是需要动态注册广播接收器的。 

静态注册优点：动态注册广播接收器还有一个特点，就是当用来注册的 Activity 关掉后 ，广播也就失效了。同时反映了静态注册的一个优势，就是无需担忧广播接收器是否被关闭 ， 只要设备是开启状态，广播接收器就是打开着的。

###7.IntentService有何优点? 
普通的service ,默认运行在ui main 主线程 

这是带有异步处理的service类, 

异步处理的方法 OnHandleIntent() 

OnHandleIntent() 处理耗时的操作 

Android的进程处理器现在会尽可能的不kill掉你

###8.横竖屏切换时候activity的生命周期? 
1、不设置Activity的android:configChanges时，切屏会重新调用各个生命周期，切横屏时会执行一次，切竖屏时会执行两次 

2、设置Activity的android:configChanges=”orientation”时，切屏还是会重新调用各个生命周期，切横、竖屏时只会执行一次 

3、设置Activity的android:configChanges=”orientation|keyboardHidden”时，切屏不会重新调用各个生命周期，只会执行onConfigurationChanged方法 
　　 
###9、如何将SQLite数据库(dictionary.db文件)与apk文件一起发布? 如何将打开res aw目录中的数据库文件? 
　　
解答：

以将dictionary.db文件复制到res aw目录中 ，在Android中不能直接打开res aw目录中的数据库文件，而需要在程序第一次启动时将该文件复制到手机内存或SD卡的某个目录中，然后再打开该数据库文件。

复制的基本方法是使用getResources().openRawResource方法获得res aw目录中资源的 InputStream对象，然后将该InputStream对象中的数据写入其他的目录中相应文件中。

在Android SDK中可以使用SQLiteDatabase.openOrCreateDatabase方法来打开任意目录中的SQLite ； 
　　 
###10.AndroidManifest.xml文件中主要包含哪些信息 
说明应用程序的java 包，该包名是应用程序的唯一标识； 

描述应用程序的组件：该应用程序由哪些activity，service，broadcast receiver和content provider组成； 

声明应用程序所必须具备的权限，用以访问受保护的部分API，以及与其他应用程序的交互； 

声明应用程序所需要的Android API的最低版本级别，比如1.0，1.1，1.5； 

manifest：根节点，描述了 package 中所有的内容。 

uses-permission：请求你的 package 正常运作所需赋予的安全许可。 

permission： 声明了安全许可来限制哪些程序能你 package 中的组件和功能。 

instrumentation：声明了用来测试此 package 或其他 package 指令组件的代码。 

application：包含 package 中 application 级别组件声明的根节点。 

activity：Activity 是用来与用户交互的主要工具。 

receiver：IntentReceiver 能使的 application 获得数据的改变或者发生的操作，即使它当 前不在运行。 

service：Service 是能在后台运行任意时间的组件。 

provider：ContentProvider 是用来管理持久化数据并发布给其他应用程序使用的组件。

###11.Android数据储存方式 

一.SharedPreferences方式：它是 Android提供的用来存储一些简单配置信息的一种机制，采用了 XML 格式将数据存储到设备中。只能在同一个包内使用，不能在不同的包之间使用。
 
二.文件存储方式 /data/data/包名/files 内存里面 

/ context.openFileInput(name) 默认是私有的访问权限 

三.SQLite数据库方式：SQLite 是 Android 所带的一个标准的数据库， 它支持 SQL语句，它是一个轻量级的嵌入式数据库。 

四.内容提供器（Content provider）方式：主要用于应用程序之间进行数据交换，从而能够让其他的应用保存或读取此 Content Provider 的各种数据类型。 

五. 网络存储方式： 通过网络上提供给我们的存储空间来上传(存储)和下载(获取)我们存储 在网络空间中的数据信息。

###12.Android中常见五种布局介绍 

FrameLayout（帧布局）： 从屏幕的左上角开始布局,叠加显示, 实际应用 播放器的暂停按钮.
 
LinearLayout （线性布局）：可分为垂直布局，水平布局； 

AbsoluteLayout（绝对布局）：用X,Y坐标来指定元素的位置； 

RelativeLayout（相对布局）： 相对布局可以理解为某一个元素为参照物，来定位的布局方式。 

TableLayout（表格布局）：表格布局类似Html里面的Table。每一个TableLayout里面有表格行
TableRow，TableRow里面可以具体定义每一个元素，设定他的对齐方式 android:gravity=”” 。 

每一个布局都有自己适合的方式，另外，这五个布局元素可以相互嵌套应用，做出美观的界面。

###13.Activity的四种启动模式？,activity与task的启动方式有哪些，她们的含义具体说明 

standard: 标准模式，一调用 startActivity()方法就会产生一个新的实例。 

singleTop: 如果已经有一个实例位于 Activity 栈的顶部时， 就不产生新的实例， 而只是调用Activity 中的 newInstance()方法。如果不位于栈顶，会产生一个新的实例。 

singleTask: 会在一个新的 task 中产生这个实例，以后每次调用都会使用这个，不会去产生 新的实例了。 

singleInstance: 这个跟 singleTask 基本上是一样， 只有一个区别： 在这个模式下的 Activity实例所处的 task 中，只能有这个 activity实例，不能有其他的实例。

###14.Android 中的长度单位详解 
如果设置表示长度 、 高度等属性时可以使用 dp 或 sp。但如果设置字体，需要使用 sp。dp 是与密度无关，sp 除了与密度无关外，还与 scale 无关。如果屏幕密度为160，这时 dp 和 sp 和 px 是一样的。
1dp=1sp=1px， 

也就是说，如果使用 dp 和 sp，系统会根据屏幕密度的变化自动进行转换 

px ：表示屏幕实际的象素 

in：表示英寸，是屏幕的物理尺寸。每英寸等于2.54 厘米。

###15.android 析 中有哪几种解析 l xml 的类,  官方推荐哪种？以及它们的原理和区别 

**DOM 解析** 

优点: 

1.XML 树在内存中完整存储,因此可以直接修改其数据和结构.
 
2.可以通过该解析器随时访问 XML 树中的任何一个节点. 

3.DOM 解析器的 API 在使用上也相对比较简单. 

缺点:如果 XML 文档体积比较大时,将文档读入内存是非常消耗系统资源的 

**Ø SAX 解析** 

优点: 

SAX 对内存的要求比较低,因为它让开发人员自己来决定所要处理的标签.特别是当开发人 员只需要处理文档中所包含的部分数据时,SAX 这种扩展能力得到了更好的体现. 

缺点: 

用 SAX 方式进行 XML 解析时,需要顺序执行,所以很难访问到同一文档中的不同数据.此外,在基于该方式的解析编码过程也相对复杂 

**Ø Xmlpull 解析（官方推荐使用）** 

android SDK 提供了 xmlpull api,xmlpull 和 sax 类似,是基于流（stream）操作文件,然后根据节点事件回调开发者编写的处理程序.因为是基于流的处理,因此 xmlpull 和 sax 都比较节约内存资源,不会象 dom 那样要把所有节点以对橡树的形式展现在内存中.xmlpull 比 sax 更 简明,而且不需要扫描完整个流.

###16.ListView 的 优化方案 

（1），如果自定义适配器，那么在 getView 方法中要考虑方法传进来的参数 contentView 是否 为 null，如果为 null 就创建 contentView 并返回，如果不为 null 则直接使用。在这个方法中，尽可能少创建 view。 

（2），给 contentView 设置 tag(setTag()),传入一个 viewHolder 对象，用于缓存要显示的数 据，可以达到图像数据异步加载的效果 

（3），如果 listview 需要显示的 item 很多，就要考虑分页加载。比如一共要显示100条或者更多的时候，我们可以考虑先加载20条，等用户拉到列表底部的时候，再去加载接下来的20 条。 

（4） 快速滑动时不加载图片 

（5） 如果自定义的item中有图片，需要处理图片（减少图片所占内存） 

1.对图片进行边界压缩 

2.用option类来保存图片大小 

3.避免图片的实时缩放，最好预先缩放到视图大小 

（6）尽量避免在listview适配器中使用线程，因为线程是产生内存泄露的主要原因在于线程的生命周期不可控。

###17.Android中intent的作用 
在一个 Android 应用中，主要是由一些组件组成（Activity,Service,ContentProvider,etc.) 在这些组件之间的通讯中，由 Intent 协助完成。 

Intent 负责对应用中一次操作的动作、动作涉及数据、附加数据进行描述，Android 则根据此 Intent 的描述，负责找到对应的组件，将 Intent 传递给调用的组件，并完成组件的调用。Intent 在这里起着实现调用者与被调用者之间的解耦作用。 

有两种方式，一种是显示匹配，一种是隐示匹配； 

显示：明确的指定要跳转的Activity，或者Service等；
 
隐示：隐式匹配，首先要匹配 Intent 的几项值：Action,Category, Data/Type,Component如果填写了 Componet 就是这就形成了显示匹配。 

1.如果你填写了 Action， 如果有一个程序的 Manifest.xml 中的某一个 Activity 的 IntentFilter 段中定义了包含了相同的 Action 那么这个 Intent 就与这个目标 Action 匹配， 如果这个 Filter段中没有定义 Type,Category，那么这个 Activity 就匹配了。但是如果手机中有两个以上的程序匹配，那么就会弹出一个对话可框来提示说明。 

2.data/type，你可以用 Uri 来做为 data,比如:

    Uri uri = Uri.parse(http://www.google.com ); 

    Intent i = new Intent(Intent.ACTION_VIEW,uri);

手机的 Intent 分发过程中，会根据 http://www.google.com 的 scheme 判断出数据类型 type手机的 Brower 则能匹配它，在 Brower 的 Manifest.xml 中的 IntenFilter中首先有ACTION_VIEW Action,也能处理 http:的 type； 

3，至于分类 Category，一般不要去在 Intent 中设置它，如果你写 Intent 的接收者，就在Manifest.xml 的 Activity 的 IntentFilter 中包含 android.category.DEFAULT,这样所有不设置Category（Intent.addCategory(String c);）的 Intent 都会与这个 Category 匹配。
 
4,extras（附加信息） ，是其它所有附加信息的集合。使用 extras 可以为组件提供扩展信息 ，比如，如果要执行“发送电子邮件”这个动作，可以将电子邮件的标题、正文等保存在 extras里，传给电子邮件发送组件。

###18.如何退出 Activity ？如何安全退出？ 
对于单一 Activity 的应用来说，退出很简单，直接 finish()即可。
 
当然，也可以用 killProcess()和 System.exit()这样的方法。 

为了编程方便，最好定义一个 Activity 基类，处理这些共通问题。 

1、记录打开的 Activity： 

每打开一个 Activity，就记录下来。在需要退出时，关闭每一个 Activity 即可。 

2、发送特定广播： 

在需要结束应用时，发送一个特定的广播，每个 Activity 收到广播后，关闭即可。