---
layout: post
title: "详细介绍Java垃圾回收机制"
date: 2015-8-17
categories: Java
tags: [Java，基础知识]
---
详细介绍Java垃圾回收机制

<!-- more -->


**垃圾收集GC（Garbage Collection）**是Java语言的核心技术之一，之前我们曾专门探讨过Java 7新增的垃圾回收器G1的新特性，但在JVM的内部运行机制上看，Java的垃圾回收原理与机制并未改变。垃圾收集的目的在于清除不再使用的对象。GC通过确定对象是否被活动对象引用来确定是否收集该对象。GC首先要判断该对象是否是时候可以收集。两种常用的方法是引用计数和对象引用遍历。

**引用计数收集器**

引用计数是垃圾收集器中的早期策略。在这种方法中，堆中每个对象（不是引用）都有一个引用计数。当一个对象被创建时，且将该对象分配给一个变量，该变量计数设置为1。当任何其它变量被赋值为这个对象的引用时，计数加1（a = b,则b引用的对象+1），但当一个对象的某个引用超过了生命周期或者被设置为一个新值时，对象的引用计数减1。任何引用计数为0的对象可以被当作垃圾收集。当一个对象被垃圾收集时，它引用的任何对象计数减1。

优点：引用计数收集器可以很快的执行，交织在程序运行中。对程序不被长时间打断的实时环境比较有利。

缺点： 无法检测出循环引用。如父对象有一个对子对象的引用，子对象反过来引用父对象。这样，他们的引用计数永远不可能为0.

**跟踪收集器**

早期的JVM使用引用计数，现在大多数JVM采用对象引用遍历。对象引用遍历从一组对象开始，沿着整个对象图上的每条链接，递归确定可到达（reachable）的对象。如果某对象不能从这些根对象的一个（至少一个）到达，则将它作为垃圾收集。在对象遍历阶段，GC必须记住哪些对象可以到达，以便删除不可到达的对象，这称为标记（marking）对象。

下一步，GC要删除不可到达的对象。删除时，有些GC只是简单的扫描堆栈，删除未标记的未标记的对象，并释放它们的内存以生成新的对象，这叫做清除（sweeping）。这种方法的问题在于内存会分成好多小段，而它们不足以用于新的对象，但是组合起来却很大。因此，许多GC可以重新组织内存中的对象，并进行压缩（compact），形成可利用的空间。

为此，GC需要停止其他的活动活动。这种方法意味着所有与应用程序相关的工作停止，只有GC运行。结果，在响应期间增减了许多混杂请求。另外，更复杂的 GC不断增加或同时运行以减少或者清除应用程序的中断。有的GC使用单线程完成这项工作，有的则采用多线程以增加效率。

### 一些常用的垃圾收集器

**（1）标记－清除收集器**

这种收集器首先遍历对象图并标记可到达的对象，然后扫描堆栈以寻找未标记对象并释放它们的内存。这种收集器一般使用单线程工作并停止其他操作。并且，由于它只是清除了那些未标记的对象，而并没有对标记对象进行压缩，导致会产生大量内存碎片，从而浪费内存。

**（2）标记－压缩收集器**

有时也叫标记－清除－压缩收集器，与标记－清除收集器有相同的标记阶段。在第二阶段，则把标记对象复制到堆栈的新域中以便压缩堆栈。这种收集器也停止其他操作。

**（3）复制收集器**

这种收集器将堆栈分为两个域，常称为半空间。每次仅使用一半的空间，JVM生成的新对象则放在另一半空间中。GC运行时，它把可到达对象复制到另一半空间，从而压缩了堆栈。这种方法适用于短生存期的对象，持续复制长生存期的对象则导致效率降低。并且对于指定大小堆来说，需要两倍大小的内存，因为任何时候都只使用其中的一半。

 **(4) 增量收集器**

增量收集器把堆栈分为多个域，每次仅从一个域收集垃圾，也可理解为把堆栈分成一小块一小块，每次仅对某一个块进行垃圾收集。这会造成较小的应用程序中断时间，使得用户一般不能觉察到垃圾收集器正在工作。

**（5）分代收集器**

复制收集器的缺点是：每次收集时，所有的标记对象都要被拷贝，从而导致一些生命周期很长的对象被来回拷贝多次，消耗大量的时间。而分代收集器则可解决这个问题，分代收集器把堆栈分为两个或多个域，用以存放不同寿命的对象。JVM生成的新对象一般放在其中的某个域中。过一段时间，继续存在的对象(非短命对象)将获得使用期并转入更长寿命的域中。分代收集器对不同的域使用不同的算法以优化性能。

**并行收集器**

并行收集器使用某种传统的算法并使用多线程并行的执行它们的工作。在多CPU机器上使用多线程技术可以显著的提高java应用程序的可扩展性。

最后，贴出一个非常简单的跟踪收集器的例图，以便大家加深对收集器的理解：

