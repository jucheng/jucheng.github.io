---
layout: post
title:  "用Intent写出常用的几个功能"
date:   2015-7-8
categories: Android
tags: [Android，Intent]
---

用Intent写出常用的几个功能

<!-- more -->

##拨号码

###1，子类和父类中的可见性的关系

Cannot reduce the visibility of the inherited method from View.OnClickListener
![](http://img-storage.qiniudn.com/15-7-9/22175068.jpg)


这里有一个特别需要你注意的是：

**这是因为如果子类要覆盖了父类中定义的方法，那么不能降低其可见性。**

所以，在这里，你在前边定义了public了，但是你在后边却又定义了private的属性，那就违反了以上的原则。所以，正确的来说，就应该是如下：

![](http://img-storage.qiniudn.com/15-7-9/7829621.jpg)


###2.如果你设置了拨打电话的属性，那么你就必须要在Android.Manifest.xml里边声明这个属性，类似的还有比如访问网络啊之类的：

![](http://img-storage.qiniudn.com/15-7-9/22918125.jpg)

###3.要是想打电话的话，这个也挺简单的，在这里我们通过设置一个按钮，通过设置点击事件，然后，让intent来传达这个消息，然后再进行拨打电话：
A.这里是MainActivity里边的东西，就是先要你设置

     public class MainActivity extends Activity {

	 private Button mainBtn=null;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		mainBtn=(Button)findViewById(R.id.mainBtn);
		mainBtn.setOnClickListener(listener);
		
		
	}
	
	private OnClickListener listener=new OnClickListener() 
	{
		
		@Override
		  public void onClick(View v) 
     {
			Intent intent=new Intent();
			intent.setAction(Intent.ACTION_CALL);
			intent.setData(Uri.parse("tel:120"));
			startActivity(intent);	
     }
     };
     }

注：

a.记住，这里有一个地方容易遗漏的是：你会忘了添加那个引号：

![](http://img-storage.qiniudn.com/15-7-9/60336986.jpg)

b.setAction（）这个函数
![](http://img-storage.qiniudn.com/15-7-9/69714103.jpg)

B.也就是在layout文件中说明一下Button就行了的：
记住，每次要第一次使用ID的那个属性的时候，第一次都要使用那个"+"，因为第一次是声明，以后要调用这个ID的时候，直接用@引用就行，不必用那个+号了：

       <Button 
       android:id="@+id/mainBtn"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:text="Call"
        />

##常见的 Intent中各种常见的Action 

###1 Intent.ACTION_MAIN

String: android.intent.action.MAIN

标识Activity为一个程序的开始。比较常用。

Input:nothing

Output:nothing 

    <activity android:name=".Main" android:label="@string/app_name"> 
    <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
    </activity> 

###2 Intent.Action_CALL

Stirng: android.intent.action.CALL

呼叫指定的电话号码。

Input:电话号码。数据格式为：tel:+phone number 

Output:Nothing 

    Intent intent=new Intent(); 
    intent.setAction(Intent.ACTION_CALL); 
    intent.setData(Uri.parse("tel:1320010001");
    startActivity(intent);

###3 Intent.Action.DIAL

String: action.intent.action.DIAL

调用拨号面板

    Intent intent=new Intent();

    intent.setAction(Intent.ACTION_DIAL); 

    //android.intent.action.DIAL

    intent.setData(Uri.parse("tel:1320010001");

    startActivity(intent); 

Input:电话号码。数据格式为：tel:+phone number 

Output:Nothing

说明：打开Android的拨号UI。如果没有设置数据，则打开一个空的UI，如果设置数据，action.DIAL则通过调用getData()获取电话号码。

但设置电话号码的数据格式为 tel:+phone number. 

###4 Intent.Action.ALL_APPS

String: andriod.intent.action.ALL_APPS

列出所有的应用。

Input：Nothing.

Output:Nothing.


###5 Intent.ACTION_ANSWER 

Stirng:android.intent.action.ANSWER

处理呼入的电话。

Input:Nothing.

Output:Nothing.

###6 Intent.Action_CALL_BUTTON

String: android.action.intent.CALL_BUTTON.

相当于用户按下“拨号”键。经测试显示的是“通话记录”

Input:nothing

Output:nothing

    Intent intent = new Intent(Intent.ACTION_CALL_BUTTON);startActivity(intent);
 




