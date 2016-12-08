---
layout: post
title: "Android开发中错误集中营"
date: 2015-7-24
categories: Android
tags: [Android，调试]
---
Android开发中错误集中营

<!-- more -->


### 1.eclipse的左侧的导航栏有时候会不见了的的调节方法：

![](http://img-storage.qiniudn.com/15-7-24/23716141.jpg)

### 2.在这个过程中遇到了以下这个的问题，这是一个布局里边比较常见的问题：

就是其中的：

**tools:context=".MainActivity"**

![](http://img-storage.qiniudn.com/15-7-24/73893715.jpg)
  
也就是最后的那一句，context也就是上下文的意思，**其实大概的意思就是说现在这个布局是跟之后的MainActivity相关**，以下的这个是百度相关的一个比较好的解释：

这个属性通常在一个布局XML文件的根元素中设置，**记录了这个布局关联到哪一个activity（因为显然一****个布局在设计时可以被多个布局使用）**（例如它会用于布局编辑器中以推断默认的主题，由于主题定义在Manifest中，并与activity而不是布局相关联。你可以和在manifests中一样使用点前缀，来指定activity类，而不需要使用完整的程序包名作为前缀。


每一个元素都看作一个矩形的话，leftMargin就是本元素的矩形与左侧元素的矩形的间隔

### 3.一直没有搞懂android:padding和android:layout_margin的区别，其实概念很简单。

padding是站在父view的角度描述问题，它规定它里面的内容必须与这个父view边界的距离;

margin则是站在自己的角度描述问题，规定自己和其他（上下左右）的view之间的距离，如果同一级只有一个view，那么它的效果基本上就和padding一样了。


### 4.在一个Android的project中，如何在src目录的包里面新建java源文件？

A在你想添加java文件的package处右键，新建class； 

B.然后手动添加代码让它继承activity(extends activity)； 

C.接下来你可以直接在类中重写方法protected void onCreate(Bundle savedInstanceState)， 也可以按快捷键shift+alt+s，从里面选择onCreate()方法。

### 5.一张让你了解AndroidManifest.xml的图

AndroidManifest 里面配置权限、网络、启动等。xml 配置布局等。

![](http://img-storage.qiniudn.com/15-7-24/65842547.jpg)



### 6.在运行项目到真机的时候一般会出现一个常见的问题

![](http://img-storage.qiniudn.com/15-7-24/75102320.jpg)

这个问题一般是由于adb端口的问题，所以根据下述方法即可解决：

![](http://img-storage.qiniudn.com/15-7-24/20793919.jpg)
所以自己按照以上的第二点的方法，找到了自己相对应的adb的目录：
![](http://img-storage.qiniudn.com/15-7-24/41295075.jpg)
其路径是：
E:\ADT\adt-bundle-windows-x86_64-20131030\sdk\platform-tools

之所以就是上边的这个问题是当你直接在命令行窗口输入那个adb的根目录，接着实现输入“adb kill-server”，之所以出现该命令不是正常的命令提示，可能是由于你的正常输入是会导致一些空格的出现的，所以最简便的方法是：你直接进入你要实现命令行的那个磁盘的根目录那里，不要点击进去，就像以下的这样，在下边的空白处同时点击“shift+右键”

![](http://img-storage.qiniudn.com/15-7-24/88412453.jpg)

下面就会提示：“在此处打开命令窗口”你就可以直接在这里点击命令行的操作。

![](http://img-storage.qiniudn.com/15-7-24/56759675.jpg)

如下边就可以正确的实现命令行的操作而没有错误提示：

![](http://img-storage.qiniudn.com/15-7-24/17621499.jpg)

### 7.要想找到相对应的文件夹下边的话，是用到以下的方法：

![](http://img-storage.qiniudn.com/15-7-24/16639161.jpg)

所以就是cd E:\ADT\adt-bundle-windows-x86_64-20131030\sdk\platform-tools
之后的方法就是按照之前的那个来做了的。

### 8. "cannot be resolved or is not a field"问题

![](http://img-storage.qiniudn.com/15-7-24/52522316.jpg)

### 9.如果你要添加一个重写的方法的话：

![](http://img-storage.qiniudn.com/15-7-24/95895413.jpg)

### 10.error: Error: Color value not valid -- must be #rgb, #argb, #rrggbb, or #aarrggbb (at 'textColor' with value '#FFFFF').

这个错误如下述所说的就是你设置的颜色的值错误了：

![](http://img-storage.qiniudn.com/15-7-24/29630481.jpg)

### 11.[2015-05-06 12:14:06 - myTabTest] Unable to resolve target 'android-8'

意思就是没有找到“android_6”，这里的6不是android版本，而是API版本。

打开项目文件里的default.properties，把target=android-6改成你有的版本。 

android SDK 目录下的platforms文件夹内有你下载的全部版本。

解决方法：

就是右键项目，打开properties ，选择android 那个栏目，给那个target打上钩钩就行了。

![](http://img-storage.qiniudn.com/15-7-24/23480834.jpg)




