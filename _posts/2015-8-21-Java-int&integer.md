---
layout: post
title: "java中integer跟int的区别 "
date: 2015-8-21
categories: Java
tags: [Java，基础知识]
---
java中integer跟int的区别

<!-- more -->

Java基本数据类型 int与Integer 区别
 
基本类型，或者叫做内置类型，是JAVA中不同于类的特殊类型。 Java中的简单类型从概念上分为四种：实数、整数、字符、布尔值。但是有一点需要说明的是，Java里面只有八种原始类型，其列表如下：

　　实数：double、float

　　整数：byte、short、int、long

　　字符：char

　　布尔值：boolean

**复杂类型和基本类型的内存模型本质上是不一样的，简单数据类型的存储原理是这样的：所有的简单数据类型不存在“引用”的概念，简单数据类型都是直接存储在内存中的内存栈上的，数据本身的值就是存储在栈空间里面，而Java语言里面只有这八种数据类型是这种存储模型；**

**而其他的只要是继承于Object类的复杂数据类型都是按照Java里面存储对象的内存模型来进行数据存储的，使用Java内存堆和内存栈来进行这种类型的数据存储，简单地讲，“引用”是存储在有序的内存栈上的，而对象本身的值存储在内存堆上的。**

Java的简单数据讲解列表如下：

int：int为整数类型，在存储的时候，用4个字节存储，范围为-2,147,483,648到2,147,483,647，在变量初始化的时候，int类型的默认值为0。

short：short也属于整数类型，在存储的时候，用2个字节存储，范围为-32,768到32,767，在变量初始化的时候，short类型的默认值为0，一般情况下，因为Java本身转型的原因，可以直接写为0。

long：long也属于整数类型，在存储的时候，用8个字节存储，范围为-9,223,372,036,854,775,808到9,223,372,036, 854,775,807，在变量初始化的时候，long类型的默认值为0L或0l，也可直接写为0。

byte：byte同样属于整数类型，在存储的时候，用1个字节来存储，范围为-128到127，在变量初始化的时候，byte类型的默认值也为0。

float：float属于实数类型，在存储的时候，用4个字节来存储，范围为32位IEEEE 754单精度范围，在变量初始化的时候，float的默认值为0.0f或0.0F，在初始化的时候可以写0.0。

double：double同样属于实数类型，在存储的时候，用8个字节来存储，范围为64位IEEE 754双精度范围，在变量初始化的时候，double的默认值为0.0。

char：char属于字符类型，在存储的时候用2个字节来存储，因为Java本身的字符集不是用ASCII码来进行存储，是使用的16位Unicode字符集，它的字符范围即是Unicode的字符范围，在变量初始化的时候，char类型的默认值为'u0000'。

boolean：boolean属于布尔类型，在存储的时候不使用字节，仅仅使用1位来存储，范围仅仅为0和1，其字面量为true和false，而boolean变量在初始化的时候变量的默认值为false。

int 是基本数据类型 Integer是其包装类，注意是一个类。 为什么要提供包装类呢？？？ 一是为了在各种类型间转化，通过各种方法的调用。否则 你无法直接通过变量转化。

比如，现在int要转为String

    int a=0; String result=Integer.toString(a);

**在java中包装类，比较多的用途是用在于各种数据类型的转化中。** 一般小写字母开头的是数据类型（如int double），大写字母开头的一般是封装为类（如Double），里面有很多方法，比如实行转换Integer.parseInt(arg0)，可以把其他类型的数据转换为int

    //通过包装类来实现转化的 
    int num=Integer.valueOf("12"); 
    int num2=Integer.parseInt("12"); 
    double num3=Double.valueOf("12.2");
    double num4=Double.parseDouble("12.2"); //

其他的类似。**通过基本数据类型的包装来的valueOf和parseXX来实现String转为XX String** 

    a=String.valueOf("1234");//这里括号中几乎可以是任何类型
    String b=String.valueOf(true); 
    String c=new Integer(12).toString();//通过包装类的toString()也可以 
    String d=new Double(2.3).toString(); 

再举例下。现在要用泛型 List nums; 这里<>需要类。如果你用int。它会报错的 int是java提供的8种原始数据类型之一。Java为每个原始类型提供了封装类，Integer是java为int提供的封装类。

**另外，Integer提供了多个与整数相关的操作方法，**例如，将一个字符串转换成整数，**Integer中还定义了表示整数的最大值和最小值的常量。**

java.lang.Integer是一个类.对它的操作要通过类的方法 

int是JAVA缺省的8中基本数据类型之一.不是类的对象.

int是基本数据类型，Integer是对int进行了封装的一个类。 

声明为int的变量不需要实例化，声明为Interger的变量需要实例化 

