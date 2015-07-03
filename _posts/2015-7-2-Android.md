---
layout: post
title: "Android开发之重点——Fragment!"
date: 2015-7-2
categories: Android
---

☆ fragment和fragmentactivity解析 (转)

<!-- more -->

##一、为什么要使用Fragment 

1、当我们需要动态的多界面切换的时候，就需要将UI元素和Activity融合成一 个模块。在2.3中我们一般通过各种Activity中进行跳转来实现多界面的跳转和单个界面动态改变。在4.0或以上系统中就可以使用新的特性来方便的 达到这个效果--Fragment类。Fragment类似一个嵌套Activity，可以定义自己的layout和自己的生命周期。

2、 多个Fragment可以放在一个Activity中（所以上面讲到类似一个嵌套Activity），而这个类可以对这些Fragment进行配置以适应不同的屏幕尺寸（比如平板和手机）。

##二、使用Fragment 

1、Fragment 是 activity 的界面中的一部分或一种行为。可以把多个 Fragment 组合到一个 activity 中来创建一 个多面界面并且可以在多个 activity 中重用一个 Fragment。可以把 Fragment 认为模块化的一段 activity,它具 有自己的生命周期,接收它自己的事件,并可以在 activity 运行时被添加或删除。

2、Fragment 不能独立存在,它必须嵌入到 activity 中,而且 Fragment 的生命周期直接受所在的 activity 的影 响。

3、当向 activity 中添加一个 Fragment 时,它须置于 ViewGroup 控件中,并且需定义 Fragment 自己的界面。可 以在 layout.xml 文件中声明 Fragment,元素为:<fragment>;也可以在代码中创建 Fragment,然后把它加入到 ViewGroup 控件中。然而,Fragment 不一定非要放在 activity 的界面中,它可以隐藏在后台为 actvitiy 工作。

##三、 生命周期

 

通常, 应当至少实现如下的生命周期方法:

onCreate()

当创建fragment时, 系统调用该方法. 

在实现代码中,应当初始化想要在fragment中保持的必要组件, 当fragment被暂停或者停止后可以恢复.

onCreateView()

fragment第一次绘制它的用户界面的时候, 系统会调用此方法. 为了绘制fragment的UI,此方法必须返回一个View, 这个view是你的fragment布局的根view. 如果fragment不提供UI, 可以返回null.

onPause()

用户将要离开fragment时,系统调用这个方法作为第一个指示(然而它不总是意味着fragment将被销毁.) 在当前用户会话结束之前,通常应当在这里提交任何应该持久化的变化(因为用户有可能不会返回).

 

大多数程序应最少对 fragment 实现这三个方法。当然还有其它几个回调方法可应该按情况实现之。
下图为 fragment 的生命周期(它所在的 activity 处于运行状态)。

