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
        url: 'mongodb://127.0.0.1:27017/',//分片路由
        master: 'dipan',//主库
    },


    system: {
        /**
         * 定时销毁session,时间设置
         * 16/3/17 */
        sessionTime: 3600 * 24 //1天超时 需要在session表中设置 超时时间,自动删除,此处只是记录超时时间

    },
    host: {
        phpApi: 'http://127.0.0.1:80',//phpApi
    },


    /**
     * 错误信息输出
     * 16/3/8 */
    alert: alert
};

(function () {
    /**
     * 连接mongo
     * 16/3/7 */

    var mongoUrl = g.mongo.url + g.mongo.master;
    console.log('mongoUrl', mongoUrl);
    mongoose.connect(mongoUrl, function (err) {
        if (err) {
            console.log('err', err);
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
    _err(err);

    /**
     * --------------------------------alert 具体方法---------------
     * 16/3/7 */

    /**
     * 错误信息提示，todo，记录到错误日志
     * 16/3/7 */
    function _err(err) {
        if (err) {
            if (err.constructor == Object) {
                console.error('errJson', JSON.stringify(err));
            }
            if (err.constructor == String) {
                console.error('errString', err);
            }
        } else {
            console.error('错误类型未比较成功 错误为空');
        }
    }
}

module.exports = g;
