/**
 * 周边地区pois表全局model,
 * _id;
 * name String 名称;
 * type Number 级别 4 天津, 1 武清, 2,河西务 3,大王古 4,3级地区 周边表;
 * pid objectId 父Id(3级地区);
 * gps obj {lat,lng}
 *
 * ________
 *
 * 索引： {pid:NumberLong(1),name:'pid'},{name:NumberLong(1),name:'poisName'},
 *
 * 16/3/7 */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * city结构
 * 16/3/7 */
var poisSchema = new g.Schema({
    name: {type: String},//名称
    type: {type: Number, default: 4},//级别 4
    pid: {type: g.Schema.ObjectId},//父Id ,3级地区;
    gps: {
        lat: Number,
        lng: Number
    }
});


/**
 * cityModel
 * 16/3/7 */
var poisModel = g.mongoose.model('pois', poisSchema, 'pois');

module.exports = poisModel;


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


