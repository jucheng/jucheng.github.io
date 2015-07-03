---
layout: post
title: "C#利用谷歌进行翻译"
date: 2015-1-3
categories: 编程学习
tags: [c#,translate]
---

### C#使用谷歌翻译对单词进行翻译

需要添加的引用还是要添加的

	using System;
	using System.IO;
	using System.Net;

<!-- more -->

实现如下：

	{% highlight c# %}
    class Program
    {
        static void Main(string[] args)
        {
            string English;
            while (true)
            {
                English = Console.ReadLine();
                HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create("http://translate.google.cn/translate_a/t?client=t&sl=ceb&tl=zh-CN&hl=zh-CN&sc=2&ie=UTF-8&oe=UTF-8&ssel=0&tsel=0&q=" + English);
                HttpWebResponse webResponse = (HttpWebResponse)webRequest.GetResponse();
                String Encod = webResponse.CharacterSet;      //获得网页的编码方式
                System.IO.Stream stream = webResponse.GetResponseStream();
                StreamReader reder = new StreamReader(stream, System.Text.Encoding.GetEncoding(Encod));       //将系统的输出方式也改为网页相同的编码
                String Str = reder.ReadToEnd();

                //截取第一个单词显示
                int first = Str.IndexOf("\"");                      //第一次出现"的位置
                int second = Str.IndexOf("\"", first + 1);   //第二次出现"的位置
                int Length = second - first - 1;                 //获得需要的字符串的长度,两个位置之间的长度
                Str = Str.Substring(first + 1, Length);

                //关闭
                reder.Close();
                stream.Close();
                webResponse.Close();

                Console.WriteLine(Str);
            }
        }
    }
	{% endhighlight %}