var orderFromBindUserModel = require('../model/orderFromBindUser.g.model');
var memberModel = require('../model/member.g.model');
var orderModel = require('../model/needFrom.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    addOneBindUserFun: addOneBindUserFun,//添加一条对应关系
    editIsReatMarkFun: editIsReatMarkFun,//修改已经读取过订单 标记
    trueIsHaveFun: trueIsHaveFun,//判断接单的重复id 订单id 订单uid 技能uid 是否存在,
    trueXianDanBindUserFun: trueXianDanBindUserFun,//判断技能id是否被当前uid下单
    trueJieDanBindUserFun: trueJieDanBindUserFun,//判断orderId是否被当前uid接单
    getJiNengListOrderIdFun: getJiNengListOrderIdFun,//根据uid取技能订单列表的订单id 与 对应关系
    getNeedListOrderIdFun: getNeedListOrderIdFun,//根据uid 获取需求订单 的对应关系 订单
    getSelectBindUidListOrderIdFun: getSelectBindUidListOrderIdFun,//返回当前用户作为 bindUid 的成交订单 postObj.selectBindUidOrderList
    getOrderIdBindUserFun: getOrderIdBindUserFun,//根据orderId 获取 接单的对应关系
    getLoseListOrderIdFun: getLoseListOrderIdFun,//返回当前uid的关系表的 过期||选别人的 postObj.loseOrderList
    changeSelectOrderFromFun: changeSelectOrderFromFun,//修改对应关系, 根据orderid 其他对应关系 都改为失效。
    changeOrderTimeOutFun: changeOrderTimeOutFun,//根据orderid 修改对应关系为4 超时
    changeSelectOrderFromNextFun: changeSelectOrderFromNextFun,//修改对应关系, 根据orderid 当前uid 对应关系改为 3选单
    getPingJiaTypeByUidFun: getPingJiaTypeByUidFun,//根据orderId，uid 获取 当前uid 的 type （技能方。还是需求方）
    getAllOrderIdbyBindUIdFun: getAllOrderIdbyBindUIdFun,//根据uid获取此用户的所有成交订单 postObj.allOrderId
    trueUserTypeFun: trueUserTypeFun,//判断当前用户的userType 1公共 2技能 3需求 userType
    getSelectListOrderIdFun: getSelectListOrderIdFun,//关系表查orderid的成交数据 postObj.selectOrderList 传 postObj.allSelectOrder
    _getUserBindUserBySelectOrderIdFun: _getUserBindUserBySelectOrderIdFun,//根据  orderId 查 被选的 技能uid数据 传orderId
    delBindUserFun: delBindUserFun,//删除bindUser 在我的订单列表不显示 修改state
    trueOrderIsReadyFun: trueOrderIsReadyFun,//判断orderid 是否有未读消息 ,传orderid 返回{code:S,msg:}
    editOrderIsReadyFun: editOrderIsReadyFun,//修改orderid 的所有对应关系的 orderUidIsReadMark 为已读 ,传orderid
    eidtOrderIdToNoReadFun: eidtOrderIdToNoReadFun,//修改orderId 的   orderUidIsReadMark 为未读 传postObj 返回postObj
    editSelectOrderUidOrderIsReadyFun: editSelectOrderUidOrderIsReadyFun,//修改orderId 的   selectReadMark.orderUidIsRead 为以 读 传postObj 返回postObj
    editSelectBindUidOrderIsReadyFun: editSelectBindUidOrderIsReadyFun,//修改orderId 的 selectReadMark.bindUidIsReady  为已读 传postObj 返回postObj
    noReadOrderFromCountFunm: noReadOrderFromCountFun,//判断有未读订单消息

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
 * 修改已经读取过订单 标记
 */
function editIsReatMarkFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.update({
        orderId: postObj.orderId,
        bindUid: postObj.uid//技能方的uid
    }, {bindUidIsReadMark: true}, {multi: false}, function (err, row) {
        if (err) {
            defer.reject(err);
        } else {
            var reObj = {};
            reObj.data = row;
            defer.resolve(reObj);
        }
    });
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
        bindUidType: {$nin: [3, 4, 5]}
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
                'select': 'pingJiaState title'
            }
        )
        .sort('bindUidIsReadMark bindUidType')
        .select('orderId orderUid jiNengId bindUidType bindUidIsReadMark')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.jiNengOrderList = [];//被动接单,点击下单 主动接单 bindUsertype 1 2
                for (var vo in doc) {
                    doc[vo]._doc.orderUid._doc.mt = pub.changeMt(doc[vo].orderUid.mt);
                    switch (doc[vo].bindUidType) {
                        case 2://被动接单
                            postObj.jiNengOrderList.push(doc[vo]);
                            break;
                        case 1://主动接单
                            postObj.jiNengOrderList.push(doc[vo]);
                            break;
                        // case 3://选单 返回 当前 uid 对此订单的 评价状态 (需求uid 是否 对 接单uid 评价, 接单uid )
                        //     postObj.selectOrderList.push(doc[vo]);
                        //     break;
                        // case 4://超时失效
                        //     postObj.loseOrderList.push(doc[vo]);
                        //     break;
                        // case 5://选其他人 失效
                        //     postObj.loseOrderList.push(doc[vo]);
                        //     break;
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
    orderFromBindUserModel.find(
        {
            orderUid: postObj.uid,
            state: 1,
            bindUidType: {$in: [1, 2]},
        }
    )
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
                'select': 'pingJiaState state title',
                'match': {state: {$in: [1, 2]}}//发起(此处有判断被动接单逻辑),接单
            }
        )
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                var tempOrderIdArr = [];
                var countOrderId = [];
                for (var vo in doc) {
                    if (doc[vo].orderId) {
                        var orderId = doc[vo].orderId._id.toString();


                        if (countOrderId.indexOf(orderId) == -1) {
                            countOrderId.push(orderId);
                            tempOrderIdArr[orderId] = {
                                orderId: orderId,
                                title: doc[vo].orderId.title,
                                isNoReady: false,//未读
                                jieDanCount: [],
                                beiDongJieDan: []
                            };
                        }
                        switch (doc[vo].bindUidType) {
                            case 1://主动接单 ,
                                tempOrderIdArr[orderId].jieDanCount.push(1);
                                break;
                            case 2://被动接单
                                // beiDongJieDan: '',//被动接单人 状态 ,资料, (等待userName接单),
                                tempOrderIdArr[orderId].beiDongJieDan.push(doc[vo].bindUid);
                                break;
                        }
                    }
                }

                var tempOrderIdArrEnd = [];
                //统计个数,去掉orderId
                for (var vo2 in tempOrderIdArr) {
                    tempOrderIdArr[vo2].jieDanCount = tempOrderIdArr[vo2].jieDanCount.length;
                    tempOrderIdArrEnd.push(tempOrderIdArr[vo2]);
                }
                postObj.needOrderList = tempOrderIdArrEnd;//所有订单push到 需求单数组 ,然后判断type 来 给 被动接单人资料
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**
 * 返回当前用户作为 bindUid 的成交订单 postObj.selectBindUidOrderList
 */
function getSelectBindUidListOrderIdFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.find(
        {
            bindUid: postObj.uid,
            state: 1,
            bindUidType: 3,
        }
    )
        .select('orderId orderUid bindUidType  selectReadMark_bindUidIsReady')
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
                'select': 'pingJiaState state title',
                'match': {state: {$in: [3, 5]}}//成交,删除
            }
        )
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc && doc[0]) {
                    for (var vo2 in doc) {
                        doc[vo2]._doc.orderUid._doc.mt = pub.changeMt(doc[vo2].orderUid.mt);
                        if (doc[vo2]._doc.orderUid._doc.headerImg) {
                            doc[vo2]._doc.headerImg = g.host.imageHost + doc[vo2]._doc.orderUid._doc.headerImg;
                        }
                    }
                }
                postObj.selectBindUidOrderList = doc;
                defer.resolve(postObj);
            }
        });

    return defer.promise;

}

/**
 * 返回当前uid的关系表的 过期||选别人的 postObj.loseOrderList bindUid为uid
 */
function getLoseListOrderIdFun(postObj) {

    var defer = q.defer();
    orderFromBindUserModel.find(
        {
            bindUid: postObj.uid,
            state: 1,
            bindUidType: {$in: [4, 5]},//过期,选别人,如果选别人,就查出 所选 的binUid
        }
    )
        .select('orderId bindUid bindUidType')
        .populate(
            {
                'path': 'orderId',
                'model': orderModel,
                'select': 'pingJiaState state title',
                'match': {state: {$in: [3, 4, 5]}}// 选单,过期,删除
            }
        )
        .exec(function (err, doc) {
            var count = 0;
            var endArr = [];
            if (err) {
                defer.reject(err);
            } else {
                if (!doc[0]) {
                    postObj.loseOrderList = [];
                    defer.resolve(postObj);
                } else {
                    for (var vo in doc) {
                        if (doc[vo].bindUidType == 5) {//如果选别人,就传orderid, 查bindUidType = 3 的 bindUid
                            _getSelectBindUidByOrderId(doc[vo], endArr);
                        } else {
                            endArr.push(doc[vo]);
                        }
                        count++;
                        _count();
                    }
                }
            }

            function _count() {
                if (count == doc.length) {
                    setTimeout(function () {
                        postObj.loseOrderList = endArr;
                        defer.resolve(postObj);
                    }, 100);
                }
            }

        });

    return defer.promise;
}

