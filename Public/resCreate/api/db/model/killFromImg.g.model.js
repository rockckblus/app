/**
 *  killFromImg 表model,
 *  imgUrl    String    true    图片的 相对 url
 killRoundId    String    true    随机生成的技能添加id(killRoundId_12345678)
 uid    String    true    用户id
 voId    String    true    技能的3张上传图片的对应id（upImgClick1）
 state Number 1正常 2禁用
 *  */


/**
 * 全局 技能图片表 model
 * 16/3/7 */
var g = require('../../g.config');

/**
 * 技能图片结构
 * 16/3/7 */
var killFromImgSchema = new g.Schema({
    uid: {type: String},//用户id
    imgUrl: {type: String},
    killRoundId: {type: String, default: ''},//对应技能表单提交的id
    voId: {type: Number, default: 0},//3张图片的 排序
    state: {type: Number, default: 1},//状态 1.正常 2.禁用
});


/**
 * articleModel
 * 16/3/7 */
var needFromModel = g.mongoose.model('sns.killFrom.img', killFromImgSchema, 'sns.killFrom.img');

module.exports = needFromModel;


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


