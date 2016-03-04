var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
mongoose.connect('mongodb://182.92.170.127/oeoe');
var db = mongoose.connection;

//var oeoeSchema = new mongoose.Schema(
////    _id:mongoose.Schema.ObjectId,
////    name: String,
////    pid: String,
////    sort: String,
////    url: String,
////    rel: String
//);
var oeoeSchema = {
//    name:String,
//    pid: {
//        type: mongoose.Schema.ObjectId,
//        ref: 'key'
//    }
}
var oeoeLeftNavModel = mongoose.model('', oeoeSchema, 'city');

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

    oeoeLeftNavModel.find().
        where('name').ne('天津').
        where('type').equals('2').
        where('pid').equals('54630d5cd6c08bb9138b4638').
        select('name').
        populate('pid').
        limit(10).
        exec(function (err, doc) {
            res.json(doc);
        });
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
module.exports = router;
