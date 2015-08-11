---
layout: post
title: "如何用Eclipse连接MySQL（自制傻瓜教程）"
date: 2015-8-8
categories: Android
tags: [Android，数据库]
---
如何用Eclipse连接MySQL（自制傻瓜教程）

<!-- more -->

###1.既然要连接MySQL，你就首先要打开MySQL：
![](http://img-storage.qiniudn.com/15-8-8/17371675.jpg)

###2.接着登陆你的MySQL：记住你以前设置的MySQL的登陆密码，登陆之后会出现以下界面：
![](http://img-storage.qiniudn.com/15-8-8/83440856.jpg)

###2.然后就是加载JDBC驱动，有人说JDBC的驱动的版本要跟MySQL的一直，但也有人说不用，不过这里我不用也可以：

查看MySQL的版本很简单:输入 MySQL -V 就行了

![](http://img-storage.qiniudn.com/15-8-8/33038337.jpg)

###3.然后下载了相应的JDBC驱动包之后，就要添加到你的程序里边：

**选择Add External Archives:**

![](http://img-storage.qiniudn.com/15-8-8/98845959.jpg)

然后选择：mysql-connector-java-5.1.6-bin进行加载，加载完之后驱动包加载这一步就完了。
![](http://img-storage.qiniudn.com/15-8-8/71870262.jpg)

效果如下：

![](http://img-storage.qiniudn.com/15-8-8/59302638.jpg)

###4.接下来就是要在数据库创建你的数据的了，当然这里只是一个简单的测试而已。

在命令行窗口执行：

mysql>CREATE DATABASE test;   //创建一个数据库 

mysql>use  test;  //指定test为当前要操作的数据库 

mysql>CREATE TABLE user (name VARCHAR(20),password VARCHAR(20));   //创建一个表user，设置两个字段。 

mysql>INSERT INTO user VALUES('huzhiheng','123456'); //插入一条数据到表中 

在这里我的数据库已经建过了，所以界面出现以下：

![](http://img-storage.qiniudn.com/15-8-8/40151448.jpg)


###5.接下来就是要在Eclipse里边写程序来读取你数据库的信息了。

    package joinmysql;

    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.ResultSet;
    import java.sql.Statement;

      public class MysqlDemo {
               
	public static void main(String args[]){
		try{
			Class.forName("com.mysql.jdbc.Driver");//加载MYSQL JDBC驱动程序
			System.out.println("Success loading Mysql Driver!");
		}
		catch(Exception e){
			System.out.println("Error loading Mysql Driver!");
		    e.printStackTrace();
		}
		try {
			Connection connect=DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "cheng88");
    //连接URL为   jdbc:mysql//服务器地址/数据库名  ，后面的2个参数分别是登陆用户名和密码 
			
            System.out.println("Success connect Mysql server!" );
			Statement stmt=connect.createStatement();
			ResultSet rs=stmt.executeQuery("select * from user");
           //user 为你表的名称
			while (rs.next()) {
				System.out.println(rs.getString("name"));
				
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("get data error");
			e.printStackTrace();
		}
	}
    }

点击运行程，结果如下：（因为我之前插入了两个一样的数据，所以这里也就显示了两个相同的数据）

![](http://img-storage.qiniudn.com/15-8-8/29339126.jpg)

出现上面结果，说明你连接数据库成功。


###6..可以查看到MySQL里面的内容，那我们是不是想往MySQL中插入数据呢。

下面的例子，往MySQL的user表中插入100条数据

     import java.sql.*; 
 
    public class Myjproject { 
    public static void main(String args[]) 
    { 
     try { 
          Class.forName("com.mysql.jdbc.Driver");     //加载MYSQL JDBC驱动程序    
          //Class.forName("org.gjt.mm.mysql.Driver"); 
         System.out.println("Success loading Mysql Driver!"); 
        } 
        catch (Exception e) { 
          System.out.print("Error loading Mysql Driver!"); 
          e.printStackTrace(); 
        } 
    try { 
      Connection connect = DriverManager.getConnection( "jdbc:mysql://localhost:3306/test","root","198876"); 
      
       int num=100; 
       PreparedStatement Statement=connect.prepareStatement("INSERT INTO user VALUES(?,?)"); 
       for(int i=0;i<num;i++)        //定义个100次的循环，往表里插入一百条信息。 
      { 
           Statement.setString(1,"chongshi"+i); 
           Statement.setString(2,"bo"+i); 
           Statement.executeUpdate(); 
    } 
 
    // } catch (ClassNotFoundException e) { 
    // TODO Auto-generated catch block 
    // System.out.println("An error has occurred:"+e.toString()); 
    //  e.printStackTrace(); 
    }catch(SQLException e) 
    { 
    } 
    } 
    } 


###6.然后打开MySQL数据库进行查看

mysql> show tatabases;  //查看所数据库 

mysql> use  test;    //使test为当前要操作的数据库 

mysql> show tables; //查看当前数据库的所有表 

view sourceprint? 

mysql> select *from user;  //查看当前表（user）的所有信息 


本文参考了以下文章：

<http://www.360doc.com/content/15/0808/17/27050922_490349754.shtml>

在命令行里边操作数据库的基本操作可参考以下文章：

<http://www.cnblogs.com/itech/archive/2010/09/26/1835896.html>