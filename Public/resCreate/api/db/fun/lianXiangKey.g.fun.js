var lianXiangModel = require('../model/lianXiangKey.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');

var fun = {
    addOneKeyFun: addOneKeyFun,//添加一条key
    trueKeyAccessFun: trueKeyAccessFun,//验证用户权限
    findKeyListFun: findKeyListFun,//返回随机技能
};

/**
 * 添加一条key
 */
function addOneKeyFun(postObj) {
    var defer = q.defer();
    lianXiangModel.create({
        title: postObj.title
    }, function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(doc);
        }
    });
    return defer.promise;
}

/**
 * 返回随机技能
 */
function findKeyListFun() {
    var defer = q.defer();
    var re = [];
    var reTitle = [];
    lianXiangModel.count({state: 1}, function (err, count) {
        for (var i = 0; i < 10; i++) {
            var skip = Math.round(Math.random() * count);
            lianXiangModel.findOne({state: 1})
                .select('title')
                .skip(skip).exec(_push);
        }
    });

    function _push(err, doc) {
        if (doc) {
            if (reTitle.indexOf(doc.title) == -1) {
                reTitle.push(doc.title);
                re.push(doc);
            }
        }
    }

    setTimeout(function () {
        defer.resolve({data: re});
    }, 200);

    return defer.promise;
}

/**
 * 验证用户权限
 */
function trueKeyAccessFun(postObj) {
    var defer = q.defer();
    if (postObj.passWord == 'HDZrockblus8') {
        defer.resolve(postObj);
    } else {
        defer.reject('没有权限');
    }
    return defer.promise;
}

module.exports = fun;

