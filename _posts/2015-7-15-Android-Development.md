---
layout: post
title: "项目错误集中营 "
date: 2015-7-15
categories: Android
tags: [Android,开发]
---
项目错误集中营

<!-- more -->
###1.布局文件格式的错误，这种情况之下，一般会这样提示:

**error: Error parsing XML: not well-formed (invalid token)**

解决方法如下：

![](http://img-storage.qiniudn.com/15-7-14/70177023.jpg)


###1.clean了一下，gen文件夹下的R.java文件消失了

**一般这种情况就是你的布局文件出错了，但是我却纠结于为什么R文件没了，其实你只要把你的布局文件给改正确了就可以了。**

###2.定义变量方式出错
你在定义一个变量的时候出了这个错误，但是一直没能找出答案，百度的时候，也只是找到一个比较合理的答案就是，出错就是在附近的语句，事实证明，这种说法是对的，这个成员变量定义的时候你却分成了两步，结果按表面看好像是对的，但是实际上是错的。

**Syntax error on token ";", , expected**

![](http://img-storage.qiniudn.com/15-7-14/60746698.jpg)


实际上这种复制方法是不对的，你要一气呵成就行：

![](http://img-storage.qiniudn.com/15-7-14/74882615.jpg)


