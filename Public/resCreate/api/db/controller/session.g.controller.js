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
    findSession: findSession,//find 一条 sessionId
    findSessionContent:findSessionContent,//find sessionContent
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * saveSession 一条
 * @param {obj} post postSession 对象{'session':{id:"seddionid",content:{obj}}}
 * 16/3/7 */
function saveSession(post) {

    /**
     * 先去find session ,如果存在,就去更新content
     * 16/3/14 */
    findSession(post.session.id, _save);

    function _save(err, doc) {
        if ((err == null) && !doc[0]) {//没有错误,并且没有查到
            _add(post);
        } else {
            _update(post);
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

    /**
     * 更新一条记录
     * 16/3/16 */
    function _update(post) {
        var condition = {'seesionId': post.session.id};
        var up = {$set: {'content': post.session}};
        sessionModel.update(condition, up, errFunCallBack);
        function errFunCallBack(err) {
            g.alert(err);
        }
    }
}

/**
 * findSession 一条
 * @param {string} sessionId sessionId
 * @param {function} callBack
 * @returns callBack(err,doc) 回调错误信息,正确信息
 * 16/3/14 */
function findSession(sessionId, callBack) {
    sessionModel.find()
        .where('sessionId').equals(sessionId)
        .select('sessionId')
        .exec(function (err, doc) {
            if (err) {
                /**
                 * 错误就输出
                 * 16/3/15 */
                g.alert(err.message);
            }
            callBack(err, doc);
        });
}

/**
 * findSessionContent
 * @param {obj} {postBody} 取id:{postBody.session.id}
 * @param {function} callBack
 * @returns callBack(err,doc) 回调错误信息,正确信息
 * 16/3/14 */
function findSessionContent(post, callBack) {
    try {
        sessionModel.find()
            .where('sessionId').equals(post.id)
            .select('content')
            .exec(function (err, doc) {
                if (err) {
                    /**
                     * 错误就输出
                     * 16/3/15 */
                    g.alert(err.message);
                }
                callBack(err, doc);
            });
    } catch (e) {
        g.alert(e);
    }
}

module.exports = fun;





