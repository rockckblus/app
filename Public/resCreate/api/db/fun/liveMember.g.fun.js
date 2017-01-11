var liveMemberModel = require('../model/liveMember.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    addOneLiveFun: addOneLiveFun,//添加一条key
    findOneLiveMemberFun: findOneLiveMemberFun,//find 一条 member，返回 member id
};

/**
 * 添加一条live
 */
function addOneLiveFun(postObj) {
    var defer = q.defer();
    liveMemberModel.create({
        uid: postObj.uid
    }, function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(doc);
        }
    });
    return defer.promise;
}

/**************************
 * find 一条 member，返回 member id
 **************************/
function findOneLiveMemberFun(memberId) {
    var condition = {};
    if (memberId) {
        condition._id = {
            $gt: memberId
        }
    }

    var defer = q.defer();
    liveMemberModel.findOne(condition, function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            console.log('findOneDoc', doc);
            defer.resolve(doc);
        }
    });

    return defer.promise;
}


module.exports = fun;

