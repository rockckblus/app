# app document
># `angular 部分`

### 1.事件
	1.1 ———  loading动画打开事件
	1.2 ———  loading动画关闭事件
	1.3 ——— 更新body全局模型dom（top条，tab导航，打开loading动画）

### 2.ui组件
	2.1 ——— 顶部tab 导航 directive

### 3.公共方法
	3.1——— 判断手机 与 web 显示 不同 alert
	3.2 ——— post url
	3.3 ——— 判断是手机还是 app的 回调函数
	3.4——— 错误alert 提示框
### 4.本地数据localStorage
	4.1 ——— app.js 更新后的 下载存储路径  downLoad.appJsPath
	4.2 ——— app.css 更新后的 下载存储路径 downLoad.appCssPath
	4.3 ——     是否第一次更新下载Js  downLoad.isFirstJs
	4.4 ——— 是否第一次更新下载css  downLoad.isFirstCss
	4.5 ———  判断是否升级变量  system.trueUpdate (0:自动升级，1.提示升级，2.永不升级)
	4.6 ——— app端的随机id,启动后生成,判断验证码用 user.roundCodeId
	4.7 ——— 版本key值  version.key
### 5.config 设置

	5.1 ———  检查更新的延时时间  system.timeoutUpData  单位：毫秒
	5.2 ———  nodes api url     host.nodeHost
	5.3 ———  app 静态路径     host.appPath
	5.4 ——— php 静态路径 host.phpHost
	5.5 ——— 当前默认版本号,更新版本后需手动修改配置   version.default


>## `nodeApi 部分`

### 6.soso接口

>## `phpApi 部分`

### 7.工具相关
	7.1 ——— 获取浏览器ip
	7.2 ——— 获取手机登录验证码

># `功能说明`

### 1.app自动更新功能


# 正文-----------------------------------------

# angular 部分
---
>### 1.事件

##### 1.1 打开loading。
    事件名称：closeLoading
    功能：打开loading动画
    模板调用：<div loading></div> （默认显示loading）
    事件代码：$rootScope.$broadcast(‘openLoading');
 
##### 1.2 关闭loading。
    事件名称：closeLoading
    功能：关闭loading动画
    模板调用：<div loading></div>
    事件代码：$rootScope.$broadcast(‘closeLoading');
 
##### 1.3 更新body全局模型dom 
    事件名称：changeBody
    功能：打开loading 更新top,tab 赋值{{url}}变量以供 模板判断
    事件代码：$rootScope.$broadcast(‘changeBody’);


---

>###    2.ui组件

####    2.1  顶部tab 导航 directive
    模板调用：<div tab></div>
    说明：默认2个 tab按钮，可分 3 4 ，
    在 全局 localData.factory 里面 判断网址来配置 ，
    现在 tab 是放在 了 top directive里面，
    css hack了 appBody 的 高度
---
>### 3.公共方法

#### 3.1  判断手机 与 web 显示 不同 alert
    注入名称：tools 
    使用方法：tools.alert(msg);
    功能：判断手机 与 web 显示 不同 alert，app目前是 调用原生toast


#### 3.2post Url

    注入名称：tools
    使用方法：tools.postJsp(url,data).then(callBackOkFun,callBackErrFun,isNoLoading)
    功能：post请求url
    传参：url —— post的 网址
	data ：js对象 格式：{a：1，b：2}
	callBackOkFun:  function callBackOkFun(re) 成功的回调函数，直接回调返回值
	callBackErrFun: function callBackErrFun(err) 失败的回调，直接返回错误信息
	isNoLoading : (可选 true:不显示loading动画)
    异步编程用法：tools.postJsp(url1,data).then(tools.postJsp(url2,re1.data)).then(tools.postJsp(url3,re2.data)，callBackErrFun);
    异步编程说明：阻塞式post请求，re1是url1 的回调值，re2是 url2 的回调值，有一步有错误，直接 调用 callBackErrFun 方法


#### 3.3 判断手机,还是 wap 执行不同的回调函数
    注入名称：tools
    使用方法： tools.trueWeb( wap ,  app  )
    传参：wap:  function(){}    //wap端执行 的 回调函数
	     app:  function(){}    //app端执行 的 回调函数


#### 3.4  错误alert 提示框
    注入名称：tools
    使用方法：tools.alert( {title:’title’，content: ‘content’} )
    传参：obj {title：str   ，content ：str}
---
>### 4.本地数据localStorage

#### 4.3  是否第一次更新下载Js  isFirstJs (null,1,2)

    说明：默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2

#### 4.4  是否第一次更新下载css  isFirstCss (null,1,2)

    说明：是否第一次下载css, 默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2

#### 4.5  判断是否升级变量

    说明：毫秒 (0:自动升级，1.提示升级，2.永不升级)


# nodeApi部分
---
>### 6.soso 接口

####    6.1  判断手机 与 web 显示 不同 alert
    url：	http://dipan.so:3082/soso/sosoApi/gpsToStr?lat=39.604509&lng=116.94351
    传参方式：get
    返回值：json 字符串 需要 解析

    {
        "status": 0,
        "message": "query ok",
        "request_id": "6171586809433171422",
        "result": {
            "location": {
                "lat": 39.605563,
                "lng": 116.949482
            },
            "address": "天津市武清区",
            "formatted_addresses": {
                "recommend": "武清区河西务镇",
                "rough": "武清区河西务镇"
            },
            "address_component": {
                "nation": "中国",
                "province": "天津市",
                "city": "天津市",
                "district": "武清区",
                "street": "",
                "street_number": ""
            },
            "ad_info": {
                "adcode": "120114",
                "name": "中国,天津市,天津市,武清区",
                "location": {
                    "lat": 39.6056,
                    "lng": 116.949
                },
                "nation": "中国",
                "province": "天津市",
                "city": "天津市",
                "district": "武清区"
            },
            "address_reference": {
                "village": {
                    "title": "唐庄",
                    "location": {
                        "lat": 39.6055,
                        "lng": 116.95
                    },
                    "_distance": 22.1,
                    "_dir_desc": ""
                },
                "town": {
                    "title": "河西务镇",
                    "location": {
                        "lat": 39.6056,
                        "lng": 116.949
                    },
                    "_distance": 0,
                    "_dir_desc": "内"
                }
            }
        }


#   phpApi部分

---
>### 7.phpApi

#### 7.1  获取客户端ip

    url：	http://dipan.so:8080/Api/Jsonp/getIP/from/web
    传参方式：get
    参数： from ：web
    返回值：json 字符串 需要 解析
    返回代码： {ip: “127.0.0.1”}



>### 7.2  获取手机登录验证码

    url:   http://dipan.so:8080/Api/Sem/getCode

    传参方式 get

    参数： roundCodeId : 随机生成的8位数字
          mtNum: 手机号码

    demo：http://dipan.so:8080/Api/Sem/getCode/roundCodeId/12415369/mtNum/15510986492


# 功能说明
---
>### 1.app自动更新功能

    全部app只需更新 app.js (全部模板与js合并压缩文件)    app.css（样式压缩文件）；
    第一次启动，会默认调用新下载的app 的原始路径的 2个文件（市场的最新版本）
    再次启动，会延时n秒（不影响原生体验），去判断版本更新，并下载到应用本地，
    再次启动，会直接 调用 本地 新下载的版本文件。

    自动更新设置 选项功能。

    1自动更新（success），2提示手动更新（todo），3不更新（todo）
