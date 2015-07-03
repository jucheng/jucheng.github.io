---
layout: post
title: "java回调"
categories: 编程学习
date: 2015-01-21
tags: [java,回调]
---

情境假设：现在有一个项目，除了一个比较难得算法没解决，其它的功能都完成，现在广征算法（仅管这假设有点水，就将就吧）。。。“其它的功能都完成了”就代表该算法的调用也执行了，这就有问题了，还没完成我们怎么调用？？其实我们可以选择抽象类，接口的方式，我们调用抽象基类，或者接口的方法就可以了。那如果程序员完成之后想知道完成的算法放在项目里面调用是不是可以的，怎么办？（我们不可能将整个项目让他看吧？），所以我们就可以利用回调的方式了。（这假设。。真是有点太水了，看demo吧，也许什么用处就可以自己利用了）

<!-- more -->

####1、首先定义接口

	{% highlight java %}
    public interface MyCallInterface {

    public void printName();
	}
	{% endhighlight %}

####2、实现回调的关键类（这里相当于已经完成的项目）

	{% highlight java %}
    public class Caller {

    //保存一个接口引用
    private MyCallInterface callInterface;

    //空的构造函数
    public Caller() {
    }

    public void setCallFunc(MyCallInterface callInterface) {
        this.callInterface = callInterface;
    }

    public void call() {
        callInterface.printName();
    }
	}
	{% endhighlight %}

####3、真正实现的代码（这里相当于要完成的算法），实际还是用到了接口

	{% highlight java %}
    public class Client implements MyCallInterface{

    public void printName() {

        System.out.println("实现接口定义的方法");
    }
	}
	{% endhighlight %}

####4、现在开始调用了（这种是非匿名的实现方式）

	{% highlight java %}
    public static void main(String[] args) {
        Caller caller = new Caller();
        caller.setCallFunc(new Client());
        caller.call();
    }
	{% endhighlight %}

####5、匿名的实现方式

	{% highlight java %}
    public static void main(String[] args) {

        Caller caller = new Caller();
        caller.setCallFunc(new MyCallInterface() {
            public void printName() {
                System.out.println("这是匿名类的实现方法");
            }
        });
        caller.call();
    }
	{% endhighlight %}

####6、更加常见的调用方式是这样的

	{% highlight java %}
    public class B implements MyCallInterface{

    public void printName(){
        System.out.println("常见的实现方法");
    }
    public static void main(String args[]){
     	Caller call=new Caller();
    	call.setCallfuc(this);
		caller.call();
    }
    }
	{% endhighlight %}

总结来说，java的回调其实就是让父类执行子类的方法。
