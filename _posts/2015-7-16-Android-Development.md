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



##实现对原有图片进行部分截取

![](http://img-storage.qiniudn.com/15-7-16/80687588.jpg)

####1，由上图我们可以看到界面布局中定义了两个ImageView，其中第一个ImageView（也就是上边的那个）指定了android:scaleType=“finCenter”，这表明ImageView显示的图片的时候会进行纵横比的缩放，并将缩放后的图片放在该ImageView的中央。而第二个ImageView就是用来显示截取一定大小后的图片的显示区域。

####2.为了能够动态显示图片的局部细节，程序为第一个ImageView添加OnTouchListener监听器。用户在第一个Imageview上发生触摸事件的时候，程序就会从原始图片中读取相应部分的图片，并将其显示在第二个ImageView中。

####3.截取图片的重点代码,基本原理就是就是用监听器获取到手指的坐标，然后根据这个坐标开始绘制一个图片  

    image1.setOnTouchListener(new OnTouchListener()
    {
	@Override
	public boolean onTouch(View view,MotionEvent event)
	{
    //得到圖片的bitmapDrawable對象
    BitmapDrawable bitmapDrawable=(BitmapDrawable)image1.getDrawable();
    //獲取到位圖
    Bitmap bitmap=bitmapDrawable.getBitmap();
    //定義縮放比例
    double scale=bitmap.getHeight()/320.0;
    //定義繪製的開始坐標
    int x=(int)(event.getX()*scale);
    int y=(int)(event.getY()*scale);
			if(x+120>bitmap.getWidth())
			{
				x=bitmap.getWidth()-120;
			}
			if(y+120>bitmap.getHeight())
			{
				y=bitmap.getWidth()-120;
			}
    //顯示圖片的指定區域			
    image2.setImageBitmap(Bitmap.createBitmap(bitmap,x,y,120,120));
	image2.setAlpha(alpha);
		return false;
	}


这段程序会用于动从源位图触碰点“截取”源位图，并将截取的部分显示在第二个ImageView中。这里用到了Bitmap类，他是代表一个位图的类，调用它的createBitmap()静态方法即可截取位图的指定部分，该方法返回截取区域生成的新位图。

####4.MotionEvent的getX()，getY()与getRawX(),getRawY()区别


如果你的某个Activity中实现OnTouchListener接口，需要重写onTouch(View view，MotionEvent event)这个方法，getRawX()和getRawY()获得的是相对屏幕的位置，**getX()和getY()获得的永远是相对view的触摸位置坐标（这两个值不会超过view的长度和宽度）**，这个也就是在上边要判断这个条件了：
解释：
**之所以加上120是因为，我们要从屏幕触摸点开始截取宽和高是120的图片，但是假设我们的触摸点是imageview1里边的右下角的位置，那触摸点坐标+120就已经是超出了该图片的范围了，所以，这里加这个判断就是要重新获取了触摸点的最小坐标，也就是x+120=bitmap.getWidth()的时候就是最小的截取坐标，所以这里就是要这么判断的。**

           if(x+120>bitmap.getWidth())
			{
				x=bitmap.getWidth()-120;
			}
			if(y+120>bitmap.getHeight())
			{
				y=bitmap.getHeidth()-120;
			}

**RawX,RawY 相对于屏幕位置坐标**

**X,Y 相对于容器的位置坐标**


##5.总结
###1.这里截取图片的时候，主要用到的是Bitmao类，在这个小型的应用里边，我们主要用到了如下的几个方法：

###public final int getWidth()——获取位图的宽度 

###public final int getHeight()——获取位图的高度 

###public static Bitmap createBitmap(Bitmap source, int x, int y, int width, int height)以source为原图，创建新的图片，指定起始坐标以及新图像的高宽。 


###2.使用BitmapDrawable获取位图

###1.使用BitmapDrawable (InputStream is)构造一个BitmapDrawable；

###2. 使用BitmapDrawable类的getBitmap()获取得到位图；