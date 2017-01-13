var orderModel = require('../model/needFrom.g.model');
var q = require('q');//异步编程对象
var moment = require('moment');//日期插件
var memberModel = require('../model/member.g.model');
var bindUserCtrl = require('../controller/orderFromBindUser.g.controller');//对应关系ctrl
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    needAdd: needAdd,//添加一条需求
    getOneFrom: getOneFrom,//判断需求是否存在,防止重复提交 ,传 fromRoundId,
    getOrederContentFun: getOrederContentFun,//获取详情_根据id ,发订单的用户资料
    needGetListFun: needGetListFun,//获取需求列表
    getEndTime: getEndTime,//转换有效期,返回最后日期
    getOrderUidFun: getOrderUidFun,//根据订单id 获取用户的uid,返回postObj
    myNeedFun: myNeedFun,//我的需求
    delNeedFun: delNeedFun,//删除一条需求
    editOrderStateFun: editOrderStateFun,//修改order的订单状态 传 12345
    editPingJiaStateFun: editPingJiaStateFun,//修改订单评价状态
    getAllOrderIdFun: getAllOrderIdFun,//获取订单用户的所有orderId by orderId
    getUidbyOrderIdFun: getUidbyOrderIdFun,//根据orderid 获取 orderUid
    getSelectOrderIdByUidFun: getSelectOrderIdByUidFun,//根据uid 获取 所有已经成交的 订单
    getLoseOrderIdByUidFun: getLoseOrderIdByUidFun,//返回当前uid的order 表的 过期的order postObj.loseOrderNeedList
    trueOrderAleadySelectFun: trueOrderAleadySelectFun,//判断订单是否已经选单,或者失效
    findOneTimeOutNeedFun: findOneTimeOutNeedFun,//find 一条 已经过期的数据 ，返回 need _id
};

/**
 * 获取需求列表
 */
function needGetListFun(postObj) {
    var defer = q.defer();
    var whereCondition = {
        state: {$in: [1, 2]}
    }; //where条件,默认空
    var sortStr = '_id';//排序条件 留空就是 按距离

    //下拉 翻页 find next 查出当前 的 下10条数据
    if (postObj.endId !== 0) {
        whereCondition._id = {};
        whereCondition._id.$gt = postObj.endId;
    }

    try {//如果是附近搜索
        if (postObj.condition.area.city.cityCode == '777') {//如果是附近搜索
            whereCondition.gpsSearch = {
                $near: [postObj.condition.areaGps.gpsObj.lng, postObj.condition.areaGps.gpsObj.lat]
            };
        } else {//按照城市搜索
            whereCondition.cityCode = postObj.condition.area.city.cityCode;
            whereCondition.gpsSearch = {
                $near: [postObj.condition.areaGps.gpsObj.lng, postObj.condition.areaGps.gpsObj.lat]
            };
        }
    } catch (e) {
        console.error(e);
    }

    //如果有筛选
    if (postObj.condition && postObj.condition.clickShaiXuan && postObj.condition.clickShaiXuan[0]) {
        for (var vo in postObj.condition.clickShaiXuan) {
            _giveShaiXuanWhere(postObj.condition.clickShaiXuan[vo]);//根据筛选给where条件
        }
    }

    orderModel.find(whereCondition)
        .populate(
            {
                'path': 'uid',
                'model': memberModel,
                'select': 'headerImg name sex'
            }
        )
        .sort(sortStr)
        .limit(10)
        .select('uid title gpsSearch attr content service price city type endTime')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                if (doc[0]) {
                    var isHaveGps = false;
                    if (postObj.condition && postObj.condition.areaGps && postObj.condition.areaGps.gpsObj && postObj.condition.areaGps.gpsObj.lng) {
                        isHaveGps = true;
                    }
                    for (var vo in doc) {

                        //如果有gps信息就去计算距离
                        if (isHaveGps) {
                            doc[vo]._doc.far = pub.farGps(postObj.condition.areaGps.gpsObj.lat, postObj.condition.areaGps.gpsObj.lng, doc[vo].gpsSearch[1], doc[vo].gpsSearch[0]);
                        } else {
                            doc[vo]._doc.far = 0;
                        }

                        //如果有头像
                        if (doc[vo]._doc && doc[vo]._doc.uid && doc[vo]._doc.uid.headerImg) {
                            doc[vo]._doc.listHeader = g.host.imageHost + doc[vo]._doc.uid.headerImg;
                        } else {
                            doc[vo]._doc.listHeader = '';
                        }

                        //如果有 attr
                        if (doc[vo]._doc && doc[vo]._doc.attr) {
                            doc[vo]._doc.price = doc[vo]._doc.attr.price;
                            doc[vo]._doc.danWei = pub.getDefaultVal('kill_priceUnit', doc[vo]._doc.attr.priceUnit);
                        }

                        //如果有 服务器方式
                        if (doc[vo]._doc && doc[vo]._doc.service !== undefined) {
                            var service = doc[vo]._doc.service.toString();
                            doc[vo]._doc.serviceStr = pub.getDefaultVal('kill_service', service);
                        }

                        //如果有city
                        if (doc[vo]._doc && doc[vo]._doc.city) {
                            if (doc[vo]._doc.city == '不限') {
                                doc[vo]._doc.city = '地区不限';
                            }
                        }

                        //des
                        doc[vo]._doc.des = doc[vo]._doc.content;

                    }

                    defer.resolve(doc);

                } else {
                    defer.reject('暂无数据');
                }
            }

        });

    /**
     *根据筛选给where条件
     */
    function _giveShaiXuanWhere(vo) {
        switch (vo) {
            case 'needShaiXuanTwo2' :
                sortStr = '-editTime';//最新排序
                break;
            case 'needShaiXuanOne2' :
                sortStr = '-price';//价格排序
                break;
            case 'needShaiXuanTwo3' ://线上服务 筛选
                whereCondition.service = 1;
                break;
        }
    }

    return defer.promise;

}

