/**
 * lianXiangKey 热门技能搜索 推荐的 默认key,
 *
 *  */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * city结构
 * 16/3/7 */
var keySchema = new g.Schema({
    title: {type: String},
    hot: {type: Number, default: 0},//被搜索的热度
    state: {type: Number, default: 1},//状态 1正常 0 删除
});

/**
 *lianXiangModel
 * 16/3/7 */
var lianXiangModel = g.mongoose.model('lianXianKey', keySchema, 'lianXianKey');

module.exports = lianXiangModel;


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


