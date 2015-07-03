---
layout: post
title: "次方求模"
categories: 算法练习
date: 2015-03-21 19:37:55
tags: acm
---

# 次方求模

时间限制：1000 ms  |  内存限制：65535 KB | 难度：3  

### 描述

求a的b次方对c取余的值

<!-- more -->

### 输入

第一行输入一个整数n表示测试数据的组数（n<100）  
每组测试只有一行，其中有三个正整数a,b,c(1=<a,b,c<=1000000000)

### 输出

输出a的b次方对c取余之后的结果  

### 样例输入

	3
	2 3 5
	3 100 10
	11 12345 12345

### 样例输出

	3
	1
	10481

[南阳理工ACM题目-102：次方求模](http://acm.nyist.net/JudgeOnline/problem.php?pid=102)

	{% highlight c++ %}
	#include<iostream>
	using namespace std;
	
	long long PowUser(long long a, long long k, long long m)
	{
		long long rec = 1;
		while (k)
		{
			if (k & 1)rec =(rec* a)%m;
			a = (a*a)%m;
			k >>= 1; 
		}
		return rec;
	}
	
	int main()
	{
		long long a, b, c;
		int n;
		cin >> n;
		while (n--)
		{
			cin >> a >> b >> c;
			cout << PowUser(a, b, c) << endl;
		}
		return 0;
	}
	{% endhighlight %}


另外一个跟求模相关的题目[题目-205：求余数](http://acm.nyist.net/JudgeOnline/problem.php?pid=205)  

>现在给你一个自然数n，它的位数小于等于一百万，现在你要做的就是求出这个数除10003之后的余数（就是大数求模问题）

	{% highlight c++ %}
	#include<iostream>
	using namespace std;
	
	int main()
	{
		char num[1000001];
		int m,all;
		cin >> m;
		while (m--)
		{
			cin >> num;
			all  = 0;

			/*关键的解决方式*/
			for (int i = 0; i < 1000001; ++i)
			{
				if (num[i] == '\0')break;
				all = all*10+(num[i] - '0');
				all %= 10003;
			}

			cout << all << endl;
		}
		system("pause");
		return 0;
	}
	{% endhighlight %}
