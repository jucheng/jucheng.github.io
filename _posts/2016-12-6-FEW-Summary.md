---
layout: post
title: "前端一些易错的知识点总结 "
date: 2016-12-6
categories: 前端
tags: [前端开发，面试]
---

前端一些易错的知识点总结

<!-- more -->

### HTML

####  HTML5中新增的语义化元素有哪些？



\* article 定义文章

\* header 页眉

\* footer 页脚

\* nav 定义导航链接

\* section 定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分

#### XHTML与HTML的区别

HTML是一种基于web的网页设计语言，XHTML是一个基于XML的置标语言，类似HTML的XML，是一种过渡技术，对代码的书写要求更为严谨，主要是以下几点：

\* XML要求标签正确嵌套

\* 所有元素必须正确关闭

\* 标签区分大小写

\* 属性值要使用双引号

\* id的属性值去替代name属性值

\* 特殊字符需要进行处理

\* 必须要有根元素


### JavaScript

#### 数组的操作方法有哪些？各自什么作用？

\* join() 数组转字符串，无参数的时候默认以,进行分隔。

\* reverse() 数组颠倒排序

\* sort() 数组排序，默认字母顺序排，自定排序需传入排序函数

\* concat() 数组拼接，可跟多个参数，参数可以数组，也可以是值

\* slice() 返回数组片段

\* splice() 删除数组片段，第一个参数代表起始下标；第二参数代表删除个数，忽略则代表全删；第三、四…………个代表从删除位置开始要插入的内容

\* push() 数组末尾加入指定参数，返回值为数组长度

\* pop() 删除数组末尾元素，返回删除数值

\* unshift() 数组首部加入指定参数，返回数组长度

\* shift() 删除头部元素，返回删除的数值

\* toString() 转字符串，以都,隔开，与无参数的.join()相同

\* toSource() 只有 Gecko 核心的浏览器（比如 Firefox）支持该方法,不明白的同学可以参照一下W3c的说明：

<p><a href="http://www.w3school.com.cn/jsref/jsref_tosource_array.asp">toSource()的用法</a></p>

#### ajax的优缺点

##### 优点：

\* 无刷新页面，给用户体验好

\* 异步与服务器通信，不打断用户操作，具有更迅速的响应能力

\* 前端和后端负载平衡，AJAX可以把以前一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器和带宽的负担，节约空间和宽带租用成本。并且减轻服务器的负担，AJAX的原则是“按需取数据”，可以最大程度的减少冗余请求和响应对服务器造成的负担，提升站点性能。

\* 基于标准被广泛支持

\* 界面与应用分离，Ajax使WEB中的界面与应用分离(也可以说是数据与呈现分离)，有利于分工合作、减少非技术人员对页面的修改造成的WEB应用程序错误、提高效率、也更加适用于现在的发布系统。

##### 缺点：

\* AJAX干掉了Back和History功能，即对浏览器机制的破坏。

\* 存在安全隐患问题，开发者会暴露一定数据和服务器逻辑，还有Ajax也难以避免一些已知的安全弱点，诸如跨站点脚步攻击、SQL注入攻击和基于Credentials的安全漏洞等等

\* SEO不友好

\* 违背URL和资源定位的初衷

\* 编写复杂、容易出错 ；冗余代码比较多

#### ajax工作原理

\* 第一步：创建ajax对象（XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp)）

\* 第二步：判断数据传输方式(GET/POST)

\* 第三步：打开链接 open()

\* 第四步：发送 send()

当ajax对象完成第四步（onreadystatechange）数据接收完成，判断http响应状态（status）200-300之间或者304（缓存）执行回调函数
注意：检测XMLHttpRequest对象的readyState属性，该属性表示请求／响应过程的当前活动阶段，属性值如下：

\* 0：未初始化。尚未调用open()方法

\* 1：启动。已经调用open()方法，但尚未调用send()方法

\* 2：发送。已经调用send()方法，但尚未接收到响应

