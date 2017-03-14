---
layout: post
title: "IE条件注释详解"
date: 2017-3-14
categories: 前端
tags: [前端开发，CSS]
---

IE条件注释详解

<!-- more -->

### 一、前言

IE条件注释是微软从IE5开始就提供的一种非标准逻辑语句，作用是可以灵活的为不同IE版本浏览器导入不同html元素，如：样式表，html标签等。很显然这种方法的最大好处就在于属于微软官方给出的兼容解决办法而且还能通过W3C的效验。

### 二、分类

#### 1、只有IE才能识别 

    <!--[if IE]>
    <link type="text/css" rel="stylesheet" href="my.css" />
    <![endif]-->

因为只有IE5以上的版本才开始支持IE条件注释，所有“只有IE”才能识别的意思是“只有IE5版本以上”才能识别。

#### 2、只有特定版本才能识别

    <!--[if IE 8]> 
    <link type="text/css" rel="stylesheet" href="my.css" />   
    <![endif]-->

识别特定的IE版本，高了或者低了都不可以。上例只有IE8才能识别。

#### 3、只有不是特定版本的才能识别

    <!--[if !IE 7]> 
    <link type="text/css" rel="stylesheet" href="my.css" />   
    <![endif]-->

上例中特定IE7版本不能识别，其他版本都能识别，当然要在IE5以上。

#### 4、只有高于特定版本才能识别
 
    <!--[if gt IE 7]> 
    <link type="text/css" rel="stylesheet" href="my.css" />   
    <![endif]-->

上例中只有高于IE7的版本才能识别。IE7无法识别。

#### 5、等于或者高于特定版本才能识别

    <!--[if gte IE 7]> 
    <link type="text/css" rel="stylesheet" href="my.css" />   
    <![endif]-->

上例中IE7和更高的版本都能识别。

#### 6、只有低于特定版本的才能识别

    <!--[if lt IE 7]> 
    <link type="text/css" rel="stylesheet" href="my.css" />     
    <![endif]-->

上例中只有低于IE7的版本才能识别，IE7无法识别。

#### 7、等于或者低于特定版本的才能识别

    <!--[if lte IE 7]> 
    <link type="text/css" rel="stylesheet" href="my.css" />   
    <![endif]-->

上例中IE7和更低的版本可以识别。


### 三、关键词解释

上面那些代码好像很难记的样子，其实只要稍微解释一下关键字就很容易记住了。

+ **lt ：就是Less than的简写，也就是小于的意思。**

+ **lte ：就是Less than or equal to的简写，也就是小于或等于的意思。**

+ **gt ：就是Greater than的简写，也就是大于的意思。**

+ **gte：就是Greater than or equal to的简写，也就是大于或等于的意思。**

+ **!：就是不等于的意思，跟javascript里的不等于判断符相同。**

这样解释一下，是不是好记多了。

### 四、特别提示

１、有人会试图使用<!--[if !IE]>来定义非IE浏览器下的状况，但注意：条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下被当做注释视而不见。

２、我们通常用IE条件注释根据浏览器不同载入不同css，从而解决样式兼容性问题的。其实它可以做的更多。它可以保护任何代码块——HTML代码块、JavaScript代码块、服务器端代码……看看下面的代码。

    <!--[if IE]> 
    <script type="text/javascript"> 
     alert("你使用的是IE浏览器！"); 
    </script> 
    <![endif]-->

#### 五、补充

本文引自博文
<a href="http://www.admin10000.com/Document/21.html">全栈开发者</a>  十分感谢