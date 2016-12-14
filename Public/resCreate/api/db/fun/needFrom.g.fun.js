var orderModel = require('../model/needFrom.g.model');
var q = require('q');//异步编程对象
var moment = require('moment');//日期插件
var memberModel = require('../model/member.g.model');
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    needAdd: needAdd,//添加一条需求
    getOneFrom: getOneFrom,//判断需求是否存在,防止重复提交 ,传 fromRoundId,
    getOrederContentFun: getOrederContentFun,//获取详情_根据id ,发订单的用户资料

};

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

    var gpsArea = {};
    var cityCode = 777;
    if (postObj.areaGps) {
        gpsArea = postObj.areaGps;
    }
    if (postObj.areaGps && postObj.areaGps.city && postObj.areaGps.city.cityCode) {
        cityCode = postObj.areaGps.city.cityCode;
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
            endTime: getEndTime(postObj.endTime),//计算出来的最后过期时间
            cityBuXian: postObj.cityBuXian,//城市输入如果选不限，就忽略city字段
            city: postObj.city,//城市
            cityCode: cityCode,//城市编码
            gpsArea: gpsArea,//gps位置

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
                    getUserIdOrderListFun(doc[0].uid._id).then(function (doc) {//取用户发布的其他
                        reDoc.needList = doc;
                        defer.resolve(reDoc);
                    }, function (err) {
                        defer.reject(err);
                    });
                } else {
                    defer.reject('doc为空');
                }
            }
        });
    return defer.promise;
}

/**
 * 查询用户发布的所有 需求
 * @param postObj
 */
function getUserIdOrderListFun(userId) {
    var defer = q.defer();
    orderModel.find({uid: userId, state: 1})
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
module.exports = fun;
