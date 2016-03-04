<?php

// 定义一个函数getIP()
function getIP()
{
    if (getenv("HTTP_CLIENT_IP"))
        $ip = getenv("HTTP_CLIENT_IP");
    else if (getenv("HTTP_X_FORWARDED_FOR"))
        $ip = getenv("HTTP_X_FORWARDED_FOR");
    else if (getenv("REMOTE_ADDR"))
        $ip = getenv("REMOTE_ADDR");
    else $ip = "Unknow";
    return $ip;
}

//
//// 使用方法：
//echo getIP();

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>物流邦</title>
    <style type="text/css">
        html {
            height: 100%;
            overflow: hidden;
        }

        body {
            height: 100%;
            overflow: hidden;
            margin: 0px;
            padding: 0px;
            font-size: 12px;
        }
        #container {
            height: 100%;
        }

    </style>
    <link rel="stylesheet" href="http://113.31.17.175:8080/publicIndex/stylesheets/sosoMap.css"/>
<script type="text/javascript" src="http://map.qq.com/api/js?v=2.exp" charset="utf-8"></script>
</head>
<body >
<input id="getIp" type="hidden" name="getIp" value="<?php echo getIP(); ?>"/>
<div id='iconMark' ng-controller="angularSoso">
    <div class="item1 clearThis">
        <div class="itemSubSubEnd"></div>

        <div class="itemSub1 allItemP" ng-click="clearCar('goods')"></div>
    </div>
    <div class="item2 clearThis">
        <div class="itemSubSubEnd"></div>

        <div class="itemSub2 allItemP" ng-click="clearCar('banShiChu')"></div>
    </div>
    <div class="item3 clearThis">
        <div class="itemSubSubEnd"></div>

        <div class="itemSub3 allItemP" ng-click="clearCar('fuWuZhan')"></div>
    </div>
    <div class="item4 clearThis">
        <div class="itemSubSubEnd"></div>

        <div class="itemSub4 allItemP" ng-click="clearCar('weiXiuZhan')"></div>
    </div>
    <div class="item5 clearThis">
        <div class="itemSubSub5" ></div>
        <div class="itemSub5 oneItemP" ng-click="restMap()"></div>
    </div>
</div>
<div id="container" ng-controller="angularSoso">

</div>

<script type="text/javascript" src="http://113.31.17.175:8080/publicIndex/javascripts/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="http://113.31.17.175:8080/publicIndex/javascripts/jquery.easing.min.js"></script>
<script type="text/javascript" src="./dist/sea.js"></script>

<script>
   seajs.use("../seajs/app/main.js",function(){
       angular.bootstrap(window.document, ["mySosoApp"]);
   });
</script>

</body>
</html>