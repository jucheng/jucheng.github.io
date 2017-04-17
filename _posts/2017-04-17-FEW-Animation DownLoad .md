---
layout: post
title: "Animation DownLoad项目的笔记"
date: 2017-4-17
categories: 前端
tags: [前端开发，项目]
---

Animation DownLoad项目的笔记

<!-- more -->

### 一、前言

这个项目是之前的刚学习bootstrap的时候做的一个小项目，现在回顾一下这个项目的细节，也相当于做个笔记。

### 二、项目细节

#### 1、项目用到的外部文件

当然，这既然是一个bootstrap的项目，那么导入bootstrap的相关JS，css的文件就是不可避免的了，那么我想说的是另外两个文件。两位嘉宾分别是html5shiv.js和respond.min.js。因为IE8既不支持HTML5也不支持CSS3 Media，所以我们需要加载这两个JS文件，来保证我们的代码实现兼容

    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->

##### A、html5shiv.js

**解决ie9以下浏览器对html5新增标签的不识别，并导致CSS不起作用的问题**。

##### B、respond.min.js

Respond.js 是一个快速、轻量的 polyfill，**用于为 IE6-8 以及其它不支持 CSS3 Media Queries 的浏览器提供媒体查询的 min-width 和 max-width 特性**，实现响应式网页设计（Responsive Web Design）。

#### 2、meta标签
 
##### A、标签一：移动端页面的viewport的设置

    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">

width = device-width：宽度等于当前设备的宽度

height = device-height：高度等于当前设备的高度

initial-scale：初始的缩放比例（默认设置为1.0）  

minimum-scale：允许用户缩放到的最小比例（默认设置为1.0）    

maximum-scale：允许用户缩放到的最大比例（默认设置为1.0）   

user-scalable：用户是否可以手动缩放（默认设置为no，因为我们不希望用户放大缩小页面） 

以下这个是在chrome浏览器中移动端的IPhone 6的显示效果：

