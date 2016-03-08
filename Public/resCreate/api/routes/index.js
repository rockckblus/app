var express = require('express');
var router = express.Router();
//mongoose.connect('mongodb://127.0.0.1/dipan');
//var db = mongoose.connection;
var g = require('../g.config');
var cityCtrl = require('../db/controller/city.g.controller');//城市Ctrl

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
 * get *,所有get访问之前的动作
 * 16/3/8 */
router.get('*', function (req, res, next) {
    if (!g.mongoConnect) {//如果mongo连接失败,首次启动node的时候
        res.json('mongo数据库连接失败');
    } else {
        next();
    }
});

/**
 * post 跨域请求
 * 16/3/8 */
router.post('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {

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

router.post('/city/:fun', function (req, res) {
    console.log('req', req.params.fun);
    var fun = req.params.fun;
    switch (fun) {
        case 'getAllOneCity' ://获取全部1级城市
            getAllOneCity();
            break;
        case 'getTwoCityFromOneId' ://根据1级地址返回2级
            getTwoCityFromOneId();
            break;
    }

    /**
     * getAllOneCity
     * 16/3/8 */
    function getAllOneCity() {
        cityCtrl.getAllOneCity(req.body, function (err, doc) {
            res.json(doc);
        })
    }

    /**
     * getAllOneCity
     * 16/3/8 */
    function getTwoCityFromOneId() {
        cityCtrl.getTwoCityFromOneId(req.body.oneId, function (err, doc) {
            res.json(doc);
        })
    }
});
module.exports = router;
