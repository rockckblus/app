/**
 * need_from sns 需求表model,
 *
 // uid    String    true    用户id
 // title    String    true    需求标题
 // content    String    false    需求介绍
 // price    String    false    价格，为空视为‘面议’
 // priceUnit    String    true    价格单位(‘0’:1小时,’1’:’1次’,’2’:’1单’,’3’:’面议’)
 // endTime    Date true    有效期(‘0’:3天,’1’:’1周’,’2’:’1个月’)
 // state: {type: Number, default: 1},//状态 1.正常 0.删除
 // needRoundId    String    true    需求自动生成的表单id，仿制重复提交
 // cityBuXian    布尔    true    城市输入如果选不限，就忽略city字段
 // city    String    false    城市名称(默认未知)
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
var needFromSchema = new g.Schema({
    uid: {type: String},//用户id
    needRoundId: {type: String, default: ''},//仿制重复提交的id
    title: String,//标题
    state: {type: Number, default: 1},//状态 1.正常 0.删除
    endTime: {type: Date, default: ''},//有效期
    sendTime: {type: Date, default: Date.now},//发布时间
    editTime: {type: Date, default: Date.now},//修改时间 (无修改时间的时候与发布时间相同)
    content: {type: String, default: ''},//内容 介绍
    city: {type: String, default: '未知'},//城市
    cityBuXian: {type: Boolean, defalut: true},//城市输入如果选不限，就忽略city字段
    attr: {//属性对象
        type: Object,
        default: {
            price: {type: String, default: '面议'},//价格
            priceUnit: {type: String, default: '面议'},//价格单位
        }
    },
});


/**
 * articleModel
 * 16/3/7 */
var needFromModel = g.mongoose.model('sns.needFrom', needFromSchema, 'sns.needFrom');

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


