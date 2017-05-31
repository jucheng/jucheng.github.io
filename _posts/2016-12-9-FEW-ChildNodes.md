---
layout: post
title: "深入理解JavaScript中的childNodes的length的计算 "
date: 2016-12-9
categories: 前端
tags: [前端开发，JavaScript]
---

深入理解JavaScript中的childNodes的length的计算

![](http://oq2sjn05e.bkt.clouddn.com/2016-12-9-FEW-ChildNodes.jpg)

<!-- more -->

最近也在写代码的时候遇到一个问题，就是关于JS中的childNodes的length计算，本来觉得这个可能也就是一个单纯目测计算的问题，但是后来发现了错误之后，查了一下资料，发现是自己想太多了，z毕竟我们是程序猿，代码是最好的解决方法的展示，这里我就借鉴文章作者的代码了：

>故障原因： 不同浏览器中childNodes获取的子节点个数是不同。 以一段简单的HTML代码为例：

    <div id="div">
    <div id="div1">节点1</div>
    <div id="div2">节点2</div>
    </div>
    var node = document.getElementById("div").childNodes; //获取div节点下的所有的子节点
    alert(node.length);

>如果你用的浏览器是IE，而且IE<9，那得到的值为2 

>如果你用的浏览器是谷歌，FF，IE>=9，那得到的值为5  

造成这种差异的原因是IE（IE<9）和其他浏览器处理空白文本节点的机制不一样 FF，谷歌，IE>=9浏览器会将各个节点之间的空白也算作一个节点，也就是说最外层div和div1之间存在一个空白节点，但是IE（IE<9）不会。

**解决办法1：改变源码的书写格式，即节点间不留空格和换行**
	
    <div id="div"><div id="div1">节点1</div><div id="div2">节点2</div></div>

 **解决办法2：调用childNodes属性之前先将空格删除**

    for(vari = 0; i < node.length; i++) {
     //如果是文本节点，并且值为空，则删除该节点
    if(node[i].nodeType == 3 && /\s/.test(node[i].nodeValue)) {
      node[i].parentNode.removeChild(node[i]);       
    }
    }
    alert(node.length);