![](http://img-storage.qiniudn.com/15-7-2/46829065.jpg)


##四、如何使用Fragment 

###1、添加一个用户界面   
fragment通常用来作为一个activity的用户界面的一部分,并将它的layout提供给activity.为了给一
个fragment提供 一 个layout,你必须实现 onCreateView()回调方法, 当到了fragment绘制它自己的layout的时候,Android系统调用它.你的此方法的实现代码必须返回一个你的fragment的 layout的根view. 

从onCreateView()返回的View, 也可以从一个layout的xml资源文件中读取并生成. 为了帮助你这么做, onCreateView() 提供了一个LayoutInflater 对象.

举个例子, 这里有一个Fragment的子类, 从文件 frament_main.xml 加载了一个layout:

    <span style="font-size:14px;"> 
    @Override  
    public View onCreateView(LayoutInflater inflater, ViewGroup container,  
            Bundle savedInstanceState) {  
        View view = inflater.inflate(R.layout.frament_main, container, false);  
        return view;  
    }</span>  


**PS：**

**1.**
**传入onCreateView()的container参数是你的fragmentlayout将被插入的父ViewGroup(来自activity的 layout)  savedInstanceState 参数是一个Bundle, 如果fragment是被恢复的,它提供关于fragment的之前的实例的数据,**

**2.**

**inflate() 方法有3个参数:**

**a、想要加载的layout的resource ID.**

**b、加载的layout的父ViewGroup.传入container是很重要的, 目的是为了让系统接受所要加载的layout的根view的layout参数,由它将挂靠的父view指定.**

**c、布尔值指示在加载期间, 展开的layout是否应当附着到ViewGroup (第二个参数).**


###2、将fragment添加到activity

  通常地, fragment为宿主activity提供UI的一部分, 被作为activity的整个viewhierarchy的一部分被嵌入. 有2种方法你可以添加一个fragment到activity layout:


####2.1、使用XML将Fragment添加到一个Activity中

  在这种情况下，你可以像为View一样, 为fragment指定layout属性。

    <?xml version="1.0" encoding="utf-8"?>  
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    android:orientation="horizontal"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent">  
    <fragment android:name="com.example.news.ArticleListFragment"  
            android:id="@+id/list"  
            android:layout_weight="1"  
            android:layout_width="0dp"  
            android:layout_height="match_parent" />  
    <fragment android:name="com.example.news.ArticleReaderFragment"  
            android:id="@+id/viewer"  
            android:layout_weight="2"  
            android:layout_width="0dp"  
            android:layout_height="match_parent" />  
    </LinearLayout>  


PS：

   1、fragment 中的 android:name属性指定了在layout中实例化的Fragment类.当系统创建这个activity layout时,它实例化每一个在layout中指定的fragment,并调用每一个上的onCreateView()方法,来获取每一个 fragment的layout.系统将从fragment返回的 View直接插入到<fragment>元素所在的地方. 


   **2、通过在xml中定义fragment的方式，我们不能在运行时移除fragment。如果我们想要通过切换fragments来跟用户有更好的互动，那么就需要在activity启动的时候定义fragment了。**

###2.2、在运行时添加一个Fragment到Activity

上面一节的在activity的布局文件（layout xml）中添加Fragment的方法我们已经知道了。现在我们将学习另外一种方式，这种方式允许我们在运行时动态的显示和隐藏fragment。为了达 到在activity中动态管理Fragment，我们需要用到FragmentManager，并且通过它创建 FragmentTransaction。

activity允许移除或者替换fragment需要有如下条件：

   1、**activity的onCreate()方法中添加初始化的fragment**

  **2、fragment放置位置的布局中必须有一个视图容器**

比如:res/layout/news_articles.xml文件提供了视图容器。

    <span style="font-size:14px;">
    <FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    android:id="@+id/fragment_container"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent" /></span>  


**Activity中使用getSupportFragmentManager()获取FragmentManager，之后调用 beginTransaction去创建一个FragmentTransaction对象， 再调用add()方法即可添加一个fragment。 在activity中可以使用同一个FragmentTransaction对象去执行多个fragment事务，当做这样操作时，必须调用 commint()方法。** 

下面的代码演示怎样添加一个fragment到res/layout/news_articles.xml的layout:

    import android.os.Bundle;  
    import android.support.v4.app.FragmentActivity;  
  
    public class MainActivity extends FragmentActivity {  
    @Override  
    public void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.news_articles);  
  
        if (findViewById(R.id.fragment_container) != null) {  
  
            if (savedInstanceState != null) {  
                return;  
            }  
  
            HeadlinesFragment firstFragment = new HeadlinesFragment();  
  
            firstFragment.setArguments(getIntent().getExtras());  
              
            // Add the fragment to the 'fragment_container' FrameLayout  
            getSupportFragmentManager().beginTransaction()  
                    .add(R.id.fragment_container, firstFragment).commit();  
        }  
    }  
    }


**add()的第一个参数是fragment要放入的ViewGroup, 由resource ID指定,第二个参数是需要添加的fragment.一旦用FragmentTransaction做了改变,为了使改变生效,必须调用commit().**

PS

现在再来说明另外一个实例，实例图如下，我要在四个标签页面切换（主页，手机，配件，购物车）

