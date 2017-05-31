---
layout: post
title: "Sublime Text内运行javascript(ES6) "
date: 2016-12-19
categories: 前端
tags: [前端开发，编辑器]
---

Sublime Text内运行javascript(ES6)

![](http://oq2sjn05e.bkt.clouddn.com/2016-12-22-FEW-Sublime%20Text%203%20.jpg)

<!-- more -->

### 前言 

因为一般测试JavaScript代码基本都是在Webstorm中完成的，但是电脑开启了Webstorm相对会卡了一点，所以如果只是为了测试一个小的JavaScript的代码的话，就可以直接在sublime text中直接测试运行就可以了。因为sublime text是一个很便捷的，而且加上相关的插件之后，效率还是挺高的。

### 实现

#### 1、首先安装nodejs

当然你可以使用其它诸如jsc之类的环境来运行js, 本文使用的是nodejs. 首先确保你的电脑已经安装好nodejs, 并已将其添加到环境变量中 (一般安装时自动添加或者询问是否添加)

### 2、添加build system

在sublime text中依次打开Tools -> Build System -> New Build System... 粘贴以下代码后保存(如Node.sublime-build), 然后把Build System设成Automatic

    {
    "cmd": ["node", "--use-strict", "--harmony", "$file"],
    "selector": "source.js"
    }   

### 3、说明

在以上的build文件中(Node.sublime-build), node是执行命令, --harmony和--use-strict是执行参数, $file是当前文件名, 所以一次build操作实际上相当于在命令行中执行了 **node --use-strict --harmony filename. --harmony表示启用ES Harmony features** , 而这些features目前只能在strict模式下运行, 所以需要同时添加use-strict参数(详见what-is-extended-mode).

如果不想启用es6的特性,把build文件更改成以下代码保存即可.

    {
    "cmd": ["node", "$file"],
    "selector": "source.js"
    }

### 4、使用
在sublime test中新建一个test.js文件, 然后输入你的测试代码, 比如:

    for (let i = 0; i < 3; i++) {
    console.log('i:', i);
    }

使用快捷键ctrl + b, 将得到以下执行结果:

![](http://oq2sjn05e.bkt.clouddn.com/2016-12-22-FEW-Sublime%20Text%203%20-1.png)

注: 文件必须是存在于磁盘中的, 而不是untitled的, 否则sublime无法找到相应的文件.


### 5、附加说明

**给Sublime Text 3 安装Package Control**

一个快捷的安装方法是：

1、使用Ctrl+`快捷键或者通过View->Show Console菜单打开命令行，粘贴如下代码：

    import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())  

2、如果顺利的话，此时就可以在Preferences菜单下看到Package Settings和Package Control两个菜单了。

顺便贴下Sublime Text2 的代码：

    import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')  