/**
 * gpsChina表 contrller 全局
 */

/**
 * gpsChina模型
 * 16/3/7 */
var gpsChinaModel = require('../model/gpsChina.back.model');
var g = require('../../g.config');

var fun = {
    addOne: addOne,//添加一条
    eachAdd: eachAdd,//循环添加
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 添加一条gps
 * @parem {lat:Number,lng:Number}
 * */
function addOne(obj) {
    _add(obj);

    /**
     * 添加一条新记录
     * 16/3/14 */
    function _add(obj) {
        gpsChinaModel.create({
            gps: {
                lat: obj.lat,
                lng: obj.lng
            }
        });
    }
}

/** 循环添加  */
function eachAdd() {
    var latGoldMin = 20.00;//全国最下面 x  ,小于 53
    var lngGoldMin = 73.00;//全国最下面 y , 小于135

    while (latGoldMin < 53) {
        latGoldMin = latGoldMin + 0.01;
        console.log('latGoldMin', latGoldMin);
    }


}


module.exports = fun;