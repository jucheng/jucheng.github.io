---
layout: post
title: "java使用JUnit进行测试"
categories: 编程学习
tags: [java,junit]
date: 2015-04-29 22:09:50
---

今天想用junit对Java进行单元测试，突然发现这么简单的方法都忘了，泪。。。赶紧记录一下吧。

### 1、导入Junit包

一般的Java编程IDE里面都自带有Junit包，如果没有的话，就到[这里](https://github.com/junit-team/junit/releases)下一个吧，之后导入。

<!-- more -->

### 2、需要测试的类

	{% highlight java %}
	import ExceptionDemo.DataException;
	
	public class Calculator {
	
	    public Calculator(){}
	
	    public float Add(float a,float b)
	    {
	        return a+b;
	    }
	
	    public float Subtract(float a,float b)
	    {
	        return a-b;
	    }
	
	    public float Multiply(float a,float b)
	    {
	        return a*b;
	    }
	
	    public float Divide(float a,float b )throws DataException
	    {
	        if(b == 0) {
	            throw new DataException("除数不能为0");
	        }
	        return a/b;
	    }
	
	}
	{% endhighlight %}

这里用了一个自定义的异常`DataException`,定义如下：

	{% highlight java %}
	public class DataException extends Exception {
	
	    String message;
	
	    public DataException(String arg_message)
	    {
	        message = arg_message;
	    }
	
	    public String getMessage()
	    {
	        return message;
	    }
	
	    public String toString()
	    {
	        return message;
	    }
	}
	{% endhighlight %}

### 3、开始测试

> 创建测试类`CalculatorTest`,如果每个测试之前或者之后需要做一些处理的时候可以使用`setUp()`和`tearDown`方法。这两个方法会在每个测试方法执行前后调用。当然不需要就不用了。  
> 每个测试方法必须以test开头，所以一般的方法命名都是用`test + 需要测试的方法名`，Juni会在整个测试类运行时自动运行以test开头命名的方法，如果有的方法我么不想让它自动运行，我们可以将命名改为非test开头的就行了。  
> 使用assert方法断言


	{% highlight java %}
	import ExceptionDemo.DataException;
	import junit.framework.TestCase;
	
	public class CalculatorTest extends TestCase {
	
	    Calculator cal = new Calculator();
	
	    //在“每个”测试方法执行之前被调用
	    public void setUp() {}
	
	    //在“每个”测试方法执行之后被调用
	    public void tearDown() {}
	
	    public void testAdd()
	    {
	        assertEquals(3f, cal.Add(1, 2));
	        System.out.println("测试加法成功");
	    }
	
	    public void testSubtract()
	    {
	        assertEquals(1f, cal.Subtract(4, 3));
	        System.out.println("测试减法成功");
	    }
	
	    public void testMultiply()
	    {
	        assertEquals(6f,cal.Multiply(2,3));
	        System.out.println("测试乘法成功");
	    }
	
	    public void testDivide() throws DataException {
	        assertEquals(4f,cal.Divide(8,2));
	        System.out.println("测试除法成功");
	    }
	
	    public void testDivide0(){
	        try {
	            cal.Divide(8, 0);
	        } catch (DataException e) {
	            assertEquals("除数不能为0",e.getMessage());
	        }
	    }
	}
	{% endhighlight %}

我们也能将所有的测试写到一个方法里面（为了避免有的方法自动运行，我们修改它的命名）

	{% highlight java %}
	import junit.framework.TestCase;
	
	public class CalculatorTest extends TestCase {
	
	    Calculator cal = new Calculator();
	
	    public void tAdd()
	    {
	        assertEquals(3f, cal.Add(1, 2));
	        System.out.println("测试加法成功");
	    }
	
	    public void tSubtract()
	    {
	        assertEquals(1f, cal.Subtract(4, 3));
	        System.out.println("测试减法成功");
	    }
	
	    public void testAll()
	    {
	        tAdd();
	        tSubtract();
	    }
	}
	{% endhighlight %}

不过如果某个断言结果是`错误`,那么整个测试会停止，并报告错误信息。假如`testA()`先运行，而且断言结果为`错误`，那么`tSubtract()`就不会继续运行了。