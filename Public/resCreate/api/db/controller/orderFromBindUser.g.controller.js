/**
 * orderFromBindUser 订单用户对应关系 contrller
 */

var orderFromBindUserFun = require('../fun/orderFromBindUser.g.fun');
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    addOneBindUser: orderFromBindUserFun.addOneBindUserFun,//添加一条对应关系
};

/**
 * -------------------------具体方法-----------------
 *  */


module.exports = fun;





