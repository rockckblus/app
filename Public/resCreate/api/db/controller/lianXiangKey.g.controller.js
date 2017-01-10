/**
 * 联想key ctrl
 */

var liangXiangKeyFun = require('../fun/lianXiangKey.g.fun');
var snsFun = require('../fun/snsArticle.g.fun');//技能方法
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    addOneKeyPubCtrl: addOneKeyPubCtrl,//添加一条key逻辑
    addOneKeyCtrl: liangXiangKeyFun.addOneKeyFun,//添加一条key
    trueKeyAccessCtrl: liangXiangKeyFun.trueKeyAccessFun,//验证用户权限
    findKeyListCtrl: findKeyListCtrl, //返回随机技能

};

/**
 * -------------------------具体方法-----------------
 *  */

/**
 * 添加一条key
 */
function addOneKeyPubCtrl(postObj, callBack) {
    //验证权限
    fun.trueKeyAccessCtrl(postObj)
    //入库
        .then(fun.addOneKeyCtrl)
        //回调
        .then(_call, _err);

    function _call(re) {
        pubFun.pubReturn(false, re, '插入key成功', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '插入key失败', callBack);
    }
}

/**
 * 返回随机关键词
 */
function findKeyListCtrl(postObj, callBack) {
    if (postObj.key) {
        snsFun.getLianXiangKeyFun(postObj)
            .then(_call, _err);
    } else {//传空返回热门
        liangXiangKeyFun.findKeyListFun()
            .then(_call, _err);
    }

    function _call(re) {
        pubFun.pubReturn(false, re, '查询key成功', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '查询key失败', callBack);
    }

}

module.exports = fun;





