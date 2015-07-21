---
layout: post
title: "一些安卓基础总结"
date: 2015-7-21
categories: Android
tags: [Android，面试]
---
一些安卓基础总结

<!-- more -->


###1..谈谈android大众常用的五种布局。
Android 布局是应用界面开发的重要一环，在 Android 中，共有五种布局方式，分别是：FrameLayout （框架布局）， LinearLayout （线性布局），
AbsoluteLayout （绝对布局）， RelativeLayout （相对布局）， TableLayout （表格布局）。

**1.FrameLayout**

这个布局可以看成是墙脚堆东西，有一个四方的矩形的左上角墙脚，我们放了第一个东西，要再放一个，那就在放在原来放的位置的上面，这样依次的放，会盖住原来的东西。这个布局比较简单，也只能放一点比较简单的东西。

**2.LinearLayout**

线性布局，这个东西，从外框上可以理解为一个 div ，他首先是一个一个从上往下罗列在屏幕上。每一个 LinearLayout 里面又可分为垂直布局 （ android:orientation=”vertical” ）和水平布局（android:orientation=”horizontal” ）。当垂直布局时，每一行就只有一个元素，多个元素依次垂直往下；水平布局时，只有一行，每一个元素依次向右排列。

**linearLayout 中有一个重要的属性 android:layout_weight=”1″** ，这个 weight 在垂直布局时，代表行距；水平的时候代表列宽； weight 值越大就越大。

**3.AbsoluteLayout**

绝对布局犹如 div 指定了 absolute 属性，用 X,Y 坐标来指定元素的位置 

android:layout_x=”20px” android:layout_y=”12px” 这种布局方式也比较简单，但是在垂直随便切换时，往往会出问题，而且多个元素的时候，计算比较麻烦。

**4.RelativeLayout**

相对布局可以理解为某一个元素为参照物，来定位的布局方式。主要属性有：

相对于某一个元素

android:layout_below=”@id/aaa” 该元素在 id 为 aaa 的下面
android:layout_toLeftOf=”@id/bbb” 改元素的左边是 bbb

相对于父元素的地方

android:layout_alignParentLeft=”true” 在父元素左对齐
android:layout_alignParentRight=”true” 在父元素右对齐

还可以指定边距等，具体详见 API

**5.TableLayout**

表格布局类似 Html 里面的 Table 。每一个 TableLayout 里面有表格行 TableRow ， TableRow 里面可以具体定义每一个元素，设定他的对齐方式 android:gravity=”" 。

每一个布局都有自己适合的方式，另外，这五个布局元素可以相互嵌套应用，做出美观的界面。

###2.请谈一下Android系统的架构。

答：Android系统采用了分层架构，从高层到低层分别是应用程序层、应用程序框架层、系统运行库层和linux核心层。

###3.谈谈android数据存储方式。

答：Android提供了5种方式存储数据：

（1）使用SharedPreferences存储数据；它是Android提供的用来存储一些简单配置信息的一种机制，采用了XML格式将数据存储到设备中。只能在同一个包内使用，不能在不同的包之间使用。

（2）文件存储数据；文件存储方式是一种较常用的方法，在Android中读取/写入文件的方法，与Java中实现I/O的程序是完全一样的，提供了openFileInput()和openFileOutput()方法来读取设备上的文件。

（3）SQLite数据库存储数据；SQLite是Android所带的一个标准的数据库，它支持SQL语句，它是一个轻量级的嵌入式数据库。

（4）使用ContentProvider存储数据；主要用于应用程序之间进行数据交换，从而能够让其他的应用保存或读取此Content Provider的各种数据类型。

（5）网络存储数据；通过网络上提供给我们的存储空间来上传(存储)和下载(获取)我们存储在网络空间中的数据信息。

###4.Android中Activity, Intent, Content Provider, Service各有什么区别。

答：Activity： 活动，是最基本的android应用程序组件。一个活动就是一个单独的屏幕，每一个活动都被实现为一个独立的类，并且从活动基类继承而来。

