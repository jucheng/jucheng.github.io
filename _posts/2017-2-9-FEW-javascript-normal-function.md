---
layout: post
title: "javascript中相应的方法练习代码 "
date: 2017-2-9
categories: 前端
tags: [前端开发，JavaScript]
---

javascript中相应的方法练习代码

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function.jpg)

<!-- more -->

### 前言

今天在复习javascript的时候，看了js的文档，感觉有些方法看起来简单，但是实际用的时候又想不到，所以，在这里，结合测试代码和说明，进行一个总结和记录。

### 1、getDate() 方法 

获取当前日期：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-1.png)

### 2、charAt(index)方法

charAt 方法返回一个字符值，该字符位于指定索引位置。字符串中的第一个字符的索引为 0，第二个的索引为 1，等等。超出有效范围的索引值返回 undefined。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-2.png)

### 3、random()方法和floor()方法

random()方法 可返回介于 0 ~ 1 之间的一个随机数。

floor()方法  返回小于等于其数字参数的最大整数。 


![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-3.png)

### 4、indexOf（） 方法 

返回 String 对象内第一次出现子字符串的字符位置。 

indexOf 方法返回一个整数值，指出 String 对象内子字符串的开始位置。如果没有找到子字符串，则返回 -1。 

如果 startindex 是负数，则 startindex 被当作零。如果它比最大的字符位置索引还大，则它被当作最大的可能索引。 

从左向右执行查找。否则，该方法与 lastIndexOf 相同。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-4.png)

### 5、Math.max()和Math.min()方法

Math.max(number1, number2) 返回给出的两个数值表达式中较大者。 

Math.min(number1, number2) 返回给出的两个数值表达式中较小者。 

### 6、parseFloat（）和parseInt（） 方法

返回由字符串转换得到的浮点数。 

parseFloat 方法返回与 numstring 中保存的数相等的数字表示。如果 numstring 的前缀不能解释为浮点数，则返回 NaN （而不是数字）。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-5.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-6.png)

### 7、reverse（） 方法 

返回一个元素顺序被反转的 Array 对象。 

reverse 方法将一个 Array 对象中的元素位置进行反转。在执行过程中，这个方法并不会创建一个新的 Array 对象。 

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-7.png)

### 8、pop() 方法

删除并返回数组的最后一个元素

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-8.png)

### 9、concat() 方法

concat() 方法用于连接两个或多个数组。

该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-9.png)

### 10、join( )  方法 

返回一个 String 对象，这个字符串对象是由整个数组的所有元素连接在一起而形成的。

arrayobj.join(separator) 

其中 separator 参数是一个 String 对象，它被用来在最终的 String 对象中对数组元素之间的分隔符。如果省略了这个参数，那么数组元素之间就用一个空字符串来分隔。


![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-10.png)

### 11、push() 方法

push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。

push() 方法可把它的参数顺序添加到 arrayObject 的尾部。它直接修改 arrayObject，而不是创建一个新的数组。push() 方法和 pop() 方法使用数组提供的先进后出栈的功能。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-11.png)

### 12、shift() 方法

shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。

返回值：

数组原来的第一个元素的值。

说明：

如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值。请注意，该方法不创建新数组，而是直接修改原有的 arrayObject。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-12.png)

### 13、slice() 方法

slice() 方法可从已有的数组中返回选定的元素。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-13.png)

A、一个参数

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-14.png)

B、两个参数

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-15.png)

### 14、splice() 方法

splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

注释：该方法会改变原始数组。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-16.png)

测试代码：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-17.png)

### 15、sort() 方法

sort() 方法用于对数组的元素进行排序。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-18.png)

A、测试代码：字母类型

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-19.png)

B、测试代码2：数字类型（未按照数字大小顺序排序）

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-20.png)

C、测试代码3：数字类型（按照数字大小顺序排序）

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-21.png)

### 16、unshift() 方法

unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-22.png)

测试代码：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-23.png)

### 17、toString() 方法

toString() 方法可把数组转换为字符串，并返回结果。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-24.png)

测试代码：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-23-25.png)

### 18、split() 方法

split() 方法用于把一个字符串分割成字符串数组。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-26.png)

A、分割简单的字符串：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-27.png)

B、分割结构更为复杂的字符串：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-28.png)

C、分割单词为字符：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-29.png)

D、若只需要返回一部分字符，请使用 howmany 参数：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-30.png)

### 19、substring() 方法

substring() 方法用于提取字符串中介于两个指定下标之间的字符。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-31.png)

测试代码：

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-32.png)

### 20、decodeURI() 函数 和encodeURI() 函数

decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。

encodeURI() 函数可把字符串作为 URI 进行编码。

测试代码：**明白了一般网址栏里会出现%20的原因了吧**

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-33.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-34.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-35.png)

### 21、isNaN() 函数

isNaN() 函数用于检查其参数是否是非数字值。

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-36.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-2-9-FEW-javascript-normal-function-37.png)

### 22、setInterval() 方法和setTimeout() 方法

setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。

setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。

setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式，可以用clearTimeout()关闭窗口

    <html>
    <body>

    <input type="text" id="clock" size="35" />
    <script language=javascript>
    var int=self.setInterval("clock()",50)
    function clock()
    {
    var t=new Date()
    document.getElementById("clock").value=t
    }
    </script>
    </form>
    <button onclick="int=window.clearInterval(int)">
    Stop interval</button>

    </body>
    </html>
