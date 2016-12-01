/**
 * member member表全局model,
 * _id;
 * name String 名称
 * mt Number 手机
 * headerImg String 头像
 * city String 城市
 * gps String 登录时候获取到的gps地址
 * sex  String 男 女
 * age String 年龄
 * isUser Boolean 是否有会员资料
 * telType Boolean 是否允许电话咨询
 * regTime Date 注册日期
 * state Number 状态 0(禁用) 1激活
 * type  Number 会员 0 1会员
 *
 * ________
 *
 * 索引：
 *
 *  */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * city结构
 * 16/3/7 */
var memberSchema = new g.Schema({
    name: String,//用户名
    mt: Number,//手机
    headerImg: Number,//头像url
    city: {type: String, default: '未知'},//城市
    gps: String,//用户的定位信息
    age: {type: String, default: '未知'},//年龄字符串
    isUser: {type: Boolean, default: false},//是否有会员资料
    telType: {type: Boolean, default: true},//是否允许电话咨询
    regTime: {type: Date, default: Date.now},//注册时间
    state: {type: Number, default: 1},//状态 0(禁用) 1激活
    type: {type: Number, default: 0},//级别 会员 0普通 1vip
});


/**
 *memberModel
 * 16/3/7 */
var memberModel = g.mongoose.model('member', memberSchema, 'member');

module.exports = memberModel;


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


