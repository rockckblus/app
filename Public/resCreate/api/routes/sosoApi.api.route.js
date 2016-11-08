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
            'WGKBZ-YIYRU-3IOVL-B6A3J-HYANJ-BWFUC',
            '4RMBZ-AS2R5-6JQIN-QHTBT-NDU25-Y7FTD',
            'E63BZ-HJPRQ-L6Y5L-GA6Q5-XXWQV-T2BXQ',
            'I26BZ-CUUW5-25AIJ-QXZRI-A5N46-YSBEZ',
            'ZBMBZ-CFCA5-INFIM-QH7EC-XOW2K-WCBPU'
        ],
        gaodeKey: [
            '8bc8bb3d13cc9fdab255b1aeb5d1c533',
            '17b8b3d7ffc09d97a150d0ce0aa741ec'
        ],
        baiDuKey: [
            'Tn3pNaqSUtTr49oujSGfowDZ'
        ],
        gpsToStr: 'http://apis.map.qq.com/ws/geocoder/v1/?location=',//soso gpstostr url
        gaoDeIpToCity: 'http://restapi.amap.com/v3/ip?ip=',//gaoDe ip定位http://restapi.amap.com/v3/ip?ip=114.247.50.2&output=xml&key=<用户的key>
        strToGps: 'http://apis.map.qq.com/ws/geocoder/v1/?address=', //var url = "http://apis.map.qq.com/ws/geocoder/v1/?address=天津市和平区二号桥朝阳小区&key=KFSBZ-RR7H4-5IMUE-X7I67-R6EZS-PWBCK";
        strToGpsBaidu: 'http://api.map.baidu.com/geocoder/v2/?city=',//百度地址转gps
        strToGpsGaoDe: 'http://restapi.amap.com/v3/geocode/geo?address=',//高德地址转gps
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
        case 'ipToCity' ://get ip 定位
            /*************************
             * gaoDe ip定位http://restapi.amap.com/v3/ip?ip=114.247.50.2&output=xml&key=<用户的key>
             *************************/
            _ipToCity();
            break;
        case 'strToGps' ://字串传转 gps
            _strToGps();
            break;
    }

    /**
     * gps 转 地址
     * @return valObj
     * 16/3/22 */
    function _gpsToStr() {
        var lat = req.query.lat;
        var lng = req.query.lng;
        if (lat && lng) {
            var sosoApiUrl = api.url.gpsToStr + lat + ',' + lng + '&coord_type=1&key=' + _getRoundArr(api.url.sosoKey);
            curlCtrl.get(sosoApiUrl, function (doc) {
                res.json(doc);
            });
        } else {
            res.json('经纬度为空');
        }
    }

    /**
     * gaoDe ip定位http://restapi.amap.com/v3/ip?ip=114.247.50.2&output=xml&key=<用户的key>
     */
    function _ipToCity() {
        var ip = req.query.ip;
        if (ip) {
            var gaoDeApiUrl = api.url.gaoDeIpToCity + ip + '&key=' + _getRoundArr(api.url.gaodeKey);
            curlCtrl.get(gaoDeApiUrl, function (doc) {
                console.log(111111111);
                res.json(doc);
            });
        } else {
            res.json('ip为空');
        }
    }


    /**
     * 随机返回 数组中一个元素
     * 传数组
     */

    function _getRoundArr(arr) {
        var num = Math.floor(Math.random() * arr.length + 1) - 1;
        return arr[num];
    }


    /**
     * _strToGps 字符串转 gps
     */
    function _strToGps() {
        var str = req.query.str;
        if (str) {

            var sosoApiUrl = api.url.strToGpsGaoDe + str + '&output=JSON&key=' + _getRoundArr(api.url.gaodeKey);
            // sosoApiUrl = 'http://restapi.amap.com/v3/geocode/geo?address=%E5%A4%A9%E6%B4%A5%E5%B8%82&output=JSON&key=8bc8bb3d13cc9fdab255b1aeb5d1c533';
            curlCtrl.get(sosoApiUrl, function (doc) {
                res.json(doc);
            });
        } else {
            res.json('str为空');
        }
    }

}

module.exports = router;




