/**
 * 路由通用方法
 */

var g = require('../g.config');


/**
 * router All post get
 * 16/3/8 */
function all(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'POST,GET');
    if (!g.mongoConnect) {//如果mongo连接失败,首次启动node的时候
        res.json('mongo数据库连接失败');
    } else {
        next();
    }
}
module.exports = all;

