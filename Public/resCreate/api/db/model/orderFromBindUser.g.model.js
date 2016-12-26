/**
 * 订单的用户 关联 表 ,
 *  */


var g = require('../../g.config');

/**
 * 订单的用户关联表
 * 16/3/7 */
var orderFromBindUserSchema = new g.Schema({
    orderId: {type: g.Schema.Types.ObjectId},//订单id
    orderUid: {type: g.Schema.Types.ObjectId},//发订单的用户id
    bindUid: {type: g.Schema.Types.ObjectId},//抢订单的用户id
    bindUidType: {type: Number, default: 1},//抢订单的用户，对应订单 的 关系 1 主动接单(点击接单) ，2 。被动接单(点击下单) 3.被选单
    jiNengId: {type: g.Schema.Types.ObjectId},//如果是被动接单,就记录被下单的技能id,作为以后判断用
    selectOrderTime: {type: Date},//被选单时间
    clickJieOrderTime: {type: Date}, //点击接单时间
    clickDownOrderTime: {type: Date},//点击下单时间
});


/**
 * orderFromBindUserSchema
 * 16/3/7 */
var orderFromBindUserModel = g.mongoose.model('orderFrom.bindUser', orderFromBindUserSchema, 'orderFrom.bindUser');

module.exports = orderFromBindUserModel;


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


