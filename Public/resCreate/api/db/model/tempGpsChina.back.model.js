/**
 * 临时gps全国范围表model,已筛选
 * _id;
 * gps {lat,lng}
 * 16/3/7 */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * tempGpsChina结构
 * 16/3/7 */
var tempGpsSchema = new g.Schema({
    gps: {lat: Number, lng: Number},
    pois: []
});


/**
 * Model
 * 16/3/7 */
var tempGpsModel = g.mongoose.model('tempgpsChina', tempGpsSchema, 'tempgpsChina');

module.exports = tempGpsModel;


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