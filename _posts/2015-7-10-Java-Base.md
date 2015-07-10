---
layout: post
title:  "Java的一些基础知识 "
date:  2015-7-10
categories: Java
tags: [Java]
---

Java的一些基础知识

<!-- more -->
Java的一些基础知识

###1.java标识符

Java标识符由数字，字母和下划线(_)，美元符号($)组成。在Java中是区分大小写的，而且还要求首位不能是数字。最重要的是，Java关键字不能当作Java标识符。


###2.左移和右移

![](http://img-storage.qiniudn.com/15-7-10/87614522.jpg)

###3.求模

![](http://img-storage.qiniudn.com/15-7-10/31096987.jpg)

###4.实例化子对象

![](http://img-storage.qiniudn.com/15-7-10/36466427.jpg)

###5.用static声明的局部变量

![](http://img-storage.qiniudn.com/15-7-10/10198468.jpg)


![](http://img-storage.qiniudn.com/15-7-10/85612106.jpg)

###6.记住：
**子类的可见性不能小于父类的可见性**
![](http://img-storage.qiniudn.com/15-7-10/12268425.jpg)


###7.构造器重载
![](http://img-storage.qiniudn.com/15-7-10/38359994.jpg)

构造器重载

  **构造器名字相同都跟类名一样，参数（参数个数或类型）不相同我们就说这是构造器重载。当你要多次初始化不同数量的对象属性时候可以使用构造器重载，因为这样给对象属性赋值方便些。**

###8.Overload和Override的区别。Overloaded的方法是否可以改变返回值的类型? 

方法的重写Overriding和重载Overloading是Java多态性的不同表现。

**重写Overriding是父类与子类之间多态性的一种表现，重载Overloading是一个类中多态性的一种表现**。

如果在子类中定义某方法与其父类有相同的名称和参数，我们说该方法被重写 (Overriding)。子类的对象使用这个方法时，将调用子类中的定义，对它而言，父类中的定义如同被”屏蔽”了。

如果在一个类中定义了多个同名的方法，它们或有不同的参数个数或有不同的参数类型，则称为方法的重载(Overloading)。**Overloaded的方法是可以改变返回值的类型。**

###9.字符串“abcde”通过写一个函数不让调用第三方的字符串，实现一个字符串倒序，比如字符串“abcde”变成“edcba” 

String src = “abcde”; 

**String dst = new StringBuffer(src).reverse().toString();**

###10.HashMap和Hashtable之间的区别

经常问到。这两个都是Map接口的类，实现了将唯一键映射到特定的值上。HashMap类没有排序，可以一个null键和多个null值Hashtable，不可以有null键和null值。比Hash慢，因为他是同步的。

###11.abstract class和interface有什么区别

  经常问。声明方法的存在而不去实现它的类被叫做抽象类（abstract class），它用于要创建一个体现某些基本行为的类，并为该类声明方法，但不能在该类中实现该类的情况。不能创建abstract 类的实例。然而可以创建一个变量，其类型是一个抽象类，并让它指向具体子类的一个实例。不能有抽象构造函数或抽象静态方法。Abstract 类的子类为它们父类中的所有抽象方法提供实现，否则它们也是抽象类为。取而代之，在子类中实现该方法。知道其行为的其它类可以在类中实现这些方法。

　接口（interface）是抽象类的变体。在接口中，所有方法都是抽象的。多继承性可通过实现这样的接口而获得。接口中的所有方法都是抽象的，没有一个有程序体。接口只可以定义static final成员变量。接口的实现与子类相似，除了该实现类不能从接口定义中继承行为。当类实现特殊接口时，它定义（即将程序体给予）所有这种接口的方法。然后，它可以在实现了该接口的类的任何对象上调用接口的方法。由于有抽象类，它允许使用接口名作为引用变量的类型。通常的动态联编将生效。引用可以转换到接口类型或从接口类型转换，instanceof 运算符可以用来决定某对象的类是否实现了接口

###12.Set里的元素是不能重复的，那么用什么方法来区分重复与否呢?是用==还是equals()?它们有何区别?

  很基础的一道题。

  Set里的元素是不能重复的，那么用iterator()方法来区分重复与否。equals()是判读两个Set是否相等。

  equals()和==方法决定引用值是否指向同一对象

  equals()在类中被覆盖，为的是当两个分离的对象的内容和类型相配的话，返回真值。

###13.Overload和Override的区别。Overloaded的方法是否可以改变返回值的类型?

  经常问。方法的重写Overriding和重载Overloading是Java多态性的不同表现。重写Overriding是父类与子类之间多态性的一种表现，重载Overloading是一个类中多态性的一种表现。如果在子类中定义某方法与其父类有相同的名称和参数，我们说该方法被重写 (Overriding)。子类的对象使用这个方法时，将调用子类中的定义，对它而言，父类中的定义如同被“屏蔽”了。如果在一个类中定义了多个同名的方法，它们或有不同的参数个数或有不同的参数类型，则称为方法的重载(Overloading)。Overloaded的方法是可以改变返回值的类型。



###14、final, finally, finalize的区别。 

final 用于声明属性，方法和类，分别表示属性不可变，方法不可覆盖，类不可继承。 

finally是异常处理语句结构的一部分，表示总是执行。 

finalize是Object类的一个方法，在垃圾收集器执行的时候会调用被回收对象的此方法，可以覆盖此方法提供垃圾收集时的其他资源回收，例如关闭文件等。

###15.常见到的runtime exception

  这是考验你在编程中的经验了。  ClassCastException 类转换异常，在进行类型转换的时候。  NoSuchElementException 找不到方法

 NullPointerException 最常见，**空值针 避免Java程序中NullPointerException的技巧和最佳**实践**

ProfileDataException, ProviderException, RasterFORMatException, SecurityException, SystemException, UndeclaredThrowableException, UnmodifiableSetException, 等等

###16、sleep() 和 wait() 有什么区别? 
1.这两个方法来自不同的类分别是，sleep来自Thread类，和wait来自Object类。 

2.最主要是sleep方法没有释放锁，而wait方法释放了锁，使得其他线程可以使用同步控制块或者方法。sleep不出让系统资源；wait是进入线程等待池等待，出让系统资源，其他线程可以占用CPU。

一般wait不会加时间限制，因为如果wait线程的运行资源不够，再出来也没用，要等待其他线程调用notify/notifyAll唤醒等待池中的所有线程，才会进入就绪队列等待OS分配系统资源。

sleep(milliseconds)可以用时间指定使它自动唤醒过来，如果时间不到只能调用interrupt()强行打断。 

3.wait，notify和notifyAll只能在同步控制方法或者同步控制块里面使用，而sleep可以在任何地方使用 

4. Sleep需要捕获异常,而wait不需要

###17、同步和异步有何异同，在什么情况下分别使用他们？举例说明。 
如果数据将在线程间共享。例如正在写的数据以后可能被另一个线程读到，或者正在读的数据可能已经被另一个线程写过了，那么这些数据就是共享数据，必须进行同步存取。 

当应用程序在对象上调用了一个需要花费很长时间来执行的方法，并且不希望让程序等待方法的返回时，就应该使用异步编程，在很多情况下采用异步途径往往更有效率。

###18、线程中wait，join，sleep，yield, notify，notifyall，synchronized，区别及联系 
####1).sleep()方法 

在指定时间内让当前正在执行的线程暂停执行，但不会释放“锁标志”。不推荐使用。sleep()使当前线程进入阻塞状态，在指定时间内不会执行。 
####2).wait()方法 

在其他线程调用对象的notify或notifyAll方法前，导致当前线程等待。线程会释放掉它所占有的“锁标志”，从而使别的线程有机会抢占该锁。 

唤醒当前对象锁的等待线程使用notify或notifyAll方法,waite() 和notify()必须在synchronized函数或synchronized　block中进行调用。 

yield方法暂停当前正在执行的线程对象。yield()只是使当前线程重新回到可执行状态，所以执行 
####3)

yield()的线程有可能在进入到可执行状态后马上又被执行。yield()只能使同优先级或更高优先级的线程有执行的机会。 

####4).join方法 

等待该线程终止。等待调用join方法的线程结束，再继续执行。如：t.join();//主要用于等待t线程运行结束，若无此句，main则会执行完毕，导致结果不可预测。


###19、接口是否可继承接口? 抽象类是否可实现(implements)接口? 抽象类是否可继承实体类(concrete class)? 

接口可以继承接口。抽象类可以实现(implements)接口，抽象类是否可继承实体类，但前提是实体类必须有明确的构造函数。

###20、是否可以继承String类? 

String类是final类故不可以继承。

###21、java switch支持的数据类型： 

java支持的数据类型有五种
 
他们分别是： 

byte、char、short、int、枚举 

以上是JDK1.6以前的版本。JDK1.7时，又增加了String，所以相对于JDK1.7而言就是六种了

###15、什么是单例模式，请写出一个来： 

####Singleton模式主要作用是保证在Java应用程序中，一个类Class只有一个实例存在。 
一般Singleton模式通常有几种种形式: 

####第一种形式: 定义一个类，它的构造函数为private的，它有一个static的private的该类变量，在类初始化时实例话，通过一个public的getInstance方法获取对它的引用,继而调用其中的方法。

    public class Singleton { 
    private Singleton(){} 

      //注意这是private 只供内部调用
      private static Singleton instance = new Singleton();
      //这里提供了一个供外部访问本class的静态方法，可以直接访问  
      public static Singleton getInstance() {
        return instance;   
      }
    }



####第二种形式:
    public class Singleton {

     private static Singleton instance = null;

     public static synchronized Singleton getInstance() {
    //这个方法比上面有所改进，不用每次都进行生成对象，只是第一次     
    //使用时生成实例，提高了效率！
    if (instance==null)
    instance＝new Singleton();
    return instance;   } 
     }

###16、Java常用的设计模式？说明工厂模式。 

Java中的23种设计模式： 

Factory（工厂模式）， Builder（建造模式）， Factory Method（工厂方法模式）， 
Prototype（原始模型模式），Singleton（单例模式）， Facade（门面模式）， 
Adapter（适配器模式）， Bridge（桥梁模式）， Composite（合成模式）， 
Decorator（装饰模式）， Flyweight（享元模式）， Proxy（代理模式）， 
Command（命令模式）， Interpreter（解释器模式）， Visitor（访问者模式）， 
Iterator（迭代子模式）， Mediator（调停者模式）， Memento（备忘录模式）， 
Observer（观察者模式）， State（状态模式）， Strategy（策略模式）， 
Template Method（模板方法模式）， Chain Of Responsibleity（责任链模式） 

工厂模式：工厂模式是一种经常被使用到的模式，根据工厂模式实现的类可以根据提供的数据生成一组类中某一个类的实例， 

通常这一组类有一个公共的抽象父类并且实现了相同的方法，但是这些方法针对不同的数据进行了不同的操作。 

首先需要定义一个基类，该类的子类通过不同的方法实现了基类中的方法。然后需要定义一个工厂类，工厂类可以根据条件 

生成不同的子类实例。当得到子类的实例后，开发人员可以调用基类中的方法而不必考虑到底返回的是哪一个子类的实例。