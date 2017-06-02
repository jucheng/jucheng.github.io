---
layout: post
title: "JavaScript数据类型检测，没你想象的那么简单"
date: 2017-5-25
categories: 前端
tags: [前端开发，JavaScript]
---

JavaScript数据类型检测，没你想象的那么简单

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking.jpeg)

<!-- more -->


### 一、前言

前些天在回去的公交车上，看到了关注的公众号 HTML5学堂 的一篇文章的推送，就是今天我要讲的重点，如文章标题所言，我原以为数据类型检测也就那么点东西，无非就是typeof,复杂一点的就是instanceof,然后，然后，就是我要写下这篇文章了来记录一下这个"简单"的东西了。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-1.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-2.png)

### 二、数据类型检测方法

+ 1、最为基础的typeof
+ 2、不可不知的instanceof
+ 3、比instanceof更好的constructor
+ 4、检测值或表达式结果是否为NaN
+ 5、易用的jQuery函数-isFunction、isArray等
+ 6、高大上的原型方法 Object.prototype.toString

### 三、typeof 基本数据类型的检测

#### 1、基本解析

typeof是一个运算符，**针对一个操作数**（操作数可以是变量也可以是常量）进行运算，其返回值是一个字符串，返回值包括："number"、"string"、"boolean"、 "undefined"、"object"、"function"。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-3.png)

#### 2、typeof的局限性

typeof的问题在于：**针对对象类型数据，无法进行具体细化的检测**。对于数组、正则、对象{}、null等数据。

**虽然均属于对象类型，但却各不相同，使用typeof进行检测时，均返回object。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-4.png)

### 四、不可不知的instanceof

面对typeof的类型检测缺陷，可以使用instanceof来弥补。

#### 1、基本解析

instanceof，能够用于数据类型的检测，但是**仅限于引用类型数据**，无法检测基本数据类型的值,检测的返回值内容是布尔值。

此外，注意，这里**会受到原型链的影响**。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-5.png)

#### 2、instanceof的局限性

##### 局限性1：不能够检测以“字面量”方式出现的基本数据类型；

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-6.png)

代码解析：str是使用“字面量”的方式创建的字符串，而str2是使用String对象实例化的字符串。检测str时，返回结果为false；而检测str2时，返回结果为true。

##### 局限性2：会检测该类所归属的原型链，只要在原型链当中能够找到，检测结果均为true，检测结果有可能会出现问题。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-7.png)

代码解析：在此处如果不是很了解原型链的童鞋，可以换个角度来理解。例如：数组（Array）隶属于对象（Object），对于这种归属，检测也是成功的。

还不理解？好，我们换一个更易懂的！人类，属于哺乳动物，此时检测我们是否是哺乳动物，结果会是什么呢？

范例1中的字符串，的确属于string类型，但是它是通过String构造函数实例化得到的，String本身是一个字符串对象，所以str也符合Object这个条件。

范例2中的body标签本身是一个对象，细化一些说是一个“节点对象”，再细化说，是一个“body元素”，所以三种检测均为true。范例3中的数组同理
（数组属于对象的一个分类）

#### 3、注意点

##### A、注意点一：

使用instanceof操作符时候需要注意的一件事情是，**任何时间判断一个对象是否是Object的实例，他都将返回true，因为所有对象都继承自Object()构造函数。**

##### B、注意点二：

**原始值使用对象包装器，判断实例时**（如'foo' instanceof String  //返回false），**instanceof操作符返回false。**

**如果使用new操作符创建字符串'foo'，instanceof操作符会返回true，所以，请记住，instanceof只适用于构造函数创建返回的复杂对象和实例。**




### 五、比instanceof更好的constructor

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-8.png)

#### 1、基本解析

constructor是对象的一个属性，不是运算符，constructor属性指向对象的构造函数。

constructor的作用与instanceof基本类似，但是它对instanceof的两个缺陷均进行了弥补，也就是说：**既能够检测基本数据类型，又不受到原型链的影响。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-9.png)

#### 2、constructor的局限性

对于自己创建的构造函数，constructor的局限性会比较大（当然这里不是我们主要要讨论的东西），**constructor属性是易变的，可以进行定义，所以并不能够保证它指向相应的构造函数**。

但是，对于系统的各类构造函数，还是可以正常使用的，毕竟我们平日里并不会去修改系统默认对象的constructor指向的。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-10.png)

#### 3、相关说明

如果希望了解instanceof、constructor的基本原理，需要掌握原型，了解构造函数的内在机制。如果在这方面积累不太够的小伙伴，建议可以先掌握这些知识点，然后后期随着自己知识的深入逐渐的理解实现原理。

### 六、检测值或表达式结果是否为NaN

#### 1、isNaN函数

**isNaN用于检测值或表达式“转换为数字”时，是否为NaN**。可以用于辅助parseFloat()和parseInt()进行进一步的结果检测。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-11.png)

### 七、易用的JQ函数-isArray等

jQuery当中，提供了大量的数据类型检测方法（isArray、isFunction等等），可以检查数据属于哪种具体的对象类型，此处就不多谈了，感兴趣的查看JQ的API文档即可。

### 八、Object.prototype.toString.call()

#### 1、基本解析

**Object.prototype.toString比较常用于判断对象值属于哪种内置属性，返回值类型为字符串，返回的字符串格式为："[object 数据类型]"。**

由于许多引用类型都重写了Object继承来的toString方法，所以通常使用call/apply方法，借用Object.prototype.toString函数来判断数据类型。

每一种数据类型所属的类的原型上都有toString方法，例如：Number.prototype、String.prototype、Array.prototype等等。除了Object上的toString之外，其他类原型上的toString都用于将数据值转换为字符串。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-12.png)

#### 2、Plus

可以借助字符串截取的方法，获取Object.prototype.toString的结果，并进行处理，从而得到“Number”、“Null”等数据类型字符串，从而更方便进行数据类型比较/检测。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-25-FEW-JavaScript%20Data%20type%20checking-13.png)

#### 引用申明

本文大部分参考自公众号"html5学堂”的<a href="https://mp.weixin.qq.com/s?__biz=MzAwNTM2ODYxMA==&mid=2650783266&idx=1&sn=799272bbed47c7a9605a6681b1669697&chksm=8316a06fb4612979366279c2a8abcf378aa25e8713b43fb919f966b07ec6b3b9114491f7c0ab&mpshare=1&scene=1&srcid=0519KTce0GYW8xN4EbAZr6DL#rd">原生JS | 数据类型检测，并没你想象的那么简单</a>，十分感谢作者，如有侵权，我会及时删除。

