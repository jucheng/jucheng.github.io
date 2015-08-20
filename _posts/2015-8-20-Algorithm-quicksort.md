---
layout: post
title: " 快速排序(QuickSort)"
date: 2015-8-20
categories: 算法
tags: [算法]
---
快速排序(QuickSort)

<!-- more -->

###1、算法思想

快速排序是C.R.A.Hoare于1962年提出的一种划分交换排序。它采用了一种分治的策略，通常称其为分治法(Divide-and-ConquerMethod)。

####（1） 分治法的基本思想

 分治法的基本思想是：将原问题分解为若干个规模更小但结构与原问题相似的子问题。递归地解这些子问题，然后将这些子问题的解组合为原问题的解。

####（2）快速排序的基本思想

设当前待排序的无序区为R[low..high]，利用分治法可将快速排序的基本思想描述为：

####①分解： 

在R[low..high]中任选一个记录作为基准(Pivot)，以此基准将当前无序区划分为左、右两个较小的子区间R[low..pivotpos-1)和R[pivotpos+1..high]，并使左边子区间中所有记录的关键字均小于等于基准记录(不妨记为pivot)的关键字pivot.key，右边的子区间中所有记录的关键字均大于等于pivot.key，而基准记录pivot则位于正确的位置(pivotpos)上，它无须参加后续的排序。
  
####注意：

划分的关键是要求出基准记录所在的位置pivotpos。划分的结果可以简单地表示为
(注意pivot=R[pivotpos])：

    　R[low..pivotpos-1].keys≤R[pivotpos].key≤R[pivotpos+1..high].keys
                  其中low≤pivotpos≤high。
####②求解： 

通过递归调用快速排序对左、右子区间R[low..pivotpos-1]和R[pivotpos+1..high]快速排序。

####③组合： 

因为当"求解"步骤中的两个递归调用结束时，其左、右两个子区间已有序。对快速排序而言，"组合"步骤无须做什么，可看作是空操作。

###2、快速排序算法QuickSort

      void QuickSort(SeqList R，int low，int high)
     { //对R[low..high]快速排序
     int pivotpos； //划分后的基准记录的位置
     if(low<high){//仅当区间长度大于1时才须排序
        pivotpos=Partition(R，low，high)； //对R[low..high]做划分
        QuickSort(R，low，pivotpos-1)； //对左区间递归排序
        QuickSort(R，pivotpos+1，high)； //对右区间递归排序
      }
    } //QuickSort

注意：
    　
为排序整个文件，只须调用QuickSort(R，1，n)即可完成对R[l..n]的排序。

###3、划分算法Partition

####（1）简单的划分方法

####①具体做法

####第一步：

(初始化)设置两个指针i和j，它们的初值分别为区间的下界和上界，即i=low，i=high；选取无序区的第一个记录R[i](即R[low])作为基准记录，并将它保存在变量pivot中；

#####第二步：

令j自high起向左扫描，直到找到第1个关键字小于pivot.key的记录R[j]，将R[j])移至i所指的位置上，这相当于R[j]和基准R[i](即pivot)进行了交换，使关键字小于基准关键字pivot.key的记录移到了基准的左边，交换后R[j]中相当于是pivot；

然后，令i指针自i+1位置开始向右扫描，直至找到第1个关键字大于pivot.key的记录R[i]，将R[i]移到i所指的位置上，这相当于交换了R[i]和基准R[j]，使关键字大于基准关键字的记录移到了基准的右边，交换后R[i]中又相当于存放了pivot；

接着令指针j自位置j-1开始向左扫描，如此交替改变扫描方向，从两端各自往中间靠拢，直至i=j时，i便是基准pivot最终的位置，将pivot放在此位置上就完成了一次划分。

#####②一次划分过程

一次划分过程中，具体变化情况【参见动画演示
<http://student.zjzk.cn/course_ware/data_structure/web/flashhtml/kuaisupaixu.htm>】 

####③划分算法：
    int Partition(SeqList R，int i，int j)
    {//调用Partition(R，low，high)时，对R[low..high]做划分，
     //并返回基准记录的位置
      ReceType pivot=R[i]； //用区间的第1个记录作为基准 '
      while(i<j){ //从区间两端交替向中间扫描，直至i=j为止
        while(i<j&&R[j].key>=pivot.key) //pivot相当于在位置i上
          j--； //从右向左扫描，查找第1个关键字小于pivot.key的记录R[j]
        if(i<j) //表示找到的R[j]的关键字<pivot.key
            R[i++]=R[j]； //相当于交换R[i]和R[j]，交换后i指针加1
        while(i<j&&R[i].key<=pivot.key) //pivot相当于在位置j上
            i++； //从左向右扫描，查找第1个关键字大于pivot.key的记录R[i]
        if(i<j) //表示找到了R[i]，使R[i].key>pivot.key
            R[j--]=R[i]; //相当于交换R[i]和R[j]，交换后j指针减1
       } //endwhile
      R[i]=pivot； //基准记录已被最后定位
      return i；
    } //partition

###4、快速排序执行过程

快速排序执行的全过程可用递归树来描述。

