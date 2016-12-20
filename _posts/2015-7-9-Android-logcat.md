---
layout: post
title:  "Logcat查看/输出日志信息"
date:   2015-7-9
categories: Android
tags: [Android，调试]
---

Logcat查看/输出日志信息

<!-- more -->

引言:
学过JavaSE的同学都知道,运行java程序时,我们在Eclpise可以通过Console控制台看到程序的输出信息

但是在android中的话,console只能看到这些信息:

这些信息都是程序都是程序安装到虚拟机上的信息而已

怎么查看Logcat的日志信息

##首先我们要知道日志的信息类型有五种:

**优先级依次是:ERROR(错误)  >  WARN(警告)  >INFO(提示)  >DEBUG(调试)  >VERBOSE(冗长,啰嗦的提示)**

 

选择类型信息的位置:

![](http://img-storage.qiniudn.com/15-7-9/45533090.jpg)

 


通常我们看的都是error类型的提示信息，一般致命的错误才会导致程序的终止运行

另外:隔壁的按钮依次是:     
  
 保存日志       
   
  清空日志信息    
  
 是否显示查询栏 

将滚动条滑动到底部   

 

 

 

演示一下如何通过日志信息查找出程序出现的错误
我们在mainActivity中定义一个TextView,并没有通过FindViewByID实例化

代码:

    package com.jay.logcatdemo;  
  
    import android.os.Bundle;  
    import android.widget.TextView;  
    import android.app.Activity;  
  
    public class MainActivity extends Activity {  
  
    private TextView text;  
      
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  
        //这里的我们之前定义的TextView并没有实例化,我们这里就直接给他赋值了  
        //会报空指针异常  
        text.setText("呵呵！");  
      }  
     }  

当我们运行后,程序出现了这样的提示框，接着自己就关闭了

![](http://img-storage.qiniudn.com/15-7-9/34984344.jpg)

 

接着看下我们的Logcat

![](http://img-storage.qiniudn.com/15-7-9/13285207.jpg)

这么多的红字,不知道的人还以为自己的程序出什么大错误了,当然现在的错误信息也不算多

 

看logcat的小窍门:

![](http://img-storage.qiniudn.com/15-7-9/16304564.jpg)

###只需要看FATAL EXCEPTION:main后的第一二行错误就可以初步判段大概出现了什么错误,接着向下看,找到自己包开头的错误,双击即可来到出错的大概位置

双击后:


![](http://img-storage.qiniudn.com/15-7-9/28027385.jpg)
 

##！！笔者建议:！！

**看日志信息不是一天养成的,写的代码多了,遇到的问题就会更多,遇到更多的错误,这就是你提升的过程**

**当积累到一定程度,你一眼就可以看出代码哪里出错了,比如很多时候我们会漏掉activity的配置,很多人纠结久，一直检查代码也找不出错误所在....**

**所以,多写代码吧,孩子,o(╯□╰)o**

 

自定义输出日志信息
五种输出不同日志信息的方法:
参数都是:

String tag:调试信息标签名称

String tag:自定义的调试信息

 

VERBOSE:         Log.v(String tag, String msg);

DEBUG:              Log.d(String tag, String msg);

INFO:                   Log.i(String tag, String msg);

WARN:                Log.w(String tag, String msg);

ERROR:              Log.e(String tag, String msg);  

 

直接是单词的首字母不同而已

 

代码演示:

    package com.jay.logcatdemo;  
  
    import android.os.Bundle;  
    import android.util.Log;  
    import android.widget.TextView;  
    import android.app.Activity;  
  
    public class MainActivity extends Activity {  
  
    private static final String TAG = "JAY-tag";  
      
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  
        try {  
            testLog();  
        } catch (Throwable e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
    }  
      
    public void testLog(){  
        Log.i(TAG, "output info tag!");  
    }  
    }  

    运行后查看logcat:



 

 

如果信息太多怎么办？
我们可以通过TAG筛选对应的日志信息

点击左边的

![](http://img-storage.qiniudn.com/15-7-9/31430155.jpg)


点击后:


![](http://img-storage.qiniudn.com/15-7-9/33156806.jpg)

 

OK后就可以找到TAG = JAY-tag的日志信息了



 ![](http://img-storage.qiniudn.com/15-7-9/63634499.jpg)

 

这些都是很简单的东东

另外还有可以通过system.out输出,默认是INFO类型的

 system.err输出,默认是ERROR类型的

 

本文转自：
<http://blog.csdn.net/coder_pig/article/details/17270323>