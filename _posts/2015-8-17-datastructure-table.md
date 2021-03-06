---
layout: post
title: " 散列函数的构造方法 "
date: 2015-8-18
categories: 数据结构
tags: [数据结构]
---
散列函数的构造方法

<!-- more -->


好的散列函数要求：
（1）计算简单，至少散列函数的计算时间不应该超过其他查找技术与关键字比较的时间；

（2）计算出的散列地址分布均匀，这样可以保证存储空间的有效利用，并减少为处理冲突而耗费的时间。

### 1.直接定址法

取关键字或关键字的某个线性函数值为散列地址。即H(key)=key或H(key) = a·key + b，其中a和b为常数（这种散列函数叫做自身函数）。

### 2.数字分析法

假设某公司的员工登记表以员工的手机号作为关键字。手机号一共11位。前3位是接入号，对应不同运营商的子品牌；中间4位表示归属地；最后4位是用户号。不同手机号前7位相同的可能性很大，所以可以选择后4位作为散列地址，或者对后4位反转（1234 -> 4321）、循环右移（1234 -> 4123）、循环左移等等之后作为散列地址。

数字分析法通常适合处理关键字位数比较大的情况，如果事先知道关键字的分布且关键字的若干位分布比较均匀，就可以考虑这个方法。

### 3.平方取中法

假设关键字是1234、平方之后是1522756、再抽取中间3位227，用作散列地址。平方取中法比较适合于不知道关键字的分布，而位数又不是很大的情况。

### 4.折叠法

将关键字从左到右分割成位数相等的几部分，最后一部分位数不够时可以短些，然后将这几部分叠加求和，并按散列表表长，取后几位作为散列地址。

比如关键字是9876543210，散列表表长是3位，将其分为四组，然后叠加求和：987 + 654 + 321 + 0 = 1962，取后3位962作为散列地址。

折叠法事先不需要知道关键字的分布，适合关键字位数较多的情况。

### 5.除留余数法

f(key) = key mod p (p≤m)，m为散列表长。这种方法不仅可以对关键字直接取模，也可在折叠、平方取中后再取模。根据经验，若散列表表长为m，通常p为小于或等于表长（最好接近m）的最小质数，可以更好的减小冲突。

此方法为最常用的构造散列函数方法。

### 6.随机数法

f(key) = random(key)，这里random是随机函数。当关键字的长度不等时，采用这个方法构造散列函数是比较合适的。

实际应用中，应该视不同的情况采用不同的散列函数。如果关键字是英文字符、中文字符、各种各样的符号，都可以转换为某种数字来处理，比如其unicode编码。下面这些因素可以作为选取散列函数的参考：
（1）计算散列地址所需的时间；
（2）关键字长度；
（3）散列表大小；
（4）关键字的分布情况；
（5）查找记录的频率。