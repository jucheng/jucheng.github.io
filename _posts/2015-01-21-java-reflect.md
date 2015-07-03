---
layout: post
title: "Java反射机制"
date: 2015-1-21
categories: 编程学习
tags: 反射
---

1、JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。(见[百度百科](http://baike.baidu.com/link?url=CZJ5OEZfwEm7bd7DgdH2I1khOlIOE5e939tt56wxMzf-U9WKvD9ofvukOMCiHIekfoRp48Z2gxjN3dQNg352rq))  

<!-- more -->

2、主要功能：Java反射机制主要提供了以下功能： 在运行时判断任意一个对象所属的类；在运行时构造任意一个类的对象；在运行时判断任意一个类所具有的成员变量和方法；在运行时调用任意一个对象的方法；生成动态代理。  

#### 1、通过类名，获取类具有的方法和属性

##### 首先，定义一个类用于后面的操作

	{% highlight java %}
	package ObjectDemo;

	public class Coordinate {

    private float x;
    private float y;
    private float z;

    public float threshold=0.001f;      //阙值

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getZ() {
        return z;
    }

    public void setZ(float z) {
        this.z = z;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

	//无参构造函数
    public Coordinate()
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    public Coordinate(float x,float y,float z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    //判断两个坐标是否相等
    private boolean isEqual(Coordinate other)
    {
        if(Math.abs(other.getX()-this.getX())>threshold)return false;
        if(Math.abs(other.getY()-this.getY())>threshold)return false;
        if(Math.abs(other.getZ()-this.getZ())>threshold)return false;
        return true;
    }

	//输出属性
    public void showThings()
    {
        System.out.println("X:"+x+" Y:"+y+" Z:"+z);
    }

	public void showThings(String name)
    {
        System.out.println(name+" X:"+x+" Y:"+y+" Z:"+z);
    }

	}
	{% endhighlight %}

##### 获取类的信息

	{% highlight java %}
    package ReflectDemo2;

	import java.lang.reflect.Field;
	import java.lang.reflect.Method;
	import java.lang.reflect.Modifier;
	import java.lang.reflect.Parameter;

	public class ClassDetail {

    private Class aClass;

    public ClassDetail(String className)
    {
        try {
            aClass = Class.forName(className);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    //获得方法的详细信息
    public void getMethodsDetail()
    {
        Method methods[]=aClass.getDeclaredMethods();
        for(Method method:methods)
        {
            //这里就可以利用Method类里的众多的get方法获得它的信息了
            System.out.print(Modifier.toString(method.getModifiers()));
            System.out.print(" " + method.getReturnType());
            System.out.print(" " + method.getName()+'(');
            Parameter parameters[] = method.getParameters();
            int length = parameters.length;
            if(length>0)
            {
                for (int i = 0; i < length - 1; ++i) {
                    System.out.print(parameters[i].getType() + " " + parameters[i].getName() + ",");
                }
                System.out.print(parameters[length - 1].getType() + " " + parameters[length - 1].getName());
            }
            System.out.print(")" + '\n');
        }
    }

    //获得属性的详细方法
    public void getFieldDetail()
    {
        //getDeclaredFields获得所有的属性，getFields获得非私有的
        Field fields[] = aClass.getDeclaredFields();
        for(Field field:fields)
        {
            System.out.println(Modifier.toString(field.getModifiers())+" "+field.getType()+" "+field.getName());
        }
    }
	}
	{% endhighlight %}

##### 调用
	
	{% highlight java %}
    public class RfMain {

    public static void main(String[] args) {

        ClassDetail detail = new ClassDetail("ObjectDemo.Coordinate");
        detail.getMethodsDetail();
        detail.getFieldDetail();
    }
	}
	{% endhighlight %}

输出结果

> private boolean isEqual(class ObjectDemo.Coordinate arg0)  
> public float getX()  
> public void setX(float arg0)  
> public float getY()  
> public void setY(float arg0)  
> public float getZ()  
> public void setZ(float arg0)  
> private float x  
> private float y  
> private float z  
> public float threshold  

#### 2、利用反射机制构造类对象，调用类的方法

#####无参数构造，无参数方法的调用
	
	{% highlight java %}
    public static void main(String[] args) { 
        try {
            Class cls = Class.forName("ObjectDemo.Coordinate");
            Object object = cls.newInstance();
            Method method = cls.getMethod("showThings");
            method.invoke(object);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	{% endhighlight %}

结果：  

>X:0.0 Y:0.0 Z:0.0

#####有参数构造，无参数方法的调用

	{% highlight java %}
    public static void main(String[] args) {
        try {
            Class cls = Class.forName("ObjectDemo.Coordinate");
            Constructor cons = cls.getConstructor(float.class,float.class,float.class);
            Object object = cons.newInstance(2,3,4);

            Method method = cls.getMethod("showThings");
            method.invoke(object);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	{% endhighlight %}

结果：  

>X:2.0 Y:3.0 Z:4.0

#####无参数构造，有参数方法的调用

	{% highlight java %}
    public static void main(String[] args) {
        try {
            Class cls = Class.forName("ObjectDemo.Coordinate");
            Object object = cls.newInstance();
            Method method = cls.getMethod("showThings",String.class);
            method.invoke(object, "Quincy say:");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	{% endhighlight %}

结果：  

>Quincy say: X:0.0 Y:0.0 Z:0.0

反射就学习到这里了，那它到底有什么用呢？呵呵！！！现在我们就来说一个它的应用吧,例如数据库操作，我们定义了一些和数据库的表结构相同的类，我们就可以利用反射机制生成sql语句，而且只要写一次，是不是很方便？