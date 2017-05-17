---
layout: post
title: "解开心中关于call和apply的迷惑"
date: 2017-5-12
categories: 前端
tags: [前端开发，JavaScript]
---

解开心中关于call和apply的迷惑

<!-- more -->


### 一、前言

其实一直以来，我心中存有对call和apply的疑惑，有时候，记得大概的用法，但是实际用起来，还是要查一下资料，今天就记一下笔记吧，好记性不如烂笔头。

归根结底，我觉得要知道它们存在的原因，才能更好地记住它们是怎么用的。在JavaScript的面向对象的编程中，我们经常会这样定义：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-1.png)

运行结果是：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-2.png)

假设我们现在新来了一个对象，newMessage={name:'cjp'},但是对它重新定义getName()方法又觉得麻烦，那在这里，我们就可以利用call()或者apply()方法来使用getMessage()中的getName（）方法：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-3.png)

运行结果是：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-4.png)

从上述例子，我们可以看到，**call和apply的存在是为了动态改变this的指向，当一个对象没有某个方法，但是其他对象有的时候，我们就可以借助call或apply用其它对象的方法来操作。**

### 二、两者的具体用法

    object.call(thisObj, arg1, arg2, ...);
  
    object.apply(thisObj, [arg1, arg2, ...]);

**两者作用一致，都是把object(也就是this)绑定到thisObj，这个时候thisObject具备了object的属性和方法。或者说thisObj继承了object的属性和方法。**

**他们之间唯一的区别是call接受的是连续的参数，而apply接受的是数组参数。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-5.png)

运行结果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-6.png)

### 三、调用原生对象的方法

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-7.png)

运行结果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-8.png)

**对象a类似array，但不具备array的slice等方法。使用call绑定，这时候就可以调用slice方法。**

### 四、实现继承

**通过call和apply，我们可以实现对象继承：**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-9.png)

运行结果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-10.png)

### 五、拓展：bind的使用

     obj.bind(thisObj, arg1, arg2, ...);

**把obj绑定到thisObj，这时候thisObj具备了obj的属性和方法。与call和apply不同的是，bind绑定后不会立即执行。**

在这里，我们同样是add()和sub()方法，测试用例如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-11.png)

**如果bind的第一个参数是null或者undefined，等于将this绑定到全局对象。**


### 六、还不明白？那再来一个例子

**call和apply可以用来重新定义函数的执行环境，也就是this的指向**。通过一个操作DOM的例子来理解。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-12-FEW-call%20and%20apply-12.png)

call中的第一个参数用于指定将要调用此函数的对象，在这里，changeStyle函数将被box对象调用，this指向了box对象，如果不用call的话，程序报错，因为window对象中没有style属性。
apply的用法:

    window.changeStyle.apply(box, ['height', '200px']);

**注意：如果call或apply的第一参数是null的话， this指向window。**


### 六、总结

**首先要知道call和apply是Function的方法，他的第一个参数是this，第二个是Function的参数。比如你的方法里写了this,普通调用这个方法这个this可能是window。而如果你用了call，第一个参数写啥，里面的this就是啥。**