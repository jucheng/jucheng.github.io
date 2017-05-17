---
layout: post
title: "Sass文件导入@import  "
date: 2017-4-20
categories: 前端
tags: [前端开发，CSS]
---

Sass文件导入@import

<!-- more -->

### 一、前言

这里虽然官网上的sass的资料文档很齐全了，我这里只是想补充一点。就是关于@import的一些特点。

### 二、细节

#### A、正常逻辑下的想法以及做法：

如果我们对CSS比较熟悉的话，就会知道在css中有一个不太会用到的特性，就是@import的导入功能，它的作用是允许在一个css文件中导入其他css文件。

但是，这个属性的问题是，当只有执行到@import 规则时，浏览器才会去下载其他css文件，这就会导致页面样式加载特别慢，从而导致出现页面闪烁的问题。

那么重点来了，我们的Sass中也有@import的导入规则，但是，与css不同的是，sass中的@import 规则会在生成css文件时，把相关的文件导入合并成一个文件，而无需浏览器去下载其他的文件。另外在被导入文件中定义的变量等也可以在导入文件中正常使用。

在使用@import 导入sass文件时，可以省略sass文件的后缀名.sass或.scss，一张图胜过千言万语：

##### 1、我们定义一个外部的scss文件 external.scss

    body {background-color: #f00; }

##### 2、然后在我们的测试文件test.scss中导入：

    @import "external";
    div {
        color: #333;
    }

##### 3、编译了之后的结果如下：

    body {background-color: #f00; }

    div {color: #333; }


#### B、正常逻辑下的问题所在：

如果你是编译整个sass目录的话，会发现一个问题：

因为我们其实只是想把test.scss编译成test.css。但是，这个时候，我们会发现，另外一个文件external.scss也被编译成了external.css。如下图，我们用Koala来编译一下此时的目录，得到以下的结果：

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-20-FEW-sass_import-1.png)


可想而知，这个结果并不是我们想要的，external.scss 作为一个中间文件，一般情况下是不需要在生成css的。

聪明的sass开发者也考虑到了这点，解决方法是：

我们只需要在文件名前加上下划线_ ，sass编译的时候就会忽略这个文件，@import 引用的时候可以加下划线引用，也可以不加。还是上面的例子，我们可以进行修改：

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-20-FEW-sass_import-2.png)

在Koala编译的结果是：

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-20-FEW-sass_import-3.png)

我们可以看到，在最终编译生成的test.css文件中也出现了_external.scss中的内容，只是在Koala中的编译这个文件被忽略了而已。这样一来，就不会生成多余的_external.css文件了。

### 三、导入css文件

当然，如果你需要像原生css那样去导入其他的css文件，也是可以的，如果符合以下三条中的任意一种情况，sass就会认为你想用css原生的@import:

+ 被导入的文件名以.css结尾
+ 被导入的文件是一个在线的url地址
+ 以@import url(...)方式去导入文件

