---
layout: post
title: "线性表"
categories: 算法练习
date: 2015-03-05 17:15:05
tags: [线性表,链表]
---

#### 1、基本运算
线性表的基本运算有一下几种：

>1、表的初始化，即生成一个空表  
>2、判断表是否为空，即表结点的个数是否为零  
>3、判断表是否已满，即表结点的个数是否为最大允许的个数  
>4、求表长，即求表中结点的个数  
>5、取表中第i个结点  
>6、查找表中值为x的结点  
>7、在表中第i个位置上插入一个新结点  
>8、删除表中的第i个结点

其他的运算可以由基本运算组合来实现

<!-- more -->

#### 2、存储方式
线性表的数据元素的存储方式可以分为3种：

>顺序存储  
>链式存储  
>散列存储

#### 2.1、顺序存储实现类

	{% highlight c++ %}
	#pragma once
	const int DefaultSize = 100;
	//此处的"typename"可以换成"class"
	template<typename T>
	class LinearList
	{
	private:
		T *date;
		int maxSize;
		int length;
	public:
		//设置默认长度
		LinearList(int maxsize = DefaultSize);
		~LinearList();
		bool ListEmpty();
		bool ListFull();
		int ListLength() const;
		T GetElem(int i);
		int LocateElem(T &x)const;
		bool InsertElem(T &x, int i);
		bool DeleteElem(int i);
	};

	template<typename T>
	LinearList<T>::LinearList(int sz)
	{
		if (sz > 0)
		{
			maxSize = sz;
			length = 0;
			date = new T[maxSize];
		}
	}

	template<typename T>
	LinearList<T>::~LinearList()
	{
		delete[]date;
	}

	template<typename T>
	bool LinearList<T>::ListEmpty()
	{
		return length <= 0;
	}
	
	template<typename T>
	bool LinearList<T>::ListFull()
	{
		return length >= maxSize;
	}
	
	template<typename T>
	int LinearList<T>::ListLength() const
	{
		return length;
	}
	
	template <typename T>
	T LinearList<T>::GetElem(int i)
	{
		return (i < 0 || i > length) ? NULL : date[i];
	}
	
	template <typename T>
	int LinearList<T>::LocateElem(T &x) const
	{
		for (int i = 0; i < length; ++i)
		{
			if (date[i] == x)return i;
		}
		return -1;
	}
	
	template <typename T>
	bool LinearList<T>::InsertElem(T &x, int i)
	{
		if (i<0 || i>length || length == maxSize)return false;
		else
		{
			//数据后移
			for (int j = length; j < maxSize; ++j)date[j] = date[j - 1];
			date[i] = x;
			length++;
			return true;
		}
	}
	
	template <typename T>
	bool LinearList<T>::DeleteElem(int i)
	{
		if (i < 0 || i >= length || length == 0)return false;
		else
		{
			////数据后移
			for (int j = i; j < length - 1; ++j)date[j] = date[j + 1];
			length--;
			return true;
		}
	}
	{% endhighlight %}

创建对象是可以是`LinearList<int> list`,创建默认长度为100的线性表  
或者是`LinearList<int> list(200)`,创建长度为200的线性表

----------

#### 线性表的应用

##### 2.1.1、栈

栈：后进先出，只能栈顶取元素

	{% highlight c++ %}
	const int DefaultSize = 100;
	
	template<typename T>
	class Stack
	{
	public:
		Stack(int size = DefaultSize);
		~Stack();
		bool Push(const T& item);//入栈
		T Pop();				 //出栈
		T GetTop();				 //读取栈顶，不出栈
		void MakeEmpty();		 //将栈置空
		bool IsEmpty();
		bool IsFull();
	private:
		int top;				 //栈顶指针
		T *elements;
		int maxSize;
	};
	
	template<typename T>
	Stack<T>::Stack(int size)
	{
		if (size > 0)
		{
			maxSize = size;
			elements = new T[maxSize];
			top = -1;
		}
	}
	
	template<typename T>
	Stack<T>::~Stack()
	{
		delete []elements;
	}
	
	template <typename T>
	bool Stack<T>::IsEmpty()
	{
		return top == -1;
	}
	
	template <typename T>
	bool Stack<T>::IsFull()
	{
		return top == maxSize - 1;
	}
	
	template <typename T>
	void Stack<T>::MakeEmpty()
	{
		top = -1;
	}
	
	template <typename T>
	bool Stack<T>::Push(const T& item)
	{
		if ( !IsFull() )
		{
			elements[++top] = item;
			return true;
		}
		return false;
	}
	
	template <typename T>
	T Stack<T>::GetTop()
	{
		if ( !IsEmpty())return elements[top];
		else return NULL;
	}
	
	template <typename T>
	T Stack<T>::Pop()
	{
		if (!IsEmpty())return elements[top--];
		else return NULL;
	}
	{% endhighlight %}