/**
 * 根orderid 查 bindUidType = 3 的bindUid
 */
function _getSelectBindUidByOrderId(voDoc, endArr) {
    orderFromBindUserModel.findOne({
        orderId: voDoc.orderId,
        bindUidType: 3
    })
        .select('bindUid')
        .populate({
            'path': 'bindUid',
            'model': memberModel,
            'select': 'name mt headerImg'
        })
        .exec(function (err, doc) {
            if (err) {
                console.error('查询selectBindUser失败');
            } else {
                doc._doc.bindUid._doc.mt = pub.changeMt(doc.bindUid.mt);
                doc._doc.bindUid._doc.headerImg = g.host.imageHost + doc._doc.bindUid.headerImg;
                voDoc._doc.selectBindUser = doc;
                endArr.push(voDoc);
            }
        });
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
            orderId: postObj.orderId,
            bindUidType: {$in: [1, 2]},
            bindUid: {$ne: postObj.bindUid}
        },
        {
            bindUidType: 5
        },
        {multi: true}, function (err, row) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                console.log('row', row);
                defer.resolve(postObj);
            }
        });

    return defer.promise;
}

/**
 * 根据orderid 修改对应关系为4 超时
 */
function changeOrderTimeOutFun(postObj) {

    var defer = q.defer();
    orderFromBindUserModel.update(
        {
            orderId: postObj.orderId,
        },
        {
            bindUidType: 4
        },
        {multi: true}, function (err, row) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                defer.resolve(row);
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

/**
 * 判断当前用户的userType 1公共 2技能 3需求 userType
 */
function trueUserTypeFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.find({orderId: postObj.orderId}).exec(function (err, doc) {
        var re;
        var count = 0;
        if (err) {
            defer.reject(err);
        } else {
            for (var vo in doc) {
                if (count < 1) {
                    if (doc[vo].orderUid == postObj.uid) {
                        re = 3;//需求方
                        count++;
                    }
                    if (doc[vo].bindUid == postObj.uid) {
                        re = 2;//技能方
                        count++;
                    }
                }
            }
        }

        setTimeout(function () {
            if (re) {
                postObj.userType = re;
                defer.resolve(postObj);
            } else {
                postObj.userType = 1;
                defer.resolve(postObj);//公共方
            }
        }, 0);

    });

    return defer.promise;

}

/**
 * 关系表查orderid的成交数据 postObj.selectOrderList 传 postObj.allSelectOrder
 */
function getSelectListOrderIdFun(postObj) {
    var defer = q.defer();
    var count = 0;
    postObj.selectOrderList = [];
    if (postObj.allSelectOrder && postObj.allSelectOrder[0]) {
        for (var vo in postObj.allSelectOrder) {
            _getUserBindUserBySelectOrderIdFun(postObj.allSelectOrder[vo]._id, postObj.allSelectOrder[vo].title, postObj.allSelectOrder[vo].pingJiaState)
                .then(_push);
        }

    } else {
        defer.resolve(postObj);
    }

    function _push(oneBindUid) {
        postObj.selectOrderList.push(oneBindUid);
        count++;
        if (count == postObj.allSelectOrder.length) {
            defer.resolve(postObj);
        }
    }

    return defer.promise;
}

/**
 * 根据  orderId 查 被选的 技能uid数据
 */
function _getUserBindUserBySelectOrderIdFun(orderId, orderTitle, pingJiaState) {
    var defer = q.defer();
    orderFromBindUserModel.findOne(
        {
            orderId: orderId,
            bindUidType: 3
        }
    )
        .select('orderId bindUid selectReadMark_orderUidIsReady')
        .populate(
            {
                'path': 'bindUid',
                'model': memberModel,
                'select': 'headerImg name mt'
            }
        )
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc && doc._doc && doc._doc.bindUid && doc._doc.bindUid.headerImg) {
                    doc._doc.bindUid._doc.headerImg = g.host.imageHost + doc.bindUid.headerImg;
                    doc._doc.bindUid._doc.mt = pub.changeMt(doc._doc.bindUid._doc.mt);
                }
                if (doc && doc._doc) {
                    doc._doc.orderTitle = orderTitle;
                    doc._doc.pingJiaState = pingJiaState;
                }
                defer.resolve(doc);
            }
        });
    return defer.promise;
}

