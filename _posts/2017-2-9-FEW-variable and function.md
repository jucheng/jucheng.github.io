---
layout: post
title: "javascript中变量名和函数名重名 "
date: 2017-2-9
categories: 前端
tags: [前端开发，JavaScript]
---

javascript中变量名和函数名重名

<!-- more -->

### 1、缘由

今天突然在复习javascript的时候发现一个比较有趣的问题就是，假如在声明的时候不小心设置了变量名和函数名重名的话，那么输出的时候会是什么样的结果呢，疑惑如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-variable%20and%20function-1.png)

这个串代码执行完会报错 : a is not a function

### 2、解答
查找资料后，进行了代码测试，得到的答案如下：

+ 1)函数声明会置顶

+ 2)变量声明也会置顶

+ **3)函数声明比变量声明更置顶：(函数在变量上面)**

+ 4)变量和赋值语句一起书写，在js引擎解析时，会将其拆成声明和赋值2部分，声明置顶，赋值保留在原来位置

+ 5)声明过的变量不会重复声明

知道以上的规则,上面的代码等同于 :  

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-variable%20and%20function-2.png)

根据上述代码，var a=100就是相当于给a重新赋值了,所以会报错.

### 3.本地测试代码

一、当函数声明在前边的时候：

1、测试代码：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-variable%20and%20function-3.png)

2、输出结果：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-variable%20and%20function-4.png)

二、当函数声明在后边的时候：

1、测试代码：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-variable%20and%20function-5.png)

2、输出结果：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-variable%20and%20function-6.png)