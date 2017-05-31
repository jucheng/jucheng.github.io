---
layout: post
title: "你不知道的setTimeout"
date: 2017-5-31
categories: 前端
tags: [前端开发，JavaScript]
---

你所不知道的setTimeout

<!-- more -->

### 一、前言

JavaScript提供定时执行代码的功能，叫做定时器（timer），主要由setTimeout()和setInterval()这两个函数来完成。它们向任务队列添加定时任务。初始接触它的人都觉得好简单，实时上真的如此么？这里记载下，一路对其使用姿势变迁的历程。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-1.jpeg)

### 二、setTimeout()基础

#### 1、概念

setTimeout函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。

>  var timerId = setTimeout(func/code, delay)


上面代码中，setTimeout函数接受两个参数，第一个参数fun或者code是将要推迟执行的函数名或者一段代码，第二个参数delay是推迟执行的毫秒数。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-2.png)

上面代码的输出结果就是1，3，2，因为setTimeout指定第二行语句推迟1000毫秒再执行(如果这在Sublime下运用插件以nodejs环境来执行，许解释器不同，会报错)。

需要注意的是，推迟执行的代码必须以字符串的形式，放入setTimeout，因为引擎内部使用eval函数，将字符串转为代码。如果推迟执行的是函数，则可以直接将函数名，放入setTimeout。一方面eval函数有安全顾虑，另一方面为了便于JavaScript引擎优化代码，setTimeout方法一般总是采用函数名的形式，就像下面这样。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-3.png)

#### 2、setTimeout传参数

除了前两个参数，setTimeout还允许添加更多的参数。它们将被传入推迟执行的函数（回调函数）。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-4.png)

上面代码中，**setTimeout共有4个参数。最后那两个参数，将在1000毫秒之后回调函数执行时，作为回调函数的参数。**

**IE 9.0及以下版本，只允许setTimeout有两个参数**，不支持更多的参数;可以在匿名函数中，让回调函数带参数运行，再把匿名函数输入setTimeout；例如:

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-5.png)

当然也可以使用bind或apply方法来解决。

例如使用bind方法，把多余的参数绑定在回调函数上面，生成一个新的函数输入setTimeout。

> 	setTimeout( function(arg1){}.bind(undefined, 10), 1000 );

上面代码中，bind方法第一个参数是undefined，表示将原函数的this绑定全局作用域，第二个参数是要传入原函数的参数。它运行后会返回一个新函数，该函数不带参数。

#### 3、setTimeout注意点

**setTimeout()中回调函数中的this**

**如果被setTimeout推迟执行的回调函数是某个对象的方法，那么该方法中的this关键字将指向全局环境，而不是定义时所在的那个对象。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-6.png)

上面代码输出的是1，而不是2，这表示o.y的this所指向的已经不是o，而是全局环境了。

再看一个不容易发现错误的例子。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-7.png)

上面代码只会显示undefined，因为等到user.sayHi执行时，它是在全局对象中执行，所以this.login取不到值。

为了防止出现这个问题，一种解决方法是将user.sayHi放在匿名函数中执行。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-8.png)

上面代码中，sayHi是在user作用域内执行，而不是在全局作用域内执行，所以能够显示正确的值。

另一种解决方法是，使用bind方法，将绑定sayHi绑定在user上面。

> 	setTimeout(user.sayHi.bind(user), 1000);

HTML 5标准规定，setTimeout的最短时间间隔是4毫秒。为了节电，对于那些不处于当前窗口的页面，浏览器会将时间间隔扩大到1000毫秒。另外，如果笔记本电脑处于电池供电状态，Chrome和IE 9以上的版本，会将时间间隔切换到系统定时器，大约是15.6毫秒。

#### 4、setTimeout执行回调间隔时间长度

如果你在一段代码中发现下面内容:

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-9.png)

请问最后打印的是多少?其正确答案是，取决于后面同步执行的js需要占用多少时间。
即为：MAX(同步执行的时间, 100)；缘何如此，就得看下**setTimeout运行机制了**。

### 三、setTimeout运行机制

**setTimeout和setInterval的运行机制是，将指定的代码移出本次执行，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout指定的代码，必须等到本次执行的所有代码都执行完，才会执行。**

