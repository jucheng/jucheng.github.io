---
layout: post
title: "有关于Activity的四种加载模式的认知"
date: 2015-7-28
categories: Android
tags: [Android，四大组件]
---
有关于Activity的四种加载模式的认知

<!-- more -->

刚刚看了Activity的声明周期，现在我们接着来用自己的话来简单描述一下Activity的四种加载模式：

##1.Standard

Standard是Activity默认的启动模式，在不进行显示指定的情况之下，一般都是采用这种启动模式的。到了这里你也是知道Activity是使用栈来管理活动的，在Standard模式当中，也就是默认的情况下，每当我们启动一个新的Activity的时候，他就在返回栈中入栈，并处于栈顶的位置，然而这个默认的加载模式有一个比较不好的地方就是：

**对于使用Standard加载模式的Activity，系统是不会在乎这个Activity是否已经在返回栈中存在了的，每次启动的时候都会创建该活动的一个新的实例。**

现在我们举一个例子吧，就是比如现在有一个界面，上边有一个按钮，我们给他设置了按钮点击事件如下：

	public void onClick(View v) {
				Intent intent=new Intent(FirstActivity.this,FirstActivity.class);
				startActivity(intent);
          }


以上的代码看起来好像是挺别扭的，因为，我们要在FirstActivity的基础上启动FirstActivity，则从逻辑看起来并没有什么意义。但是为了研究这个启动模式，有强迫症的同学忍一下哈。

