/**
 * 全局config
 */

/**
 * mongoose 中间件
 * 16/3/7 */
var mongoose = require('mongoose');

var g = {
    mongoose: mongoose,
    Schema: mongoose.Schema,
    /**
     * mongo 数据库连接配置
     * 16/3/7 */

    mongo: {
        url: 'mongodb://localhost/',
        master: 'dipan',//主库
    },

    alert: alert.err

};

(function () {
    /**
     * 连接mongo
     * 16/3/7 */
    mongoose.connect(g.mongo.url + g.mongo.master);
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
