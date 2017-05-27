---
layout: post
title: "带你走进css居中的世界"
date: 2017-5-27
categories: 前端
tags: [前端开发，CSS]
---

带你走进css居中的世界

<!-- more -->

### 一、水平居中

#### 1、【行内元素】适用inline,inline-block,inline-table,inline-flex元素

	.center {
             text-align: center;
            }

#### 2、【块级元素】适用于block level元素

##### A 、一个块级元素

	 .center {
             margin: 0 auto;
             }

##### B、多个块级元素

+ **方法一：将块级元素变为行内块级元素**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-1.png)

+ **方法二：flex布局**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-2.png)

### 二、垂直居中

#### 1、行内元素

##### A、单个行内元素

+ **情况一：当link或文本有包裹元素时，设置相等的上下padding**

　　
![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-3.png)

+ **情况二：当link或文本没有包裹时，设置行高和高度相等**


![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-4.png)

##### B、多个行内元素

+ **方法一：将多个行内元素分别置于table-cell中**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-5.png)

+ **方法二：将父元素设置为display:table,将自身设置为display:table-cell**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-6.png)

+ **方法三：使用flex**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-7.png)

+ **方法四：当以上代码均不可用时，可尝试此奇淫巧技**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-8.png)

#### 2、块级元素

##### A、已知元素高度(绝对定位+负的margin)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-9.png)

##### B 、不知元素高度（与上一方法，大同小异）

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-10.png)

##### C、flex布局

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-11.png)


### 三、水平垂直均居中

#### 1、有固定宽高的元素

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-12.png)

#### 2、没有固定宽高的元素(同之前没有固定宽高元素一样，用transform解决)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-13.png)

#### 3、使用flexbox布局

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-css3%20the%20centered%20method%20of%20css%20-14.png)

### 四、总结

其实，总结就一句话，关于这个居中的问题，其实方法是有这么多，但是你可能用不上那么多的方法，所以，记住常用的那几种就可以了，剩余的比较陌生的就等用得上的时候，再去深究吧！！！