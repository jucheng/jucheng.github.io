---
layout: post
title: "mouseenter 与 mouseover 的不同"
date: 2017-4-6
categories: 前端
tags: [前端开发，CSS]
---

mouseenter 与 mouseover 的不同

<!-- more -->

### 一、前言

其实之前就有听说过这两个属性差不多，但是因为没用到，所以就没去深入理解，但是，今天在一个项目里边用到mouseover（）这个函数，所以，查了一下w3c，文档里讲到mouseover的时候，还特地区分了它跟mouseenter的区别，所以，在这里，我也做一下笔记吧。

### 二、mouseenter 与 mouseover 的不同

1、mouseover() 方法

当鼠标指针位于元素上方时时，改变元素的背景色：

    <html>
    <head>
    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
    $("p").mouseover(function(){
    $("p").css("background-color","#8ED1FF");
    });
    $("p").mouseout(function(){
    $("p").css("background-color","#E9E9E4");
    });
    });
    </script>
	</head>
	<body>
	<p style="background-color:#E9E9E4">你把鼠标指针移动到我身上试一下。</p>
	</body>
	</html>

效果图：

A、鼠标移动到标签p上之前：

![](http://i1.piimg.com/567571/3fc897b476a65cb2.png)

B、鼠标移动到标签p上之后：

![](http://i4.buimg.com/567571/b77fcacff974e04f.png)

### 2、定义和用法

**当鼠标指针位于元素上方时，会发生 mouseover 事件。**

该事件大多数时候会与 mouseout 事件一起使用。

mouseover() 方法触发 mouseover 事件，或规定当发生 mouseover 事件时运行的函数。

**注释：与 mouseenter 事件不同，不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。**


### 3、mouseenter 与 mouseover 的不同的实例

	<html>
	<head>
	<script type="text/javascript" src="/jquery/jquery.js"></script>
	<script type="text/javascript">
	x=0;
	y=0;
	$(document).ready(function(){
	  $("div.over").mouseover(function(){
	    $(".over span").text(x+=1);
	  });
	  $("div.enter").mouseenter(function(){
	    $(".enter span").text(y+=1);
	  });
	});
	</script>
	</head>
	<body>
	<p>不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。</p>
	<p>只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。</p>
	<div class="over" style="background-color:lightgray;padding:20px;width:40%;float:left">
	<h2 style="background-color:white;">被触发的 Mouseover 事件：<span></span></h2>
	</div>
	<div class="enter" style="background-color:lightgray;padding:20px;width:40%;float:right">
	<h2 style="background-color:white;">被触发的 Mouseenter 事件：<span></span></h2>
	</div>
	</body>
	</html>

效果图如下:

**A、这个是未触发任何效果之前的显示结果:**

![](http://i2.muimg.com/567571/14977a579a9e866b.jpg)

**B、这个是触发后的显示结果:**

![](http://i4.buimg.com/567571/5b7136e1516d5160.png)

### 4、总结

**1、mouseover（）的就是不管你把鼠标指针放在白色的被选元素上，还是灰色的子元素上，里边的数字都会+1，也就是说都会触发mouseover事件。**

**2、而mouseenter（）是当你把鼠标指针放在白色的被选元素上，才会使里边的数字+1，也就是这样才会触发mouseenter事件。若仅仅是把鼠标移动到灰色的子元素上，是不会触发mouseenter事件的。**

**3、不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。**