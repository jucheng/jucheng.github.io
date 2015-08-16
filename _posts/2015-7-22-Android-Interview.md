---
layout: post
title: "安卓基础总结（二）"
date: 2015-7-22
categories: Android
tags: [Android，面试]
---
android基础总结（二）

<!-- more -->

###1.activity、Service、BroadcastReceiver的作用（android）
Activity：Activity是Android程序与用户交互的窗口，是Android构造块中最基本的一种，它需要为保持各界面的状态，做很多持久化的事情，妥善管理生命周期以及一些跳转逻辑

service：后台服务于Activity，封装有一个完整的功能逻辑实现，接受上层指令，完成相关的指令，定义好需要接受的Intent提供同步和异步的接口

BroadCast Receiver：接受一种或者多种Intent作触发事件，接受相关消息，做一些简单处理，转换成一条Notification，统一了Android的事件广播模型

###2.描述一个完整的Android activity lifecycle
activity的生命周期方法有：onCreate()、onStart()、onReStart()、onResume()、onPause()、onStop()、onDestory()；

###3.显式intent和隐式intent的区别是什么（android）
Intent定义：Intent是一种在不同组件之间传递的请求消息，是应用程序发出的请求和意图。作为一个完整的消息传递机制，Intent不仅需要发送端，还需要接收端。

显式Intent定义：对于明确指出了目标组件名称的Intent，我们称之为显式Intent。

隐式Intent定义：对于没有明确指出目标组件名称的Intent，则称之为隐式Intent。

说明：Android系统使用IntentFilter 来寻找与隐式Intent相关的对象。

###4.Android中线程同步的方法
线程同步的方法可以采用同步方法和同步块。

###5.怎么将一个Activity封装成对话框的样子? 怎样将Activity封装成长按Menu菜单的样子？
简单你只需要设置 一下Activity的主题就可以了在AndroidManifest.xml 中定义 Activity的地方一句话

    android :theme=”@android:style/Theme.Dialog”
    android:theme=”@android:style/Theme.Dialog”

这就使你的应用程序变成对话框的形式弹出来了，或者

    android:theme=”@android:style/Theme.Translucent”
    android:theme=”@android:style/Theme.Translucent”

就变成半透明的。

重写OnCreateOptionMenu方法来处理按下menu后的行为，然后再该方法中弹出对话框形式的Activity。

也可以利用事件监听来监听menu按键，并在该按钮按下后弹出对话框形式的Activity。

###6.介绍一下Android系统的体系结构
应用层：android的应用程序通常涉及用户界面和交互。
应用框架层：UI组件、各种管理器等。
函数库层：系统C库、媒体库、webkit、SQLite等。
linux核心库：linux系统运行的组件。

###7.描述下横竖屏切换时候 activity 的生命周期
不设置Activity的android:configChanges时,切屏会重新调用各个生命周期,切横屏时会执行一次,切竖屏时会执行两次.

设置Activity的android:configChanges=”orientation”时,切屏还是会重新调用各个生命周期,切横、竖屏时只会执行一次.

设置Activity的android:configChanges=”orientation|keyboardHidden”时,切屏不会重新调用各个生命周期,只会执行onConfigurationChanged方法.

###8.android 中的动画有哪几种，它们的特点和区别是什么 ?
两种，一种是补间动画（Tween）动画、还有一种是帧动画（Frame）动画。Tween动画，这种实现方式可以使视图组件移动、放大、缩小以及产生透明度的变化;另一种Frame动画，传统的动画方法，通过顺序的播放排列好的图片来实现，类似电影。

###9.一条最长的短信息约占多少 byte?
140byte，70个汉字。

###10.描述handler 机制的原理
andriod提供了 Handler 和 Looper 来满足线程间的通信。

Handler 先进先出原则。

Looper类用来管理特定线程内对象之间的消息交换(Message Exchange)。

1)Looper: 一个线程可以产生一个Looper对象，由它来管理此线程里的Message Queue(消息队列)。

2)Handler: 你可以构造Handler对象来与Looper沟通，以便push新消息到Message Queue里;或者接收Looper从Message Queue取出)所送来的消息。

3) Message Queue(消息队列):用来存放线程放入的消息。

4)线程：UI thread 通常就是main thread，而Android启动程序时会替它建立一个Message Queue。

###11.如何将 SQLite 数据库 (dictionary.db 文件 ) 与 apk 文件一起发布 ?
可以将dictionary.db文件复制到Eclipse Android工程中的res\raw目录中。所有在res\raw目录中的文件不会被压缩，这样可以直接提取该目录中的文件。

