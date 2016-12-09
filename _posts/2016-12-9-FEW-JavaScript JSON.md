---
layout: post
title: "浅谈JSON，JSON字面量，JSON对象之间的区别 "
date: 2016-12-9
categories: 前端
tags: [前端开发，JavaScript]
---

浅谈JSON，JSON字面量，JSON对象之间的区别

<!-- more -->

### 1、首先明确JSON是什么？

json是一种数据交换格式，是纯文本的字符串，是作为一种替代XML数据格式角色出现，json简单易读方便转换跨平台,有很多json api提供了json字符串与对象互转的方法，如下面JavaScript中json字符串互转的方法。

 >JSON.stringify()//将对象转化为json字符串
 
 >JSON.parse()//将json字符串转化了对象

### 2、JSON和JavaScript的关系是怎样的呢 ？
json开始是JavaScript语法中的一个子集，后来人们觉得这种形式的用来作为数据交换格式不错，就单独将它拿了出来，这也是造成大家对JSON，JSON字面量，JSON对象之间混淆不清的缘由了。

### 3、json对象与javascript对象字面量

     //开发人员创建对象字面量的标准方式

    var  person={ name:"xx", age:10};

    //也可以这样写

    var  person={"name":"xx", "age":10};

上述对象字面量的json格式：

    {
    "name":"xx",
    "age":10
    }

### 4、json对象与javascript对象字面量区别：

>1.json没有声明变量（json中没有变量的概念）

>2.没有末尾的分号（因为这不是javascript语句，所有不需要分号）

>3.json对象的属性必须加双引号，js中可加可不加

json属性的值可以是简单值，也可以是复杂类型的值，所以可以在对象中嵌入对象，像下面这样:

    {
    "name":"xx",
    "age":10
    "school":
    {
    "name":"bb",
    "location:"aa"
    }
    }

>注意：在同一个对象中绝对不能出现两个同名属性，上面这样由于name属性分别属于不同的对象，所以完全没有问题。再一次提醒一遍，json中对象的属性名任何时候都必须加上双引号，把双引号写成单引号或者不加双引号都是错误的。

### 5、json数组与Array对象

javascript中的数组字面量

    var arry=[10,'balck',false];

json数组

    [10,'balck',false]

注意：json数组也没有变量和分号

### 6、JSON数据格式是JavaScript数据格式，但是JavaScript数据格式则不一定是JSON数据格式

     var person={
    "name":"xianyu",
    "age":24,
    "love":"Online Game"
     }
> 从上我们可以看出这就是用字面量表示一个对象，而这个格式就是json格式的， 因为本身json就是JavaScript语法集的一种，所以json字面量就是用json格式的JavaScript对象字面量。
 
> json放到JavaScript中执行是合法代码，是JavaScript对象字面量，但是JavaScript对象字面量不一定是json

    var person={
    "name":"xianyu",
    "age":24,
    "love":"Online Game"
    }

    var person={
    name:'xianyu',
    age:24,
    love:'Online Game',
    skill:function(){
          alert('basketball')
    }
    }

json必须是符合以下:

+ 1.键一定要用双引号，值如果是字符串也要用双引号包括

+ 2.数据只包括，数字，布尔，数组，null，对象，字符串
+ 
而JavaScript对象字面量属性不用引号也可以，而且值可以是任何类型，函数，undefined或者是正则都是可以的 。json只是JavaScript语法集中的一种，还有很多其他部分的东西都是不符合json的规范。


#### 本文借鉴了以下作者的博客，在此感谢：

<p><a href="http://www.jianshu.com/p/db68582ca823">没梦想的咸鱼丶的博客</a> </p>

<p><a href="http://www.cnblogs.com/miss-radish/p/3663711.html">前端小妞的博客</a> </p>