/**
 * cityNew表全局model,
 * _id;
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
    city: String,//名称
    sheng: String,//省
    citycode: String,//区号
    location: String,//gps 字符串
});


/**
 * cityModel
 * 16/3/7 */
var cityModel = g.mongoose.model('cityNew', citySchema, 'cityNew');

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


