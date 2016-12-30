var orderFromBindUserModel = require('../model/orderFromBindUser.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法

var fun = {
    addOneBindUserFun: addOneBindUserFun,//添加一条对应关系
    trueIsHaveFun: trueIsHaveFun,//判断接单的重复id 订单id 订单uid 技能uid 是否存在,
    trueXianDanBindUserFun: trueXianDanBindUserFun,//判断技能id是否被当前uid下单
    trueJieDanBindUserFun: trueJieDanBindUserFun,//判断orderId是否被当前uid接单
    getJiNengListOrderIdFun: getJiNengListOrderIdFun,//根据uid取技能订单列表的订单id 与 对应关系
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
            createObj.jiNengId = postObj.jiNengId;//如果点击下单,就记录 被下单的技能id
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

/**
 * 判断接单的重复id 订单id 订单uid 技能uid 是否存在
 * @returns postObj.trueIsHave<Boolen>
 * */
function trueIsHaveFun(postObj) {
    var defer = q.defer();

    var findObj = {
        orderId: postObj.orderId,//订单id
        orderUid: postObj.orderUid,//发订单的uid
        bindUid: postObj.uid,//抢订单的uid
    };
    orderFromBindUserModel.find(findObj)
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc[0]) {
                    postObj.trueIsHave = true;
                } else {
                    postObj.trueIsHave = false;
                }
                defer.resolve(postObj);
            }
        });

    return defer.promise;
}

/**
 * 判断技能id是否被当前uid下单
 */

function trueXianDanBindUserFun(postObj) {
    var defer = q.defer();

    var findObj = {
        jiNengId: postObj.jiNengId,//对当前的技能id
        orderUid: postObj.uid,// 发订单的用户id
    };
    orderFromBindUserModel.find(findObj)
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc[0]) {
                    postObj.trueIsHave = true;
                } else {
                    postObj.trueIsHave = false;
                }
                defer.resolve(postObj);
            }
        });

    return defer.promise;
}

/**
 *判断orderId是否被当前uid接单
 */

function trueJieDanBindUserFun(postObj) {
    var defer = q.defer();

    var findObj = {
        orderId: postObj.orderId,//订单id
        bindUid: postObj.bindUid,//接单人uid
    };
    orderFromBindUserModel.find(findObj)
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc[0]) {
                    postObj.trueIsHave = true;
                } else {
                    postObj.trueIsHave = false;
                }
                defer.resolve(postObj);
            }
        });

    return defer.promise;

}

/**
 * 根据uid取技能订单列表(被动接单,点击下单)的订单id 与 对应关系
 */
function getJiNengListOrderIdFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.find({bindUid: postObj.uid, state: 1, bindUidType: {$in: [1, 2]}})
        .select('orderId orderUid jiNengId bindUidType')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.userOrderList = doc;
                defer.resolve(postObj);
            }
        });

    return defer.promise;
}


module.exports = fun;