**每一轮Event Loop时，都会将“任务队列”中需要执行的任务，一次执行完。setTimeout和setInterval都是把任务添加到“任务队列”的尾部。因此，它们实际上要等到当前脚本的所有同步任务执行完，然后再等到本次Event Loop的“任务队列”的所有任务执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，setTimeout和setInterval指定的任务，一定会按照预定时间执行。**

	setTimeout(someTask,100);
    veryLongTask();

上面代码的setTimeout，指定100毫秒以后运行一个任务。但是，如果后面立即运行的任务（当前脚本的同步任务））非常耗时，过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到前面的veryLongTask运行结束，才轮到它执行。

### 四、setTimeout(func,0)

在使用backbone框架写代码的时候，因为些需求因素，新手总会在render时操纵下dom，却发现改变dom元素状态，代码没有问题，界面却没有变更。而使用setTimeout(func,time)却能解决这个问题，即便time=0;探究一番，真相只有一个：

**setTimeout(func,0)含义**

运行下面代，func1和func2谁会先执行？很明显func2先执行；

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-10.png)

setTimeout的作用是将代码推迟到指定时间执行，如果指定时间为0，即setTimeout(f,0)，那么会立刻执行吗？

答案是不会。**因为setTimeout运行机制说过，必须要等到当前脚本的同步任务和“任务队列”中已有的事件，全部处理完以后，才会执行setTimeout指定的任务**。

**也就是说，setTimeout的真正作用是，在“任务队列”的现有事件的后面再添加一个事件，规定在指定时间执行某段代码。setTimeout添加的事件，会在下一次Event Loop执行。**

**setTimeout(f,0)将第二个参数设为0，作用是让f在现有的任务（脚本的同步任务和“任务队列”中已有的事件）一结束就立刻执行。也就是说，setTimeout(f,0)的作用是，尽可能早地执行指定的任务。**

	setTimeout(function (){
        console.log("你好！");
	}, 0);

上面代码的含义是，尽可能早地显示“你好！”。

setTimeout(f,0)指定的任务，最早也要到下一次Event Loop才会执行。请看下面的例子。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-12.png)

上面代码说明，setTimeout(f,0)必须要等到当前脚本的所有同步任务结束后才会执行。

0毫秒实际上达不到的。根据HTML5标准，setTimeOut推迟执行的时间，最少是4毫秒。如果小于这个值，会被自动增加到4。这是为了防止多个setTimeout(f,0)语句连续执行，造成性能问题。

另一方面，浏览器内部使用32位带符号的整数，来储存推迟执行的时间。这意味着setTimeout最多只能推迟执行2147483647毫秒（24.8天），超过这个时间会发生溢出，导致回调函数将在当前任务队列结束后立即执行，即等同于setTimeout(f,0)的效果。

### 五、setTimeout(f,0)应用

#### 1、调整事件的发生顺序

**setTimeout(f,0)有几个非常重要的用途。它的一大应用是，可以调整事件的发生顺序**。比如，网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数，会早于父元素的事件回调函数触发。如果，我们先让父元素的事件回调函数先发生，就要用到setTimeout(f, 0)。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-13.png)

上面代码在点击按钮后，先触发回调函数A，然后触发函数C。在函数A中，setTimeout将函数B推迟到下一轮Loop执行，这样就起到了，先触发父元素的回调函数C的目的了。

**用户自定义的回调函数，通常在浏览器的默认动作之前触发**。比如，用户在输入框输入文本，keypress事件会在浏览器接收文本之前触发。因此，下面的回调函数是达不到目的的。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-14.png)

上面代码想在用户输入文本后，立即将字符转为大写。但是实际上，它只能将上一个字符转为大写，因为浏览器此时还没接收到文本，所以this.value取不到最新输入的那个字符。只有用setTimeout改写，上面的代码才能发挥作用。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-15.png)

上面代码将代码放入setTimeout之中，就能使得它在浏览器接收到文本之后触发;原来如此：这也就解释了缘何在使用backbone调用render之时，操纵dom是无效的了，因为当时连dom元素都还没获取到(为何没报错？这牵扯到另一个话题),自然等页面渲染完毕了也没见想要的结果了。

#### 2、分割耗时

众所周知javascript是单线程的，特点就是容易出现阻塞。如果一段程序处理时间很长，很容易导致整个页面hold住。什么交互都处理不了怎么办？

> 简化复杂度？复杂逻辑后端处理？html5的多线程？……

