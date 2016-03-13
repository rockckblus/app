/**
 * session表 contrller 全局
 */

/**
 * 城市模型
 * 16/3/7 */
var sessionModel = require('../model/session.g.model');
var g = require('../../g.config');

var fun = {
    saveSession: saveSession
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * saveSession 一条
 * 16/3/7 */
function saveSession(post) {
    sessionModel.create({
        sessionId: post.sessionid,
        content: post.content,
    });
    sessionModel.save();
}

module.exports = fun;





