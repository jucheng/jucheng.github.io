---
layout: post
title: "改进后的图片浏览器的开发总结-实现对原有图片进行部分截取"
date: 2015-7-16
categories: Android
tags: [Android，开发]
---
改进后的图片浏览器的开发总结-实现对原有图片进行部分截取

<!-- more -->

到了今天，本来是想再对这个小型的图片浏览器进行改进的，但是由于布局方面出了点问题之后，所以，就只好把这个作为一个版本了，不再做修改了。这篇文章将就是我总结这个浏览器开发过程中的一些讲解和重难点的分析。

这个小型的图片浏览器可以是说分为四大部分：

###1.实现底部菜单栏对界面顶端图片更换的操作

###2.实现对原有图片进行部分截取

###3.实现图片的一些基本操作，比如切换图片，实现图片的透明度切换

###4.分享功能


##实现对图片的一些基本的操作
![](http://img-storage.qiniudn.com/15-7-16/80687588.jpg)

从这里我们基本也是可以看得到有几个按钮是可以实现对图片的基本操作来的，虽然功能挺简单的，但是为了总结下，我大概讲一下：


###1.先说透明度的切换吧

a.设置当前透明度 : 设置一个当前透明度值, 初始值为255, 255是不透明, 0为完全透明;

     private int alpha=255;

b.透明度改变 : 设置监听器，当我们点击下透明度切换的按钮的时候，就会执行调用一个方法setAlpha(alpha)，这个方法是设置透明度的一个方法。的当点击透明度增加按钮的时候, 透明度自增20, 如果结果透明度大于255, 那么改透明度强制设置为255; 当点击透明度见效按钮的时候, 透明度自减20, 当透明度小于0的时候, 透明度强制设置为0;

    OnClickListener listener=new OnClickListener()
	{
		@Override
		public void onClick(View v)
		{
			if(v==plus)
			{
				alpha+=20;
			}
			if(v==minus)
			{
				alpha-=20;
			}
			if(alpha>=255)
			{
				alpha=255;
			}
			if(alpha<=0)
			{
				alpha=0;
			}
			image1.setAlpha(alpha);
		}
		};


###2.图片的切换
1.图片数组 : 将图片放在数组中, ImageView显示数组中的图片;

2.当前显示图片下标索引 : 设置一个int值, 用来表示当前显示图片数组中的图片, 这个值不是int下标, 这个值设置很大设置成Integer.MAXVALUE / 2, 该值与图片数组的长度进行取模运算结果就是当前显示的图片数组下标值;（这里有一个Integer.MAXVALUE / 2，之前就已经讲过了的，可以看一下自己相关的文章）

3.翻页操作 : 上一张操作就将当前显示索引自减1, 然后模上 图片数组大小; 下一张就将当前索引自增1, 然后模上 图片数组大小;

	
	next.setOnClickListener(new OnClickListener()
	{
		@Override
		public void onClick(View v)
		{

		image1.setImageResource(images[++currentImage % images.length]);
		}
	});
	
	previous.setOnClickListener(new OnClickListener()
	{
		@Override
		public void onClick(View v)
		{

		image1.setImageResource(images[--currentImage % images.length]);
		}
	});
     