/**
 * 添加一条需求
 * @param postObj
 */
function needAdd(postObj) {


    var defer = q.defer();
    if (!postObj.price) {//如果价格为空,修改 单位为面议
        postObj.priceUnit = '3';
        postObj.price = '';
    }
    if (postObj.cityBuXian) {//城市输入如果选不限，就忽略city字段
        postObj.city = "不限";
    }

    var gpsArea = [0, 0];
    var cityCode = '777';
    var service = 0;
    if (postObj.areaGps && postObj.areaGps.gpsObj && postObj.areaGps.gpsObj.lat) {
        gpsArea = [postObj.areaGps.gpsObj.lng, postObj.areaGps.gpsObj.lat];
    }
    if (postObj.cityCode) {
        if (postObj.city !== '不限') {
            cityCode = postObj.cityCode;
        }
    }

    if (postObj.service) {
        if (postObj.service == 'default') {
            service = 0;
        } else {
            service = Number(postObj.service);
        }
    }

    orderModel.create({
            needRoundId: postObj.needRoundId,//随机id 仿制重复提交
            uid: postObj.uid,
            title: postObj.title,//需求标题
            content: postObj.content,//需求介绍
            attr: {
                price: postObj.price,//价格
                priceUnit: postObj.priceUnit,//价格单位
            },//属性
            price: postObj.price,//价格
            endTime: getEndTime(postObj.endTime),//计算出来的最后过期时间
            cityBuXian: postObj.cityBuXian,//城市输入如果选不限，就忽略city字段
            city: postObj.city,//城市
            cityCode: cityCode,//城市编码
            gpsSearch: gpsArea,//mongo 地理位置
            service: service,//服务方式

        }, function (err, doc) {
            if (err) {
                defer.resolve(JSON.stringify(err));
            } else {
                defer.resolve({err: err, doc: doc});
            }
        }
    );
    return defer.promise;
}

/**
 * 转换有效期,返回最后日期
 */
function getEndTime(dayStr) {

    switch (dayStr) {
        case '0'://3天
            return moment().add(3, 'day');
        case '1'://1周
            return moment().add(7, 'day');
        case '2'://1个月
            return moment().add(30, 'day');
        default://3
            return moment().add(3, 'day');
    }
}

/**
 * 判断订单是否存在,防止重复提交 ,传 killRoundId,
 */
function getOneFrom(needRoundId) {
    var defer = q.defer();
    orderModel.findOne({needRoundId: needRoundId}).exec(function (err, doc) {
        var reData = {};
        if (err) {
            defer.reject(JSON.stringify(err));
        } else {
            if (doc && doc._doc && doc._doc.needRoundId) {
                reData = {
                    data: {
                        code: 'F',
                        msg: 'id存在,不可以入库'
                    }
                };
            } else {
                reData = {
                    data: {
                        code: 'S',
                        msg: 'id不存在,可以入库'
                    }
                };
            }
        }
        defer.resolve({err: err, doc: reData});
    });
    return defer.promise;
}

/**
 * 获取详情_根据id ,发订单的用户资料
 * */
