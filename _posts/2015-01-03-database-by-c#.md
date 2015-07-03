---
layout: post
title: "C#连接oracle数据库"
date: 2015-1-3
categories: 编程学习
tags: [c#,oracle]
---

C#连接oracle数据库

1、创建连接

<!-- more -->

	{% highlight c# %}
    using System;
	using System.Data.OracleClient;

	namespace OraclePoj
	{
    	class DBOperate
    	{
        	private static  OracleConnection conn;
        	private static  OracleCommand cmd;
        	public static String account;

        	//创建oracle连接
        	public static void LinkToOracle(String arg_SID, String arg_user, String arg_passward)
        	{
            	String linkstart = "Data source=" + arg_SID + "; User ID=" + arg_user + "; Password=" + arg_passward;
            	try
            	{
                	conn = new OracleConnection(linkstart);
                	conn.Open();
                	cmd = conn.CreateCommand();
                	Console.WriteLine("Connection Success!");
            	}
            	catch (Exception e)
            	{
                	Console.WriteLine("Connection Failed!" + e.Message);
            	}

        	}

        	//关闭连接
        	public static  void LinkClose()
        	{
            	conn.Close();
            	Console.WriteLine("Connection Closed!");
        	}

        	public static OracleCommand getCommand()
        	{
            	return cmd;
        	}
    	}
		}
	{% endhighlight %}

2、如果要将数据加载到DataGridView，可以这样调用：

	{% highlight c# %}
    public void LoadAlldepartmentData()
        {
            OracleCommand cmd = DBOperate.getCommand();
            cmd.CommandText = "select * from department";
            DataTable dt = new DataTable();
            dt.Load(cmd.ExecuteReader());
            dataGridView1.DataSource = dt;
            cmd.Dispose();
        }
	{% endhighlight %}