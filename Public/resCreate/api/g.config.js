/**
 * 全局config
 * return g{
 *  mongoConnect,//mongoDb连接状态,是否成功连接,(第一次node启动)
 *  mongoose,//mongoose 中间件
 *  Schema,//mongooseScheama
 *  mongo:{
 *          url ,//mongo连接的主机地址
 *          master,//主库
 *      }
 *  alert:{
 *         alert.err,//传入错误信息obj，或 string ,记录错误日志
 *      }
 * }
 */

/**
 * mongoose 中间件
 * 16/3/7 */
var mongoose = require('mongoose');

var g = {
    mongoConnect: true,//mongoDb连接状态,是否成功连接
    mongoose: mongoose,
    Schema: mongoose.Schema,
    /**
     * mongo 数据库连接配置
     * 16/3/7 */

    mongo: {
        url: 'mongodb://localhost/',
        master: 'dipan',//主库
    },

    /**
     * 错误信息输出
     * 16/3/8 */
    alert: alert.err
};

(function () {
    /**
     * 连接mongo
     * 16/3/7 */

    var mongoUrl = g.mongo.url + g.mongo.master;
    mongoose.connect(mongoUrl, function (err) {
        if (err) {
            g.mongoConnect = false;
        }
    });

})();

/**
 * 信息提示相关
 * 16/3/7 */
function alert(err) {

    /**
     * 错误信息提示，todo，记录到错误日志
     * 16/3/7 */
    this.err = _err(err);

    /**
     * --------------------------------alert 具体方法---------------
     * 16/3/7 */

    /**
     * 错误信息提示，todo，记录到错误日志
     * 16/3/7 */
    function _err(err) {
        if (err.constructor == Object) {
            console.error(JSON.stringify(err));
        }
        if (err.constructor == String) {
            console.error(err);
        }
    }
}


module.exports = g;
