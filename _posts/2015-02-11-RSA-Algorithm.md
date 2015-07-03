---
layout: post
title: "RSA算法"
categories: 算法练习
date: 2015-02-11 11:25:56
tags: rsa
---

计算机中常见的加解密技术分为两类，即对称加密（加密和解密都使用相同的密钥key）和非对称加密（加密和解密使用不同的密钥key）。对于对称加密技术，实现比较简单，但是由于信息传送双方都要接触到这个key，所以密钥key更加容易泄露。  
而对于非对称加密（又称为公开密钥加密,就是RSA）中，不在只有一个一个密钥key了，而是有一对（一个公钥PK和密钥SK），传送过程使用PK，而解密使用密钥，相对来说更加安全。  
非对称加密的方式可以使通信双方无须事先交换密钥就可以建立安全通信，因此被广泛应用于身份认证，数字签名等信息交换领域。
<!-- more -->

###1、生成公钥和私钥

步骤如下：

> 1、随意选择两个比较大的素数 P 和 Q ，P 不等于Q  
> 2、将 P,Q两个素数相乘得到一个数 N,即N = PQ  
> 3、将 P,Q 分别减一，再相乘，得到一个数 T,即T = (P-1)(Q-1)  
> 4、选择一个整数 E,作为一个密钥，使 E与 T互质（即 E与 T的最大公约数为1），并且E必须小于T。  
> 5、根据公式DE mod T=1，计算出D的值，最为另外一个密钥。  
> 6、通过上面步骤计算出来的N,E，D这三个数据，其中的（N,E）作为公钥，（N,D） 作为私钥（当然这两者是可以互换的）。

生成公钥和私钥之后，发送方将公钥发送给另外一方，接收方接收到公钥之后使用用公钥对数据进行加密，再将数据放回原本的发送方，那么现在原本的发送方就可以将数据解密得到原本的数据了。

###2、用公钥（N,E）加密数据

>明文：M  
>加密：<img src="http://latex.codecogs.com/svg.latex?M^{E} mod N = C" border="0"/>     
>密文：C  

###2、用私钥（N,D）解密数据

>密文：C  
>加密：<img src="http://latex.codecogs.com/svg.latex?C^{D}mod N = M" border="0"/>   
>明文：M  

###3、具体的程序程序

为了计算的方便，我们取两个比较小的素数11和13来说明，即：

> P = 11  
> Q = 13  

	{% highlight java %}
	package Algorithm;
	public class RSA {

    private int N;
    private int E;
    private int D;

    public RSA(int P,int Q){
        N = P * Q;
        int T = (P-1) * (Q-1);
		//简单的互质方法，可以继续优化
        E  = T - 1;
        int i=0;
        while(true){
            if(((T * i) + 1) % E == 0){
                D = ((T * i) + 1) / E;
               break;
            }
            i++;
        }
    }

    public int addPassWord(int M){
        return Pow(M,E,N);
    }

    public int removePassWord(int C){
        return Pow(C,D,N);
    }

    private int Pow(int a,int b,int c){
        int rec = 1;
        for(int i=0;i<b;++i){
            rec = (rec * a) % c;
        }
        return rec;
    }

    public static void main(String[] args) {
        RSA rsa = new RSA(11,13);
        System.out.println("PK:(" + rsa.N + "," + rsa.E + ")");
        System.out.println("SK:(" + rsa.N + "," + rsa.D + ")");
        int M = 35;
        int C = rsa.addPassWord(M);
        System.out.println("密文：" + C);
        System.out.println("原文：" + rsa.removePassWord(C));
    }
	}
	{% endhighlight %}

当然这样的程序只能处理较小的数据，大数据时应该自己写大数据处理方法，来处理大数幂运算。
