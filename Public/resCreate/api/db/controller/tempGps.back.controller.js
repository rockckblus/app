/**
 * tempGps表 contrller 全局
 */

/**
 * gpsModel
 * 16/3/7 */
var tempGpsModel = require('../model/tempGps.back.model');
var g = require('../../g.config');

var fun = {
    add: add,//添加一条功能统计
    select: select//select 10条，传入skip(Number)
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 添加 一条
 * @param {obj} {lat:Number,lng:Number}
 * 16/3/7 */

function add(obj) {
    _add(obj);
    /**
     * 添加一条新记录
     * 16/3/14 */
    function _add(obj) {
        tempGpsModel.create({
            gps: obj
        }, function (err, small) {
            console.log('err', err);
            console.log('smaill', small);
        });
    }
}

/** select 10条  */
function select(startNum, callBack) {
    var skip = 0;
    if (!startNum) {
        skip = startNum;
    }
    tempGpsModel.find()
        .limit(10)
        .skip(skip)
        .exec(function (err, doc) {
            callBack(doc);
        });
}

module.exports = fun;