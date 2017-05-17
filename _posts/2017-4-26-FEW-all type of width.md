---
layout: post
title: "scrollWidth,clientWidth,offsetWidth的区别"
date: 2017-4-26
categories: 前端
tags: [前端开发，CSS]
---

scrollWidth,clientWidth,offsetWidth的区别

<!-- more -->

### 一、前言

今天在看张鑫旭大神的博客的时候，突然间涉及到一个关于宽度的问题，也就是scrollWidth，因为自己平时比较少用到这个属性，但是查了一下，发现有一个博主的一篇博客总结得很深动，所以，我也就借用一下博主的图，来做一下笔记，我文尾会注明转载的。

### 二、概念

+ **scrollWidth**：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。 

+ **clientWidth**：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。 

+ **offsetWidth**：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。

### 三、情况分类以及区别

#### 情况1：元素内无内容或者内容不超过可视区，滚动不出现或不可用的情况下。


**scrollWidth=clientWidth，两者皆为内容可视区的宽度。**

**offsetWidth为元素的实际宽度。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-26-FEW-all%20type%20of%20width-1.png)


### 情况2：元素内无内容或者内容不超过可视区，滚动不出现或不可用的情况下。

**scrollWidth=clientWidth，两者皆为内容可视区的宽度。**

**offsetWidth为元素的实际宽度。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-26-FEW-all%20type%20of%20width-2.png)

本文转自<a href="http://www.cnblogs.com/kongxianghai/p/4192032.html">白色的海的博客，再次表示感谢！！！</a>