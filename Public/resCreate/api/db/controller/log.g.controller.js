/**
 * log表 contrller 全局
 */

/**
 * session模型
 * 16/3/7 */
var logModel = require('../model/log.g.model');
var g = require('../../g.config');

var fun = {
    saveLog: saveLog,//添加一条log
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * saveLog 一条
 * @param {obj} {type:'error(todo自定)',level:{Number},content:{obj}}
 * 16/3/7 */
function saveLog(obj) {

    _add(obj);

    /**
     * 添加一条新记录
     * 16/3/14 */
    function _add(obj) {
        logModel.create({
            type: obj.type,
            level: obj.level,
            content: obj.content
        });
    }

}

module.exports = fun;





