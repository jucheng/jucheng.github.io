---
layout: post
title: "java中 == 与 equal 的区别 "
date: 2015-8-21
categories: Java
tags: [Java，基础知识]
---
java中 == 与 equal 的区别

<!-- more -->

废话不多说了，开门见山吧，先来看一段代码：

       String str1 = new String("str");
        String str2 = new String("str");
        System.out.println("==比较 ："+ (str1 == str2));
        System.out.println("equal比较："+ str1.equals(str2));
        String str3 = "str1";
        String str4 = "str1";
        System.out.println("==比较 ："+ (str3 == str4));
        System.out.println("equal比较："+ str3.equals(str4));

输出的答案：

![](http://img-storage.qiniudn.com/15-8-21/15083920.jpg)

**当使用new时会新申请一个内存区，所以使用==比较为false,而当使用=直接赋值时，会先检查内存是否有相同的字符串，如果有则将引用指向该内存区，故使用==比较为true**

**根据打印的可以发现使用equal比较时无论是使用自动装箱来实例化还是用new来实例化，返回的都true，而用==则不一样了，自动装箱来实例化的返回的是true，而用new来实例化的返回的确实false;**

先不急着解决为什么，先来了解下equals和==的区别，到时候就可以知道答案了

**equals方法最初是在所有类的基类Object中进行定义的**，源码是:

    public boolean equals(Object obj) {
    return (this == obj);
    }

**可以看出这里定义的equals与==是等效的**，但上面的怎么还会不一样呢？
原因就是String类对equals进行了重写:
   
    public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = count;
        if (n == anotherString.count) {
        char v1[] = value;
        char v2[] = anotherString.value;
        int i = offset;
        int j = anotherString.offset;
        while (n-- != 0) {
            if (v1[i++] != v2[j++])
            return false;
        }
        return true;
        }
    }
    return false;
    }

这里对equals重新需要注意五点：

**1   自反性：对任意引用值X，x.equals(x)的返回值一定为true.** 

**2   对称性：对于任何引用值x,y,当且仅当y.equals(x)返回值为true时，x.equals(y)的返回值一定为true;** 

**3   传递性：如果x.equals(y)=true, y.equals(z)=true,则x.equals(z)=true** 

**4   一致性：如果参与比较的对象没任何改变，则对象比较的结果也不应该有任何改变** 

**5   非空性：任何非空的引用值X，x.equals(null)的返回值一定为false** 

经过重写后就跟==有本质的区别了：

**equal:是用来比较两个对象内部的内容是否相等的，由于所有的类都是继承自java.lang.Object类的，所以如果没有对该方法进行覆盖的话，调用的仍然是Object类中的方法，而Object中的equal方法返回的却是==的判断，因此，如果在没有进行该方法的覆盖后，调用该方法是没有任何意义的。**

**在java面向对象的处理中我们一般在javabean中都要选择重写equals方法，使用hibernate后，我们要生成数据库的映射文件与实体类，这是我们就最好在实体类中进行equals方法的重写，重写时我们可以根据自己的定义来实现该方法只要遵守那五条原则**.

例如对于一个student类

我们定义只要在学号相同时我们就认为这两个对象时相等的；

同时我们还要重写hashcode方法:

<http://www.cnblogs.com/shenliang123/archive/2012/04/16/2452206.html>

**==：是用来判断两个对象的地址是否相同，即是否是指相同一个对象。比较的是真正意义上的指针操作。**

本文转自<http://www.cnblogs.com/shenliang123/archive/2012/04/16/2452156.html>