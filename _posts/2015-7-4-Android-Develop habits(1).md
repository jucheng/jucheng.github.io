---
layout: post
title: " Android 好的开发习惯（1）"
date: 2015-7-4
categories: Android
tags: [Android，开发经验]
---

大家有哪些好的 Android 开发习惯(从知乎上边摘取和总结）

<!-- more -->

##一.AndroidUI优化
1.layout组件化，尽量使用merge及include复用

2.使用styles，复用样式定义

3.软键盘的弹出控制，不要让其覆盖输入框

4.数字、字母和汉字混排占位问题：将数字和字母全角化。由于现在大多数情况下我们的输入都是半角，所以 字母和数字的占位无法确定，但是一旦全角化之后，数字、字母的占位就和一个汉字的占位相同了，这样就可以避免由于占位导致的排版问题

5.英文文档排版：textview自动换行时要保持单词的完整性，解决方案是计算字符串长度，然后手动设定每一行显示多少个字母并加上‘n‘

6.复杂布局使用RelativeLayout

7.自适应屏幕，使用dp替代pix

8.使用android:layout_weight或者TableLayout制作等分布局

9.使用animation-list制作动画效果

##二、Android性能优化
1.http用gzip压缩，设置连接超时时间和响应超时时间

http请求按照业务需求，分为是否可以缓存和不可缓存，那么在无网络的环境中，仍然通过缓存的httpresponse浏览部分数据，实现离线阅读。

2.listview 性能优化

1).复用convertView
在getItemView中，判断convertView是否为空，如果不为空，可复用。如果couvertview中的view需要添加listerner，代码一定要在if(convertView==null){}之外。

2).异步加载图片

item中如果包含有webimage，那么最好异步加载

3).快速滑动时不显示图片

当快速滑动列表时（SCROLL_STATE_FLING），item中的图片或获取需要消耗资源的view，可以不显示出来；而处于其他两种状态（SCROLL_STATE_IDLE 和SCROLL_STATE_TOUCH_SCROLL），则将那些view显示出来

3.使用线程池

分为核心线程池和普通线程池，下载图片等耗时任务放置在普通线程池，避免耗时任务阻塞线程池后，导致所有异步任务都必须等待

4.异步任务

分为核心任务和普通任务，只有核心任务中出现的系统级错误才会报错，异步任务的ui操作需要判断原activity是否处于激活状态

5.尽量避免static成员变量引用资源耗费过多的实例,比如Context

6.使用WeakReference代替强引用，弱引用可以让您保持对对象的引用，同时允许GC在必要时释放对象，回收内存。对于那些创建便宜但耗费大量内存的对象，即希望保持该对象，又要在应用程序需要时使用，同时希望GC必要时回收时，可以考虑使用弱引用。

7.超级大胖子Bitmap

及时的销毁(Activity的onDestroy时，将bitmap回收)

设置一定的采样率

巧妙的运用软引用

drawable对应resid的资源，bitmap对应其他资源8.保证Cursor 占用的内存被及时的释放掉，而不是等待GC来处理。并且 Android明显是倾向于编程者手动的将Cursor close掉

9.线程也是造成内存泄露的一个重要的源头。线程产生内存泄露的主要原因在于线程生命周期的不可控

10.如果ImageView的图片是来自网络，进行异步加载

11.应用开发中自定义View的时候，交互部分，千万不要写成线程不断刷新界面显示，而是根据TouchListener事件主动触发界面的更新


##三.说说应用层的开发：
1.写代码前先在本子上画好大概的模块图，类图，能和同事讨论下最好。

2.使用开源代码务必搞懂主要实现方式，以便填坑。

3.应用内的资源要统一管理，如线程，缓存，网络，数据库，配置，设备事件监听等等，以便性能分析和维护。

4.合理使用设计模式，做好UI之间，和业务以及数据层的解耦非常必要，以便应付产品汪（褒义词）的各种变化。

5.管理好各种对象的生命周期，谁说Java不泄漏内存？来我泄漏给你看看。

6.不要总是TODO，因为翔留下就留下了，还得写新的翔，等后来的童鞋来收拾，被人骂骂也不好。

7.没事多看下Github，Android程序基本可以用一个个开源库搭积木搞出来，当然业务除外。也可以看看其他平台的库和各种框架，不要把自己局限在Android上。

8.关于注释，尽量写未来自己还看得懂的注释，曾经阅读同事的代码，懂了之后留下一句注释，半年后再次阅读，感叹道，辛亏老子留了条注释，不然又看不懂了。

9.代码风格团队要统一

10.提高基本素质，做程序员，而不是Android程序员。Google下，有Github上的Android常用库和框架这样的文章。

11.在布局中使用LinearLayout的android:weight属性时，将view的android:layout_width属性设置为0dp；

 13 涉及到APP的核心数据全部加密处理，在使用的时候解密；

 14 如果你的IDE是Eclipse，用好这几个快捷键，爽歪歪滴：

****CTRL + SHIFT + O**

**ALT + SHIFT + M**

**ALT + SHIFT + S**

**CTRL + O**

**CTRL + /**

**ALT + /**

**CTRL + D**

**CTRL + K**

**ALT + → 和 ALT + 左箭头**

**CTRL + SHIFT + X 和 CTRL + SHIFT + Y**

**F5、F6、F7、F8**

**F11**

**CTRL + M**

15 使用List、Map而不是ArrayList、HashMap声明成员变量、作为返回值、作为入参等等，尽量用抽象而不是具体实现。

16 . 在任何时候不使用类的finalize方法释放资源；

17 . 在finally中关闭文件流、cursor等等；

