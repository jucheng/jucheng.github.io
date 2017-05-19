---
layout: post
title: "图文演示连接mongo数据库"
date: 2017-5-19
categories: 前端
tags: [前端开发，Node.js]
---

图文演示连接mongo数据库

<!-- more -->

### 一、前言

这里的测试demo是从github上取过来的，接下来我就展示一系列的mongo数据库的连接的过程。当然，我之前安装过mongodb、node.js、还有mongoDB的可视化工具roboMongo，这里我就不详细说明这些软件的安装过程了，不会的同学可以自行百度或者谷歌吧。

### 二、步骤

#### 1、获取测试项目

	git clone https://github.com/wteam-xq/mongoDemo

#### 2、安装依赖文件
 
    cnpm install

#### 3、启动mongo数据库

##### A、进行mongodb安装目录

**进入 f:\mongodb\bin目录**：执行以下命令

    mongod.exe  -dbpath "F:\MongoDB\data\db"

##### B、测试连接

新开[注意是新开]一个cmd窗口后，再运行以下命令：

    mongo.exe 

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-show%20the%20connection%20to%20the%20mongo%20database-2.png)

如果此时前一个窗口显示：2017-05-19T17:41:17.617+0800 I NETWORK  [thread1] connection accepted from 127.0.0.1:4243 #1 (1 connection now open)，就证明连接成功了：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-show%20the%20connection%20to%20the%20mongo%20database-1.png)

**现在就可以使用mongodb数据库了**

##### C、启动项目

在工程目录下(同 步骤5 )使用以下命令行启动项目：

     npm start

就可以看到命令行中有以下的提示：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-show%20the%20connection%20to%20the%20mongo%20database-3.png)

##### D、浏览器访问项目：

**打开浏览器（建议 chrome）输入： localhost:3000(端口号在 bin/www 文件中可设置)**

然后就可以对数据库的users表 增、删、改、查了！ 

这个是前台的数据显示界面：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-show%20the%20connection%20to%20the%20mongo%20database-4.png)

这个是后台的数据显示界面：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-show%20the%20connection%20to%20the%20mongo%20database-5.png)

##### E 、打开mongoDB的可视化工具roboMongo进行查看数据

###### 1、当然，这里要进行新创建一个连接：注意，这里的端口号选择27017，这个是MongoDB的默认监听端口

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-show%20the%20connection%20to%20the%20mongo%20database-7.png)

###### 2、在这里我添加了两条数据了，所以显示如下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-show%20the%20connection%20to%20the%20mongo%20database-6.png)

##### F、注意的问题是：3000端口会被占用，解决方法如下：

###### 1、查看占用3000端口号的进程ID				   
			
		netstat -o -n -a | findstr :3000

###### 2、进行关闭该进程

		taskkill /F /PID 3044（这里是被查到的进程ID，每次不一样的）






