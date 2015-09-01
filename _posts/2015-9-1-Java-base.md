---
layout: post
title: "Java的内存机制 "
date: 2015-9-1
categories: Java
tags: [Java，基础知识]
---
Java的内存机制

<!-- more -->



1.Java的内存机制

**Java 把内存划分成两种：一种是栈内存，另一种是堆内存。**

**在函数中定义的一些基本类型的变量和对象的引用变量都是在函数的栈内存中分配**，当在一段代码块定义一个变量时，Java 就在栈中为这个变量分配内存空间，当超过变量的作用域后（比如，在函数A中调用函数B，在函数B中定义变量a，变量a的作用域只是函数B，在函数B运行完以后，变量a会自动被销毁。分配给它的内存会被回收），Java 会自动释放掉为该变量分配的内存空间，该内存空间可以立即被另作它用。

**堆内存用来存放由 new 创建的对象和数组**，在堆中分配的内存，由 Java 虚拟机的自动垃圾回收器来管理。在堆中产生了一个数组或者对象之后，还可以在栈中定义一个特殊的变量，让栈中的这个变量的取值等于数组或对象在堆内存中的首地址，栈中的这个变量就成了数组或对象的引用变量，以后就可以在程序中使用栈中的引用变量来访问堆中的数组或者对象，引用变量就相当于是为数组或者对象起的一个名称。

**引用变量是普通的变量，定义时在栈中分配，引用变量在程序运行到其作用域之外后被释放。而数组和对象本身在堆中分配，即使程序运行到使用 new 产生数组或者对象的语句所在的代码块之外，数组和对象本身占据的内存不会被释放，数组和对象在没有引用变量指向它的时候，才变为垃圾，不能在被使用，但仍然占据内存空间不放，在随后的一个不确定的时间被垃圾回收器收走（释放掉）。这也是 Java 比较占内存的原因，实际上，栈中的变量指向堆内存中的变量，这就是 Java 中的指针！**

代码实例Test01：单个对象创建

    class Person{
    String name;
    int age;
    public void tell(){
        System.out.println("姓名："+name+"年龄"+age);
    }
    }

    public class Test01 {
    public static void main(String[] args) {
        Person per=new Person();
    }
    }

在上述程序中实例化了一个对象per，在实例化对象的过程中需要在内存中开辟空间，这其中就包括栈内存和对内存。具体的内存分配如下图所示：

![](http://img-storage.qiniudn.com/15-9-1/11757742.jpg)

我们可以从上图中发现，对象名称per被保存在了栈内存中（更加准确的说法是，在栈内存中保存的是堆内存空间的访问地址），而对象的具体内容，比如属性name和age，被保存在了堆内存中。因为per对象只是被实例化，还没有具体被赋值，所以都是默认值。字符串的默认值为null，int类型的默认值为0。前面也已经提到，**堆内存空间必须使用new关键字才能开辟**。

代码实例Test02：多个对象创建

    class Person{
    String name;
    int age;
    public void tell(){
        System.out.println("姓名:"+name+",年龄:"+age);
    }
    }

    public class Test02 {
    public static void main(String[] args) {
        Person per1=new Person();
        Person per2=new Person();
        
        per1.name="张三";
        per1.age=30;
        per2.name="李四";
        per2.age=33;
        
        per1.tell();
        per2.tell();
    }
    }

![](http://img-storage.qiniudn.com/15-9-1/50638123.jpg)

关键概念：**类跟数组一样，都是属于引用类型，引用类型就是指一堆对内存可以同时被多个栈内存指向**。下面来看一下引用传递的简单实例。

代码实例Test03：对象引用传递1

    class Person{
    String name;
    int age;
    public void tell(){
        System.out.println("姓名:"+name+",年龄:"+age);
    }
     }

    public class Test03{
    public static void main(String[] args) {
        Person per1=new Person();
        Person per2=per1;
        
        per1.name="张三";
        per1.age=30;
        per2.age=33;
        
        per1.tell();
        per2.tell();
    }
    }

程序运行结果为：

姓名:张三,年龄:33

姓名:张三,年龄:33

从程序的运行结果可以发现，两个对象输出的内容一样，**实际上所谓的引用传递，就是将一个堆内存空间的使用权交个多个栈内存空间，每个栈内存空间都可以修改堆内存空间的内容**，此程序的内存分配图如下所示：

![](http://img-storage.qiniudn.com/15-9-1/47174557.jpg)

![](http://img-storage.qiniudn.com/15-9-1/85684937.jpg)

注意：上述实例中对象per2没有堆内存空间，这是因为对象per2只进行了声明操作，也没有进行实例化操作。**只有使用new关键字实例化以后才会有对内存空间**。

代码实例Test04：对象引用传递2

    class Person{
    String name;
    int age;
    public void tell(){
        System.out.println("姓名:"+name+",年龄:"+age);
    }
    }

    public class Test04 {
    public static void main(String[] args) {
        Person per1=new Person();
        Person per2=new Person();

        per1.name="张三";
        per1.age=30;
        per2.name="李四";
        per2.age=33;
        per2=per1;
        
        per1.tell();
        per2.tell();
    }
    }

上述程序运行结果为：

姓名:张三,年龄:30

姓名:张三,年龄:30

从程序的输出结果可以发现可Test03一样。不过内存分配发生了一些变化，具体如下所示：

![](http://img-storage.qiniudn.com/15-9-1/58623243.jpg)

注意点：

**Java本身提供垃圾收集机制（Garbage Collection,GC），会不定期施放不用的内存空间，只要对象不用了，就会等待GC释放空间**，如上面堆内存中的name="李四";age=33。

**一个栈内存只能指向一个对内存空间，如果要想再指向其他的堆内存空间，则必须先断开已有的指向才能分配新的指向。**

**在任何编程语言中，无论是基本类型还是引用类型，不论其作用域如何，都必须为其分配一定的内存空间，Java语言也不例外，Java的数据类型可以分为两种：基本类型（变量持有数据本身的值）和引用类型（是某个对象的引用，而并非是对象本身）；基本类型包括：boolean、float、double、int、long、short、byte以及char；在Java编程语言中除基本类型以外其余都是引用类型如：类类型、数组类型等。**


**在计算机内存中主要来自四个地方：heap segment（堆区）、stacksegment（栈区）、codesegment（代码区）、data segment（数据区）；不同的地方存放不同数据：其中堆区主要存放Java程序运行时创建的所有引用类型都放在其中；栈区主要存放Java程序运行时所需的局部变量、方法的参数、对象的引用以及中间运算结果等数据；代码区主要存放Java的代码；数据区主要存放静态变量及全局变量**
