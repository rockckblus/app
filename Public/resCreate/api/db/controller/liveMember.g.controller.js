/**
 * liveMebmer ctrl
 */

var liveMemberFun = require('../fun/liveMember.g.fun');
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    addOneLiveCtrl: liveMemberFun.addOneLiveFun,//添加一条key
    findOneLiveMemberCtrl:liveMemberFun.findOneLiveMemberFun,//传skip ,取一个会员,如果 没有 结果,就返回状态,使tempLiveCount 归0
};

/**
 * -------------------------具体方法-----------------
 *  */

module.exports = fun;





