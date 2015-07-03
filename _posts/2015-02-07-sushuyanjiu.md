---
layout: post
title: "素数算法"
categories: 算法练习
date: 2015-02-07 15:33:40
tags: 素数
---

素数在计算机中经常被运用于计算机安全（密码相关的计算），所以研究一下素数的判断算法是相当有必要的。所以现在就来看一下两种比较常见的算法，试除法和Eratosthenes算法吧！
<!-- more -->

#### 1、试除法

用需要验证的数 N 逐个除以从 2 开始至 N-1 中的所有数，若能被一个数整除，表示它有一个因数，说明数 N 不是素数；若一直到 N-1 都不能被整除，则说明 N 是素数。（当然我们对于因数的判断不必计算到 N-1,只需要到 <img src="http://latex.codecogs.com/svg.latex?\sqrt{N}" border="0"/> 就可以了）

	{% highlight java %}
	public class Prime {

    public static boolean IsPrime(int num){
        for(int i=2;i*i<=num;++i){
            if(num % i==0){
                return false;
            }
        }
        return true;
    }

    public static void Usual(int size){
        int index = 0;
        for(int j=2;j<=size;++j){
            if(IsPrime(j)){
                index++;
                System.out.print(j + " ");
                if(index%10==0) System.out.print('\n');
            }
        }
    }

	public static void main(String[] args) {
        Usual(10000);
    }
	}
	{% endhighlight %}

#### 2、Eratosthenes算法

Eratosthenes算法的实现，其实就像是一个筛子，每次过滤掉合数，最后剩下的就是素数了，例如：如果要找出2~10000之间所有素数的算法，可以先过滤调用 2 的倍数，再过滤掉 3 的倍数，依次再5,7,11,13...97 就是<img src="http://latex.codecogs.com/svg.latex?\sqrt{10000}" border="0"/>以内的所有素数。剩下的就都是素数了。

	{% highlight java %}
	public class Prime {

    public static void Eratosthenes(int size){
        boolean[] nums = new boolean[size];
        // false 代表是素数,默认是素数，关键的实现方式如下
        for(int i=2;i*i<size;++i){
            if(!nums[i]){
				//利用j+=i来判断倍数，这里从j从i*i开始
                for(int j=i*i;j<size;j+=i){
                    nums[j]=true;
                }
            }
        }
        int index = 0;
        for(int i=2;i<size;++i){
            if(!nums[i]){
                index++;
                System.out.print(i + " ");
                if(index%10==0) System.out.print('\n');
            }
        }

	public static void main(String[] args) {
        Usual(10000);
    }
    }
	{% endhighlight %}

两种方法测试1000000个数据中找素数，对比如下

	{% highlight java %}

	public class Prime {
	
	    public static boolean IsPrime(int num){
	        for(int i=2;i*i<=num;++i){
	            if(num % i==0){
	                return false;
	            }
	        }
	        return true;
	    }
	
	    public static void Usual(int size){
	        int length=0;
	        for(int j=2;j<=size;++j){
	            if(IsPrime(j)){length++;}
	        }
	        System.out.println(length);
	    }
	
	
	    public static void Eratosthenes(int size){
	        int length=0;
	        boolean[] nums = new boolean[size];
	        // false 代表是素数,默认是素数
	        for(int i=2;i*2<size;++i){
	            if(!nums[i]){
	                for(int j=i*2;j<size;j+=i){
	                    nums[j]=true;
	                }
	            }
	        }
	        for(int i=2;i<size;++i)if(!nums[i])length++;
	        System.out.println(length);
	    }
	
	
	    public static void main(String[] args) {
	        long last = System.currentTimeMillis();
	        Usual(1000000);
	        long now = System.currentTimeMillis();
	        System.out.println("TotalTime:"+(now-last));
	        last = now;
	        Eratosthenes(1000000);
	        now = System.currentTimeMillis();
	        System.out.println("TotalTime:"+(now-last));
	    }
	}
	{% endhighlight %}

结果：

	78498
	TotalTime:798
	78498
	TotalTime:127

显然，Eratosthenes算法效率高得多了。
