---
layout: post
title: "之于闭包的理解和总结"
date: 2017-5-11
categories: 前端
tags: [前端开发，JavaScript]
---

之于闭包的理解和总结

<!-- more -->

### 一、前言

#### A、概念说明

在JavaScript中，实现了自动释放内存的系统，当代码不再需要的时候，就从电脑的内存中移除了它们。

**当函数执行完毕的时候，管理内存的本地方法会将函数中所有创建了的东西从内存中移除。毕竟函数已经执行完毕了，所以似乎我们不再需要访问该执行环境中的任何东西了。**比如：

	var personName=function()
     {
	    var name='cjc';
     }

一旦personName完成执行，我们就不再需要访问name变量了，所以name就自由了。但是这种模式有点繁琐，要不我们就把它转换成自执行匿名函数的模式吧：

	 （function()
     {
	    var name='cjc';
     }）（）；

两者是同一回事，函数执行完成的时候，name变量就不再需要保存在内存中了，我们就可以跟他说拜拜了。

那么我们再优化一下代码，如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-1.png)

或者也可以这样写：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-2.png)

两者的执行结果是一样的：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-3.png)

#### B、分析结果

现在，每次执行personName.getName()或者p1（）的时候都会访问到name变量，personName.getName()或者p1都会返回name变量当前的值。

**如果垃圾回收器来把它从内存中移除了，调用personName.getName()或者p1只是会返回undefined，而不是cjc。**

#### C、结论

现在我们终于可以回答什么是“闭包”这个问题了。

**闭包是阻止垃圾回收器将变量内存中移除的方法，使得在创建变量的执行环境外边能够访问到该变量。在getName()函数被保存到personName对象上时，一个闭包就创建了。**

**闭包因保存函数而被创建，在执行环境的外面，可以动态地访问name变量，这就阻止了垃圾回收器将name变量从内存中移除。**

**闭包由函数创建，该函数在当前执行环境中访问了某个变量，并将该函数保存给当前执行环境外的一个变量。**


### 二、事实胜于雄辩

闭包是如何工作的，先撇开所有的乱七八糟的东西，我们先看一个小例子。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-4.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-5.png)

当调用testclosure时，为这次特定的调用创建一个执行环境对象，将传入的值赋予closurename。请记住，执行环境对象是JavaScript引擎的一部分，在JavaScript中不能直接访问。

在上述的例子中，我们调用了两次testclosure,将结果保存到closurename1和closurename2。

**因为testclosure的返回值是一个函数，当我们把结果赋予closurename1的时候这个特定的执行环境对象的引用计数置为1，因为引用计数大于0，所以JavaScript引擎会保留这个特定的执行环境对象。如果这个引用计数降到0，然后JavaScript引擎会知道对这个对象进行垃圾回收了。**

**当再次调用testclosure并赋予closurename2的时候，创建了一个新的执行环境对象，这个执行环境对象的引用计数也置为1。**

此时，有两个指针分别指向两个执行环境对象，两者的引用计数都是1，尽管两者是通过执行同一个函数而创建的。

如果再次调用closurename1，它会使用“在调用testclosure的执行环境对象”上设置的值，清除保存的执行环境对象的唯一方法，当然除了关闭网页，那就是删除closurename1变量。也就是将该变量置空等于null就可以了。

当删除这个变量的时候，这个执行环境对象的引用计数就会降到0，那么在JavaScript空闲的时候，就会移除这个变量。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-6.png)

### 二、进一步讨论

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-7.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-8.png)

当我们调用outerFunction的时候，创建了一个执行环境。在这个执行环境中定义了一个innerFuntion的函数，因为在outerFunction执行环境里定义了innerFunction,它有权限访问在outerFunction作用域内的所有变量，这里是name,age,innerFunction,outerFunction和menu。当outerFunction执行完时，你可能期望在执行环境中的所有东西都会被垃圾回收器销毁。你想错了，因为innerFunction的引用保存给了全局作用域中的变量menu,所以它并不会被销毁。在声明innerFunction的作用域内，需要保留对所有变量的访问权限，它“关闭了”outerFunction执行环境的大门，阻止垃圾回收器来移除它们。这就是闭包。

### 三、最后的一个例子的讨论

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-11-FEW-Closure-9.png)

这个例子是在Ajax请求返回后，name还是可以访问的。之所以可以访问，是因为success方法是在调用sendAjaxRequest的时候创建的执行环境中定义的，此时name在作用域中。

**推荐相关闭包文章：**

<a href="https://juejin.im/post/58f1fa6a44d904006cf25d22">破解前端面试（80% 应聘者不及格系列）：从闭包说起</a>