使用openDatabase方法来打开数据库文件，如果该文件不存在，系统会自动创建/sdcard/dictionary目录，并将res\raw目录中的 dictionary.db文件复制到/sdcard/dictionary目录中

###12.说说 android 中 mvc 的具体体现
mvc是model,view,controller的缩写，mvc包含三个部分：

模型（model）对象：是应用程序的主体部分，所有的业务逻辑都应该写在该层。

视图（view）对象：是应用程序中负责生成用户界面的部分。也是在整个mvc架构中用户唯一可以看到的一层，接收用户的输入，显示处理结果。

控制器（control）对象：是根据用户的输入，控制用户界面数据显示及更新model对象状态的部分，控制器更重要的一种导航功能，响应用户出发的相关事件，交给m层处理。

android鼓励弱耦合和组件的重用，在android中mvc的具体体现如下：

1)视图（view）：一般采用xml文件进行界面的描述，使用的时候可以非常方便的引入。

2)控制层（controller）：android的控制层的重任通常落在了众多的acitvity的肩上，这句话也就暗含了不要在acitivity中写过多的代码，要通过activity交割model业务逻辑层处理，这样做的另外一个原因是android中的acitivity的响应时间是5s，如果耗时的操作放在这里，程序就很容易被回收掉。

3)模型层（model）：对数据库的操作、对网络等的操作都应该在model里面处理，当然对业务计算等操作也是必须放在的该层的。

###13.请介绍下 Android 中常用的五种布局
帧布局（FrameLayout）

线性布局(LinearLayout)

表格布局(TableLayout)

相对布局(RelativeLayout)

绝对布局(AbsoluteLayout)

###14.如何启用 Service ，如何停用 Service
1)startService用于启动Service、stopService停止Service。

2)bindService绑定Service，unbindService解除Service的绑定。

###15.如何优化ListView
1、如果自定义适配器，那么在getView方法中要考虑方法传进来的参数contentView是否为null，如果为null就创建contentView并返回，如果不为null则直接使用。在这个方法中尽可能少创建view。

2、给contentView设置tag（setTag（）），传入一个viewHolder对象，用于缓存要显示的数据，可以达到图像数据异步加载的效果。

3、如果listview需要显示的item很多，就要考虑分页加载。比如一共要显示100条或者更多的时候，我们可以考虑先加载20条，等用户拉到列表底部的时候再去加载接下来的20条。

###16.描述4 种 activity 的启动模式
1)standard ：系统的默认模式，一次跳转即会生成一个新的实例。假设有一个activity命名为MainActivity，执行语句：

    startActivity(new Intent(MainActivity.this, MainActivity.class))

执行完上述语句之后，MainActivity将跳转到另外一个MainActivity，也就是现在的Task栈里面有MainActivity的两个实例。按返回键后你会发现仍然是在MainActivity（第一个）里面。

2)singleTop：singleTop 跟standard 模式比较类似。如果已经有一个实例位于Activity栈的顶部时，就不产生新的实例，而只是调用Activity中的newInstance()方法。如果不位于栈顶，会产生一个新的实例。例：当MainActivity为 singleTop 模式时，执行跳转后栈里面依旧只有一个实例，如果现在按返回键程序将直接退出。

3)singleTask： singleTask模式和后面的singleInstance模式都是只创建一个实例的。在这种模式下，无论跳转的对象是不是位于栈顶的activity，程序都不会生成一个新的实例（当然前提是栈里面已经有这个实例）。这种模式相当有用，在以后的多activity开发中，经常会因为跳转的关系导致同个页面生成多个实例，这个在用户体验上始终有点不好，而如果你将对应的activity声明为 singleTask 模式，这种问题将不复存在。

4)singleInstance: 设置为 singleInstance 模式的 activity 将独占一个task（感觉task可以理解为进程），独占一个task的activity与其说是activity，倒不如说是一个应用，这个应用与其他activity是独立的，它有自己的上下文activity。

###17.什么是Intent，如何使用？
Android基本的设计理念是鼓励减少组件间的耦合，因此Android提供了Intent (意图) ，Intent提供了一种通用的消息系统，它允许在你的应用程序与其它的应用程序间传递Intent来执行动作和产生事件。

使用Intent可以激活Android应用的三个核心组件：活动、服务和广播接收器。

通过startActivity() orstartActivityForResult()启动一个Activity；

过 startService() 启动一个服务，或者通过bindService() 和后台服务交互；

通过广播方法(比如 sendBroadcast(),sendOrderedBroadcast(),sendStickyBroadcast())发给broadcast receivers

###18.Android用的数据库是什么样的？它和sql有什么区别？为什么要用ContentProvide？它和sql的实现上有什么差别？
Adnroid用的是SQLite数据库。它和其他网络数据库类似，也是通过SQL对数据进行管理。SQLite的操作非常简单，包括数据类型在建表时也可以不指定。

