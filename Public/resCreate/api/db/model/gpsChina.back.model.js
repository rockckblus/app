/**
 * 中国gps统计表model,
 * _id;
 * gps obj gps对象{lat,lng}
 * 53 最上 y
 * 135 最右 135 x
 * 20 最下 y
 * 73 最右
 * 比较lat ，lng
 * lat < 53 && lat >20 && lng < 135 && lng > 73
 * 16/3/7 */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * gps结构
 * 16/3/7 */
var gpsChinaSchema = new g.Schema({
    gps: {
        lat: Number,
        lng: Number
    }
});


/**
 * cityModel
 * 16/3/7 */
var gpsChinaModel = g.mongoose.model('gpschina', gpsChinaSchema, 'gpschina');

module.exports = gpsChinaModel;


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