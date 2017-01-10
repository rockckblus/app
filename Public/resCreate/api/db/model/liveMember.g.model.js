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
    addTime: {type: Date, default: Date.now},//添加时间 超时1小时删除
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


