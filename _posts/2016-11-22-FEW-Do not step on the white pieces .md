---
layout: post
title: "网页版 别踩白块 "
date: 2016-11-22
categories: 前端
tags: [前端开发，项目]
---

网页版 别踩白块

<!-- more -->

###1、思路分析###

我一般写 js 小游戏的思路是，先用 HTML 和 css 在游览器中将自己想要的静态效果写出来，然后再考虑如何用js来控制页面中各个元素的变化实现动态的游戏效果。所以参照手机APP版“别踩白块”，可以用通过HTML和css代码实现相似的静态效果。

###2、HTML + css部分###

可以用 div+css 布局来实现别踩白块的静态效果展示，直接上 HTML 代码，我来简要说下 HTML 思路，将主界面分解成一个4x4的大矩形格子，每一个方块代表其中一个小的矩形格，其中每一行的四个白块中有一个黑块，每一行中黑块位于那一列是随机生成的，但是我们这里现在是静态页面就自己确定了，然后通过 css 控制样式。

     <div id="main">
        <div id="con">
            <div class="row">
                <div class="cell"></div>/*白块*/
                <div class="cell black"></div>/*黑块*/
                <div class="cell"></div>
                <div class="cell"></div>
            </div>
            <div class="row">
                <div class="cell"></div>
                <div class="cell black"></div>
                <div class="cell"></div>
                <div class="cell"></div>
            </div>
            <div class="row">
                <div class="cell"></div>
                <div class="cell"></div>
                <div class="cell black"></div>
                <div class="cell"></div>
            </div>
            <div class="row">
                <div class="cell black"></div>
                <div class="cell"></div>
                <div class="cell"></div>
                <div class="cell"></div>
            </div>
        </div>
    </div>

下面是css代码，这里有一个要注意的地方，我将 div#con 块级元素向上提了 100 px，这样在游戏的开始就出现了最底一行的空白，隐藏最上面那行，为什么要这样呢，继续往下看就知道了。

    #main {
        width: 400px;
        height: 400px;
        background: white;
        border: 2px solid gray;
        margin: 0 auto;
        overflow: hidden;
    }

    #con {
        width: 100%;
        height: 400px;
        position: relative;
        top: -100px; /*隐藏最上层的那行*/
        border-collapse:collapse;
    }

    .row{
        height: 100px;
        width: 100%;
    }

    .cell{
        height: 100px;
        width: 100px;
        float: left;
    }

    .black {
        background: black;
    }

如果以上部分你都能够理解并且对应着代码实现的话，那么你现在应该会出现这样的效果。是不是很像别踩白块的界面了呢，我们已经成功了一大步，然后就是通过 js 来实现别踩白块的一些事件以及响应啦。

![](http://obzqtmk2d.bkt.clouddn.com/userid50185labid945time1430279605215.png)

###3.JavaScript部分 ###

在开始 js 编程之前，让我们先来分析下整个游戏的流程：在普通游戏玩家眼中，应该是游戏开始，黑块以一定的速度下移，点击黑块，黑块消失，新的黑块不断向下移动，若黑块触底则游戏结束；

而以开发者来说，应将每一个黑块和白块抽象成一个个的数据结构，黑块的消失和出现其实就是数据结构的创造和销毁，我们来看一张游戏的流程图，对于要编写的js功能有一个大概的了解:

![](http://obzqtmk2d.bkt.clouddn.com/%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

#####3.1 游戏初始化####

根据前面的 HTML 部分我们可以知道，每个 div class="cell" 就代表一个白块，div class="cell black" 就代表一个黑块，每点击一个黑块消失其实是删除了一个 div class="row" 然后从上面添加一个新的 div class="row" 所以我们首先要通过 js 来控制 div class="row" 的创造和生成（记得删除在编写静态页面时候指定生成的4个 div.row）。具体方法如下：

    //创建div, 参数className是其类名
    function creatediv(className){
        var div = document.createElement('div');
        div.className = className;
        return div;
    }


    // 创造一个<div class="row">并且有四个子节点<div class="cell">
    function createrow(){
        var con = $('con');
        var row = creatediv('row'); //创建div className=row
        var arr = creatcell(); //定义div cell的类名,其中一个为cell black

        con.appendChild(row); // 添加row为con的子节点

        for(var i = 0; i < 4; i++){
            row.appendChild(creatediv(arr[i])); //添加row的子节点 cell
        }

        if(con.firstChild == null){
            con.appendChild(row);
        }else{
            con.insertBefore(row, con.firstChild);
        }
    }

    //删除div#con的子节点中最后那个<div class="row">    
    function delrow(){
            var con = $('con');
            if(con.childNodes.length == 6) {
                   con.removeChild(con.lastChild);
               }
        }    

    //创建一个类名的数组，其中一个为cell black, 其余为cell
    function creatcell(){
        var temp = ['cell', 'cell', 'cell', 'cell',];
        var i = Math.floor(Math.random()*4);//随机生成黑块的位置
        temp[i] = 'cell black';
        return temp;
    }

####3.2 让黑块动起来####

在可以通过 js 来创造和销毁 div 后，我们就要让黑块动起来，这个时候我们就用到了之前css提到的设定 div id="con" 隐藏了一行的  div id="row" ，我们通过 js 的 DOM 操作使其向下方移动，并设置定时器每30毫秒移动一次，这样就实现了黑块的平滑移动，在黑块移动的同时，我们要判断黑块是否已经触底，触底则游戏失败，停止调用 move()，触底后调用函数 fail() 游戏失败，具体方法如下:

    //使黑块向下移动    
    function move(){
        var con = $('con');
        var top = parseInt(window.getComputedStyle(con, null)['top']);

        if(speed + top > 0){
            top = 0;
        }else{
            top += speed;
        }            
        con.style.top = top + 'px';

        if(top == 0){
            createrow();
            con.style.top = '-100px';
            delrow();
        }else if(top == (-100 + speed)){
            var rows = con.childNodes;
            if((rows.length == 5) && (rows[rows.length-1].pass !== 1) ){
                fail();
            }
        }
    }

    function fail(){
            clearInterval(clock);
            confirm('你的最终得分为 ' + parseInt($('score').innerHTML) );
        }
![](http://obzqtmk2d.bkt.clouddn.com/userid50185labid945time1430814047634.png)

####3.3 判断是否点击到黑块####

让黑块动起来之后呢，我们就来考虑怎么判断用户有没有点击到黑块呢，同时用户若点击到黑块我们要让所在那一行消失，那么我们需要一个 judge 方法，具体如下:

    //判断用户是否点击到了黑块，
    function judge(ev){
    if(ev.target.className.indexOf('black') == -1){
        pass;
    }else{
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
        score();
    }
    }

其实程序写到这里，几个核心的功能点都已经实现了，是不是感觉很简单呢，剩下来的就是将这些方法组合起来，组成完整的逻辑关系，在我给出的源码里有添加一个记分器记录用户分数的功能，同时设置加速方法，使黑块的移动越来越快等等，有兴趣的的同学可以尝试着添加事件按钮，使这个游戏更接近 APP 版本。

![](http://obzqtmk2d.bkt.clouddn.com/userid50185labid945time1430813599037.png)

