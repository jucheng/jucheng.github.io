---
layout: post
title: "java线程"
categories: 编程学习
date: 2015-01-23 14:41:42
tags: 多线程
---

java线程学习

####1、线程的创建
java的创建线程的方式有两种

>1、继承Thread，重载他的run方法  
>2、实现Runnable接口的run方法  

<!-- more -->

##### 方法一：

	{% highlight java %}
	public class Thread1 extends Thread{

    @Override
    public void run() {
        System.out.println("线程"+this.getName()+"开始了");
        for (int i = 0; i < 5; i++) {
            System.out.println(this.getName() + ":" + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("线程"+this.getName()+"结束了");
    }
	}
	{% endhighlight %}

##### 方法二：

	{% highlight java %}
	public class Thread2 implements Runnable {

    @Override
    public void run() {
        System.out.println("线程"+Thread.currentThread().getName()+"开始了");
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ":" + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("线程"+Thread.currentThread().getName()+"结束了");
    }
	}
	{% endhighlight %}

####2、线程的调用

##### start()函数之后在Thread类内部才有

	{% highlight java %}
	public class ThreadJ {

    public static void main(String[] args) {
        new Thread1().start();
        new Thread1().start();

		//或者
		//Thread2 thread2 = new Thread2();
        //new Thread(thread2,"线程1").start();
        //new Thread(thread2,"线程2").start();
    }
	}
	{% endhighlight %}

程序结果之一：

>线程Thread-1开始了  
>线程Thread-0开始了  
>Thread-0:0  
>Thread-1:0  
>Thread-0:1  
>Thread-1:1  
>Thread-0:2  
>Thread-1:2  
>Thread-0:3  
>Thread-1:3  
>Thread-0:4  
>Thread-1:4  
>线程Thread-0结束了  
>线程Thread-1结束了  

##### 所以通用的线程调用可以是这样的

	{% highlight java %}
	public class ThreadJ {

    public static void main(String[] args) {
        Thread1 thread1 = new Thread1();
        Thread t1 = new Thread(thread1);
        t1.start();

        Thread2 thread2 = new Thread2();
        Thread t2 = new Thread(thread2);
        t2.start();
    }
	}
	{% endhighlight %}

结果与上面的差不多  

##### 为一个线程的类创建多个线程对象也是可以的

	{% highlight java %}
	public class ThreadJ {

    public static void main(String[] args) {
		//这里换成Thread2也是一样的
        Thread1 thread1 = new Thread1();
        //下面创建的了两个线程都是Thread1的实例
        Thread t1 = new Thread(thread1);
        Thread t2 = new Thread(thread1);
        t1.start();
        t2.start();
    }
	}
	{% endhighlight %}

####3、多线程的应用

#####1、售票系统

定义售票线程

	{% highlight java %}
	public class Thread1 extends Thread{

    private int tickets = 10;

    @Override
    public void run() {
        while(tickets>0){
            System.out.println(Thread.currentThread().getName() +":"+tickets--);
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
	}
	{% endhighlight %}

售票程序：

	{% highlight java %}
	public class ThreadJ {

    public static void main(String[] args) {
        Thread1 thread1 = new Thread1();
        new Thread(thread1,"1号").start();
        new Thread(thread1,"2号").start();
        new Thread(thread1,"3号").start();
    }
	}
	{% endhighlight %}

结果：

>3号:10  
>2号:9  
>1号:8  
>3号:7  
>2号:6  
>1号:5  
>1号:4  
>2号:3  
>3号:2  
>1号:1  

####4、线程锁
当多个线程同时对一个资源进行写操作时，会出现访问冲突，这种情况是多线程操作中经常出现的问题。为了避免情况的出现，我们可以考虑对进程进行加锁。  

	{% highlight java %}
	public class MyThread implements Runnable{
    private int threadId;
    private Object lock;		//这个当做锁
    public MyThread(int id, Object obj)
    {
        this.threadId = id;
        this.lock = obj;
    }

    public  void run() {
		//对运行得到整个过程进行加锁，结束整个循环释放锁
        synchronized(lock) {
            for (int i = 0; i < 3; ++i) {
				//synchronized(lock) {}如果在这里加锁，每次循环开始获得锁，循环结束都会释放锁
                System.out.println("Thread ID: " + this.threadId + " : " + i);
            }
        }
    }
	}
	{% endhighlight %}

将锁对象传入到线程中

	{% highlight java %}
	public static void main(String[] args) throws InterruptedException
    {
        Object lock = new Object();
        for (int i = 0; i < 5; ++i)
        {
            new Thread(new MyThread(i, lock)).start();
            Thread.sleep(1);
        }
    }
	{% endhighlight %}

运行结果：

>Thread ID: 1 : 0  
Thread ID: 1 : 1  
Thread ID: 1 : 2  
Thread ID: 0 : 0  
Thread ID: 0 : 1  
Thread ID: 0 : 2  
Thread ID: 3 : 0  
Thread ID: 3 : 1  
Thread ID: 3 : 2  
Thread ID: 4 : 0  
Thread ID: 4 : 1  
Thread ID: 4 : 2  
Thread ID: 2 : 0  
Thread ID: 2 : 1  
Thread ID: 2 : 2  

也可以为线程类设置一个静态的变量，作为线程锁。


####4、线程池
我们可以对自己定义的线程进行统一的管理，同时限制每次运行线程的数量，这时我们可以采用线程池来进行处理

	{% highlight java %}
	public static void main(String[] args) {
        //ExecutorService threadPool = Executors.newSingleThreadExecutor();//实现的是单线程池

        //设置线程池的数量为2，次每次只能有两个进程可以被同时调用
        ExecutorService threadPool = Executors.newFixedThreadPool(2);
        Thread1 t1 = new Thread1();
        Thread1 t2 = new Thread1();
        Thread1 t3 = new Thread1();
        threadPool.execute(t1);
        threadPool.execute(t2);
        threadPool.execute(t3);

        //shutdown只是将线程池置于关闭状态，不接受新任务，对正在运行的任务不影响。
        threadPool.shutdown();
        //shutdownNow，才会阻止等待任务启动并试图停止当前正在执行的任务
        //threadPool.shutdownNow();
    }
	{% endhighlight %}