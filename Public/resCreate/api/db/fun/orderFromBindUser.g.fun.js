var orderFromBindUserModel = require('../model/orderFromBindUser.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法

var fun = {
    addOneBindUserFun: addOneBindUserFun,//添加一条对应关系
};

/**
 * 添加一条对应关系
 * @param postObj {订单id,发订单的用户id,抢订单的用户id}
 * @param type 对应关系
 */
function addOneBindUserFun(postObj, type) {
    var defer = q.defer();
    var thisTime = Date.now();//当前时间
    var createObj =
    {
        orderId: postObj.orderId,//订单id
        orderUid: postObj.orderUid,//发订单的用户id
        bindUid: postObj.bindUid,//抢订单的用户id
        bindUidType: type,//抢订单的用户，对应订单 的 关系 1 主动接单(点击接单) ，2 。被动接单(点击下单) 3.被选单
        // selectOrderTime: {type: Date},//被选单时间
        // clickJieOrderTime: {type: Date}, //点击接单时间
        // clickDownOrderTime: {type: Date},//点击下单时间
    };
    switch (type) {
        case 1://主动接单
            createObj.clickJieOrderTime = thisTime; //点击接单时间
            break;
        case 2://被动接单
            createObj.clickDownOrderTime = thisTime; //点击下单时间
            break;
        case 3://被选单
            createObj.selectOrderTime = thisTime; //被选单
            break;
    }

    orderFromBindUserModel.create(
        createObj,
        function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        }
    );
    return defer.promise;
}

module.exports = fun;
