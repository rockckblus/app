/**
 * soso 百度 等 外部 api 请求 api
 */

var express = require('express');
var router = express.Router();
var all = require('./default');//公共路由all方法

/**
 * curl
 * 16/3/21 */
var curlCtrl = require('../db/controller/curl.back.controller');

router.get('/sosoApi/:fun', function (req, res) {
    sosoApi(req, res);
});

/**
 * function 详情 ****************************************************
 * 16/3/8 */

//var url = "http://apis.map.qq.com/ws/geocoder/v1/?location=" + gpsObj.lat + "," + gpsObj.lng + "&coord_type=3&key=" + config.ak.sosoAk;
/*************************
 * configObj
 * 16/7/30 上午10:13 ByRockBlus
 *************************/
var api = {
    url: {
        sosoKey: [
            'WGKBZ-YIYRU-3IOVL-B6A3J-HYANJ-BWFUC'
        ],
        gpsToStr: 'apis.map.qq.com/ws/geocoder/v1/?location='
    }
};


/**
 * soso api get 相关方法
 * 16/3/8 */

function sosoApi(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        case 'gpsToStr' ://get sosoApi gps 转地址
            /*************************
             * @请求的 url 传入 lat,lng http://dipan.so:3082/soso/sosoApi/gpsToStr?lat=39.604509&lng=116.943519
             * 16/7/30 上午11:37 ByRockBlus
             *************************/
            _gpsToStr();//soso 接口 gps原生格式,转换 地理位置
            break;
    }

    /**
     * gps 转 地址
     * @return valObj
     * 16/3/22 */
    function _gpsToStr() {
        var lat = req.query.lat;
        var lng = req.query.lng;
        if(lat && lng){
            var sosoApiUrl = api.url.gpsToStr + lat + ',' + lng + '&coord_type=1&key=' + api.url.sosoKey[0];
            curlCtrl.get(sosoApiUrl, function (doc) {
                res.json(doc);
            });
        }else{
            res.json('经纬度为空');
        }
    }
}

module.exports = router;




