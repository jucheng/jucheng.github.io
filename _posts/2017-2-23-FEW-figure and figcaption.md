---
layout: post
title: "figure元素和figcaption元素实现“图片+图注”"
date: 2017-2-23
categories: 前端
tags: [前端开发，CSS]
---

figure元素和figcaption元素的作用

<!-- more -->

### 1、前言

   当我们需要实现“图片+图片备注”这种效果的时候，我们可以利用figure和figcaption这两个元素进行实现

### 2、实现

A、div+span的方式

   当然，我们也可以利用div+span的方式来实现这种效果，但是，这个不是我们想要的，但是为了做出对比，我们来实现一下这种方式的代码：

      <div class="img-list">
        <img src="img/kb.jpg" alt="kobe" style="width: 200px;height: 200px; border-radius: 5px;">
        <span>这就是科比</span>
    </div>

   效果如下：

 ![](http://i1.piimg.com/567571/a060d6856b274988.png)


B、figure+figcaption的实现

   figure元素用于包含图片和备注，figcaption用于表示图注文字。在实际开发中，对于“图片+图注”效果，我觉得这种方式来实现，会使得页面的语义更好。

    <figure>
        <img src="img/kobe.jpg" alt="kobe" style="width: 200px;height: 200px; border-radius: 5px;">
        <figcaption>
            这就是科比
        </figcaption>
    </figure>

   效果如下：

![](http://p1.bqimg.com/567571/b2d9ae40f6e97fa2.png)