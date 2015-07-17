---
layout: post
title: "Android项目工程目录详解"
date: 2015-7-10
categories: Android
tags: [Android，基础]
---
Android项目工程目录详解

<!-- more -->

1. Src：该目录中存放的是该项目的源代码，这个目录包含了你即将创建的Java源代码文件，这个目录里的文件是根据package结构管理的，它与普通java项目中的/src目录很相似。

2.Gen：自动生成的文件目录。该目录下的文件全部都是ADT自动生成的，一般并不需要去修改，实际上该目录下只定义了一个R.java文件，该文件相当于项目的字典，为项目中用户界面、字符串、图片等资源都会在该类中创建其惟一的ID，当项目中使用这些资源时，会通过该ID得到资源的引用。

3.Android {版本号}：这个目录包含了项目需要的库文件（Jar文件），这和普通Java项目中的/lib目录很相似。同时其中还包含项目打包时需要的META-INF目录.

4.Android Private Libraries： 所有的第三方JAR包引入都被放入了Android Private Libraries中

5.assets：资源路径，不会在R文件注册。该目录用于存放项目相关的资源文件，这个目录和res包含的xml文件差不多，也是应用中引用到的一些外部资源。但主要区别在于这些资源是以原始格式保存，且只能用编程方式读取。例如文本文件，视频文件，MP3音频等媒体文件。

6.bin：编译生成目录。二进制文件，包括class、资源文件、dex、apk等


7.res：该目录用于存放应用程序中经常使用的资源文件，其中包括图片、布局文件以及参数描述文件等，其中包括多个目录

a)其中以drawable开头的三个文件夹用于存储.png、.9.png、.jpg等图片资源（.9.png是Android特有的图片格式，可以根据情况进行拉伸，达到不变形的效果），他们的分变率从高到低，如果你打算在android应用中包含一个图片或者图标，就应该把它们放在这个目录。
b)layout文件夹存放的是应用程序的布局文件，这些layout是以xml形式保存的，关于layout的进一步信息，你可以参考android文档中的UI layout。

c)raw用于存放应用程序所用到的声音等资源。raw中的文件会被映射到R.java文件中，访问的时候直接使用资源ID即R.id.filename；相比较assets文件夹下的文件不会被映射到R.java中，访问的时候需要AssetManager类。

d)values 这个目录也包含了一些xml文件，但主要是应用中要引用的key-value对。这些XML文件声明了数组（Array）、颜色（color）、度量(Dimension)、字符串。之所以把这些东西分别放在单独的xml文件中主要是考虑到这些值能够在不更改源代码的情况下用于多语言环境。例如，根据用户语言的不同应用程序中的信息可以有多种语言版本。

8.AndroidManifest.xml：清单文件 这个XML文件包含了android应用中的元信息，是每个android项目中的重要文件。在软件安装的时候被读取 ，Android中的四大组件（Activity、ContentProvider、BroadcastReceiver、Service）都需要在该文件中，以及运行这个android应用程序需要的用户权限列表，例如：电话、短信、互联网、访问SD卡，同时也详细描述了android应用的项目结构。

9. proguard-project.txt：代码混淆相关文件

10.project.properties：工程属性的配置文件，配置编译的版本等。ADT14 以后， project.properties和default.properties合并成了project.properties。供Eclipse使用，读取该项目使用Android版本号