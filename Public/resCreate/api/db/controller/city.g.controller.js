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
    getTwoCityFromOneId: getTwoCityFromOneId,

    /**
     * 查询热门城市
     * 热门 北京 上海 广州 武汉 成都 深圳 杭州 西安 南京 郑州 长沙 温州 福州 沈阳
     * 16/3/18 */
    selectHotCity: selectHotCity

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

/**
 * 查询热门城市
 * 16/3/18 */
function selectHotCity(callBack) {
    var hostArr = ['北京', '上海', '广州', '武汉', '成都', '深圳', '杭州', '西安', '南京', '郑州', '长沙', '温州', '福州', '沈阳'];

    cityModel.find()
        .where('name').in(hostArr)
        .where('type').equals('1')
        .select('name')
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);
            }
            callBack(err, doc);
        });
}

module.exports = fun;





