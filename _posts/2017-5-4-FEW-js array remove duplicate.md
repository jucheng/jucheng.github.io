---
layout: post
title: "谈谈js数组去重"
date: 2017-5-4
categories: 前端
tags: [前端开发，JavaScript]
---

谈谈js数组去重

<!-- more -->

### 一、前言

说到js数组去重，在一些文章中，看到某一些数组去重的方法，在判断元素是否相等时，使用的是==比较运算符。众所周知，这个运算符在比较前会先查看元素类型，当类型不一致时会做隐式类型转换。这其实是一种非常不严谨的做法。因为无法区分在做隐匿类型转换后值一样的元素，例如0、''、false、null、undefined等。

同时，还有可能出现一些只能黑人问号的结果，例如：

     [] == ![]; //true

### 二、处理方法总结

#### A、利用Array.prototype.indexOf()

**indexOf()方法返回在该数组中第一个找到的元素位置，如果它不存在则返回-1，indexOf()使用的是严格比较，也就是===**

##### 1、第一种处理方式

     let arr1=[1,2,3,4,3,2,1,4];
     function unique(arr) {
       return arr.filter(function(item, index){
        // indexOf返回第一个索引值，
        // 如果当前索引不是第一个索引，说明是重复值
        return arr.indexOf(item) === index;
      });
    }

    console.log(unique(arr1));

![](http://i2.muimg.com/567571/6700829296a7372a.png)

#### 笔记：

**array.filter(function(currentValue,index,arr), thisValue)**

**filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。**

**注意： filter() 不会对空数组进行检测。**

**注意： filter() 不会改变原始数组。**

![](http://i1.piimg.com/567571/94d1d7bcee64af2c.png)

##### 2、第二种处理方式

    function unique(arr) {
    var ret = [];
    arr.forEach(function(item){
        if(ret.indexOf(item) === -1){
            ret.push(item);
        }
       });
      return ret;
    }

    console.log(unique(arr1));

![](http://i2.muimg.com/567571/6700829296a7372a.png)

#### 笔记：

**array.forEach(function(currentValue, index, arr), thisValue)**

**forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。**

**注意: forEach() 对于空数组是不会执行回调函数的。**

![](http://i2.muimg.com/567571/a48268a582f686ff.png)


#### B、利用Array.prototype.includes()

**Array.prototype.includes()是ES2016中新增的方法，用于判断数组中是否包含某个元素**，所以上面使用indexOf()方法的第二个版本可以改写成如下版本：

![](http://i2.muimg.com/567571/2a5ef2fe29566473.png)

##### 笔记

**注意的是，indexOf()方法和includes()对待NaN行为是完全不一样的**，以下代码进行验证：

![](http://i4.buimg.com/567571/6dae0ab47d4f40cc.png)


#### C、利用ES2015中的Map

**Map是一种新的数据类型，可以把它想象成key类型没有限制的对象。此外，它的存取使用单独的get()、set()接口。**

![](http://i2.muimg.com/567571/ee0d53b12694ee54.png)

**由于Map使用单独的接口来存取数据，所以不用担心key会和内置属性重名（如上文提到的__proto__）。使用Map改写一下我们的去重方法：**

![](http://i1.piimg.com/567571/1cb614966d2a8009.png)


#### D、利用ES2015中的Set

除了Map以外，ES2015还引入了一种叫作Set的数据类型。

顾名思义，**Set就是集合的意思，它不允许重复元素出现**，这一点和数学中对集合的定义还是比较像的。

**如果你重复添加同一个元素的话，Set中只会存在一个。包括NaN也是这样。**于是我们想到，这么好的特性，要是能和数组互相转换，不就可以去重了吗？

![](http://i2.muimg.com/567571/316600bc702ae6ca.png)

#### E 、以前用到的双重遍历去重

![](http://i2.muimg.com/567571/ef30a4f6b09a77b9.png)

双重遍历还有一个优化版本，但是原理和复杂度几乎完全一样：

![](http://i4.buimg.com/567571/f33f052fc2357d41.png)