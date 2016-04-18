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
 * 城市city表
 * 16/3/22 */
var cityCtrl = require('../db/controller/city.g.controller');

/** gpsChina Ctrl  */
var gpsChinaCtrl = require('../db/controller/gpsChina.back.controller');
/**
 * post City:fun 城市相关api
 * 16/3/8 */
router.post('/caiji/:fun', function (req, res) {
    admin(req, res)
});

//get eachAdd
router.get('/caiji/:fun', function (req, res) {
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
        case 'getJsonUrl' :///curl 一条 json/
            _getJsonUrl();
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
        case 'getThreeCityArea' :// 查询三级城市,传 {limit:num,skip:num}
            _getThreeCityArea();
            break;
        case 'getOneCityArea' :// 根据2级pid 查询 1级
            _getOneCityArea();
            break;
        case 'eachAdd' :// 遍历gps 写入数据库
            _eachAdd();
            break;
        case '' :// 遍历gps 写入数据库
            _eachAdd();
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

    /**
     * getJsonUrl
     * 16/3/8 */
    function _getJsonUrl() {
        var url = req.body.url;
        curlCtrl.getJson(url, function (doc) {
            console.log('jsonDoc', doc);
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

    /**
     * 查询三级,传 limit skip 对象 ,callback
     * 16/3/22 */
    function _getThreeCityArea() {
        cityCtrl.getThreeCityArea({
            limit: req.body.limit,
            skip: req.body.skip
        }, function (doc) {
            res.json(doc);
        })
    }

    /**
     * 根据2级pid 查询 1级
     * 16/3/23 */
    function _getOneCityArea() {
        cityCtrl.getOneCityFromId({
            id: req.body.id
        }, function (doc) {
            res.json(doc);
        })
    }

    /** 遍历数据库写入gps  */
    function _eachAdd() {
<<<<<<< HEAD

=======
        gpsChinaCtrl.eachAdd(function(doc){
            res.json(doc)
>>>>>>> origin/本地开发分支

        });
    }

    /** 查询是否  */
}


module.exports = router;
