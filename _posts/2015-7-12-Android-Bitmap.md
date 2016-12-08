---
layout: post
title: "BitMap类 "
date: 2015-7-12
categories: Android
tags: [Android，Bitmap]
---
BitMap类

<!-- more -->

## BitMap类： 


**public void recycle()——回收位图占用的内存空间，把位图标记为Dead** 

**public final boolean isRecycled() ——判断位图内存是否已释放 **

**public final int getWidth()——获取位图的宽度 **

**public final int getHeight()——获取位图的高度 **

public final boolean isMutable()——图片是否可修改 

public int getScaledWidth(Canvas canvas)——获取指定密度转换后的图像的宽度 

public int getScaledHeight(Canvas canvas)——获取指定密度转换后的图像的高度 

public boolean compress(CompressFormat format, int quality, OutputStream stream)——按指定的图片格式以及画质，将图片转换为输出流。 

format：Bitmap.CompressFormat.PNG或Bitmap.CompressFormat.JPEG 

quality：画质，0-100.0表示最低画质压缩，100以最高画质压缩。对于PNG等无损格式的图片，会忽略此项设置。 

## 常用的静态方法： 
**public static Bitmap createBitmap(Bitmap src) ——以src为原图生成不可变得新图像 **

public static Bitmap createScaledBitmap(Bitmap src, int dstWidth, int dstHeight, boolean filter)——以src为原图，创建新的图像，指定新图像的高宽以及是否可变。 

**public static Bitmap createBitmap(int width, int height, Config config)——创建指定格式、大小的位图 **

**public static Bitmap createBitmap(Bitmap source, int x, int y, int width, int height)以source为原图，创建新的图片，指定起始坐标以及新图像的高宽。 **

public static Bitmap createBitmap(Bitmap source, int x, int y, int width, int height,  Matrix m, boolean filter) 


## BitmapFactory工厂类： 

#### Option 参数类： 

public boolean inJustDecodeBounds——如果设置为true，不获取图片，不分配内存，但会返回图片的高度宽度信息。
 
public int inSampleSize——图片缩放的倍数。如果设为4，则宽和高都为原来的1/4，则图是原来的1/16。 

public int outWidth——获取图片的宽度值 

public int outHeight——获取图片的高度值 

—————————————————————————————— 

public int inDensity——用于位图的像素压缩比 

public int inTargetDensity——用于目标位图的像素压缩比（要生成的位图） 

public boolean inScaled——设置为true时进行图片压缩，从inDensity到inTargetDensity。 

#### 读取一个文件路径得到一个位图。如果指定文件为空或者不能解码成文件，则返回NULL。 

public static Bitmap decodeFile(String pathName, Options opts) 

public static Bitmap decodeFile(String pathName) 

#### 读取一个资源文件得到一个位图。如果位图数据不能被解码，或者opts参数只请求大小信息时，则返回NuLL。 

（即当Options.inJustDecodeBounds=true,只请求图片的大小信息。）
 
public static Bitmap decodeResource(Resources res, int id) 

public static Bitmap decodeResource(Resources res, int id, Options opts) 

#### 从输入流中解码位图 

public static Bitmap decodeStream(InputStream is) 

#### 从字节数组中解码生成不可变的位图 

public static Bitmap decodeByteArray(byte[] data, int offset, int length) 

BitmapDrawable类：继承于Drawable，你可以从文件路径、输入流、XML文件以及Bitmap中创建。 
常用的构造函数： 

Resources res=getResources();//获取资源 

public BitmapDrawable(Resources res)——创建一个空的drawable。（Response用来指定初始时所用的像素密度）替代public BitmapDrawable()方法（此方法不处理像素密度）
 
public BitmapDrawable(Resources res, Bitmap bitmap)——Create drawable from a bitmap 

public BitmapDrawable(Resources res, String filepath)——Create a drawable by opening a given file path and decoding the bitmap. 

public BitmapDrawable(Resources res, java.io.InputStream is)——Create a drawable by decoding a bitmap from the given input stream. 



### 首先介绍我们最常用的Bitmap(位图)。位图是我们开发中最常用的资源，毕竟一个漂亮的界面对用户是最有吸引力的。按照对位图的操作，分为以下几个功能分别介绍：
 
从资源中获取位图 

获取位图的信息 

显示位图 

位图缩放 

位图旋转 

### 1. 从资源中获取位图 

可以使用BitmapDrawable或者BitmapFactory来获取资源中的位图。 

当然，首先需要获取资源： Resources res=getResources(); 

### 使用BitmapDrawable获取位图 

   **1.使用BitmapDrawable (InputStream is)构造一个BitmapDrawable；** 
   
   **2. 使用BitmapDrawable类的getBitmap()获取得到位图；** 
   
通过Resource的函数：InputStream  openRawResource(int id)获取得到资源文件的数据流后，也可以通过2种方法来获取Bitmap，如下： 

使用BitmapDrawable 

（A Drawable that wraps a bitmap and can be tiled, stretched, or aligned.） 

使用BitmapDrawable (InputStream is)构造一个BitmapDrawable； 

使用BitmapDrawable类的getBitmap()获取得到位图； 

BitmapDrawable也提供了显示位图等操作。 

Java代码： 

    InputStream is=res.openRawResource(R.drawable.pic180);  // 读取资源文件获取输入流 
    BitmapDrawable bmpDraw=new BitmapDrawable(is);   
    Bitmap bmp=bmpDraw.getBitmap(); 
