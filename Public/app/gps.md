# 1.请求用户下属车辆
    请求URL：http://180.96.20.174:8000/gpsAPi/gpsapi.ashx?method=LoadUserVehicles&username=用户名&pwd=密码

### `返回数据：`
    {
        "Result": "1",
        "Uid": "715d12aa-ee0d-4451-8b1f-83a7e2a74f96",
        "Grade": 2,
        "Data": [
            {
                "VehNof": "苏AG7063",
                "SystemNo": "13012348398"
            },
            {
                "VehNof": "苏AG7072",
                "SystemNo": "13012342703"
            },
            {
                "VehNof": "苏AG7075",
                "SystemNo": "13012343162"
            },
            {
                "VehNof": "苏AG7091",
                "SystemNo": "13012349785"
            },
            {
                "VehNof": "苏AG7092",
                "SystemNo": "13012342775"
            },
            {
                "VehNof": "苏AG7171",
                "SystemNo": "13012350366"
            }
        ]
    }

    Uid:用户编号
    Grade：用户等级
    后面第3个方法会用到这两个参数

    vehnof:车牌号
    Systemno:GPS编号

# 2.获取单台车的位置
    http://180.96.20.174:8000/gpsAPi/gpsapi.ashx?method=LoadVehiclePostion&systemno=系统编号
######
    返回值
    {
    "SystemNo": "13012342703",
    "GpsTime": "2016/8/19 17:12:25",
    "Lon": 118.76663,
    "Lat": 31.90413,
    "Speed": 50,
    "Angle": 327,
    "Locate": 1
    }
    GPSTime：GPS时间
    Lon：经度，单位度
    Lat：纬度,单位度
    Speed：速度，单位km/h
    Angle：方向，正北是0度，正东是90度，正南是180度，正西是270度
    Locate：定位,0不定位，1定位

# 3.获取用户下所有车的位置
    http://180.96.20.174:8000/gpsAPi/gpsapi.ashx?method=LoadAllVehiclesPostion&uid=用户ID&grade=用户等级

