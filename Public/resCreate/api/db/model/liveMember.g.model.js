/**
 * liveMember model
 * 索引:state 超时1小时 删除 uid 唯一索引
 *  */


/**
 * 全局 技能model
 * 16/3/7 */
var g = require('../../g.config');

/**
 * liveMember结构
 * 16/3/7 */
var liveMemberSchema = new g.Schema({
    uid: {type: g.Schema.Types.ObjectId},//用户id

    //每次有心跳的时候都改变这个时间点
    addTime: {type: Date, default: Date.now},//添加时间 超时1小时删除
    /**
     * 是否有未读消息,默认是没有,
     * 如果访问接口 有未读消息,就改为 true, 如果没有就改为false
     * 轮询的时候如果 是true(有未读),就不去 接口拿未读消息,如果已读激活的话,就改为 false
     */
    isHaveRead: {type: Boolean, default: false},
});


/**
 * Model
 * 16/3/7 */
var liveMemberModel = g.mongoose.model('liveMember', liveMemberSchema, 'liveMember');

module.exports = liveMemberModel;


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