/**
 * 删除bindUser 在我的订单列表不显示 修改state
 */
function delBindUserFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.update({
            orderId: postObj.orderId,
            bindUid: postObj.uid
        },
        {state: 0}, {multi: false}, function (err, row) {
            if (err) {
                defer.reject(err);
            } else {

                defer.resolve({data: row});
            }
        }
    );

    return defer.promise;
}

/**
 * 判断orderid 是否有未读消息
 */
function trueOrderIsReadyFun(orderId, obj) {
    var defer = q.defer();
    orderFromBindUserModel.findOne({orderId: orderId, orderUidIsReadMark: false})
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc) {
                    defer.resolve({
                        code: 'S',
                        msg: '当前order有未读消息',
                        obj: obj
                    });
                } else {
                    defer.resolve({
                        code: 'F',
                        msg: '当前order没有未读消息',
                        obj: obj
                    });
                }
            }
        });
    return defer.promise;
}

/**
 * 修改orderid 的所有对应关系的  orderUidIsReadMark 为已读
 */
function editOrderIsReadyFun(orderId) {
    var defer = q.defer();
    orderFromBindUserModel.update(
        {orderId: orderId},
        {orderUidIsReadMark: true},
        {multi: true},
        function (err, row) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve({data: row});
            }
        });
    return defer.promise;
}

/**************************
 * 修改orderId 的    orderUidIsReadMark 为未读
 * 返回postObj
 * 17/1/6 下午7:25 ByRockBlus
 **************************/
function eidtOrderIdToNoReadFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.update(
        {orderId: postObj.orderId, orderUid: postObj.orderUid},
        {orderUidIsReadMark: false},
        {multi: false},
        function (err, row) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(postObj);
            }
        }
    );

    return defer.promise;
}

/**************************
 * 修改orderId 的   selectReadMark.orderUidIsRead 为以 读 传postObj 返回postObj
 * 17/1/9 下午3:12 ByRockBlus
 **************************/
function editSelectOrderUidOrderIsReadyFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.update(
        {orderId: postObj.orderId, bindUidType: 3},
        {selectReadMark_orderUidIsReady: true},
        {multi: false},
        function (err, row) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(postObj);
            }
        }
    );

    return defer.promise;

}

/**************************
 * 修改orderId 的 selectReadMark.bindUidIsReady  为已读 传postObj 返回postObj
 * 17/1/9 下午3:12 ByRockBlus
 **************************/