##### 2.1.2、队列

队列：先进先出，队头取元素

	{% highlight c++ %}
	const int DefaultSize = 100;
	
	template <typename T>
	class Queue
	{
	public:
		Queue(int size = DefaultSize+1);
		~Queue();
		bool EnQueue(const T &item);		//入队
		T DeQueue();		//出队
		T GetFront();
		void MakeEmpty();		//置空
		bool IsEmpty();
		bool IsFull();
		int GetLength();
	
	private:
		int rear, front;
		T *elements;
		int maxSize;
	};
	
	template <typename T>
	Queue<T>::Queue(int size)
	{
		if (size > 0)
		{
			maxSize = size+1;
			elements = new T[maxSize];
			front = rear = 0;
		}
	}
	
	template <typename T>
	Queue<T>::~Queue()
	{
		delete []elements;
	}
	
	template <typename T>
	void Queue<T>::MakeEmpty()
	{
		front = rear = 0;
	}
	
	template <typename T>
	bool Queue<T>::IsEmpty()
	{
		return front == rear;
	}
	
	template <typename T>
	bool Queue<T>::IsFull()
	{
		return front == (rear + 1) % maxSize;
	}
	
	template <typename T>
	int Queue<T>::GetLength()
	{
		return (rear - front + maxSize) % maxSize;
	}
	
	template <typename T>
	bool Queue<T>::EnQueue(const T &item)
	{
		if (!IsFull())
		{
			rear = (rear + 1) % maxSize;
			elements[rear] = item;
			return true;
		}
		else return false;
	}
	
	template <typename T>
	T Queue<T>::DeQueue()
	{
		if (!IsEmpty())
		{
			front = (front + 1) % maxSize;
			return elements[front];
		}
		else return NULL;
	}
	
	template <typename T>
	T Queue<T>::GetFront()
	{
		if (!IsEmpty())return elements[front];
		else return NULL;
	}
	{% endhighlight %}

在链表中，当队列为空时有`front==rear`,当队列为满时，也有`front==rear`，为了避免这种冲突，将队列为满的条件设置为`front == (rear + 1) % maxSize`,所以将队列长度设置为`maxSize+1`,可用的长度为`maxSize`。

----------


#### 2.2、链式存储

