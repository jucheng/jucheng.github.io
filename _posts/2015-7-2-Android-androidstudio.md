---
layout: post
title: "Android Studio 图片使用问题!"
date: 2015-7-2
categories: Android
---

Android Studio 图片使用问题

<!-- more -->
####今天在Amdroid Studio 上边用FrameLayout布局做一个普通的图片应用的时候，代码基本都已经编写完毕了，但是在程序编译的时候却出现了一个让我意想不到的问题，就是关于我所插入的图片的格式问题，相信很多友友在使用Android Studio的时候都出现过这个问题，
![](http://img-storage.qiniudn.com/15-7-2/39442750.jpg)
（注：可能这样是看不清楚的，他的内容是这样的：

** E:\android-studio documents\BasketballProject\Basketball\src\main\res\drawable-hdpi\back.JPG:**

**Error: Invalid file name: must contain only lowercase letters and digits ([a-z0-9_.])**

我百度了一下之后，发现百度上是这样说的:

**今天小友在使用的时候也犯了错误，浪费了很多时间，一点要改。出错原因很简单，相信很多友友都会偷懒，看到一张好的图片，想将该图片作为资源，马上就将该图片改了下后缀名.png，复制黏贴到了项目然而在生成的时候编译出错.**

但是我这个没改，就是原本就是jpg格式的图片，我是直接放进去了的，相同的图片，相同的程序，我在android ADT 上边是可以运行的，但是在AS上边却出错了，个人觉得可能是AS的图片要求格式比较高吧,又或者是jpg格式的问题。

所经过一系列的寻找和思考之后，发现了一个十分有用的工具，就是我们一般编程所用到的图片格式都会分成：

1、drawable-hdpi

2、drawable-mhdpi

3、drawable-xhdpi

4、drawable-xxhdpi  等4个不同dpi的文件。

因为在Android的设计过程中，为了适配不同的手机分辨率，图片大多需要拉伸或者压缩，这样就出现了可以任意调整大小的一种图片格式“.9.png”。而有一个网站给我提供了十分便利的图片修改工具，就是我们只要把自己的图片（格式暂时认为是什么格式都行），他们网站的在线工具就会自动的把你的图片转换成一下几个格式的图片文件夹：
![](http://img-storage.qiniudn.com/15-7-2/9996645.jpg)

大小和后缀都直接帮我切换好了的，所以，顿时感觉高大上了，因为好多时候都是我们自己自己直接修改图片的后缀名，也就直接用起来了，凑合着用一不会出错。但是那只是偶然的，现在这个可以直接帮你改好，真心觉得强大。

然后我就把之前出错的那几张jpg格式的图片换了下来，把转换后的那几张图片放进去，结果就可以了，错误就没了,应用也就可以运行了。



##在这里附上那个图片转换器的网站和操作说明：

1.这个是图片转换器的网站
<http://romannurik.github.io/AndroidAssetStudio/nine-patches.html>

2.这个是图片转化器的操作说明书的网站：
<http://www.25xt.com/allcode/6976.html>
