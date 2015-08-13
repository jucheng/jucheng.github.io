---
layout: post
title: "面向对象实践之路：提升抽象层次 "
date: 2015-8-13
categories: Android
tags: [Java，抽象]
---
面向对象实践之路：提升抽象层次

<!-- more -->

多少次有人问我如何构建一个比较好的类阶层次，如何使用面向对象进行设计，或者问为什么我看了那么多面向对象和设计模式的书一到使用的时候却总是写出面向过程的代码。每当我碰到这些问题的时候我总是回答，其实我也不知道。真的，其实我也不知道。

　　
虽然我总是张口闭口面向对象，总是看到一个问题后就谈这个有点XXX模式的影子，但大部分时候碰到一个问题我还是一片空白，不知道如何去分析设计和实现出好的面向对象。所以，我只想谈谈我是如何实践面向对象的，这对我自己有用但不一定对你有用。嗯，回到正题。
　　
回顾编程方法的发展史，我想不外乎两个字：抽象。

　　
**从最早的汇编语言中使用的子例程到结构化编程，然后到面向对象、面向组件以及面向服务。我觉得都是不断地提升抽象的层次。所以编程方法没有好坏，只有适合不适合。在汇编时代问题规模都很小，所以我们需要的抽象能力不需要太强。而现代的软件项目，问题的规模非常庞大，需要考虑的事情非常多（虽然纯粹的技术含量不一定有汇编时代的高），我们就必须使用抽象层次更高的方法来匹配我们的问题规模。**

　　
**面向对象编程方法的出现也不外乎如此，所以我们在使用面向对象方法开发的时候一个目的就是要提升抽象层次(比如现在由有人提出面向对象已经不足以匹配并行软计算的抽象层次，所以不再教授面向对象，转而教授函数编程)。**

　　
**而我觉得提升抽象层次的一个好方法就是用代码与人交谈，用代码来表达你的思想，在代码中形成一个个“概念”，或者说代码就是用来传递知识的。我将概念二字加上引号并加粗是有特别强调的意思，这个在后文我会谈谈什么是这里所说的概念。我不想在表面文字上谈论太多，我们来实践吧。**

　　
注意，本文代码仅仅为了说明一些问题或现象，并不考虑业务上的合理性，读者可以自行分辨然后拿自己的业务代码进行思考。

　　
**方法的参数**

　　
不知道你写过或见过下面的代码没有： 

    bool IsValid(string userName, string password, string email, int status);

**如果你见过然后还放任不管，那么你就丧失了一次提升抽象层次的机会。Robert.Martin在《Clean Code》里谈到，方法的参数不宜过多，如果有过多的参数我们就要特别审视一番**。

当我们审视上面的方法参数时，我们发现其实这些参数都应该属于同一个东西，而现在我们没有。类似字符串、整型这些类型，抽象层次太低了，没有任何的领域含义。而且我们发现，上面方法的参数和方法名字IsValid也不在同一个抽象的层次上，我们阅读到IsValid这个方法时，我们甚至不能一下子了解其目的：哦，这个方法是检查用户名、密码、邮件以及状态的有效性么？哎，多么啰嗦，还不一定对。如果我们多看两眼这些参数我们或许会写出这样的代码：

    bool IsValid(User user);

    public class User
    {
    public string UserName{get;set;}
    public string Password{get;set;}
    public string Email{get;set;}

    //这里仅仅为了方便使用整型代替枚举，其实可以新建一个枚举来提升这里的抽象层次-_-
    public int Status{get;set;}
    }

哦，看到这个方法后我就知道这个方法是用来检查用户的合法性的，除此之外我们还创建了一个概念“用户”，我们将一堆零散的数据聚合成一个新对象，向你传递了一个知识。

　　
园子里的沙沙对这一点写了另外一篇文章，给我提了个醒。我这里所说的可能有所误导：我并不是说如果参数多我们就硬生生的将这几个参数合并到一个类里去，我们首先要考察的是这几个参数之间的关系，如果没有任何关系就这样硬凑其实是不合理的。
　　
但是我想说如果你的一个方法参数很多，比如三四个，而且这几个参数之间居然还没啥关系，你自己想想到底发生了什么事？
　　
　　
然后我们再进入到IsValid方法内部看看：

    bool IsValid(User user)
    {
    if(user.UserName.Length > 0 && user.Email.Contains("@")){
        //....
    }
    //...
    }

　
