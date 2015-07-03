---
layout: post
title: "web服务器学习记录"
categories: 编程学习
date: 2015-02-24 09:46:24
tags: [网络,服务器]
---

## 服务器的工作方式
>1) 客户端发送请求至服务器端；  
>2) 服务器将请求信息发送至 Servlet；  
>3) Servlet 生成响应内容并将其传给服务器。响应内容动态生成，通常取决于客户端的请求；  
>4) 服务器将响应返回给客户端。  

<!-- more -->

## HTTP端口的分类  
> **0-1023** 称做熟知端口号或系统端口号（TCP/IP等）  
> **1024-49151** 称做登记端口号，给应用程序使用，发布时需要按照一定的手续登记，避免重复  
> **49152-65535** 短暂端口号，程序运行过程是动态暂时使用，创建某次连接时使用，连接结束时就释放  


## http报文的组成部分：
> 1、起始行  
> 2、首部  
> 3、实体的主体部分（可选的）  
>每行的终止是 “\r\n” 。


下面就分别看一下请求和响应。

## HTTP请求包括三部分  
1、方法、统一资源标识符（URI）、协议/版本  
2、请求的头部  
3、主题内容  
下面是一个HTTP请求的例子  

>POST /examples/default.jsp HTTP/1.1   
 Accept: text/plain; text/html   
 Accept-Language: en-gb   
 Connection: Keep-Alive   
 Host: localhost   
 User-Agent: Mozilla/4.0 (compatible; MSIE 4.01; Windows 98)   
 Content-Length: 33   
 Content-Type: application/x-www-form-urlencoded   
>Accept-Encoding: gzip, deflate   
>  
>lastName=Franks&firstName=Michael

## HTTP响应也包括上面三个部分。  
1、方法、统一资源标识符（URI）、协议/版本  
2、响应的头部  
3、主题内容  
下面是一个HTTP响应的例子 

>HTTP/1.1 200 OK   
 Server: Microsoft-IIS/4.0   
 Date: Mon, 5 Jan 2004 13:13:33 GMT   
 Content-Type: text/html   
 Last-Modified: Mon, 5 Jan 2004 13:13:12 GMT   
>Content-Length: 112   
>   
> <html\>   
> <head\>   
> <title\>HTTP Response Example</title\>   
> </head\>   
> <body\>   
> Welcome to Brainy Software   
> </body\>   
> </html\>

## 常见的HTTP方法：  
<table>
<tr>
<td>方法</td>
<td>描述</td>
<td>是否包含主体</td>
</tr>
<tr>
<td>GET</td>
<td>从服务器获取一份文档</td>
<td>否</td>
</tr>
<tr>
<td>PUT</td>
<td>将请求的主体存储在服务器上</td>
<td>是</td>
</tr>
<tr>
<td>POST</td>
<td>向服务器发送需要处理的数据</td>
<td>是</td>
</tr>
<tr>
<td>HEAD</td>
<td>只从服务器获取文档的首部</td>
<td>否</td>
</tr>
<tr>
<td>TRACE</td>
<td>对可能经过代理服务器传送到服务器上去的报文进行追踪</td>
<td>否</td>
</tr>
<tr>
<td>OPTIONS</td>
<td>决定可以在服务器上执行哪些方法</td>
<td>否</td>
</tr>
<tr>
<td>DELETE</td>
<td>从服务器上删除一份文档</td>
<td>否</td>
</tr> 
</table>

1、GET和HEAD方法是安全的方法，就是不会再服务器产生什么结果。  
2、POST一般用于提交表单

## 状态码分类：
<table>
<tr>
<td>整体范围</td>
<td>已定义范围</td>
<td>分类</td>
</tr>
<tr>
<td>100~199</td>
<td>100~101</td>
<td>信息提示</td>
</tr>
<tr>
<td>200~299</td>
<td>200~206</td>
<td>成功</td>
</tr>
<tr>
<td>300~399</td>
<td>300~305</td>
<td>重定向</td>
</tr>
<tr>
<td>400~499</td>
<td>400~415</td>
<td>客户端错误</td>
</tr>
<tr>
<td>500~599</td>
<td>500~505</td>
<td>服务器错误</td>
</tr>
</table>

## HTTP/1.1的特性
（就是Web服务器需要的功能）：丰富的资源支持，虚拟主机，访问控制，日志记录，配置，监视和性能特性。

**容易忽略的功能：服务器除了要管理连接和发送数据之外，还要记录事务处理过程（将与已完成事务有关的内容记录在一个日志文件中）**
