---
layout: post
title: "Tread类中的join方法的简单使用 "
date: 2016-9-1
categories: Java
tags: [Java，基础知识]
---
Tread类中的join方法的简单使用

<!-- more -->
在此之前，自己也不是很熟悉join（）的这个方法，不过现在既然看到了，就记录一下这个方法的作用。

简单一句话说，join（）方法就是使得异步执行的线程变成同步执行。也就是说，当调用线程实例的start方法后，这个方法会立即返回，如果在调用start方法后，需要使用一个由这个线程计算得到的值，就必须使用join方法。如果不使用join方法，就不能保证当执行到start方法后面的某条语句的时候，这个线程一定会执行完。但是使用了join方法之后，那么系统就会等调用join方法的这个线程退出之后，程序才会继续往下执行。

直接贴代码吧，感觉这样会更好理解一点：


    public class JoinThread extends Thread{
	
	public static int n=0;
	
	static synchronized void inc(){
		n++;
	}
	
	public void run (){
		for (int i = 0; i <10; i++) {
			try {
				inc();
				sleep(3);
				
			} catch (Exception e) {
				
			}
			
		}
	}
	

	public static void main(String[] args) {
		Thread threads[]=new Thread[100];
		for (int i = 0; i < threads.length; i++) 
			threads[i]=new JoinThread();
			for (int i = 0; i < threads.length; i++) 
				threads[i].start();
				for (int i = 0; i < threads.length; i++) 
					try {
						threads[i].join();
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				
				//这里是直接利用类名调用静态变量n,这个就是静态变量的作用
					System.out.println("n="+JoinThread.n);
				}
			
		}
		
在这个例子中建立了100个线程，每个线程使得静态变量n增加10，如果在这个100个线程都执行完后输出n，那么这个n的值应该是1000。

所以在这里我把运行结果分为两种情况：

1、未采用join（）方法的运行结果有很多种：

![](http://obzqtmk2d.bkt.clouddn.com/2.PNG)

![](http://obzqtmk2d.bkt.clouddn.com/3.PNG)

2、采用了join()方法的运行结果：

![](http://obzqtmk2d.bkt.clouddn.com/1.PNG)


假设你不用join方法的话，那么你在这个里的输出结果可能就有很多种了，而且这个运行的结果在不同的环境下会有些差异。但是一般n的值不会等于1000,因为，这100个线程可能并未都执行完就将n输出了。
	


