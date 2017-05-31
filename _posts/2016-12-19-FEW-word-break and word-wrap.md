---
layout: post
title: "word-break:break-all和word-wrap:break-word的区别 "
date: 2016-12-19
categories: 前端
tags: [前端开发，CSS]
---

word-break:break-all和word-wrap:break-word的区别

![](http://oq2sjn05e.bkt.clouddn.com/2016-12-19-FEW-word-break%20and%20word-wrap.jpg)

<!-- more -->

### 一、前言

其实，自己也之前是看过AlloyTeam团队的一篇博客 <a href="http://www.alloyteam.com/2016/05/css-word-for-word-breaker-do-you-really-understand/">CSS单词换行and断词，你真的会了吗？</a>后，觉得word-break:break-all和word-wrap:break-word之间的区别真的也挺容易忘记的，这两个属性都比较常见，断词、溢出显示省略号等常见功能都需要用到它们。但具体它们分别是什么意思，各自有什么属性，可能很多人都不是很清楚。反正我不懂。每次都是从网上查一查就用上了，两个属性长得太像了，总是记不住。所以，在这里，做一下相关的笔记，日后忘了可以回来看一下。

一般情况下，元素拥有默认的white-space:normal（自动换行，不换行是white-space:nowrap）,当录入的文字超过定义的宽度后会自动换行，但当录入的数据是一堆没有空格的字符或字母或数字（常规数据应该不会有吧，但有些测试人员是会这样子做的），超过容器宽度时就会把容器撑大，不换行。

### 一、 word-break


>word-break: normal | break-all | keep-all;

normal 使用浏览器默认的换行规则。 

break-all 允许在单词内换行。
 
keep-all 只能在半角空格或连字符处换行。

![](http://oq2sjn05e.bkt.clouddn.com/2016-12-19-FEW-word-break%20and%20word-wrap-1.png)

#### 总结：

word-break 当行尾放不下一个单词时，决定单词内部该怎么摆放。 

+ break-all: 强行上，挤不下的话剩下的就换下一行显示呗。霸道型。 

+ keep-all: 放不下我了，那我就另起一行展示，再放不下，我也不退缩。傲骄型。

### 二、word-wrap

>word-wrap: normal | break-word;

normal 只在允许的断字点换行（浏览器保持默认处理）。 

break-word 在长单词或 URL 地址内部进行换行。

![](http://oq2sjn05e.bkt.clouddn.com/2016-12-19-FEW-word-break%20and%20word-wrap-2.png)

#### 总结：

word-wrap 当行尾放不下时，决定单词内是否允许换行 

+ normal: 单词太长，换行显示，再超过一行就溢出显示。 

+ break-word: 当单词太长时，先尝试换行，换行后还是太长，单词内还可以换行。

### 三、这两者的区别

两种方法的区别说明：

#### 1、word-break:break-all

 例如div宽400px，它的内容就会到400px自动换行，如果该行末端有个英文单词很长（congratulation等），它会把单词截断，变成该行末端为conra(congratulation的前端部分)，下一行为tulation（conguatulation）的后端部分了。

#### 2、word-wrap:break-word 

例子与上面一样，但区别就是它会把congratulation整个单词看成一个整体，如果该行末端宽度不够显示整个单词，它会自动把整个单词放到下一行，而不会把单词截断掉的。

![](http://oq2sjn05e.bkt.clouddn.com/2016-12-19-FEW-word-break%20and%20word-wrap-3.png)

#### 3、我们该如何记住这两个CSS的声明的呢？

在这里，我借用一下张鑫旭大神的记忆方法：

**首字母走起：wbba(微博吧), wwbw(我五百万).**

#### ４、注意点

另外一点就是word-wrap和break-word直接应用在table中是没有效果的，为了解决这个bug,只能在table中加上下面的属性：

>table {
      table-layout: fixed;
      width: 100px;    /*设置表格宽度*/}

#### 本文借鉴了以下作者的博客，在此感谢：

<a href="http://www.alloyteam.com/2016/05/css-word-for-word-breaker-do-you-really-understand/">AlloyTeam</a>

<a href="https://segmentfault.com/a/1190000003710063">CSS强制性换行word-break与word-wrap的使用</a>