---
layout: post
title:  "Android三种基本的加载网络图片方式"
date:   2015-7-4
categories: Android
tags: [Android，图片加载]
---

Android三种基本的加载网络图片方式

<!-- more -->

##1. [代码]普通加载网络方式   
    public class NormalLoadPictrue {
     
    private String uri;
    private ImageView imageView;
    private byte[] picByte;
     
     
    public void getPicture(String uri,ImageView imageView){
        this.uri = uri;
        this.imageView = imageView;
        new Thread(runnable).start();
    }
     
    @SuppressLint("HandlerLeak")
    Handler handle = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            if (msg.what == 1) {
                if (picByte != null) {
                    Bitmap bitmap = BitmapFactory.decodeByteArray(picByte, 0, picByte.length);
                    imageView.setImageBitmap(bitmap);
                }
            }
        }
    };
 
    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            try {
                URL url = new URL(uri);
                HttpURLConnection conn = (HttpURLConnection)url.openConnection();
                conn.setRequestMethod("GET");
                conn.setReadTimeout(10000);
                 
                if (conn.getResponseCode() == 200) {
                    InputStream fis =  conn.getInputStream();
                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
                    byte[] bytes = new byte[1024];
                    int length = -1;
                    while ((length = fis.read(bytes)) != -1) {
                        bos.write(bytes, 0, length);
                    }
                    picByte = bos.toByteArray();
                    bos.close();
                    fis.close();
                     
                    Message message = new Message();
                    message.what = 1;
                    handle.sendMessage(message);
                }
                 
                 
            }catch (IOException e) {
                e.printStackTrace();
            }
        }
    };
     
    }

##2. [代码]用ImageLoader加载图片   

    public class ImageLoaderPicture {
     
    private DisplayImageOptions options;
 
    public ImageLoaderPicture(Context context) {
         
        ImageLoaderConfiguration config = new ImageLoaderConfiguration.Builder(context).threadPriority(Thread.NORM_PRIORITY - 2)
        .denyCacheImageMultipleSizesInMemory()
        .discCacheFileNameGenerator(new Md5FileNameGenerator())
        .tasksProcessingOrder(QueueProcessingType.LIFO).enableLogging() 
        .memoryCache(new WeakMemoryCache())                                 
        .build();
        ImageLoader.getInstance().init(config);
         
        options = new DisplayImageOptions.Builder()
        .showStubImage(0)
        .showImageForEmptyUri(0)
        .showImageOnFail(0)
        .cacheInMemory().cacheOnDisc()
        .imageScaleType(ImageScaleType.IN_SAMPLE_INT)
        .bitmapConfig(android.graphics.Bitmap.Config.RGB_565)
        .build();
    }
 
    public DisplayImageOptions getOptions() {
        return options;
    }
 
    public void setOptions(DisplayImageOptions options) {
        this.options = options;
    }
     
     
    }

##3. [代码]用Volley加载图片 

    public class VolleyLoadPicture {
     
    private ImageLoader mImageLoader = null;
    private BitmapCache mBitmapCache;
     
    private ImageListener one_listener;
     
    public VolleyLoadPicture(Context context,ImageView imageView){
        one_listener = ImageLoader.getImageListener(imageView, 0, 0);
         
        RequestQueue mRequestQueue = Volley.newRequestQueue(context);
        mBitmapCache = new BitmapCache();
        mImageLoader = new ImageLoader(mRequestQueue, mBitmapCache);
    }
 
    public ImageLoader getmImageLoader() {
        return mImageLoader;
    }
 
    public void setmImageLoader(ImageLoader mImageLoader) {
        this.mImageLoader = mImageLoader;
    }
 
    public ImageListener getOne_listener() {
        return one_listener;
    }
 
    public void setOne_listener(ImageListener one_listener) {
        this.one_listener = one_listener;
    }
     
    class BitmapCache implements ImageCache {
        private LruCache<String, Bitmap> mCache;
        private int sizeValue;
         
        public BitmapCache() {
            int maxSize = 10 * 1024 * 1024;
            mCache = new LruCache<String, Bitmap>(maxSize) {
                @Override
                protected int sizeOf(String key, Bitmap value) {
                    sizeValue = value.getRowBytes() * value.getHeight();
                    return sizeValue;
                }
                 
            };
        }
 
        @Override
        public Bitmap getBitmap(String url) {
            return mCache.get(url);
        }
 
        @Override
        public void putBitmap(String url, Bitmap bitmap) {
            mCache.put(url, bitmap);
        }
    }
     
 
    }

##4. [代码]Activity  
    public class MainActivity extends Activity {
     
    private ImageView imageView001,imageView002,imageView003;
     
    public static final String picUrl = "http://img.quwenjiemi.com/2014/0701/thumb_420_234_20140701112917406.jpg";
    //public static final String picUrl = "http://192.168.1.181:8081/AndroidSerivces/house.jpg";
     
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        imageView001 = (ImageView)findViewById(R.id.imageView001);
        imageView002 = (ImageView)findViewById(R.id.imageView002);
        imageView003 = (ImageView)findViewById(R.id.imageView003);
         
        //用普通方法加载图片
        new NormalLoadPictrue().getPicture(picUrl,imageView001);
         
        //用ImageLoader加载图片
        ImageLoader.getInstance().displayImage(picUrl, imageView002,new ImageLoaderPicture(this).getOptions(),new SimpleImageLoadingListener());
         
        //用Volley加载图片
        VolleyLoadPicture vlp = new VolleyLoadPicture(this, imageView003);
        vlp.getmImageLoader().get(picUrl, vlp.getOne_listener());
    }
     
 
    }

##5. [代码]布局文件  
    <ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity" >
 
    <RelativeLayout 
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="10dp">
     
    <TextView 
        android:id="@+id/textView001"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="1.用普通方法的加载图片"/>
     
    <ImageView 
        android:id="@+id/imageView001"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView001"/>
     
     
    <TextView 
        android:id="@+id/textView002"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView001"
         android:text="2.用Android-Universal-Image-Loader加载图片"/>
     
    <ImageView 
        android:id="@+id/imageView002"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
         android:layout_below="@+id/textView002"/>
     
     
    <TextView 
        android:id="@+id/textView003"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView002"
         android:text="3.用Volley加载图片"/>
     
    <ImageView 
        android:id="@+id/imageView003"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
         android:layout_below="@+id/textView003"/>
     
    </RelativeLayout>
 
    </ScrollView>



##6. [文件] 三种基本网络加载图片方式.rar ~ 2MB  



  <下载>地址：
 <http://www.oschina.net/action/code/download?code=36944&id=54305>


##总结
在这里既然需要加载网络图片，那就肯定需要一个URL地址，就是你的网络图片的地址，其实，有的人想把自己的本地图片弄成网络图片，然后再进行加载，其实，这也很简单，在这里，我有我自己的一个做法，就是用到的“极简图床”这个工具，网站如下：


<http://yotuku.cn/#!/>



你可以在里边上传了你的本地图片之后，它就会自动生成Markdown格式和网络地址格式的两种图片，你只要复制这里的图片的地址就可以作为网络图片的地址了。