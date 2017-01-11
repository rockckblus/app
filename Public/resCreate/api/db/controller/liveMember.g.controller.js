/**
 * liveMebmer ctrl
 */

var isReadCtrl = require('../controller/isReadByUid.g.controller');
var liveMemberFun = require('../fun/liveMember.g.fun');
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    addOneLiveCtrl: addOneLiveCtrl,//添加一条key 并 给isReay表添加一条数据,
    findOneLiveMemberCtrl: liveMemberFun.findOneLiveMemberFun,//传skip ,取一个会员,如果 没有 结果,就返回状态,使tempLiveCount 归0
};

/**
 * -------------------------具体方法-----------------
 *  */

/**
 * 添加一条key 并 给isReay表添加一条数据,
 * @param postObj
 */
function addOneLiveCtrl(postObj) {
    var defer = q.defer();

    //如果不存在isReay 就添加
    isReadCtrl.addOneReadCtrl(postObj)

    //给livemember 添加数据
        .then(liveMemberFun.addOneLiveFun)

        //call
        .then(function (doc) {
            defer.resolve({data: doc});
        }, function (err) {
            defer.reject(err);
        });

    return defer.promise;
}

module.exports = fun;





