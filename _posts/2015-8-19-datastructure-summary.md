---
layout: post
title: "阿里巴巴2014秋季校园招聘-软件研发工程师笔试题 "
date: 2015-8-19
categories: 数据结构
tags: [数据结构，综合]
---
阿里巴巴2014秋季校园招聘-软件研发工程师笔试题

<!-- more -->

####1.假设把整数关键码K散列到N个槽列表，以下哪些散列函数是好的散列函数

          A: h(K)=K/N;

          B: h(K)=1;

          C: h(K)=K mod N;

          D: h(K)=(K+rand(N)) mod N, rand(N)返回0到N-1的整数

(

首先，D最复杂，当然首选D。。

**D选项使用的是随机数法+除留余数法。**

**开放地扯法**： 公式 Hi=(H(key)+di) MOD m i=1,2,...,k(k<=m-1）  其中，m为哈希表的表长。di 是产生冲突的时候的增量序列 

**再哈希法**：设计二种甚至多种哈希函数，可以避免冲突，但是冲突几率还是有的。

**链地址法**：拉出一个动态链表代替静态顺序存储结构，可以避免哈希函数的冲突，不过缺点就是链表的设计过于麻烦，增加了编程复杂度。此法可以完全避免哈希函数的冲突。 

建立一个公共溢出区
）

####2.下面排序算法中，初始数据集的排列顺序对算法的性能无影响的是：

A: 堆排序 B：插入排序

C: 冒泡排序 D:快速排序

答案:A

**解析：**     

  ![](http://img-storage.qiniudn.com/15-8-18/22045532.jpg)
       
**若序列事先已经基本有序，则插入法和冒泡法会明显减少比较次数，快速排序法与主元的选择有关，若一般选子序列左侧第一个元素比较，则第一个元素最好是大小居中的，以使得分成的两个子数组长度大致相等，性能才能最佳，所以快速排序也与初始输入集有关的。堆排序受数据集输入顺序影响最小。**

####3.下面说法错误的是：

A: CISC计算机比RISC计算机指令多

B: 在指令格式中，采用扩展操作码设计方案的目的是为了保持指令字长不变而增加寻址空间

C:增加流水线段数理论上可以提高CPU频率

D:冯诺依曼体系结构的主要特征是存储程序的工作方式

参考答案：B

**A：RISC设计原则：指令条数尽可能少，一般为几十条指令；寻址方式尽可能少；采用等长指令，不管功能复杂的还是简单的指令，均用同一长度；设计尽可能多的通用寄存器**

**B：在指令格式中，采用扩展操作码设计方案的目的是为了保持指令字长不变而增加指令操作的数量**

**C：流水线设计可最大限度地利用了CPU资源，使每个部件在每个时钟周期都在工作，从而提高了CPU的运算频率。CPU采用级数更多的流水线设计可使它在同一时间段内处理更多的指令，有效提高其运行频率。**

**解释：指令操作码分为三种：定长操作码，霍夫曼操作码和扩展操作码，采用扩展操作码可以使得指令字长不变的情况下，尽可能多的表示更多的指令。**

####4.不属于冯诺依曼体系结构必要组成部分是：

A:CPU  B: Cache  C:RAM  D:ROM

**参考答案：应该是选cache**

![](http://img-storage.qiniudn.com/15-8-18/70028732.jpg)

####5.一个栈的入栈序列式ABCDE则不可能的出栈序列是:

A:DECBA  B:DCEBA  C:ECDBA  D:ABCDE

参考答案：C

解析：C答案主要是错在C不可能比D先出栈

####6.你认为可以完成编写一个C语言编译器的语言是：

A：汇编 B:C语言 C:VB D:以上全可以

参考答案：D

**我认为选D，编译器的目的就是把编程语言编译成为汇编语言或者机器语言，主要是词法分析，语法分析，语义分析，编译原理这门课程的时候曾经用c语言实现过编译器的部分功能，而设想没有c语言，那么第一c程序跑起来的编译器肯定用汇编语言写的，所以应该是全部。**

####7.关于C++/JAVA类中的static成员和对象成员的说法正确的是：

A：static成员变量在对象构造时候生成

B: static成员函数在对象成员函数中无法调用

C: 虚成员函数不可能是static成员函数

D: static成员函数不能访问static成员变量

参考答案：C

解析：

 A：static成员变量在类的定义时初始化，不可以在对象的构造函数中初始化

 B：static成员函数在对象成员函数中可以调用，同属于一个类作用域

 C：static成员函数不可以声明为const和virtual

 D：static成员函数只能访问static成员变量

注释：

**虚函数（virtual）为啥不能是static？，请看以下解释：**

**静态成员函数，可以不通过对象来调用，即没有隐藏的this指针。**

**virtual函数一定要通过对象来调用，即有隐藏的this指针。**

**static成员没有this指针是关键！**

**static function都是静态决议的（编译的时候就绑定了）**

**而virtual function 是动态决议的（运行时候才绑定）**

####8.
![](http://img-storage.qiniudn.com/15-8-18/23780196.jpg)

参考答案是：13条

**（解析：**
**可以用数列组合，A-Z可以看成：横走4格，竖走2格，则最短路径：C6 2或C6 4 = 15 ，由于整个四方形有两个缺口，所以减去2 ，结果为15-2 = 13.**

**这种解法很容易理解！！！！**
）

####9：某进程在运行过程中需要等待从磁盘上读入数据，此时进程的状态将：

A: 从就绪变为运行  B:从运行变为就绪

C: 从运行变为阻塞  D:从阻塞变为就绪

参考答案：c 

解析：

**三态模型：在多道程序系统中，进程在处理器上交替运行，状态也不断地发生变化。进程一般有3种基本状态：运行、就绪和阻塞。**

**（1）运行：当一个进程在处理机上运行时，则称该进程处于运行状态。处于此状态的进程的数目小于等于处理器的数目，对于单处理机系统，处于运行状态的进程只有一个。在没有其他进程可以执行时（如所有进程都在阻塞状态），通常会自动执行系统的空闲进程。**

**（2）就绪：当一个进程获得了除处理机以外的一切所需资源，一旦得到处理机即可运行，则称此进程处于就绪状态。就绪进程可以按多个优先级来划分队列。例如，当一个进程由于时间片用完而进入就绪状态时，排入低优先级队列；当进程由I／O操作完成而进入就绪状态时，排入高优先级队列。**

**（3）阻塞：也称为等待或睡眠状态，一个进程正在等待某一事件发生（例如请求I/O而等待I/O完成等）而暂时停止运行，这时即使把处理机分配给进程也无法运行，故称该进程处于阻塞状态。**

![](http://img-storage.qiniudn.com/15-8-18/86849086.jpg)

####10：下面算法的时间复杂度为：

Int f(unsigned int n)
{

If(n==0||n==1)

Return 1;

Else 

Return n*f(n-1);

}

A: O(1)   B:O(n)  C:O(N*N)  D:O(n!)

参考答案：B

**解析：做了n次乘法，时间复杂度为O(n)**


####11: n从1开始，每个操作可以选择对n加1或者对n加倍。若想获得整数2013，最少需要多少个操作。

A:18    B:24   C:21  D；不可能

参考答案： A；

**正向只能是+1和×2，所以逆向只能-1和/2，由以下过程可得18次**

**18个完美解决，方法也很简单，尽量对2013用除法，显示2013->2012->1006->503->502->251->250->125->124->62->31->30->15->14->7->6->3->2->1**


####12：对于一个具有n个顶点的无向图，若采用邻接表数据结构表示，则存放表头节点的数组大小为：

A: n  B: n+1    C: n-1   D:n+边数

参考答案：A 

图的邻接表表示:

![](http://img-storage.qiniudn.com/15-8-18/69143950.jpg)

####13.
![](http://img-storage.qiniudn.com/15-8-18/87250450.jpg)

参考答案： 

**对于几何中的每个字符串取hash可以看作是同分布的独立重复事件，所以每一个事件出现10的概率都是p=1/1024，那么当出现的时候，期望的次数就是1/p，1024.**

####14：如下函数，在32bit系统foo(2^31-3)的值是：

Int foo(int x)
{

Return x&-x;

}

A： 0   B: 1  C:2  D:4

参考答案：C，首先-号比^的优先级高，所以实参应该是2^28，而C++中并没有幂指数的运算符，这个^只表示异或运算，所以实参的二进制值，

x的值为  0000 0000， 0000 0000， 0000 0000，0000 0010

-x 的值为 1111 1111， 1111 1111， 1111 1111， 1111 1110

 x&-x; 0000 0000， 0000 0000， 0000 0000，0000 0010

即为2。

所以答案为C


####15：对于顺序存储的线性数组，访问节点和增加节点删除节点的时间复杂度为：

A: O(n),O(n) B:O(n),O(1) C:O(1),O(n) D:O(n),O(n)

参考答案：C



####16:在32为系统环境，编译选项为4字节对齐，那么sizeof(A)和sizeof(B)是：

Struct A
{

Int a;short b;int c;char d;

};

Struct B
{int a;short b;char c;int c;};

A: 16,16    B:13,12   C:16,12 D:11,16

参考答案：C
内存对齐，B中b和c占用一个4字节，A中b和c各占一个4字节。

![](http://img-storage.qiniudn.com/15-8-19/64069678.jpg)


####17:袋中有红球，黄球，白球各一个，每次任意取一个放回，如此连续3次，则下列事件中概率是8/9的是：

A: 颜色不全相同 B:颜色全不相同C:颜色全相同D:颜色无红色

参考答案：A

解释：由于颜色任一颜色相同的概率为1/27

颜色无红色的概率为2/3×2/3×2/3=8/27

颜色全部相同的概率为1/9

颜色都不同，概率为3×1/3×2×1/3×1/3=2/9

颜色不全相同为8/9

 

####18：一个洗牌程序的功能是将n张牌的顺序打乱，以下关于洗牌程序的功能定义说法最恰当的是：

A: 每张牌出现在n个位置上的概率相等

B: 每张牌出现在n个位置上的概率独立

C: 任何连续位置上的两张牌的内容独立

D: n张牌的任何两个不同排列出现的概率相等

参考答案：A

解释，创新工场笔试题让设计一个shuffle算法的时候就是特意提到，每张牌出现在任意位置的概率相等。


####19：用两种颜色去染排成一个圈的6个棋子，如果通过旋转得到则只算一种，一共有多少种染色：

A: 10 B:11 C:14: D:15

参考答案：C

解释：应该有14种方案，设只有黑白两色，默认白色，那么，用p（n）表示有n个黑棋的种类

p（0）=p（6）=1

p（1）=p（5）=1

p（2）=p（4）=3 //相邻的一种，隔一个的一种，两个的一种

p（3）=4 //都相邻的一种，BB0B的一种，BB00B的一种，B0B0B的一种，一共4种

综上是14种



####20：递归式的先序遍历一个n节点，深度为d的二叉树，则需要栈空间的大小为：

A: O(n) B:O(d)  C:O(logn)  D:(nlogn)

参考答案：B 

解释：因为二叉树并不一定是平衡的，也就是深度d！=logn，有可能d》》logn。。所以栈大小应该是O（d）
    根节点访问到叶子节点后就回溯了。所以所需要栈的最大空间为树的深度。



第二部分：多选

####21：两个线程运行在双核机器上，每个线程主线程如下，线程1：x=1;r1=y;线程2：y=1;r2=x;

####X和y是全局变量，初始为0。以下哪一个是r1和r2的可能值：

A: r1=1,r2=1

B: r1=1,r2=0

C:r1=0,r2=0

D:r1=0,r2=1

参考答案：ABD

**（解析：语句执行顺序组合，但是线程内的子句顺序不可变。）**

####22.关于Linux系统的负载，以下表述正确的是：

A: 通过就绪和运行的进程数来反映

B: 通过TOP命令查看

C: 通过uptime查看

D: Load:2.5,1.3,1.1表示系统的负载压力在逐渐变小

参考答案：BC

**(详情请看自己的那篇博客）**

####23：关于排序算法的以下说法，错误的是：

A: 快速排序的平均时间复杂度O(nlogn),最坏O(N^2)

B:堆排序平均时间复杂度O(nlogn)，最坏O(nlogn)

C:冒泡排序平均时间复杂度O(n^2),最坏O(n^2)

D:归并排序的平均时间复杂度O(nlogn),最坏O(n^2)

答案： D
 ![](http://img-storage.qiniudn.com/15-8-18/22045532.jpg)


####24:假设函数rand_k会随机返回一个【1，k】之间的随机数（k>=2）,并且每个证书出现的概率相等。目前有rand_7,通过调用rand_7（）和四则运算符，并适当增加逻辑判断和循环控制逻辑，下列函数可以实现的有：

A:rand_3 B:rand_21  C:rand_23  D:rand_47

 参考答案：ABCD

解释，对于rand_x（x<7）的直接截断，只要rand数大于x直接忽略，保证rand_x能够做到概率相等。而对于其他的则采用7×rand_7+rand_7，可以-7得到rand_49，然后截断成rand_42，统一除以2，则是rand_21，其他类似。多谢@plylw456 提醒。

鉴于大家对这道题的解释看得不太清，我就在此展开解释一下：

首先分析：7×rand_7+rand_7

1.首先它是由两个随机变量组成，亦即7X+Y，只不过X与Y是独立同分布的而已，所以上式子表示为Z=7X+Y

那么对于随机变量X，你可以理解为它是一个“量级”的概念，X取值为1～7

当X=1时，随机变量Z取值范围是1*7+(1~7)，也就是8～14

当X=2时，随机变量Z取值范围是2*7+(1~7)，也就是15～21

当X=3时，随机变量Z取值范围是3*7+(1~7)，也就是22～28

以此类推。。。

可以产生8～56的随机数。

那么产生的8～56的随机数，概率都相等吗？

答案是必然的，因为X是量级的概念，达到每个量级的概率是1/7，在量级内，Y达到1～7每个数的概率依然是1/7，所以8～56的每个数的概率都是1/49

好了我们可以得到1/49等概率的8～56，直接在生产的时候-7，得到等概率1/49的1～49.。。。。

好，现在只需要记住，得到rand_49，1～49的每个数都是等概率的就可以了，因为我们要截断，也就是说，为了得到rand_23直接截断，判断输出如果>23，直接忽略，否则输出，大家可能有点别扭，因为有的随机数生成的时候可能时间上要比其他的长点。但是要记住，1～23每个数输出的概率都是相等的，只不过不能保证每次输出时间都分秒不差而已。时间长短是跟概率无关的概念。


###25.如果让你来测试淘宝站内的搜索系统，请问你能想到哪些方法来进行测试？

**答：**
####一. 功能测试

**1.输入关键字，查看: 返回结果是否准确，返回的文本长度需限制**
 
**2.结果显示：标题，卖家，销售量。。。。单行/多行，是否有图片。**
 
**3.结果排序：价格 销量 评价 综合。。。**

**4.返回结果庞大时，限制第一页的现实量，需支持翻页**

**5.多选项搜索：关键字  品牌 产地 价格区间  是否天猫 是否全国购。。**
  
**6.是否支持模糊搜索，支持通配符的查询**
 
**7.网速慢的情况下的搜索**

**8.搜索结果为空的情况**

**9.未登录情况和登录情况下的搜索（登录情况下 存储用户搜索的关键字/搜索习惯）**

####二.性能测试：

**1.响应时间，并发量**

**2.手机考虑单次搜索的流量，CPU，内存 耗电量**

####三. 兼容性

**windows/ Mac /Iphone/ Android, 不同浏览器下**


**另外的答案也可以参考：**

**输入关键词，看能否进行搜索，如果可以进行搜索，看检索出来的内容是否包含关键词，如果包含关键词，单击具体的内容，看是否能进入相应的网站；输入非法的关键词，看能否进行检索**