---
layout: post
title: "android布局layout中的一些属性!"
date: 2015-7-3
categories: Android
tags: [Android，布局文件]
---
android布局layout中的一些属性

<!-- more -->
 
###1、可以使某些资源文件或UI组件可重用

    <include layout="@layout/other"/> 

###2、定义一个文本编辑框，使用绝对定位

    android:layout_x="20dip"

    android:layout_y="80dip"

###3、控件位置

    android:layout_centerHorizontal 控制该组件是否位于布局容器的水平居中位置

    android:layout_centerVertical 控制该组件是否位于布局容器的垂直居中位置

    android:layout_centerInParent 控制该组件是否位于布局容器的中央位置

    android:layout_alignParentBottom 控制该组件是否与布局容器底端对齐

    android:layout_alignParentLeft 控制该组件是否与布局容器左边对齐

    android:layout_alignParentRight 控制该组件是否与布局容器右边对齐

    android:layout_alignParentTop 控制该组件是否与布局容器顶端对齐

    android:layout_toRightOf 控制该组件位于给出的ID组件的右侧

    android:layout_toLeftOf 控制该组件位于给出的ID组件的左侧

    android:layout_above 控制该组件位于给出的ID组件的上方

    android:layout_below 控制该组件位于给出的ID组件的下方

    android:layout_alignTop 控制该组件与给出的ID组件的上边界对齐

    android:layout_alignBottom 控制该组件与给出的ID组件的下边界对齐

    android:layout_alignLeft 控制该组件与给出的ID组件的左边界对齐

    android:layout_alignRight 控制该组件与给出的ID组件的右边界对齐

###4、设置单元格内的控件的形状（可压缩，可伸长，可隐藏等）

    android:shrinkColumns 设置该列的所有单元格的宽度可以被收缩，以保证该表格能够适应父容器宽度

    android:stretchColumns 设置该列的所有单元格的宽度可以被拉伸，以保证组件能完全填满表格空余空间

    android:collapseColumns 设置该列的所有单元格会被隐藏 

###5、TextView属性设置

    设置字体为30pt android:textSize="30pt"

    设置中间省略 android:singleLine="true" android:ellipsize="middle"

    对邮件增加链接 android:autoLink="email" android:autoLink="email"

    测试密码框 android:password="true"

    绘制一张图片 android:drawableLeft="@drawable/icon"

###6、EditText属性设置

#####当前组件在得到焦点的时候，自动选取该组件内的所有的文本内容

    android:selectAllOnFocus="true"

#####当前组件只能输入数字

    android:phoneNumber="true"

#####当前组件显示的提示信息，被选中时，内容自动被清空

    android:hint="@string/edtPhone

###7、按钮以及属性（Button……）

    普通文字按钮 android:background=""

    普通图片按钮 <ImageButton  android:src=""/>
 
 #####按下时显示不同图片的按钮(利用配置文件解决即，button_selector.xml，

    android:src="@drawable/button_selector" )

#####Button_selector.xml：指定按钮按钮下时的图片

    <item android:state_pressed="true"
    android:drawable="@drawable/red"
    />

#####指定按钮松开时的图片：

    <item
    android:state_pressed="false"
    android:drawable="@drawable/purple"
    />

#####带文字的图片按钮 

    android:background="@drawable/button_selector"

    android:text="@string/btnImage"

###8、单选按钮和多选按钮（RadioGroup、CheckBox）

#####定义一组单选框

    <RadioGroup 
    android:orientation="vertical"
 
    android:layout_gravity="center_horizontal"


#####定义一个单选框 

    <RadioButton 
    android:text="@string/male"
    />

#####定义一个垂直的线性布局

    <LinearLayout
    android:layout_gravity="center_horizontal"

#####定义三个复选框

    <CheckBox
    android:text="@string/red"
    android:checked="true" /> ……

###9、带类似开关式的按钮（ToggleButton）

#####定义一个ToggleButton按钮：

    <ToggleButton
    android:textOff="@string/layoutH" 
    android:textOn="@string/layoutV" />

#####定义一个可以动态改变方向的线性布局：

    TestActivity：

    ToggleButton tb = (ToggleButton) findViewById(R.id.toggle);

    layout = (LinearLayout) findViewById(R.id.test);


###10、图像视图（ImageView）

    <ImageView
    android:src="@drawable/icon" 

    android:layout_marginLeft="10dp" 距离左边10 dp

    android:layout_marginTop="100dp" 距离上面100dp

    />

###11、自动完成文本框 （AutoCompleteTextView）

#####指定输入一个字符后进行提示：

    <AutoCompleteTextView  />

#####设置出现在下拉菜单中的提示标题：
 
    android:completionHint="@string/title"

#####设置下拉菜单的宽度：

    android:dropDownWidth="100dp"

