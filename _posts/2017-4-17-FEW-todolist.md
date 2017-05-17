---
layout: post
title: "备忘录的项目笔记 "
date: 2017-4-17
categories: 前端
tags: [前端开发，项目]
---

备忘录的项目笔记

<!-- more -->

### 前言

这个项目的主要内容是vue.js的记录，因为bootstrap只是一个框架，负责美化了操作的界面，但是实际上对数据的操作还是依靠Vue.js的。

### 笔记

#### 1、$index的作用

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-1.jpg)

从上述的代码，我们可以很清晰的看到，index的作用就是相当于一个索引值，因为index的初始化的值是0，但是我们添加的项目，至少是从1开始，所以，这里必须给它加1。

**注意：$index是存在Vue.js 1.0的版本的，也就是说，如果你导入的Vue.js的文件的版本是2.0以后的版本，那么，在这里添加后的索引显示结果都是NaN。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-2.jpg)

#### 2、删除按钮涉及的代码

这里涉及了Vue.js的点击事件，其实这里完全可以用点击事件的缩写

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-3.jpg)

因为我们每增加一个item，对应尾部都会有一个删除的按钮，那么，我们是如何判断当前点击的那个删除的按钮是对应哪一个item的呢？不急，我们慢慢来，可以看到，下边有一个nowIndex，而且在一开始的时候，我们先设置nowIndex的值为-100（其实这个值取值范围不是很重要，只要不大于0就行）

      nowIndex=$index

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-4.jpg)

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-5.jpg)

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-6.jpg)

当我们点击一个删除按钮的时候，nowIndex就会获取当前index的值，然后通过删除函数deleteMsg()来删除所选的item。

splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。

所以，这里用这个函数很正确，也就是从当前索引值得地方，进行删除一个值。

#### 3、全部删除

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-7.jpg)

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-8.jpg)

这里其实很容易，也就是定义nowIndex=-2,只要使用者点击这个按钮，那么就清空存储数据的数组。但是，这里有一定需要注意的是，假如我们当前的数组还没有任何数据的时候，就不能谈说删除数据，更别说删除全部数据，那么，我们在此处可以这样设置：

           v-show="myData.length !=0 "

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-9.jpg)

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-10.jpg)

也就是说，如果当前的数据的长度是空的话，那么就不显示这个全部删除的按钮，否则就显示。


#### 4、暂无数据

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-11.jpg)

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-12.jpg)

这里的判断跟之前的差不多，也就是如果存储数据的数组为空，那么就显示出这个标签的内容：

            myData.length==0


#### 5、添加数据并且添加完之后清空输入框

![](http://oq2sjn05e.bkt.clouddn.com/2017-4-17-FEW-todolist-13.jpg)

这里我们先初始化所有的数据，然后添加数据的方法就是利用数组的一个方法push()进行添加数据到当前数据，然后添加完之后，又置空输入框。

