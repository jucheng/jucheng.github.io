---
layout: post
title: "jboss配置oracle数据源"
categories: 环境配置
tags: [jboss,数据源,oracle]
date: 2015-03-24 22:19:20
---

### 一、前言

本文记录在Jboss中配置oracle数据源的过程，其中Jboss使用的是`jboss-eap-6.3`，oracle使用的是`oracle12c`，jdk版本是`jdk1.8`,所以驱动使用的是`ojdbc7.jar`,操作系统是`windows`

### 二、将驱动构建为JBOSS的modules

1、在`%JBOSS_HOME%\modules\system\layers\base\com`目录下添加`oracle\main`目录  
2、将驱动`ojdbc7.jar`放到该目录，添加文件`module.xml`,内容如下：

<!-- more -->


	{% highlight xml %}
	<?xml version="1.0" encoding="UTF-8"?>
	<module xmlns="urn:jboss:module:1.1" name="com.oracle">
	    <resources>
	        <resource-root path="ojdbc7.jar"/>
	    </resources>
	    <dependencies>
	        <module name="javax.api"/>
	        <module name="javax.transaction.api"/>
	        <module name="javax.servlet.api" optional="true"/>
	    </dependencies>
	</module>
	{% endhighlight %}

### 三、加载驱动,配置数据源

1、打开文件`%JBOSS_HOME%\standalone\configuration\standalone.xml`  
2、将`datasources`标签内容替换成如下：

	{% highlight xml %}
	<!-- 新的数据源 -->
	            <datasources>
	                <datasource jta="true" jndi-name="java:jboss/datasource/OracleDS" pool-name="OracleDS" enabled="true" use-ccm="false">   
	                  <connection-url>jdbc:oracle:thin:@127.0.0.1:1521:orcl</connection-url>   
	                  <driver-class>oracle.jdbc.OracleDriver</driver-class>

					  <!-- 在这里使用驱动，这里的值就是添加驱动时的name -->
	                  <driver>oracle</driver> 

	                  <security>   
	                      <user-name>Your-Name</user-name>   
	                      <password>Your-Password</password>   
	                  </security>  
	                   <validation>   
	                      <validate-on-match>false</validate-on-match>   
	                      <background-validation>false</background-validation>   
	                  </validation>   
	                  <statement>   
	                      <share-prepared-statements>false</share-prepared-statements>   
	                  </statement>   
	                </datasource>

					<!-- 在这里加载添加的驱动，其中module的值是module.xml里面的name -->
	                <driver name="oracle" module="com.oracle">  
	                    <driver-class>oracle.jdbc.OracleDriver</driver-class>   
	                </driver>  
	            </datasources>
	{% endhighlight %}

### 四、测试数据源

1、确认数据库已经开启了  
2、运行 `%JBOSS_HOME%\bin\standalone.bat`,使用管理员账号（没有的话使用`%JBOSS_HOME%\bin\add-user.bat`,添加一个管理型用户）进入控制台[http://127.0.0.1:9990/console/](http://127.0.0.1:9990/console/)，进入datasources-Connection-Test Connection,就可以看到是否成功了。