int是基本类型，Integer是包装类，也就是类。

int是java提供的8种原始数据类型之一。

Java为每个原始类型提供了封装类，Integer是java为int提供的封装类。

int的默认值为0，而Integer的默认值为null，即Integer可以区分出未赋值和值为0的区别，int则无法表达出未赋值的情况，例如，要想表达出没有参加考试和考试成绩为0的区别，则只能使用Integer。在JSP开发中，Integer的默认为null，所以用el表达式在文本框中显示时，值为空白字符串，而int默认的默认值为0，所以用el表达式在文本框中显示时，结果为0，所以，int不适合作为web层的表单数据的类型。 

在Hibernate中，如果将OID定义为Integer类型，那么Hibernate就可以根据其值是否为null而判断一个对象是否是临时的，如果将OID定义为了int类型，还需要在hbm映射文件中设置其unsaved-value属性为0。 

int 是基本类型。

Integer是引用类型。。


比如int a= 5；
Integer b = 5；

对于a你只能用来做计算。。比如加减乘除

b你可以用来做很多事情，因为他是一个对象，他有很多方法，你可以像使用String对象那样使用它。


java.lang.Integer是一个类.对它的操作要通过类的方法   

  int是JAVA缺省的8中基本数据类型之一.不是类的对象.

int是基本数据类型，Integer是对int进行了封装的一个类。 
  
  声明为int的变量不需要实例化，声明为Interger的变量需要实例化   

int是面向机器底层的数值类型，是Primitive类型的数据类型，而Integer是int的Warpper类，是面向对象的即OOP的对象类型。

int   一般只用在数值计算中，而Integer是用在Java的其它要使用对象的地方，比如Map的Key与Value，List与Set的Element若要保存数值信息都要把int包装成Integer对象使用。

Java   提供两种不同的类型：引用类型和原始类型（或内置类型）。Int是java的原始数据类型，Integer是java为int提供的封装类。Java为每个原始类型提供了封装类。  
 

原始类型         封装类   
  boolean            Boolean
   
  char               Character  
 
  byte               Byte 
  
  short              Short  
 
  int                Integer  
 
  long               Long   

  float              Float   

  double             Double   

**引用类型和原始类型的行为完全不同，并且它们具有不同的语义。引用类型和原始类型具有不同的特征和用法，它们包括：大小和速度问题，这种类型以哪种类型的数据结构存储，当引用类型和原始类型用作某个类的实例数据时所指定的缺省值。对象引用实例变量的缺省值为   null，而原始类型实例变量的缺省值与它们的类型有关。**

  **int   一般做为数值参数就够了**   

  **integer   一般做类型转换的时候用的较多**


**Integer是int的封装类，里面有很多进行处理的静态方法** 
  
**Integer是对象而int不是，内存的分配位置也不一样**

**int是一种基本数据类型，而Integer是相应于int的类类型，称为对象包装。**  
 
**实现这种对象包装的目的主要是因为类能够提供必要的方法，用于实现基本数据类型的数值与可打印字符串之间的转换，以及一些其他的实用程序方法；**   

**另外，有些数据结构库类只能操作对象，而不支持基本数据类型的变量，包装类提供一种便利的方式，能够把基本数据类型转换成等价的对象，从而可以利用数据结构库类进行处理。**   


int a=1;这是基本数据类型是能参与运算的.

而Integer b= new Integer(1);

c=b.floatvalue;

Float a= new Float(null);是可以的用Float初始化一个对象

这个a有很多方法而float a;就没有因为原始没有引用类

**int 是基本类型，直接存数值**

**integer是对象，用一个引用指向这个对象**


####1.Java 中的数据类型分为基本数据类型和复杂数据类型

int 是前者>>integer 是后者（也就是一个类）

####2.初始化

int i =1;

Integer i= new Integer(1);(要把integer 当做一个类看)

**int 是基本数据类型（面向过程留下的痕迹，不过是对java的有益补充）**

**Integer 是一个类，是int的扩展，定义了很多的转换方法**

类似的还有：float Float;double Double;string String等


举个例子：当需要往ArrayList，HashMap中放东西时，像int，double这种内建类型是放不进去的，因为容器都是装object的，这是就需要这些内建类型的外覆类了。

**Java中每种内建类型都有相应的外覆类。**


**java 提供两种不同的类型：引用类型（或者封装类型，Warpper）和原始类型（或内置类型，Primitive）。Int是java的原始数据类型，Integer是java为int提供的封装类。Java为每个原始类型提供了封装类。** 

#####int 是基本类型，(int)(Math.Random()*100)就是一个数，可以进行加见乘除。 Integer是class ,那么 new Integer(temp)就是一个对象了，可以用到Integer这个class的方法，例如用intvalue()可以返回这个int的值。

