---
layout: post
title: "如何在myeclipse中安装tomcat和部署项目到tomcat中
date: 2015-8-10
categories: Android
tags: [Android,Tomcat]
---
如何在myeclipse中安装tomcat和部署项目到tomcat中

<!-- more -->


如何在myeclipse中安装tomcat和部署项目到tomcat中


一、单击工具栏的的黑小三角或者单击 菜单栏窗口—>首选项，出现首选项对话框，在对话框的左边框中找到Myeclipse—>Application Servers下找到Tomcat选项，如下图，

![](http://img-storage.qiniudn.com/15-8-10/97690897.jpg)

二、根据自己的Tomcat版本选择相应的Tomcat选项（我的是5.0版本），然后在对话框右侧的Tomcat home directory选项选择Tomcat的安装目录，下面的Tomcat base directory和Tomcat temp directory系统会自动为你填上，Optional  program arguments可以不用填,我也不知道这是做什么用的,再选上Enable选项，要不然在待会儿在Server中看不到Tomcat服务器

三、千万别忘了Tomcat 选项下面的JDK，我就是因为没注意到它才一直不成功，单击JDK,弹出如下对话框，

Notes会提示你怎么做，

![](http://img-storage.qiniudn.com/15-8-10/93272139.jpg)

四、点击Tomcat JDK name旁的"Add"，弹出如下对话框：

![](http://img-storage.qiniudn.com/15-8-10/56373970.jpg)

jre名称(N)选项填上名字（可以随便取），在JRE主目录选项选择你的jdk安装目录(仅仅只是jdk,不包含jre)，JRE系统库系统会自动添加,缺省JVM参数可以不用填,按“确定”回到上级再按“确定”就OK了。


如果你配置的不对的话会弹出出错提示对话框

![](http://img-storage.qiniudn.com/15-8-10/66941835.jpg)

五、回到MyEclipse主界面，在Server下多了个Tomcat选项，右键单击Tomcat，选择Mannage Deployment（如果你不配置的话等一下你是运行不了项目的），弹出Srever Deployments对话框，在Server选项上选择你刚刚配置的Tomcat服务，点击"Add"，弹出New Deployment对话框，

![](http://img-storage.qiniudn.com/15-8-10/3671932.jpg)


在Project上选择你要运行的项目，单击“完成”返回上一级按“确定”就可以了。
  最后启动Tomcat服务器，在Web Browser输入地址，到这里就大功告成了。




##（附加教程）
##1.你进入myeclipse,选择file->new->* project 

然后在菜单栏的window->preferences->myeclipse->server->tomcat->tomcat 5.x ;

然后就是添加你的Tomcat的home directory 和base directory,这2个路径其实就是你的Tomcat的安装路径(比如D:\Program Files\Tomcat 5.5)并且修改Tomcat server为enable. 

###2.当你创建好Project后,如果是web project就还需要部署和启动Tomcat. 
首先启动Tomcat,(在工具栏有一个RUN/STOP MYECLIPSE SERVER按钮),启动你所支持的SERVER,即TOMCAT 5.X,然后进行部署;

**在工具栏有Deploy按钮,然后选择project,然后点击Add;**
 
在选择你所支持的server.然后点击Finish.就完成了部署工作;

ps:特别需要强调的就是加粗体部分，本人习惯将写好的项目拷贝到tomcat安装目录下的webapp文件夹下，这样进行部署老是报错404，一直没有找到错误的原因，后来试了上面的部署方法，问题才得以解决。


本文转自：
<http://www.cr173.com/html/15379_1.html>

