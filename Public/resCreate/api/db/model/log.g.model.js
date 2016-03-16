/**
 * log日志表全局model,
 * _id;
 * time:{type: Date, default: Date.now}
 * type:{String}//日志类型
 * level:Number//日志级别
 * content:{obj}//日志内容
 * ________
 *
 * 索引： {type:NumberLong(1),name:'logType'}
 * {time:NumberLong(1),name:'logTime'}
 * 16/3/7 */

/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * log表结构
 * 16/3/7 */
var logSchema = new g.Schema({
    type: Number,
    time: {type: Date, default: Date.now},
    content: Object
});

/**
 * logModel
 * 16/3/7 */
var logModel = g.mongoose.model('log', logSchema, 'log');

module.exports = logModel;

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * 16/3/7 */


