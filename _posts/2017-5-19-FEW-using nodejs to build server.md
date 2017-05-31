---
layout: post
title: "利用NodeJs搭建本地服务器"
date: 2017-5-19
categories: 前端
tags: [前端开发，Node.js]
---

利用NodeJs搭建本地服务器

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-using%20nodejs%20to%20build%20server.jpeg)

<!-- more -->

### 一、前言

在项目开发过程中，有没有遇到过有过以下场景：

一般是前端先制作静态页面，同时服务器端创建数据库，搭服务器端架构，写接口；

当接口写完之后，前端或者后端才能嵌套页面。

**如果前端页面制作好了，后端接口还没有写好呢？或者如何让前端、后端各自做各自的事情，互相不影响？**

以下这些算是一种解决方法：

#### A、第一步
——在进行完需求分析和详细设计后，前端、后端一同商量、制作出一份接口文档（其中接口名、参数、返回值名称、返回值类型都定义好）

#### B、第二步
前端页面制作好之后，直接模拟出该接口的json文件，先去请求该文件，把页面绑定、业务逻辑都处理好。

#### C、第三步
等前端全部绑定好，同时后端接口写好后，我们只需要前端修改接口地址，其他不用做任何修改。这样，是不是前端不用等后端接口全部写完才能开始剩下的工作。

### 二、创建项目

#### 1、利用Express创建项目

过程很简单，就不详细说了。不过这里我是通过通过应用生成器工具 express 可以快速创建一个应用的骨架。以下是相关步骤：

    $ express myapp

    $ cnpm install express-generator -g

    $ cd myapp 

    $ cnpm install
     
    $ npm start

通过 Express 应用生成器创建的应用一般都有如下目录结构：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-using%20nodejs%20to%20build%20server-1.png)

在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了,当然，我这里是修改了一下的。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-using%20nodejs%20to%20build%20server-2.png)
   
#### 2、访问静态的html页面

##### A、第一步

我们可以在app.js文件中看到以下语句，当然，有的话，则直接看下一步，没有就在app.js中添加这句话，记得添加后重启服务：

     app.use(express.static(path.join(__dirname, 'public')));

##### B、第二步

在项目的public文件夹下，新建一个html文件下（便于后期管理所有的静态页面），然后新建index.html：

	<!DOCTYPE html>
    <html lang="en">
	<head>
	<meta charset="UTF-8">
		<title>I am coming</title>
	</head>
	<body>
		Hello,ChenJC,I am here,I am coming!!!
	<img src="../images/Kobe.jpg" alt="Kobe" style="height: 400px;width: 400px;">
	<script src="../javascripts/index.js"></script>
	</body>
	</html>

在浏览器中输入下面的地址，就可以文档效果了，虽然很简单，测试嘛：

    http://localhost:3000/html/index.html

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-using%20nodejs%20to%20build%20server-3.png)

#### 3、模拟ajax请求

我们现在做到了能访问一个html文件，那我们如何模拟ajax请求，读取json文件中的内容，提前绑定页面呢？（不依赖后端接口写好）

##### A、创建文件

+ **创建json文件夹及其对应的index.json文件**
+ **在javascripts文件夹下新建index.js**
+ **然后在index.html文件中导入index.js文件**

 **index.json文件**

	{
		"code":"200",
		"msg":"success"
	}

 **index.js文件**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-using%20nodejs%20to%20build%20server-4.png)


 **index.html文件**

	<!DOCTYPE html>
    <html lang="en">
	<head>
	<meta charset="UTF-8">
		<title>I am coming</title>
	</head>
	<body>
		Hello,ChenJC,I am here,I am coming!!!
	<img src="../images/Kobe.jpg" alt="Kobe" style="height: 400px;width: 400px;">
	<script src="../javascripts/index.js"></script>
	</body>
	</html>

最后再打开访问 http://localhost:3000/html/index.html,可以看到以下的结果：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-using%20nodejs%20to%20build%20server-5.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-19-FEW-using%20nodejs%20to%20build%20server-6.png)

**快动手尝试一下吧，以后前端开发再也不用等服务器端框架搭好，接口写好了。**

参考文章：

<a href="http://www.jianshu.com/p/80307e1a86ff">NodeJs本地搭建服务器，模拟接口请求，获取json数据</a>

<a href="http://www.expressjs.com.cn/">Express中文官网</a>