上面都是ok的做法，但是setTimeout也是处理这种问题的一把好手。

**setTimeout一个很关键的用法就是分片，如果一段程序过大，我们可以拆分成若干细小的块。由于setTimeout(f,0)实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到setTimeout(f,0)里面执行(分片塞入队列)，这样即使在复杂程序没有处理完时，我们操作页面，也是能得到即时响应的**，其实就是将交互插入到了复杂程序中执行。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-16.png)

上面代码有两种写法，都是改变一个网页元素的背景色。写法一会造成浏览器“堵塞”，而写法二就能就不会，这就是**setTimeout(f,0)**的好处。即：可利用setTimeout实现一种伪多线程的概念。

另一个使用这种技巧的例子是，代码高亮的处理。如果代码块很大，就会分成一个个小块，写成诸如**setTimeout(highlightNext, 50)**的样子，进行分块处理。

### 六、clearTimeout()

setTimeout和setInterval函数，都返回一个表示计数器编号的整数值，将该整数传入clearTimeout和clearInterval函数，就可以取消对应的定时器。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-17.png)

**setTimeout和setInterval返回的整数值是连续的(一定环境下，比如浏览器控制台，或者js执行环境等)，也就是说，第二个setTimeout方法返回的整数值，将比第一个的整数值大1。利用这一点，可以写一个函数，取消当前所有的setTimeout。**

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-18.png)

运行上面代码后，实际上再设置任何setTimeout都无效了。

下面是一个clearTimeout实际应用的例子。有些网站会实时将用户在文本框的输入，通过Ajax方法传回服务器，jQuery的写法如下。

> 	$('textarea').on('keydown', ajaxAction);

这样写有一个很大的缺点，就是如果用户连续击键，就会连续触发keydown事件，造成大量的Ajax通信。这是不必要的，而且很可能会发生性能问题。正确的做法应该是，设置一个门槛值，表示两次Ajax通信的最小间隔时间。如果在设定的时间内，发生新的keydown事件，则不触发Ajax通信，并且重新开始计时。如果过了指定时间，没有发生新的keydown事件，将进行Ajax通信将数据发送出去。

这种做法叫做debounce（防抖动）方法，用来返回一个新函数。只有当两次触发之间的时间间隔大于事先设定的值，这个新函数才会运行实际的任务。假定两次Ajax通信的间隔不小于2500毫秒，上面的代码可以改写成下面这样。

> 	$('textarea').on('keydown', debounce(ajaxAction, 2500))

利用setTimeout和clearTimeout，可以实现debounce方法。该方法用于防止某个函数在短时间内被密集调用，具体来说，debounce方法返回一个新版的该函数，这个新版函数调用后，只有在指定时间内没有新的调用，才会执行，否则就重新计时。

![](http://oq2sjn05e.bkt.clouddn.com/2017-5-31-FEW-JavaScript%20setTimeout%20-19.png)

现实中，**最好不要设置太多个setTimeout和setInterval，它们耗费CPU**。比较理想的做法是，将要推迟执行的代码都放在一个函数里，然后只对这个函数使用setTimeout或setInterval。

### 七、如何使用setTimeout

对setTimeout自然不止于这些，但已足见其强大。那么问题来了，需要在项目中大量使用么？视个人和项目而定吧；如不能熟练掌握，不建议多用。毕竟在某些情景之下，setTimeout作为一个hack的方式而存在的（打乱模块的生命周期，并且在问题出现时很难调试，你懂的），譬如：当一个实例还没有初始化的前，我们就使用这个实例，错误的解决办法是使用实例时加个setTimeout，确保实例使用前已初始化。

但只要足够熟悉它，以及使用的场景(包括模块生命周期)，使用它也就无可厚非了。比如underscore中不少方法也是基于这setTimeout方法写的；比如非常强大的_.defer： 延迟调用function直到当前调用栈清空为止，类似使用延时为0的setTimeout方法。对于执行开销大的计算和无阻塞UI线程的HTML渲染时候非常有用。 如果传递arguments参数，当函数function执行时， arguments 会作为参数传入。

文章转自：

<a href="http://jeffjade.com/2016/01/10/2016-01-10-javacript-setTimeout/#">你所不知道的setTimeout</a>

<a href="http://www.css88.com/archives/5804">你所不了解的setTimeout(好）</a>