Intent： 意图，描述应用想干什么。最重要的部分是动作和动作对应的数据。

Content Provider：内容提供器，android应用程序能够将它们的数据保存到文件、SQLite数据库中，甚至是任何有效的设备中。当你想将你的应用数据和其他应用共享时，内容提供器就可以发挥作用了。

Service：服务，具有一段较长生命周期且没有用户界面的程序。

###5.View, surfaceView, GLSurfaceView有什么区别。

答：view是最基础的，必须在UI主线程内更新画面，速度较慢。

SurfaceView 是view的子类，类似使用双缓机制，在新的线程中更新画面所以刷新界面速度比view快

GLSurfaceView 是SurfaceView的子类，opengl 专用的

###6.Adapter有什么作用？常见的Adapter有哪些？

答：Adapter是连接后端数据和前端显示的适配器接口。

常见的Adapter有ArrayAdapter, BaseAdapter, CursorAdapter, HeaderViewListAdapter, ListAdapter, ResourceCursorAdapter, SimpleAdapter, SimpleCursorAdapter, SpinnerAdapter, WrapperListAdapter等

###7.Manifest.xml文件中主要包括哪些信息？

答：

**manifest**：根节点，描述了package中所有的内容。

**uses-permission：**请求你的package正常运作所需赋予的安全许可。

**permission**： 声明了安全许可来限制哪些程序能你package中的组件和功能。

**instrumentation**：声明了用来测试此package或其他package指令组件的代码。

**application**：包含package中application级别组件声明的根节点。

**activity**：Activity是用来与用户交互的主要工具。

**receiver**：IntentReceiver能使的application获得数据的改变或者发生的操作，即使它当前不在运行。

**service**：Service是能在后台运行任意时间的组件。

**provider**：ContentProvider是用来管理持久化数据并发布给其他应用程序使用的组件。


###8.横竖屏切换时候 activity 的生命周期

1.不设置 Activity 的 android:configChanges 时 , 切屏会重新调用各个生命周期 , 切横屏时会执行一次 , 切竖屏时会执行两次 .

2.设置 Activity 的 android:configChanges=”orientation” 时 , 切屏还是会重新调用各个生命周期 , 切横、竖屏时只会执行一次 .

3.设置 Activity 的 android:configChanges=”orientation|keyboardHidden” 时 , 切屏不会重新调用各个生命周期 , 只会执行 onConfigurationChanged 方法 .

###9.android 中线程与线程，进程与进程之间如何通信

1 、一个 Android 程序开始运行时，会单独启动一个 Process 。

默认情况下，所有这个程序中的 Activity 或者 Service 都会跑在这个 Process 。
默认情况下，一个 Android 程序也只有一个 Process ，但一个 Process 下却可以有许多个 Thread。

2 、一个 Android 程序开始运行时，就有一个主线程 Main Thread 被创建。该线程主要负责 UI 界面的显示、更新和控件交互，所以又叫 UI Thread 。

一个 Android 程序创建之初，一个 Process 呈现的是单线程模型 — 即 Main Thread ，所有的任务都在一个线程中运行。所以， Main Thread 所调用的每一个函数，其耗时应该越短越好。而对于比较费时的工作，应该设法交给子线程去做，以避免阻塞主线程（主线程被阻塞，会导致程序假死 现象）。

3 、 Android 单线程模型： Android UI 操作并不是线程安全的并且这些操作必须在 UI 线程中执行。如果在子线程中直接修改 UI ，会导致异常。

###10.android 中的动画有哪几类，它们的特点和区别是什么 ?

两种，一种是 Tween 动画、还有一种是 Frame 动画。 Tween 动画，这种实现方式可以使视图组件移动、放大、缩小以及产生透明度的变化 ; 另一种 Frame 动画，传统的动画方法，通过顺序的播放排列好的图片来实现，类似电影

###11.在 android 中 mvc 的具体体现

**MVC 是 Model,View,Controller 的缩写**，从上图可以看出 MVC 包含三个部分：

