---
layout: post
title: "android 的横竖屏切换问题 "
date: 2015-8-13
categories: Android
tags: [Android，Tomcat]
---
android 的横竖屏切换问题 

<!-- more -->

###一、禁止横竖屏转换

Android横竖屏切换在手机开发中比较常见，很多软件在开发过程中为了避免横竖屏切换时引发不必要的麻烦，通常禁止掉横竖屏的切换，

通过在AndroidManifest.xml中设置activity中的android:screenOrientation属性值来实现。
比如下列设置

    android:screenOrientation="portrait"

则无论手机如何变动，拥有这个属性的activity都将是竖屏显示。

    android:screenOrientation="landscape"，为横屏显示。

上述修改也可以在Java代码中通过类似如下代码来设置

    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE)

另外，android中每次屏幕的切换动会重启Activity，所以应该在Activity销毁前保存当前活动的状态，在Activity再次Create的时候载入配置，那样，进行中的游戏就不会自动重启了！

###二、横竖屏切换

如果要让软件在横竖屏之间切换，由于横竖屏的高宽会发生转换，有可能会要求不同的布局。可以通过以下两种方法来切换布局：

1）在res目录下建立layout-land和layout-port目录,相应的layout文件名不变，比如main.xml。layout-land是横屏的layout,layout-port是竖屏的layout，其他的不用管，横竖屏切换时程序为调用Activity的onCreate方法，从而加载相应的布局。

2）假如布局资源不按照如上设置，则可以通过java代码来判断当前是横屏还是竖屏然后来加载相应的xml布局文件。因为当屏幕变为横屏的时候,系统会重新呼叫当前Activity的onCreate方法,你可以把以下方法放在你的onCreate中来检查当前的方向,然后可以让你的setContentView来载入不同的layout xml。

    if(this.getResources().getConfiguration().orientation==Configuration.ORIENTATION_LANDSCAPE)
    {  
     Log.i("info", "landscape"); // 横屏 
    }  else if(this.getResources().getConfiguration().orientation==Configuration.ORIENTATION_PORTRAIT)
     {  
    Log.i("info", "portrait"); // 竖屏 
     }

###三、通过onConfigurationChanged拦截横竖屏变换

按照二的操作，Activity每次横竖屏切换都会重新调用onPause-> onStop-> onDestory-> onCreate->onStart->onResume.

为此涉及到内容和数据的保存和读取，否则转屏之前的内容就会消失了。很多时候这样的结果让程序繁琐，为此Android提供了在manifest中设置android:configChanges属性，从而让Activity不延续上述的重建流程。

在Android工程的Mainfest.xml中配置Activity：android:configChanges="keyboardHidden|orientation"，横竖屏切换之后就不会去执行OnCreat函数了，而是会去调用onConfigurationChanged（）这样就能控制横竖屏的切换了。

用户可以在Activity或View的onConfigurationChanged(Configuration newConfig)函数中获取当前横竖屏参数。至于其调用顺序跟touch时间的传递顺序相似，不过他没有消费事件的概念，会顺次调用到每一个onConfigurationChanged函数。

需要重写Activity的onConfigurationChanged方法。实现方式如下，不需要做太多的内容：

    @Override
        public void onConfigurationChanged(Configuration newConfig) {
                super.onConfigurationChanged(newConfig);
                if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
                        // land do nothing is ok
                } else if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
                        // port do nothing is ok
                }
        } 

需要注意的是，onConfigurationChanged函数中只能获得横竖屏切换后的参数，在该函数中获取不到新的Layout和控件的尺寸位置信息，如果要处理尺寸和位置信息，必须通过消息异步或者延时调用。

###四、彻底禁止翻转
当然如果要彻底禁止翻转，可以设置android:screenOrientation的属性为nosensor，如此就可以忽略重力感应带来的麻烦了。不过在模拟器上不管用，在真机上是正确的。
这里提一个小知识，Android模拟器中，快捷键"Ctrl+F11/F12"可以实现转屏


###五，自适应转换

如果想让它启动的时候是横屏的话就横屏表示，纵屏的话就纵屏表示，然后手机切换横竖屏就不能用了该怎么解决呢？

####首先：在Mainfest.xml中追加这两个属性。

    android:screenOrientation="sensor" android:configChanges="orientation|keyboardHidden"


####第二步：取得屏幕的长和宽，进行比较设置横竖屏的变量。

    Display display = getWindowManager().getDefaultDisplay();  
    int width = display.getWidth();  
    int height = display.getHeight();  
    if (width > height) {  
     orientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;  //横屏
     } else {  
     orientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;  //竖屏
     }  

####第三步：在onConfigurationChanged（）函数中追加this.setRequestedOrientation(orientation)就行了

    public void onConfigurationChanged(Configuration newConfig) {  
      super.onConfigurationChanged(newConfig);  
      this.setRequestedOrientation(orientation);  
     }  

但是这样的话你切到别的画面的时候再回到原画面，它就仍然是横的或者是纵的。怎么让它从别的屏幕回来后，又重新横竖屏布局呢？

