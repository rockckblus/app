var liveMemberModel = require('../model/liveMember.g.model');
var imCtrl = require('../controller/imApi.imApi.controller');//im ctrl
var isReadCtrl = require('../controller/isReadByUid.g.controller');//isRead ctrl
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    addOneLiveFun: addOneLiveFun,//添加 或者 更新 一条 心跳
    findOneLiveMemberFun: findOneLiveMemberFun,//find 一条 member，返回 member id
    upOneLiveFun: upOneLiveFun,//更新一条用户在线心跳 addTime 为当前时间 判断条件为 postObj.isSet = true
    addOneLiveFun_Sub: addOneLiveFun_Sub,//添加一套live  判断条件为 postObj.isSet =false
    findMember: findMember,//判断memberId是否存在, 返回 postObj.isSet=true false
    updateIsReadFalseFun: updateIsReadFalseFun,//更新未读消息为 没有,可以去接口取了 ,只在点击 会员中心 消息列表的时候(点击联系),激活此选项,只在点击 会员中心 消息列表的时候(点击联系),激活此选项
};

/**
 * 添加一条live
 */
function addOneLiveFun(postObj) {
    var defer = q.defer();

    //判断uid是否存在
    findMember(postObj)
    //存在就更新
        .then(upOneLiveFun)
        //不存在就添加
        .then(addOneLiveFun_Sub)
        //call
        .then(function (doc) {
            defer.resolve({data: doc});
        }, function (err) {
            defer.reject(err);
        });

    return defer.promise;
}

/**
 * 更新一条用户在线心跳
 */
function upOneLiveFun(postObj) {
    var defer = q.defer();
    if (postObj.isSet) {//判断如果存在就更新
        var thisTime = Date.now();
        liveMemberModel.update({
                uid: postObj.uid
            },
            {addTime: thisTime},
            {multi: false},
            function (err, doc) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(postObj);
                }
            });
    } else {//不存在就直接返回postObj
        defer.resolve(postObj);
    }
    return defer.promise;
}

/**
 * 更新未读消息为 没有,可以去接口取了 ,只在点击 会员中心 消息列表的时候(点击联系),激活此选项
 */
function updateIsReadFalseFun(postObj) {
    var defer = q.defer();
    liveMemberModel.update({
            uid: postObj.uid
        },
        {isHaveRead: false},
        {multi: false},
        function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**
 * 更新未读消息为 有,不能取接口取等待 点击状态,
 */
function updateIsReadTrueFun(postObj) {
    var defer = q.defer();
    liveMemberModel.update({
            uid: postObj.uid
        },
        {isHaveRead: true},
        {multi: false},
        function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(postObj);
            }
        });
    return defer.promise;
}

/**
 * 添加一条live
 */
function addOneLiveFun_Sub(postObj) {
    var defer = q.defer();
    if (!postObj.isSet) {//不存在就直接添加
        liveMemberModel.create({
            uid: postObj.uid
        }, function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(postObj);
            }
        });
    } else {
        defer.resolve(postObj);
    }

    return defer.promise;
}

/**
 * find 一条 memberId 判断是否存在
 */
function findMember(postObj) {
    var defer = q.defer();
    liveMemberModel.findOne({uid: postObj.uid}).exec(function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            if (doc === null) {
                postObj.isSet = false;
                defer.resolve(postObj);
            } else {
                postObj.isSet = true;
                defer.resolve(postObj);
            }
        }
    });
    return defer.promise;
}

/**************************
 * find 一条 member，返回 member id
 **************************/
function findOneLiveMemberFun(_id) {
    var condition = {};
    if (_id) {
        condition._id = {
            $gt: _id
        };
    }

    var defer = q.defer();
    liveMemberModel.findOne(condition, function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            //如果有uid 就去判断是否 需要去接口取未读消息统计,并请求接口
            _trueIsGetApi(doc);
            defer.resolve(doc);
        }
    });

    return defer.promise;
}

/**
 *是否 需要去接口取未读消息统计,并请求接口
 * @param doc
 * @private
 */
function _trueIsGetApi(doc) {
    if (doc && !doc.isHaveRead) {//如果没有未读消息状态 就去接口取数据
        imCtrl.noReadNewsCount(doc.uid, function (re) {
            if (re && re.count > 0) {//如果有未读消息 ,更新状态 为 true
                updateIsReadTrueFun(doc);//修改true
                isReadCtrl.updateOneReadNewsCtrl(doc);//修改isRead 为有新消息

            }
        });
    }
}

module.exports = fun;

