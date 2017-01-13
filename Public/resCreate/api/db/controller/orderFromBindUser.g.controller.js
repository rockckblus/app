/**
 * orderFromBindUser 订单用户对应关系 contrller
 */

var orderFromBindUserFun = require('../fun/orderFromBindUser.g.fun');
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    addOneBindUser: orderFromBindUserFun.addOneBindUserFun,//添加一条对应关系
    editIsReatMarkCtrl: orderFromBindUserFun.editIsReatMarkFun,//修改已经读取过订单 标记
    trueIsHave: orderFromBindUserFun.trueIsHaveFun,//判断接单的重复id 订单id 订单uid 技能uid 是否存在,
    trueXianDanBindUser: orderFromBindUserFun.trueXianDanBindUserFun,//判断技能id是否被当前uid下单
    trueJieDanBindUser: orderFromBindUserFun.trueJieDanBindUserFun,//判断orderId是否被当前uid接单
    getJiNengListOrderIdCtrl: orderFromBindUserFun.getJiNengListOrderIdFun,//根据uid取技能订单列表的订单id 与 对应关系
    getNeedListOrderIdCtrl: orderFromBindUserFun.getNeedListOrderIdFun,//根据uid 获取需求订单 的对应关系 订单
    getSelectBindUidListOrderIdCtrl: orderFromBindUserFun.getSelectBindUidListOrderIdFun,//返回当前用户作为 bindUid 的成交订单 postObj.selectBindUidOrderList
    getOrderIdBindUserCtrl: orderFromBindUserFun.getOrderIdBindUserFun,//根据orderId 获取 接单的对应关系
    changeSelectOrderFromCtrl: orderFromBindUserFun.changeSelectOrderFromFun,//修改对应关系, 根据orderid 其他对应关系 都改为失效。
    changeSelectOrderFromNextCtrl: orderFromBindUserFun.changeSelectOrderFromNextFun,//修改对应关系, 根据orderid 当前uid 对应关系改为 3选单
    getPingJiaTypeByUidCtrl: orderFromBindUserFun.getPingJiaTypeByUidFun,//根据orderId，uid 获取 当前uid 的 type （技能方。还是需求方）
    getAllOrderIdbyBindUIdCtrl: orderFromBindUserFun.getAllOrderIdbyBindUIdFun,//根据uid获取此用户的所有成交订单 postObj.allOrderId
    trueUserTypeCtrl: orderFromBindUserFun.trueUserTypeFun,//判断当前用户的userType 1公共 2技能 3需求 userType
    getSelectListOrderIdCtrl: orderFromBindUserFun.getSelectListOrderIdFun,//关系表查orderid的成交数据 postObj.selectOrderList 传 postObj.allSelectOrder
    getLoseListOrderIdCtrl: orderFromBindUserFun.getLoseListOrderIdFun,//返回当前uid的关系表的 过期||选别人的 postObj.loseOrderList,
    delBindUserCtrl: orderFromBindUserFun.delBindUserFun,//删除bindUser 在我的订单列表不显示 修改state
    trueOrderIsReadyCtrl: orderFromBindUserFun.trueOrderIsReadyFun,//判断orderid 是否有未读消息 ,传orderid
    editOrderIsReadyCtrl: orderFromBindUserFun.editOrderIsReadyFun,//修改orderid 的所有对应关系的 orderUidIsReadMark 为已读 ,传orderid
    eidtOrderIdToNoReadCtrl: orderFromBindUserFun.eidtOrderIdToNoReadFun,//修改orderId 的   orderUidIsReadMark 为未读 传postObj 返回postObj
    editSelectOrderUidOrderIsReadyCtrl: orderFromBindUserFun.editSelectOrderUidOrderIsReadyFun,//修改orderId 的 selectReadMark.orderUidIsReady  为已读传postObj 返回postObj
    editSelectBindUidOrderIsReadyCtrl: orderFromBindUserFun.editSelectBindUidOrderIsReadyFun,//修改orderId 的 selectReadMark.bindUidIsReady  为已读传postObj 返回postObj
    noReadOrderFromCountCtrl: orderFromBindUserFun.noReadOrderFromCountFunm,//判断有未读订单消息
    changeOrderTimeOutCtrl: orderFromBindUserFun.changeOrderTimeOutFun,//根据orderid 修改对应关系为4 超时

};

/**
 * -------------------------具体方法-----------------
 *  */


module.exports = fun;