只要在OnResume()中在设定下就行了。但是这个只支持横竖屏只有一个layout的。横竖屏分别对应layout的还不知道该怎么解决。

     protected void onResume() {  
     orientation = ActivityInfo.SCREEN_ORIENTATION_USER;  
     this.setRequestedOrientation(orientation);  
      Display display = getWindowManager().getDefaultDisplay();  
      int width = display.getWidth();  
      int height = display.getHeight();  
      if (width > height) {  
          orientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;  
      } else {  
        orientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;  
    }  
     super.onResume();  
    }  

###六、总结
总之，对于横竖屏切换的问题，统计了下，大家的解决办法是： 

**①不理会。。**
 
**②只竖屏显示(android:screenOrientation="portrait")**

  **只横屏显示(android:screenOrientation="landscape")**

**③简单的防止重载：** 

  在 AndroidManifest.xml中加入：

    android:configChanges="orientation|keyboardHidden"

  在activity中重载onConfigurationChanged事件 

     @Override
    public void onConfigurationChanged(Configuration config) {
    super.onConfigurationChanged(config);
     }

**④横竖屏分别布局** 

  横竖屏分别布局的方法是：
 
  在res下新建 

    layout-land 横屏 

    layout-port 竖屏 

  然后把layout中的xml文件分别考到以上目录，修改布局就可以了代码中不做任何更改。 

  在 AndroidManifest.xml文件中的 主Activity中加入 

    android:configChanges="orientation|keyboardHidden"

  然后在主Activity中的onConfigurationChanged加入 

    @Override
    public void onConfigurationChanged(Configuration config) {
    super.onConfigurationChanged(config);
     if (config.orientation == Configuration.ORIENTATION_PORTRAIT) {
    setContentView(R.layout.main); //布局 
    tv = (TextView) findViewById(R.id.EditText01); //控件 
    }

    if (config.orientation == Configuration.ORIENTATION_LANDSCAPE) {
    setContentView(R.layout.main); //布局 
    tv = (TextView) findViewById(R.id.EditText01); //控件 
    }
    }

###七、示例详细步骤
**第一步：获得许可**
 
**需要在中添加相应许可**

**第二步：根据不同的目标，针对Activity进行设置**

####目标1：屏蔽横竖屏的切换

**步骤：为Activity设置一个默认的屏幕方向 方法如下：**
 
在AndroidManifest.xml中找到该Activity 添加代码： 

    android:name=".ActivityName"
    android:screenOrientation="landscape"

设置Activity的默认方向为“横向”

**此处的screenOrientation有如下选项：** 

= unspecified 默认值，由系统判断状态自动切换 

= landscape 横屏 

= portrait 竖屏 

= user 用户当前设置的orientation值 

= behind 下一个要显示的Activity的orientation值 

= sensor 使用传感器 传感器的方向 

= nosensor 不使用传感器 基本等同于unspecified

####目标2：防止Activity的销毁

**步骤：为Activity设置configChanges属性** 

在AndroidManifest.xml中找到该Activity 添加代码： 

    android:name=".ActivityName"
    android:configChanges="orientation|keyboardHidden"

此处的configChanges有如下选项： 

= orientation 屏幕在纵向和横向间旋转 

= keyboardHidden 键盘显示或隐藏 

= fontScale 用户变更了首选的字体大小 

= locale 用户选择了不同的语言设定
 
= keyboard 键盘类型变更，例如手机从12键盘切换到全键盘 

= touchscreen或navigation 键盘或导航方式变化，一般不会发生这样的事件 

如果需要多个选项 用"|"隔开 

此处注意：如果是在实体机上测试横竖屏切换 需要orientation选项 

**【重点】如果要使得程序可以在Android模拟器上测试 需要写orientation|keyboardHidden**

**如果缺少了keyboardHidden选项 不能防止Activity的销毁** 

**并且在之后提到的onConfigurationChanged事件中 只能捕获竖屏变横屏的事件 不能捕获横屏变竖屏**

###目标3：捕获横竖屏切换的事件 

**步骤：在Activity中（ActivityName.java）重写onConfigurationChanged事件** 

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    switch (newConfig.orientation)
    {
    //更改为LANDSCAPE
    case (Configuration.ORIENTATION_LANDSCAPE):
    //如果转换为横向屏时，有要做的事，请写在这里 
    break;
    //更改为PORTRAIT
    case (Configuration.ORIENTATION_PORTRAIT):
    //如果转换为竖向屏时，有要做的事，请写在这里 
    break;
    }
    }

###八、备注：

**1、不设置Activity的android:configChanges时，切屏会重新调用各个生命周期，切横屏时会执行一次，切竖屏时会执行两次** 

**2、设置Activity的android:configChanges="orientation"时，切屏还是会重新调用各个生命周期，切横、竖屏时只会执行一次**

**3、设置Activity的android:configChanges="orientation|keyboardHidden"时，切屏不会重新调用各个生命周期，只会执行onConfigurationChanged方法**