/**
 * sns_article sns 技能表model,
 *
 * _id; ObjectId
 * title String 标题;
 * state Number 状态 1显示 2删除
 * sendTime Date 发布时间
 * editTime Date 修改时间
 * content 内容
 * attr Object 属性对象
 * uid ObjectId 用户id
 *
 * 索引:state
 *  */


/**
 * 全局 技能model
 * 16/3/7 */
var g = require('../../g.config');

/**
 * article结构
 * 16/3/7 */
var articleSchema = new g.Schema({
    killRoundId: {type: String, default: ''},//仿制重复提交的id
    title: String,//标题
    state: {type: Number, default: 1},//状态 1.正常 0.删除
    sendTime: {type: Date, default: Date.now},//发布时间
    editTime: {type: Date, default: Date.now},//修改时间 (无修改时间的时候与发布时间相同)
    content: {type: String, default: ''},//内容 键值对
    attr: {//属性对象
        type: Object,
        default: {
            price: {type: String, default: '面议'},//价格
            priceUnit: {type: String, default: '面议'},//价格单位
            service: {type: Number, default: 0},//服务方式 (‘0’:不限,’1’:’线上’,’2’:’线下’)
        }
    },
    uid: {type: g.Schema.Types.ObjectId},//用户id
    gpsArea: {type: Object, default: {}},//gps信息 {"gpsObj":{"lat":39.55237,"lng":116.814664},"city":{"city":"天津市","cityCode":"022"}}
    cityCode: {type: String, default: '777'},//城市编号
    gpsSearch: {type: Array, default: [0, 0]},//mongo 地理位置
    hot: {type: Number, default: 0},//人气 按成交量自增
    live: {type: Number, default: 0},//活跃度 1-7 按最近一周的登录次数,每天登录计算统计
    sex: {type: String, default: '未知'},//性别
    master: {type: Boolean, default: false},//主展示技能 默认无关键词搜索时候 展示出来的,有关键词搜索,会忽略此选项
    type: {type: String, default: 'kill'},//前端判断用
});


/**
 * articleModel
 * 16/3/7 */
var articleModel = g.mongoose.model('sns.article', articleSchema, 'sns.article');

module.exports = articleModel;


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


