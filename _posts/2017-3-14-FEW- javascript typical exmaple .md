---
layout: post
title: "Javascript 经典实例"
date: 2017-3-14
categories: 前端
tags: [前端开发，JavaScript]
---

Javascript 经典实例

<!-- more -->

### 一、前言

之所以有这个博客，是因为，在图书馆看了一本书，叫《javascript 经典实例》，这本书我只是看了第一节，就觉得这本很不错，适合锻炼一下你的JS的代码能力。

### 二、Javascript 经典实例

#### 1、从字符串中提取一个列表

从以下这个字符串中提取出相关列表项：

We are family:cjc,cjp,clj,clm.

提取之后：

['cjc','cjp','clj','clm']

玩法如下：

    var sentence="We are family:cjc,cjp,clj,clm.";
    var start=sentence.indexOf(":");
    var end =sentence.indexOf(".",start+1);
    var list=sentence.substring(start+1,end);
    var family=list.split(',');
    console.log(family);
    console.log(start);
    console.log(end);

![](http://p1.bqimg.com/567571/cdbdd0451b58a111.png)

笔记：（娱乐中记住更多，认真你就输了^_^）

A、使用String的indexOf()的方法来找到冒号，然后再次使用它找到冒号后边的一个句号，有了这两个位置，就可以使用String的substring（）方法来提取字符串了。

B、一旦获得包含列表项的字符串，就可以使用String的split（）方法来把该字符串分割为一个数组。

C、记住:indexOf()方法接受一个搜索值作为第一个参数，还有一个可选的索引位置，作为第二个参数。


#### 2、插入特殊的字符

    var charu=" this is a special character &#174";
    var t=document.getElementById("tt");
    t.innerHTML=charu;

(备注:"tt"是在html文件中定义的一个p标签的id）

![](http://p1.bpimg.com/567571/3cd06ad0c1c8f485.png)


#### 3、删除或者替换数组元素

原数组是：[cjc","cjp","who","clj","clm","ccc"]

要求：

删除掉数组中的"who"元素

替换掉数组中的"ccc"元素

    var stranger=new Array("cjc","cjp","who","clj","clm","ccc");
    stranger.splice(stranger.indexOf("who"),1);
    console.log(stranger);
    stranger.splice(stranger.lastIndexOf("ccc"),1,"cap");
    console.log(stranger);

![](http://p1.bqimg.com/567571/a041378bb78d52f4.png)

笔记：（娱乐中记住更多，认真你就输了^_^）

A、splice（）方法接受三个参数，第一个参数是必须的，它是拼接处的索引。第二个参数是可选的，也即是要删除的元素的数目。第三个参数也是可选的，它是一组替换元素（如果有的话）。如果索引是负数的话，将从数组的末尾开始拼接该元素，而不是从数组的开头开始。
  
     var animal=["cat","asa","sd","qw"];
     animal.splice(-1,1,"monkey");
     console.log(animal);

结果是：["cat", "asa", "sd", "monkey"]

B、如果没有提供要拼接的元素的数目，从索引到末尾的的所有元素都将删除。

     var animal=["cat","asa","sd","qw"];

    //删除第二个索引的元素以后的所有元素
     animal.splice(2);

结果是：["cat", "asa"]


**未完，待续..........**