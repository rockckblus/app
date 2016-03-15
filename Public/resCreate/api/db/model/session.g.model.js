/**
 * session表全局model,
 * _id;
 * sessionid String sessionId;
 * time:new Date()
 * ________
 *
 * 索引： {time:NumberLong(1),name:'sessionTime'}
 *
 * 16/3/7 */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * session结构
 * 16/3/7 */
var sessionSchema = new g.Schema({
    sessionId: String,
    time: {type: Date, default: Date.now},
    content: Object
});


/**
 * cityModel
 * 16/3/7 */
var sessionModel = g.mongoose.model('session', sessionSchema, 'session');

module.exports = sessionModel;


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


