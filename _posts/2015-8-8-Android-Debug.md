---
layout: post
title: "Eclipse连接MySQL时的错误"
date: 2015-8-8
categories: Android
tags: [Android,调试]
---
Eclipse连接MySQL时的错误

<!-- more -->



在用Eclipse连接Mysql的时候，主要出现了以下的几个错误：

###1.在程序写完之后，发现程序里边出现以下的错误：

![](http://img-storage.qiniudn.com/15-8-8/71838974.jpg)

提示就是以下的这个，查了一下，原来是一开始我直接导包的时候导入另外一个很相似的包了：

**出错前：**

![](http://img-storage.qiniudn.com/15-8-8/4466070.jpg)

**出错后：**

![](http://img-storage.qiniudn.com/15-8-8/22216755.jpg)

区别就是：

**出错前的导入的包是：import com.mysql.jdbc.Statement；**

**改正之后的导入的包是：import java.sql.Statement;**
![](http://img-storage.qiniudn.com/15-8-8/79417363.jpg)


###2.在eclipse中运行工程时 出现(ConnectionProperties) (PropertyCategory name="Connection/Authentication")的解决方法

![](http://img-storage.qiniudn.com/15-8-8/51626921.jpg)

**解决方法：1.对着工程点击右键，选择Run As->Java Application**

就会出现以下图：
![](http://img-storage.qiniudn.com/15-8-8/15025619.jpg)

**选择自己写的工程的main函数就可以了 我的 是 MysqlDemo，再运行就可以了**


###3.在运行程序之后发现读取不了数据库中的数据：

![](http://img-storage.qiniudn.com/15-8-8/91438285.jpg)

根据提示，原来是表名写错了，回到程序中看，果不其然：

![](http://img-storage.qiniudn.com/15-8-8/91012113.jpg)

原本表名是user,却被我写成了uesr，这种错误我老是犯，记住，一定要改正，要是每次都这样，到头来可能会给真正的开发中带来不可估量的后果。