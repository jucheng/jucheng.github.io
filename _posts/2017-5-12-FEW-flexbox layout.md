---
layout: post
title: "深入解析 CSS Flexbox"
date: 2017-5-12
categories: 前端
tags: [前端开发，CSS]
---

深入解析 CSS Flexbox

<!-- more -->


### 一、前言

Flexbox 是一个 CSS3 的盒子模型 ( box model )，顾名思义它就是一个灵活的盒子 ( Flexible Box )，为什麽最近这个属性才红起来呢？最主要也是因为 CSS3 的规范终于普及 ( 或 IE 终于败亡 )，加上行动装置的发展促成了响应式布局兴起，自适应长宽弹性相当大的 Flexbox 就趁势而起了。

第一步要来看 Flexbox 的盒子模型，根据 W3C 文章所描述，flex 的盒子模型如下图所呈现，与一般的盒子模型不同的地方，在于 Flexbox 的盒子模型具有水平的起点与终点 ( main start、main end )，垂直的起点与终点 ( cross start、cross end )，水平轴与垂直轴 ( main axis、cross axis )，然后元素具有水平尺寸与垂直尺寸 ( main size、cross size )，这些都是相当重要的布局规画。

![](http://i4.buimg.com/588926/b3534b1da3cfdd49.jpg)

再来我们先看看 Flexbox 有哪些属性，也可参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes">MDN的使用 CSS 弹性盒子</a>

+ display
+ flex-direction
+ justify-content
+ align-items
+ align-self
+ align-content
+ flex-wrap
+ order
+ flex

### 二、属性介绍

#### A、display

display 是我们熟知的 CSS 属性，对于 Flexbox 来说，多了有两种方式可以设定，预设为「flex」，其布局方式与 block 几乎类似，都会强迫换行，但设定display:flex的子元素却具备了更多弹性的设定。

此外另外一种方式则是「inline-flex」，和 inline-block 也是几乎雷同，意义上都是一个display:flex的元素外面包覆display:inline的属性，在后方的元素不会换行。

这样做将元素定义为弹性容器，其子元素则成为弹性项目。值 flex 使弹性容器成为块级元素。值 inline-flex 使弹性容器成为单个不可分的行内级元素。

![](http://i2.muimg.com/588926/0277667d97ecc1c8.png)

![](http://i4.buimg.com/588926/197e5d0441bdc5e6.png)

#### B、flex-direction

flex-direction 表示 Flexbox 內容元素的「排列方向」，分別有下列四种。

+ row：预设值，由左到右，从上到下
+ row-reverse：与 row 相反
+ column：从上到下，再由左到右
+ column-reverse：与 column 相反

![](http://i4.buimg.com/588926/74800943c2f894aa.png)

![](http://i2.muimg.com/588926/7c41d423a5c0f5dd.jpg)

#### C、justify-content

justify-content 决定了内容元素与整个 Flexbox 的「水平对齐」位置，回想一下最上面讲的 Flexbox 盒子模型，具有 main start 与 main end 左右两个端点，justify-content 就是按照这个方式做设定，而其中的设定值总共有下列五个。

+ flex-start：预设值，对齐最左边的 main start
+ flex-end：对齐最左边的 main end
+ center：水平置中
+ space-between：平均分配内容元素，左右元素将会与 main start 和 main end 贴齐
+ space-around：平均分配内容元素，间距也是平均分配

![](http://i2.muimg.com/588926/db036e916099f983.png)

![](http://i2.muimg.com/588926/b2d3ff8a87c4958a.jpg)

#### D、align-items

align-items 刚好和 justify-content 相反，align-items 决定了内容元素与整个 Flexbox 的「垂直对齐」位置，再回想一下最上面讲的 Flexbox 盒子模型，具有 cross start 与 cross end 左右两个端点，align-items 与 align-self 就是按照这个方式做设定，设定值总共有下列五个。

+ flex-start：预设值，对齐最上面的 cross start
+ flex-end：对齐最下面的 cross end
+ center：垂直置中
+ stretch：将内容元素全部撑开至 Flexbox 的高度
+ baseline：以所有内容元素的基线作为对齐标准

![](http://i4.buimg.com/588926/6c992e6de23078ee.png)

![](http://i4.buimg.com/588926/97f5ef22f8b4dcf3.jpg)

#### E、align-self

align-self 的设定与 align-items 相同，但目的不同，align-self 的作用在于覆写已经套用 align-items 的属性，如果照我们以前所写，因为 align-items 是针对子元素，所以必须要用 align-self 来进行覆写，我们直接用上一个范例来修改就很清楚了。

+ auto

设置为父元素的 align-items 值，如果该元素没有父元素的话，就设置为 stretch。

+ flex-start

flex 元素会对齐到 cross-axis 的首端。

![](http://i2.muimg.com/588926/0935339edf451c57.png)

+ flex-end

flex 元素会对齐到 cross-axis 的尾端。

![](http://i2.muimg.com/588926/bbd85ff1edcdbc9c.png)

+ center

flex 元素会对齐到 cross-axis 的中间，如果该元素的 cross-size 的尺寸大于 flex 容器，将在两个方向均等溢出。

![](http://i4.buimg.com/588926/45f60948520566ad.png)

+ baseline

所有的 flex 元素会沿着基线对齐。

![](http://i2.muimg.com/588926/ba376047f2dcfee3.png)

+ stretch

flex 元素将会基于容器的宽和高，按照自身 margin box 的 cross-size 拉伸。

![](http://i1.piimg.com/588926/6252ed3ca1cb7365.png)

![](http://i1.piimg.com/588926/ba9c3d4b290c21f4.png)

![](http://i4.buimg.com/588926/62898ca0adf3fd8c.jpg)

#### F、align-content

刚刚谈到的 align-items 是针对内容为单行的元素进行处理，如果遇到多行的元素，就要使用 align-content 这个属性，这个属性总共有六个设定值。( 范例：css-flexbox-demo6.html、W3C 说明 )

+ flex-start：预设值，对齐最上面的 cross start
+ flex-end：对齐最下面的 cross end
+ center：垂直置中
+ space-between：将第一行与最后一行分别对齐最上方与最下方
+ space-around：每行平均分配间距
+ stretch：内容元素全部撑开

![](http://i1.piimg.com/588926/c1b72313ebaf8edb.png)

![](http://i2.muimg.com/588926/7d35f8799a9c6679.jpg)

#### G、flex-wrap

在刚刚的范例看到一个 flex-wrap 的属性，这个属性负责的是让内容的元素换行，因为当我们把父元素的 display 设定为 flex 或 inline-flex 的时候，子元素就是以单行的方式，弹性撑满父元素，所以就要利用 flex-wrap 来换行，共有三个设定值。( 范例：css-flexbox-demo7.html)

+ nowrap：预设值，单行
+ wrap：多行
+ wrap-reverse：多行，但内容元素反转

![](http://i1.piimg.com/588926/8487d49ef0f579fe.png)

![](http://i1.piimg.com/588926/579020e7bdf70889.jpg)

#### H、order

刚刚在 flex-wrap 的属性里头看到了可以把元素反转，order 这个属性更是可以直接指定一个数字，就可以由小到大的排列顺序

![](http://i1.piimg.com/588926/295f171221f191f3.png)

![](http://i1.piimg.com/588926/4bb4b54f05b645ca.jpg)

#### I、flex

好酒沉瓮底，有耐心看到下面的才会看到重点喔哈哈！flex 应该是 Flexbox 里头最重要的属性了，而 flex 其实是由三个属性组合而成，依照先后顺序分别是「flex-grow」、「flex-shrink」和「flex-basis」，如果 flex 只填了一个数值 ( 无单位 )，那麽预设就是以 flex-grow 的方式呈现，至于三个属性的解释如下：

flex-grow：数字，无单位，当子元素的 flex-basis 长度「小」于它自己在父元素分配到的长度，按照数字做相对应的「伸展」比例分配，预设值为 1，设为 0 的话不会进行弹性变化，不可为负值。
flex-shrink：数字，无单位，当子元素的 flex-basis 长度「大」于它自己在父元素分配到的长度，按照数字做相对应的「压缩」比例分配，预设值为 1，设为 0 的话不会进行弹性变化，不可为负值。
flex-basis：子元素的基本大小，作为父元素的大小比较基准，预设值为 0，也因为预设值为 0，所以没有设定此属性的时候，会以直接採用 flex-grow 属性，flex-basis 也可以设为 auto，如果设为 auto，就表示子元素以自己的基本大小为单位。。

三个属性可以分开设定，也可以合在一起用一个 flex 统一设定，下面的例子展现出同一个 Flexbox，在不同的宽度，子元素会有不同大小的呈现。

**HTML代码：**

![](http://i2.muimg.com/588926/023cb94babf5d0b1.png)

**CSS代码：**

![](http://i4.buimg.com/588926/8b002874050097f3.png)

![](http://i1.piimg.com/588926/3ebbae5896d5677d.jpg)

如果用动画来表现，可以看出拉长的时候红色会变得比蓝色长，但压缩的时候却是蓝色变得比红色长，如此一来就更能体会 flex 在响应式设计里头的关键脚色萝！

![](http://i4.buimg.com/588926/fb864b2edca41f08.gif)

以上就是 Flexbox 的完整介绍，想不到一个 CSS3 的属性，可以花费这麽大一篇来介绍，不过也因为有了这个新的属性，让在做 layout 的佈局又更加弹性喽！在这里附上一个测试Flexbox的在线网站：

<a href="http://the-echoplex.net/flexyboxes/?fixed-height=on&display=flex&flex-direction=row&flex-wrap=nowrap&justify-content=flex-start&align-items=flex-start&align-content=stretch&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto">flexyboxes在线测试</a>

本文是参考以下<a href="http://www.oxxostudio.tw/articles/201501/css-flexbox.html">这篇文章</a>，如有侵权，我会及时删除，十分感谢!!!

