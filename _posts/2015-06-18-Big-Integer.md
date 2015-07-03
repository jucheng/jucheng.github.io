---
layout: post
title: "大整数加法"
categories: 算法练习
tags: [acm,大整数]
date: 2015-06-18 16:22:42
---

时间限制：3000 ms  |  内存限制：65535 KB | 难度：3  

### 描述

I have a very simple problem for you. Given two integers A and B, your job is to calculate the Sum of A + B.

A,B must be positive.

<!-- more -->

### 输入

The first line of the input contains an integer T(1<=T<=20) which means the number of test cases. Then T lines follow, each line consists of two positive integers, A and B. Notice that the integers are very large, that means you should not process them by using 32-bit integer. You may assume the length of each integer will not exceed 1000.

### 输出

For each test case, you should output two lines. The first line is "Case #:", # means the number of the test case. The second line is the an equation "A + B = Sum", Sum means the result of A + B. Note there are some spaces int the equation.

### 样例输入

	2
	1 2
	112233445566778899 998877665544332211

### 样例输出

	Case 1:
	1 + 2 = 3
	Case 2:
	112233445566778899 + 998877665544332211 = 1111111111111111110

[南阳理工ACM题目-103：A+B Problem II](http://acm.nyist.net/JudgeOnline/problem.php?pid=103)

	{% highlight c++ %}
	#include <iostream>
	#include <string>
	using namespace std;
	
	int main()
	{
		char str[1002];
		string str1,str2,ts;
		int n,a,b,k,id,m=1;
		cin >> n;
		while (n--)
		{
			cin >> str1 >> str2;
			k = id = 0;
			cout << "Case " << m ++ << ":" << endl << str1 << " + " << str2 << " = ";
			if (str1.length() < str2.length())
			{
				ts = str1;
				str1 = str2;
				str2 = ts;
			}
			a = str1.length();
			b = str2.length();
			for (int i = a-1,j=b-1; j>=0; --i,--j)
			{
				k = (str1[i] - '0') + (str2[j] - '0') + k;
				str[id++] = k % 10;
				k /= 10;
			}
			for (int i = a - b - 1; i >= 0; --i)
			{
				k = (str1[i] - '0') + k;
				str[id++] = k % 10;
				k /= 10;
			}
			if (k > 0)cout << k;
			for (int i = id - 1; i >= 0; --i)
			{
				cout << char(str[i] + '0');
			}
			cout << endl;
		}
		//system("pause");
		return 0;
	}
	{% endhighlight %}