.. **模型（ Model ）对象**：是应用程序的主体部分，所有的业务逻辑都应该写在该
层。

.. **视图（ View ）对象**：是应用程序中负责生成用户界面的部分。也是在整个
MVC 架构中用户唯一可以看到的一层，接收用户的输入，显示处理结果。

.. **控制器（ Control ）对象**：是根据用户的输入，控制用户界面数据显示及更新
Model 对象状态的部分，控制器更重要的一种导航功能，想用用户出发的相
关事件，交给 M 处理得了

Android 鼓励弱耦合和组件的重用，在 Android 中 MVC 的具体体现如下

**1) 视图层（ view ）** ：一般采用 xml 文件进行界面的描述，使用的时候可以非常方便的引入，当然，如何你对 android 了解的比较的多了话，就一定可 以想到在 android 中也可以使用javascript+html 等的方式作为 view 层，当然这里需要进行 java 和 javascript 之间的通 信，幸运的是， android 提供了它们之间非常方便的通信实现。

**2) 控制层（ controller ）**： android 的控制层的重 任通常落在了众多的 acitvity 的肩上，这句话也就暗含了不要在 acitivity 中写代码，要通过 activity 交割 model 业务逻辑层处理， 这样做的另外一个原因是 android 中的 acitivity 的响应时间是 5s ，如果耗时的操作放在这里，程序就很容易被回收掉。

**3) 模型层（ model ）**： 对数据库的操作、对网络等的操作都应该在 model 里面处理，当然对业务计算等操作也是必须放在的该层的。

###12.如何启用 Service ，如何停用 Service

Android 中的服务和 windows 中的服务是类似的东西，服务一般没有用户操作界面，它运行于系统中不容易被用户发觉，可以使用它开发如监控之类的程序。服务的开发比较简单，如下：

**第一步：继承 Service 类**

    public class SMSService extends Service {}

**第二步：在 AndroidManifest.xml 文件中的 节点里对服务进行配置** :


服务不能自己运行，需要通过调用 Context.startService() 或 Context.bindService() 方法启动服务。这两个方法都可以启动 Service ，但是它们的使用场合有所不同。使用 startService() 方法启用服务，调用者与服务之间没有关连，即使调用者退出了，服务仍然运行。使用 bindService() 方法启用服务，调用者与服务绑定在了一起，调用者一旦退出，服务也就终止，大有“不求同时生，必须同时死”的特点。

**如果打算采用 Context.startService() 方法启动服务**，在服务未被创建时，系统会先调用服务的onCreate() 方法，接着调用 onStart() 方法。如果调用 startService() 方法前服务已经被创建，多次调用 startService() 方法并不会导致多次创建服务，但会导致多次调用 onStart() 方法。采用startService() 方法启动的服务，只能调用 Context.stopService() 方法结束服务，服务结束时会调用onDestroy() 方法。

**如果打算采用 Context.bindService() 方法启动服务**，在服务未被创建时，系统会先调用服务的onCreate() 方法，接着调用 onBind() 方法。这个时候调用者和服务绑定在一起，调用者退出了，系统就会先调用服务的 onUnbind() 方法，接着调用 onDestroy() 方法。如果调用 bindService() 方法前服务已经被绑定，多次调用 bindService() 方法并不会导致多次创建服务及绑定 ( 也就是说onCreate() 和 onBind() 方法并不会被多次调用 ) 。如果调用者希望与正在绑定的服务解除绑定，可以调用 unbindService() 方法，调用该方法也会导致系统调用服务的 onUnbind()–>onDestroy() 方法。

**服务常用生命周期回调方法如下：**

onCreate() 该方法在服务被创建时调用，该方法只会被调用一次，无论调用多少次 startService() 或bindService() 方法，服务也只被创建一次。

onDestroy() 该方法在服务被终止时调用。

**与采用 Context.startService() 方法启动服务有关的生命周期方法:**

