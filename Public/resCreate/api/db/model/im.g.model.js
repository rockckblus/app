/**
 * im model
 *  */

/**
 * 全局 技能model
 * 16/3/7 */
var g = require('../../g.config');

/**
 * liveMember结构
 * 16/3/7 */
var imSchema = new g.Schema({
    cid: {type: g.Schema.Types.ObjectId},//当前客户uid (postObjUid)
    gUserId: {type: g.Schema.Types.ObjectId},//联系人uid
    state: {type: Number, default: 1},//状态 1.正常显示, 2.对当前uid删除(如果有新历史消息的情况下,状态 再变为 正常)
    lastMessage: {type: String},//最后一句话的内容
    lastTime: {type: Date},//最后一句话的时间
    noReadCount: {type: Number, default: 0},//未读统计,点击已读之后 这个 count变为0
});

/**
 * Model
 * 16/3/7 */
var imModel = g.mongoose.model('im', imSchema, 'im');

module.exports = imModel;


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