\* 3：接收。已经接收到部分响应数据

\* 4: 完成。已经接收到全部响应数据，而且已经可以在客户端使用了（如果写原生的js ajax请求需要等到 readyState==4的时候再做处理）其他的js库已经做好处理了

#### 严格模式的优缺点

严格模式————js文件第一行写”use strict”，让js解释器以更严格的方式检查代码

##### 优点：

\* 消除一些语法不合理的地方

\* 提高编译效率和运行速度

\* 为新版本做铺垫

##### 缺点：

\* 如果js文件一部分用，一部分没用，可能导致无效，浪费字节

\* IE6、7、8、9不支持阉割模式

#### DOM操作有哪些？

##### 创建

\* createDocumentFragment() //创建一个DOM片段

\* createElement() //创建一个具体的元素

\* createTextNode() //创建一个文本节点

##### 添加、移除、替换、插入


\*  appendChild()

\*  removeChild()

\* replaceChild()

\* insertBefore() //在已有的子节点前插入一个新的子节点

##### 查找

\* getElementsByTagName() //通过标签名称

\* getElementsByName() //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)

\* getElementById() //通过元素Id，唯一性

#### JS组成

\* 核心（ECMAScript） 描述了该语言的语法和基本对象

\* 文档对象模型(DOM)描述了处理网页内容的方法和接口

\*浏览器对象模型(BOM)描述了与浏览器进行交互的方法和接口

####判断数组

\* arr instanceof Array

\* Array.isArray()

\* arr.constructor == Array

#### JS值类型和引用类型

\* 数字、字符串、布尔都是值类型，存放在栈中

\* 对象、函数、数组等都是引用类型，存放在堆中

Notice:

\* 栈，系统自动分配释放

\* 堆，程序员手动分配释放

#### 变量声明提升

javascript的变量声明具有hoisting机制，JavaScript引擎在执行的时候，会把所有变量的声明都提升到当前作用域的最前面。

优先级顺序：

\* 1、语言内置：所有的作用域中都有 this 和 arguments 关键字

\* 2、形式参数：函数的参数在函数作用域中都是有效的

\* 3、函数声明：形如function foo() {}

\* 4、变量声明：形如var bar;

document load 与 document DOMContentLoaded 区别

#### DOM文档加载步骤：

\* 1、解析HTML结构。

\* 2、加载外部脚本和样式表文件。

\* 3、解析并执行脚本代码。

\* 4、DOM树构建完成。//DOMContentLoaded

\* 5、加载图片等外部文件。

\* 6、页面加载完毕。//load

在第4步，会触发DOMContentLoaded事件。在第6步，触发load事件。

<p><a href="http://www.jianshu.com/p/d851db5f2f30">事件DOMContentLoaded和load的区别</a></p>

### CSS

#### 书写高效CSS

\* 多利用padding、margin、font等缩写属性

\* 颜色进制代码可以用缩写 #fffff可以缩写为#fff

\* css选择器解析式从右向左，注意合理利用选择器

### 其他

#### GET与POST的区别

浅谈HTTP中Get与Post的区别，说的很清楚：

简要总结大概就是：

\* GET请求可以被缓存，POST不能

\* GET请求保留在浏览器的历史记录中,POST不能

\* GET请求有长度限制，POST没有

### 跨域访问

<p><a href="http://blog.csdn.net/joyhen/article/details/21631833">前端解决跨域问题的8种方案（最新最全）</a></p>

### 多域名提供资源

\* CDN缓存更方便

\* 突破浏览器并发限制，一般浏览器每个域名不超过6个

\* 不携带cookie，节省带宽，尤其是上行带宽一般比下行慢

\* 对各种数据类型进行划分存储，通过子域名进行分流，提高网页加载速度

###本文转自

<p><a href="http://blog.shanamaid.top/2016/11/25/web%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%97%AE%E9%A2%98%E6%80%BB%E7%BB%93/">ShanaKnights的博客</a> 在此致谢！！！</p>