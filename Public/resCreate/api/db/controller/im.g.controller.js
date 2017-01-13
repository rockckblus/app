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
    myNewsIsReadCtrl: myNewsIsReadCtrl, //修改当前im消息为 count 0  传 postObj.newsId
    noReadNewsCountCtrl: noReadNewsCountCtrl,//判断当前uid 有没有未读联系 count  返回 code:s  results:2

};

/**
 * -------------------------具体方法-----------------
 *  */

/**
 * 修改当前im消息为 count 0  传 postObj.newsId
 */
function myNewsIsReadCtrl(postObj, callBack) {
    imFun.myNewsIsReadFun(postObj)
        .then(_call, _err);

    function _call() {
        var re = {
            data: {
                code: 'S'
            }
        };
        pubFun.pubReturn(false, re, '修改完成', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '修改完成', callBack);
    }
}


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

/**
 * 判断当前uid 有没有未读联系 count  返回 code:s  results:2
 */
function noReadNewsCountCtrl(postObj, callBack) {
    imFun.noReadNewsCountFun(postObj)
        .then(_call, _err);

    function _call(re) {
        callBack(re);
    }

    function _err(err) {
        callBack(err);
    }
}

module.exports = fun;