onStart() 只有采用 Context.startService() 方法启动服务时才会回调该方法。该方法在服务开始运行时被调用。多次调用 startService() 方法尽管不会多次创建服务，但 onStart() 方法会被多次调用。

**与采用 Context.bindService() 方法启动服务有关的生命周期方法:**

onBind() 只有采用 Context.bindService() 方法启动服务时才会回调该方法。该方法在调用者与服务绑定时被调用，当调用者与服务已经绑定，多次调用 Context.bindService() 方法并不会导致该方法被多次调用。
onUnbind() 只有采用 Context.bindService() 方法启动服务时才会回调该方法。该方法在调用者与服务解除绑定时被调用

**采用 Context.startService() 方法启动服务的代码如下：**

    public class HelloActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
    ……
    Button button =(Button) this.findViewById(R.id.button);
    button.setOnClickListener(new View.OnClickListener(){
        public void onClick(View v) {
    Intent intent = new Intent(HelloActivity.this, SMSService.class);
    startService(intent);
    }});
    }
    }

**采用 Context. bindService() 方法启动服务的代码如下：**

    public class HelloActivity extends Activity {
    ServiceConnection conn = new ServiceConnection() {
    public void onServiceConnected(ComponentName name, IBinder service) {
    }
    public void onServiceDisconnected(ComponentName name) {
    }
    };
    @Override
    public void onCreate(Bundle savedInstanceState) {
    Button button =(Button) this.findViewById(R.id.button);
    button.setOnClickListener(new View.OnClickListener(){
    public void onClick(View v) {
    Intent intent = new Intent(HelloActivity.this, SMSService.class);
    bindService(intent, conn, Context.BIND_AUTO_CREATE);
    //unbindService(conn);// 解除绑定
    }});
    }
    }


###13.ListView 优化
工作原理 :

ListView 针对 List 中每个 item ，要求 adapter “ 给我一个视图 ” (getView) 。
一个新的视图被返回并显示

如果我们有上亿个项目要显示怎么办?为每个项目创建一个新视图? NO! 这不可能！
实际上 Android 为你缓存了视图。

Android 中有个叫做 Recycler 的构件，下图是他的工作原理：

如果你有 10 亿个项目 (item) ，其中只有可见的项目存在内存中，其他的在 Recycler 中。

1.ListView 先请求一个 type1 视图 (getView) 然后请求其他可见的项目。 convertView 在 getView 中是空 (null) 的 。

2.当 item1 滚出屏幕，并且一个新的项目从屏幕低端上来时， ListView 再请求一个 type1 视图。convertView 此时不是空值了，它的值是 item1 。你只需设定新的数据然后返回 convertView，不必重新创建一个视图。


####14.广播接收者生命周期

一个广播接收者有一个回调方法：

    void onReceive(Context curContext , Intent broadcastMsg )。

当一个广播消息到达接收者是， Android 调用它的 onReceive() 方法并传递给它包含消息的 Intent对象。广播接收者被认为仅当它执行这个方法时是活跃的。当 onReceive() 返回后，它是不活跃的。

有一个活跃的广播接收者的进程是受保护的，不会被杀死。但是系统可以在任何时候杀死仅有不活跃组件的进程，当占用的内存别的进程需要时。

这带来一个问题，当一个广播消息的响应时费时的，因此应该在独立的线程中做这些事，远离用户界面其它组件运行的主线程。如果 onReceive() 衍生线程然后返回，整个进程，包括新的线程，被判定为不活跃的（除非进程中的其它应用程序组件是活跃的），将使它处于被杀的危机。解决这个问题的方法是 onReceive() 启动一个服务，及时服务做这个工作，因此系统知道进程中有活跃的工作在做。


###15.设计模式和 IoC( 控制反转 )

Android 框架魅力的源泉在于 IoC ，在开发 Android 的过程中你会时刻感受到 IoC 带来
的巨大方便，就拿 Activity 来说，下面的函数是框架调用自动调用的：

    protected void onCreate(Bundle savedInstanceState) ；

