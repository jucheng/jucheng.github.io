o---
layout: post
title: "碎片最佳实践-简易的海贼王人物介绍Fragment"
date: 2015-8-6
categories: Android
tags: [Android，开发]
---
碎片最佳实践-简易的海贼王人物介绍Fragment

<!-- more -->

之前我们有提到碎片很多时候都是在平板开发当中使用的，主要是为了解决屏幕空间不嫩充分利用的问题，那是不是表明，我们开发的程序都需要提供一个手机版和一个Pad版呢？

确实是有些公司都是这么做的，但是这样做会浪费很多的人力和物力。因为维护两个版本的代码的成本很高，每当增加什么新的功能的时候，需要在两份代码里各写一遍，每当发现一个bug时，需要在两份代码里各自修改一遍，所以，一个能够同时在兼容平板和手机的应用程序是必须的。

今天我就以我需要做的那个海贼王应用来进行一个实践，在这里写下笔记。

先上应用的效果图：（

说明：这些效果图模拟平板的效果图
![](http://img-storage.qiniudn.com/15-8-4/25868241.jpg)

![](http://img-storage.qiniudn.com/15-8-4/89941838.jpg)

![](http://img-storage.qiniudn.com/15-8-4/9595787.jpg)

![](http://img-storage.qiniudn.com/15-8-4/98714590.jpg)

![](http://img-storage.qiniudn.com/15-8-4/45149178.jpg)

![](http://img-storage.qiniudn.com/15-8-4/5854291.jpg)

![](http://img-storage.qiniudn.com/15-8-4/50311570.jpg)

![](http://img-storage.qiniudn.com/15-8-4/26603101.jpg)

![](http://img-storage.qiniudn.com/15-8-4/40623023.jpg)

这以上就是海贼王里草帽海贼团里边的船员的介绍了。当然这是话外题，重点是怎么实现这个东西的。

1.首先我们需要准备一个实体类，新建类News，代码如下：

    package com.example.fragmentbestpractice;

    public class News {

	private String title;

	private String content;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

    }

**（注释：这个类很简单，title表示人物的名字（也可以是新闻的标题），content表示人物的介绍（也可以是新闻的内容）**

**2.接着就是新建类news_item.xml布局，这个布局是用于作为名字列表中各个子项的布局。** 

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >
    
    <TextView 
        android:id="@+id/news_title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:singleLine="true"
        android:ellipsize="end"
        android:textSize="18sp"
        android:paddingLeft="10dp"
        android:paddingRight="10dp"
        android:paddingTop="15dp"
        android:paddingBottom="15dp"
        />

    </LinearLayout>   

![](http://img-storage.qiniudn.com/15-8-4/37887097.jpg)

（注释：

简单讲一下这里的布局，这里的布局架构我们可以很清晰的看到，只是在LinearLayout中放入了一个TextView 用于显示名字（也就是新闻的标题）。在这里有几个比较陌生的属性就是：

**android:padding：表示给空间周围加上补白，这样不至于让文本内容会紧靠在边缘上；（从上边的图片可以看到，每个名字跟边缘四周都是有一定距离的，这样也是美观方面的一个要求）**

**android:singleLine：设置成true，表示这个TextView只能单行显示；**

**android:ellipsize：用于设定当文本内容超出空间宽度的时候，文本的缩略方式，这里指定成的end是表示在尾部进行缩略。**

）


3.接着需要创建名字列表的适配器，并让这个适配器继承自ArrayAdapter，并将泛型指定为News类。新建类NewsAdapter，代码如下：

    public class NewsAdapter extends ArrayAdapter<News> {

	private int resourceId;

	public NewsAdapter(Context context, int textViewResourceId, List<News> objects) {
		super(context, textViewResourceId, objects);
		resourceId = textViewResourceId;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		News news = getItem(position);
		View view;
		if (convertView == null) {
			view = LayoutInflater.from(getContext()).inflate(resourceId, null);
		} else {
			view = convertView;
		}
		TextView newsTitleText = (TextView) view.findViewById(R.id.news_title);
		newsTitleText.setText(news.getTitle());
		return view;
	}

    }

（注释：

这里边这和我们之前做过的那个海贼王ListView加载一样。

**A.定义适配器的开始：
这里这个是我们自定义的适配器，这个适配器继承于ArrayAdapter，并将泛型指定为News类，新建类 NewsAdapter。**

**B.列表项被滚动到屏幕内会调用的方法：
NewsAdapter写了父类的一组构造函数，用于将上下文，ListView子项布局的id和数据都传递进来。然后又重写了getView（）方法，这个方法在每个子项在每个子项被滚动到屏幕内的时候会被调用。**

**在getView()方法中，首先通过getItem()方法得到当前项的News（也就是名字）的实例，然后使用 LayoutInflater来为这个子项加载我们传入的布局.**

**C.优化ListView的运行效率：
还有一点需要强调的是要提升ListView的运行效率，我们一般在面试的时候都会遇到这个问题：就是ListView的优化问题，之所以说ListView这个控件很难用，是因为它有很多细节可以优化，其中运行效率就是很重要的一点。目前我们ListView的运行效率是很低的，因为NewsAdapter的getview（）方法每次都将布局重新加载了一遍，当ListView快速滚动的时候，这个时候就会成为性能瓶颈。**

**如果仔细观察，我们不难看到getview（）方法中还有一个convertView参数，这个参数就是将之前加载好的布局进行缓存，以便以后可以进行重用。**

**从上述代码中我们可以看到，我们在getview（）方法中进行了判断，如果convertView为空，则使用LayoutInflater去加载布局，如果不为空，则直接对convertView进行重用。这样就大大的提高了ListView的运行效率，在快速滑动的时候也可以表现出更好的性能。**

)


4.以上我们就基本把名字的代码编写完，接下来我们看一下编写人物介绍的代码。所以，新建布局文件news_content_fragment.xml,代码如下：

    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <LinearLayout
        android:id="@+id/visibility_layout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:visibility="invisible" >

        <TextView
            android:id="@+id/news_title"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:padding="10dp"
            android:textSize="20sp" />

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="1dp"
            android:scaleType="fitXY"
            android:src="@drawable/spilt_line" />

        <TextView
            android:id="@+id/news_content"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:padding="15dp"
            android:textSize="18sp" />
    </LinearLayout>

    <ImageView
        android:layout_width="1dp"
        android:layout_height="match_parent"
        android:layout_alignParentLeft="true"
        android:scaleType="fitXY"
        android:src="@drawable/spilt_line_vertical" />

    </RelativeLayout>

效果图：
![](http://img-storage.qiniudn.com/15-8-5/90337221.jpg)

**其实从上边的这个图里边，我们课易很清楚的看到，人物介绍的这个布局是分为两个部分的。头部是显示完整的名字，正文部分显示的是人物介绍的内容，中间使用一条细线分割开来。这里的细线是利用ImageView显示了一张很窄的图片来实现的，将ImageView的android:scaleType设置为fitXY，表示让这张图片充满整个控件的大小。**

5.然后又创建一个NewsContentFragment类，继承自Fragment。

    public class NewsContentFragment extends Fragment {

	private View view;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		view = inflater.inflate(R.layout.news_content_frag, container, false);
		return view;
	}

	public void refresh(String newsTitle, String newsContent) {
		View visibilityLayout = view.findViewById(R.id.visibility_layout);
		visibilityLayout.setVisibility(View.VISIBLE);
		TextView newsTitleText = (TextView) view.findViewById(R.id.news_title);
		TextView newsContentText = (TextView) view
				.findViewById(R.id.news_content);
		newsTitleText.setText(newsTitle);
		newsContentText.setText(newsContent);
	}

   }

（注释：

**首先在onCreateView()方法里边加载了我们刚刚创建的new_content_frag布局，然后接下来的就是又提供了一个refresh（）方法，这个方法就是用于将人物的名字和人物的介绍显示在界面上。在这里我们可以看到，这里是通过findViewById（）方法获取到人物的名字和人物介绍的内容控件，然后将方法传递进来的参数设置进去。而这里的setVisibility（）方法，我相信你也不陌生，这个方法的作用就是设置控件的可见性。**

）

5.接着就是要创建一个在活动中使用的人物介绍的布局，新建news_content.xml,代码如下：

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >
	
    <fragment 
        android:id="@+id/news_content_fragment"
        android:name="com.example.fragmentbestpractice.NewsContentFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        />

    </LinearLayout>

**（注释：在这里充分发挥了代码的复用性，直接在布局中引入了NewsContentFragment，这样也就相当于把news_conetent_frag布局中的内容自动加了进来。）**

6.然后新建NewsContentActivity。作为显示人物介绍的活动，代码如下：

    public class NewsContentActivity extends Activity {

	public static void actionStart(Context context, String newsTitle,
			String newsContent) {
		Intent intent = new Intent(context, NewsContentActivity.class);
		intent.putExtra("news_title", newsTitle);
		intent.putExtra("news_content", newsContent);
		context.startActivity(intent);
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.news_content);
		String newsTitle = getIntent().getStringExtra("news_title");
		String newsContent = getIntent().getStringExtra("news_content");
		NewsContentFragment newsContentFragment = (NewsContentFragment) getFragmentManager()
				.findFragmentById(R.id.news_content_fragment);
		newsContentFragment.refresh(newsTitle, newsContent);
	}

    }

（注释：

**可以看到，在onCreate（）方法中我们通过获取到传入的相对应的名字和人物介绍的内容，然后调用FragmentManager（）的findFragmentById()方法得到NewsContentFragment的实例，接着调用它的refresh（）方法，并将人物的名字和人物介绍的内容传入，这样就可以把这些数据显示出来了。**

**需要注意的是，这里我们调用了一个actionStart（）的方法，这个方法的作用就是：**

**在这个方法中完成了Intent的构建，另外所有的 NewsContentActivity所需要的数据都是通过actionStart（）方法的参数传递进来的，然后把他们存储到Intent当中，最后调用startActivity（）方法启动 NewsContentActivity。**

）

7.接着就是需啊哟创建一个用于显示名字列表的布局，新建news_title_frag.xml,代码如下：

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <ListView
        android:id="@+id/news_title_list_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent" >
    </ListView>

    </LinearLayout>

（注释：

这个布局很简单，就是单纯的设置了一个ListView，但是，这个布局是并不是给活动用的，而是给碎片使用的，因此我们还需要创建一个碎片来加载这个布局。新建一个NewTitleFragment类，继承自Fragment。代码如下：

    public class NewsTitleFragment extends Fragment implements OnItemClickListener {

	private ListView newsTitleListView;

	private List<News> newsList;

	private NewsAdapter adapter;

	private boolean isTwoPane;

	@Override
	public void onAttach(Activity activity) {
		super.onAttach(activity);
		newsList = getNews();//初始化人物的数据
		adapter = new NewsAdapter(activity, R.layout.news_item, newsList);
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View view = inflater
				.inflate(R.layout.news_title_frag, container, false);
		newsTitleListView = (ListView) view
				.findViewById(R.id.news_title_list_view);
		newsTitleListView.setAdapter(adapter);
		newsTitleListView.setOnItemClickListener(this);
		return view;
	}

	@Override
	public void onActivityCreated(Bundle savedInstanceState) {
		super.onActivityCreated(savedInstanceState);
		if (getActivity().findViewById(R.id.news_content_layout) != null) {
			isTwoPane = true;//可以找到news_content_layout布局时，为双页模式
		} else {
			isTwoPane = false;//找不到news_content_layout布局时，为单页模式
		}
	}

	@Override
	public void onItemClick(AdapterView<?> parent, View view, int position,
			long id) {
		News news = newsList.get(position);
		if (isTwoPane) {
       //如果是双页模式，则刷新NewsContentFragment中的内容
			NewsContentFragment newsContentFragment = (NewsContentFragment) getFragmentManager()
					.findFragmentById(R.id.news_content_fragment);
			newsContentFragment.refresh(news.getTitle(), news.getContent());
		} else {
       //如果是单页模式，则直接启动NewsContentActivity
			NewsContentActivity.actionStart(getActivity(), news.getTitle(),
					news.getContent());
		}
	}

	private List<News> getNews() {
		List<News> newsList = new ArrayList<News>();
		News news1 = new News();
		news1.setTitle("Monkey·D·Luffy");
		news1.setContent("草帽海贼团船长。由于他的标志性特征是一顶草帽，因此常被直接称呼为草帽。梦想是找到传说中的ONE PIECE，成为海贼王。性格积极乐观，爱憎分明且十分重视伙伴，对任何危险的事物都超感兴趣。看似白痴，却是一个大智若愚型的无愧船长之职的人。和其他传统的海贼所不同的是，他并不会为了追求财富而无故杀戮，而是享受着身为海贼的冒险。");
		newsList.add(news1);
		News news2 = new News();
		news2.setTitle("Roronoa Zoro");
		news2.setContent("草帽海贼团中的战斗员，是悬赏过亿武艺高强的三刀流剑士，超新星11人之一，能够自由操纵三把刀战斗。爱喝酒，爱睡觉，讲义气，海贼第一超级大路痴。为了小时候与挚友的约定而踏上了前往世界第一剑士的道路，随后成为主角蒙奇·D·路飞的第一个伙伴。在初次败给世界第一剑士“鹰眼米霍克”后向路飞发誓永不再败，并且更加努力的锻炼自己。两年后的他成功与伙伴们汇合，并且为了实现自己的梦想，奔赴强者如云的新世界。");
		newsList.add(news2);
		News news3 = new News();
		news3.setTitle("Nami");
		news3.setContent("草帽海贼团的航海士。路飞的第二个伙伴，特征是橘色的短发（现在已经长至肩膀）和左肩的刺青(风车与橘子的图案，原来是阿龙海贼团的标志，加入路飞的海贼团后才改为风车与橘子的图案），使用棍术，武器是乌索普(骗人布）的发明天候棒（能操纵天气）及其后乌索普利用贝改装成加强版天候棒。精通气象学和航海术，擅长偷术、骗术、谈判及威胁恐吓，头脑聪明又机灵，能精确画出海图的天才。");
		newsList.add(news3);
		News news4 = new News();
		news4.setTitle("Sanji");
		news4.setContent("草帽海贼团厨师，金发，有着卷曲眉毛，永远遮住半边脸的家伙，香烟不离口，最爱女人，很花心但很有风度，海贼中的绅士。小时候跟随大海贼红脚哲普学习厨艺。踢技以快准狠被海军称之为“黑足”，但从不愿意伤害任何的女性，哪怕是敌人。");
		newsList.add(news4);
		News news5 = new News();
		news5.setTitle("Usopp");
		news5.setContent("草帽海贼团狙击手，特征为头戴狙击防风镜、浅啡色头巾，长鼻子。小时候是出名的吹牛大王，和村里的几个孩子组成“乌索普海贼团”，自称乌索普船长。发现克洛船长的阴谋后，立志要保护村里的人，和路飞并肩作战。梦想是要成为勇敢的海上战士。");
		newsList.add(news5);
		News news6 = new News();
		news6.setTitle("Franky");
		news6.setContent("草帽海贼团船匠，性格豪放，喜欢唱歌，跳奇怪的舞，下身喜欢只穿一条短裤。身为改造人的弗兰奇，身体藏着各种兵器。弗兰奇在被cp9抓入司法岛的过程中被路飞他们救罗宾的精神所感动，义无返顾的站在路飞他们一边。司法岛事件结束后，弗兰奇用宝树亚当的材料建造了一艘梦想之船，取名“桑尼号（即万里阳光号）”，并赠送给草帽海贼团。后来在路飞的邀请下进入了草帽海贼团。");
		newsList.add(news6);
		News news7 = new News();
		news7.setTitle("Tony Tony Chopper");
		news7.setContent("草帽海贼团的船医，吃了人人果实的驯鹿能力者，人人驯鹿，可用蓝波球进行八段身体变形。原为磁鼓岛库蕾哈医生最宠爱的驯鹿兼医疗助手。乔巴的恩人是“庸医”希鲁鲁克医生，他身为野生驯鹿时本来没有名字，“乔巴”也是由希鲁鲁克给他命名的，意思是他有一对连树木都可以轻松砍倒的角。");
		newsList.add(news7);
		News news8 = new News();
		news8.setTitle("Nico·Robin");
		news8.setContent("草帽海贼团的考古学家，出生在西海的考古学之岛“奥哈拉”。特征是头发长刘海后梳，额上架一副橙色眼镜，身穿一件深亮蓝马甲和粉橙色印花长裙，吃了“花花果实”的恶魔果实能力者，能让身体的任何部位像开花一样长在视线范围内的任何有形体的事物上并作出攻击或其他用途。目标是找到真正的历史正文，绝不饶恕践踏历史文物的人。");
		newsList.add(news8);
		News news9 = new News();
		news9.setTitle("Brook");
		news9.setContent("草帽海贼团音乐家。原本是某国护卫队团长，后加入伦巴海贼团，50年前跟鲸鱼拉布约定在“双子峡”重逢。后来在魔幻三角地带遇到敌人并遭遇毒手，因黄泉果实的能力，灵魂走出黄泉并准备回身体时，在魔幻三角地带迷路一年，找到的身体已变成骷髅，但爆炸头仍然存在，自此他只能以骷髅状态生存。幽灵岛战役结束后，从路飞口中得知伙伴拉布现在平安无事的消息，为了履行和拉布的约定，才正式加入草帽海贼团。");
		newsList.add(news9);
		return newsList;
	}

    }


（这段代码可谓是很重要的一段代码来的，不过由于我直接添加的人物介绍在这里，实际上开发是绝对不允许这样的，这里要重点讲解一下这段代码。

**根据碎片的生命周期，我们可以知道，onAttach（）方法会首先执行，因此在这里我们做了一些数据的初始化，比如调用getNews()方法来获取几条模拟的人物数据，以及完成NewsAdapter的创建。然后在onCreateView（）方法中加载了news_title_frag布局，并给名字列表的点击注册了点击事件。接下来在onActivityCreated（）方法中，我们通过是否能够找到一个id为news_content_layout的VIew来判断当前是双页模式还是单页模式，这个id为news_content_layout的View只在双页模式中出现，在稍后的布局中你将会看到。然后在ListView的点击事件里我们可以判断。如当前是单页模式，那就启动一个新的活动去显示人物介绍的内容，如果当前是双页模式，那就更新人物介绍内容碎片里的数据。**

）

8.剩下的工作就简单了，修改一下activity_main.xml中的代码：

    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >
	
    <fragment 
        android:id="@+id/news_title_fragment"
        android:name="com.example.fragmentbestpractice.NewsTitleFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        />
    
    </LinearLayout>

（注释：从以上的代码我们可以看到，在单页的模式下，只会加载一个名字标题的碎片，然后新建一个layout-sw600dp的文件夹，在这个文件夹下再创建一个activity_main.xml：

![](http://img-storage.qiniudn.com/15-8-6/57565007.jpg)

    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <fragment
        android:id="@+id/news_title_fragment"
        android:name="com.example.fragmentbestpractice.NewsTitleFragment"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1" />

    <FrameLayout
        android:id="@+id/news_content_layout"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="3" >

        <fragment
            android:id="@+id/news_content_fragment"
            android:name="com.example.fragmentbestpractice.NewsContentFragment"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </FrameLayout>

    </LinearLayout>

（注释：

从代码上我们可以看到在双页模式下，我们同时引入了两个碎片，并将人物介绍的碎片放在了一个FrameLayout布局下，而这个布局的id正是new_content_layout。因此，能够找到这个id的时候就是双页模式，否则就是单页模式。

）

9.最后做的工作就是MainActivity中修改一下，把标题栏去掉。

    public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.activity_main);
	}

    }


10.最后就是运行程序了，我们前边已经给出了在平板上的运行效果了，也就是双页模式.由于在平板上跟在手机上的运行效果是不一样的，所以我们改变一下Genymotion的虚拟机的分辨率就可以了，之前平板的是分辨率是1024*的现在我把他改成720的，就可以变回手机显示了，效果如下：

我们就可以看到一系列的标题：

![](http://img-storage.qiniudn.com/15-8-6/33075044.jpg)


我们点击了相对应的名字之后，就会启动一个新的活动来显示相应的人物介绍：

![](http://img-storage.qiniudn.com/15-8-6/79215787.jpg)



###总结：

在这里有一个很需要注意的地方就是：

**如何在运行时，如何让程序判断是使用双页模式还是单页模式？**

**这就需要借助最小宽度限定符（Smallest-width-Qualifiers)来实现了，最小宽度限定符允许我们对屏幕的宽度指定一个最小值（以dp为单位），然后以这个最小值为临界点，屏幕宽度大于这个值的设备就加载一个布局，屏幕宽度小于这个值就加载另外一个布局。**

**我们在这里是定义了一个layout-sw600dp文件夹，然后在这个文件夹下边新建activity_main.xml布局，这就意味着，当程序运行在屏幕大于600dp的设备上时，会加载layout-sw600dp中的这个activity_main.xml布局。**

**最小限定符是在Android 3.2版本引入的，由于我们虚拟机的版本是4.3的，所以运行上是没问题的。**