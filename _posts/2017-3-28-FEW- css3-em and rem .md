---
layout: post
title: "CSS相对单位 px em rem的恩怨情仇"
date: 2017-3-28
categories: 前端
tags: [前端开发，CSS]
---

CSS相对单位 px em rem的恩怨情仇

<!-- more -->

### 一、前言

在CSS中的常用的相对单位有如下几个：

px 、% 、em、rem 

我在这里就主要讲解一下百分比，em，rem这三个单位

### 二、直奔主题 

#### 1、百分比小试牛刀

在CSS中，支持百分比作为单位的属性有很多，但大致上可以分为以下三大类：

A、width、height、font-size的百分比是相对于父元素 “相同属性”的值进行计算的。

B、line-height的百分比是相对于父元素的的font-size的值来计算的。

C、vertical-align的百分比是相对于当前元素的line-height的值来计算的。

    <div class="father">
        爸爸
        <div class="child">
            儿子乖
        </div>
    </div>

    /* 样式文件 */

    .father{
    border: 2px solid black;
    border-radius: 5px;
    width: 200px;
    height: 200px;
    font-size: 30px;
    }

    .child{
    width: 50%;
    height: 50%;
    font-size: 50%;
    border-radius: 5px;
    border: 2px dashed blue;
    }

效果预览图：