![](http://img-storage.qiniudn.com/15-8-17/48388011.jpg)

**跟踪收集器图例**

### 使用垃圾收集器要注意的地方

下面将提出一些有关垃圾收集器要注意的地方，垃圾收集器知识很多，下面只列出一部分必要的知识：

（1）每个对象只能调用finalize( )方法一次。如果在finalize( )方法执行时产生异常（exception），则该对象仍可以被垃圾收集器收集。

（2）垃圾收集器跟踪每一个对象，收集那些不可触及的对象（即该对象不再被程序引用 了），回收其占有的内存空间。但在进行垃圾收集的时候，垃圾收集器会调用该对象的finalize( )方法（如果有）。如果在finalize()方法中，又使得该对象被程序引用(俗称复活了)，则该对象就变成了可触及的对象，暂时不会被垃圾收集了。但是由于每个对象只能调用一次finalize( )方法，所以每个对象也只可能 "复活 "一次。

（3）Java语言允许程序员为任何方法添加finalize( )方法，该方法会在垃圾收集器交换回收对象之前被调用。但不要过分依赖该方法对系统资源进行回收和再利用，因为该方法调用后的执行结果是不可预知的。

（4）垃圾收集器不可以被强制执行，但程序员可以通过调研System.gc方法来建议执行垃圾收集。记住，只是建议。一般不建议自己写System.gc，因为会加大垃圾收集工作量。

### 详解Java GC的工作原理

概要: JVM内存结构由堆、栈、本地方法栈、方法区等部分组成，另外JVM分别对新生代和旧生代采用不同的垃圾回收机制。

#### 1. 首先来看一下JVM内存结构，它是由堆、栈、本地方法栈、方法区等部分组成，结构图如下所示。

![](http://img-storage.qiniudn.com/15-8-17/42576997.jpg)

#### A、堆

所有通过new创建的对象的内存都在堆中分配，其大小可以通过-Xmx和-Xms来控制。堆被划分为新生代和旧生代，新生代又被进一步划分为Eden和Survivor区，最后Survivor由FromSpace和ToSpace组成，结构图如下所示：

![](http://img-storage.qiniudn.com/15-8-17/51667759.jpg)

新生代。新建的对象都是用新生代分配内存，Eden空间不足的时候，会把存活的对象转移到Survivor中，新生代大小可以由-Xmn来控制，也可以用-XX:SurvivorRatio来控制Eden和Survivor的比例旧生代。用于存放新生代中经过多次垃圾回收仍然存活的对象

#### B、栈

每个线程执行每个方法的时候都会在栈中申请一个栈帧，每个栈帧包括局部变量区和操作数栈，用于存放此次方法调用过程中的临时变量、参数和中间结果

#### C、本地方法栈

用于支持native方法的执行，存储了每个native方法调用的状态

#### D、方法区

存放了要加载的类信息、静态变量、final类型的常量、属性和方法信息。JVM用持久代(PermanetGeneration)来存放方法区，可通过-XX:PermSize和-XX:MaxPermSize来指定最小值和最大值。介绍完了JVM内存组成结构，下面我们再来看一下JVM垃圾回收机制。

### 2.JVM垃圾回收机制

JVM分别对新生代和旧生代采用不同的垃圾回收机制

#### 新生代的GC：

新生代通常存活时间较短，因此基于Copying算法来进行回收，所谓Copying算法就是扫描出存活的对象，并复制到一块新的完全未使用的空间中，对应于新生代，就是在Eden和FromSpace或ToSpace之间copy。新生代采用空闲指针的方式来控制GC触发，指针保持最后一个分配的对象在新生代区间的位置，当有新的对象要分配内存时，用于检查空间是否足够，不够就触发GC。当连续分配对象时，对象会逐渐从eden到survivor，最后到旧生代，

用javavisualVM来查看，能明显观察到新生代满了后，会把对象转移到旧生代，然后清空继续装载，当旧生代也满了后，就会报outofmemory的异常，如下图所示：


![](http://img-storage.qiniudn.com/15-8-17/68129795.jpg)

**在执行机制上JVM提供了串行GC(SerialGC)、并行回收GC(ParallelScavenge)和并行GC(ParNew)**

**1)串行GC**

在整个扫描和复制过程采用单线程的方式来进行，适用于单CPU、新生代空间较小及对暂停时间要求不是非常高的应用上，是client级别默认的GC方式，可以通过-XX:+UseSerialGC来强制指定

**2)并行回收GC**

在整个扫描和复制过程采用多线程的方式来进行，适用于多CPU、对暂停时间要求较短的应用上，是server级别默认采用的GC方式，可用-XX:+UseParallelGC来强制指定，用-XX:ParallelGCThreads=4来指定线程数

**3)并行GC**

与旧生代的并发GC配合使用

##### 旧生代的GC：

旧生代与新生代不同，对象存活的时间比较长，比较稳定，因此采用标记(Mark)算法来进行回收，所谓标记就是扫描出存活的对象，然后再进行回收未被标记的对象，回收后对用空出的空间要么进行合并，要么标记出来便于下次进行分配，总之就是要减少内存碎片带来的效率损耗。在执行机制上JVM提供了串行GC(SerialMSC)、并行GC(parallelMSC)和并发GC(CMS)，具体算法细节还有待进一步深入研究。

以上各种GC机制是需要组合使用的，指定方式由下表所示：

![](http://img-storage.qiniudn.com/15-8-17/3415893.jpg)
