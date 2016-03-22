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
router.post('/caiji/:fun', function (req, res) {
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
        case 'getUrl' :///curl 一条 url/
            _geturl();
            break;
        case 'findOneTempCountVal' :///findOne 一条 ,传功能名称,返回val ,
            _findOneTempCountVal();
            break;
        case 'addTempCount' ://添加一条临时统计 {name:'功能',value:Number}
            _addTempCount();
            break;
        case 'saveTempCount' ://添加一条临时统计 {name:'功能',value:Number}
            _saveTempCount();
            break;
    }

    /**
     * 传入 功能名称,
     * @return valObj
     * 16/3/22 */
    function _findOneTempCountVal() {
        tempCountCtrl.findOne(req.body.name, function (doc) {
            res.json(doc);
        });
    }

    /**
     * getUrl
     * 16/3/8 */
    function _geturl() {
        var url = req.body.url;
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