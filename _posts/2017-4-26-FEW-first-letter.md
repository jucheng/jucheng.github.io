---
layout: post
title: "CSS ::first-letter伪元素引出的两个问题"
date: 2017-4-26
categories: 前端
tags: [前端开发，CSS]
---

CSS ::first-letter伪元素引出的两个问题

<!-- more -->

### 一、问题一：first-letter生效的前提


####1、元素的display的值

元素的display计算值必须是 **block, inline-block, table-cell, list-item或者table-caption**，其他所有display计算值都没有用，包括**display:table以及display:flex**等。

####2、元素的种类

**不是所有的字符都能单独作为::first-letter伪元素存在的**，如下：

##### 第一个例子

A、html代码：

     <p>？？？？？？？</p>

B、CSS代码：

     p:first-letter { color: #cd0000; }

C、结果：surprise！！！一个颜色都没变

![](http://i2.muimg.com/567571/788e2daea1c5b885.png)

##### 第二个例子

A、html代码：

     <p>？？？？？？？变变变</p>

B、CSS代码：

     p:first-letter { color: #cd0000; }

C、结果：还是surprise！！！，大家有福同享，一起变了

![](http://i4.buimg.com/567571/b75040cb60b49084.png)


##### 分析

通过以上的两个例子，为什么之前不变，之后却变卦了，跟着后边的文字一起变了呢，嘿嘿，你觉得我写这篇文章是开心就写吗？正如标题所说，这是两个问题中的一个。

借用张鑫旭大神的话说就是，因为常见的标点符号，各类括号和引号在::first-letter伪元素眼里全部都是“辅助类”字符，有点淘宝买东西送的赠品的感觉，但是赠品本身却不能购买，这里的问号？号就相当于赠品。

在第二个例子中，“？？？？？？？辅”全部都红色了，小样还挺有个性的，要么不红，要红就红一大波。原因是，“变变变”三字才是::first-letter伪元素真正要收入囊中作为“伪元素”的字符，但是现在前面出现了一堆不感冒的问号（？），怎么办呢？那就当做是赠品一并收了，于是，一大波字符全都红色了。

如果全是问号（？），由于没有主商品，自然也就无法获得赠品，所以::first-letter没有选择任何字符，问号全部都是黑色。

以下的就是张鑫旭大神总结得“赠品”符号：


![](http://i4.buimg.com/567571/d1bedf1a065d33ab.png)


### 二、问题二：颜色等权重永远最高

A、html代码：

     <p><span>第一个</span>字符看看会不会变红？</p>

        p:first-letter {
     		color: red;
			}
		p > span {
    		color: blue!important;
		}

B、CSS代码：

     <p><span>第一个</span>字符看看会不会变红？</p>

C、结果：

![](http://i2.muimg.com/567571/0f4a727654f4aad9.png)

D、结果分析：

请问“第”这个字符的颜色是什么？基本上，**超过95%的前端小伙伴会认为是blue**，包括我。
因为大家都是从CSS选择器权重的角度去考虑的，本身是没问题，但是却忽略了很重要的一个点。

**::first-letter伪元素其实是作为子元素存在的，或者说应当看出是子元素**。

于是，就很好理解了，**对于类似color这样的继承属性，子元素的CSS设置一定比父元素的级别要高，哪怕父级使用了重量级的!important，因为子元素会先继承，然后再应用自身设置**。

所以，上面CSS和HTML的最终结果是，第一个字符“第”字的颜色是red红色！

**这就是::first-letter伪元素的另外一个重要特性，颜色等权重永远最高。**