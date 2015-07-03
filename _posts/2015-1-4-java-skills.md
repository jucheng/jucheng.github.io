---
layout: post
title: "Java常用的功能和技巧"
date: 2015-1-19
categories: java
---

记录java使用过程中一些比较常用的功能或者技巧

<!-- more -->

#### 1、不定参数
当一个函数的参数的数量不是确定的时候，我们可以将一个函数的参数设置为不定参数。不定参数使用时有两个必须遵守的规定

> 第一，方法的参数列表中最多只有一个不定长度的参数  
> 第二，就是不定长度的数组的位置必须是最后一个参数。不然不能通过编译

下面是一个求和的例子：

	{% highlight java %}
    public void Sum(int... arg_n)
    {
        int sum = 0;
        for(int i:arg_n)sum += i;
        System.out.println("求和得到结果为:"+sum+" 参数个数为"+arg_n.length);
    }
	{% endhighlight %}

#### 2、随机数

我们很多时候都会用到随机数，所以随机数的产生也是经常要用到的。
	
	{% highlight java %}
    //方法1:使用Math.random生成从0到num的数
    public void RandomNum1(int num)
    {
        for(int i=0;i<10;++i)
        {
            System.out.println((int)(num*Math.random()));
        }
    }
	
	//方法二：使用 import java.util.Random,生成-num到num的随机数(num为正数)
	public void RandomNum2(int num) {
        Random random = new Random();
        for (int i = 0; i < 10; ++i) {
            System.out.printf("%d ", random.nextInt() % num);
        }
    }
	//带种子的随机数生成器，如果种子相同，最后生成的随机数都是相同的
	//即使用下面的方法产生随机数，每次执行产生的随机序列都是一样的
	public void RandomNum2(int num) {
		Random random3 = new Random(100);
        for(int i=0;i<10;++i)
        {
            System.out.printf("%d ", random3.nextInt() % num);
        }
	}
	{% endhighlight %}

#### 3、java键盘输入
		
	 {% highlight java %}
     Scanner sc = new Scanner(System.in);
     System.out.printf("从键盘上输入的字符串%s\n",sc.nextLine());
	 {% endhighlight %}

#### 4、正则表达式
对于一些需要特定格式的数据，提前使用正则表达式进行验证再处理，是很有必要的，下面是正则表达式的使用Demo。提前说明，正则表达式的强大之处还不仅仅如此。呵呵。。

	{% highlight java %}
	//整数或小数
    public boolean IntegerOrdecimal(String str)
    {
        if (str.matches("^[0-9]+\\.{0,1}[0-9]{0,2}$"))
        {
            System.out.println(str+" 属于整数或小数");
            return true;
        }
        else
        {
            System.out.println(str+" 不属于整数或小数");
            return false;
        }
    }

    //只能是数字
    public boolean Number(String str)
    {
        if (str.matches("^[0-9]*$"))
        {
            System.out.println(str+" 只是数字");
            return true;
        }
        else
        {
            System.out.println(str+" 不只是数字");
            return false;
        }
    }
	{% endhighlight %}

#### 5、抽象类
定义抽象类，抽象类不能实例化（就是不能new），只能被继承，子类必须实现抽象类里面的抽象方法（继承我的类就要实现我要的方法，仅管你可能实现错了）。  

##### 父类定义如下：
	
	{% highlight java %}
	abstract class Animal {

    String   name;
    public Animal(String name){        //非抽象方法

        this.name=name;
    }
    public void getName(){            //非抽象方法
        System.out.println("Animal's name is"+name);

    }
    //子类必须实现这个
    public abstract void  move();     //抽象方法，用abstract 修饰
	}
	{% endhighlight %}

##### 子类：
	
	{% highlight java %}
	public class Dog extends Animal {

    private int age;

    public Dog(String name,int age) {
        super(name);
        this.age = age;
    }

	//子类必须实现这个方法
    @Override
    public void move() {
        System.out.println("Dog  is running!");
    }

	//当然也可以添加自己的方法
    public void getAge(){
        System.out.println("Dog is"+age+"  years  old");

    }
	}
	{% endhighlight %}

##### 使用时：
	
	{% highlight java %}
	public static void main(String[] args) {
		//下面这个实例化是错的，因为抽象类是不能实例化的
        //Animal animal = new Animal("Dog");
        Dog dog = new Dog("狗",2);
        dog.move();
        dog.getAge();
        dog.getName();
    }
	{% endhighlight %}

#### 6、自定义异常

##### 自定义异常类（必须继承 Exception）

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

#####抛出异常（抛出除零异常的demo）

	{% highlight java %}
	public class Calculate {

    public static float Division(float arg_a,float arg_b) throws DataException {
		//创建DataException并抛出
        if(arg_b == 0)throw new DataException("除数为零异常");
        else return arg_a/arg_b;
    }
	}
	{% endhighlight %}

#### 7、接口
如果我们要求其他人按照我们自己的规则来实现方法，便于我们进行统一管理，那么我们可以将这些规则用接口的形式来定义，其他人再来实现我们需要的方法就行。

##### 例如，这是一个几何图形的接口
	
	{% highlight java %}
	public interface geometryInf {

    //计算面积
    float getArea();

    //计算周长
    float getCircumference();
	}
	{% endhighlight %}

#####所以，正方形，矩形，三角形就可以实现这些方法了（而且是必须实现，即使是空方法），当然也可以添加自己需要的方法。
	
	{% highlight java %}
	//正方形
	public class Square extends Rectangle implements geometryInf {

    public Square(float arg_edge)
    {
        super(arg_edge,arg_edge);
    }

    public float getArea() {
        return super.getArea();
    }

    public float getCircumference() {
        return super.getCircumference();
    }

    public void showMessage(){
        System.out.println("This is a Square");
    }
	}
	
	//矩形
	public class Rectangle implements geometryInf{

    private float length;
    private float width;

    public Rectangle(float length,float width){
        this.length = length;
        this.width = width;
    }

    public float getArea() {
        return length * width;
    }

    public float getCircumference() {
        return 2*(length + width);
    }

    public float getLength()
    {
        return this.length;
    }
	}
	
	//正三角形
	public class Triangle implements geometryInf {

    private float edge;

    public Triangle(float arg_edge)
    {
        this.edge = arg_edge;
    }

    public float getArea() {

        return 0.5f*edge*edge*(float) Math.sin(Math.toRadians(60));
    }

    public float getCircumference() {
        return 3*edge;
    }
	}
	{% endhighlight %}

有时候我们写的一些方法，为了以后的人们可以按照我们的要求进行实现，这样我们就可以更好的管理了，所以才需要接口，抽象类之类的功能吧，纯属个人观点。。。

#### 8、无穷大

	{% highlight java %}
    Float.POSITIVE_INFINITY;        //无穷大
	Float.NEGATIVE_INFINITY;        //负无穷大
	{% endhighlight %}

#### 9、泛型的使用

#####定义泛型类

	{% highlight java %}
    public class commonClass<T> {
    private T menber;

    public T getMenber() {
        return menber;
    }

    public void setMenber(T menber) {
        this.menber = menber;
    }
	}
	{% endhighlight %}

#####按照不同类型进行调用

	{% highlight java %}
    public class commonMain {

    public static void main(String[] args) {
        commonClass<String> com = new commonClass<String>();
        com.setMenber("Hello");
        System.out.println(com.getMenber());

        commonClass<Integer> com1 = new commonClass<Integer>();
        com1.setMenber(12345);
        System.out.println(com1.getMenber());
    }
	}
	{% endhighlight %}

