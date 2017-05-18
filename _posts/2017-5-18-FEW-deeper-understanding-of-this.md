---
layout: post
title: "深入理解js中的this关键字"
date: 2017-5-18
categories: 前端
tags: [前端开发，JavaScript]
---

深入理解js中的this关键字

<!-- more -->

### 一、前言

其实我之前已经写过一篇关于js中的this的关键的解析了，不过那篇文章是从this 出现的四类场景来分别做解析的。

我本来以为那样理解this就已经差不多了，但是直到前天我看到一篇关于this的文章，它主要是从"显式绑定"和“隐式绑定”两个角度来解析this这个关键字的，我觉得总结得很到位，在这里，我也就用那位博主的思想的再次梳理一下对关键字this的理解。


### 二、隐式绑定

#### A 、被调用者为方法时，侧重谁是调用者

一般我们都会说，谁调用了方法（注意是“方法”），该方法的this关键字就指向谁。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-1.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-3.png)

#### B 、存在多次调用的关系，侧重最后一层

如果存在多次调用，对象属性引用链只有上一层或者说最后一层在调用位置中起作用

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-2.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-3.png)


### 三、隐式丢失

#### A、被隐式绑定的函数

一个最常见的this绑定的问题就是，被隐式绑定的的函数（这里指的是“函数”，而不是方法，注意区别）,也就是说会采用默认的绑定，从而把this绑定到全局对象或者undefinded上，这个是取决于是否是严格模式，如果是严格模式，那就是undefinded，否则就是绑定到全局对象上。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-4.png)

这里虽然get只是Person1.getMessage的一个引用，但是实际上，它引用的是getMassage函数的本身，因此此时的get（）其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

#### B 、发生在传入回调函数时

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-5.png)

其实参数传递就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样，如果把函数传入语言内置的函数，而不是传入自己声明的函数（如setTimeout等），结果也是一样的。


### 四、显式绑定

更简单一点的说法就是，所谓的显式绑定值的就是指定this，如call,apply,bind,new绑定等。

#### A、硬绑定

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-6.png)

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-7.png)

这里对以上代码进行说明一下，在getAge（）函数中，getMessage使用apply函数绑定了Person1，也就是说getMessage（）中的this将指向Person1，与此同时，使用arguments（不限制传入参数的数量）作为参数传入getMessage函数中；

所以在运行getAge（23）的时候，首先输出Person1.name也就是'cjc'和传入的23，然后getMessage返回了两者的相加值（这里为了美观，我加了一些空格），所以P1的结果为“cjc is 23 years old"。


当然，以上的例子既然可以用apply,也可以用bind：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-8.png)


#### B 、new绑定

在传统面向类的语言中，使用new初始化类的时候会调用类中的构造函数，但是JS中new的机制实际上和面向类和语言完全不同。

使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

- **创建（或者说构造）一个全新的对象**
- **这个新对象会被执行[[Prototype]]连接**
- **这个新对象会绑定到函数调用的this**
- **如果函数没有返回其他对象，那么new表达式中的函数会自动返回这个新对象**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-9.png)

使用new来调用getMessage(...)的时候，我们会构造一个新对象并把它绑定到getMessage(...)调用中的this上。

**new是最后一种可以影响函数调用时this绑定行为的方法，我们称之为new绑定。**

### 五、this的优先级

首先，不用做测试，我们可以知道在这当中，**默认绑定的优先级是四条规则中最低的，所以我们可以先不考虑它。**

#### A、隐式绑定和显式绑定的优先级比较

隐式绑定和显式绑定哪个优先级更高？我们来测试一下：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-10.png)

从以上的例子，我们可以很清楚地看到，是**显式绑定的优先级更高一些**，也就是说在判断时应当先考虑是否可以存在显式绑定。

#### B、new绑定和隐式绑定的优先级比较

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-11.png)

从以上的例子，我们可以很清楚地看到，**new绑定比隐式绑定优先级高**。

#### C 、new绑定和显式绑定谁的优先级比较

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-12.png)

可以看到，**new绑定修改了硬绑定中的this，所以new绑定的优先级比显式绑定更高**。

之所以要在new中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用new进行初始化时就可以只传入其余的参数。

**bind(...)的功能之一就是可以把除了第一个参数（第一个参数用于绑定this）之外的其他参数都传给下层的函数（这种技术称为“部分应用”，是“柯里化”的一种）**。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-13.png)

**这里我们之所以采用了null，原因是在我们的这个例子中，我们并不关心硬绑定的this是什么，因为它都会在使用new的时候被修改。**

### 六、this 在箭头函数中的应用

**箭头函数不使用this的四种标准规则，而是根据外层（函数或者全局）作用域来决定this。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-18-FEW-deeper-understanding-of-this-14.png)

getName()内部创建的箭头函数会捕获调用时getName()的this。由于getName()的this绑定到Person1，Person3（引用箭头函数）的this也会绑定到Person1，箭头函数的绑定无法被修改。（new也不行!）

### 七、总结

**如果要判断一个运行中的函数的this绑定，就需要找到这个函数的直接调用位置**。找到之后就可以顺序应用下面这四条规则来判断this的绑定对象。

+ **由new调用？绑定到新创建的对象。**
+ **由call或者apply（或者bind）调用？绑定到指定的对象。**
+ **由上下文对象调用？绑定到那个上下文对象。**
+ **默认：在严格模式下绑定到undefined，否则绑定到全局对象。**

本文参考自<a href="https://my.oschina.net/keysITer/blog/901601">This其实不难，通过实例全面解析JS中的This</a>这篇文章，十分感谢作者！！！