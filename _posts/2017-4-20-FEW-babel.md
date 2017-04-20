---
layout: post
title: "利用babel将es6转换成es5 "
date: 2017-4-20
categories: 前端
tags: [前端开发，JavaScript]
---

利用babel将es6转换成es5

<!-- more -->

### 一、前言

**因为经常性的在 Node.js 里面写 import xxx from 'xxx'; 然后被 Node.js 的解析器无情的拒绝。**

比如以下的这个小例子：写了两个文件，一个是导入的测试文件test.js,一个是导出用的tester.js的文件，那么在正常的导入导出之后，我们运行程序会出现如下的结果：

![](http://i1.piimg.com/567571/8ded22fab6cb02eb.png)

### 二、实践第一步

#### 1、导入文件，也就是import的转换

A、转化前：

![](http://i1.piimg.com/567571/6d2d4eb481fcb6f8.png)

B、转换后：

![](http://i2.muimg.com/567571/b55ab823e6517307.png)

#### 2、导出文件，也就是export的转换

A、转换前：

![](http://i4.buimg.com/567571/82f0ec039b9e4bb8.png)

B、转换后：

![](http://i2.muimg.com/567571/2acfb46a137dcdec.png)

#### 3、我们把转换后的代码写进文件，运行正确：

![](http://i2.muimg.com/567571/c3cb32b55eed678f.png)


### 三、实践第二步

babel 6与之前版本的区别：

之前版本只要安装一个babel就可以用了，所以之前的版本包含了一大堆的东西，这也导致了下载一堆不必要的东西。

**但在babel 6中，将babel拆分成两个包：babel-cli和babel-core。**

#### 1、如果你想要在CLI(终端或REPL)使用babel就下载babel-cli；

#### 2、如果想要在node中使用就下载babel-core。

babel 6已结尽可能的模块化了，如果还用babel 6之前的方法转换ES6，它会原样输出，并不会转化，因为需要安装插件。

如果你想使用箭头函数，那就得安装箭头函数插件npm install  babel-plugin-transform-es2015-arrow-functions。

![](http://i2.muimg.com/567571/c11ad8b8dd73d895.png)

#### 1、配置.balbelrc文件

Babel的配置文件是.babelrc，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。该文件用来设置转码规则和插件，基本格式如下:

     {
       "presets": [],
       "plugins": []
     }

presets字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

![](http://i2.muimg.com/567571/ff46f4eb2a1a3010.png)

然后，将这些规则加入.babelrc，以下的规则是我在这个测试文件利用到的。

     {
       "presets": [
       "es2015",
        ],
      "plugins": []
     }

**注意：这块中，用到哪个添加哪个，如果添加了如：’react‘而未做相关设置，babel将不能识别切不能正常编译。**

**注意，以下所有Babel工具和模块的使用，都必须先写好.babelrc。**

#### 2、命令行转码babel-cli

![](http://i4.buimg.com/567571/22d6e32851d6aa5d.png)

上面代码是在全局环境下，进行Babel转码。这意味着，如果项目要运行，全局环境必须有Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel。

一个解决办法是将babel-cli安装在项目之中。

     $ npm install --save-dev babel-cli

然后，改写package.json：

![](http://i2.muimg.com/567571/8a6b4c7a63eae6f2.png)

当然，这里，我们就只是需要配置下边的内容，执行了上面的install后会自动在devDependencies中加入了：

     "scripts": {
           "build": "babel src -d lib"
      },


####3、见证奇迹的时刻，运行程序

最后，转码的时候，就执行下面的命令。

      $ npm run build

执行过程如下：

![](http://i4.buimg.com/567571/dff7ca3ad0952298.png)

执行结果如下：

![](http://i4.buimg.com/567571/60f73f7ffb9baf5d.png)

![](http://i2.muimg.com/567571/9e9a28b45db1f09a.png)

![](http://i1.piimg.com/567571/c32936a0eeaad254.png)

![](http://i1.piimg.com/567571/3d2c63e2139ed9c2.png)

我们可以很清楚的看到，执行结果之后，babel会从我们的src的文件读取两个js文件，然后转码成功，存储到我们之前所定的lib的文件夹里边，我们再在lib文件夹下运行一下test.js文件，Ctrl+B，丫丫，可以很清楚地看到我们想要的结果啦。

#### 4、彩蛋：

有一点，不知道大家有无注意到，我在src文件夹中的两个JS文件都没有加上'use strict',但是在转码后，会自动在文件首部帮我们加上了这个ES6专有的标志。

![](http://i1.piimg.com/567571/5534d63a782fc1ad.png)

![](http://i1.piimg.com/567571/a3c763e456211f77.png)