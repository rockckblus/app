/**
 * versionModel
 *  */


var g = require('../../g.config');

/**
 * article结构
 * 16/3/7 */
var versionSchema = new g.Schema({
    version: {type: String, default: '1.0'}
});


/**
 * version  model
 * 16/3/7 */
var versionMedel = g.mongoose.model('version', versionSchema, 'version');

module.exports = versionMedel;


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


