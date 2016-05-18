/**
 * 临时统计表model,
 * _id;
 * name String 功能,需要临时记录的功能(所有3级,的处理完成的 临时统计 记录)
 * value Number 临时值
 * 16/3/7 */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * city结构
 * 16/3/7 */
var typeCountSchema = new g.Schema({
    name: {type: String},//功能名称
    value: {type: Number}
});


/**
 * cityModel
 * 16/3/7 */
var tempCountModel = g.mongoose.model('tempcontent', typeCountSchema, 'tempcontent');

module.exports = tempCountModel;


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