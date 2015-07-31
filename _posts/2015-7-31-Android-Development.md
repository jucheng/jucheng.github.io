---
layout: post
title: "海贼王（图文并茂）ListView开发"
date: 2015-7-31
categories: Android
tags: [Android，开发]
---
海贼王（图文并茂）ListView开发

<!-- more -->


###海贼王的ListView

效果图如下：

![](http://img-storage.qiniudn.com/15-7-30/20623668.jpg)

![](http://img-storage.qiniudn.com/15-7-30/5618669.jpg)

![](http://img-storage.qiniudn.com/15-7-30/6736763.jpg)


为了做这个图片的ListView，花了整整一个下午，其中光是图片的问题也花了够久的时间，本来应该是做出一个只有文字的ListView，但是，只有文字的ListView显得太单调了，所以，就加上图片效果，这样看上去就图文并茂了，这个其实也可以作为我接下来的即将要开发的应用是有关的。

好了，废话不多说吧，先说一下ListView吧，ListView绝对可以称得上是android开发应用中最常用的控件之一了，几乎所有的应用都会用到这个控件。

**但是由于手机屏幕有限，能够一次在屏幕上显示的内容并不多，当我们程序中有大量的数据需要显示的时候，就可以借助ListView来实现。ListView允许用于通过手指上下滑动的方式将屏幕外的数据滚动到屏幕内，同时屏幕上的原有数据会滚动出屏幕，我们经常接触的这类控件就比如，手机联系人列表等。**

好了介绍完了ListView的功能之后，接下来开始讲述一下我们的这个ListView的实现原理了。

###1.首先在activity_main.xml里边定义好这个控件。

    <ListView
        android:id="@+id/list_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent" >
    </ListView>

###2.然后单独再添加一个haizeiwang.xml，因为既然是有图片和文字的ListView，那么就需要ImageView和TextView了，这个xml文件就是用了设置列表视图的展示效果的，以后要是想改变这个视图的效果，也都是可以在这里修改的。

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >

    <ImageView
        android:id="@+id/haizeiwang_image"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/haizeiwang_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginLeft="10dip" />

    </LinearLayout>

###3.然后出了MainActivity之外我们需要重新建立两个类，一个是haizeiwang.java,一个是haizeiwangAdapter.java的文件。

####A.haizeiwang.java的代码如下：

    package com.example.listviewtest;

    public class Haizeiwang {
	
	private String name;
	private int imageId;
	
    public  Haizeiwang(String name,int imageId)
    {
	   this.name=name;
	   this.imageId=imageId;
		
	}
   
    public String getString()
    {
	    return name;
    }

    public int getImageId()
    {
	   return imageId;
     }
    }
（

分析：

**这里其实很简单，就是只有两个类，一个就是获取人物名字，一个是获取人物的头像图片。name表示海贼王人物的名字，imageId表示人物对应的图片资源的id.**

)

####B.haizeiwangAdapter.java的代码如下：

    package com.example.listviewtest;
    import java.util.List;
    import android.content.Context;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.ArrayAdapter;
    import android.widget.ImageView;
    import android.widget.TextView;


    public class HaizeiwangAdapter extends ArrayAdapter<Haizeiwang> {
	private int resourceId;

	public HaizeiwangAdapter(Context context, int textViewResourceId,
			List<Haizeiwang> objects) {
		super(context, textViewResourceId, objects);
		resourceId = textViewResourceId;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		Haizeiwang haizeiwang=getItem(position);
		View view;
		ViewHolder viewHolder;
		if (convertView == null) {
			view = LayoutInflater.from(getContext()).inflate(resourceId, null);
			viewHolder = new ViewHolder();
			viewHolder.haizeiwangImage = (ImageView) view.findViewById(R.id.haizeiwang_image);
			viewHolder.haizeiwangName = (TextView) view.findViewById(R.id.haizeiwang_name);
			view.setTag(viewHolder);
		} else {
			view = convertView;
			viewHolder = (ViewHolder) view.getTag();
		}
		
		ImageView haizeiwangImage=(ImageView)view.findViewById(R.id.haizeiwang_image);
		TextView haizeiwangName=(TextView)view.findViewById(R.id.haizeiwang_name);
		
		haizeiwangImage.setImageResource(haizeiwang.getImageId());
		haizeiwangName.setText(haizeiwang.getString());
		return view;
		
	}
	
    class ViewHolder {
		
		ImageView haizeiwangImage ;
		
		TextView haizeiwangName;
		
	}

    }
（

分析：

####A.定义适配器的开始：

**这里这个是我们自定义的适配器，这个适配器继承于ArrayAdapter，并将泛型指定为Haizeiwang类，新建类HaizeiwangAdapter。**


####B.列表项被滚动到屏幕内会调用的方法：
**HaizeiwangAdapter重写了父类的一组构造函数，用于将上下文，ListView子项布局的id和数据都传递进来。然后又重写了getView（）方法，这个方法在每个子项在每个子项被滚动到屏幕内的时候会被调用。**

**在getView()方法中，首先通过getItem()方法得到当前项的Haizeiwang的实例，然后使用 LayoutInflater来为这个子项加载我们传入的布局，接着调用View的findViewById（）方法分别获取到ImageView和TextView的实例，并分别调用他们的setImageResource（）和setText（）来设置显示的图片和文字，最后将布局返回。**


####C.优化ListView的运行效率：
**还有一点需要强调的是要提升ListView的运行效率，我们一般在面试的时候都会遇到这个问题：就是ListView的优化问题，之所以说ListView这个控件很难用，是因为它有很多细节可以优化，其中运行效率就是很重要的一点。目前我们ListView的运行效率是很低的，因为HaizeiwangAdapter的getview（）方法每次都将布局重新加载了一遍，当ListView快速滚动的时候，这个时候就会成为性能瓶颈。**

**如果仔细观察，我们不难看到getview（）方法中还有一个convertView参数，这个参数就是将之前加载好的布局进行缓存，以便以后可以进行重用。**

**从上述代码中我们可以看到，我们在getview（）方法中进行了判断，如果convertView为空，则使用LayoutInflater去加载布局，如果不为空，则直接对convertView进行重用。这样就大大的提高了ListView的运行效率，在快速滑动的时候也可以表现出更好的性能。**

**不过，我们的这份代码目前还是可以继续优化的，虽然现在已经不会再重复去加载布局，但是每次在getview（）方法还是会调用View的findViewById（）方法来获取一次控件的实例。**



####D.采用ViewHolder来进行优化
**我们还是可以借助viewHolder来对这部分性能进行优化，修改HaizeiwangAdapter中的代码。
我们新增了一个内部类ViewHolder,用于对控件的实例都存放在ViewHolder里，然后调用View的setTag()方法，将ViewHolder对象存储在View中。当convertView不为空的时候则调用viewHolder的getTag()方法，把viewHolder重新取出。这样所有的控件的实例都缓存在viewHolder里，就没有必要每次都通过findViewById（）方法来获取控件实例了。好了，我们自定义的适配器已经完成了。**

通过上述这两步的优化之后，我们的ListView的运行效率就已经做的很好了的。

）

####3.MainActivity的代码：

    package com.example.listviewtest;

    import java.util.ArrayList;
    import java.util.List;
    import android.app.Activity;
    import android.os.Bundle;
    import android.view.View;
    import android.view.View.OnClickListener;
    import android.widget.AdapterView;
    import android.widget.ListView;
    import android.widget.Toast;
    import android.widget.AdapterView.OnItemClickListener;

    public class MainActivity extends Activity {
	
	private List<Haizeiwang> haizeiwangList=new ArrayList<Haizeiwang>();
	private String[] data={"Monkey·D·Luffy ","Roronoa Zoro ","Nami ","Usopp ","Tony Tony Chopper ","Nico·Robin ","Franky","BROOK","Sanji "};

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		initHaizeiwang();
		HaizeiwangAdapter adapter=new HaizeiwangAdapter(MainActivity.this, 
				R.layout.haizeiwang_item, haizeiwangList);
		ListView listView=(ListView)findViewById(R.id.list_view);
		
	    listView.setAdapter(adapter);	
	    listView.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> parent, View view,
					int position, long id) {
				Haizeiwang haizeiwang = haizeiwangList.get(position);
				Toast.makeText(MainActivity.this, haizeiwang.getString(),
						Toast.LENGTH_SHORT).show();
			}
		});
	}
			
			private void initHaizeiwang()
			{
				Haizeiwang luffy=new Haizeiwang("Monkey·D·Luffy",R.drawable.luffy);
				haizeiwangList.add(luffy);
				
				Haizeiwang zoro=new Haizeiwang("Zoro",R.drawable.zoro);
				haizeiwangList.add(zoro);
				Haizeiwang nami=new Haizeiwang("Nami",R.drawable.nami);
				haizeiwangList.add(nami);
				Haizeiwang usopp=new Haizeiwang("Usopp",R.drawable.usopp);
				haizeiwangList.add(usopp);
				Haizeiwang chopper=new Haizeiwang("Tony Tony Chopper",R.drawable.chopper);
				haizeiwangList.add(chopper);
				Haizeiwang robin=new Haizeiwang("Nico·Robin",R.drawable.robin);
				haizeiwangList.add(robin);
				Haizeiwang franky=new Haizeiwang("Franky",R.drawable.franky);
				haizeiwangList.add(franky);
				Haizeiwang brook=new Haizeiwang("BROOK",R.drawable.brook);
				haizeiwangList.add(brook);
				Haizeiwang sanji=new Haizeiwang("Sanji",R.drawable.sanji);
				haizeiwangList.add(sanji);
				
			}
      }