不是程序编写者主动去调用，反而是用户写的代码被框架调用，这也就反转
了！当然 IoC 本身的内涵远远不止这些，但是从这个例子中也可以窥视出 IoC
带来的巨大好处。此类的例子在 Android 随处可见，例如说数据库的管理类，
例如说 Android 中 SAX 的 Handler 的调用等。有时候，您甚至需要自己编写简
单的 IoC 实现，上面展示的多线程现在就是一个说明。

###16.Android 中的长度单位详解

现在这里介绍一下 dp 和 sp 。

 dp 也就是 dip 。这个和 sp 基本类似。如果设置表示长度、高度等属性时可以使用 dp 或 sp 。但如果设置字体，需要使用 sp 。

 dp 是与密度无关， sp 除了与密度无关外，还与 scale 无关。如果屏幕密度为 160 ，这时 dp 和 sp 和 px 是一样的。

 1dp=1sp=1px ，但如果使用 px 作单位，如果屏幕大小不变（假设还是 3.2 寸），而屏幕密度变成了 320 。那么原来TextView 的宽度设成 160px ，在密度为 320 的 3.2 寸屏幕里看要比在密度为 160 的 3.2 寸屏幕上看短了一半。但如果设置成 160dp 或 160sp 的话。系统会自动将 width 属性值设置成 320px 的。也就是 160 * 320 / 160 。其中 320 / 160 可称为密
度比例因子。

也就是说，如果使用 dp 和 sp ，系统会根据屏幕密度的变化自动
进行转换

下面看一下其他单位的含义

px ：表示屏幕实际的象素。例如， 320*480 的屏幕在横向有 320 个象素，
在纵向有 480 个象素。

in ：表示英寸，是屏幕的物理尺寸。每英寸等于 2.54 厘米。例如，形容
手机屏幕大小，经常说， 3.2 （英）寸、 3.5 （英）寸、 4 （英）寸就是指这个
单位。这些尺寸是屏幕的对角线长度。如果手机的屏幕是 3.2 英寸，表示手机
的屏幕（可视区域）对角线长度是 3.2*2.54 = 8.128 厘米。读者可以去量
一量自己的手机屏幕，看和实际的尺寸是否一致。

###17.四种 activity 的启动模式
**standard**: 标准模式 ，一调用 startActivity() 方法就会产生一个新的实例。

**singleTop** : 如果已经有一个实例位于 Activity 栈的顶部时，就不产生新的实例，而只是调用 Activity中的 newInstance() 方法。如果不位于栈顶，会产生一个新的实例。

**singleTask** : 会在一个新的 task 中产生这个实例，以后每次调用都会使用这个，不会去产生新的实例了。

**singleInstance** : 这个跟 singleTask 基本上是一样，只有一个区别：在这个模式下的 Activity 实例所处的 task 中，只能有这个 activity 实例，不能有其他的实例。

###18. 什么是 ANR 如何避免它 ?
**ANR ： Application Not Responding** 

在 Android 中，活动管理器和窗口管理器这两个系统服务负责监视应用程序的响应。当出现下列情况时， Android 就会显示 ANR 对话框了：

**对输入事件 ( 如按键、触摸屏事件 ) 的响应超过 5 秒**

**意向接受器 (intentReceiver) 超过 10 秒钟仍未执行完毕**

**Android 应用程序完全运行在一个独立的线程中 ( 例如 main)** 。

**这就意味着，任何在主线程中运行的，需要消耗大量时间的操作都会引发 ANR 。因为此时，你的应用程序已经没有机会去响应输入事件和意向广播 (Intent broadcast) 。**

**因此，任何运行在主线程中的方法，都要尽可能的只做少量的工作。**

特别是活动生命周期中的重要方法如 onCreate() 和 onResume() 等更应如此。潜在的比较耗时的操作，如访问网络和数据库; 或者是开销很大的计算，比如改变位图的大小，需要在一个单独的子线程中完成 ( 或者是使用异步请求，如数据库操作 ) 。

