/**
 * category_service 生活服务频道表 contrller 全局
 */

/**
 * 城市模型
 * 16/3/7 */
var categoryServiceModel = require('../model/category_service.g.model');
var g = require('../../g.config');

var fun = {

    /**
     * 查询全部 1,2 级  搬家 小面搬家
     * 传callBack
     * 16/3/7 */
    selectAllOneTwo: selectAllOneTwo,

};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 查询全部 1级城市 ,按字母排序
 * 16/3/7 */
function selectAllOneTwo(post, callBack) {
    categoryServiceModel.find()
        .where('type').lt(3)
        .sort({'sort': 1})
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);//输出错误信息
            }
            callBack(err, doc);
        });
}

module.exports = fun;