对于链式结构的线性表，我们用一个头指针指向头结点，头结点再指向表头（表头才是链表的第一个元素），这样我们就可以根据头结点判断链表是否为空。
	
	{% highlight c++ %}
	#include <iostream>
	using namespace std;
	//定义节点结构
	struct Node
	{
	    int data;
	    Node *next;
	};
	
	void InitList(Node *&L);
	void DestroyList(Node *L);
	void InsertList(Node *&L, int data);
	void DispList(Node *L);
	void DeleteList(Node *&L, int data);
	void ChangeList(Node *L);
	
	int _tmain(int argc, _TCHAR* argv[])
	{
	    int s, num[10] = { 2, 1, 3, 4, 6, 8, 1, 8, 10, 9 };
	    Node *node;
	    InitList(node);

	    //添加数据
	    cout << "添加数据后为：";
	    for (int i = 0; i<10; ++i)InsertList(node, num[i]);
	    cout << "节点数量" << node->data << endl;
	    DispList(node);

	    //删除数据
	    cout << "删除数据8后为：";
	    DeleteList(node, 8);
	    cout << "节点数量" << node->data << endl;
	    DispList(node);

	    //翻转链表
	    cout << "翻转链表后为：";
	    ChangeList(node);
	    cout << "节点数量" << node->data << endl;
	    DispList(node);

	    //删除整个链表
	    DestroyList(node);
	    cin >> s;
	    return 0;
	}
	
	//======================实现方法========================
	//初始化：创建头节点，头指针指向头节点
	void InitList(Node *&L)
	{
	    L = new Node;
	    L->data = 0;
	    L->next = NULL;
	}
	
	//删除整个链表
	void DestroyList(Node *L)
	{
	    Node *p = L, *q = p->next;
	    while (q != NULL)
	    {
	        delete p;
	        p = q;
	        q = p->next;
	    }
	    delete p;
	}
	
	//插入数据
	void InsertList(Node *&L, int data)
	{
	    Node *p = L, *s, *t;
	    s = new Node;
	    s->data = data;
	    L->data++;
	    while (p->next != NULL)
	    {
	        t = p;
	        p = p->next;
	        if (data <= p->data)
	        {
	            s->next = p;
	            t->next = s;
	            return;
	        }
	    }
	    s->next = NULL;
	    p->next = s;
	}
	
	//显示数据
	void DispList(Node *L)
	{
	    Node *p = L->next;
	    while (p != NULL)
	    {
	        cout << p->data << '\0';
	        p = p->next;
	    }
	    cout << endl;
	}
	
	//删除节点
	void DeleteList(Node *&L, int data)
	{
	    Node *p = L, *t;
	    while (p->next != NULL)
	    {
	        t = p->next;
	        if (t->data == data)
	        {
	            p->next = t->next;
	            delete t;
	            L->data--;
	            if (p->next != NULL&&p->next->data == data)continue;
	            else break;
	        }
	        p = p->next;
	    }
	
	}
	
	//逆转链表
	void ChangeList(Node *L)
	{
	    int size = L->data;
	    int local = 0;
	    int *num = new int[size];           //申请辅助空间来存放所有数据
	
	    Node *p = L->next;
	    while (p != NULL)                   //将链表所有数据填入辅助数组
	    {
	        num[local++] = p->data;
	        p = p->next;
	    }

	    p = L->next;
	    while (p != NULL)                   //将所有辅助数组数据填入链表
	    {
	        p->data = num[--local];
	        p = p->next;
	    }

	    delete[]num;                    //释放辅助空间
	}
	{% endhighlight %}

##### 2.2.1、链式栈操作

先定义堆栈的几个基本操作，再设计一主函数利用堆的操作完成以下功能：假设一个算术表达式中可以包含三种括号：()[]{}，且这三种括号可以按任意次序嵌套使用（如：...[...{...}...[...]...]...(...)）。编写判别给定表达式中所含括号是否正确配对出现的算法，已知表达式已存入数据元素为字符的单链表中。

	{% highlight c++ %}
	#include <iostream>
	using namespace std;

	typedef char ElemType;
	struct MyStack
	{
	    ElemType ch;
	    MyStack *next;
	};
	
	void InitStack(MyStack *&s);
	void ClearStack(MyStack *&s);
	void Push(MyStack *&s, ElemType e);
	int Pop(MyStack *&s, ElemType &e);
	void DispStack(MyStack *s);
	bool IsRight(MyStack *s, ElemType*c);//判断是否匹配
	
	int _tmain(int argc, _TCHAR* argv[])
	{
	    int s=0;
	    ElemType *e = "{(2/3)[2*(1+2)(3+4)]}";
	    cout << "用来匹配的字符串:" << e << endl;
	    MyStack *node;
	    InitStack(node);
	    if (IsRight(node, e))cout << "匹配成功" << endl;
	    else cout << "匹配失败" << endl;
	    ClearStack(node);
	
	    e = "{()()(){}}[(][)]";
	    cout << "用来匹配的字符串:" << e << endl;
	    InitStack(node);
	    if (IsRight(node, e))cout << "匹配成功" << endl;
	    else cout << "匹配失败" << endl;
	    ClearStack(node);
	
	    cin >> s;
	    return 0;
	}
	
	//初始化栈:初始栈顶节点
	void InitStack(MyStack *&s)
	{
	    s = new MyStack;
	    s->next = NULL;
	}
	
	//删除栈
	void ClearStack(MyStack *&s)
	{
	    MyStack *p = s->next;
	    while (p != NULL)
	    {
	        delete s;
	        s = p;
	        p = p->next;
	    }
	    delete s;
	}
	
	//进栈
	void Push(MyStack *&s, ElemType e)
	{
	    MyStack *p;
	    p = new MyStack;
	    p->ch = e;
	    p->next = s->next;
	    s->next = p;
	}
	
	//出栈
	int Pop(MyStack *&s, ElemType &e)
	{
	    MyStack *p;
	    if (s->next == NULL)        //栈空的情况
	        return 0;
	    p = s->next;                //p指向第一个数据结点
	    e = p->ch;
	    s->next = p->next;
	    delete p;
	    return 1;
	}
	
	//显示栈内所有元素
	void DispStack(MyStack *s)
	{
	    MyStack *p = s->next;
	    while (p != NULL)
	    {
	        cout << p->ch << '\0';
	        p = p->next;
	    }
	    cout << endl;
	}
	
	//判断是否匹配括号
	bool IsRight(MyStack *s, ElemType*c)
	{
	    int i = -1;
	    ElemType e;
	    while (c[++i] != '\0')
	    {
	        if (c[i] == '{' || c[i] == '[' || c[i] == '(')
	            Push(s, c[i]);
	        else if (c[i] == '}')
	        {
	            Pop(s, e);
	            if (e != '{')return false;
	        }
	        else if (c[i] == ']')
	        {
	            Pop(s, e);
	            if (e != '[')return false;
	        }
	        else if (c[i] == ')')
	        {
	            Pop(s, e);
	            if (e != '(')return false;
	        }
	    }
	    return true;
	}
	{% endhighlight %}


