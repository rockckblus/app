目录(api部分)
# **nodeJs Api**
1. [soso接口](#n1)
    - 1.0  [gps转换地址](#n1_0)
2. [用户相关](#n2)
    - 1.0  [获取用户数据](#n2_0)
    
# **php Api**
1. [用户登录相关](#p1)
    - 1.0  [获取客户端ip](#p1_0)
    - 1.1  [获取手机登录验证码](#p1_1)
    - 1.2  [用户登录提交](#p1_2)


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

# **nodeJs Api**

<h2 id="n1">**1. soso接口**</h6>



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<h3 id="n1_0">1.0 gps转换地址</h6>
> + url : ```http://localhost:3082/soso/sosoApi/gpsToStr```
+ 请求方式: ```get```

>|功能|@return||实现状态|  
|:---:|:---:|:-----:|:-----:|
|请求soso接口Gps转换地址|{String}json对象字符串||实现|

>|传参|类型|必传|说明|  
|:---:|:---:|:-----:|:-----:|
|lat|{String}|是|gps 经度度坐标|
|lng|{String}|是|gps 纬度度坐标|

> + demo:```http://localhost:3082/soso/sosoApi/gpsToStr?lat=39.604509&lng=116.94351```
+ 返回:需解析
>
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



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;




<h2 id="n2">2. 用户相关</h6>




&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


<h3 id="n2_0">2.0 获取用户数据 </h6>

> + url : ```http://localhost:3082/member/getUserData```
+ 请求方式: ```post```

>|功能|@return 成功|@return 失败|实现状态|  
|:---:|:---:|:-----:|:-----:|
|用户登录|{code:'S',msg:'获取用户数据成功'}|{code:'F',msg:'获取用户数据失败'}|模拟|

>|传参|类型|必传|说明|  
|:---:|:---:|:-----:|:-----:|
|uid|{*} |true|用户id|

> + 成功返回:
>
>
    {
      "complete": false,
      "data": {
        "code": "S",
        "msg": "获取用户数据成功",
        "userData": {
          "uid": "ksdfkkkkkasfasdf",
          "mt": "15510986492",//手机
          "headerImg": "data:image/gif;base64,R0lGODlhDAAMAKIAALGXVv////7+/dPGn+zm1bqjadHDm/r49CH5BAAAAAAALAAAAAAMAAwAQAM1GCFkVYYIRYC9uFm1gzXC0HHAIBQYaRXBIQLkcCguZslBBXu7RaApHgCSsoFevdtk0XhElgkAOw==",
          "fensi": 135,//粉丝
          "guanzhu": 335,//关注
          "lianxi": 35//联系count
        }
      }
    }
> + 失败返回:
>
>
    {
     code:'F',
     msg:'获取用户数据失败'
    }




    



# **php Api**

<h2 id="p1">1. 工具接口</h6>



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;




<h3 id="p1_0">1.0 获取客户端ip</h6>

> + url : ```http://localhost:8080/Api/Jsonp/getIP/from/web```
+ 请求方式: ```get```

>|功能|@return||实现状态|  
|:---:|:---:|:-----:|:-----:|
|获取客户端ip|{json} {ip: “127.0.0.1”}||实现|

>|传参|类型|必传|说明|  
|:---:|:---:|:-----:|:-----:|
|from|{String} web|true|后台判断是web穿过来的|

> + demo : ```http://localhost:8080/Api/Jsonp/getIP/from/web //{ip:'127.0.0.1'}```


<h3 id="p1_1">1.1 获取手机登录验证码 </h6>

> + url : ```http://localhost:8080/Api/Sem/getCode```
+ 请求方式: ```get```

>|功能|@return||实现状态|  
|:---:|:---:|:-----:|:-----:|
|获取客户端ip|{json} {ip: “127.0.0.1”}||实现|

>|传参|类型|必传|说明|  
|:---:|:---:|:-----:|:-----:|
|roundCodeId|{*} |true|随机生成的8位数字|
|mtNum|{*} |true|手机号码|

> + demo：```http://localhost:8080/Api/Sem/getCode/roundCodeId/12415369/mtNum/15510986492```



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;






<h3 id="p1_2">1.2 用户登录提交 </h6>

> + url : ```http://localhost:8080/Api/loginIn```
+ 请求方式: ```post```

>|功能|@return 成功|@return 失败|实现状态|  
|:---:|:---:|:-----:|:-----:|
|用户登录|{code:'S',msg:'登录成功'}|{code:'F',msg:'登录失败'}|模拟|

>|传参|类型|必传|说明|  
|:---:|:---:|:-----:|:-----:|
|code|{*} |true|随机生成的8位数字|
|mtNum|{*} |true|手机号码|

> + 成功返回:
>
>
    {
      "complete": false,
      "data": {
        "code": "S",
        "msg": "登录成功",
        "userData": {
          "uid": "ksdfkkkkkasfasdf",
          "mt": "15510986492",
          "headerImg": "data:image/gif;base64,R0lGODlhDAAMAKIAALGXVv////7+/dPGn+zm1bqjadHDm/r49CH5BAAAAAAALAAAAAAMAAwAQAM1GCFkVYYIRYC9uFm1gzXC0HHAIBQYaRXBIQLkcCguZslBBXu7RaApHgCSsoFevdtk0XhElgkAOw==",
          "fensi": 135,
          "guanzhu": 335,
          "lianxi": 35
        }
      }
    }
> + 失败返回:
>
>
    {
     code:'F',
     msg:'登录失败'
    }
    