我们发现这个方法内部干的事儿就是不断的询问User对象，探寻User对象的内部状态然后做出一些判断。探寻别人的隐私是不好的，这么强的依赖别人的内部状态违反了面向对象封装的原则。如果我们的一段代码总是不断的探寻另外一个对象的内部状态，然后做出一些判断，我们就应该思索：这个被询问的对象是不是缺少一个概念？或者说这段代码应该属于被询问的那个对象而不是现在的这个对象：

    public class User
    {
    public bool IsValid()
    {
        if(userName.Length > 0 && email.Contains("@"))
        {
            //....
        }
        //...
    }
    }

有的时候我们发现，方法内部的某部分代码围绕着一个中心点在纠结。跟方法内的其他代码有些间隙，最重要的是这段代码严重的影响了整个方法的可读性，因为有了这段代码，方法体变长，方法更难读懂。这个时候我们应该对方法内部的代码排排序，检查一下这些代码，是不是有的代码是为了干一件事儿（方法刚写的时候可能是这样分的，为了同一个目的的代码都放到一块儿，但随着时间流逝，新代码不断的加入可能违反了这个原则）。比如上面的IsValid方法或许如下面这样实现：

    public class User
    {
    public bool IsValid()
    {
        if(userName.Length > 0 && (email.Contains("@") && (email.EndsWith(".com") || email.EndsWith(".biz")...)))
        {
            //....
        }
        //...
    }
    }

　那一长串&&和||不就是为了验证Email的合法性么？因为它的存在搞得这里一团糟，如果我们能进一步提升抽象层次：将一团代码提取到一个方法，用方法名来描述方法本身：

    public class User
    {
    public bool IsValid()
    {
        if(userName.Length > 0 && IsEmailValid())
        {
            //....
        }
        //...
    }
    
    bool IsEmailValid()
    {
        return email.Contains("@") && (email.EndsWith(".com") || email.EndsWith(".biz")...));
    }
    }

不仅这团代码的抽象层次提高了，IsValid顿时也高贵起来了，好懂多了（不过那团代码依然存在，不过隐藏在抽象的背后，忘记是不是有这么一个名言：每个漂亮的接口后面都有一个肮脏的实现<玩笑话>）。

　　
碰到过这样的代码没有，一个类里五个方法，三个方法访问a,b,c属性，另外两个方法访问d,e,f属性。好像有一条隐约可见的分界线将这个类一分为二。有的时候这条分界线并不十分明显，可能还有一些交叉。这实际上和上面说的提取一个方法类似。我们只是比方法更高一个层次：缺少一个类型将这部分代码独立出去。还是看上面的User类，我们发现有那么几个方法总是围绕着email在打转，对User类其他的东西倒不是很关心：

    public class User
    {
    public bool IsValid()
    {
        if(userName.Length > 0 && IsEmailValid())
        {
            //....
        }
        //...
    }
    
    bool IsEmailValid()
    {
        return email.Contains("@") && (email.EndsWith(".com") || email.EndsWith(".biz")...));
    }
    
    public string EmailAddress()
    {
        return string.Format("\"{0}\"<1>",userName,email);
    }
    
    private string Convert()
    {
        if(email.IndexOf('#') != -1)
        {
            return email.Replace('#','@');
        }
    }
    }

我想或许我们缺少一个Email的概念，这样就可以将这几个方法以及其要使用的属性封装起来：

    public class User
    {
    private Email email;
 
    public bool IsValid()
    {
        if(userName.Length > 0 && email.IsEmailValid())
        {
            //....
        }
        //...
    }
    }

    public class Email
    {
    private string address;
    
    bool IsEmailValid()
    {
        return address.Contains("@") && (address.EndsWith(".com") || address.EndsWith(".biz")...));
    }
    
    public string EmailAddress(string userName)
    {
        return string.Format("\"{0}\"<1>",userName,email);
    }
    
    private string Convert()
    {
        if(email.IndexOf('#') != -1)
        {
            return address.Replace('#','@');
        }
    }
     }

**好了，就谈这么多吧。类似的提升抽象层次的例子还有很多很多，无非就是通过重组织代码，形成一些概念，向阅读代码的人传递领域的知识。然后我想说的是，面向对象设计或许真的很难，需要丰富的经验，但是面向对象编程并不难，只需要我们有一颗精益求精的心就可以了。代码不是写出来然后就放到那里，然后就不去管了，我们需要时不时的去照顾我们的代码，然后观察，然后不断的去雕刻。**

　　
**面向对象很像路边摊的大妈摊鸡蛋饼。不断的把饼摊薄，饼的每个小块都很薄，然后就很容易熟。**
