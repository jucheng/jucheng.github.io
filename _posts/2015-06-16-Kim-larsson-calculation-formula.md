---
layout: post
title: "基姆拉尔森计算公式"
categories: 编程学习
tags: 星期算法
date: 2015-06-16 19:09:33
---

### 1、根据日期计算对应的星期

利用`基姆拉尔森计算公式`,详情见 [百度百科](http://baike.baidu.com/link?url=tQ3ogPUKPc3xaJpavc_94RbeSomdoeaPF2n7opjLVQfn7H_8peSNRpeO_HG7r73HAYJZZHd4Bb6HvY7wdOAWZa)

<!-- more -->

### 2、c++实现如下

	{% highlight c++ %}
	#include <iostream>
	using namespace std;
	
	int main()
	{
		char *week[7] = {"星期日","星期一","星期二","星期三","星期四","星期五","星期六"};
		int y, m, d,t;
		while (cin >> y >> m >> d)
		{
			if (m <= 2)
			{
				m += 12;
				y--;
			}
			t = (d + 2 * m + 3 * (m + 1) / 5 + y + y / 4 - y / 100 + y / 400 + 1) % 7;
			cout << week[t] << endl;
		}
		//system("pause");
		return 0;
	}
	{% endhighlight %}
