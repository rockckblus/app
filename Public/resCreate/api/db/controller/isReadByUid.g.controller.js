/**
 * isReadByUid ctrl
 */

var isReadFun = require('../fun/isReadByUid.g.fun');
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    addOneReadCtrl: isReadFun.addOneReadFun,//添加 或者更新 一条未读数据
    getReadStateCtrl: isReadFun.getReadStateFun,//获取有没有未读消息,或者未读订单
    updateOneReadNewsCtrl: isReadFun.updateOneReadNewsFun,//更新一条数据为 有未读消息 isHaveReadNews = true
    updateOneReadOrderCtrl: isReadFun.updateOneReadOrderFun,//更新一条数据为 有未读订单 isHaveReadOrder= true
};

/**
 * -------------------------具体方法-----------------
 *  */

module.exports = fun;





