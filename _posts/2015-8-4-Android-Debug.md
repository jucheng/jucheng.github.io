---
layout: post
title: "按钮点击事件的函数写法错误"
date: 2015-8-4
categories: Android
tags: [Android，调试]
---
按钮点击事件的函数写法错误

<!-- more -->


###1.The type MainActivity must implement the inherited abstract method View.OnClickListener.onClick(View)

![](http://img-storage.qiniudn.com/15-7-31/107969.jpg)

而出错的程序如下：
![](http://img-storage.qiniudn.com/15-7-31/15099384.jpg)

在写碎片的替换的程序的时候，出现了以上的一个这样的错误，从错误来看，应该是我的View.OnClickListener.onClick(View)方法实现实现方式有误了。

然后改成以下的这种方式错误就消失了：
![](http://img-storage.qiniudn.com/15-7-31/29842717.jpg)