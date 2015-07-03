---
layout: post
title: "Java中文转拼音"
date: 2015-1-4
categories: 编程学习
tags: [java,translate]
---

java使用pinyin4j将中文转换成拼音

1、使用pinyin4j来实现，可以在[pinyin4j官网](http://sourceforge.net/projects/pinyin4j/files/)下载.

<!-- more -->

	{% highlight java %}
	package UserOther;

	import net.sourceforge.pinyin4j.PinyinHelper;
	import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
	import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
	import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
	import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
	import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

	public class PinyinTool {

    public static void main(String[] args) throws BadHanyuPinyinOutputFormatCombination {
        //设置拼音输出格式
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        //小写字母
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        //标注声调,必须有下面v的设置,不然会抛出异常,不设置的话拼音输出为 “我：wo3”
        format.setToneType(HanyuPinyinToneType.WITH_TONE_MARK);
        //使用v
        format.setVCharType(HanyuPinyinVCharType.WITH_U_UNICODE);

        String chinese="我还是拼音字符串";
        int lenght = chinese.length();
        for(int i=0;i<lenght;++i){
            //判断是否为汉字
            if (java.lang.Character.toString(chinese.charAt(i)).matches("[\\u4E00-\\u9FA5]+")) {
                //转为字符串，多音字有多个
                String[] s= PinyinHelper.toHanyuPinyinStringArray(chinese.charAt(i),format);
                //多音字逐个输出
                for(String ss:s)System.out.print(ss + " ");
                System.out.println();
            }
        }
    }
	}
	{% endhighlight %}
