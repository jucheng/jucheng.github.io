---
layout: post
title:  "IDEA修改"
date:   2014-12-25
categories: 环境配置
tags: idea
---
在Intellij IDEA中修改模板中user变量名称

在Intellij IDEA中的注释模板中的${user}名称是根据当前操作系统的登录名来取的，有时候登录名称和我们实际的user名称并不相同。

<!-- more -->

修改方法如下：

>方法一：在settings的file and code template中进行修改。这样只能每种文件模板都修改一遍。

>方法二：
>找到IDE的安装目录/bin下面的idea.exe.vmoptions 和idea64.exe.vmoptions这两个文件，在里面添加
>-Duser.name=yourname
>然后重启IDEA。这样就是全局的修改