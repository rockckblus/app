var pingJiaModel = require('../model/pingJia.g.model');
var memberModel = require('../model/member.g.model');
var q = require('q');//异步编程对象
var g = require('../../g.config');
var pub = require('../fun/pub.g.fun');//公共方法

var fun = {
    addPingJiaFun: addPingJiaFun,//添加一条评价
    truePingJiaIsSetFun: truePingJiaIsSetFun,//判断评价存在
    findPingJiaByOrderIdFun: findPingJiaByOrderIdFun,//查询一条orderId的评价
    findJiNengPingJiaByOrderIdFun: findJiNengPingJiaByOrderIdFun,//查询一条orderId的评价 (仅技能方给的评价), 传orderid
    findNeedPingJiaByOrderIdFun: findNeedPingJiaByOrderIdFun,//查询一条orderId的评价 (仅需求方给的评价), 传orderid
    trueThisUidIsPingJiaFun: trueThisUidIsPingJiaFun,//判断当前uid是否评价了
    getAllOrderPingJiaFun: getAllOrderPingJiaFun,//获取所有order的评价 data.userPingJia ,条件type 选技能方 orderid
    getAllOrderNeedPingJiaFun: getAllOrderNeedPingJiaFun,////获取所有order的评价 data.userPingJia ,条件type 选需求方 orderid

};

/**************************
 *   添加一条评价
 * 16/12/29 下午8:09 ByRockBlus
 **************************/
function addPingJiaFun(postObj) {
    var defer2 = q.defer();
    pingJiaModel.create({
        orderId: postObj.orderId,
        uid: postObj.uid,
        type: postObj.type,//1order方 2技能方 ,此type是 用binduser 判断出来的
        content: postObj.content,
    }, function (err, doc) {
        if (err) {
            defer2.reject(err);
        } else {
            defer2.resolve(postObj);
        }
    });
    return defer2.promise;
}

/**
 * 判断评价存在 uid orderid
 */
function truePingJiaIsSetFun(postObj) {
    var defer = q.defer();
    pingJiaModel.findOne(
        {
            uid: postObj.uid,
            orderId: postObj.orderId
        }
    ).exec(function (err, doc) {
        if (err) {
            defer.reject('评价查询失败');
        } else {
            if (doc && doc._id) {
                defer.reject('评价表uidorderid已经存在');
            } else {
                defer.resolve(postObj);
            }
        }
    });
    return defer.promise;
}

/**
 * 查询一条orderId的评价
 */
function findPingJiaByOrderIdFun(postObj) {
    var defer = q.defer();
    pingJiaModel.find({
        orderId: postObj.orderId
    })
        .populate(
            {
                'path': 'uid',
                'model': memberModel,
                'select': 'headerImg name mt',

            }
        )
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                for (var vo in doc) {
                    try {
                        doc[vo]._doc.uid._doc.mt = pub.changeMt(doc[vo]._doc.uid._doc.mt);
                        doc[vo]._doc.uid._doc.headerImg = g.host.imageHost + doc[vo]._doc.uid._doc.headerImg;
                    } catch (e) {
                        console.log(e);
                    }
                }
                postObj.pingJia = doc;
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**
 * 查询一条orderId的评价 (仅技能方给的评价)
 */
function findJiNengPingJiaByOrderIdFun(orderId) {
    var defer = q.defer();
    pingJiaModel.findOne({
        orderId: orderId,
        type: 2
    })
        .populate(
            {
                'path': 'uid',
                'model': memberModel,
                'select': 'headerImg name mt',
            }
        )
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                try {
                    doc._doc.uid._doc.mt = pub.changeMt(doc._doc.uid._doc.mt);
                    doc._doc.uid._doc.headerImg = g.host.imageHost + doc._doc.uid._doc.headerImg;
                } catch (e) {
                    console.log(e);
                }
                defer.resolve(doc);
            }
        });
    return defer.promise;
}

/**
 * 查询一条orderId的评价 (仅需求方给的评价)
 */
function findNeedPingJiaByOrderIdFun(orderId) {
    var defer = q.defer();
    pingJiaModel.findOne({
        orderId: orderId,
        type: 1
    })
        .populate(
            {
                'path': 'uid',
                'model': memberModel,
                'select': 'headerImg name mt',
            }
        )
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                try {
                    doc._doc.uid._doc.mt = pub.changeMt(doc._doc.uid._doc.mt);
                    doc._doc.uid._doc.headerImg = g.host.imageHost + doc._doc.uid._doc.headerImg;
                } catch (e) {
                    console.log(e);
                }
                defer.resolve(doc);
            }
        });
    return defer.promise;
}

/**
 * 判断当前uid是否评价了
 */
function trueThisUidIsPingJiaFun(postObj) {
    var defer = q.defer();
    pingJiaModel.find({
        orderId: postObj.orderId,
        uid: postObj.uid
    })
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc[0]) {
                    postObj.pingJiaTrue = true;
                } else {
                    postObj.pingJiaTrue = false;
                }
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**
 * 获取所有order的评价 data.userPingJia ,条件type 选技能方 orderid
 */
function getAllOrderPingJiaFun(postObj) {
    var defer = q.defer();
    postObj.userPingJia = [];
    var count = 0;
    for (var vo in postObj.allOrderList) {
        count++;
        findJiNengPingJiaByOrderIdFun(postObj.allOrderList[vo]._id)
            .then(_Push);
    }

    function _Push(doc) {
        if (doc) {
            postObj.userPingJia.push(doc);
        }
        if (count == postObj.allOrderList.length) {
            setTimeout(function () {
                defer.resolve(postObj);
            }, 0);
        }
    }

    return defer.promise;
}

/**
 * 获取所有order的评价 data.userPingJia ,条件type 选需求方 orderid
 */
function getAllOrderNeedPingJiaFun(postObj) {
    var defer = q.defer();
    postObj.userPingJia = [];
    var count = 0;
    for (var vo in postObj.allOrderId) {
        count++;
        findNeedPingJiaByOrderIdFun(postObj.allOrderId[vo]._id)
            .then(_Push);
    }

    function _Push(doc) {
        if (doc) {
            postObj.userPingJia.push(doc);
        }
        if (count == postObj.allOrderId.length) {
            setTimeout(function () {
                defer.resolve(postObj);
            }, 0);
        }
    }

    return defer.promise;
}

module.exports = fun;






