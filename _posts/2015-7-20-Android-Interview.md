---
layout: post
title: "说说牛客网测试题"
date: 2015-7-20
categories: Android
tags: [Android，面试]
---
说说牛客网测试题

<!-- more -->

###1.考察AIDL
![](http://img-storage.qiniudn.com/15-7-20/66204415.jpg)

AIDL:Android Interface Definition Language,即Android接口定义语言。
Android 使用AIDL提供公开服务接口，使得不同进程间可以相互通信。

建立AIDL服务要比建立普通的服务复杂一些，具体步骤如下：

（1）在Eclipse Android工程的Java包目录中建立一个扩展名为aidl的文件。该文件的语法类似于Java代码，但会稍有不同。

（2）如果aidl文件的内容是正确的，ADT会自动生成一个Java接口文件（*.java）。

（3）建立一个服务类（Service的子类）。

（4）实现由aidl文件生成的Java接口。

（5）在AndroidManifest.xml文件中配置AIDL服务，尤其要注意的是，<action>标签中android:name的属性值就是客户端要引用该服务的ID，也就是Intent类的参数值。

（注：

aidl对应的接口名称必须与aidl文件名相同不然无法自动编译；

aidl对应的接口的方法不能加访问权限修饰符（记一下）

）

###2.考察ServiceConnection
![](http://img-storage.qiniudn.com/15-7-20/32304117.jpg)

（解释：

    servicedispatcher里面有个函数
    doconnection{
    if(service!=null){//其中service为Ibind类型
    mconnection.onserviceConnected(name,service)}
）


###3.考察初始化Button的注意点

阅读代码回答运行结果

    public classMainActivity extends Activity implements OnClickListener
    {
    private Button mBtnLogin = (Button) findViewById(R.id.btn_login);
    private TextView mTextViewUser;
  
    @Override
    protected void onCreate(BundlesavedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mTextViewUser = (TextView) findViewById(R.id.textview_user);
        mBtnLogin.setOnClickListener(this);
        new Thread()
        {
            @Override
            public void run()
            {
                mTextViewUser.setText(10);
            }
        }.start();
    }
  
    @Override
    public void onClick(View v)
    {
        mTextViewUser.setText(20);
    }
    }

![](http://img-storage.qiniudn.com/15-7-20/65234743.jpg)

（解析：

这道题考察的是button的初始化时候的问题：

**Button的初始化时找不到对应的id的。id绑定应该在setContentView后执行，setContentView在获取Button控件之后，导致还没有加载布局就在获取Button，肯定是找不到的，所以报空指针的错。**

干扰项很多。

A：**选A说明还是了解setText（int resID），尤其是注意显示数字时，转换成字符串。否则报错Resources$NotFoundException**。

B：**在android中，只有主线程才能修改View组件。所以出现了Handler，AsyncTask等在子线程进行耗时操作，然后在主线程中修改View**。

C：只有当layout 渲染之后才能找到该layout中的view，否则报错

）

###4.遇到下列哪种情况时需要把进程移到前台?

![](http://img-storage.qiniudn.com/15-7-20/96655254.jpg)

（解析：

![](http://img-storage.qiniudn.com/15-7-20/86702619.jpg)

）

###5.广播的注册
![](http://img-storage.qiniudn.com/15-7-20/28056862.jpg)

（注释：

广播的注册：两种，一种是在配置文件中注册；一种是在代码中动态的注册

**注册广播方法一**：

    IntentFilter intentFilter = new IntentFilter( "android.provider.Telephony.SMS_RECEIVED " );
    registerReceiver( mBatteryInfoReceiver , intentFilter);

第一个参数是我们要处理广播的   BroadcastReceiver   （广播接收者，可以是系统的，也可以是自定义的）；第二个参数是意图过滤器。

**注册广播方法二**：

    registerReceiver(receiver, filter, broadcastPermission, scheduler) 

   第一个参数是 BroadcastReceiver 广播接收者，可以是系统的，也可以是自定义的）；第二个参数是意图过滤器；第三个参数是广播权限；第四个参数是  Hander

在这里说明B答案是不对的，因为注销广播可以用以下方式：

    //  代码中注销广播 
    unregisterReceiver(mBatteryInfoReceiver);

）

###6.考察Toast提示时长
![](http://img-storage.qiniudn.com/15-7-20/11947457.jpg)

（注释：
**A.显示时长只有2种设置**
Toast.makeText(this, str, Toast.LENGTH_LONG).show();

**toast只能设置为 2s和3.5s ，其它的值都无效**，API的文档虽然写的第三个参数是时间，但是Framework里作了重定义，限定了 2s和3.5s 这两个值 ，对应 Toast.LENGTH_SHORT和Toast.LENGTH_LONG，

实现方式在NotificationManagerService.java的scheduleTimeoutLocked()这个函数里。

**Toast的默认显示时间有两个，分别为Toast.LENGTH_SHORT和Toast.LENGTH_LONG**

）

###7.有关于AlertDialog

![](http://img-storage.qiniudn.com/15-7-20/38107227.jpg)

（注释：

AlertDialog的构造方法被声明为protected：
![](http://img-storage.qiniudn.com/15-7-20/11508331.jpg)

所以不能直接使用new关键字来创建AlertDialog类的对象实例。要想创建AlertDialog对话框，需要使用Builder类，该类是AlertDialog类中定义的一个内嵌类。

因此必须创建AlertDialog.Builder类的对象实例，然后再调用show()来显示对话框。

      AlertDialog.Builder db= new Builder(this);
                    db..create().show();
B项解释：

![](http://img-storage.qiniudn.com/15-7-20/59970957.jpg)
![](http://img-storage.qiniudn.com/15-7-20/76298454.jpg)

）

###8. Intent传递数据

![](http://img-storage.qiniudn.com/15-7-20/73860103.jpg)

（注释：
**Serializable :**

将 Java 对象序列化为二进制文件的 Java 序列化技术是 Java系列技术中一个较为重要的技术点，在大部分情况下，开发人员只需要了解被序列化的类需要实现 Serializable 接口，使用ObjectInputStream 和 ObjectOutputStream 进行对象的读写。

**charsequence  :**

在JDK1.4中，引入了CharSequence接口，实现了这个接口的类有：CharBuffer、String、StringBuffer、StringBuilder这个四个类。

CharBuffer为nio里面用的一个类，String实现这个接口理所当然，StringBuffer也是一个CharSequence，StringBuilder是Java抄袭C#的一个类，基本和StringBuffer类一样，效率高，但是不保证线程安全，在不需要多线程的环境下可以考虑。

提供这么一个接口，有些处理String或者StringBuffer的类就不用重载了。但是这个接口提供的方法有限，只有下面几个：charat、length、subSequence、toString这几个方法，感觉如果有必要，还是重载的比较好，避免用instaneof这个操作符。

**Parcelable  :**

android提供了一种新的类型：Parcel。本类被用作封装数据的容器，封装后的数据可以通过Intent或IPC传递。 除了基本类型以
外，只有实现了Parcelable接口的类才能被放入Parcel中。
是GOOGLE在安卓中实现的另一种序列化,功能和Serializable相似,主要是序列化的方式不同

**Bundle:**

Bundle是将数据传递到另一个上下文中或保存或回复你自己状态的数据存储方式。它的数据不是持久化状态。

）


###9.在android中使用Menu时可能需要重写的方法有?

![](http://img-storage.qiniudn.com/15-7-20/93813877.jpg)

（注释：

一个是创建菜单的方法，还有一个是菜单项点击事件方法）

）

###10.对数据库版本进行管理的方法
![](http://img-storage.qiniudn.com/15-7-20/91538058.jpg)

（注释：

如果只是数据库的查询，则只需调用getReadableDatabase()，获取数据库的信息。

如果是修改的话，则使用 getWriteableDatabase()方法，对数据库进行修改。

）

###11.有关service生命周期
![](http://img-storage.qiniudn.com/15-7-20/36048588.jpg)

###12.NDK
![](http://img-storage.qiniudn.com/15-7-20/94537505.jpg)

(注释：
NDK是一系列工具的集合， NDK 提供了一系列的工具，帮助开发者迅速的开发 C/C++ 的动态库，并能自动将 so 和 java  应用打成 apk 包。 
NDK集成了交叉编译器，并提供了相应的 mk 文件和隔离 cpu 、平台等的差异，开发人员只需简单的修改 mk 文件就可以创建出 so。

）

###13.有关Activity生命周期
![](http://img-storage.qiniudn.com/15-7-20/15978070.jpg)

（注释：
launchMode 为 singleTask 的时候，通过 Intent 启到一个 Activity, 如果系统已经存在一个实例，系统就会将请求发送到这个实例上，但这个时候，系统就不会再调用通常情况下我们处理请求数据的 onCreate 方法，而是调用 onNewIntent 方法

）

####14.ANR和Force close
![](http://img-storage.qiniudn.com/15-7-20/94817259.jpg)

（注释：
AD：产生ANR，程序没有响应，有可能程序会再次响应

BC：程序抛出异常，会强制退出

）


###14.资源池
![](http://img-storage.qiniudn.com/15-7-20/35860625.jpg)

(注释：

A.Message提供了消息池，有静态方法Obtain从消息池中取对象；

B.Thread默认不提供资源池，除非使用线程池ThreadPool管理；

C.AsynTask是线程池改造的，默认提供最多5个线程进行并发操作；

D.Looper，每个Looper创建时创建一个消息队列和线程对象，也不是资源池；
因此答案为AC

首先我们确定有资源池的对象，Message有MessageQuere,Thread有ThreadPool,AsyncTask也有android定义的ThreadPool。Looper不管是jdk带的，还是android定义的都没有资源池。那么在看一下题目，“Android”系统提供的。那么就排除上面jdk自带的Thread，所以答案是AC算是比较合理的选择。

)

###15.关于IntentService与Service的关系
![](http://img-storage.qiniudn.com/15-7-20/79558626.jpg)

（注释：

IntentService是继承Service的，那么它包含了Service的全部特性，当然也包含service的生命周期，那么与service不同的是，IntentService在执行onCreate操作的时候，内部开了一个线程，去你执行你的耗时操作。 

Service在OnStart中处理intent，并且是在主线程中运行
IntentService会启动工作线程处理intent，并且是逐个处理intent的

)

###16.Android中定义style和theme
![](http://img-storage.qiniudn.com/15-7-20/45548565.jpg)

(注释：

A：两者出现都是为了方便使用

B：清单文件中Activity可以配置theme属性，指定Style，例：android:theme="@style/MyTitleBar

C：theme貌似不能继承

D:刚运行尝试了，style中定义字体颜色为红色，TextView本身设置textColor为黑色，结果是黑色，也就是以TextView本身为准！

）

###17.考察ListView
![](http://img-storage.qiniudn.com/15-7-20/3770791.jpg)

（注释：

CD对于Listiew来说，getViewTypeCount 和getItemViewType主要用于为不同的列表项目提供不同的视图view

）