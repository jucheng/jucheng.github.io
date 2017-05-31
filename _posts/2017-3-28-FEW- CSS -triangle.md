---
layout: post
title: "CSS 实现三角形"
date: 2017-3-28
categories: 前端
tags: [前端开发，CSS]
---

CSS 实现三角形

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle.jpeg)

<!-- more -->

### 一、CSS实现三角形的原理

在CSS盒子模型中，当一个盒子的两条边在边角处相交时，浏览器就会在交点处按照某个角度（如果盒子为正方形，则为顺时针45度，135度，225度，315度）绘制一条接合线。

### 二、直奔主题

#### 1、width和height不为0的盒子效果

    <div class="sanjiao"></div>
 
    /* 样式文件 */
  
    .sanjiao{
    width: 30px;
    height: 30px;
    border-width: 20px;
    border-style: solid;
    border-color: black red green blue;
    }

效果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle-1.png)

#### 2、width和height都为0的盒子效果

    <div class="sanjiao"></div>
 
    /* 样式文件 */
  
    .sanjiao{
    width: 0px;
    height: 0px;
    border-width: 20px;
    border-style: solid;
    border-color: black red green blue;
    }

效果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle-2.png)


#### 3、我们知道border属性包含四个值，分别对应“上 右 下 左”，呈顺时针排列，我们随便将其中三条边改变透明的颜色transparent,也就是透明的颜色。

    <div class="sanjiao"></div>
 
    /* 样式文件 */
  
    .sanjiao{
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent transparent blue;
    }

效果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle-3.png)

#### 4、我们设置两条边为透明的颜色

    <div class="sanjiao"></div>
 
    /* 样式文件 */
  
    .sanjiao{
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent green blue;
    }

效果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle-4.png)

#### 5、总结

从上述的例子，我们可以看出使用CSS来实现三角形的原理是：

**将一个元素的width和heigh设置定义为0，然后为他设置比较粗的边框，并且将其中任意三条边框或者两条边框的颜色定义为 transparent。**

#### 6、拓展：实现带边框的三角形

因为在实际的开发中，我们一般会看到带有类似对话框的气泡，那个就是带有边框的三角形。嘿嘿，这里需要注意的是，我们前边所制作的三角形就已经是边框border了，我们不可能通过给border设置border的属性来实现了。

原理：

对于这种带边框的三角形，我们一般是使用两个三角形来实现。一个作为背景色（内层三角形），一个作为边框色（外层三角形）。然后通过定位布局重叠在一起。注意的是，两个三角形定位一定要相差1个像素。一般情况下，都是将内层三角形相对于外层三角形进行定位，偏移1像素。

在实现带边框的三角形原理中，有一个关于绝对定位的问题一定是不可以忽略的：

上、右、下、左四个方向三角形相对于父元素定位是不同的。必须把这个问题理解清楚，我们才能深刻地理解带边框的三角形的实现原理。


    <div class="sanjiao">
        <div>
        </div>
    </div>

    /* 样式文件 */

    .sanjiao {
    position: relative;/* 这里设置position: relative，使得子元素可以相对父元素进行定位*/
    width: 0;
    height: 0;
    border-width: 30px; /*注意外层三角形的高度为30px*/
    border-style: solid;
    border-color: transparent transparent blue transparent;
    }

    .sanjiao div {
    position: absolute;
    top: 1px;
    left: 0;
    width: 0;
    height: 0;
    border-width: 29px;/*注意内层三角形的高度为29px*/
    border-style: solid;
    border-color: transparent transparent green transparent;
    }

效果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle-5.png)

分析：但是，以上这个结果并不是我们想要的结果，外层三角形高为30px，内层三角形高为29px,按道理说，如果内层三角形top定义为1px,(也就是向下移动1px），left定义为0的时候，预期效果应该是如下图，但是为什么效果不一样呢？

其实在CSS中，子元素的绝对定位是根据父元素的“内容边界(content)”进行定位的。也就是说，“内层三角形对应的盒子”的绝对定位是根据“外层三角形对应的盒子“的内容content来进行定位的，而不是根据我们肉眼所看到的三角形的边界进行定位的。如下图可以得到很详细的视觉效果：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle-6.jpg)

由于盒子的宽和高都是0，因此content是在盒子的中心，也就是中心点。


所以要实现如上图中的右图部分的效果，我们只要将top设置为-28px,left设置为-29px，就可以了。

    .sanjiao {
    position: relative;/* 这里设置position: relative，使得子元素可以相对父元素进行定位*/
    width: 0;
    height: 0;
    border-width: 30px; /*注意外层三角形的高度为30px*/
    border-style: solid;
    border-color: transparent transparent black transparent;
    }

    .sanjiao div {
    position: absolute;
    top: -28px;
    left: -29px;
    width: 0;
    height: 0;
    border-width: 29px;/*注意内层三角形的高度为29px*/
    border-style: solid;
    border-color: transparent transparent #A4CEF4 transparent;
    }


效果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle-7.png)

#### 7、实现带内容的三角形边框


    <div class="container">
	<div class="sanjiao">
        <div>
        </div>
    </div>
    欢迎CJC来到前端圣地
    </div>

    /* 样式文件 */

    .container{
    display: inline-block;
    position: relative;
    padding: 20px 30px;
    margin-top: 100px;
    border: 1px solid grey;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    background-color: #BBFFEE;
    }

    // 外层三角形

    .sanjiao {
    position:  absolute;/* 这里设置position: relative，使得子元素可以相对父元素进行定位*/
    top: -30px;
    left: 50%; /* left和margin-left是为了实现三角形的水平居中*/
    margin-left: -15px;
    width: 0;
    height: 0;
    border-width: 15px; /*注意外层三角形的高度为30px*/
    border-style: solid;
    border-color: transparent transparent black transparent;
    }

    // 内层三角形

    .sanjiao div {
    position: absolute;
    top: -13px;
    left: -14px;
    width: 0;
    height: 0;
    border-width: 14px;/*注意内层三角形的高度为29px*/
    border-style: solid;
    border-color: transparent transparent #A4CEF4 transparent;
    }


![](http://oq2sjn05e.bkt.clouddn.com/2017-3-28-FEW-%20CSS%20-triangle-8.png)


#### 8、总结

上述例子中的代码相对多了一点，但是核心的代码只有一点，就是要想实现对话气泡的效果，我们需要定位两次：

第一次：

将外层三角形和内层三角形作为一个整体相对于容器进行定位

第二次：

将内层三角形相对于外层三角形进行定位

一般情况下，外层三角形border-width比内层三角形的border-width大1px,此外，外层三角形的left值一般是旗border-width的负数。top值一般是其border-width的负数加1.

在上述例子中，外层三角形border-width为14px,则left应该定义为-14px，top值应该定义为-13px。
