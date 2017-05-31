---
layout: post
title: "表格语义化 PK 表单语义化"
date: 2017-2-23
categories: 前端
tags: [前端开发，CSS]
---

表格语义化 PK 表单语义化

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-23-FEW-form%20and%20table.jpeg)

<!-- more -->

### 1、前言

  这里提醒一下自己，表单和表格，这完全是两个不一样的概念

### 2、表格语义化

   虽然说在实际开发中，并不建议使用表格布局，应该使用的是浮动布局或者定位布局。虽然说我也是对表格布局有“恐惧症”，因为每次在使用excel表格的时候，感觉就头晕目眩了，也许我是有“密集恐惧症”吧，哈哈，开玩笑啦，回归正题。

   当然，在表格中，我们使用的最多的还是table、tr和td这三个属性，不过，为了加强表格的语义化，W3C还特地增加了其余的5个标签，它们分别是：th、caption、thead、tbody、tfoot

+ th  ——表头单元格
+ caption  ——表格标题
+ thead、tbody、tfoot这三个标签把表格从语义上分为表头、表身、表脚

直接上代码：

（小插曲）本来想直接贴代码的，但发现Markdown这里直接贴代码的话，显示效果就直接给我显示了一个表格了，代码不见了 >-<

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-23-FEW-form%20and%20table-1.png)

显示效果如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-23-FEW-form%20and%20table-2.png)


### 3、表单语义化

  我们前边已经说过的，表单和表格是完全不一样的东西来的，我们这里来探讨一下表单的语义化，我们分别是从以下两个方面来进行探究的：

#### A、label标签

**记住，label标签是用于显示在输入控件旁边的说明性文字，也就是将某个表单和某段说明文字关联起来**

label标签的for属性有两个作用：

1、语义上绑定了label元素和表单元素

（说明：这里的label for="name"也就是相当于input标签中的id属性)

2、增强了鼠标的可用性，也就是说我们点击label中的文本的时候，其所关联的表单元素会获得焦点（也就是说，我们点击框旁边的文字，也会自动地获取框内的焦点），如下的效果，你也可以尝试一下：

代码如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-23-FEW-form%20and%20table-3.png)


  
<form action="index.aspx" method="post">
  <div>欢迎来到草帽海贼团</div>
  <p>
    <label for="name">称号</label><input type="text" id="name" name="name">
  </p>
  <p>
     <label for="name">口号</label><input type="password" id="kouhao" name="kouhao">
  </p>
  <input type="checkbox" id="remember-me" name="remember-me"><label for="remember-me">记住我</label>
  <input type="submit" value="登录"/>
</form>



#### B、fieldset标签和legend标签

  **在表单中，我们还可以使用fieldset标签来给表单进行分组，其中，legend标签用于定义某一组表单中的标题。**

fieldset标签和legend标签的作用：

1、增强了表单的语义；

2、可以定义fieldset标签的disabled属性来禁用整个组中的表单元素

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-23-FEW-form%20and%20table-4.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-23-FEW-form%20and%20table-5.png)

（PS：是不是顿时觉得很高大上勒！！！）