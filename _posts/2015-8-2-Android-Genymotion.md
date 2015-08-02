---
layout: post
title: "Genymotion的安装出现的问题及其方法"
date: 2015-8-2
categories: Android
tags: [Android，Genymotion]
---
Genymotion的安装出现的问题及其方法

<!-- more -->


因为自己的那部小米手机都差不多已经报废了，USB插口都不知道换了多少次了，最近又坏了，但是又不想用eclispe自带的虚拟机，是在是太慢了，所以，这种情况之下最好就是用传说中的模拟器了：

**Genymotion**

这个模拟器之前用过了，但是当时是在学校用锐捷校园网，但是这个又跟Genymotion的虚拟网络冲突，所以，解决方法挺麻烦的，所以，当时就用了一阵子就没用了，但是现在由于手机坏了，所以，安装Genymotion是必须要做的事情了，但是这个以前看起来似乎没什么难度的事情，最近却让我烦恼了差不多两天的时间了，不过，好在最终也解决了相关的问题，今天特地写了一篇文章，来记录一下相关的错误，以防下次需要的时候可以看到，这样就不必再像今天一样这么麻烦了。

其实安装Genymotion的教程在网上数不胜数，其实现在只要善用百度和谷歌（虽然被封了），很多问题都是可以得到解决的，就练安装Genymotion后出现的问题及其解决方法都一大堆，即便如此，我在安装的过程中出现的那个错误百度了很多，也加了Genymotio的相关QQ群，也进去里边问题相关的问题，但是有大部分人都不会理你，有少部分理你的人，却也说不会，有那么少数的一两个人很热情，却是跟我一样有差不多问题的人，说来说去，还是没能找到相关的解决方法。

所以只好自己再一点一点的摸索，最后发现，自己所谓的问题，其实就就是很简单的一个东西来的，只是当时心烦气躁，没能意识到，现在就接着说一下相关的问题吧。

因为在网上的安装Genymotion和相关的虚拟软件VirtualBox的教程已经很多了，所以在此就不赘述了，我只是简单的说一下自己出现的问题：

给eclispe安装Genymotion插件：

**启动Eclipse，Help->Install New Software...->Add**

填写一下信息：

**Name: Genymobile**

**Location: http://plugins.genymotion.com/eclipse**

那么问题来了，自己在输入以上信息之后没有任何反应：

![](http://img-storage.qiniudn.com/15-8-2/73950250.jpg)

当时以为是那个网站被墙了，访问不了，接下来就是很长时间的百度啊，QQ群问问题啊，谷歌啊，结果好像没能得到什么比较有用的结果，自己离线安装，就是把在genymotion的官网上下载的jar文件放到eclispe的安装目录的plugins里边，重启eclispe，但是好像也并没有什么卵用，重启之后照样是没见Genymotion的那个图标，但是，自己一遍又一遍的尝试，但仍然是以失败告终。

**但是在今天早上，突然间想到可能是因为那个页面下边那些打上的钩钩的问题，所以自己尝试着打钩跟不打勾，看有没有什么区别，这个时候，奇迹就出现了，在我把“Group items by category"这一项的钩钩给去掉之后，就出现了我梦寐以求的东西了：**

![](http://img-storage.qiniudn.com/15-8-2/26651426.jpg)

那个插件竟然出现了，我滴个亲娘啊，竟然是这么小的一个问题，害我搞了差不多两天的时间，我差点就想去翻墙了。

说多了都是泪啊，算了，就接着讲接下来的步骤吧。接下来的步骤就应该是我们所熟悉的网上的那些安装步骤了：

![](http://img-storage.qiniudn.com/15-8-2/89569880.jpg)

接下来就是按照提示一步一步的来：

![](http://img-storage.qiniudn.com/15-8-2/23035526.jpg)

![](http://img-storage.qiniudn.com/15-8-2/54369799.jpg)


果不其然，最后在eclispe菜单栏上终于出现了genymotion的那个图标了：

![](http://img-storage.qiniudn.com/15-8-2/61074143.jpg)

接下来要进入这里边配置genymotion的安装路径了：

![](http://img-storage.qiniudn.com/15-8-2/88249786.jpg)


点击genymobile，进入里边配置安装路径就行了。



###拓展：

1.以后你要想用虚拟设备来运行你的程序的时候，你就需要先启动你的Virtualbox里你想要启动手机设备的：
![](http://img-storage.qiniudn.com/15-8-2/23608573.jpg)

如下，这个是设备已经启动了的显示：
![](http://img-storage.qiniudn.com/15-8-2/58096197.jpg)

2.然后再进入Genymotion里边开启你想要开启的设备：

![](http://img-storage.qiniudn.com/15-8-2/14524289.jpg)

启动速度比Eclipse的AVD速度，简直是快到飞起，但是重点是后边的，后边的程序的执行速度回更加让你吃惊：
![](http://img-storage.qiniudn.com/15-8-2/3840350.jpg)

最后你需要做的就是用eclispe运行你的程序

![](http://img-storage.qiniudn.com/15-8-2/6988759.jpg)


在这里，你就可以看到Genymotion的相关设备了。点击运行，这速度真心时候比Eclipse的执行速度快50倍以上，用过的人才知道，真心不是坑人的，也不枉我花了这么长时间来解决这个问题（虽然说问题很简单呢）。

好了，这个问题就讲这么多了，以后有什么再说吧。





