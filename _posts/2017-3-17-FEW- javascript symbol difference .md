---
layout: post
title: "javascript的符号中括号[]和大括号{}的区别"
date: 2017-3-17
categories: 前端
tags: [前端开发，JavaScript]
---

javascript的符号中括号[]和大括号{}的区别

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-17-FEW-%20javascript%20symbol%20difference%20.jpeg)

<!-- more -->

### 一、前言

今天偶然间测试了js中的符号[]和｛｝，发现是有一定的区别的，我们也不是话唠，先奉上今天的测试代码吧：

    var arr1=[];
    var arr2={};
    console.log(arr1 instanceof Array);
    console.log(arr1 instanceof Object);
    console.log(arr2 instanceof Object);
    console.log(arr2 instanceof Array);

测试结果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-17-FEW-%20javascript%20symbol%20difference%20-1.png)


### 二、区别

#### 1、{ } 大括号

**表示 定义一个对象 ，大部分情况下要有 成对的属性和值，或是函数 。**

如： var CJC = {"Name":"CJC","Address":"GuangZhou"};

上述中代码声明了一个 名为“CJC”的对象 ，属性名和值用( 冒号 )隔开，多个属性或函数用 , （ 逗号 ）隔开，因为是对象的属性，

所以我们在访问的时候，应该用 .（点） 来层层访问： CJC.Name、CJC.Address ，当然我们也可以用数组的方式来访问，如： CJC["Name"]、CJC["Address"] ，结果是一样的。

该写法，在JSON数据结构中经常用，除此之外，我们平时写函数组的时候，也经常用到，如：

    var CJC = {
      Name = function(){
       return "CJC";
         },
      Address = function(){
       return "GuangZhou";
         }
     }
调用方式差不多，因为是函数组，所以要加上()，如：alert( CJC. Address() );

#### 2、[ ]中括号 

**表示一个数组，也可以理解为一个数组对象。**

如： var CJC = [ "Name","CJC","Address","GuangZhou" ];

很明显， 每个值或函数，都是独立的，多个值之间只用,（逗号）隔开 ，因为是数组对象，所以它等于：

var CJC = Array( "Name","CJC","Address","GuangZhou" );

访问时，也是和数组一样，alert( CJC[0] );


### 3、{ } 和[ ] 一起使用 

我们前面说到 ，{ } 是一个对象，[ ] 是一个数组， 我们可以组成一个 对象数组 ，如：

    var CJC ={

      "Name":"CJC",

      "Address":["GuangZhou","TianHe"],

      "HisFriend":[{"f1":"QinYu"},{"f2":"HaiFeng"}]

      }
    console.log(CJC.Name);
    console.log(CJC.Address[0]);
    console.log(CJC.HisFriend[0].f1);

测试结果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-17-FEW-%20javascript%20symbol%20difference%20-2.png)

 从上面的结构来看，CJC对象里面的第一项是属性，第二项是一个数组，第三项是一个数组对象。

调用起来也是，对象的属性用点（.）访问，数组的属性用[index]来 访问。​