function getOrederContentFun(postObj) {
    var defer = q.defer();
    orderModel.find({_id: postObj.orderId})
        .populate(
            {
                'path': 'uid',
                'model': memberModel,
            }
        )
        .exec(function (err, doc) {
            var reDoc = {
                userData: {},
                thisNeed: {},
                needList: {}
            };
            if (err) {
                defer.reject(err);
            } else {
                if (doc && doc[0] && doc[0].uid && doc[0].uid._doc) {
                    reDoc.userData = doc[0].uid._doc;
                    reDoc.userData.headerImg = g.host.imageHost + reDoc.userData.headerImg;
                    reDoc.userData.mt = pub.changeMt(reDoc.userData.mt);
                    // reDoc.userData.far = pub.farGps(39.911843, 116.390533, 39.079774, 117.172880);//北京到天津117
                    if (postObj.areaGps && postObj.areaGps.lat && reDoc.userData.areaGps && reDoc.userData.areaGps.gpsObj && reDoc.userData.areaGps.gpsObj.lat) {//如果有客户gps 就去计算距离
                        reDoc.userData.far = pub.farGps(postObj.areaGps.lat, postObj.areaGps.lng, reDoc.userData.areaGps.gpsObj.lat, reDoc.userData.areaGps.gpsObj.lng);
                    }
                    reDoc.thisNeed = doc[0]._doc;
                    reDoc.thisNeed.price = doc[0]._doc.attr.price;
                    reDoc.thisNeed.priceUnit = pub.getDefaultVal('kill_priceUnit', doc[0]._doc.attr.priceUnit);
                    reDoc.thisNeed.service = pub.getDefaultVal('kill_service', doc[0]._doc.attr.service);

                    bindUserCtrl.getOrderIdBindUserCtrl({orderId: postObj.orderId})
                        .then(function (reData) {
                            reDoc.thisNeed.bidUserArr = reData.bidUserArr;
                            reDoc.thisNeed.bidUser = reData.bidUser;
                            reDoc.orderId = postObj.orderId;
                            reDoc.uid = postObj.uid;
                            getUserIdOrderListFun(doc[0].uid._id, doc[0]._doc._id).then(function (doc) {//取用户发布的其他
                                reDoc.needList = doc;
                                defer.resolve(reDoc);
                            }, function (err) {
                                defer.reject(err);
                            });
                        });
                } else {
                    defer.reject('doc为空');
                }
            }
        });
    return defer.promise;
}

/**
 * 根据订单id 获取用户的uid,返回postObj
 */
function getOrderUidFun(postObj) {
    var defer = q.defer();
    orderModel.find({_id: postObj.orderId})
        .select('uid')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.orderUid = doc[0].uid;
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**
 * 查询用户发布的所有 需求
 * @param postObj
 */
function getUserIdOrderListFun(userId, orderId) {
    var defer = q.defer();

    var where = {uid: userId, state: 1};
    if (orderId) {
        where._id = {$ne: orderId};
    }
    orderModel.find(where)
        .select('_id title attr')
        .limit(5)
        .exec(function (err, doc) {
            for (var i in doc) {
                doc[i]._doc.price = doc[i]._doc.attr.price;
                doc[i]._doc.priceUnit = pub.getDefaultVal('kill_priceUnit', doc[i]._doc.attr.priceUnit);
                doc[i]._doc.service = pub.getDefaultVal('kill_service', doc[i]._doc.attr.service);
            }
            if (err) {
                defer.reject(err);
            }
            defer.resolve(doc);
        });
    return defer.promise;
}

/**************************
 * 获取我的技能，传 obj.uid
 * 16/12/26 下午10:07 ByRockBlus
 **************************/
function myNeedFun(postObj) {
    var defer = q.defer();
    orderModel.find({uid: postObj.uid, state: {$ne: 5}})
        .select('_id title state pingJiaState')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
    return defer.promise;
}

/**************************
 * 根据uid 获取 所有已经成交的 订单 返回postObj.allSelectOrder
 * 16/12/26 下午10:07 ByRockBlus
 **************************/
function getSelectOrderIdByUidFun(postObj) {
    var defer = q.defer();
    orderModel.find({uid: postObj.uid, state: 3})
        .select('_id title state pingJiaState')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.allSelectOrder = doc;
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**************************
 *返回当前uid的order 表的 过期的order postObj.loseOrderNeedList
 **************************/
function getLoseOrderIdByUidFun(postObj) {
    var defer = q.defer();
    orderModel.find({uid: postObj.uid, state: 4})
        .select('_id title ')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                postObj.loseOrderNeedList = doc;
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**
 * 删除一条需求
 */
function delNeedFun(postObj) {
    var defer = q.defer();
    if (postObj.needId) {
        orderModel.update(
            {
                _id: postObj.needId,
                uid: postObj.uid
            },
            {
                state: 5
            },
            {}, function (err, doc) {
                if (err) {
                    defer.reject(JSON.stringify(err));
                } else {
                    var reData = {
                        doc: {
                            data: {
                                code: 'S', msg: '删除需求成功'
                            }
                        }
                    };
                    if (doc.ok == 1) {
                        reData.doc.data.code = 'S';
                        reData.doc.data.msg = '删除技能成功';
                        defer.resolve(reData);
                    } else {
                        defer.reject('删除技能失败');
                    }
                }
            });
    }

    return defer.promise;
}

/**
 * 修改order的订单状态 传 postObj.orderId 12345
 */
function editOrderStateFun(postObj, state) {
    var defer = q.defer();
    orderModel.update({_id: postObj.orderId}, {state: state}, {multi: false}, function (err, numberAffected, raw) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(postObj);
        }
    });
    return defer.promise;
}

/**
 * 修改订单评价状态
 */
function editPingJiaStateFun(postObj) {
    var defer = q.defer();
    getOrederContentFun(postObj)//获取订单详情
        .then(function (re) {
            var pingJiaState;//当前评价状态
            if (re && re.thisNeed && re.thisNeed.pingJiaState !== undefined) {
                pingJiaState = re.thisNeed.pingJiaState;
            }

            if (pingJiaState !== undefined) {
                switch (pingJiaState) {
                    case 0://双方都未评价
                        if (postObj.type == 1) {//需求方 发来的评价
                            pingJiaState = 1;//order评价状态 改为 1 orderuid 已评, bindUid 未评
                        } else if (postObj.type == 2) {//技能方 发来的评价
                            pingJiaState = 2;//order评价状态 改为 2 bindUid 已评, orderUid 未评
                        }
                        break;
                    case 1://orderuid 已评, bindUid 未评
                        if (postObj.type == 2) {
                            pingJiaState = 3;//order评价状态 改为 3 双方已评价
                        } else if (postObj.type == 1) { //需求方发来的评价
                            defer.reject('需求方评价过了');
                        }
                        break;
                    case 2://bindUid 已评, orderUid 未评
                        if (postObj.type == 1) {
                            pingJiaState = 3;//order评价状态 改为 3 双方已评价
                        } else if (postObj.type == 2) { //技能方发来的评价
                            defer.reject('技能方评价过了');
                        }
                        break;
                    case 3://双方已评价
                        defer.reject('双方已评价过了');
                        break;
                }

                orderModel.update(
                    {_id: postObj.orderId},
                    {pingJiaState: pingJiaState},
                    {},
                    function (err, doc) {
                        if (err) {
                            defer.reject(err);
                        } else {
                            defer.resolve(doc);
                        }
                    }
                );
            } else {
                defer.reject('订单评价状态获取失败');
            }
        });
    return defer.promise;
}

/**
 * 获取订单用户的所有orderId by orderId
 */
function getAllOrderIdFun(postObj) {
    var defer = q.defer();

    //获取uid
    getUidbyOrderIdFun(postObj.orderId)
        .then(function (uid) {
            orderModel.find({uid: uid})
                .select('_id')
                .exec(function (err, doc) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        postObj.allOrderList = doc;
                        defer.resolve(postObj);
                    }
                });
        });

    return defer.promise;
}

