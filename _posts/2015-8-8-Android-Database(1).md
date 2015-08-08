---
layout: post
title: "MySQL 数据库常用命令小结"
date: 2015-8-8
categories: Android
tags: [Android,数据库]
---
MySQL 数据库常用命令小结

<!-- more -->

###1、MySQL常用命令

create database name; **创建数据库**

use databasename; **选择数据库**

drop database name **直接删除数据库，不提醒**

show tables; **显示表**

describe tablename; **表的详细描述**

**select 中加上distinct去除重复字段**

mysqladmin drop databasename **删除数据库前，有提示**。

**显示当前mysql版本和当前日期**

select version(),current_date;

###2、修改mysql中root的密码：

shell>mysql -u root -p

mysql> update user set password=password(”xueok654123″) where user=’root’;

mysql> flush privileges //刷新数据库

mysql>use dbname； 打开数据库：

mysql>show databases; 显示所有数据库

mysql>show tables; 显示数据库mysql中所有的表

先use mysql；然后mysql>describe user; 显示表mysql数据库中user表的列信息）；

###3.grant
**创建一个可以从任何地方连接服务器的一个完全的超级用户，但是必须使用一个口令something做这个**

mysql> grant all privileges on *.* to user@localhost identified by ’something’ with

**增加新用户**

格式：grant select on 数据库.* to 用户名@登录主机 identified by “密码”

GRANT ALL PRIVILEGES ON *.* TO monty@localhost IDENTIFIED BY ’something’ WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON *.* TO monty@”%” IDENTIFIED BY ’something’ WITH GRANT OPTION;

**删除授权：**

mysql> revoke all privileges on *.* from root@”%”;

mysql> delete from user where user=”root” and host=”%”;

mysql> flush privileges;

**创建一个用户custom在特定客户端it363.com登录，可访问特定数据库fangchandb**

mysql >grant select, insert, update, delete, create,drop on fangchandb.* to custom@ it363.com identified by ‘ passwd’

**重命名表:**

mysql > alter table t1 rename t2;

###4.mysqldump

**备份数据库**

shell> mysqldump -h host -u root -p dbname >dbname_backup.sql

**恢复数据库**

shell> mysqladmin -h myhost -u root -p create dbname

shell> mysqldump -h host -u root -p dbname < dbname_backup.sql

**如果只想卸出建表指令，则命令如下：**

shell> mysqladmin -u root -p -d databasename > a.sql

**如果只想卸出插入数据的sql命令，而不需要建表命令，则命令如下：**

shell> mysqladmin -u root -p -t databasename > a.sql

**那么如果我只想要数据，而不想要什么sql命令时，应该如何操作呢？**

　　 mysqldump -T./ phptest driver

**其中，只有指定了-T参数才可以卸出纯文本文件，表示卸出数据的目录，./表示当前目录，即与mysqldump同一目录。如果不指定driver 表，则将卸出整个数据库的数据。每个表会生成两个文件，一个为.sql文件，包含建表执行。另一个为.txt文件，只包含数据，且没有sql指令。**


###5.可将查询存储在一个文件中并告诉mysql从文件中读取查询而不是等待键盘输入。可利用外壳程序键入重定向实用程序来完成这项工作。

例如，如果在文件my_file.sql 中存放有查询，可如下执行这些查询:

例如，如果您想将建表语句提前写在sql.txt中:

mysql > mysql -h myhost -u root -p database < sql.txt


本文转自：
<http://blog.csdn.net/ithomer/article/details/5131863>

常见的数据库命令行总将如下：

<http://database.51cto.com/art/201107/279428.htm>

<http://www.blogjava.net/supperchen/archive/2012/10/11/389340.html>

<http://www.chinaz.com/program/2009/0115/62526.shtml>
 