####  用户ID和等级从“请求用户下属车辆”的返回值中取得

    {
    "Result": "1",
    "Data": [
        {
            "SystemNo": "13012344766",
            "GpsTime": "2016/8/19 17:16:13",
            "Lon": 118.78062,
            "Lat": 31.91292,
            "Speed": 11,
            "Angle": 81,
            "Locate": 1
        },
        {
            "SystemNo": "13012342703",
            "GpsTime": "2016/8/19 17:16:26",
            "Lon": 118.78123,
            "Lat": 31.91303,
            "Speed": 30,
            "Angle": 80,
            "Locate": 1
        },
        {
            "SystemNo": "13012342706",
            "GpsTime": "2016/8/19 17:16:25",
            "Lon": 118.77497,
            "Lat": 31.9122,
            "Speed": 8,
            "Angle": 78,
            "Locate": 1
        },
        {
            "SystemNo": "13012344364",
            "GpsTime": "2016/8/19 17:15:57",
            "Lon": 118.78007,
            "Lat": 31.91288,
            "Speed": 20,
            "Angle": 78,
            "Locate": 1
        },
        {
            "SystemNo": "13012344996",
            "GpsTime": "2016/8/19 17:16:15",
            "Lon": 118.77557,
            "Lat": 31.91228,
            "Speed": 0,
            "Angle": 0,
            "Locate": 1
        },
        {
            "SystemNo": "13012348398",
            "GpsTime": "2016/8/19 17:15:32",
            "Lon": 118.7699,
            "Lat": 31.90017,
            "Speed": 19,
            "Angle": 75,
            "Locate": 1
        },
        {
            "SystemNo": "13012342719",
            "GpsTime": "2016/8/19 17:16:09",
            "Lon": 118.751,
            "Lat": 31.91682,
            "Speed": 67,
            "Angle": 342,
            "Locate": 1
        },
        {
            "SystemNo": "13012342731",
            "GpsTime": "2016/8/19 17:16:24",
            "Lon": 118.7852,
            "Lat": 31.91397,
            "Speed": 10,
            "Angle": 70,
            "Locate": 1
        },
        {
            "SystemNo": "13012346185",
            "GpsTime": "2016/8/19 17:15:58",
            "Lon": 118.77318,
            "Lat": 31.9119,
            "Speed": 8,
            "Angle": 79,
            "Locate": 1
        },
        {
            "SystemNo": "13012342736",
            "GpsTime": "2016/8/19 17:16:12",
            "Lon": 118.78488,
            "Lat": 31.9139,
            "Speed": 11,
            "Angle": 74,
            "Locate": 1
        },
        {
            "SystemNo": "13012342737",
            "GpsTime": "2016/8/19 17:16:17",
            "Lon": 118.75537,
            "Lat": 31.90992,
            "Speed": 29,
            "Angle": 322,
            "Locate": 1
        },
        {
            "SystemNo": "13012342739",
            "GpsTime": "2016/8/19 17:15:57",
            "Lon": 118.78057,
            "Lat": 31.91292,
            "Speed": 32,
            "Angle": 79,
            "Locate": 1
        },
        {
            "SystemNo": "13012350366",
            "GpsTime": "2016/8/19 17:16:10",
            "Lon": 118.75103,
            "Lat": 31.91678,
            "Speed": 68,
            "Angle": 343,
            "Locate": 1
        },
        {
            "SystemNo": "13012342773",
            "GpsTime": "2016/8/19 17:16:09",
            "Lon": 118.78352,
            "Lat": 31.91353,
            "Speed": 44,
            "Angle": 73,
            "Locate": 1
        },
        {
            "SystemNo": "13012342774",
            "GpsTime": "2016/8/19 17:16:16",
            "Lon": 118.77123,
            "Lat": 31.90063,
            "Speed": 39,
            "Angle": 67,
            "Locate": 1
        },
        {
            "SystemNo": "13012342775",
            "GpsTime": "2016/8/19 17:16:04",
            "Lon": 118.75132,
            "Lat": 31.91612,
            "Speed": 68,
            "Angle": 342,
            "Locate": 1
        },
        {
            "SystemNo": "13012343162",
            "GpsTime": "2016/8/19 17:15:24",
            "Lon": 118.77892,
            "Lat": 31.91275,
            "Speed": 17,
            "Angle": 79,
            "Locate": 1
        },
        {
            "SystemNo": "13012349620",
            "GpsTime": "2016/8/19 17:16:20",
            "Lon": 118.78062,
            "Lat": 31.91297,
            "Speed": 15,
            "Angle": 83,
            "Locate": 1
        },
        {
            "SystemNo": "13012349718",
            "GpsTime": "2016/8/19 17:15:29",
            "Lon": 118.77882,
            "Lat": 31.91272,
            "Speed": 17,
            "Angle": 82,
            "Locate": 1
        },
        {
            "SystemNo": "13012349785",
            "GpsTime": "2016/8/19 17:15:50",
            "Lon": 118.78,
            "Lat": 31.91288,
            "Speed": 0,
            "Angle": 81,
            "Locate": 1
        },
        {
            "SystemNo": "13012349638",
            "GpsTime": "2016/8/19 17:15:43",
            "Lon": 118.7706,
            "Lat": 31.90053,
            "Speed": 33,
            "Angle": 54,
            "Locate": 1
        },
        {
            "SystemNo": "13012349645",
            "GpsTime": "2016/8/19 17:15:42",
            "Lon": 118.77932,
            "Lat": 31.91285,
            "Speed": 20,
            "Angle": 79,
            "Locate": 1
        }
    ]
    }

######
    Result:值为1，说明有结果，Data数据是车辆位置数据的集合
       值为0，说明有异常，Data为no data


# 4.获取节点（矩形围栏）信息
    http://180.96.20.174:8000/gpsAPi/gpsapi.ashx?method=LoadNodes&uid=用户ID&name=节点名称（填空查所有的节点，支持模糊查询）

##### 没有匹配的信息，返回空字符串

    {
    "Nodes": [
        {
            "Name": "节点名称",
            "LatS": 小纬度,
            "LatL": 大纬度,
            "LonS": 小经度,
            "LonL": 大经度
        },
        {
            "Name": "节点名称",
            "LatS": 小纬度,
            "LatL": 大纬度,
            "LonS": 小经度,
            "LonL": 大经度
        }
    ]
    }