##### 2.2.2、链式队列

先定义队列的几个基本操作，再设计一主函数利用队列的操作完成以下功能：键盘输入的字符可以临时存入键盘的缓冲区中。为了充分利用缓冲区的空间，往往将缓冲区设计成链式循环队列的结构，并为循环队列结构的缓冲区设置一个队首指针和一个队尾指针。每输入一个字符到缓冲区中，就将尾指针后移，链入缓冲区的循环队列之中；每输出一个字符号，就将队头指针前移，将它从缓冲队列中删除。假设有两个进程同时存在于一个应用程序中，第一个进程连续在屏幕上显示字符“X”，第二个进程不断检查键盘上是否有输入，若有则读入用户键入的字符，将其保存到键盘缓冲区中。

	{% highlight c++ %}
	#include<iostream>
	#include<malloc.h>
	#include<conio.h>
	using namespace std;
	typedef char ElemType;
	
	//定义节点结构
	typedef struct qNode
	{
	    ElemType data;
	    qNode *next;
	}QNode;
	
	//定义链队类型
	typedef struct
	{
	    QNode *front;
	    QNode *rear;
	}LiQueeue;
	
	void InitQueue(LiQueeue *&q);
	void ClearQueue(LiQueeue *&q);
	int QueueEmpty(LiQueeue *q);
	void enQueue(LiQueeue *&q, ElemType e);
	int deQueue(LiQueeue *&q, ElemType &e);
	
	int _tmain(int argc, _TCHAR* argv[])
	{
	    do
	    {
	        cout << "X";
	    } while (!_kbhit());
	
	    LiQueeue *q;
	    InitQueue(q);
	    ElemType e;
	    while (cin>>e&&e!='0')enQueue(q, e);
	    while (!QueueEmpty(q))
	    {
	        deQueue(q, e);
	        cout << e;
	    }
	    cout << endl;
	    ClearQueue(q);
	    cin >> e;
	
	}
	
	//初始化链队
	void InitQueue(LiQueeue *&q)
	{
	    q = new LiQueeue;
	    q->front = q->rear = NULL;
	}
	
	//销毁链队
	void ClearQueue(LiQueeue *&q)
	{
	    QNode *p = q->front, *r;
	    if (p != NULL)
	    {
	        r = p->next;
	        while (r != NULL)
	        {
	            delete p;
	            p = r;
	            r = p->next;
	        }
	    }
	    delete q;
	}
	
	//入队列
	void enQueue(LiQueeue *&q, ElemType e)
	{
	    QNode *s;
	    s = new QNode;
	    s->data = e;
	    s->next = NULL;
	    if (q->rear == NULL)q->front = q->rear = s;
	    else
	    {
	        q->rear->next = s;
	        q->rear = s;
	    }
	}
	
	//出队列
	int deQueue(LiQueeue *&q, ElemType &e)
	{
	    QNode *t;
	    if (q->rear == NULL)return 0;
	    t = q->front;
	    if (q->front == q->rear)q->front = q->rear = NULL;
	    else q->front = q->front->next;
	    e = t->data;
	    delete t;
	    return 1;
	}
	
	//判断队列是否为空
	int QueueEmpty(LiQueeue *q)
	{
	    if (q->rear == NULL)return 1;
	    else return 0;
	}
	{% endhighlight %}