#####设置下拉菜单与文本框之间的水平偏移：

    android:dropDownHorizontalOffset="30dp"

#####设置用户至少输入几个字符才会显示提示：

    android:completionThreshold="2"

#####具体实现（Activity）：

####1、定义字符串数组，作为提示的文本

    String[] books = new String[] { "active", "activity", "activity", 
    "apple","apple" };

####2、获取CompleteTextView上下文对象：

    AutoCompleteTextView actv = (AutoCompleteTextView) findViewById(R.id.auto);

####3、创建一个ArrayAdapter，封装数据

    ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout. simple_dropdown_item_1line, books);

    simple_dropdown_item_1line:android自带的配置文件。

####4、设置Adapter

    actv.setAdapter(adapter);

###12、下拉列表框（Spinner）

#####定义了一个Spinner组件， 指定该显示该Spinner组件的数组：

    <Spinner …… />

#####使用数组资源设置该下拉列表框的列表项目：

    android:entries="@array/books"

    books.xml:<string-array name="books">

    <item>Java SE</item>

    <item>Java EE</item>

    <item>Java ME</item>

    <item>Linux</item>

    </string-array>

#####设置该列表选择框的提示：

    android:prompt="@string/info"


###13、时间和日期组件（DatePicker、TimePicker）

####定义一个DatePicker组件（日期：年，月，日）：

    <DatePicker  …… />

####定义一个TimePicker组件（时间：含上下午 ）：

    <TimePicker  …… />

Activity：

####引用布局文件中的组件：
    findViewById（）；

####获取当前的年、月、日、小时、分钟：

    Calendar c = Calendar.getInstance();

    year = c.get(Calendar.YEAR);

    month= c.get(Calendar.MONTH);

    day = c.get(Calendar.DAY_OF_MONTH);

    hour = c.get(Calendar.HOUR);

    minute = c.get(Calendar.MINUTE);

####用于显示时间的方法（show）：

    private void showDate(int year, int month, int day, int hour, int minute) {
    EditText show = (EditText) findViewById(R.id.show);

    show.setText("您的购买日期为：" + year + "年" + month + "月" + day + "日  " + hour + "时" + minute + "分"); }


####初始化DatePicker组件，初始化时指定监听器：

    datePicker.init(year, month, day, new OnDateChangedListener()
 
     {

    public void onDateChanged(DatePicker arg0, int year, int month, int day) 

    { 

    TestActivity.this.year = year;

    TestActivity.this.month = month;

    TestActivity.this.day = day;
 

####// 显示当前日期、时间

    showDate(year, month, day, hour, minute); }});


####为TimePicker指定监听器：

    timePicker.setOnTimeChangedListener(new OnTimeChangedListener()

    {

    public void onTimeChanged(TimePicker arg0, int hour, int minute)
    {

    TestActivity.this.hour = hour;

    TestActivity.this.minute = minute;

####// 显示当前日期、时间


    showDate(year, month, day, hour, minute); }});

###14、水平进度条（ProgressBar）

#####定义一个水平进度条

    <ProgressBar

     android:id="@+id/bar" ……

    android:max="100" android:progress="30" 

    style="@android:style/Widget.ProgressBar.Horizontal"
    />

    Widget.ProgressBar.Horizontal：系统自带布局方式。

###15、拖动条（SeekBar）

#####定义一个拖动条，并改变它的滑块外观：

      <SeekBar
       android:id="@+id/seekbar" ……
       android:max="255" android:progress="120"
       android:thumb="@drawable/marker" （更改滑块外观）/>

#####Activity：

####1、 findViewById

####2、 事件监听器：

    seekBar.setOnSeekBarChangeListener(new OnSeekBarChangeListener() {
    // 当拖动条的滑块位置发生改变时触发该方法
    public void onProgressChanged(SeekBar arg0, int progress, boolean fromUser) {image.setAlpha(progress); }// 设置透明度
    public void onStartTrackingTouch(SeekBar bar) {}
    public void onStopTrackingTouch(SeekBar bar) {}});

###16、星级评分条（RatingBar）

#####定义一个星级评分条：

    <RatingBar android:id="@+id/rating"  ……
    android:numStars="5" //星的数量 android:max="50"//总长度
    android:progress="10"//单位长度 android:stepSize=".5"//允许最小尺寸/>
###17、选项卡（TabHost）

#####定义一个TabHost
     <TabHost ……> …… </TabHost>

#####添加几个布局：
    <LinearLayout  android:id="@+id/tb1" android:orientation="vertical" > 
    <LinearLayout  android:id="@+id/tb2" android:orientation="vertical" >
    <LinearLayout  android:id="@+id/tb3" android:orientation="vertical" >

#####Activity：

    1、 TabHost th = getTabHost();//获取选项卡
    2、 LayoutInflater.from(this).inflate(R.layout.main, th.getTabContentView(),true) //获取布局文件