![](http://i2.muimg.com/567571/39bb008af727c8b9.png)

#### 2、em大放异彩

　　EM特点 

　　1. em的值并不是固定的；

　　2. em会继承父级元素的字体大小。

 在CSS中，em是相对于“当前元素”的大小而言的，其中，1em等于“当前元素”的大小。这里的字体大小指的是以px为单位的font-size值。比方说当前元素的font-size值是10px,那么1em等于10px,相同道理，如果当前元素的font-size值是20px，那么1em等于20px。类推下去......


 这里需要注意的一个点是：如果当前元素并没有设置font-size的值，那么当前元素就会继承父元素的font-size的值。而且，那么如果说当前元素的所有祖先元素都没有定义font-size，则当前元素就会继承浏览器默认的font-size值，也就是传说中的16px，这个是所有浏览器默认的font-size值。

 那么，我们讲了那么多概念，接下来讲解一下，em的具体的用途，在这里，哟呵，跟前边一样，也是分为三个小技巧。

#### A、首行缩进 ： 使用text-indent：2em实现

我们都知道，一般我们看到网页中的排版效果是，段落的首行会缩进大概是两个字的距离，若要实现这个效果，text-indent的值应该是font-size的值的两倍。此时，我们使用text-indent：2em就可以轻而易举的实现了，而且比用px更加灵活。

    p{
    font-size: 15px;
    text-indent: 2em;
    width: 500px;
    }

这里的text-indent：2em 就相当于 text-indent：30px 。

效果预览图：

![](http://i1.piimg.com/567571/9a091d8e3c8ead7e.png)

#### B、使用em作为统一的单位

首先，我们也都知道，所有浏览器默认的字体大小是16px，如果在同一页面中，我们想统一使用em作为单位，此时就可以从默认的浏览器字体下手，那么在页面中的任何元素中，我们都不需要设置font-size的值，而是继承根元素的font-size的值，也就是16px。

那么，我们也知道，是个人都贪图方便的是吧，好，继续：

如果使用默认的浏览器字体16px，当中的em和px的对应关系如下：

1em=16px
0.75em=16px *0.75=12px

在这里我们为了简化，可以提前声明如下的CSS语句：

**body{font-size:62.5%;}**

16px * 62.5%=10px，那此时的计算就方便很多了，em和px的对应关系如下：

1em=10px；

0.75em=7.5px

**简单的说，就是将原来的px值除以10就可以得到我们想要的em的值了。**

  
 
    body{
    font-size: 62.5%;
    }

    // 使用px作为单位 
    .p1{
    font-size: 15px;
    width: 150px;
    height: 75px;
    text-indent: 30px;

    }   
    //使用em作为单位
    .p2{
    font-size: 1.5em;
    width:10em;
    height: 5em;
    text-indent: 2em;
    }

效果图如下：

![](http://i1.piimg.com/567571/4358130197856b79.png)

###  重点:

好了，这里就是我们要讲的重点了，我特地设置了px和em的对比，我们可以很清晰地看到这两者虽然使用的单位是不一样的，但是，显示的效果是一样的，也就是说两者是等价的。

那么，在这里，我相信可能刚看完概念的人，包括之前的我，也是这样，会有一个疑点，为毛，说好了body设置了font-size=62.5%后，如果用em来设置p2的话，不是应该是以下这样才对吗：

    .p2{
    font-size: 1.5em;
    width:15em;
    height: 7.5em;
    text-indent: 2em;
    }

额，怎么说呢，就是像我这种，只知概念，但是实际运用起来，就会出问题了，没关系，这里其实很简单。只是我们在概念上再深入一点就可以了：

我们回头看一下em的概念：

在CSS中，em是相对于：“当前元素”的字体大小而言的，其中，1em等于“当前元素”字体大小。

结合上述的那个例子，我想大家很快就会明白了的，我们回头看一下代码，在p2中，也就是所谓的当前元素，我们的字体大小font-size=1.5em=15px,如果我们要设置 width和 height 以em为单位的话，我们就需要相对于当前的font-size（15px）再计算一次：

    width:150px /15px=10em 

    height:75px /15px =5em

由于 em 是相对于其父级字体的倍数的，当出现有多重嵌套内容时，使用 em 分别给它们设置字体的大小往往要重新计算。比如说你在父级中声明了字体大小为 1.2em，那么在声明子元素的字体大小时设置 1em 才能和父级元素内容字体大小一致，而不是1.2em（避免 1.2*1.2=1.44em）, 因为此 em 非彼 em。再举个例子：
  
    <span>Outer <span>inner</span> outer</span>

    body { font-size: 62.5%; }
    span { font-size: 1.6em; }

结果：外层 <span> 为 body 字体 10px 的 1.6倍 = 16px，内层 <span> 为外层内容字体 16px 的 1.6倍 = 25px（或26px，不同浏览器取舍小数不同）。

明显地，内部 <span> 内的文字受到了父级 <span> 的影响。基于这点，在实际使用中给我们的计算带来了很大的不便。

### 总结 

**其实根据上述的例子，我们可以看到，如果使用em作为单位的话，我们就要充分的考虑到当前的font-size的值，特别是当我们当前的元素有父容器的时候，那么em就是会受到父容器的font-size的值影响，我们就要进行多次的运算，才能得出当前元素的属性的最后的em的值。**

#### 3、rem 一股清流

#### A、概念
rem是CSS3新增的一个相对单位（root em，根em），这个单位引起了广泛关注。这个单位与em有什么区别呢？区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。

rem 的出现再也不用担心还要根据父级元素的 font-size 计算 em 值了，因为它始终是基于根元素（<html>）的。

比如默认的 html font-size=16px，那么想设置 12px 的文字就是：12÷16=0.75(rem)
仍然是上面的例子，CSS改为：

    html { font-size: 62.5%; }
    span { font-size: 16px; font-size: 1.6rem; }


#### B、rem和em的区别

**em是相对“当前元素”的字体大小**

**rem是相对于“根元素”的字体大小**


#### 4、全文总结

所以我们在写CSS的时候，需要注意两点：

1. body选择器中声明Font-size=62.5%；

2. 将你的原来的px数值除以10，然后换上em作为单位；

3. 重新计算那些被放大的字体的em数值。避免字体大小的重复声明。

注意： 
 
选择使用什么字体单位主要由你的项目来决定，如果你的用户群都使用最新版的浏览器，那推荐使用rem，如果要考虑兼容性，那就使用px,或者两者同时使用。

 

在这里为大家提供一个px,em,rem单位转换工具

地址：

<a href="http://pxtoem.com/" target="_blank"><span style="font-size: medium;">px,em,rem单位转换工具</span></a>