---
layout: post
title: "Eclipse环境配置"
date: 2015-1-24
categories: java
tags: [Eclipse]
---
安装Eclipse的环境配置

<!-- more -->

#### 1、我们在安装Eclipse的时候，通常会有以下三个环境变量需要配置：这里是已经安装好了的三个环境变量的参数设置：

>1.CLASSPATH:
>
.;%E:\JAVA%\lib;%E:\JAVA%\jre\lib;  

>2.JAVA_HOME:
>
E:\JAVA

>3.Path
>
D:\win64_11gR2_database\database\install\access\jdk\jre\bin;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin

	
#### 2.安装JDK的路径：


>1.
安装完JDK之后，添加CLASSPATH环境变量，该环境变量的值为。；%JAVA_HOME%lib/tools.jar;%JAVA_HOME%/lib/dt.jar。

>2.
为了可以编译和运行Java的程序，还应该在环境变量中增加%JAVA_HOME%bin。其中JAVA_HOME 代表JDK（不是JRE）的安装路径。
