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
     * 查询全部三级
     * 传 限制数
     * 16/3/22 */
    getThreeCityArea: getThreeCityArea,

    /**
     * 查询热门城市
     * 热门 北京 上海 广州 武汉 成都 深圳 杭州 西安 南京 郑州 长沙 温州 福州 沈阳
     * 16/3/18 */
    selectHotCity: selectHotCity,

    /**
     * 查询1级城市byId
     * 16/3/18 */
    getOneCityFromId: getOneCityFromId

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
        .select('name pid')
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);
            }
            callBack(err, doc);
        });
}

/**
 * 查询1级城市 对应 _id
 * 16/3/8 */
function getOneCityFromId(obj, callBack) {
    cityModel.findOne()
        .where('_id').equals(obj.id)
        .select('name')
        .exec(function (err, doc) {
            console.log('doc', doc);
            if (err) {
                g.alert.err(err);
            }
            callBack(doc, err);
        });
}


/**
 * 查询三级
 * @parem {obj} {limit:number,skip:number}
 * 16/3/22 */
function getThreeCityArea(numObj, callBack) {
    cityModel.find()
        .where('name').equals('')
        .where('type').equals('3')
        .limit(numObj.limit)
        .skip(numObj.skip)
        .populate('pid', 'name pid')
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);
            }
            callBack(doc);
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