如果我们在onCreate()方法中添加一行打印信息：

    Log.d("FirstActivity,this.tostring());

**然后我们在FirstActivity界面连续点击两次按钮，我们就会发现，在logcat的打印日志上，会出现三次FirstActivity的实例,当然第一次进入的时候就会又一次，我们可以看到每点击一次按钮，就会创建一次FirstActivity实例，所以这个时候，返回栈当中就会有三个FirstActivity的实例，所以这个时候我们要连续点击三次Back键才能退出程序。**

logcat的打印日志如下：

**FirstActivity**


**FirstActivity**

**FirstActivity**

###Standard加载模式的原理图如下：
![](http://img-storage.qiniudn.com/15-7-28/98315929.jpg)

##2.SingleTop
有时候我们可能会觉得Standard加载模式会不怎么合理，因为Activity都已经在栈顶了，那为什么在此启动的时候还要重新在创建一个新的活动实例，不过，没关系，那是系统默认，我们可以根据自己的需要来进行修改相应的启动模式，接下来要介绍的是：SingleTop

###优点：

**当Activity指定的加载模式是SingleTop的时候，在启动Activity的时候要是发现返回栈的栈顶已经是该活动的话，就会认为可以直接使用他，而不会再去创建新的活动实例。**

**这种加载模式很好的解决重复创建栈顶活动的问题。**

我们还是以上边的那个为例子，但是这个时候，不管我们点击FirstActivity中的按钮多少次，logcat的打印日志里边都只会创建一个FirstActivity的实例。所以，我们只要点击一次Back键就可以退出程序了。

###缺点：

**他的缺点就是当FirstActivity不位于栈顶位置的时候，这个时候要是再次启动FirstActivity，还是创建新的实例。**

那我们就举一下例子吧，现在我们给FirstActivity中的按钮点击事件添加如下内容：

	public void onClick(View v) {
				Intent intent=new Intent(FirstActivity.this,SecondActivity.class);
				startActivity(intent);
          }

然后再修改SecondActivity中的按钮点击事件：


	public void onClick(View v) {
				Intent intent=new Intent(SecondActivity.this,FirstActivity.class);
				startActivity(intent);
          }

那这样的话，就是设置了在FirstActivity的界面点击按钮进入SecondActivity，然后在SecondActivity界面点击按钮，又会重新进入到FirstActivity。

**运行了程序之后，我们可以在logcat日志中看到，系统创建了两个不同的FirstActivity的实例，这是由于在SecondActivity中再次启动FirstActivity的时候，栈顶的活动已经变成了SecondActivity了，所以，就会重新在创建一个新的FirstActivity的实例。现在按下Back键返回到SecondActivity，再次按下Back键，才会退出程序。**

logcat的打印日志如下：

**FirstActivity**


SingleTop加载模式的原理图如下：

![](http://img-storage.qiniudn.com/15-7-28/81374725.jpg)



##3.SingleTask

**从前边我们可以看到，如果该活动没有位于栈顶的位置，那还是可能会创建多个活动的实例，所以，我们就的找个方法来让某个活动在整个应用程序中中上下文知识存在一个实例，这个时候就是要用到SingleTask了。当前的活动要是指定启动模式为SingleTask，那么每次启动该活动的时候，系统首先就会在返回栈中寻找是否存在该活动的实例，如果发现已经存在则直接使用该实例，并把在这个活动之上的 所有活动统统出栈。如果没有发现就会创建一个新的活动实例。**


我们这里就用第二个例子吧，在AndroidManifest.xml的文件里边把FirstActivity的加载模式改成SingleTask，然后在FirstActivity中添加onRestart()方法，并打印日志。在SecondActivity中添加onDestroy()方法，并打印日志。

好的，接下来我们就运行程序，在FirstActivity的界面点击按钮进入SecondActivity，然后在SecondActivity界面点击按钮，又会重新进入到FirstActivity。

logcat的打印日志如下：


**FirstActivity**

**SecondActivity**

**FirstActivity       onRestart**

**SecondActivity      onDestroy**

其实从打印日志里边我们就可以看得出，在SecondActivity中启动FirstActivity时，会发现返回栈中已经存在了一个FirstActivity的实例，并且是在SecondActivity的下边，于是SecondActivity就会从返回栈中出栈，而FirstActivity重新成为栈顶活动。因此FirstActivity的onRestart（）和
SecondActivity的onDestroy()方法就会得到执行。现在返回栈中就应该只是剩下一个FirstActivity的实例了，按下Back键就可以退出程序了。

SingleTask加载模式的原理图如下：

![](http://img-storage.qiniudn.com/15-7-28/60784545.jpg)


##4.SingleInstance

**SingleInstance在四种加载模式中算是较为复杂的一个，别急，且听我慢慢道来，不同于上边的三种加载模式，指定为SingleInstance模式的活动会启用一个新的返回栈来管理这个活动，（其实如果SingleTask指定了不同的taskAffinity，也会启动一个新的返回栈），那么这么做的意义还是挺大，接着看吧，如果我们想实现其他程序和我们的程序可以共享这个活动的实例，应该如何实现呢？使用前边三种启动模式肯定是不行的，因为每个应用程序都会有自己的返回栈，同一个活动在不同的返回栈中入栈肯定是创建了新的实例。而使用SingleInstance模式就可以解决这个问题，在这种模式下会有一个单独的返回栈来管理这个活动，不管是哪个应用来访问这个活动，都共用同一个返回栈，也就解决了共享活动实例的问题了。**


A.首先在AndroidManifest.xml里边修改SecondActivity的启动模式为
SingleInstance

        Android：launchMode="SingleInstance"


B.然后修改FirstActivity中onCreate()方法中的代码：
也就是给他加上一句代码：

    Log.d("FirstActivity","Task id is"+getTaskId());
这句话的意思就是打印出当前返回栈的ID，这个做法也是为了让我们能够更好的在打印日志看到相关活动的状态。

C.然后也在SecondActivity中加上一句：

    Log.d("SecondActivity","Task id is"+getTaskId());

D.然后就是修改SecondActivity中的按钮点击事件：
	public void onClick(View v) {
				Intent intent=new Intent(SecondActivity.this,ThirdActivity.class);
				startActivity(intent);
          }

E.当然还要创建ThirdActivity，然后在ThirdActivity中添加：

    Log.d("ThirdActivity","Task id is"+getTaskId());

现在我们运行程序，在FirstActivity的界面点击按钮进入SecondActivity，然后在SecondActivity界面点击按钮，进入到ThirdActivity。

Logcat的日志如下：

**FirstActivity**    **Task Id is 19**

**SecondActivity**   **Task Id is 20**

**ThirdActivity**    **Task Id is 19**

**可以看到SecondActivity不同于FirstActivity和ThirdActivity，这里的SecondActivity确实是存放在一个单独的返回栈里边，而且这个栈中只有SecondActivity这一个活动。**

**然后我们按下Back键进行返回，你就会发现ThirdActivity竟然会直接返回到FirstActivity，然后再次按下Back键的时候，才会返回到SecondActivity，最后按下Back键的时候，才会退出程序。**

**之所以这样，理由也不复杂，就是因为FirstActivity和ThirdActivity是存放在同一个返回栈里边的，当在ThirdActivity界面按下Back键，那么FirstActivity就会成为栈顶活动显示在界面上。然后在FirstActivity的界面按下Back键的时候，这个时候栈已经是空了的，所以就显示了另外一个返回栈的栈顶活动，就是SecondActivity，最后按下的Back键，由于所有的返回栈都已经空了，所以，就退出程序了。**

SingleInstancek加载模式的原理图如下：

![](http://img-storage.qiniudn.com/15-7-28/47023267.jpg)



##总结

好了，写这篇文章竟然写了快两个小时了，时间过得真快，以前四种加载模式也只是会背背概念，也不知道是什么意思，写完了这篇文章，感觉好多了，程序员就是需要多动手才行，这个才是真理。反观自己好像什么都还没懂，加油！！！！！