（分析：

####A.listView的数据展示方法：

**既然ListView是用于展示大量数据的，所以我们就应该先将数据提供好。**

**其实这些数据我们可以是从网上下载的，也是可以从数据库中读取的，这个读取的方式是视具体的应用场景来定的。但是我们在这里是使用了一个data数组来测试，里面包含了海贼王里边的一些人物的名字。**

**不过，数组中的数据时无法直接传递给ListView的，所以我们还需要通过适配器来完成，Android中提供了很多适配器的实现类，其中一个很好用就是ArrayAdapter。它还可以通过泛型来指定要适配的数据类型，然后在构造函数中把要适配的数据传入即可。ArrayAdapter有多个构造函数的重载。你就应该根据实际情况选择最合适的一种。这里由于我们提供的数据都是字符串，因此将ArrayAdapter的泛型指定为String，然后在ArrayAdapter的构造函数中一次传入当前上下文，ListView子项布局的id，以及要适配的数据。**

**最后，还需要调用ListView的setAdapter()方法，将构建好的适配器对象传递进去，这样ListView和数据之间的关联就建立完成了。**


####B.ListView数据的初始化：
**可以看到，在这里，我们添加了一个initHaizeiwang()方法，用于初始化所有的海贼王人物的数据。在Haizeiwang()类的构造函数中将人物的名字和对应的图片的id传入，然后把创建好的对象添加到水果列表中，接着我们在onCreate（）方法中创建了HaizeiwangAdapter对象，并将HaizeiwangAdapter作为适配器传递给了ListView。这样定制ListView界面的任务就完成了。**


