/**
 * im ctrl
 */

var imFun = require('../fun/im.g.fun');
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    addOneLastNewsCtrl: imFun.addOneLastNewsFun,//添加 或者更新 一条未读数据
    getCallListCtrl: getCallListCtrl,//获取用户联系人
    inUidToUserIdCtrl: inUidToUserIdCtrl,//当前uid给其他人发消息 入库 联系人表,传uid,gUserId
};

/**
 * -------------------------具体方法-----------------
 *  */
/**
 * 获取用户联系人
 */
function getCallListCtrl(postObj, callBack) {

    imFun.getCallListFun(postObj)
        .then(_call, _err);

    function _call(re) {
        pubFun.pubReturn(false, re, '获取联系人成功', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '获取联系人失败', callBack);
    }
}

/**
 * 当前uid给其他人发消息 入库 联系人表,传uid,gUserId
 */
function inUidToUserIdCtrl(postObj, callBack) {

    imFun.inUidToUserIdFun(postObj)
        .then(_call, _err);

    function _call(re) {
        pubFun.pubReturn(false, re, '入库联系人成功', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '入库联系人失败', callBack);
    }
}


module.exports = fun;