或者： 

    BitmapDrawable bmpDraw=(BitmapDrawable)res.getDrawable(R.drawable.pic180);   
    Bitmap bmp=bmpDraw.getBitmap(); 

使用BitmapFactory 

（Creates Bitmap objects from various sources, including files, streams, and byte-arrays.） 

使用BitmapFactory类decodeStream(InputStream is)解码位图资源，获取位图。 

使用BitmapFactory类Bitmap bmp=BitmapFactory.decodeResource(res, R.drawable.pic180); 方法解码位图资源。 

BitmapFactory的所有函数都是static，这个辅助类可以通过资源ID、路径、文件、数据流等方式来获取位图。 

以上方法在编程的时候可以自由选择，在Android SDK中说明可以支持的图片格式如下：png (preferred), jpg (acceptable), gif (discouraged)，虽然bmp格式没有明确说明，但是在Android SDK Support Media Format中是明确说明了。 



### 2. 获取位图的信息 

要获取位图信息，比如位图大小、是否包含透明度、颜色格式等，获取得到Bitmap就迎刃而解了，这些信息在Bitmap的函数中可以轻松获取到。Android SDK中对Bitmap有详细说明，阅读起来也比较容易，不在此详细说明，这里只是辅助说明以下2点： 

在Bitmap中对RGB颜色格式使用Bitmap.Config定义，仅包括ALPHA_8、ARGB_4444、ARGB_8888、RGB_565，缺少了一些其他的，比如说RGB_555，在开发中可能需要注意这个小问题； 

Bitmap还提供了compress()接口来压缩图片，不过AndroidSAK只支持PNG、JPG格式的压缩；其他格式的需要Android开发人员自己补充了。 

### 3. 显示位图 

显示位图可以使用核心类Canvas，通过Canvas类的drawBirmap()显示位图，或者借助于BitmapDrawable来将Bitmap绘制到Canvas。当然，也可以通过BitmapDrawable将位图显示到View中。 

转换为BitmapDrawable对象显示位图 

        // 获取位图 
        Bitmap bmp=BitmapFactory.decodeResource(res, R.drawable.pic180); 
        // 转换为BitmapDrawable对象 
        BitmapDrawable bmpDraw=new BitmapDrawable(bmp); 
        // 显示位图 
        ImageView iv2 = (ImageView)findViewById(R.id.ImageView02); 
       iv2.setImageDrawable(bmpDraw); 

使用Canvas类显示位图 

这儿采用一个继承自View的子类Panel，在子类的OnDraw中显示 

Java代码 
    public class MainActivity extends Activity {   
     
    @Override  
    public void onCreate(Bundle savedInstanceState) {   
        super.onCreate(savedInstanceState);   
        setContentView(new Panel(this));   
    }   
       
    class Panel extends View{            
        public Panel(Context context) {     
            super(context);    
        }         
        public void onDraw(Canvas canvas){     
            Bitmap bmp = BitmapFactory.decodeResource(getResources(), R.drawable.pic180);     
            canvas.drawColor(Color.BLACK);     
            canvas.drawBitmap(bmp, 10, 10, null);     
        }     
    }    
}  

### 4. 位图缩放 

（1）将一个位图按照需求重画一遍，画后的位图就是我们需要的了，与位图的显示几乎一样：drawBitmap(Bitmap bitmap, Rect src, Rect dst, Paint paint)。 

（2）在原有位图的基础上，缩放原位图，创建一个新的位图：CreateBitmap(Bitmap source, int x, int y, int width, int height, Matrix m, boolean filter) 

（3）借助Canvas的scale(float sx, float sy) （Preconcat the current matrix with the specified scale.），不过要注意此时整个画布都缩放了。 

（4）借助Matrix： 
 Java代码 
    Bitmap bmp = BitmapFactory.decodeResource(getResources(), R.drawable.pic180);     
    Matrix matrix=new Matrix();   
    matrix.postScale(0.2f, 0.2f);   
    Bitmap dstbmp=Bitmap.createBitmap(bmp,0,0,bmp.getWidth(), 
    bmp.getHeight(),matrix,true);   
    canvas.drawColor(Color.BLACK);     
    canvas.drawBitmap(dstbmp, 10, 10, null);    
     

### 5. 位图旋转 
同样，位图的旋转也可以借助Matrix或者Canvas来实现。Matrix在线性代数中都学习过，Android SDK提供了Matrix类，可以通过各种接口来设置矩阵。结合上面的例子程序，将位图缩放例子程序在显示位图的时候前，增加位图旋转功能，修改代码如下： 

    Matrix matrix = new Matrix(); 

    //matrix.postScale(0.5f, 0.5f); 

    matrix.setRotate(90,120,130); 

    canvas.drawBitmap(mbmpTest, matrix, mPaint); 

旋转后的位图显示如下： 

除了这种方法之外，我们也可以在使用Bitmap提供的函数如下：
 
    public static Bitmap createBitmap (Bitmap source, int x, int y, int width, int height, Matrix m, boolean filter)，在原有位图旋转的基础上，创建新位图。 

### 总结说明 

对位图的操作，结合Android SDK中的类，详细的介绍完了。最后还需要强调的是：这篇文章只是对Android SDK中代码阅读分析，它代替不了你阅读Android SDK，深入的学习还是要仔细的阅读Android SDK。 