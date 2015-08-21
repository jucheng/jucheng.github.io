---
layout: post
title: "java 自动装箱与拆箱 "
date: 2015-8-21
categories: Java
tags: [Java，基础知识]
---
java 自动装箱与拆箱

<!-- more -->

**这个是jdk1.5以后才引入的新的内容**，作为秉承发表是最好的记忆，毅然决定还是用一篇博客来代替我的记忆：

**java语言规范中说道：在许多情况下包装与解包装是由编译器自行完成的（在这种情况下包装成为装箱，解包装称为拆箱）；**

**其实按照我自己的理解自动装箱就可以简单的理解为将基本数据类型封装为对象类型，来符合java的面向对象；**例如用int来举例：

    //声明一个Integer对象
    Integer num = 10;
    //以上的声明就是用到了自动的装箱：解析为
    Integer num = new Integer(10);

以上就是一个很好的体现，因为10是属于基本数据类型的，原则上它是不能直接赋值给一个对象Integer的，但jdk1.5后你就可以进行这样的声明，这就是自动装箱的魅力

**自动将基本数据类型转化为对应的封装类型。成为一个对象以后就可以调用对象所声明的所有的方法**

**自动拆箱：故名思议就是将对象重新转化为基本数据类型：**

    //装箱
    Integer num = 10;
    //拆箱
    int num1 = num;

**自动拆箱有个很典型的用法就是在进行运算的时候：因为对象时不恩直接进行运算的，而是要转化为基本数据类型后才能进行加减乘除**

    Integer num = 10;
    //进行计算时隐含的有自动拆箱
    System.out.print(num--);

哈哈 应该感觉很简单吧，下面我再来讲点稍微难点的，是稍微
看下面一个例子，在看下面一个例子时如果对于 == 与 equal的区别不清楚的，可以先看
<http://www.cnblogs.com/shenliang123/archive/2012/04/16/2452156.html>

         //在-128~127 之外的数
         Integer num1 = 297;   Integer num2 = 297;           
         System.out.println("num1==num2: "+(num1==num2));                    
         // 在-128~127 之内的数 
         Integer num3 = 97;   Integer num4 = 97;   
         System.out.println("num3==num4: "+(num3==num4)); 

打印的结果是：num1==num2: false    num3==num4: true 

很奇怪吧：**这就归结于java对于Integer与int的自动装箱与拆箱的设计，是一种模式：叫享元模式（flyweight）**

**为了加大对简单数字的重利用，java定义：在自动装箱时对于值从–128到127之间的值，它们被装箱为Integer对象后，会存在内存中被重用，始终只存在一个对象**

**而如果超过了从–128到127之间的值，被装箱后的Integer对象并不会被重用，即相当于每次装箱时都新建一个 Integer对象；明白了吧**

**以上的现象是由于使用了自动装箱所引起的，如果你没有使用自动装箱，而是跟一般类一样，用new来进行实例化，就会每次new就都一个新的对象；**

这个的自动装箱拆箱不仅在基本数据类型中有应用，在String类中也有应用，比如我们经常声明一个String对象时：

    String str = "sl";
    //代替下面的声明方式
    String str = new String("sl");

本文转自<http://www.cnblogs.com/shenliang123/archive/2012/04/16/2451996.html>