但这并不意味着你的主线程需要进入阻塞状态已等待子线程结束 — 也不需要调用 Therad.wait() 或者 Thread.sleep() 方法。取而代之的是，主线程为子线程提供一个句柄(Handler) ，让子线程在即将结束的时候调用它 (xing: 可以参看 Snake 的例子，这种方法与以前我们所接触的有所不同 ) 。

使用这种方法涉及你的应用程序，能够保证你的程序对输入保持良好的响应，从而避免因为输入事件超过 5 秒钟不被处理而产生的 ANR 。这种实践需要应用到所有显示用户界面的线程，因为他们都面临着同样的超时问题。

###19.Android Intent 的使用
在一个 Android 应用中，主要是由一些组件组成，（ Activity,Service,ContentProvider,etc.) 在这些组件之间的通讯中，由 Intent 协助完成。

正如网上一些人解析所说， Intent 负责对应用中一次操作的动作、动作涉及数据、附加数据进行描述， Android 则根据此 Intent 的描述，负责找到对应的组件，将 Intent 传递给调用的组件，并完成组件的调用。 Intent 在这里起着实现调用者与被调用者之间的解耦作用。

Intent 传递过程中，要找到目标消费者（另一个 Activity,IntentReceiver 或 Service ），也就是 Intent的响应者，有两种方法来匹配：

**1 ，显示匹配（ Explicit) ：** 

    public TestB extents Activity
    {
     ………
     };
    public class Test extends Activity
    {
    ……
    public void switchActivity()
    {
    Intent i = new Intent(Test.this, TestB.class);
    this.startActivity(i);
    }
    }

代码简洁明了，执行了 switchActivity() 函数，就会马上跳转到名为 TestB 的 Activity 中。

**2 ，隐式匹配 (Implicit):** 

隐式匹配，首先要匹配 Intent 的几项值： Action, Category, Data/Type,Component
如果填写了 Componet 就是上例中的 Test.class) 这就形成了显示匹配。所以此部分只讲前几种匹配。匹配规则为最大匹配规则，

1.**如果你填写了 Action** 

如果有一个程序的 Manifest.xml 中的某一个 Activity 的 IntentFilter 段中定义了包含了相同的 Action 那么这个 Intent 就与这个目标 Action 匹配，如果这个 Filter 段中没有定义 Type,Category ，那么这个 Activity 就匹配了。但是如果手机中有两个以上的程序匹配，那么就会弹出一个对话可框来提示说明。

Action 的值在 Android 中有很多预定义，如果你想直接转到你自己定义的 Intent 接收者，你可以在接收者的 IntentFilter 中加入一个自定义的 Action 值（同时要设定 Category 值为”android.intent.category.DEFAULT” ），在你的 Intent 中设定该值为 Intent 的 Action, 就直接能跳转到你自己的 Intent 接收者中。因为这个 Action 在系统中是唯一的。

**2.data/type** 

你可以用 Uri 来做为 data, 比如 Uri uri = Uri.parse(http://www.google.com );
Intent i = new Intent(Intent.ACTION_VIEW,uri); 手机的 Intent 分发过程中，会根据http://www.google.com 的 scheme 判断出数据类型 type
手机的 Brower 则能匹配它，在 Brower 的 Manifest.xml 中的 IntenFilter 中首先有 ACTION_VIEW Action, 也能处理 http: 的 type ，

**3 .至于分类 Category** 

一般不要去在 Intent 中设置它，如果你写 Intent 的接收者，就在Manifest.xml 的 Activity 的 IntentFilter 中包含 android.category.DEFAULT, 这样所有不设置 Category（ Intent.addCategory(String c); ）的 Intent 都会与这个 Category 匹配。

**4.extras （附加信息)**

是其它所有附加信息的集合。使用 extras 可以为组件提供扩展信息，比如，如果要执行 “ 发送电子邮件 ” 这个动作，可以将电子邮件的标题、正文等保存在 extras 里，传给电子邮件发送组件。