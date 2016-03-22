/**
 * tempCount表 contrller 全局
 */

/**
 * session模型
 * 16/3/7 */
var tempCountModel = require('../model/tempCount.back.model');
var g = require('../../g.config');

var fun = {
    add: add,//添加一条功能统计
    upData: upData//修改一条功能统计
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 添加 一条
 * @param {obj} {name:功能,value:Number}
 * 16/3/7 */
function add(obj) {
    _add(obj);
    /**
     * 添加一条新记录
     * 16/3/14 */
    function _add(obj) {
        tempCountModel.create({
            name: obj.name,
            value: obj.value
        });
    }
}

/**
 * upData 修改 一条
 * @param {obj} {name:功能,value:Number}
 * 16/3/7 */
function upData(obj, callBack) {
    _up(obj, callBack);
    /**
     * 修改一条记录
     * 16/3/14 */
    function _up(obj, callBack) {
        var condition = {'name': obj.name};
        var up = {$set: {'value': obj.value}};
        tempCountModel.update(condition, up, errFunCallBack);
        function errFunCallBack(err) {
            callBack(err);
            g.alert(err);
        }
    }
}

module.exports = fun;