/**
 * 评价 contrller
 */

var bindUserCtrl = require('../controller/orderFromBindUser.g.controller');//订单关系ctrl
var orderCtrl = require('../controller/snsArticle.g.controller');//orderCtrl
var pingJiaFun = require('../fun/pingJia.g.fun');//评价方法
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');//异步编程

var fun = {
    addPingJiaCtrl: addPingJiaCtrl,//添加一条评价
};

/**
 * -------------------------具体方法-----------------
 *  */

/**************************
 *  添加一条评价
 *  1.根据orderId，uid 获取 当前uid 的 type （技能方。还是需求方）
 *  2.入库
 *  3.修改评价状态
 * 16/12/29 下午8:25 ByRockBlus
 **************************/
function addPingJiaCtrl(postObj) {
    var defer = q.defer();
    bindUserCtrl.getPingJiaTypeByUid(postObj)//根据orderId，uid 获取 当前uid 的 type （技能方。还是需求方）
        .then(pingJiaFun.addPingJiaFun)//入库添加
        // .then(orderCtrl.editPingJiaState)//修改评价状态 传type过去//todo
        .then(_call, _err);

    function _call(doc) {
        defer.resolve(doc);
    }

    function _err(err) {
        defer.resolve(JSON.stringify(err));
    }

    return defer.promise;
}

module.exports = fun;