![](http://img-storage.qiniudn.com/15-7-2/79031276.jpg)


代码如下，具体就是通过影藏和显示fragment来实现切换：


    <span style="font-size:14px;">import android.os.Bundle;  
    import android.support.v4.app.Fragment;  
    import android.support.v4.app.FragmentActivity;  
    import android.view.View;  
    import android.view.Window;  
  
    public class FramentMainActivity extends FragmentActivity {  
  
    private Fragment[] fragments;  
  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        requestWindowFeature(Window.FEATURE_NO_TITLE);  
        setContentView(R.layout.activity_frament_main);  
  
        fragments = new Fragment[4];  
        fragments[0] = getSupportFragmentManager().findFragmentById(R.id.farment_main);  
        fragments[1] = getSupportFragmentManager().findFragmentById(R.id.farment_phone);  
        fragments[2] = getSupportFragmentManager().findFragmentById(R.id.farment_accessory);  
        fragments[3] = getSupportFragmentManager().findFragmentById(R.id.farment_cart);  
        getSupportFragmentManager().beginTransaction().  
        hide(fragments[1]).hide(fragments[2]).hide(fragments[3]).show(fragments[0]).commit();  
  
    }  
  
    public void mainClick(View view){  
        getSupportFragmentManager().beginTransaction().hide(fragments[1]).hide(fragments[2]).hide(fragments[3]).show(fragments[0]).commit();  
    }  
    public void phoneClick(View view){  
        getSupportFragmentManager().beginTransaction().hide(fragments[0]).hide(fragments[2]).hide(fragments[3]).show(fragments[1]).commit();  
    }  
    public void accessoryClick(View view){  
        getSupportFragmentManager().beginTransaction().hide(fragments[0]).hide(fragments[1]).hide(fragments[3]).show(fragments[2]).commit();  
    }  
    public void cartClick(View view){  
        getSupportFragmentManager().beginTransaction().hide(fragments[0]).hide(fragments[1]).hide(fragments[2]).show(fragments[3]).commit();  
    }  
    }</span>     


###3、Frament 管理

**要管理 fragment,需使用 FragmentManager,要获取它,需在 activity 中调用方法 getFragmentManager()。 可以用 FragmentManager 来做以上事情:**

**使用方法 findFragmentById()或 findFragmentByTag(),获取 activity 中已存在的 fragment**

**使用方法 popBackStack()从 activity 的后退栈中弹出 fragment(这可以模拟后退键引发的动作)**

**用方法 addOnBackStackChangedListerner()注册一个侦听器以监视后退栈的变化**

**还可以使用 FragmentManager 打开一个 FragmentTransaction 来执行 fragment 的事务,比如添加或删除 fragment。**

**在 activity 中使用 fragment 的一个伟大的好处是能跟据用户的输入对 fragment 进行添加、删除、替换以及执行 其它动作的能力。提交的一组 fragment 的变化叫做一个事务。事务通过** **FragmentTransaction 来执行。还可以把每个 事务保存在 activity 的后退栈中,这样就可以让用户在 fragment 变化之间导航(跟在 activity 之间导航一样)。**

可以通过 FragmentManager 来取得 FragmentTransaction 的实例,如下:

    FragmentManagerfragmentManager = getFragmentManager();  
    FragmentTransactionfragmentTransaction =fragmentManager.beginTransaction();


**一个事务是在同一时刻执行的一组动作(很像数据库中的事务)。可以用 add(),remove(),replace()等方法构成事务,最后使用 commit()方法提交事务。在调用 commint()之前,可以用addToBackStack()把事务添加到一个后退栈中, 这个后退栈属于所在的 activity。有了它,就可以在用户按下返回键时,返回到 fragment 执行事务之前的状态。如 下例:演示了如何用一个 fragment 代替另一个 fragment,同时在后退栈中保存被代替的 fragment 的状态。**

###4、为Activity创建事件回调方法

**在 一些情况下, 你可能需要一个fragment与activity分享事件. 一个好的方法是在fragment中定义一个回调的interface, 并要求宿主activity实现它.当activity通过interface接收到一个回调, 必要时它可以和在layout中的其他fragment分享信息.**

例如, 如果一个新的应用在activity中有2个fragment – 一个用来显示文章列表(framgent A), 另一个显示文章内容(fragment B) – 然后 framgent A必须告诉activity何时一个list item被选中,然后它可以告诉fragmentB去显示文章.

PS

最后在简单说说一个项目的大致实现，比如在手机上面实现了一个FragmentActivity + 多个fragment（登录，菜单，详细，账户等页面）。

1、每一个项目包括很多活动，每一个活动(FragmentActivity)相互不影响，每一个活动(FragmentActivity)包括很多子活动(fragment,一个页面),每一个子活动也相互不影响.

2、每一个活动(FragmentActivity)用FrameLayout来显示子活动，并且对活动进行堆栈管理，实现数据不用重复拉取，就跟搜狐新闻一样的效果.

3、登录（FragmentActivity）：logo页面，登录页面

4、菜单（FragmentActivity）：菜单选择页面(侧边栏，滑动)，子菜单功能(每一个新闻页面)

5、其他（FragmentActivity）：上传页面，下载页面等

每一个活动(FragmentActivity)实现了相互不影响。   

另外的归纳：加一个Fragment到Activity的步骤：

![](http://img-storage.qiniudn.com/15-7-2/70915869.jpg)


本文转自：

<http://blog.csdn.net/u011067360/article/details/25547741>
