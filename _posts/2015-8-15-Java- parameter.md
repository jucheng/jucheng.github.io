---
layout: post
title: "java 参数赋值和参数传递问题 "
date: 2015-8-15
categories: Java
tags: [Java，基础知识]
---
java 参数赋值和参数传递问题

<!-- more -->

在实际的开发过程中，方法调用是一种很常见的操作，在方法调用中，关于参数的处理可能很多进行实际开发的程序员都不一定理解的很清楚，下面系统的介绍一下Java语言中参数传递的规则，以及和参数传递相关的一些问题。

和其它程序设计语言类似，Java语言的参数传递也分为两种：

###1、 按值传递(by value)

**适用范围：8种基本数据类型、String对象**

**特点：在内存中复制一份数据，把复制后的数据传递到方法内部**

**作用：在方法内部改变参数的值，外部数据不会跟着发生改变**

###2、 按址传递(by address)

**适用范围：数组、除String以外的其他所有类型的对象**

**特点：将对象的地址传递到方法内部**

**作用：在方法内部修改对象的内容，外部数据也会跟着发生改变**

基础示例代码：

    publicclass Test1{
    publicstatic void t1(int n){
       n = 10;
    }
    publicstatic void t2(String s){
             s = "123";
    }
    publicstatic void t3(int[] array){
       array[0] = 2;
    }
    publicstatic void main(String[] args){
         int m = 5;
       t1(m);
       System.out.println(m);
       String s1 = "abc";
       t2(s1);
       System.out.println(s1);
         int[] arr = {1,2,3,4};
       t3(arr);
       System.out.println(arr[0]);
   }   
   }
        
按照上面的参数传递规则，该代码的输出结果应该是：5 abc 2。因为int类型是按值传递，所以把参数m传递到方法t1时，相当于又复制了一份m的值，在方法t1内部修改的是复制后的值，所以m的值不变，s1的输出和m类似。而arr是数组，属于按址传递，也就是把arr的地址传递到了方法t3内部，在方法t3内部修改数组中的值时，原来的内容也发生改变。
        
**以上特性是Java语言中的规定，在语法上无法指定参数传递是按值传递还是按址传递，但是可以通过下面的变换实现：**

**1、 对于按值传递的参数，如果需要在方法调用以后修改参数的值，可以利用返回值来实现。**

**2、 对于按值传递的参数，如果需要在方法内部修改时原来的参数不改变，则可以在方法内部重新创建该对象实现。**

示例代码如下：

    public class Test2{
    publicstatic int t1(int n){
       n = 10;
       return n;
    }
    publicstatic String t2(String s){
                s = "123";
                 return  s;
    }
    publicstatic void t3(int[] array){
       //创建新的数组并赋值
       int[] newArray = new int[array.length];
       //数据拷贝
       System.arraycopy(array,0,newArray,0,array.length);
       newArray[0] = 2;
    }
    publicstatic void main(String[] args){
                int m = 5;
       //重新赋值
       m = t1(m);
       System.out.println(m);
       String s1 = "abc";
       //重新赋值
       s1 = t2(s1);
       System.out.println(s1);
                int[] arr = {1,2,3,4};
       t3(arr);
       System.out.println(arr[0]);
     }   
    }

这样，程序的输出结果就将是：10 123  1。

在实际的程序开发中，可以根据需要使用类似的结构来进行实现。
        
下面再介绍一个参数传递的常见应用，利用参数传递实现返回值，这样的功能在IO类设计的read方法中大量使用。示例代码如下：

    public class Test3{
    publicstatic void initArray(int[] array){
                for(int i = 0;i < array.length;i++){
                          array[i] = i;
       }
    }
    publicstatic void main(String[] args){
                int[] a = new int[10];
       initArray(a);
       for(int i = 0;i < a.length;i++){
                          System.out.println(a[i]);
       }
    }
    }
        
在该示例代码中，在initArray方法内部修改了数组的值以后，外部数组a的值也会发生改变，间接实现了返回值的效果。当然，在该示例代码中，因为只返回一个参数，所以作用体现的不明显，如果需要返回多个参数时，使用按址传递是一种不错的主意。


参数的赋值

java中的数据类型主要包括两大类：

###一、基本数据类型：boolean , byte , char ,short , int ,long ,float ,double

###二、引用类型：包括java类库中的已定义类型，和程序开发中要用到的自定义java类型，此外数组也是一种特殊的对象类型

###三、java中参数传递的方式：

与C\C++中存在的两种方式------值传递、引用传递不同的是，在java语言中，只存在值传递这一种方式。

然而针对java中存在的两类数据类型来说，对于基本数据类型来说，传递的是类型值；对于对象引用类型来说，传递的是对象 的引用值。

转自<http://blog.sina.com.cn/s/blog_7d991ba301018xkd.html>