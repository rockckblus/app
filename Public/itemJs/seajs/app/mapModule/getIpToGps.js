define(function (require) {
    var creatMap = require('./creatMap');//创建一个soso地图
    var lister = require('./lister');//请求soso监听

    var fun = function () {
        console.log('funn');
    }

    //根据来访ip new sosomap newsosomap 初始对象
    var startSosoMap = {
        callbacks: {
            //若服务请求成功，则运行以下函数，并将结果传入
            complete: function (results) {
                try {
                    var lat = results.detail.latLng.lat;
                    var lng = results.detail.latLng.lng;
                    var oMap = creatMap.init(lat, lng);//建立城市坐标地图
                    window.mapLister = lister.mapAddLister(oMap, fun);//返回一个监听对象，传入方法
                }
                catch (e) {
//                    console.log(e);
                }
            },
            //若服务请求失败，则运行以下函数
            error: function () {
                var oMap = creatMap.init('59.911267', '116.396138');//创建地图
                window.mapLister = lister.mapAddLister(oMap, fun);
            }
        },
        getLatLng: function (ip, fun) {

            var ipLang = new qq.maps.CityService(this.callbacks);
            // 根据IP找中心点
            ipLang.searchCityByIP(ip);
            fun(ipLang);
        }
    }
    return {
        setMap: startSosoMap
    }


})


