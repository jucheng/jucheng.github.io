---
layout: post
title: "windows注册表导入与删除"
date: 2015-1-3
categories: 杂七杂八
tags: [windows,register]
---

注册表导入与删除

导入如下格式：

	Windows Registry Editor Version 5.00  
  
  
	[HKEY_CLASSES_ROOT\Python.File\shell\runas]  
	"HasLUAShield"=""  
  
  
	[HKEY_CLASSES_ROOT\Python.File\shell\runas\command]  
	@="path \"%1\" %*" 

<!-- more -->

删除如下格式，就是在导入的记录前加 "-",eg:

	Windows Registry Editor Version 5.00  
  
  
	[-HKEY_CLASSES_ROOT\Python.File\shell\runas]  
	"HasLUAShield"=""  
  
  
	[-HKEY_CLASSES_ROOT\Python.File\shell\runas\command]  
	@="path \"%1\" %*" 