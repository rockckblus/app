/**
 * category_service 生活服务表全局model,
 * _id;
 * name String 名称;
 * nav String 是否导航
 * pid String 父id
 * pinYin String 拼音
 *
 * ________
 *
 * 索引： {pid:NumberLong(1),name:'pid'},{name:NumberLong(1),name:'cityNameCn'},{cityNameCn:NumberLong(1),name:'type'},
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
    type: String,//级别 0 天津, 1 武清, 2,河西务 3,大王古;
    pinyin: String,//大写 英文 字头;
    pid: String//父Id;
});


/**
 * cityModel
 * 16/3/7 */
var cityModel = g.mongoose.model('city', citySchema, 'city');

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


