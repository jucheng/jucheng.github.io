---
layout: post
title: " Android 好的开发习惯（3）"
date: 2015-7-4
categories: Android
tags: [Android，开发经验]
---

大家有哪些好的 Android 开发习惯(从知乎上边摘取和总结）

<!-- more -->


###1、高效地利用线程

我们知道App运行过程中所有的操作都默认在主线程（UI线程）中进行的，这样App的响应速度就会受到影响。会导致程序陷入卡顿、死掉甚至会发生系统错误。

**为了加快响应速度，需要把费时的操作（比如网络请求、数据库操作或者复杂的计算）从主线程移动到一个单独的线程中**。

**最高效的方式就是在类这一级完成这项操作，可以使用AsyncTask或者IntentService来创建后台操作**。如果选择使用IntentService，它会在需要的时候启动起来，然后通过一个工作线程来处理请求（Intent）。

使用IntentService时需要注意以下几点限制：
这个类不要给UI传递信息，如果要向用户展示处理结果信息请用Activity；
每次只能处理一个请求；
每一个处理请求过程都不能中断；

###2、保持响应不发生ANR

**从UI线程中移除费时操作这个方式还可以防止用户操作出现系统不响应（ANR）对话框。需要做的就是继承AsyncTask来创建一个后台工作线程，并实现doInBackground()方法**。

**还有一种方式就是自己创建一个Thread类或者HandlerThread类。需要注意这样也会使App变慢，因为默认的线程优先级和主线程的优先级是一样的，除非你明确设定线程的优先级**。

###3、在线程中初始化查询操作

**当查询操作正在后台处理时，展示数据也不是即时的，但是你可以使用CursorLoader对象来加快速度**，这个操作可以使Activity和用户之间的互动不受影响。

使用这个对象后，你的App会为ContentProvider初始化一个独立的后台线程进行查询，当查询结束后就会给调用查询的Activity返回结果。

###4、需要注意的方面

**使用StrictMode来检查UI线程中可能潜在的费时操作**；

使用一些特殊的工具如Systrace或者Traceview来寻找在你的应用中的瓶颈；

用进度条向用户展示操作进度；

**如果初始化操作很费时，请展示一个欢迎界面**。

优化设备的电池寿命。如果应用很费电，请不要责怪用户卸载了你的应用。

对于电池使用来说，主要费电情况如下：

更新数据时经常唤醒程序；

用EDGE或者3G来传递数据；

文本数据转换，进行非JIT正则表达式操作。

###5、优化网络

如果没有网络连接，请让你的应用跳过网络操作；只在有网络连接并且无漫游的情况下更新数据；

选择兼容的数据格式，把含有文本数据和二进制数据的请求全部转化成二进制数据格式请求；

使用高效的转换工具，多考虑使用流式转换工具，少用树形的转换工具；

为了更快的用户体验，请减少重复访问服务器的操作；

如果可以的话，请使用framework的GZIP库来压缩文本数据以高效使用CPU资源。

###6、优化应用在前端的工作

如果考虑使用wakelocks，尽量设置为最小的级别；

为了防止潜在的bug导致的电量消耗，请明确指定超时时间；

启用 android:keepScreenOn属性；

除了系统的GC操作，多考虑手动回收Java对象，比如XmlPullParserFactory和BitmapFactory。还有正则表达式的Matcher.reset(newString)操作、StringBuilder.setLength(0)操作；

**要注意同步的问题，尽管在主线程中是安全的**；

**在Listview中要多采用重复利用策略**；

如果允许的话多使用粗略的网络定位而不用GPS，对比一下GPS需要1mAh（25s * 140 mA），而一般网络只用0.1mAh（2s * 180mA）；

确保注销GPS的位置更新操作，因为这个更新操作在onPause()中也是会继续的。当所有的应用都注销了这个操作，用户可以在系统设置中重新启用GPS而不浪费电量；

请考虑在大量数理运算中使用低精度变量并在用DisplayMetrics进行DPI任务时缓存变量值；

###7、优化工作在前台的应用

请确保service生命周期都是短暂的，因为每个进程都需要2MB的内存，而在前台程序需要内存时也会重新启动；

保持内存的使用量不要太大；

如果要应用每30分钟更新一次，请在设备处于唤醒状态下进行；

**Service在pull或者sleep状态都是不好的，这就是为什么在服务结束时要使用AlarmManager或者配置属性stopSelf()的原因**。

###8、电池其它注意事项

在进行整体更新之前检查电池的状态和网络状态，等待最好的状态再进行大幅度装换操作；
让用户看到用电情况，比如更新周期，后台操作的时候；

###9、怎么找到布局显示问题

当我们为布局单独创建UI的时候，就是在创建滥用内存的App，它在UI中会出现可恶的延时。
要实现一个流畅的、低内存占用的UI:

第一步就是搜索你的应用找出潜在的瓶颈布局。**使用Android SDK/tools/中自带的Hierarchy Viewer Tool工具**。

还有一个很好的工具就是Lint，它会扫描应用的源码去寻找可能存在的bug，并为控件结果进行优化。

###10、解决问题

如果布局显示结果发现了问题，你可以考虑简化布局结构。**可以把LinearLayout类型转化成RelativeLayout类型，降低布局的层级结构**。