/**
 * token model,
 *
 * _id; ObjectId
 * mt Number 手机;
 * token String 状态 1显示 2删除
 * uid String 用户id
 * 索引 mt token uid:
 *  */


/**
 * 全局 token model
 * 16/3/7 */
var g = require('../../g.config');

/**
 * article结构
 * 16/3/7 */
var tokenSchema = new g.Schema({
    mt: Number,//手机
    token: String,//手机
    uid: String,//用户id
});


/**
 * articleModel
 * 16/3/7 */
var tokenModel = g.mongoose.model('token', tokenSchema, 'token');

module.exports = tokenModel;


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


