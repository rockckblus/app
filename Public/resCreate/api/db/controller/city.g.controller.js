/**
 * city 城市表 contrller 全局
 */

/**
 * 城市模型
 * 16/3/7 */
var cityModel = require('../model/city.g.model');
var g = require('../../g.config');

var fun = {

    /**
     * 查询全部 1级城市
     * 传callBack
     * 16/3/7 */
    getAllOneCity: getAllOneCity,

    /**
     * 查询2级城市 对应 1级
     * 传 级城市id,callBack
     * 16/3/8 */
    getTwoCityFromOneId: getTwoCityFromOneId
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 查询全部 1级城市 ,按字母排序
 * 16/3/7 */
function getAllOneCity(post, callBack) {
    cityModel.find()
        .where('pid').equals('0')
        .select('name')
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);//输出错误信息
            }
            callBack(err, doc);
        });
}

/**
 * 查询2级城市 对应 1级
 * 16/3/8 */
function getTwoCityFromOneId(oneId, callBack) {
    cityModel.find()
        .where('pid').equals(oneId)
        .select('name')
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);
            }
            callBack(err, doc);
        });
}


module.exports = fun;





