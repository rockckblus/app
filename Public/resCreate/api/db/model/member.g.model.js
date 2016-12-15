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
    name: {type: String, default: ''},//用户名
    mt: Number,//手机
    headerImg: {type: String, default: ''},//头像url
    city: {type: String, default: '未知'},//城市
    cityCode: {type: Number, default: '777'},//城市编号
    areaGps: {type: Object, default: {}},//用户的定位信息,表单发布的时候更新
    age: {type: String, default: '未知'},//年龄字符串
    sex: {type: String, default: '未知'},//性别
    isUser: {type: Boolean, default: false},//是否有会员资料
    telType: {type: String, default: 'yunXun'},//是否允许电话咨询 yunXun jinZhi
    regTime: {type: Date, default: ''},//注册时间
    state: {type: Number, default: 1},//状态 0(禁用) 1激活
    type: {type: Number, default: 0},//级别 会员 0普通 1vip
    hot: {type: Number, default: 0},//人气 按成交量自增
    live: {type: Number, default: 0},//活跃度 1-7 按最近一周的登录次数,每天登录计算统计

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


