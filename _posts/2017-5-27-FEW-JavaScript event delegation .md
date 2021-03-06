---
layout: post
title: "研究一下js中的事件委托和事件代理机制"
date: 2017-5-27
categories: 前端
tags: [前端开发，JavaScript]
---

研究一下js中的事件委托和事件代理机制

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-JavaScript%20event%20delegation%20.jpeg)

<!-- more -->

### 一、前言

对于事件代理，有些人喜欢称之为代理，然而有些人却喜欢称之为事件委托。我觉得那种称呼都行，关键是要弄懂为什么会出现这种机制，在本文中统一称之为事件委托。

本文从以下4点去阐述事件委托。

+ 1、什么是事件委托？
+ 2、为什么要用事件委托？
+ 3、怎么使用事件委托？
+ 4、事件委托有哪些好处？

### 二、什么是事件委托？

在此，我就摘抄其他文章中的解释，进行借花献佛了。JavaScript高级程序设计上讲：

**事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。**

网上的各位大牛们讲事件委托基本上都用了同一个例子，就是取快递来解释这个现象，我仔细揣摩了一下，这个例子还真是恰当，我就不去想别的例子来解释了，借花献佛，我摘过来，大家认真领会一下事件委托到底是一个什么原理：

有三个同事预计会在周一收到快递。为签收快递，有两种办法：一是三个人在公司门口等快递；二是委托给前台MM代为签收。现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台MM收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台MM也会在收到寄给新员工的快递后核实并代为签收。

这里其实还有2层意思的：

+ 第一，现在委托前台的同事是可以代为签收的，即程序中的现有的dom节点是有事件的；

+ 第二，新员工也是可以被前台MM代为签收的，即程序中新添加的dom节点也是有事件的。

### 三、为什么要用事件委托？

通常在dom节点有事件需要处理的时候，都是将事件直接绑定在dom节点之上，但是**当有很多的dom节点都有相同的事件时，如果给每个dom节点都添加事件，这将是件极其可怕的事，这势必导致会导致性能上的差异**。例如：

我们有100个li，每个li都有相同的click点击事件，可能我们会用for循环的方法，来遍历所有的li标签，然后给它们添加事件。

这种给每个li标签去添加click事件，由于不断的跟dom节点进行交互，交互次数越多，引起浏览器重绘与重排的次数也就越多，这将会引起页面整体渲染的时间大大延迟，不利于用户体验。所以在进行优化时，有一主体思想便是减少dom节点操作。

上述的例子，**如果使用事件委托的话，dom节点的操作仅有1次，这势必大大的提高js性能。也减少了js的内存消耗。**

### 四、怎么使用事件委托？

怎么使用，我就用代码去解释了。我会列出一种使用了事件委托的方式去处理dom操作的代码，还有不使用事件委托的方式去处理dom操作的代码，具体差别，大家一看便知，废话不多说，直接上代码了。
例如：

+ 有10个li标签，li标签背景色变红，移出li标签背景色为白色，新增一列也具有该效果。

html、css代码如下

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-JavaScript%20event%20delegation-1%20.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-JavaScript%20event%20delegation%20-2.png)

#### 1、不用事件委托的js代码：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-JavaScript%20event%20delegation-3.png)

**该段代码，我们可以看到dom节点的操作次数跟li的长度有关，有多少个li标签就进行了多少次dom操作。**

下面可以看下运用事件委托的dom操作次数。而且点击添加按钮之后，新增的一行，并没有实现鼠标移入背景色变化的效果，如果上述方法想要实现新增一行也能达到鼠标移入的效果，则需在添加一行之后，重新循环将事件赋值给新的一行，将代码改写成如下形式：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-JavaScript%20event%20delegation-4.png)

从上述改进后的代码，我们可以看出，该方法又增加了一个dom操作，进行上大打折扣，可以看下运用事件委托机制的js代码，是如何提高js性能的。

#### 2、运用事件委托的js代码:

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-27-FEW-JavaScript%20event%20delegation-5.png)

**从上述代码中可以发现dom操作大大减少了，只有1次dom操作，而且还是绑定在父元素上的，从这段代码中，我们便可以知道事件委托的核心是：**

**将子元素的dom操作通过事件冒泡的机制，在父元素上进行捕获，然后将事件绑定到父元素代为执行。**

### 五、事件委托有哪些好处？

我觉得事件委托的好处主要有以下几点：

+ 简化了dom操作
+ 提高了js的性能
+ 减少了内存占用

通过上述的讲述，想必大家对为什么用事件委托还有怎么使用事件委托有了一定的了解了吧，我觉得该方式可以用在任何一个拥有众多子元素并且子元素拥有相同的dom事件的情况下。以上便是我的关于事件委托的总结，如有不对的，还望各位指出来，我好及时更正。

以上文章转自,十分感谢作者宛沁汐 ：

<a href="http://5iblog.com/article/detail/25">关于js中的事件委托和事件代理机制</a>