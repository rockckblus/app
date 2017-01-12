var imModel = require('../model/im.g.model');
var memberModel = require('../model/member.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    addOneLastNewsFun: addOneLastNewsFun,//添加 或更新 一条 对话消息
    upOneLastNewsFun: upOneLastNewsFun,//更新一条lastNews
    addOneLastNewsFun_Sub: addOneLastNewsFun_Sub,//添加一条LastNews
    findOneLastNewsFun: findOneLastNewsFun,//find 一条 lastNews 判断是否存在
    getCallListFun: getCallListFun,//获取用户联系人
    inUidToUserIdFun: inUidToUserIdFun,//当前uid给其他人发消息 入库 联系人表,传uid,gUserId
};

/**
 * 添加一条LastNews
 */
function addOneLastNewsFun(postObj) {
    var defer = q.defer();

    //判断uid是否存在
    findOneLastNewsFun(postObj)
    //存在就更新
        .then(upOneLastNewsFun)
        //不存在就添加
        .then(addOneLastNewsFun_Sub)
        //call
        .then(function (doc) {
            defer.resolve({data: doc});
        }, function (err) {
            defer.reject(err);
        });

    return defer.promise;
}

/**
 * 更新一条lastNews
 */
function upOneLastNewsFun(postObj) {
    var defer = q.defer();
    if (postObj.isSet) {//判断如果存在就更新
        imModel.update({
                uid: postObj.uid,
                gUserId: postObj.gUserId
            },
            {
                lastMessage: postObj.lastMessage,
                lastTime: postObj.lastTime,
                count: postObj.noReadCount,
                state: 1
            },
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
 * 添加一条LastNews
 */
function addOneLastNewsFun_Sub(postObj) {
    var defer = q.defer();
    if (!postObj.isSet) {//不存在就直接添加
        imModel.create({
            cid: postObj.uid,
            gUserId: postObj.gUserId,
            lastMessage: postObj.lastMessage,
            lastTime: postObj.lastTime,
            noReadCount: postObj.noReadCount
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
 * find 一条 lastNews 判断是否存在
 */
function findOneLastNewsFun(postObj) {
    var defer = q.defer();
    imModel.findOne({cid: postObj.uid, gUserId: postObj.gUserId}).exec(function (err, doc) {
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

/**
 * 获取用户联系人
 */
function getCallListFun(postObj) {
    var defer = q.defer();
    imModel.find({
        cid: postObj.uid,
        state: 1
    })
        .populate(
            {
                'path': 'cid',
                'model': memberModel,
                'select': 'headerImg name mt'
            }
        )
        .populate(
            {
                'path': 'gUserId',
                'model': memberModel,
                'select': 'headerImg name mt'
            }
        )
        .sort('noReadCount')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                if (doc && doc[0]) {
                    for (var vo in doc) {
                        if (doc[vo] && doc[vo].gUserId && doc[vo].gUserId.headerImg) {
                            doc[vo]._doc.gUserId._doc.headerImg = g.host.imageHost + doc[vo].gUserId.headerImg;
                        }
                        if (doc[vo] && doc[vo].gUserId && doc[vo].gUserId.mt) {
                            doc[vo]._doc.gUserId._doc.mt = pub.changeMt(doc[vo].gUserId.mt);
                        }
                        if (doc[vo] && doc[vo].cid && doc[vo].cid.headerImg) {
                            doc[vo]._doc.cid._doc.headerImg = g.host.imageHost + doc[vo].cid.headerImg;
                        }
                        if (doc[vo] && doc[vo].cid && doc[vo].cid.mt) {
                            doc[vo]._doc.cid._doc.mt = pub.changeMt(doc[vo].cid.mt);
                        }
                    }
                }
                defer.resolve(doc);
            }
        });
    return defer.promise;
}

//当前uid给其他人发消息 入库 联系人表,传uid,gUserId
function inUidToUserIdFun(postObj) {
    var inData = {
        cid: postObj.uid,
        uid: postObj.uid,
        gUserId: postObj.gUserId,
        lastMessage: '',
        lastTime: Date.now(),
        noReadCount: 0
    };
    var defer = q.defer();
    //判断当前lastNews是否存在
    findOneLastNewsFun(inData)
    //存在就更新
        .then(upOneLastNewsFun)
        //不存在就添加
        .then(addOneLastNewsFun_Sub)
        //call
        .then(function (doc) {
            defer.resolve({data: doc});
        }, function (err) {
            defer.reject(err);
        });

    return defer.promise;
}

module.exports = fun;

