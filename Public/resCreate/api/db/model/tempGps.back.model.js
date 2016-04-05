/**
 * 临时gps全国范围表model,
 * _id;
 * gps {lat,lng}
 * 16/3/7 */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * tempGps结构
 * 16/3/7 */
var tempGpsSchema = new g.Schema({
    gps: {lat: Number, lng: Number}
});


/**
 * cityModel
 * 16/3/7 */
var tempGpsModel = g.mongoose.model('tempgps', tempGpsSchema, 'tempgps');

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