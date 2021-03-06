---
layout: post
title: "CSS3选择器:nth-child和:nth-of-type之间的差异"
date: 2017-3-16
categories: 前端
tags: [前端开发，CSS]
---

CSS3选择器:nth-child和:nth-of-type之间的差异

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-16-FEW-%20css3-child-selector%20.jpeg)

<!-- more -->

### 一、前言

   之前看到这两个属性的时候，就感觉nth-child和:nth-of-type这两个属性挺像的。因为从表面上看，这两个属性都是选择的是对应的子代去进行改变相应的属性。

   当然，遇到不会的属性，肯定是各种文档走起，第一首选当然是MDN爸爸，但是，不小心中突然发现了张鑫旭大神的博客，而且讲得也很透彻，所以，在这里，我也就顺着张大神的思路，去分析一下这两个属性。

### 二、属性测试

#### 1、第一个测试：

 A、首先是HTML部分：

    <section>
      <p>我是第一段要测试的文字</p>
      <p>我是第二段要测试的文字</p>   
    </section>

 B、然后是两个选择对应的CSS代码：

    p:nth-child(2){  color: #8AC6FE; }

    p:nth-of-type(2){  color: #8AC6FE; }

 C、如下这个是效果截图：在这里，这两个选择器所实现的效果是一致的：

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-16-FEW-%20css3-child-selector%20-1.png)

当然，虽然上面两个demo的最后的显示效果是一致的，但这两个选择器之间存在差异是一定的。

#### D、两者之间的区别：

**对于:nth-child**选择器，在简单白话文中，意味着选择一个元素如果：

+ **这是个段落元素**
+ **这是父标签的第二个孩子元素**


**对于:nth-of-type**选择器，意味着选择一个元素如果：

+ 选择父标签的第二个段落子元素

感觉张鑫旭大神的博客都是带着幽默的口气去描述的，那么，额，它们两者之间的区别是，怎么讲呢，**后者的限制条件少点～～～～**


#### 2、第二个测试

那么我们把上述的例子稍微修改一下，就可以比较明显地看出两个选择器的区别了。

A、那么，别嫌我啰嗦，这个也是HTML部分：

     <section>
        <div>别打我啊，不关我的事啊，是图安叫我过来的</div>
        <p>我是第一段要测试的文字</p>
        <p>我是第二段要测试的文字</p>
    </section>

B、那么这里我先设置：

    p:nth-child(2){ color: #8AC6FE; }

效果图如下：

p:nth-child(2)就悲剧了，其渲染的结果不是第二个p标签文字变蓝，而是第一个p标签，也就是父标签的第二个子元素

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-16-FEW-%20css3-child-selector%20-2.png)

**（PS：看清楚咯，这里是第二行被设置了颜色！！！）**

然后我再设置：

    p:nth-of-type(2) ｛  color: #8AC6FE;  }

效果图如下：

p:nth-of-type(2)的表现显得很坚挺，其把希望渲染的第二个p标签染蓝了

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-16-FEW-%20css3-child-selector%20-3.png)

**（PS：看清楚咯，这里是第三行被设置了颜色！！！）**

#### 3、第三个测试

对于p:nth-child(2)表示这个元素要是p标签，且是第二个子元素，是两个必须满足的条件。于是，就是第一个p标签颜色为蓝色（正好符合：p标签，第二个子元素）。如果在div标签后面再插入个span标签，如下：

A、直接上HTML代码

    <section>
        <div>别打我啊，不关我的事啊，是图安叫我过来的</div><br>
        <span>我也只是来打酱油的，也是图安叫我过来的</span>
        <p>我是第一段要测试的文字</p>
        <p>我是第二段要测试的文字</p>
    </section>

那么p:nth-child(2)将不会选择任何元素。

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-16-FEW-%20css3-child-selector%20-4.png)


而p:nth-of-type(2)表示父标签下的第二个p元素，显然，无论在div标签后面再插入个span标签，还是h1标签，都是第二个p标签中的文字变蓝。

![](http://oq2sjn05e.bkt.clouddn.com/2017-3-16-FEW-%20css3-child-selector%20-5.png)


#### 4、总结

从上述的例子，我们可以看出来，相对来说：**可能是nth-of-type()这个属性比较稳定一些，但是其实真正用起来，也要看具体的使用场景，可能就是nth-child()的波动性就会大一点。**