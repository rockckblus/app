var isReadModel = require('../model/isReadByUid.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    addOneReadFun: addOneReadFun,//添加  一条 未读消息标记数据
    addOneReadFun_Sub: addOneReadFun_Sub,//添加一条未读消息数据  判断条件为 postObj.isSet =false
    findMember: findMember,//判断memberId是否存在, 返回 postObj.isSet=true false
    getReadStateFun: getReadStateFun,//获取有没有未读消息,或者未读订单
    updateOneReadNewsFun: updateOneReadNewsFun,//更新一条数据为 有未读消息 isHaveReadNews = true
    updateOneReadOrderFun: updateOneReadOrderFun,//更新一条数据为 有未读订单 isHaveReadOrder= true
};

/**
 * 添加一条Read
 */
function addOneReadFun(postObj) {
    var defer = q.defer();

    //判断uid是否存在
    findMember(postObj)
    //不存在就添加
        .then(addOneReadFun_Sub)
        //call
        .then(function (doc) {
            defer.resolve(doc);
        }, function (err) {
            defer.reject(err);
        });

    return defer.promise;
}

/**
 * 添加一条Read
 */
function addOneReadFun_Sub(postObj) {
    var defer = q.defer();
    if (!postObj.isSetReayRow) {//不存在就直接添加
        isReadModel.create({
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
    isReadModel.findOne({uid: postObj.uid}).exec(function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            if (doc === null) {
                postObj.isSetReayRow = false;
                defer.resolve(postObj);
            } else {
                postObj.isSetReayRow = true;
                defer.resolve(postObj);
            }
        }
    });
    return defer.promise;
}

/**
 * 获取有没有未读消息,或者未读订单*/
function getReadStateFun(postObj) {
    var defer = q.defer();
    isReadModel.findOne(
        {uid: postObj.uid},
        {
            $or: [
                {
                    isHaveReayNews: true
                },
                {
                    isHaveReayOrder: true
                }
            ]
        }
    ).exec(function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(doc);
        }
    });


    return defer.promise;
}

/**
 *更新一条数据为 有未读消息 isHaveReayNews = true
 */
function updateOneReadNewsFun(postObj) {
    var defer = q.defer();
    isReadModel.update(
        {uid: postObj.uid},
        {isHaveReadNews: true},
        {multi: false},
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
 *更新一条数据为 有未读订单 isHaveReayOrder = true
 */
function updateOneReadOrderFun(postObj) {
    var defer = q.defer();
    isReadModel.update(
        {uid: postObj.uid},
        {isHaveReadOrder: true},
        {multi: false},
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

