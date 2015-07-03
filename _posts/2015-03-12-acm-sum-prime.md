---
layout: post
title: "素数求和问题"
categories: 算法练习
date: 2015-03-12 23:23:06
tags: [素数,acm]
---

# 素数求和问题

时间限制：3000 ms  |  内存限制：65535 KB | 难度：2  

### 描述

现在给你N个数（0<N<1000），现在要求你写出一个程序，找出这N个数中的所有素数，并求和。

### 输入

第一行给出整数M(0<M<10)代表多少组测试数据
每组测试数据第一行给你N，代表该组测试数据的数量。
接下来的N个数为要测试的数据，每个数小于1000

### 输出

每组测试数据结果占一行，输出给出的测试数据的所有素数和  

<!-- more -->

### 样例输入

	3
	5
	1 2 3 4 5
	8
	11 12 13 14 15 16 17 18
	10
	21 22 23 24 25 26 27 28 29 30

### 样例输出

	10
	41
	52

[南阳理工ACM题目-22：素数求和问题](http://acm.nyist.net/JudgeOnline/problem.php?pid=22 "http://acm.nyist.net/JudgeOnline/problem.php?pid=22")

	{% highlight c++ %}
	#include<iostream>
	using namespace std;
	
	//素数打表
	bool IsPrime(int num){
		for (int i = 2; i*i <= num; ++i){
			if (num % i == 0){
				return false;
			}
		}
		return true;
	}
	
	//二分查找，找素数
	bool IsInPrime(int *prime,int h,int num)
	{
		int low = 0, high = h,mid;
		while (low<=high)
		{
			mid = (low + high) / 2;
			if (prime[mid] == num)return true;
			if (prime[mid] < num)low = mid + 1;
			else high = mid - 1;
		}
		return false;
	}
	
	int main()
	{
		int prime[168],index=-1;
		for (int i = 2; i < 1000; ++i)if (IsPrime(i))prime[++index] = i;
		int M, N,sum;
		cin >> M;
		while (M--)
		{
			cin >> N;
			int *num = new int[N];
			sum = 0;
			for (int i = 0; i < N; ++i)
			{
				cin >> num[i];
				if (IsInPrime(prime,index,num[i]))sum += num[i];
			}
			cout << sum << endl;
			delete []num;
	
		}
		system("pause");
		return 0;
	}
	{% endhighlight %}
