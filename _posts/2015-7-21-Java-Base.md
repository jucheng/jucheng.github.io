---
layout: post
title: "Java基础总结（一）"
date: 2015-7-21
categories: Java
tags: [Java，基础知识]
---
Java基础总结（一）

<!-- more -->

###1.考察接口的基本属性

下面这个程序正确吗？如果不正确请说出哪里错误。

    interface Playable {
    void play();
    }
    interface Bounceable {
    void play();
    }
    interface Rollable extends Playable, Bounceable {
    Ball ball = new Ball(“PingPang”);
    }
    class Ball implements Rollable {
    private String name;
    public String getName() {
    return name;
    }
    public Ball(String name) {
    this.name = name;
     }
     public void play() {
    ball = new Ball(“Football”);
    System.out.println(ball.getName());
     }

（注释：
**接口里是常量是 final的 不能改变**）

###2.GC是什么? 为什么要有GC?

**Gc是垃圾收集 gabage collection的意思** 内存处理是编程人员最容易出现问题的地方，gc可以达到自动处理内存 回收垃圾的作用 使java程序员不用担心内存管理问题  system.gc

###3.XML包括哪些解释技术，区别是什么？

答:有DOM,SAX,STAX等,但主要是前两个。 

**DOM:**

处理大型文件时其性能下降的非常厉害。这个问题是由DOM的树结构所造成的，这种结构占用的内存较多，而且DOM必须在解析文件之前把整个文档装入内存,适合对XML的随机访问

**SAX:**

不同于DOM,SAX是事件驱动型的XML解析方式。它顺序读取XML文件，不需要一次全部装载整个文件。当遇到像文件开头，文档结束，或者标签开头与标签结束时，它会触发一个事件，用户通过在其回调事件中写入处理代码来处理XML文件，适合对XML的顺序访问 
 
STAX:Streaming API for XML (StAX)

###4.sleep()和wait()有什么区别?
第一：
Sleep() 是线程类的方法  wait()是object类的方法；

第二：
Sleep（） 不会释放对象锁 到时自动恢复；

 wait（）会释放对象锁 进入等待此对象的等待锁定池  发出notify（）方法后 才进入等待锁定池准备对象锁的获取进入运行状态；

###5.error和exception有什么区别?

error表示恢复不是不可能但是及其困难的一种严重问题 不可能指望程序处理这样的问题

Exception是一种设计或实现的问题 表示只要程序运行正常就不会出现的问题

###6.谈谈final,finally,finalize的区别？
Final是修饰符 表示类不能被继承 方法不能被重载，重写 变量不能被修改等

Finally是异常处理时的一个无论如何都会被执行的程序块

Finaliz方法是垃圾收集器删除对象之前对这个对象调用的进行清理工作的方法

###7.什么是java序列化，如何实现java序列化？
序列化是一种处理对象流的机制 是为了解决在对对象流进行读写操作时所引发的问题

使用serializeae关键字  使用一个输出流构造一个对象流流对象  然后使用对象流对象的writeObject（）就可以将参数为obj的对象写出

###8.垃圾回收的优点和原理。并考虑2种回收机制
回收机制有分代复制垃圾回收 标记垃圾回收 和增量垃圾回收

###9.描述一下JVM加载class文件的原理机制?
是由classloader和他的子类来实现的  他在运行时查找和装入类文件的类

###10.ArrayList和Vector的区别,HashMap和Hashtable的区别？
Vector线程安全 增长时涨一倍  arraylist涨一半

Hashtable线程安全  hashmap可以用空值作为键值

###11.满二叉树和完全二叉树的区别
完全二叉树，除最后一层可能不满以外，其他各层都达到该层节点的最大数，最后一层如果不满，该层所有节点都全部靠左排

满二叉树，所有层的节点数都达到最大
