---
layout: post
title: "浅析css word-spacing单词间距与letter-spacing字符间距的区别"
date: 2017-4-27
categories: 前端
tags: [前端开发，CSS]
---

浅析css word-spacing单词间距与letter-spacing字符间距的区别

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-27-FEW-word_spacing%20and%20letter_spacing.jpg)

<!-- more -->

### 一、前言

虽然，一般来说，关于word-spacing和letter-spacing这两个属性，我们一般只是用到浏览器默认的属性，也就是默认的normal值，但是不排除会用到的时候，既然我遇到了，那么也来区分一下吧。

### 二、区别

#### 1、word-spacing

##### A、概念

**word-spacing 属性增加或减少单词间的空白（即字间隔）。**

该属性定义元素中字之间插入多少空白符。针对这个属性，“字” 定义为由空白符包围的一个字符串。如果指定为长度值，会调整字之间的通常间隔。

所以，normal 就等同于设置为 0。允许指定负长度值，这会让字之间挤得更紧。inherit规定应该从父元素继承 word-spacing 属性的值。

注释：允许使用负值。

#### 2、letter-spacing

##### A、概念

**letter-spacing 属性增加或减少字符间的空白（字符间距）**。

该属性定义了在文本字符框之间插入多少空间。由于字符字形通常比其字符框要窄，指定长度值时，会调整字母之间通常的间隔。因此，normal 就相当于值为 0。

注释：允许使用负值，这会让字母之间挤得更紧。

### 三、实际使用

**letter-spacing控制的是字间距，每一个中文文字作为一个“字”，而每一个英文字母也作为一个“字”！大家要细心留意一下。**

默认情况下，letter-spacing我们几乎都用不上，我们直接采用浏览器默认样式就可以了。大家完全可以忽略掉这个属性。

#### A、letter-spacing的使用

html代码：   

    <p id="p1">正在测试letter-spacing这个属性</p>
    <hr/>
    <p id="p2">正在测试letter-spacing这个属性</p>
    <hr/>
    <p id="p3">正在测试letter-spacing这个属性</p>

CSS代码：

       #p1 {letter-spacing: 0px;}
       #p2 {letter-spacing: 5px;}
	   #p3 {letter-spacing: 10px;}
   	   p{
        font-size: 20px;
        color: #317EF3;
         }

结果显示：

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-27-FEW-word_spacing%20and%20letter_spacing-1.png)

#### A、word-spacing的使用

如果在这里，我什么都不改，就只是直接把CSS代码中的letter-spacing改成word-spacing，结果是以下这样的：surprise！！！什么格都没有，别说空格。

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-27-FEW-word_spacing%20and%20letter_spacing-2.png)

原因分析：

**css word-spacing定义词间距，以空格为基准进行调节，如果多个单词被连在一起，则被word-spacing视为一个单词；如果汉字被空格分隔，则分隔的多个汉字就被视为不同的单词，word-spacing属性此时有效。**

所以说，我把文字改成以下这样，就可以看得出来了：

html代码：   

    <p id="p1">正在测试 word spacing这个属性。 Can you see it!</p>
    <hr/>
    <p id="p2">正在测试 word spacing这个属性。 Can you see it!</p>
    <hr/>
    <p id="p3">正在测试 word spacing这个属性。 Can you see it!</p>

CSS代码：

     #p1 {word-spacing: 0px;}
     #p2 {word-spacing: 5px;}
	 #p3 {word-spacing: 10px;}
	 p{font-size: 20px;color: #317EF3;}

结果显示：

##### A、汉字之间没有空格，英文单词有空格

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-27-FEW-word_spacing%20and%20letter_spacing-3.png)

##### B、汉字之间有空格

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-27-FEW-word_spacing%20and%20letter_spacing-4.png)