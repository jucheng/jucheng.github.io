---
layout: post
title: "常见的JS技巧以及其原理"
date: 2017-6-5
categories: 前端
tags: [前端开发，JavaScript]
---

常见的JS技巧以及其原理

![](http://oq2sjn05e.bkt.clouddn.com/2017-6-5-FEW-JavaScript%20Common%20skills%20and%20its%20principle%20.jpg)

<!-- more -->

### 一、前言

善于利用JS中的小知识的利用，可以很简洁的编写代码

### 二、常见的JS技巧以及其原理

#### 1、使用一元加(+)模拟Number()函数

原理：对非数值类型的数据使用一元加(+)，会起到与Number()函数相同的效果。

+ **null转换为0**
+ **undefined转换为NaN**
+ **false转换为0，true转换为1**
+ **对于字符串**：
  +  空字串转换为0
  +  含有数字或者浮点数或者十六进制格式的数据(11, 0.3, 0xfe等)，转换为相应的数值
  +  含有其他格式字符，无法转换为数值的字符串，转换为NaN
+ **对于对象，先调用valueOf()方法，在转换，若结果为NaN，那么再调用toString()方法，之后再转换**

![](http://oq2sjn05e.bkt.clouddn.com/2017-6-5-FEW-JavaScript%20Common%20skills%20and%20its%20principle%20-1.png)

#### 2、使用逻辑与(&&)进行短路操作
  
      if(connected){
		login();
	  }
以上的代码可以简化为：

	connected && login()

也可以用这种方法来检查对象中是否存在某个属性：

    user && user.login

原理：逻辑与(&&)会首先对第一个操作数进行求值，只有求值结果为true时才会对第二个操作数求值。connected && login()中，若判断connected不为true,则不再进行下一步操作。

**所谓的短路操作即第一个操作数可以决定结果，则不再对第二个操作数进行求值。**

#### 3、使用逻辑或(||)设置默认值

逻辑或这个符号也属于短路操作，即当第一个操作数可以决定结果时，不再对第二个操作数进行求值。利用这个特点，我们可以给赋值语句设置默认值。只有当第一个操作数为null或者undefined时，才会把第二个操作数赋值给目标。

![](http://oq2sjn05e.bkt.clouddn.com/2017-6-5-FEW-JavaScript%20Common%20skills%20and%20its%20principle%20-2.png)

上述代码中，如果函数中没有传入name参数，name的值为undefined，那么就会给this.name赋值为"Liming"。

**ES6中可以为函数设置默认值，所以这个无需在函数中使用，但是其他地方还是很有用的。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-6-5-FEW-JavaScript%20Common%20skills%20and%20its%20principle%20-3.png)

#### 4、获取数组最后n个元素

可以使用以下代码获取数组中最后n个元素：

![](http://oq2sjn05e.bkt.clouddn.com/2017-6-5-FEW-JavaScript%20Common%20skills%20and%20its%20principle%20-4.png)

**原理:Array.prototype.slice(begin,end)可以用来裁剪数组，第二个参数的默认值是数组的长度值。若值传入一个参数，则会返回从指定索引开始到数组结尾的所有值。**

**而slice()方法还可以接收负值，当传入负值时，会自动加上数组的长度值使其转换为正值，于是便得到了最后的n个值。**

#### 5、合并大数组

**常用的合并数组的方式是使用Array.concat()函数。该函数会创建一个新数组，将两个数组连接起来存储到新数组中，这会大量消耗内存。**

**可以使用Array.push.apply(arr1, arr2)，它不会创建新数组，而是将第二个数组合并到第一个数组中，以减少内存的消耗。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-6-5-FEW-JavaScript%20Common%20skills%20and%20its%20principle%20-5.png)

原理: **Array.push()是在数组的末尾增加元素**，但是如果使用a.push(b)会把整个数组b当作一个元素添加到数组a中。**而apply()方法，则允许将某个方法的参数以数组的形式传入**，所以起到了将数组b中的元素追加到数组a中的效果。

#### 6、NodeList转换为数组

**使用document.querySelectorAll('div')返回的是NodeList对象，虽然它很像数组，但是并不能使用诸如sort()，filter()等方法。你可以将其转换为真正的数组。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-6-5-FEW-JavaScript%20Common%20skills%20and%20its%20principle%20-6.png)

原理:

+ **1、[].slice.call(eles)**

**首先创建了一个空数组[]，然后调用他的slice()方法**，但是在slice()方法的执行中，把this对象指向了eles,所以会对eles进行裁减，由于对slice()方法没有传入参数，所以相当于slice(0,eles.length),会按照元长度返回一个数组。

+ **2、Array.prototype.slice.call(eles)**

 原理与上面相似，只不过这次没有创建空数组，而是**直接使用了原型中的方法**

+ **3、Array.from()**

**Array.from()接受一个类数组对象或者可迭代对象，基于该对象创建一个新的Array实例。**


**参考文献：十分感谢作者胡不归**

<a href="https://segmentfault.com/a/1190000009649740?_ea=200348">常用JavaScript小技巧及原理详解</a>