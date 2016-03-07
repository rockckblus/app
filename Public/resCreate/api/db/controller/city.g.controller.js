/**
 * city 城市表 contrller 全局
 */

/**
 * 城市模型
 * 16/3/7 */
var cityModel = require('../model/city.g.model');


var fun = {

    /**
     * 查询全部 1级城市
     * 传callBack
     * 16/3/7 */
    getAllOneCity: getAllOneCity,
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 查询全部 1级城市
 * 16/3/7 */
function getAllOneCity(callBack) {
    cityModel.findOne().
        exec(function (err, doc) {
            console.log('err',err);
            console.log('doc', doc);
            if (err) {
                g.alert.err(err);//输出错误信息
            }
            callBack(err, doc);
        });
}


module.exports = fun;





