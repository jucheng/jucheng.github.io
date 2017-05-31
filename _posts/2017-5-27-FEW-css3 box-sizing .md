---
layout: post
title: "了解一下css3中的box-sizing"
date: 2017-5-27
categories: 前端
tags: [前端开发，CSS]
---

了解一下css3中的box-sizing

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing%20.jpeg)

<!-- more -->

### 一、概念（直接盗用MDN的概念）

**box-sizing 属性用于更改用于计算元素宽度和高度的默认的 CSS 盒子模型。**

#### 1、content-box

**默认值，标准盒子模型。 width 与 height 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。**

**注意: 内边距, 边框 & 外边距 都在这个盒子的外部。** 比如. 如果 .box {width: 350px}; 而且 {border: 10px solid black;} 那么在浏览器中的渲染的实际宽度将是370px;

**尺寸计算公式：width = 内容的宽度，height = 内容的高度。宽度和高度都不包含内容的边框（border）和内边距（padding）。**

#### 2、border-box

**width 和 height 属性包括内容，内边距和边框，但不包括外边距。**这是当文档处于 Quirks模式 时Internet Explorer使用的盒模型。

**注意，填充和边框将在盒子内** , 例如, .box {width: 350px; border: 10px solid black;} 导致在浏览器中呈现的宽度为350px的盒子。内容框不能为负，并且被分配到0，使得不可能使用border-box使元素消失。

这里的维度计算为：

**width = border + padding + 内容的 width**

**height = border + padding + 内容的 height。**

#### 3、padding-box

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing-1.png)

我本来以为padding-box还存在的，但是查了一下Can I Use才发现，这个属性只有Firefox实现了这个值，它在Firefox 50中被删除。所以，一般来说，我们用到的只有content-box和border-box这两个属性了，平时我们用得最多的也就是这两个了。

### 二、直接上图

	.content-box{
        box-sizing:content-box;
        -moz-box-sizing:content-box;
        width: 100px;
        height: 100px;
        padding: 20px;
        border: 5px solid #E6A43F;
        background: #3385FF;
      }
    .border-box{
        box-sizing:border-box;
        -moz-box-sizing:border-box;
        width: 100px;
        height: 100px;
        padding: 20px;
        border: 5px solid #3DA3EF;
        background: #0E9716;
      }

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing-2.png)

#### A、content-box

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing-3.png)

由下图，我们可以看到，默认的情况的content-box的总宽高是150px,自身的元素的实际宽高就是100px,完全符合，然后另外的50px分别是两倍的20px的padding值和两倍的5px的boder值。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing-5.png)


#### B、border-box

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing-4.png)

由下图，我们可以看到，默认的情况的border-box的总宽高是100px,自身的元素的实际宽高变成了50px,完全符合，然后另外的50px分别是两倍的20px的padding值和两倍的5px的boder值。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing-6.png)

### 三、实际使用

**当一个容器宽度定义为 width:100%;  之后，如果再增加 padding 或者 border 则会溢出父容器，是向外扩张的**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing-7.jpg)

**如果使用该样式，指定为 box-sizing: border-box; 则 padding 和 border 就不会再溢出，而是向内收缩的，这个效果感觉非常实用，**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20box-sizing-8.jpg)


大概一句话总结就是：如果空间是定了的，如果还要加上padding和border的值，假设元素溢出了，那么就是时候使用box-sizing这个属性了。


本文借鉴了一下链接，十分感谢：

<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing">MDN- box-sizing</a>


<a href="http://blog.csdn.net/zhouzme/article/details/38621155">CSS之box-sizing的用处简单介绍</a>
