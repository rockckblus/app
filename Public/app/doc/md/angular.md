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
    - 3.5  get url(用法同postUrl,不传post对象)
    - 3.6  [返回一个 随机数](#3.6)
    - 3.7  [根据名称 存储localStorage 一个 obj](#3.7)
    - 3.8  [根据名称读取localStorage 返回一个 obj](#3.8)
    - 3.9  [删除数组中的元素](#3.9)
4. [公共方法_2](#4)
    - 4.0 [判断是否funcion类型](#4.0)
    - 4.1 [返回一个localStorage 所有的键名数组](#4.1)
5. [本地数据localStorage](#5)
    - 5.0 app.js 更新后的 下载存储路径  `downLoad.appJsPath`
    - 5.1 app.css 更新后的 下载存储路径 `downLoad.appCssPath`
    - 5.2 [是否第一次更新下载Js  `downLoad.isFirstJs`](#5.2)
    - 5.3 [是否第一次更新下载css  `downLoad.isFirstCss`](#5.3)
    - 5.4 判断是否升级变量  `system.trueUpdate` (0:自动升级，1.提示升级，2.永不升级)
    - 5.5 app端的随机id,启动后生成,判断验证码用 `user.roundCodeId`
    - 5.6 判断用户登录 `user.isLogin`
    - 5.7 用户数据 `user.userData`
    - 5.8 版本key值  `version.key`
6. config 设置
    - 6.0 检查更新的延时时间  `system.timeoutUpData`  单位：毫秒
    - 6.1 nodesApi url     `host.nodeHost`
    - 6.2 nodesApi 模拟url      `host.nodeHostTest`
    - 6.3 php 静态路径 `host.phpHost`
    - 6.4 php 模拟静态路径 `host.phpHostTest`
    - 6.5 app 静态路径     `host.appPath`
    - 6.6 当前默认版本号,更新版本后需手动修改配置  `version.default`
    - 6.7 是否开启模拟调试Api  `debugApi` (true 开启模拟api)
    
    
***

<h6 id="1"></h6>
**1. 事件**

<h6 id="1.0"></h6>
###### 1.0 loading动画打开事件 
>   |事件名称|功能|模板调用|事件代码|  
>   |:---:|:---:|:-----:|:-----:|
>   |openLoading|打开loading动画|```<div loading></div>```（默认显示loading）|$rootScope.$broadcast(‘openLoading');|

<h6 id="1.1"></h6>
###### 1.1 loading动画关闭事件 
>   |事件名称|功能|模板调用|事件代码|  
>   |:---:|:---:|:-----:|:-----:|
>   |closeLoading|关闭loading动画|```<div loading></div>```（默认显示loading）|$rootScope.$broadcast(‘closeLoading');|

<h6 id="1.2"></h6>
###### 1.2 更新body全局模型dom（top条，tab导航，打开loading动画） 
>   |事件名称|功能|模板调用|事件代码|  
>   |:---:|:---:|:-----:|:-----:|
>   |changeBody|打开loading 更新top,tab 赋值{{url}}变量以供 模板判断| 无 |$rootScope.$broadcast(‘changeBody');|

<h6 id="2"></h6>
**2.ui组件**

<h6 id="2.0"></h6>
###### 2.0 顶部tab 导航 directive 
>   |模板调用|说明|
>   |:---:|:---:|
>   |```<div tab></div>```|默认2个 tab按钮，可分 3 4 ，在 全局 localData.factory 里面 判断网址来配置 ，<br>现在 tab 是放在 了 top directive里面，css hack了 appBody 的 高度|

<h6 id="3"></h6>
**3.公共方法_1**

<h6 id="3.0"></h6>
###### 3.0 获取当天 时间字符串 返回 2016_09_18 
>   |注入名称|使用方法|@returns|demo|  
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.getToday()|{String}|tools.getToday(); // 2016_09_18|

<h6 id="3.1"></h6>
###### 3.1 判断手机 与 web 显示 不同 alert (已弃用)
>   |注入名称|使用方法|功能|demo|  
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.alert(msg)|判断手机 与 web 显示 不同 alert||

<h6 id="3.2"></h6>
###### 3.2 post url


>   |注入名称|使用方法|功能|demo|  
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.postJsp(url,data,noLoadIng).then(callBackOkFun,callBackErrFun,isNoLoading)|post请求url||

>   |传参|类型|必传|说明|  
>   |:---:|:---:|:-----:|:-----:|
>   |url|{String}|是|post的 网址|
>   |obj|{Object}|是|js对象 格式：{a：1，b：2}|
>   |isNoLoading|{Boolean}|否|true:不显示loading动画|

> + **异步编程用法**:	```tools.postJsp(url1,data).then(tools.postJsp(url2,re1.data))```
```.then(tools.postJsp(url3,re2.data)，callBackErrFun);```
+ **异步编程说明**:	```阻塞式post请求，re1是url1 的回调值，re2是 url2 的回调值，```
```有一步有错误，直接 调用 callBackErrFun 方法```

<h6 id="3.3"></h6>
###### 3.3 判断是手机还是 app的 回调函数
>   |注入名称|使用方法|功能|  |
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.trueWeb(wap,app)|判断是手机还是app 执行不同回调函数|

>   |传参|类型|必传|说明|  
>   |:---:|:---:|:-----:|:-----:|
>   |wap|{Function}|是|wap端执行 的 回调函数|
>   |app|{Function}|是|App端执行 的 回调函数|

<h6 id="3.6"></h6>
###### 3.6 返回一个 随机数
>   |注入名称|使用方法|功能|  |
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.getRoundCode(n)|返回一个随机数||

>   |传参|类型|必传|demo|  
>   |:---:|:---:|:-----:|:-----:|
>   |n|{Number}|是|```tools.getRoundCode(8) ; // 12345678```|

<h6 id="3.7"></h6>
###### 3.7 根据名称 存储localStorage 一个 obj

>   |注入名称|使用方法|功能|  |
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.saveLocalStorageObj(localName,obj)|根据名称 存储localStorage 一个 obj||

>   |传参|类型|必传|说明|  
>   |:---:|:---:|:-----:|:-----:|
>   |localName|{String}|是|需要存储的key|
>   |obj|{Object}|是|需要存储的Obj{a:1,b:2}|

<h6 id="3.8"></h6>
###### 3.8 根据名称读取localStorage 返回一个 obj
>   |注入名称|使用方法|功能|@return|
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.getLocalStorageObj(localName)|根据名称 读取localStorage 一个 obj|成功返回{object},失败返回false|

>   |传参|类型|必传|说明|  
>   |:---:|:---:|:-----:|:-----:|
>   |localName|{String}|是|需要读取的key|

<h6 id="3.9"></h6>
###### 3.9 删除数组中的元素
>   |注入名称|使用方法|功能|@return|
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.arrDel(arr,num)|删除数组中的元素|无|

>   |传参|类型|必传|说明|  
>   |:---:|:---:|:-----:|:-----:|
>   |arr|{Array}|是|需要删除的数组|
>   |num|{Number}|是|需要删除的数组元素在数组的中的key(index)|

> + demo ``` tools.arrDel([a,b,c],1); // 数组原型变为 [a,c]```

<h6 id="4"></h6>
**4.公共方法_2**

<h6 id="4.0"></h6>
###### 4.0 判断是否funcion类型
>   |注入名称|使用方法|功能|@return|
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.isFunction(fn)|判断是否funcion类型|{Boolean}|

>   |传参|类型|必传|说明|  
>   |:---:|:---:|:-----:|:-----:|
>   |fun|{*}|是|需要判断的任性类型|

> + demo ``` tools.isFunction(function(){}); // true```
> + demo ``` tools.isFunction([1,2]); // false```

<h6 id="4.1"></h6>
###### 4.1 返回一个localStorage 所有的键名数组
>   |注入名称|使用方法|功能|@return|
>   |:---:|:---:|:-----:|:-----:|
>   |tools|tools.getAllCatchListName()|遍历所有localStorage,返回一个 键名数组对象|{Array}|

> + demo ``` tools.getAllCatchListName(); // ['key1','key2']```

<h6 id="5"></h6>
**5.本地数据localStorage**

<h6 id="5.2"></h6>
###### 5.2 是否第一次更新下载Js  isFirstJs (null,1,2)
> + 说明：默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2

<h6 id="5.3"></h6>
###### 5.3 是否第一次更新下载css  isFirstCss (null,1,2)
> + 说明：是否第一次下载css, 默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2

