/**
 * 根据orderid 获取 orderUid
 */
function getUidbyOrderIdFun(postObj) {
    var defer = q.defer();
    orderModel.findOne(postObj)
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc && doc.uid) {
                    defer.resolve(doc.uid);
                } else {
                    defer.reject('获取uid失败');
                }
            }
        });
    return defer.promise;
}

/**
 * 判断订单是否已经选单,或者失效
 */
function trueOrderAleadySelectFun(postObj) {
    var defer = q.defer();
    orderModel.findOne({_id: postObj.orderId})
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc && (doc.state == 3 || doc.state == 4 || doc.state == 5)) {
                    defer.reject('订单不能被选单');
                } else {
                    if (doc && doc.uid) {
                        postObj.orderUid = doc.uid;
                    }
                    defer.resolve(postObj);
                }
            }
        });
    return defer.promise;
}


/**************************
 * find 一条 已经过期的数据 ，返回 need _id
 **************************/
function findOneTimeOutNeedFun(_id) {
    var condition = {
        state: {$in: [1, 2]}//状态为 发起,接单
    };
    if (_id) {
        condition._id = {
            $gt: _id
        };
    }

    var defer = q.defer();
    orderModel.findOne(condition, function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            if (doc !== null) {
                var now = moment();
                var endTime = moment(doc.endTime);

                if (now > endTime) {
                    //修改当前orderId为4 超时
                    editOrderStateFun({orderId: doc._id}, 4)

                    //如果有符合条件的 就去修改order状态,和对应关系表的状态
                        .then(function () {
                            bindUserCtrl.changeOrderTimeOutCtrl({orderId: doc._id})
                                .then(function (row) {
                                    console.log('修改对应关系超时成功', row);
                                }, function (err) {
                                    console.log('修改对应关系超时状态失败', err);
                                });
                        }, function (err) {
                            console.log('修改order为4失败', err);
                        });
                }

            }
            defer.resolve(doc);
        }
    });

    return defer.promise;
}


module.exports = fun;