![](http://i1.piimg.com/567571/bd14755e7c6d633a.png)

##### B、标签二 ：设置IE渲染方式默认为最高(这部分可以选择添加也可以不添加)
现在有很多人的IE浏览器都升级到IE9以上了，所以这个时候就有又很多诡异的事情发生了，例如现在是IE9的浏览器，但是浏览器的文档模式却是IE8:

为了防止这种情况，我们需要下面这段代码来让IE的文档模式永远都是最新的：

<meta http-equiv="X-UA-Compatible" content="IE=edge">
 （如果想使用固定的IE版本，可写成：<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">）


不过我最近又发现了一个更给力的写法：

<meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">
怎么这段代码后面加了一个chrome=1，这个Google Chrome Frame（谷歌内嵌浏览器框架GCF），如果有的用户电脑里面装了这个chrome的插件，就可以让电脑里面的IE不管是哪个版本的都可以使用Webkit引擎及V8引擎进行排版及运算，无比给力，不过如果用户没装这个插件，那这段代码就会让IE以最高的文档模式展现效果。这段代码我还是建议你们用上，不过不用也是可以的。

    <meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">

#### 3、响应式布局设计

在Bootstrap官方文档里有定义，相关的分辨率归属设备如下：

![](http://i4.buimg.com/567571/bb2bcbbb632b73b8.png)

而我们在这里的是针对小于768px的设备，也就是手机屏幕，还有大于992px的设备，也就是电脑设备，进行了响应式设计。

     @media (max-width: 768px)

     @media (min-width: 992px)

##### A、当大于992px的时候，显示效果是这样的：

![](http://i2.muimg.com/567571/cfb15572719b741c.png)

##### B、当分辨率大于768px,小于992px，的时候，显示效果是这样的：

![](http://i4.buimg.com/567571/560845972c821f5b.png)

##### C、当屏幕小于768px的时候，显示效果如是这样的：

![](http://i2.muimg.com/567571/fb8dd5338a71b7ae.png)


### 4、界面布局

##### A、顶部导航栏模块

![](http://i2.muimg.com/567571/4b15386bc498922f.png)

![](http://i1.piimg.com/567571/69788e505691fade.png)

导航栏在您的应用或网站中作为导航页头的响应式基础组件。导航栏在移动设备的视图中是折叠的，随着可用视口宽度的增加，导航栏也会水平展开

##### 1、导航栏固定在顶部

如果您想要让导航栏固定在页面的顶部，请向 .navbar class 添加 class **.navbar-fixed-top**。

**为了防止导航栏与页面主体中的其他内容的顶部相交错，请向 <body> 标签添加至少 50 像素的内边距（padding），内边距的值可以根据您的需要进行设置。**

这个也是必须设置的，当然，我们这里只要不重叠就行，所以，正常的显示是50px，所以这个就不验证了，那要不，我们验证一下：

当我们设置body的padding值为：

     padding-top: 60px;

显示效果为：

![](http://i1.piimg.com/567571/af9c4375ea8c70bf.png)

**如果不设置的话，显示效果上，你的轮播图那里的图片会往上提上50px，那么会遮盖住部分的图片。**

##### B、Bootstrap 轮播模块

如果您想要单独引用该插件的功能，那么您需要引用 carousel.js。或者，正如 Bootstrap 插件概览 一章中所提到，您可以引用 bootstrap.js 或压缩版的 bootstrap.min.js

###### 1、data属性

通过 data 属性：使用 data 属性可以很容易控制轮播（Carousel）的位置。

属性 data-slide 接受关键字 prev 或 next，用来改变幻灯片相对于当前位置的位置。

使用 data-slide-to 来向轮播传递一个原始滑动索引，data-slide-to="2" 将把滑块移动到一个特定的索引，索引从 0 开始计数。

data-ride="carousel" 属性用于标记轮播在页面加载时就开始动画播放。

![](http://i1.piimg.com/567571/9a93e4722273859d.png)

##### 2、轮播（Carousel）插件中有用的方法：

![](http://i2.muimg.com/567571/5b0436a6cca56e66.png)

**.carousel('prev')：循环轮播到上一个项目。**

**.carousel('next')：循环轮播到下一个项目。**

##### 3、往轮播图中增加标题

可以通过 .item 内的 .carousel-caption 元素向幻灯片添加标题。只需要在该处放置任何可选的 HTML 即可，它会自动对齐并格式化

![](http://i4.buimg.com/567571/8382029eed612fec.png)

##### 4、轮播效果

![](http://i4.buimg.com/567571/d2a597041b038703.png)

![](http://i4.buimg.com/567571/f070a308d6e5d797.png)

所以说你点那个图片中的小圆点可以实现轮播效果，那自动轮播的效果可以通过JS调用carousel（）方法来实现自动轮播。


###### C、Bootstrap 网格系统

![](http://i4.buimg.com/567571/35a062f84c447657.png)

**Bootstrap 提供了一套响应式、移动设备优先的流式网格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。**

![](http://i1.piimg.com/567571/8427dc9f8478aa07.png)

![](http://i1.piimg.com/567571/9a1519e6f452acdf.png)

而在我们的这个项目里，我们是设置了col-md-4，也就是把12列分为3列去显示。

为了在内容中嵌套默认的网格，请添加一个新的 .row，并在一个已有的 .col-md-* 列内添加一组 .col-md-* 列。被嵌套的行应包含一组列，这组列个数不能超过12（其实，没有要求你必须占满12列）

##### D、Bootstrap 标签页（Tab）插件

![](http://i4.buimg.com/567571/25b9b2f712eae400.png)

这个是你的代码：

![](http://i1.piimg.com/567571/8efb7fecdbed0c8b.png)

这里是把12列分为两部分，一部分是col-md-7，一部分是col-md-5。


##### E、Bootstrap 模态框（Modal）插件

模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。

![](http://i2.muimg.com/567571/6185aaf93ce6eb5a.png)

你的代码部分：

![](http://i4.buimg.com/567571/3b03674110746491.png)

![](http://i4.buimg.com/567571/09baeff592da21d7.png)

效果显示：

![](http://i2.muimg.com/567571/0fa323e23e3ac4cf.png)


##### F、顶部导航栏跳转底部的tab标签模块

顶部导航栏：

![](http://i2.muimg.com/567571/4cfccade34fc208e.png)

底部的tab标签：

![](http://i1.piimg.com/567571/7a60c3302fbfa28c.png)

###### 1、切换的原理：

![](http://i1.piimg.com/567571/69788e505691fade.png)

![](http://i1.piimg.com/567571/a1a34af375354a42.png)

![](http://i4.buimg.com/567571/e4c14531a4d50262.png)


##### 2、切换的JS代码：

![](http://i1.piimg.com/567571/32b5d96d5aa44ed5.png)

![](http://i2.muimg.com/567571/3fff677afc8669fc.png)

这里就是如果点击了弹出框里的a标签中的选项：

 **e.preventDefault();这句是为了取消事件的默认动作。**

![](http://i4.buimg.com/567571/e3c74a993942073e.png)

这里的设置了滚动条的位置，如果点击了相应的链接，则进行跳转，然后滚动条也会进行相应的跳动。