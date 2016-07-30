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
        gpsToStr: 'http://apis.map.qq.com/ws/geocoder/v1/?location='//todo
    }
};


/**
 * soso api get 相关方法
 * 16/3/8 */

function sosoApi(req, res) {
    var fun = req.params.fun;
    console.log('req',req);
    switch (fun) {
        case 'getToStr' ://get sosoApi gps 转地址
            _getToStr();
            break;
    }

    /**
     * gps 转 地址
     * @return valObj
     * 16/3/22 */
    function _getToStr() {
        //res.json(doc);
    }
}

module.exports = router;




