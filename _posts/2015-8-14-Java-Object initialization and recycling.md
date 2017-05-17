---
layout: post
title: "Java语言基础：对象的初始化 "
date: 2015-8-14
categories: Java
tags: [Java，基础知识]
---
Java语言基础：对象的初始化

<!-- more -->

#### 1、如果基类存在默认构造函数，则在子类构造之前，会先调用基类的默认构造函数：
   
    class A {
    A() {
        System.out.println("A create");
    }
    }
 
    class B extends A {
    B() {
        // 会在这里先调用A的默认构造函数
        System.out.println("B create");
    }
    }
 
    class C extends A {
    C(int i) {
        // 会在这里先调用A的默认构造函数
        System.out.println("C create");
    }
    }
 
    public class Main {            
    public static void main(String[] args) {
        B b = new B();
        C c = new C(10);
    }
    }
 
// 输出为：

**A create**

**B create**

**A create**

**C create**

#### 2、如果基类只有带参数的构造函数，子类必须在自己的构造函数中通过super(...)显式调用该基类构造函数：

    class A {
    A(int i) {
        System.out.println("A create");
    }
    }
 
    class B extends A {
    B() {
        // 必须在这里显式调用父类的非默认构造函数，否则编译不通过
        // 注意这调用只能放在最前面，否则编译不通过
        super(20);
        System.out.println("B create");
    }
    }
 
    class C extends A {
    C(int i) {
        // 必须在这里显式调用父类的非默认构造函数，否则编译不通过
        // 注意这调用只能放在最前面，否则编译不通过
        super(30);
        System.out.println("C create");
    }
    }
 
    public class Main {            
    public static void main(String[] args) {
        B b = new B();
        C c = new C(10);
    }
    }

// 输出为：

**A create**

**B create**

**A create**

**C create**

#### 3、以上只讲了最简单的构造函数调用顺序，**其实一个对象的真正的初始化过程应该是：**

**A.将对象的存储空间初始化为二进制的0.**

**B.先递归到最上层的基类去，将最上层的基类作为当前类。**

**C.对于当前类：**

   **a.按声明顺序调用成员变量的初始设置代码.**

   **b.调用构造函数.**

**D .接着将下一层继承类作为当前类，继续步骤3**

先看下面的代码：

    class A {
    A() {
        System.out.println("A create");
    }
    }
 
    class D {
    D() {
        System.out.println("D create");
    }
    }
 
    class B extends A {
    private D d = new D();
    B() {
        System.out.println("B create");
    }
    }
 
    class C extends B {
    C(int i) {
        System.out.println("C create");
    }
    }
 
    public class Main {            
    public static void main(String[] args) {
        C c = new C(10);
    }
    }

初始化过程大概是这样的：

先从C递归到B，再从B递归到A。

A没有成员变量，所以A的构造函数被调用。

接到回到B，B有一个D类的成员有初始化，因此D的构造函数被调用。

接着B的构造函数被调用。

最后回到C，C的构造函数被调用。

所以输出应该是：

**A create**

**D create**

**B create**

**C create**

#### 4、必须小心在构造函数中调用虚函数(在JAVA里普通函数都是虚的)的隐患，特别是在基类的构造函数，因为此时继承类的成员可能还没有初始完毕：

    class A {
    A() {
        System.out.println("A create");
        proc();
    }
    public void proc() {
    }
     }
 
    class B extends A {
    private int i;
    B() {
        System.out.println("B create");
        i = 10;
    }
    public void proc(){
        System.out.println(i);
    }
    }
 
    public class Main {            
    public static void main(String[] args) {
        B b = new B();
    }
    }
输出：

**A create**

**0**

**B create**

**A的构造函数调用了proc，此时B的构造函数还没有被调用，因此i还没有被赋为10，最终输出结果是0。**


#### 5、由于Java对象都是通过垃圾回收机制清理对象，因此Java的类没有析构函数，遇到需要清理类中资源的问题时，可以自己声明一个函数，如Dispose，在适当的时候调用之。

转自<http://blog.csdn.net/linzhengqun/article/details/6279193>