function editSelectBindUidOrderIsReadyFun(postObj) {
    var defer = q.defer();
    orderFromBindUserModel.update(
        {orderId: postObj.orderId, bindUidType: 3},
        {selectReadMark_bindUidIsReady: true},
        {multi: false},
        function (err, row) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(postObj);
            }
        }
    );

    return defer.promise;

}

/**************************
 *  判断有未读订单消息
 *  0,根据uid，获取 order状态，postObj.orderIdContent
 *  2.遍历order状态(1,2,3)  发起1，接单2,选单3,过期4，删除5 ，去筛选不同未读的条件 state
 *
 **************************/
function noReadOrderFromCountFun(postObj) {
    var defer = q.defer();

    //获取作为需求方 的所有order
    _getOrderConent()
    //遍历order 对应关系表,有没有未读消息
        .then(__getOrderContent_Bind)
        //作为技能方 对应关系表,有没有未读消息
        .then(_getKillContent)
        .then(function (endPostObj) {
            if (endPostObj.endCount) {
                defer.resolve({
                    data: {
                        code: 'S',
                        msg: '有未读订单消息'
                    }
                });
            } else {
                defer.resolve({
                    data: {
                        code: 'F',
                        msg: '没有未读订单消息'
                    }
                });
            }
        }, function (err) {
            defer.reject(err);
        });

    //获取 order状态 ,作为需求方的所有订单
    function _getOrderConent() {
        var defer1 = q.defer();
        orderModel.find({uid: postObj.uid, state: {$in: [1, 2, 3]}})//订单发起,抢单,选单
            .select('state')
            .exec(function (err, doc) {
                if (err) {
                    defer1.reject(err);
                } else {
                    postObj.allOrderId = doc;
                    defer1.resolve(postObj);
                }
            });
        return defer1.promise;
    }

    //遍历查关系表,orderId,orderUid, 如果有选单未读的 state:1 orderUidIsReadMark:false selectReadMark_orderUidIsReady :false
    function __getOrderContent_Bind() {
        var defer2 = q.defer();
        var count = 0;
        var endCount = false;
        if (postObj.allOrderId[0]) {
            for (var vo in postObj.allOrderId) {
                count++;
                __bindTrue(postObj.allOrderId[vo]._id)
                    .then(giveTrue);
            }

            if (count == postObj.allOrderId.length) {
                setTimeout(function () {
                    postObj.endCount = endCount;//证明有未读消息了
                    defer2.resolve(postObj);
                }, 200);
            }
        } else {
            defer2.resolve(postObj);
        }

        function giveTrue(bindTrueRe) {
            if (bindTrueRe) {
                endCount = true;
            }
        }

        function __bindTrue(orderId) {
            var defer5 = q.defer();
            orderFromBindUserModel.count(
                {
                    orderId: orderId,
                    orderUid: postObj.uid,
                    state: 1,
                    $or: [
                        {
                            bindUidType: {$in: [1, 2]},
                            orderUidIsReadMark: false
                        },
                        {
                            bindUidType: 3,
                            selectReadMark_orderUidIsReady: false
                        }
                    ]
                },
                function (err, row) {
                    if (err) {
                        defer5.resolve(false);
                    } else {
                        if (row > 0) {
                            defer5.resolve(true);
                        } else {
                            defer5.resolve(false);
                        }
                    }
                });

            return defer5.promise;
        }


        return defer2.promise;
    }

    //获取作为技能方的 ,被选单 bindUid bindUidIsReadMark:false selectReadMark_bindUidIsReady:false state:1
    function _getKillContent() {
        var defer3 = q.defer();
        orderFromBindUserModel.count({
                bindUid: postObj.uid,
                state: 1,
                $or: [
                    {
                        bindUidType: {$in: [1, 2]},
                        bindUidIsReadMark: false
                    },
                    {
                        bindUidType: {$in: [3]},
                        selectReadMark_bindUidIsReady: false
                    }
                ]

            },

            function (err, row) {
                if (err) {
                    defer3.reject(err);
                } else {
                    if (row > 0) {
                        postObj.endCount = true;//证明有未读消息了
                    }
                    defer3.resolve(postObj);
                }
            }
        );

        return defer3.promise;
    }

    return defer.promise;
}

module.exports = fun;