####C.ListView的列表项的点击事件：
**还有的就是ListView的点击事件，在这里我们使用了setOnItemClickListener（）方法来为ListView注册了一个监听器，当用户点击了ListView中任何一个子项的时候，就会回调onItemClick（）方法，在这个方法中可以通过position参数判断出用户点击的是哪一个子项，然后通过获取到相应的水果，并通过Toast将人物的名字显示出来。**


**在目前为止，我们定制的这个界面还是简单，但是其实我们也应该知道，只要修改haizeiwang_item.xml的内容，就可以定制出比较复制的界面。**



###总结：

感觉写这个东西花的时间跟做出这个东西花的时间差不多，不知道是不是自己领悟的慢，还是什么的，应该是前者吧，不过，不管怎么样，只要自己能搞明白，花多一点时间也是值得的。

**其实制作ListView需要注意的几大问题就是：**

**1.ListView的展示界面的制作（这个是用单独的xml文件来进行制作的）**

**2.获取ListView的数据（因为我我们这里是用了数据去读取数据，所以，单独建立一个类去读取人物的名字和对应的图片资源）**

**3.读取ListView的数据（这里就需要用到适配器了，通过适配器来调整ListView的显示的布局，毕竟ListView要是数据量多的话，有些列表项是会不断的滑进滑出手机屏幕的，所以就要通过相关的方法来进行判断，然后将数据传递给ListV，最后读取出当前ListView的界面和展示出来。）**

**4.ListView的优化（通过相关的方法和参数对之前加载好的布局进行缓存，以便以后需要用到，所以这里也是需要不断的进行判断的，有缓存好的布局就直接调用，如果没有就重新去加载，还有的就是相关控件的实例获取，也是作为的ListView优化的一部分，将所有控件的实例都缓存在一个内部类中，需要的时候就直接将他取出，这样就不需要每次都用findViewById（）方法来获取控件实例了）**

**5.ListView列表项的点击事件和数据的初始化。**





