/**
 * category_service 生活服务表全局model,
 * _id;
 * name String 名称;
 * nav String 是否导航
 * pid String 父id
 * pinYin String 拼音
 * sort Number 排序
 * state Number 状态
 * type  Number 类型
 *
 * ________
 *
 * 索引：
 *
 * 16/3/7 */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * city结构
 * 16/3/7 */
var citySchema = new g.Schema({
    name: String,//名称
    nav: {type: Number, default: 1},//是否导航 0 1
    pinYin: String,//拼音
    sort: {type: Number, default: 1},//排序
    type: {type: Number, default: 1},//级别 1 级分类(家政服务) 2.搬家 3.小面搬家
    pinyin: String,//大写 英文 字头;
    pid: String//父Id objid,为0 是顶级分类;
});


/**
 * cityModel
 * 16/3/7 */
var cityModel = g.mongoose.model('category_service', citySchema, 'category_service');

module.exports = cityModel;


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


