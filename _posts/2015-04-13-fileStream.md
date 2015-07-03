---
layout: post
title: "Java文件流的读取"
categories: 编程学习
tags: java
date: 2015-04-13 20:34:17
---

学习将文件作为流输入，再将其内容输出

1. 首先利用FileInputStream将文件读入作为流
2. 使用byte[]做缓存，每次读取一定数量的字节
3. 输出读取到的文件流


具体代码如下：

<!-- more -->

	{% highlight java %}
	public static void main(String[] args) throws IOException {
	        FileInputStream input = new FileInputStream("D:/mydata/Desktop/ss.txt");
	        byte[] bytes = new byte[64];
	        int ch;
	        while ((ch=input.read(bytes))!=-1){
	            System.out.println("\n=================读取长度为："+ch+"=================");
	            System.out.write(bytes,0,ch);
	        }
	        input.close();
	    }
	{% endhighlight %}

ss.txt文件的内容如下（有中文也有英文）：

>中文应该是没有问题的吧  
素数的作用：素数因为没有其它因子，所以将几个质数相乘后得到的数，只能被他的几个因数整除  
位运算的作用：位可用于bool值的判断，例如整形数字（4个字节，32位），可以表示32个bool值。 

运行结果如下：

>=================读取长度为：64=================  
﻿中文应该是没有问题的吧   
素数的作用：素数�  
=================读取长度为：64=================  
��为没有其它因子，所以将几个质数相乘后得到�  
=================读取长度为：64=================  
�数，只能被他的几个因数整除  
位运算的作用：  
=================读取长度为：64=================  
位可用于bool值的判断，例如整形数字（4个字节�  
=================读取长度为：39=================  
�32位），可以表示32个bool值。

结果出现乱码，这是因为（文件保存格式是utf-8）在utf-8编码中，英文使用1个字节来保存，而中文是3个字节，当bytes正好填充完毕时，后面的中文还没有读取完毕，最后显示出来就是乱码，这也影响到了后面的读取。为了避免出现这种状况我们可以先将全部的字符读取完之后再进行输出。这是就利用到了另一个类`ByteArrayOutputStream`,这是一个会自动变长的byte[]。

改变后的代码如下：

	{% highlight java %}
	public static void main(String[] args) throws IOException {
	        FileInputStream input = new FileInputStream("D:/mydata/Desktop/ss.txt");
	        byte[] bytes = new byte[64];
	        int ch;
	        ByteArrayOutputStream out = new ByteArrayOutputStream();
	        while ((ch=input.read(bytes))!=-1){
	            out.write(bytes,0,ch);
	        }
			//关闭
	        out.close();
	        input.close();
	        System.out.println(out.toString());
	    }
	{% endhighlight %}

如果还是出现乱码，可以在输出时改变一下编码方式：`System.out.println(out.toString("utf-8"))`

最后输出结果就是正常的：

>﻿中文应该是没有问题的吧  
素数的作用：素数因为没有其它因子，所以将几个质数相乘后得到的数，只能被他的几个因数整除  
位运算的作用：位可用于bool值的判断，例如整形数字（4个字节，32位），可以表示32个bool值。 
