/**
 * pingJia 评价表model,
 *
 *  */


var g = require('../../g.config');

/**
 * 结构
 *  */
var pingJiaSchema = new g.Schema({
    orderId: {type: g.Schema.Types.ObjectId},
    uid: {type: g.Schema.Types.ObjectId},//用户id
    type: {type: Number},//用户类型 1需求方 2技能方
    content: String,//标题
    state: {type: Number, default: 1},//评价状态 1正常 2删除(管理员操作)
    sendTime: {type: Date, default: Date.now},//发布时间
});

var pingJiaModel = g.mongoose.model('pingJia', pingJiaSchema, 'pingJia');

module.exports = pingJiaModel;

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


