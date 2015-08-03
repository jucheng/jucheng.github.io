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

1.创建待添加的碎片实例：

    AnotherRightFragment fragment = new AnotherRightFragment();

2.获取到FragmentManager，在活动中可以直接调用getFragmentManager()方法得到；

    FragmentManager fragmentManager = getFragmentManager();

3.开启一个事务，通过调用beginTransaction()开启；

     FragmentTransaction transaction = fragmentManager
					.beginTransaction();

4.向容器内加入碎片，一般使用replace()方法实现，需要传入容器的id和待添加的碎片实例；

    transaction.replace(R.id.right_layout, fragment);

5.提交事务，调用commit()方法来完成。

     transaction.commit();