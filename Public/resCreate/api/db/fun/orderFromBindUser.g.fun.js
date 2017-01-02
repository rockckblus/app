var orderFromBindUserModel = require('../model/orderFromBindUser.g.model');
var memberModel = require('../model/member.g.model');
var orderModel = require('../model/needFrom.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    addOneBindUserFun: addOneBindUserFun,//添加一条对应关系
    trueIsHaveFun: trueIsHaveFun,//判断接单的重复id 订单id 订单uid 技能uid 是否存在,
    trueXianDanBindUserFun: trueXianDanBindUserFun,//判断技能id是否被当前uid下单
    trueJieDanBindUserFun: trueJieDanBindUserFun,//判断orderId是否被当前uid接单
    getJiNengListOrderIdFun: getJiNengListOrderIdFun,//根据uid取技能订单列表的订单id 与 对应关系
    getNeedListOrderIdFun: getNeedListOrderIdFun,//根据uid 获取需求订单 的对应关系 订单
    getOrderIdBindUserFun: getOrderIdBindUserFun,//根据orderId 获取 接单的对应关系
    changeSelectOrderFromFun: changeSelectOrderFromFun,//修改对应关系, 根据orderid 其他对应关系 都改为失效。
    changeSelectOrderFromNextFun: changeSelectOrderFromNextFun,//修改对应关系, 根据orderid 当前uid 对应关系改为 3选单
    getPingJiaTypeByUidFun: getPingJiaTypeByUidFun,//根据orderId，uid 获取 当前uid 的 type （技能方。还是需求方）
    getAllOrderIdbyBindUIdFun: getAllOrderIdbyBindUIdFun,//根据uid获取此用户的所有成交订单 postObj.allOrderId
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
    orderFromBindUserModel.find({bindUid: postObj.uid, state: 1})
        .populate(
            {
                'path': 'orderUid',
                'model': memberModel,
                'select': 'headerImg name mt'
            }
        )
        .populate(
            {
                'path': 'orderId',
                'model': orderModel,
                'select': 'pingJiaState'
            }
        )
        .select('orderId orderUid jiNengId bindUidType')
        .sort('bindUidType')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.jiNengOrderList = [];//被动接单,点击下单 主动接单 bindUsertype 1 2
                postObj.selectOrderList = [];//被选单
                postObj.loseOrderList = [];//失效订单
                for (var vo in doc) {
                    doc[vo]._doc.orderUid._doc.mt = pub.changeMt(doc[vo].orderUid.mt);
                    switch (doc[vo].bindUidType) {
                        case 1://被动接单
                            postObj.jiNengOrderList.push(doc[vo]);
                            break;
                        case 2://主动接单
                            postObj.jiNengOrderList.push(doc[vo]);
                            break;
                        case 3://选单 返回 当前 uid 对此订单的 评价状态 (需求uid 是否 对 接单uid 评价, 接单uid )
                            postObj.selectOrderList.push(doc[vo]);
                            break;
                        case 4://超时失效
                            postObj.loseOrderList.push(doc[vo]);
                            break;
                        case 5://选其他人 失效
                            postObj.loseOrderList.push(doc[vo]);
                            break;
                    }
                }
                defer.resolve(postObj);
            }
        });

    return defer.promise;
}

/**
 * 根据uid 获取需求订单 的对应关系 订单
 */
function getNeedListOrderIdFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.find({orderUid: postObj.uid, state: 1, bindUidType: {$in: [1, 2]}})
        .select('orderId bindUid bindUidType')
        .populate(
            {
                'path': 'bindUid',
                'model': memberModel,
                'select': 'headerImg name mt'
            }
        )
        .populate(
            {
                'path': 'orderId',
                'model': orderModel,
                'select': 'pingJiaState'
            }
        )
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.needOrderList = {
                    jieDanOrder: [],
                    jieDanCount: 0,//正常接单统计
                };//需求订单
                for (var vo in doc) {
                    doc[vo]._doc.bindUid._doc.mt = pub.changeMt(doc[vo].bindUid.mt);
                    switch (doc[vo].bindUidType) {
                        case 1://主动接单 ,
                            postObj.needOrderList.jieDanCount++;
                            break;
                        case 2://被动接单
                            // beiDongJieDan: '',//被动接单人 状态 ,资料, (等待userName接单),
                            doc[vo].beiDongJieDan = doc[vo].bindUid;
                            break;
                    }
                    postObj.needOrderList.jieDanOrder.push(doc[vo]);//所有订单push到 需求单数组 ,然后判断type 来 给 被动接单人资料
                }
                defer.resolve(postObj);
            }
        });

    return defer.promise;

}

/**
 * 根据orderId 获取 接单的对应关系
 */
function getOrderIdBindUserFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.find({orderId: postObj.orderId, bindUserType: {$ne: [4, 5]}})
        .sort('bindUserType')
        .select('bindUid bindUidType')
        .populate(
            {
                'path': 'bindUid',
                'model': memberModel
            }
        )
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.bidUserArr = [];
                postObj.bidUser = {};
                for (var vo in doc) {
                    doc[vo]._doc.bindUid._doc.mt = pub.changeMt(doc[vo].bindUid.mt);
                    doc[vo]._doc.bindUid._doc.headerImg = g.host.imageHost + doc[vo]._doc.bindUid._doc.headerImg;
                    var endDoc = doc[vo];
                    endDoc._doc.uid = doc[vo].bindUid._id;
                    if (doc[vo].bindUidType !== 3) {//不为选单
                        postObj.bidUserArr.push(endDoc);
                    } else {
                        postObj.bidUser = endDoc;
                    }
                }
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**
 *修改对应关系, 根据orderid 其他对应关系 都改为失效。
 */
function changeSelectOrderFromFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.update(
        {
            orderId: g.Schema.Types.ObjectId(postObj.orderId),
            bindUidType: {$in: [1, 2]},
            bindUid: {$ne: postObj.bindUid}
        },
        {
            bindUidType: 5
        },
        {multi: true}, function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                defer.resolve(postObj);
            }
        });

    return defer.promise;
}

/**
 *修改对应关系, 根据orderid 当前uid 对应关系改为 3选单
 */
function changeSelectOrderFromNextFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.update(
        {
            orderId: postObj.orderId,
            bindUid: postObj.bindUid
        },
        {
            bindUidType: 3
        },
        {}, function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                defer.resolve(postObj);
            }
        });

    return defer.promise;
}

/**
 * 根据orderId，uid 获取 当前uid 的 type （技能方。还是需求方）
 * 返回type
 */
function getPingJiaTypeByUidFun(postObj) {
    var defer = q.defer();

    orderFromBindUserModel.findOne({
        orderId: postObj.orderId,
        bindUidType: 3//被选单
    })
        .select('bindUid orderUid')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                var type;
                if (doc.bindUid == postObj.uid) {
                    type = 2;//技能方
                }
                else if (doc.orderUid == postObj.uid) {
                    type = 1;//需求方
                }
                if (type) {
                    postObj.type = type;
                    defer.resolve(postObj);
                } else {
                    defer.reject('用户角色获取失败');
                }
            }
        });

    return defer.promise;
}

/**
 * 根据uid获取此用户的所有成交订单 postObj.allOrderId
 */
function getAllOrderIdbyBindUIdFun(postObj) {
    var bindUid = postObj.userData._id;
    var defer = q.defer();
    orderFromBindUserModel.find(
        {
            bindUid: bindUid,
            bindUidType: 3
        }
    )
        .select('orderId orderUid')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.allOrderId = doc;
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}


module.exports = fun;

