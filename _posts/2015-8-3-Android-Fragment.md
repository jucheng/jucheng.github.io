---
layout: post
title: "简单的Fragment开发及其总结"
date: 2015-8-3
categories: Android
tags: [Android，Fragment]
---
简单的Fragment开发及其总结

<!-- more -->

这个是一个简单的也是一个典型的Fragment的添加实例，今天在这里我为了巩固一下自己的记忆，也借这个例子来做一下总结：

首先上效果图：这个就是一个按下按钮就会切换Fragment的小程序，效果如下：

![](http://img-storage.qiniudn.com/15-8-3/5577439.jpg)


![](http://img-storage.qiniudn.com/15-8-3/23235231.jpg)

我就大概说一下这里边的布局，因为这个布局不算是重点：

1.布局就是有三个一个是左侧的含有Button的布局，一个是右侧的Fragment布局，一个是右侧将要替换的一个Fragment布局，布局的定义就不详细讲了。

2.然后接着就是定义好相关的类，就是每个布局对应一个相关的类：这里定义定义这个类的作用就是将之前设置的布局读取出来：这里我就将左边的那个fragment的类写出来：

     public class LeftFragment extends Fragment {
	
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View view = inflater.inflate(R.layout.left_fragment, container, false);
		return view;
	}
	
    }

**（注：这里仅仅是重写Fragment的onCreateView方法，然后在这个方法当中通过inflate（）将刚才定义的Left_fragement动态的加载进来。）**

3.记得在activity_main.xml里边声明Fragment的时候要用以下的这种格式：

      <fragment
        android:id="@+id/left_fragment"
        android:name="com.example.fragmenttest.LeftFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
（

提示：

**我们使用<fragment>在布局汇中动态添加碎片，这里有一点需要注意的是：需要通过android:name属性来显式指明要添加的碎片的类名，一定也要将类的包名加上。**

）


4.实现动态添加碎片的功能：

    public class MainActivity extends Activity implements OnClickListener {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		Button button = (Button) findViewById(R.id.button);
		button.setOnClickListener(this);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.button:
			AnotherRightFragment fragment = new AnotherRightFragment();
			FragmentManager fragmentManager = getFragmentManager();
			FragmentTransaction transaction = fragmentManager
					.beginTransaction();
			transaction.replace(R.id.right_layout, fragment);
			transaction.addToBackStack(null);
			transaction.commit();
			break;
		default:
			break;
		}
	}

    }

###5.总结

通过以上的代码我们可以看到，动态添加碎片主要有以下几步：

**1.创建待添加的碎片实例：**

    AnotherRightFragment fragment = new AnotherRightFragment();

**2.获取到FragmentManager，在活动中可以直接调用getFragmentManager()方法得到；**

    FragmentManager fragmentManager = getFragmentManager();

**3.开启一个事务，通过调用beginTransaction()开启；**

     FragmentTransaction transaction = fragmentManager
					.beginTransaction();

**4.向容器内加入碎片，一般使用replace()方法实现，需要传入容器的id和待添加的碎片实例；**

    transaction.replace(R.id.right_layout, fragment);

**5.提交事务，调用commit()方法来完成。**

     transaction.commit();

(补充：

###在碎片中模拟返回栈


我们上边说的是向一个活动当中动态的添加一个碎片，我们可以通过按一个按钮，就可以添加一个碎片，而这个时候，要是我们按下BACK键，程序就会直接退出了，所以，我们在这里要是想像做出返回上一个界面的效果，就是类似于返回栈的效果，按下Back键可以返回到上一个碎片，我们可以用以下的方法：

**实际上Fragment给我们提供了一个addToBackStack（）的方法，可以将一个事务添加到返回栈当中。**

        public void onClick(View v) {
		switch (v.getId()) {
		case R.id.button:
			AnotherRightFragment fragment = new AnotherRightFragment();
			FragmentManager fragmentManager = getFragmentManager();
			FragmentTransaction transaction = fragmentManager
					.beginTransaction();
			transaction.replace(R.id.right_layout, fragment);
			transaction.addToBackStack(null);
			transaction.commit();
			break;
		default:
			break;
		}
	}

这个也就是上边我们代码中的一段，**这里我们在提交事务之前，调用了FragmentTransaction的addToBackStack()的方法，他可以接收一个名字用于描述返回栈的状态，。我们一般是传入null即可。**所以在程序执行之后，我们就可以看到，当我们按下按钮进入 AnotherRightFragment之后，当我们按下Back键的时候，程序会先是返回到RightFragment的界面，再次按下Back键的时候，程序才会退出。
）