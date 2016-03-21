var express = require('express');
var router = express.Router();
var all = require('./default');//公共路由all方法

/**
 * curl
 * 16/3/21 */
var curlCtrl = require('../db/controller/curl.back.controller');

/**
 * 临时统计
 * 16/3/21 */
var tempCountCtrl = require('../db/controller/tempCount.back.controller');

/**
 * post City:fun 城市相关api
 * 16/3/8 */
router.get('/caiji/:fun/:val', function (req, res) {
    admin(req, res);
});

/**
 * function 详情 ****************************************************
 * 16/3/8 */
/**
 * amdin  相关方法
 * 16/3/8 */

function admin(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        case 'getUrl' ://添加一条session 如果存在就修改,不存在就新加
            _geturl();
            break;
        case 'addTempCount' ://添加一条临时统计 {name:'功能',value:Number}
            _addTempCount();
            break;
        case 'saveTempCount' ://添加一条临时统计 {name:'功能',value:Number}
            _saveTempCount();
            break;
    }

    /**
     * getUrl
     * 16/3/8 */
    function _geturl() {
        var url = req.params.val;
        curlCtrl.get(url, function (doc) {
            res.json(doc);
        })
    }

    //添加一条临时统计 {name:'功能',value:Number}
    function _addTempCount() {
        tempCountCtrl.add({
            name: '全部处理完成的3级地址数量',
            value: 0
        })
    }

    //更新一条临时统计 {name:'功能',value:Number}
    function _saveTempCount() {
        tempCountCtrl.upData({
            name: req.body.name,
            value: req.body.value
        }, function (err) {
            if (err) {
                res.json(err);
            } else {
                res.json('ok');
            }
        })

    }

}


module.exports = router;
