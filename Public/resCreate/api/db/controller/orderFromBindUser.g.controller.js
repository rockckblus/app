/**
 * orderFromBindUser 订单用户对应关系 contrller
 */

var orderFromBindUserFun = require('../fun/orderFromBindUser.g.fun');
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    addOneBindUser: orderFromBindUserFun.addOneBindUserFun,//添加一条对应关系
    trueIsHave: orderFromBindUserFun.trueIsHaveFun,//判断接单的重复id 订单id 订单uid 技能uid 是否存在,
    trueXianDanBindUser: orderFromBindUserFun.trueXianDanBindUserFun,//判断技能id是否被当前uid下单
    trueJieDanBindUser: orderFromBindUserFun.trueJieDanBindUserFun,//判断orderId是否被当前uid接单
};

/**
 * -------------------------具体方法-----------------
 *  */


module.exports = fun;





