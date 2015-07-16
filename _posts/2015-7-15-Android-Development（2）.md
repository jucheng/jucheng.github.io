---
layout: post
title: "改进后的图片浏览器的开发总结-底部菜单栏"
date: 2015-7-16
categories: Android
tags: [Android，开发]
---
改进后的图片浏览器的开发总结-底部菜单栏

<!-- more -->

到了今天，本来是想再对这个小型的图片浏览器进行改进的，但是由于布局方面出了点问题之后，所以，就只好把这个作为一个版本了，不再做修改了。这篇文章将就是我总结这个浏览器开发过程中的一些讲解和重难点的分析。

这个小型的图片浏览器可以是说分为四大部分：

###1.实现底部菜单栏对界面顶端图片更换的操作

###2.实现对原有图片进行部分截取

###3.实现图片的一些基本操作，比如切换图片，实现图片的透明度切换

###4.分享功能



##实现底部菜单栏对界面顶端图片更换的操作

![](http://img-storage.qiniudn.com/15-7-15/14300499.jpg)

![](http://img-storage.qiniudn.com/15-7-15/30468269.jpg)

![](http://img-storage.qiniudn.com/15-7-15/16095171.jpg)

其实这里是相对比较复杂一点，所以可能这里会讲得比较多


###先说这里的FrameLayout，这个布局就是用到显示我们之后定义的fragment的显示的容器,这里我们又用到了这个属性，这个属性的意思就是占据剩余的空间的分量，本来这个布局占据的空间应该是底部菜单栏上边的部分的，但是由于我们中间还多了个另外一个布局，所以，这个FrameLayout占据的空间就是剩下的了，也就是我们看到的剩下的那部分，在整个界面的最顶端那里。

        android:layout_height="0dp"
        android:layout_weight="1" 

1.这个是要在mainActivity里边定义的对象

    //帧布局对象,就是用来存放Fragment的容器
	private FrameLayout flayout;

2.这个是我们在布局文件里边定义的FrameLayout文件
	
    <FrameLayout
        android:id="@+id/content"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" >
    </FrameLayout>

###A.先说这里的布局
![](http://img-storage.qiniudn.com/15-7-15/72391198.jpg)

从前边的可以看出底部菜单栏基本是由三层布局组成的，也就是：
外层一个大的的线性布局，设置成：

     android:orientation="vertical" 

然后接着底部的三个菜单栏分别用三个RelativeLayout,每个RelativeLayout大概就是如下：
记住，要有三个RelativeLayout，每个的权重都是1，这样才能把底部的位置平均分成三份，

**layout_centerVertical表示与父控件在垂直方向上对齐**

（

注释：android:layout_gravity和android:gravity的区别：

####1.android:gravity：
这个是针对控件里的元素来说的，用来控制元素在该控件里的显示位置。例如，在一个Button按钮控件中设置如下两个属性：

android:gravity="left"和android:text="提交"，这时Button上的文字“提交”将会位于Button的左部。


####2.android:layout_gravity
这个是针对控件本身而言，用来控制该控件在包含该控件的父控件中的位置。同样，当我们在Button按钮控件中设置android:layout_gravity="left"属性时，表示该Button按钮将位于界面的左部。

）
    <RelativeLayout
            android:id="@+id/course_layout"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" >

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_centerVertical="true"
                android:orientation="vertical" >

                <ImageView
                    android:id="@+id/course_image"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                android:layout_gravity="center_horizontal"
                    android:src="@drawable/ic_tabbar_course_normal" />

                <TextView
                    android:id="@+id/course_text"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                   android:layout_gravity="center_horizontal"
                    android:text="视图一"
                    android:textColor="#7597B3" />
            </LinearLayout>
        </RelativeLayout>

然后基本是三个栏目的布局都是这样的。如法炮制即可。


##B.三个Fragment的布局文件

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:background="@drawable/beijing1"
    android:orientation="vertical" >

这里的三个布局布局也都是一样的，自己定义好背景图片即可。

###C.自定义的三个Fragment类

    public class Fragment1 extends Fragment {
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View view = inflater.inflate(R.layout.fg1, container,false);
		return view;
		
	}
    }

（注释：

###1.实现Fragment的UI 

当Fragment与Activity发生关联时调用这个方法。
onCreateView(LayoutInflater, ViewGroup,Bundle)
提供Fragment的UI，必须实现onCreateView()方法。

**onCreateView()中container参数代表该Fragment在Activity中的父控件；**

**savedInstanceState提供了上一个实例的数据。**

###2.inflate()方法的三个参数： 

第一个是resource ID，指明了当前的Fragment对应的资源文件； 

第二个参数是父容器控件； 

第三个布尔值参数表明是否连接该布局和其父容器控件，在这里的情况设置为false，因为系统已经插入了这个布局到父控件，设置为true将会产生多余的一个View Group。 

###3.把Fragment加入Activity 

当Fragment被加入Activity中时，它会处在对应的View Group中。 

Fragment有两种加载方式：一种是在Activity的layout中使用标签<fragment>声明；另一种方法是在代码中把它加入到一个指定的ViewGroup中。 

另外，Fragment它可以并不是Activity布局中的任何一部分，它可以是一个不可见的部分。这部分内容先略过。

）

###C.MainActivity的编写

####1.先初始化底部菜单栏里边的组件

    public void initViews()
	{
		course_image = (ImageView) findViewById(R.id.course_image);
		found_image = (ImageView) findViewById(R.id.found_image);
		settings_image = (ImageView) findViewById(R.id.setting_image);
		course_text = (TextView) findViewById(R.id.course_text);
		found_text = (TextView) findViewById(R.id.found_text);
		settings_text = (TextView) findViewById(R.id.setting_text);
		course_layout = (RelativeLayout) findViewById(R.id.course_layout);
		found_layout = (RelativeLayout) findViewById(R.id.found_layout);
		settings_layout = (RelativeLayout) findViewById(R.id.setting_layout);
		course_layout.setOnClickListener(this);
		found_layout.setOnClickListener(this); 
		settings_layout.setOnClickListener(this);
	}

###2.接着就是重写onclick事件，这里主要是通过判断获取到ID是哪个布局的ID，然后就去调用setChioceItem(）这个方法，这个方法	定义了一个选中一个item后的处理步骤。
    //重写onClick事件
	@Override
	public void onClick(View view) {
		switch (view.getId()) {
		case R.id.course_layout:
			setChioceItem(0);
			break;
	    case R.id.found_layout:
	    	setChioceItem(1);
	    	break;
	    case R.id.setting_layout:
	    	setChioceItem(2);
	    	break;
	    default:
			break;
		}
		
	}
	
###3.这里就是定义了一个选中后的item的处理方法：

####a.先是定义待会需要用到的FragmentTransaction，因为Fragment的添加，移除之类的动作需要用到它。

####b.因为在未点击任何一个item的时候，我们底部菜单栏里边是不会显示着哪个item已经被点击了的，就是所有的item都是要显示未被点击的状态，这就是因为我们一开始的时候是调用了clearChioce()的方法，这是一个重置所有选项的方法。

####c.既然一开始的时候是没有任何的item被点击，那就意味着，当前也是不会有界面显示出来的，所以就是要调用	hideFragments(transaction)来隐藏好所有的Fragment,避免fragment混乱

####d.接下来就是要用switch（）语句判断传入的index的值，因为我们之前在重写onclick（）方法的时候已经定义好了点击哪个item是对应哪个数字（index)，所以只要判断好index，就去执行相关的item操作。

####e.我们就讲其中一个item被点中后的反应，因为其他的都是一样的

1.在点击了相关的item之后，首先是要item里边的图片，文字，和背景显示出被点击后的状态

2.接着就是进行判断此时的界面上是否已经有了相关的fragment在上边了：

a.假如界面是是空的，我们点击到哪个item,如果哪个item为空，则创建一个并添加到界面上 ，例如：

                fg2 = new Fragment2();  
                transaction.add(R.id.content, fg2);  

3.假如界面不是空的，因为我们只是在一进去应用的时候，当时的界面上是没有任何图片的，但是假如当我们点击了item1了之后，我们又一次点击了一次，拿着这个时候我们就不用重新创建了， 因为MessageFragment不为空，则直接将它显示出来就可以了， 我们可以调用transaction.show(相关的fragment)将相关的fragment显示出来就行了。


	//定义一个选中一个item后的处理
	public void setChioceItem(int index)
	{
		//重置选项+隐藏所有Fragment
		FragmentTransaction transaction = fManager.beginTransaction();  
		clearChioce();
		hideFragments(transaction);
		switch (index) {
		case 0:
			course_image.setImageResource(R.drawable.ic_tabbar_course_pressed);  
			course_text.setTextColor(blue);
			course_layout.setBackgroundResource(R.drawable.ic_tabbar_bg_click);
            if (fg1 == null) {  
                // 如果fg1为空，则创建一个并添加到界面上  
                fg1 = new Fragment1();  
                transaction.add(R.id.content, fg1);  
            } else {  
                // 如果MessageFragment不为空，则直接将它显示出来  
                transaction.show(fg1);  
            }  
            break;  
	case 1:
			found_image.setImageResource(R.drawable.ic_tabbar_found_pressed);  
			found_text.setTextColor(blue);
			found_layout.setBackgroundResource(R.drawable.ic_tabbar_bg_click);
            if (fg2 == null) {  
                // 如果fg1为空，则创建一个并添加到界面上  
                fg2 = new Fragment2();  
                transaction.add(R.id.content, fg2);  
            } else {  
                // 如果MessageFragment不为空，则直接将它显示出来  
                transaction.show(fg2);  
            }  
            break;      
		
		 case 2:
			settings_image.setImageResource(R.drawable.ic_tabbar_settings_pressed);  
			settings_text.setTextColor(blue);
			settings_layout.setBackgroundResource(R.drawable.ic_tabbar_bg_click);
            if (fg3 == null) {  
                // 如果fg1为空，则创建一个并添加到界面上  
                fg3 = new Fragment3();  
                transaction.add(R.id.content, fg3);  
            } else {  
                // 如果MessageFragment不为空，则直接将它显示出来  
                transaction.show(fg3);  
            }  
            break;                 
		}
		transaction.commit();
	}

(注释：
####a.FragmentTransaction：
FragmentTransaction对fragment进行添加,移除,替换,以及执行其他动作。
从 FragmentManager 获得一个FragmentTransaction的实例 :

FragmentManager fragmentManager = getFragmentManager(); 
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

####b.FragmentManage：
FragmentManager能够实现管理activity中fragment. 通过调用activity的getFragmentManager()取得它的实例.

FragmentManager可以做如下一些事情:

1、使用findFragmentById() (用于在activity layout中提供一个UI的fragment)或findFragmentByTag()
   (适用于有或没有UI的fragment)获取activity中存在的fragment

2、将fragment从后台堆栈中弹出, 使用 popBackStack() (模拟用户按下BACK 命令).

3、使用addOnBackStackChangeListener()注册一个监听后台堆栈变化的listener.	

)

###4.定义hideFragments（）这个方法：

     //隐藏所有的Fragment,避免fragment混乱
     private void hideFragments(FragmentTransaction transaction) {  
        if (fg1 != null) {  
            transaction.hide(fg1);  
        }  
        if (fg2 != null) {  
            transaction.hide(fg2);  
        }  
        if (fg3 != null) {  
            transaction.hide(fg3);  
        }  
    }  

###5.定义一个重置所有选项的方法
	public void clearChioce()
	{
		course_image.setImageResource(R.drawable.ic_tabbar_course_normal);
		course_layout.setBackgroundColor(whirt);
		course_text.setTextColor(gray);
		found_image.setImageResource(R.drawable.ic_tabbar_found_normal);
		found_layout.setBackgroundColor(whirt);
		found_text.setTextColor(gray);
		settings_image.setImageResource(R.drawable.ic_tabbar_settings_normal);
		settings_layout.setBackgroundColor(whirt);
		settings_text.setTextColor(gray);
    }

###6.定义一个selector.xml(在res/drawable文件夹下定义）
这里之所以定义这样的一个东西，是因为我们要在这里定义好按钮按下的图片，到时候直接引用就行了

    <?xml version="1.0" encoding="utf-8"?>
    <selector xmlns:android="http://schemas.android.com/apk/res/android" >

     <item android:state_selected="true" android:drawable="@drawable/ic_tabbar_course_pressed"></item>

	<item android:state_pressed="true" android:drawable="@drawable/ic_tabbar_course_pressed"></item>

	<item android:drawable="@drawable/ic_tabbar_course_normal"></item>	

    </selector>


**到了这里之后底部菜单栏的工作就已经完成了。**

##总结
**实现底部菜单栏的这个过程，主要是要运用了fragment的相关知识点，fragment的添加移除，这个就是要用到transaction，而transaction又要fragmentManager去调用，所以，我们就还得定义好：
FragmentManager fragmentManager = getFragmentManager(）等等，这些都是fragmengt的一些基础知识来的，所以，你是有必要学好这方面的一些知识，加上多写代码才能懂得其原理。**