![](http://img-storage.qiniudn.com/15-8-20/51620154.jpg)

![](http://img-storage.qiniudn.com/15-8-20/36449527.jpg)

![](http://img-storage.qiniudn.com/15-8-20/63661196.jpg)

析： 

####（1）递归执行的路线如图中带箭头的包络线所示。

####（2） 递归树上每一结点左旁方括号表示当前待排序的区间，结点内的关键字是划分的基准关键字
  
注意：
　   
 叶结点对应的子区间只有一个关键字，无须划分，故叶结点内没有基准关键字

####（3） 划分后得到的左、右两个子区间分别标在该结点的左、右两个孩子结点的左边方括号内。

【例】根结点左旁方括号[49，38，65，97，76，13，27，49]表示初始待排序的关键字，根内的49表示所选的划分基准记录的关键字，划分结果是[27，28，13]49[76，97，65，49_]，其左右子区间分别标在根结点的两个孩子的左边。

####（4） 每个分支结点右旁圆括号中的内容表示对该结点左旁区间的排序过程结束之后返回的结果。

它是其左右孩子对应的区间排序完成之后，将左右孩子对应的排序结果分别放在该分支结点的关键字前后所得到的关键字序列。

【例】分支结点76的左右孩子对应的区间排序后的结果分别是(49_，65)和(97)，将它们分别放在76的前后即得(49，65，76，97)，这是对结点76左旁区间[76，97，，65，49]排序的结果。
　    

####（5） 算法的执行顺序是递归树中的箭头顺序，实际上当把划分操作视为访问结点的操作时，快速排序的执行过程相当于是先序遍历其递归树。

注意：

任何递归算法均可用递归树来描述其执行过程。

###5、快速排序各次划分后的状态变化=

[49 38 65 97 76 13 27 49] //初始关键字

[27 38 13] 49 [76 97 65 49] //第1次划分完成之后，对应递归树第2层

[13] 27 [38] 49 [49 65] 76 [97] //对上一层各无序区划分完成后，对应递归树第3层

13 27 38 49 49 [65] 76 97 //对上一层各无序区划分完成后，对应递归树第4层

13 27 38 49 49 65 76 97 //最后的排序结果

###6、算法分析

快速排序的时间主要耗费在划分操作上，对长度为k的区间进行划分，共需k-1次关键字的比较。

####（1）最坏时间复杂度

最坏情况是每次划分选取的基准都是当前无序区中关键字最小(或最大)的记录，划分的结果是基准左边的子区间为空(或右边的子区间为空)，而划分所得的另一个非空的子区间中记录数目，仅仅比划分前的无序区中记录个数减少一个。

因此，快速排序必须做n-1次划分，第i次划分开始时区间长度为n-i+1，所需的比较次数为n-i(1≤i≤n-1)，故总的比较次数达到最大值：

               Cmax = n(n-1)/2=O(n2)

如果按上面给出的划分算法，每次取当前无序区的第1个记录为基准，那么当文件的记录已按递增序(或递减序)排列时，每次划分所取的基准就是当前无序区中关键字最小(或最大)的记录，则快速排序所需的比较次数反而最多。

####（2）最好时间复杂度

在最好情况下，每次划分所取的基准都是当前无序区的"中值"记录，划分的结果是基准的左、右两个无序子区间的长度大致相等。总的关键字比较次数：

        0(nlgn)
注意：

用递归树来分析最好情况下的比较次数更简单。因为每次划分后左、右子区间长度大致相等，故递归树的高度为O(lgn)，而递归树每一层上各结点所对应的划分过程中所需要的关键字比较次数总和不超过n，故整个排序过程所需要的关键字比较总次数C(n)=O(nlgn)。

因为快速排序的记录移动次数不大于比较的次数，所以快速排序的最坏时间复杂度应为0(n2)，最好时间复杂度为O(nlgn)。

####（3）基准关键字的选取
 
在当前无序区中选取划分的基准关键字是决定算法性能的关键。

####①"三者取中"的规则

"三者取中"规则，即在当前区间里，将该区间首、尾和中间位置上的关键字比较，取三者之中值所对应的记录作为基准，在划分开始前将该基准记录和该区伺的第1个记录进行交换，此后的划分过程与上面所给的Partition算法完全相同。

####②取位于low和high之间的随机数k(low≤k≤high)，用R[k]作为基准

选取基准最好的方法是用一个随机函数产生一个取位于low和high之间的随机数k(low≤k≤high)，用R[k]作为基准，这相当于强迫R[low..high]中的记录是随机分布的。用此方法所得到的快速排序一般称为随机的快速排序。具体算法【参见教材】

注意：

随机化的快速排序与一般的快速排序算法差别很小。但随机化后，算法的性能大大地提高了，尤其是对初始有序的文件，一般不可能导致最坏情况的发生。算法的随机化不仅仅适用于快速排序，也适用于其它需要数据随机分布的算法。

####（4）平均时间复杂度
 
**尽管快速排序的最坏时间为O(n2)，但就平均性能而言，它是基于关键字比较的内部排序算法中速度最快者**，快速排序亦因此而得名。它的平均时间复杂度为O(nlgn)。

####（5）空间复杂度
 
**快速排序在系统内部需要一个栈来实现递归。**若每次划分较为均匀，则其递归树的高度为O(lgn)，故递归后需栈空间为O(lgn)。最坏情况下，递归树的高度为O(n)，所需的栈空间为O(n)。

####（6）稳定性
 
**快速排序是非稳定的**，例如[2，2，1]。‘

本文转自<http://student.zjzk.cn/course_ware/data_structure/web/paixu/paixu8.3.2.1.htm>
