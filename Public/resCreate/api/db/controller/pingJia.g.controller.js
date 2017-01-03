/**
 * 评价 contrller
 */

var bindUserCtrl = require('../controller/orderFromBindUser.g.controller');//订单关系ctrl
var orderCtrl;//orderCtrl
var pingJiaFun = require('../fun/pingJia.g.fun');//评价方法
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');//异步编程

var fun = {
    addPingJiaCtrl: addPingJiaCtrl,//添加一条评价
    findPingJiaByOrderIdCtrl: pingJiaFun.findPingJiaByOrderIdFun,//查询一条orderId的评价
    trueThisUidIsPingJiaCtrl: pingJiaFun.trueThisUidIsPingJiaFun,//判断当前uid是否评价了
    getAllOrderPingJiaCtrl: pingJiaFun.getAllOrderPingJiaFun,//获取所有order的评价 data.userPingJia ,条件type 选技能方 orderid
    getAllOrderNeedPingJiaCtrl: pingJiaFun.getAllOrderNeedPingJiaFun,//获取所有order的评价 data.userPingJia ,条件type 选需求方 orderid

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
function addPingJiaCtrl(postObj, callBack) {
    orderCtrl = orderCtrl || require('../controller/snsArticle.g.controller');
    //判断评价是否存在
    pingJiaFun.truePingJiaIsSetFun(postObj)
    //根据orderId，uid 获取 当前uid 的 type （技能方。还是需求方）
        .then(bindUserCtrl.getPingJiaTypeByUidCtrl)
        //入库添加
        .then(pingJiaFun.addPingJiaFun)
        //修改评价状态 传type过去
        .then(orderCtrl.editPingJiaStateCtrl)
        .then(_call, _err);

    function _call(re) {
        var endRe = {
            data: re
        };
        pubFun.pubReturn(false, endRe, '评价成功', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '评价失败', callBack);
    }


}

module.exports = fun;





