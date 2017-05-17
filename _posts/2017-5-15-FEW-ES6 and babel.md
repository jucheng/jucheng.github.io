---
layout: post
title: "ES6 & babel开发实践"
date: 2017-5-15
categories: 前端
tags: [前端开发，JavaScript]
---

ES6 & babel 实战

<!-- more -->


### 一、前言

之前我就总结过一篇有关于babel转换ES6代码为ES5代码的文章，但是最近一篇比较好的文章，本来想在上一篇文章的基础上更改的，但是发现原来的那篇文章太长了，所以，就另起一篇文章总结一下了。


### 二、配置 babel 编译环境

由于有了之前的文章的奠定基础了 ，我也就不再啰嗦了，就直接进入主题分析了。

#### 1、安装 babel

目前最新版的 Node.js（v5.1.0）还未完全支持 ES2015 的新语法特性，而且我们编写的模块可能要在 Node v0.12.x 或更低版本下运行，因此**需要借助 babel 将 ES2015 标准的 JavaScript 程序转换成 ES5 标准的。**

执行以下命令安装 babel：

**$ cnpm i -g babel-cli**

(当然，我是装了cnpm才这样安装的，如果没有装了同学，可以直接采用npm的方式安装就可以了。）

安装完成后，系统将获得以下两个命令：

+ **babel 编译器**
+ **babel-node 可以直接运行 ES2015 程序的 Node 命令**

#### 2、初始化测试项目

初始化过程就不写了，就是npm init ,我们新建一个测试文件test.js，写下测试代码：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-15-FEW-ES6%20and%20babel-1.png)

##### A、运行程序

执行运行的命令：

    $ babel-node test.js

这时候会报错：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-15-FEW-ES6%20and%20babel-2.png)

由提示信息可判断出，**应该是不支持async function导致的，因为这是 ES7 标准中定义的新语法，需要配置相应的 babel 插件才能支持它**。

##### B、新建一个后缀为.babelrc的文件：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-15-FEW-ES6%20and%20babel-3.png)

**.babelrc为 babel 的配置文件，保存在项目的根目录下，其中presets用于设置开启的语法特性集合**，详细内容可以到官网看一下：

+ <a href="https://babeljs.io/docs/usage/babelrc/">babelrc文档</a>
+ <a href="http://babeljs.io/docs/plugins/#presets">presets文档</a>

##### C 、我们还需要安装插件依赖的模块，执行以下命令安装并保存到package.json的devDependencies中：

    $ cnpm i babel-preset-es2015 babel-preset-stage-0 --save-dev

##### D 、现在我们再次执行一次代码，就可以看到控制台每隔 500ms 打印出一行，直到输出done时结束：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-15-FEW-ES6%20and%20babel-4.png)

#### 3、编译程序

当然，上述的那个执行结果，我们是在node.js和babelde的环境下运行的，所以，我们在发布项目时，要求可以在不依赖 babel 编译器的环境下运行，因此我们需要将 ES2015 的程序编译成 ES5 的：

     $ babel test.js --out-file test.compiled.js

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-15-FEW-ES6%20and%20babel-5.png)

接下来，我们执行一下这个test.compiled.js，看一下执行结果如何：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-15-FEW-ES6%20and%20babel-6.png)

**经阅读官方文档可知，编译后的 JavaScript 程序有时候需要依赖一些运行时polyfill，通过安装babel-polyfill模块来获得**：

     $ cnpm i babel-polyfill --save

接着，我们需要做的是，在test.compiled.js文件中的首行中添加一句代码：

     require('babel-polyfill');

再次执行test.compiled.js便可看到与$ babel-node test.js一样的结果。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-15-FEW-ES6%20and%20babel-7.png)

polyfill的详细介绍可参考<a href="http://babeljs.io/docs/usage/polyfill/">官方文档</a>

至此，我们已经配置了一个能使用 ES2015 语法的 Node.js 运行环境了。

#### 4、重要提示

在一个 Node.js 进程中只能载入一个版本的babel-polyfill，**不同的模块所require('babel-polyfill')很可能不是同一个版本，此时进程会抛出一个异常并退出**。

所以一般建议在打包的 NPM 模块中不要有require('babel-polyfill')，而是要求在使用该模块的最终项目自行编写require('babel-polyfill')，这样可以保证一个进程中只会有一个babel-polyfill版本。



本文参考以下文章：

<a href="http://morning.work/page/2015-11/es6-es7-develop-npm-module-using-babel.html">ES2015 & babel 实战：开发 NPM 模块</a>

拓展阅读：

<a href="http://gank.io/post/564151c1f1df1210001c9161">给 JavaScript 初学者的 ES2015 实战</a>