####3、 在选项卡中添加已有的布局：

    th.addTab(th.newTabSpec("t1").setIndicator("软件").setContent(R.id.tb1));
    th.addTab(th.newTabSpec("t2").setIndicator("动漫", getResources().getDrawable(R.drawable.ic_launcher)).setContent(R.id.tb2)); 
    th.addTab(th.newTabSpec("t3").setIndicator("网络").setContent(R.id.tb3));

###18、滚动条（ScrollView）

####1、创建<ScrollView：>

####2、创建<HorizontalScrollView>

####3、中间是文本内容，最后结束 </HorizontalScrollView> </ScrollView>

###19、列表视图（ListView）

#####创建ListView（布局文件）：

       <ListView  ……
       android:divider="@drawable/green"//每个选项之间的分界图片
       android:id="@+id/lv1"></ListView>

#####Activity（方法2）：

        findViewById
        String [] arr= {"大师兄","fdasfd","dafa"};
        ArrayAdapter<String> arrayAdapter= new ArrayAdapter<String>(this,
        android.R.layout.simple_expandable_list_item_1,arr);
        lv.setAdapter(arrayAdapter);

###20、详解simple_list_item 

####1、 simple_list_item_1: 每一个列表项都是一个普通的TextView

####2、 simple_list_item_2：每一个列表项都是一个普通的TextView，字体略大，TextView 显示     标题，TextView显示内容，因此需要两组数据，并且指定每组数据和两个TextView的对应关系

####3、simple_list_item_checked：每一个列表项都是一个已勾选的列表项

####4、simple_list_item_multiple_choice：每一个列表项都是带多选项 

####5、simple_list_item_single_choice：每一个列表项都是带单选项

###21、列表（ListView）

#####定义数组：String[] arr = { "刘德华", "张学友", "黎明", "郭富城" };

#####将数组中的内容添加到列表中：

    List<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
    for (int i = 0; i < arr.length; i++) {
    HashMap<String, Object> item = new HashMap<String, Object>();
    item.put("num1", i); item.put("value1", arr[i]);
    ata.add(item); }
    SimpleAdapter adapter = new SimpleAdapter(this,
    data,android.R.layout.simple_list_item_2,   
                 new String[]{"num1","value1"},
    new int[]{android.R.id.text1,android.R.id.text2}); 

    // 设置该窗口显示列表
    setListAdapter(adapter);

####形式二：

####1、 创建数组，以及对应图标：

    private String[] names = new String[] { "唐伯虎", "祝枝山", "文征明", "徐祯卿" };
    private int[] imageIds = new int[] { R.drawable.icon,
    R.drawable.icon, R.drawable.icon, R.drawable.icon };
    private String[] values = new String[]{"1","2","3","4"};

####2、 重写方法（onCreate(Bundle savedInstanceState)）
#####// 创建一个List集合，List集合的元素是Map

    List<Map<String, Object>> listItems = new  ArrayList<Map<String, Object>>();
    for (int i = 0; i < names.length; i++) {
    Map<String, Object> listItem = new HashMap<String, Object>();
    listItem.put("header", imageIds[i]);
    listItem.put("personName", names[i]);
    listItem.put("personInfo", values[i]);
    listItems.add(listItem); }

#####// 创建一个SimpleAdapter

    SimpleAdapter simpleAdapter = new SimpleAdapter(this, listItems,
    R.layout.main, new String[] { "personName", "header" ,"personInfo"},
    new int[] { R.id.name, R.id.header,R.id.info });
    ListView list = (ListView) findViewById(R.id.mylist);

#####// 为ListView设置Adapter

    list.setAdapter(simpleAdapter);

#####main.xml配置文件：

    <!-- 定义一个List -->
    <ListView android:id="@+id/mylist" …… />
    <!-- 定义一个ImageView，用于作为列表项的一部分。 -->
    <ImageView android:id="@+id/header" …… />
    <!-- 定义一个TextView，用于作为列表项的一部分。 -->
    <TextView android:id="@+id/name" …… android:textSize="16dp"/>
    <TextView android:id="@+id/info" …android:textSize="16dp"></TextView>

###22、类似QQ上的小表情（GridView）

####1、//为GridView准备数据

    int[] imageIds = new int[] { R.drawable.bomb5, R.drawable.bomb6,
    R.drawable.bomb7, R.drawable.bomb8, R.drawable.bomb9,
    R.drawable.bomb10, R.drawable.bomb11, R.drawable.bomb12,
    R.drawable.bomb13, R.drawable.bomb14, R.drawable.bomb15,
    R.drawable.bomb16 };
    String[] infos = new String[]{"1","2","3","4","5","6","7","8","9","10","11","12"};


####2、重写（onCreate(Bundle savedInstanceState
（转）