---
layout: post
title:  "Can't bind to local 8700 for debugger 端口占用 "
date: 2015-7-10
categories: Android
tags: [Android]
---

Can't bind to local 8700 for debugger 端口占用 

<!-- more -->


1、Windows平台 

在windows命令行窗口下执行： 


### 1.查看所有的端口占用情况

C:\>netstat -ano

  协议    本地地址                     外部地址               状态                   PID

  TCP    127.0.0.1:8700         0.0.0.0:0              LISTENING       3236


### 2.查看指定端口的占用情况

C:\>netstat -aon|findstr "8700"

  协议    本地地址                     外部地址               状态                   PID

  TCP    127.0.0.1:8700         0.0.0.0:0              LISTENING       2014

### 3.查看PID对应的进程

C:\>tasklist|findstr "2014"

 映像名称                       PID 会话名              会话#       内存使用
 ========================= ======== ================
  tadb.exe                     2014 Console                 0     16,064 K 


### 4.结束该进程

C:\>taskkill /f /t /im 进程名