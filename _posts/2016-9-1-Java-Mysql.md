---
layout: post
title: "Java MySQL 连接 "
date: 2016-9-1
categories: Java
tags: [Java，基础知识]
---
Java MySQL 连接

<!-- more -->
也有一阵子没用eclipse连接MySQL了，今天在这里记录一下相应的一系列流程，以后方便看一下：

1、连接数据肯定是需要驱动包，这里的下载地址为：

<http://static.runoob.com/download/mysql-connector-java-5.1.39-bin.jar>

2、因为下载了一个Navicat for MySQL，作为MySQL的数据库可视化操作工具，还是值得使用的，接下来我们进行数据库的创建，在 MySQL 中创建 RUNOOB 数据库，并创建 web数据表，表结构如下：


     CREATE TABLE `websites` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `name` char(20) NOT NULL DEFAULT '' COMMENT '站点名称',
     `url` varchar(255) NOT NULL DEFAULT '',
     `alexa` int(11) NOT NULL DEFAULT '0' COMMENT 'Alexa 排名',
     `country` char(10) NOT NULL DEFAULT '' COMMENT '国家',
     PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

并且插入了一些数据：

    INSERT INTO `websites` VALUES 
    ('1', 'Google', 'https://www.google.cm/', '2', 'USA'), 
    ('2', 'Xinglang', 'https://www.baidu.com', '15', 'CHINA'),
    ('3', 'Baidu', 'http://weibo.com/', '20', 'CHINA'),
    ('4', 'Facebook', 'https://www.facebook.com/', '3', 'USA'),
    ('5', 'TentCent', 'http://www.qq.com/', '21', 'CHINA');

3、连接数据库

以下实例使用了 JDBC 连接 MySQL 数据库，注意一些数据如用户名，密码需要根据你的开发环境来配置：

    import java.sql.DriverManager;
    import java.sql.ResultSet;
    import java.sql.SQLException;

    import com.mysql.jdbc.Connection;
    import com.mysql.jdbc.Statement;

    /*
     * 使用JDBC连接数据库需要四步:
     * 第一步加载驱动程序；
     * 第二步，连接数据库；
     * 第三步，访问数据库；
     * 第四步，执行查询；
     * 其中在第四步执行查询时，要用statement类的executeQuery()方法来下达select指令以查询数据库，
     * executeQuery()方法会把数据库响应的查询结果存放在ResultSet类对象中供我们使用。
     * 即语句：String sql="select * from"+tableName; ResultSet rs=s.executeQuery(sql);
     */
    public class MySQLDemo {

	static final String JDBC_DRIER="com.mysql.jdbc.Driver"; 
	static final String DB_URL = "jdbc:mysql://localhost:3306/RUNOOB";
	static final String USER="root";
	static final String PASSWORD="";
	
	public static void main(String[] args) {
		Connection con=null;
		Statement  stat=null;
		try {
			//注册JDBC驱动
			Class.forName("com.mysql.jdbc.Driver");
			//连接数据
			System.out.println("连接数据库：");
			con=(Connection) DriverManager.getConnection(DB_URL,USER,PASSWORD);
			
			//执行查询
			System.out.println(" 实例化Statement对...");
			//就是用conn连接创建一个statement对象，这个对象有executeUpdate方法执行传入的sql语句
			stat=(Statement) con.createStatement();
			String sql;
			sql="SELECT id,name,url,country,alexa From WEB";
			ResultSet rs=stat.executeQuery(sql);
			// 展开结果集数据库
			while(rs.next()){
			// 通过字段检索
			int id  = rs.getInt("id");
			String name = rs.getString("name");
			String url = rs.getString("url");
			String country=rs.getString("country");
			int alexa=rs.getInt("alexa");
				
			// 输出数据
			System.out.print("ID: " + id);
			System.out.print(", 站点名称: " + name);
			System.out.print(", 站点 URL: " + url);
			System.out.print(", 站点排名: " + alexa);
			System.out.print(", 站点 所在国家: " + country);
			System.out.print("\n");
			}
			// 完成后关闭
			rs.close();
		    stat.close();
		    con.close();
			}catch(SQLException se){
			// 处理 JDBC 错误
			se.printStackTrace();
		   }catch(Exception e){
						
			// 处理 Class.forName 错误
			e.printStackTrace();
			}finally{
		// 关闭资源
					
			try{
			//记得要关闭资源，可以看到数据库连接时有限制的，如果连接不关闭，而且使用的人比较多，那么系统很快就down掉了。		
				if(stat!=null) stat.close();
						}catch(SQLException se2){
						}// 什么都不做
						try{
							if(con!=null) con.close();
						}catch(SQLException se){
							se.printStackTrace();
						}
					}
					System.out.println("各大网站展示完毕");
				}
	}





