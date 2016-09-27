目录(angular部分)

1. [事件](#1)
    - 1.0  [loading动画打开事件](#1.0)
    - 1.1  [loading动画关闭事件](#1.1)
    - 1.2  [更新body全局模型dom（top条，tab导航，打开loading动画）](#1.2)
2. [ui组件](#2)
    - 2.0  [顶部tab 导航 directive](#2.0)
3. [公共方法_1](#3)
    - 3.0  [获取当天 时间字符串 返回 2016_09_18](#3.0)
    - 3.1  [判断手机 与 web 显示 不同 alert](#3.1)
    - 3.2  [post url](#3.2)
    - 3.3  [判断是手机还是 app的 回调函数](#3.3)
    - 3.4  [错误alert 提示框](#3.4)
    - 3.5  [get url(同postUrl,不传post对象)](#3.5)
    - 3.6  [返回一个 随机数](#3.6)
    - 3.7  [根据名称 存储localStorage 一个 obj](#3.7)
    - 3.8  [根据名称读取localStorage 返回一个 obj](#3.8)
    - 3.9  [删除数组中的元素](#3.9)
4. [公共方法_2](#4)
    - 4.0 [判断是否funcion类型](#4.0)
    - 4.1 [返回一个localStorage 所有的键名数组](#4.1)
5. [本地数据localStorage](#5)
    - 5.0 [app.js 更新后的 下载存储路径  downLoad.appJsPath](#5.0)
    - 5.1 [app.css 更新后的 下载存储路径 downLoad.appCssPath](#5.1)
    - 5.2 [是否第一次更新下载Js  downLoad.isFirstJs](#5.2)
    - 5.3 [是否第一次更新下载css  downLoad.isFirstCss](#5.3)
    - 5.4 [判断是否升级变量  system.trueUpdate (0:自动升级，1.提示升级，2.永不升级)](#5.4)
    - 5.5 [app端的随机id,启动后生成,判断验证码用 user.roundCodeId](#5.5)
    - 5.6 [版本key值  version.key](#5.6)
6. [config 设置](#6)
    - 6.0 [检查更新的延时时间  system.timeoutUpData  单位：毫秒](#6.0)
    - 6.1 [nodes api url     host.nodeHost](#6.1)
    - 6.2 [app 静态路径     host.appPath](#6.2)
    - 6.3 [php 静态路径 host.phpHost](#6.3)
    - 6.4 [当前默认版本号,更新版本后需手动修改配置   version.default](#6.4)
    
    
***

<h6 id="1"></h6>
**1. 事件**

<h6 id="1.0"></h6>
###### 1.0 打开loading 
>   |事件名称|功能|模板调用|事件代码|  
>   |:---:|:---:|:-----:|:-----:|
>   |closeLoading|打开loading动画|```<div loading></div>```（默认显示loading）|$rootScope.$broadcast(‘openLoading');|

