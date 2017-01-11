/**
 * 用户有没有未读消息表,未读订单
 *  */

/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

var isReadByUidSchema = new g.Schema({
    uid: {type: g.Schema.Types.ObjectId},//用户id
    isHaveReadNews: {type: Boolean, default: false},//此用户是否有未读消息
    isHaveReadOrder: {type: Boolean, default: false},//此用户是否有未读订单消息
});

/**
 *isReadByUidModel
 * * */
var isReadByUidModel = g.mongoose.model('isReadByUid', isReadByUidSchema, 'isReadByUid');

module.exports = isReadByUidModel;


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


