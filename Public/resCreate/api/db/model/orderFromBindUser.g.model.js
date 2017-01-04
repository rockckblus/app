/**
 * 订单的用户 关联 表 ,
 * bindUidType:失效订单逻辑: 如果被选单状态,就对当前用户关系不动了,就是3,如果选单其他抢单用户了,或者没选单失效了,这个订单对应关系就为4失效
 * 如果是 被动接单的人 接单了, 直接状态2(被动接单,转换为被选单)
 *  */


var g = require('../../g.config');

/**
 * 订单的用户关联表
 * 16/3/7 */
var orderFromBindUserSchema = new g.Schema({
    orderId: {type: g.Schema.Types.ObjectId},//订单id
    orderUid: {type: g.Schema.Types.ObjectId},//发订单的用户id
    bindUid: {type: g.Schema.Types.ObjectId},//抢订单的用户id
    bindUidType: {type: Number, default: 1},//抢订单的用户，对应订单 的 关系 1 主动接单(点击接单) ，2 。被动接单(点击下单) 3.被选单 4.超时失效订单 5.选其他人了
    jiNengId: {type: g.Schema.Types.ObjectId},//如果是被动接单,就记录被下单的技能id,作为以后判断用
    bindUidIsReadMark: {type: Boolean, default: false},//如果是被动接单,就默认给技能方未读标记,如果从会员中心点击读过订单了,就 标记为已读
    state: {type: Number, default: 1},//是否对应这个用户显示这条记录, 1正常,0删除 ,只有被选单,和失效订单 才能删除
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


