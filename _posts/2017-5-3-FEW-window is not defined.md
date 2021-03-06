---
layout: post
title: "sublime 运行js文件window is not defined"
date: 2017-5-3
categories: 前端
tags: [前端开发，JavaScript]
---

sublime 运行js文件window is not defined

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-3-FEW-window%20is%20not%20defined.jpg)

<!-- more -->

### 一、前言

之前有过一个疑惑是，在sublime text中运行js代码，如果其中代码用到window、document对象
当点击ctrl+b运行的时候，控制台会提示window is not definedwindow is not defined，但是相同的代码在浏览器的console的控制台运行就没问题，之前只是在测试的时候用到，所以没有怎么在意，但是今天又遇到了，所以，必须得搞清楚了。

### 二、问题

代码如下：

	function Cat(name) {
         this.name = name;
    }

    Cat.prototype.sayCatName = () => {
    console.log(this === window); // => true
    return this.name;
    };

    const cat = new Cat('Mew');
    cat.sayCatName(); // => undefined

**sublime-text3控制台运行结果：**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-3-FEW-window%20is%20not%20defined-1.png)

**谷歌浏览器控制台运行结果**：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-3-FEW-window%20is%20not%20defined-2.png)

### 三、原因分析

因为在我们的sublime-text中，这里的运行的实际环境是是运行的 node.js,问题就是出在这里，因为 在我们代码中的 window，是属于浏览器环境中的全局变量,在 node.js环境中是读取不到的，所以程序运行出错。

**通常我们所说的全局变量是执行环境顶层对象的属性。浏览器的顶层对象是windows对象，在node.js中，顶层对象叫做global，变量作用域的工作方式也不一样。window对象包含了很多属性，包括对象，方法（onload,onresize,alert,close....),DOM元素（document、frames.....)以及其他变量，所有这些属性使用语法window.property来访问。**

    window.onload=function(){
	     window.alert('i am cjc');
      }

**node.js的顶层对象叫做global。由于node.js是网络服务器而不是浏览器，其中可用的函数和属性是很不一样的。**

**当浏览器中的JavaScript检查全局变量是否存在的时候，它是在window对象上查找的。**

以上的代码中，我们可以把window改成 global，那么运行就不会出错。

     function Cat(name) {
         this.name = name;
    }

    Cat.prototype.sayCatName = () => {
    console.log(this === global); 
    return this.name;
    };

    const cat = new Cat('Mew');
    cat.sayCatName(); // => undefined

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-3-FEW-window%20is%20not%20defined-3.png)