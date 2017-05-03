---
layout: post
title: "sublime 运行js文件window is not defined"
date: 2017-3-17
categories: 前端
tags: [前端开发，JavaScript]
---

sublime 运行js文件window is not defined

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

![](http://i4.buimg.com/567571/5cf75f0a1c952038.png)

**谷歌浏览器控制台运行结果**：

![](http://i4.buimg.com/567571/2a1a8c6a1c90d179.png)

### 三、原因分析

因为在我们的sublime-text中，这里的运行的实际环境是是运行的 node.js,问题就是出在这里，因为 在我们代码中的 window，是属于浏览器环境中的全局变量,在 node.js环境中是读取不到的，所以程序运行出错。

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

![](http://i1.piimg.com/567571/009ae117d7c53925.png)