使用ContentProvider 可以将数据共享给其他应用，让除本应用之外的应用也可以访问本应用的数据。

它的底层是用SQLite 数据库实现的，所以其对数据做的各种操作都是以Sql实现，只是在上层提供的是Uri。

###19.通过Intent传递一些二进制数据的方法有哪些?
1)使用Serializable接口实现序列化，这是Java常用的方法。
2)实现Parcelable接口，这里Android的部分类比如Bitmap类就已经实现了，同时Parcelable在Android AIDL中交换数据也很常见的。

###20.对一些资源以及状态的操作保存，最好是保存在生命周期的哪个函数中进行？
onResume()恢复数据、onPause()保存数据。

###21.如何一次性退出所有打开的Activity
编写一个Activity作为入口，当需要关闭程序时，可以利用Activity的SingleTop模式跳转该Activity，它上面的所有Activity都会被销毁掉。然后再将该Activity关闭。

或者再跳转时，设置intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);这样也能将上面的Activity销毁掉。

###22.说说Service的生命周期？
启动Service的方式有两种，各自的生命周期也有所不同。
一、通过startService启动Service：onCreate、onStartCommand、onDestory。
二、通过bindService绑定Service：onCreate、onBind、onUnbind、onDestory。

###23.什么是AIDL？AIDL是如何工作的？
AIDL(Android接口描述语言)是一种接口描述语言; 编译器可以通过aidl文件生成一段代码，通过预先定义的接口达到两个进程内部通信进程的目的. 如果需要在一个Activity中, 访问另一个Service中的某个对象, 需要先将对象转化成AIDL可识别的参数(可能是多个参数), 然后使用AIDL来传递这些参数, 在消息的接收端, 使用这些参数组装成自己需要的对象。AIDL是基于接口的，但它是轻量级的。它使用代理类在客户端和实现层间传递值.。

###24.Android如何把文件存放在SDCard上？
在AndroidManifest.xml中加入访问SDCard的权限如下:
<!– 在SDCard中创建与删除文件权限 –>

<!– 往SDCard写入数据权限 –>

要往SDCard存放文件，程序必须先判断手机是否装有SDCard，并且可以进行读写。
注意：访问SDCard必须在AndroidManifest.xml中加入访问SDCard的权限。

Environment.getExternalStorageState()方法用于获取SDCard的状态，如果手机装有SDCard，并且可以进行读写，那么方法返回的状态等于Environment.MEDIA_MOUNTED。

Environment.getExternalStorageDirectory()方法用于获取SDCard的目录。

###25.注册广播有几种方式，这些方式有何优缺点？
两种。一种是通过代码注册，这种方式注册的广播会跟随程序的生命周期。二种是在AndroidManifest.xml中配置广播，这种常驻型广播当应用程序关闭后，如果有信息广播来，程序也会被系统调用自动运行。

###26.什么是ANR 如何避免它?
在Android上，如果你的应用程序有一段时间响应不够灵敏，系统会向用户显示一个对话框，这个对话框称作应用程序无响应（ANR：Application Not Responding）对话框。用户可以选择让程序继续运行，但是，他们在使用你的应用程序时，并不希望每次都要处理这个对话框。因此，在程序里对响应性能的设计很重要，这样，系统不会显示ANR给用户。要避免它，应该尽量少在主线程做耗时太长的操作，应该将这些操作放在线程当中去做。

###27.Android本身的api并未声明会抛出异常，则其在运行时有无可能抛出runtime异常，你遇到过吗?诺有的话会导致什么问题?如何解决?
有可能，比如空指针异常、数组下表越界等异常，这些异常抛出后可能会导致程序FC。在编写代码时应该做好检测，多考虑可能会发生错误的情况，从代码层次解决这些问题。

###28.为什么要用 ContentProvider?它和 sql 的实现上有什么差别?
使用ContentProvider 可以将数据共享给其他应用，让除本应用之外的应用也可以访问本应用的数据。它的底层是用SQLite 数据库实现的，所以其对数据做的各种操作都是以Sql实现，只是在上层提供的是Uri。

###29.谈谈 UI 中, Padding 和 Margin 有什么区别?
padding指内边距，表示组件内部元素距离组件边框的距离。
marin指外边距，表示组件与组件之间的距离。

###30.请介绍下 Android 的数据存储方式。
Android 提供了5种方式存储数据：
1)使用SharedPreferences存储数据；
2)文件存储数据；
3)SQLite数据库存储数据；
4)使用ContentProvider存储数据；
5)网络存储数据；