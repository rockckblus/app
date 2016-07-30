var express = require('express');
var router = express.Router();
var cityCtrl = require('../db/controller/city.g.controller');//城市Ctrl
var sessionCtrl = require('../db/controller/session.g.controller');//session Ctrl
var categoryServiceCtrl = require('../db/controller/category_service.g.controller');//category_service Ctrl
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
 * post /
 * 16/3/10 */
router.post('/', function (req, res, next) {

    /** 存班级  */
//    var saveClass = new classModel({
//        name: 'liSi'
//    });
//    saveClass.save();
    /** 存学生 班级 56d63dd316d69a3003261c18   */
//    var saveStudet = new studentModel({
//        studenName: 'ma123',
//        classId: '56d64246c23844de03d69c20'
//    });
//    saveStudet.save();


//    oeoeLeftNavModel.find().
//        where('name').ne('天津').
//        where('type').equals('2').
//        where('pid').equals('54630d5cd6c08bb9138b4638').
//        select('name').
//        populate('pid').
//        limit(10).
//        exec(function (err, doc) {
//            res.json(doc);
//            res.json(111);
//        });
//    oeoeLeftNavModel.find(function (err, doc) {
//        console.log('doc', doc);
//        res.json(doc);
//    });
//        populate('classId').
//        exec(function (err, doc) {
//            console.log('err', err);
//            console.log('doc', doc);
//        });

});

/**
 * post City:fun 城市相关api
 * 16/3/8 */
router.post('/city/:fun', function (req, res) {
    postCity(req, res);
});

/**
 * post system:fun system相关api(session,)
 * 16/3/8 */
router.post('/system/:fun', function (req, res) {
    postSystem(req, res);
});

/**
 * post category:fun category相关api
 * 16/3/8 */
router.post('/category/:fun', function (req, res) {
    postCategory(req, res);
});

router.get('/', function (req, res) {
    res.json(11);
});


/**
 * function 详情 ****************************************************
 * 16/3/8 */
/**
 * post City Aip 城市方法相关
 * 16/3/8 */
function postCity(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        case 'getAllOneCity' ://获取全部1级城市
            _getAllOneCity();
            break;
        case 'getTwoCityFromOneId' ://根据1级地址返回2级
            _getTwoCityFromOneId();
            break;
        case 'selectHotCity' ://返回热门城市
            _selectHotCity();
            break;

    }

    /**
     * getAllOneCity
     * 16/3/8 */
    function _getAllOneCity() {
        cityCtrl.getAllOneCity(req.body, function (err, doc) {
            res.json(doc);
        })
    }

    /**
     * getAllOneCity
     * 16/3/8 */
    function _getTwoCityFromOneId() {
        cityCtrl.getTwoCityFromOneId(req.body.oneId, function (err, doc) {
            res.json(doc);
        })
    }

    /**
     * selectHotCity 查询热门城市
     * 16/3/18 */
    function _selectHotCity() {
        cityCtrl.selectHotCity(function (err, doc) {
            res.json(doc);
        })
    }
}


/**
 * function 详情 ****************************************************
 * 16/3/8 */
/**
 * post City Aip 城市方法相关
 * 16/3/8 */
function postSystem(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        case 'saveSession' ://添加一条session 如果存在就修改,不存在就新加
            _saveSession();
            break;
        case 'findSessionContent' ://根据post的sessionId,获取sessionContent
            _findSessionContent();
            break;
    }


    /**
     * saveSession
     * * 16/3/8 */
    function _saveSession() {
        sessionCtrl.saveSession(req.body);
        res.json('okSession');
    }

    /**
     * 根据post的sessionId,获取sessionContent
     * * 16/3/8 */
    function _findSessionContent() {
        sessionCtrl.findSessionContent(req.body, callback);
        function callback(err, doc) {
            res.json({err: err, doc: doc});
        }
    }
}

/**
 * post City Aip 城市方法相关
 * 16/3/8 */
function postCategory(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        case 'selectCategoryServiceOneTwo' ://
            _selectCategoryServiceOneTwo();
            break;
    }

    function _selectCategoryServiceOneTwo() {
        categoryServiceCtrl.selectAllOneTwo({}, _callback);
        function _callback(err, doc) {
            res.json({err: err, doc: doc});
        }
    }
}


/** curl  */
function curl(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        case 'text' :
            _test();
            break;
    }
    function _test() {
        res.json(111);
    }
}

/**
 *asdfkkkk
 * 16/3/9 */
module.exports = router;
