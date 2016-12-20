---
layout: post
title: "android 适配器Adpter的使用总结"
date: 2015-8-6
categories: Android
tags: [Android，适配器]
---
android 适配器Adpter的使用总结

<!-- more -->


在android开发中有很多地方要用到数据填充器，也就是Adpter填充器的知识，关于Adpter的继承关系大家可以参考我转载的一篇文章：

   <http://www.cnblogs.com/tanlon/archive/2011/05/21/2053009.html>

相关的属性以及方法可以参考API，如果英语不好的看不懂API的可以参考一下农民伯伯的博客，这个里面翻译的和推荐的文章都不错：

<http://home.cnblogs.com/over140>

 对于他们的继承与实现之间的关系，大家可以在我上面提到的文章里面可以很清楚的看到，在此基础上我还要对其进行扩展。

 不论是那种适配器模式，也不管是Listview也好还是gridview也好，对他们填充数据，都是分三步走。

###第一：创建一个数据填充的对象，可以是ListView, GridView, Gallery。

    listView=(ListView) findViewById(R.id.listview_simple);

###第二步：创建一个数据填充器，可以是BaseAdpter、SimpleAdapter，也可以是与数据库相关联的CursorAdpter。

  **例如：SimpleAdapter可以使用系统封装好的，你也可以自己去继承一个Simpleadpter，来重写其中的方法。继承 simpleadpter的好处在于，你可以对listitem中每个单一的控件设置监听事件等等一系列操作。如果用的是系统封装好的就有点爱莫能助了。**

   **直接使用系统封装的：**

    SimpleAdapter simpleAdapter =new SimpleAdapter(
    this,
    data,
    R.layout.simple_item,
    new String[] { "name", "info" },
    newint[] { R.id.simple_name, R.id.simple_info });

 **重写系统的simpleadpter：**

     publicclass ListSimpleAdpter extends SimpleAdapter{
     //要使用到的数据源
    private List<Map<String, Object>> data=new ArrayList<Map<String, Object>>();
    //填充数据的资源文件
    privateint resource;
    private String[] from;
    private Context context;
    public ListSimpleAdpter(Context context,
            List<Map<String, Object>> data, int resource, String[] from,
            int[] to) {
        super(context, data, resource, from, to);
        this.context=context;
        this.data=data;
        this.resource=resource;
        this.from=from;
    } 
    //item的总行数
    @Override
    publicint getCount() {
        // TODO Auto-generated method stub
    return data==null?0:data.size();
    }
    //item对象
    @Override
    public Object getItem(int position) {
        // TODO Auto-generated method stub
    return position;
    }
    //item的id
    @Override
    publiclong getItemId(int position) {
        // TODO Auto-generated method stub
    return position;
    }
    //绘制每一个item
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // TODO Auto-generated method stub
        Holder holder =null;
        if(convertView==null)
        {
            convertView=LayoutInflater.from(context).inflate(resource, null);
            holder=new Holder();
            holder.imageView=(ImageView) convertView.findViewById(R.id.listitem_pic);
            holder.title=(TextView) convertView.findViewById(R.id.listitem_title);
            holder.content=(TextView) convertView.findViewById(R.id.listitem_content);
            convertView.setTag(holder);
        }else
        {
            holder=(Holder) convertView.getTag();
        }
        holder.imageView.setImageResource(Integer.parseInt(data.get(position).get(from[0]).toString()));
        holder.title.setText(data.get(position).get(from[1]).toString());
        holder.content.setText(data.get(position).get(from[2]).toString());
        return convertView;
    }
    
    class Holder{
        ImageView imageView;
        TextView title;
        TextView content;
    }
    }


**这里对于Adapter的优化,用的很古老的ViewHolder、ViewCache办法：**

    public View getView(int position, View convertView, ViewGroup parent) {
        // TODO Auto-generated method stub
        Holder holder =null;
        if(convertView==null)
        {
            convertView=LayoutInflater.from(context).inflate(resource, null);
            holder=new Holder();
            holder.imageView=(ImageView) convertView.findViewById(R.id.listitem_pic);
            holder.title=(TextView) convertView.findViewById(R.id.listitem_title);
            holder.content=(TextView) convertView.findViewById(R.id.listitem_content);
            convertView.setTag(holder);
        }else
        {
            holder=(Holder) convertView.getTag();
        }
        holder.imageView.setImageResource(Integer.parseInt(data.get(position).get(from[0]).toString()));
        holder.title.setText(data.get(position).get(from[1]).toString());
        holder.content.setText(data.get(position).get(from[2]).toString());
        return convertView;
    }
    
    class Holder{
        ImageView imageView;
        TextView title;
        TextView content;
    }


**或者使用HashMap做缓存的方法:**

    HashMap<Integer, View> m =new HashMap<Integer, View>();

    public View getView(int position, View view, ViewGroup parent) {

    View convertView = m.get(position);
    if (convertView !=null) {
    return convertView;
    } 
    else { 
     convertView=LayoutInflater.from(context).inflate(resource, null);
    ImageView imageView=(ImageView) convertView.findViewById(R.id.listitem_pic)；
    TextView title=(TextView) convertView.findViewById(R.id.listitem_title);
    TextViewcontent=(TextView) convertView.findViewByI(R.id.listitem_content);
     m.put(position, convertView);
     }
    }
    
###第三步：将数据填充到对象中去

    listView.setAdapter(simpleAdapter  );


**这样就完成了数据填充器的数据填充。**

还有ArrayAdapter, BaseAdapter, CursorAdapter, HeaderViewListAdapter, ListAdapter, ResourceCursorAdapter, SimpleAdapter, SimpleCursorAdapter, SpinnerAdapter, WrapperListAdapter.SimpleCursorTreeAdapter、
二级树相关的SimpleExpandableListAdapter、BaseExpandableListAdapter等等。

本文转自：
<http://www.cnblogs.com/hnrainll/archive/2011/11/20/2255784.html>