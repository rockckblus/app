var express = require('express');
var router = express.Router();
var sessionCtrl = require('../db/controller/session.g.controller');//城市Ctrl
var all = require('./default');//公共路由all方法
//var oeoeSchema = new mongoose.Schema(
////    _id:mongoose.Schema.ObjectId,
////    name: String,
////    pid: String,
////    sort: String,
////    url: String,
////    rel: String
//);
//var oeoeSchema = {
//    name:String,
//    pid: {
//        type: mongoose.Schema.ObjectId,
//        ref: 'key'
//    }
//}
//var oeoeLeftNavModel = mongoose.model('', oeoeSchema, 'city');


/**
 * post 跨域请求
 * 16/3/8 */
router.all('*', function (req, res, next) {
    all(req, res, next);
});

/**
 * post City:fun 城市相关api
 * 16/3/8 */
router.post('/system/:fun', function (req, res) {
    postSession(req, res);
});


/**
 * function 详情 ****************************************************
 * 16/3/8 */
/**
 * post City Aip 城市方法相关
 * 16/3/8 */
function postSession(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        case 'saveSession' ://获取全部1级城市
            _saveSession();
            break;
    }

    /**
     * saveSession
     * * 16/3/8 */
    function _saveSession() {
        sessionCtrl.saveSession(req.body);
        req.json('okSession');
    }
}

module.exports = router;
