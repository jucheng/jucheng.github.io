---
layout: post
title: "JavaScript创建对象方法一览"
date: 2017-5-26
categories: 前端
tags: [前端开发，JavaScript]
---

JavaScript创建对象方法一览

<!-- more -->


### 一、前言

今天在重温高程的创建对象的这一章，书中一共提到了八种创建对象的方式它们分别是：

+ 通过字面量或Object构造函数创建
+ 工厂模式
+ 构造函数模式
+ 原型模式
+ 构造函数和原型组合模式
+ 动态原型模式
+ 寄生构造模式
+ 稳妥构造模式

### 二、通过字面量或Object构造函数创建

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-1.png)

#### 1、优点：

简单灵活

#### 2、缺点

1）**无法识别对象类型**，通过person.constructor属性（该属性是从Object.prototype中继承来的）

**可以看到，不管是通过构造函数，还是字面量（底层也是使用new Object来创建对象的），对象构造器属性均为Object。**

2）**每次创建相同对象需要写大量的重复代码**，每创建一个对象均需要重复的书写name、age、basketball

### 三、 通过工厂模式创建

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-2.png)

#### 1、优点：

不用每次创建对象时，都写一批重复的代码（通过字面量创建的），也就是创建对象的时候原先需要数行才能完成的工作，现在只需要一行即可。

#### 2、缺点

**仍然无法识别对象的类型，创建的对象构造器指向的函数仍然都是Object。**

### 四、通过构造函数模式创建

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-3.png)

#### 1、优点：

**可以识别对象的类型**，person实例的constructor属性指向构造函数Person，也就解决了对象的识别问题。

#### 2、缺点

每次创建对象时，都实例化对象的属性，其中basketBall为函数对象，这将导致相同功能的代码，重复多余的创建对象，进而产生大量的内存浪费。

　　**person1.basketBall == person2.basketBall; //false**

也就是说，由构造函数生成的每个对象实例，属性和方法都是独有的，都是复制了一遍。属性独有是必须的，因为这正是对象之间不同的地方，但是很多方法功能和代码都是一样的，重复复制多次，显然就会浪费资源。

**可以把函数放在外面，然后在构造函数里面，用指针指向这个函数，那么生成的实例中，方法存储的就是一个指向某函数的指针，也就共用一个函数了**：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-6.png)

但是这样，**这个函数就变成了全局函数，而且与 Person 构造函数关联性不强，没有封装性可言**。

#### 3、区别

构造函数模式与工厂模式区别：

+ 没有显式的创建对象。
+ 直接将属性和方法赋值 this 对象。
+ 没有 return 语句。

#### 4、代码过程

构造函数默认习惯是首字母大写，上面代码执行经历了下面几个步骤：

+ 创建一个新对象
+ 将构造函数作用域赋值给新对象
+ 执行构造函数中的代码
+ 返回新对象

这样生成的实例中，都默认包含一个 constructor 属性指向构造函数，例如：

　　**console.log(person.constructor == Person);**　　　

### 五、通过原型模式创建

#### A、复杂版本：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-4.png)

#### B、简洁版本



**简单的说，就是每个函数都有一个 prototype 属性，指向一个对象（原型对象），这个对象里面可以放一些属性或者方法。然后这个函数生成的实例，会有一个不规范的属性（__proto__）指向原型。prototype 产生的属性和方法是所有实例共享的。**

#### 1、优点：

**每次实例化对象时，仅在对象首次创建时，初始化原型对象**。也就是sayHello函数对象仅创建一次，节省了不少内存资源

#### 2、缺点

所有的实例对象共享原型对象的属性，**如果原型对象中包含对象的引用，其中一个实例改变了引用对象的值，将影响到其它所有的实例对象**。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-5.png)

可以看到Person的原型对象中定义了一个数组引用属性和字符串属性，当cjc实例更改了数组引用属性的值时，cjp实例的属性也被更改了。

但当cjc对象更改name属性时，却不影响cjp实例，因为相当于cjc自己重新定义了name属性。

#### 3、需要注意的地方

#### A、复杂版本：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-7.png)

#### B、简洁版本：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-8.jpg)

#### C 、问题所在

在简洁版本中，我们等价于以对象字面量的形式创建新的对象。最终结果是一样的，但是有一个例外是：

**constructor属性不再指向Person了**。因为每创建一个函数，就同时会创建它的prototype对象，这个对象也会自动获得constructor属性。而我们在这里使用的语法，本质上完全重写了默认的prototype对象。因此constructor属性也就变成了新对象的constructor属性（指向Object构造函数），不再指向Person函数。此时，尽管instanceof操作符还能返回正确的结果，但通过constructor已经无法确定对象的类型了。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-9.png)

因为后者覆盖了整个 prototype 对象，所以**需要手动指定 constructor 属性，指向构造函数否则会指向 Object**。为了能正确地访问到该属性，我们可以如下这样做，那么就可以了：

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-10.png)


### 六、组合使用构造函数模式和原型模式

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-11.png)

**这就是最常用的模式，构造函数用来定义实例属性，通过传递参数实现自定义；原型用来定义方法或者需要所有实例共享的属性。这样，既实现了自定义，又保证了共用，还避免了问题。**

### 七、动态原型模式

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-12.png)

#### 1、优点

有过类似java面向对象语言经验的，会觉得javascript的原型模式创建对象语法很怪，写法松散，这样我们可以采用动态原型模式。

**将构造函数的原型代码书写在构造函数内部，通过判断语句，来保证仅在第一次调用构造函数的时候，初始化对象。**

#### 2、缺点

构造函数中的代码变得略复杂

### 八、寄生构造函数模式

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-26-FEW-JavaScript%20create%20object%20-13.png)

**这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象，但是从表面上看，这个函数又很像是典型的构造函数。**

**构造函数在不返回值的情况下，默认会返回新对象实例，而通过在构造函数的末尾添加一个return语句，可以重写调用构造函数时返回的值。**

关于这种模式，有一点需要说明的是,首先返回的对象与构造函数或者与构造函数的原型属性之间没有任何关系，也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。因此，不能依赖instanceof操作符来确定对象类型。**所以，在能用别的模式的情况，最好别用这种模式。**



　　