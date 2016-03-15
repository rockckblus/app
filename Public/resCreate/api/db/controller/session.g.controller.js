/**
 * session表 contrller 全局
 */

/**
 * session模型
 * 16/3/7 */
var sessionModel = require('../model/session.g.model');
var g = require('../../g.config');

var fun = {
    saveSession: saveSession,//添加一条session,如果存在,就更新content对象
    findSession: findSession
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * saveSession 一条
 * 16/3/7 */
function saveSession(post) {

    /**
     * 先去find session ,如果存在,就去更新content
     * 16/3/14 */
    findSession(post.session.id, _save);

    function _save(err, doc) {
        console.log('errrrr', err);
        console.log('docccc', doc);
        if (err) {//不存在就新加
            console.log('err', err);

            _add(post);
        }
    }

    /**
     * 添加一条新记录
     * 16/3/14 */
    function _add(post) {
        sessionModel.create({
            sessionId: post.session.id,
            content: post.session
        });
    }
}

/**
 * findSession 一条
 * @param {string} sessionId sessionId
 * @param {function} callBack
 * @returns callBack(err,doc) 回调错误信息,正确信息
 * 16/3/14 */
function findSession(sessionId, callBack) {

    sessionModel.findOne({},function(e,doc){
       console.log('e',e);
        console.log('d', doc);
    });
        //.select('sessionId')
        //.exec(function (err, doc) {
        //    console.log('err',err);
        //    console.log('doc',doc);
        //    if (err) {
        //        /**
        //         *错误就去添加
        //         * 16/3/15 */
        //        g.alert(err.message);
        //    }
        //    callBack(err, doc);
        //});
}


module.exports = fun;





