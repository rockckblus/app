var express = require('express');
var router = express.Router();
var cityCtrl = require('../db/controller/city.g.controller');//城市Ctrl
var sessionCtrl = require('../db/controller/session.g.controller');//session Ctrl
var categoryServiceCtrl = require('../db/controller/category_service.g.controller');//category_service Ctrl
var snsArticleServiceCtrl = require('../db/controller/snsArticle.g.controller');//sns文章 Ctrl
var memberCtrl = require('../db/controller/member.g.controller');//会员相关 Ctrl
var imApi = require('../db/controller/imApi.imApi.controller');//请求及时通讯api接口


var RateLimit = require('express-rate-limit');

var limiter = new RateLimit({
    windowMs: 800, // 15 minutes
    delayAfter: 1,//begin slowing down responses after the first request,
    max: 1, // limit each IP to 100 requests per windowMs
    delayMs: 400// disable delaying - full speed until the max limit is reached
});


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


/**
 * post sns:fun 社区相关api 技能发布控制点击
 * 16/3/8 */
router.post('/sns/postKillFrom', limiter, function (req, res, next) {
    next();
});
router.post('/sns/postNeedFrom', limiter, function (req, res, next) {//需求发布控制点击
    next();
});
/**
 * post sns:fun 社区相关api
 * 16/3/8 */
router.post('/sns/:fun', function (req, res) {
    postSns(req, res);
});


/**
 * post member:fun 会员相关 限制重复点击方法
 * 16/3/8 */
router.post('/member/xiaDan', limiter, function (req, res, next) {
    next();
});

/**
 * post member:fun 会员相关 限制重复点击方法
 * 16/3/8 */
router.post('/member/jieDan', limiter, function (req, res, next) {
    next();
});

/**
 * post member:fun 会员相关
 * 16/3/8 */
router.post('/member/:fun', function (req, res) {
    postMember(req, res);
});


/**
 * post im:fun 及时通讯相关
 * 16/3/8 */
router.post('/imApi/:fun', function (req, res) {
    postIm(req, res);
});

router.get('/', function (req, res) {
    res.json(11123);
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
        case 'addOneCity' ://添加一个城市到临时城市表 cityNew
            _addOneCity(req.body);
            break;
        case 'selectAllCityNew' ://select全部城市 cityNew
            _selectAllCityNew();
            break;

    }

    /**
     * getAllOneCity
     * 16/3/8 */
    function _getAllOneCity() {
        cityCtrl.getAllOneCity(req.body, function (err, doc) {
            res.json(doc);
        });
    }

    /**
     * getAllOneCity
     * 16/3/8 */
    function _getTwoCityFromOneId() {
        cityCtrl.getTwoCityFromOneId(req.body.oneId, function (err, doc) {
            res.json(doc);
        });
    }

    /**
     * selectHotCity 查询热门城市
     * 16/3/18 */
    function _selectHotCity() {
        cityCtrl.selectHotCity(function (err, doc) {
            res.json(doc);
        });
    }

    /**
     * addOneCity添加一个城市到临时城市表
     */
    function _addOneCity(post) {
        cityCtrl.addOneCity(post);
        res.json('ok');
    }

    /**
     * select全部城市 cityNew
     * @private
     */
    function _selectAllCityNew() {
        cityCtrl.selectAllCityNew(function (doc) {
            res.json(doc);
        });
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

/**
 * post sns Aip sns相关
 * 16/3/8 */
function postSns(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        // case 'froAddKill' :
        //     snsArticleServiceCtrl.froAddKill(req.body, function (re) {
        //         res.json(re);
        //     }, function (err) {
        //         res.json(err);
        //     });
        //     break;
        case 'homeGetList' :
            snsArticleServiceCtrl.homeGetList(req.body, function (re) {
                res.json(re);
            }, function (err) {
                res.json(err);
            });
            break;
        case 'needGetList' :
            snsArticleServiceCtrl.needGetList(req.body, function (re) {
                res.json(re);
            }, function (err) {
                res.json(err);
            });
            break;
        case 'needGetlist' :
            req.body.type = 'need';//加入type字段。需
            // _getList(req.body);
            break;
        case 'postKillFrom' ://添加一条技能 ,如果有补充会员资料,去更新会员资料
            snsArticleServiceCtrl.postKillFrom(req.body, function (re) {
                res.json(re);
            }, function (err) {
                res.json(err);
            });
            break;
        case 'postNeedFrom' ://添加一条需求
            snsArticleServiceCtrl.postNeedFrom(req.body, function (re) {
                res.json(re);
            }, function (err) {
                res.json(err);
            });
            break;
        case 'addKillImg' ://添加需求图片上传接口
            snsArticleServiceCtrl.addKillImg(req.body, function (re) {
                res.json(re);
            }, function (err) {
                res.json(err);
            });
            break;
        case 'delKillImg' ://删除需求图片
            snsArticleServiceCtrl.delKillImg(req.body, function (re) {
                res.json(re);
            }, function (err) {
                res.json(err);
            });
            break;


    }

}

/**
 * postIm 即时通讯
 */
function postIm(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        case 'getOnLine' ://获取im用户在线状态
            _getOnLine(req.body);
            break;
        case 'noReadNewsCount' ://获取im用户的未读取消息数,传uid
            _noReadNewsCount(req.body);
            break;
    }

    /**
     * 获取im在线状态,uidArr传入数组['rockblus','rockblus2'],最多20个
     * @param body
     * @private
     * @returns {'results':['rockblus']}
     */
    function _getOnLine(body) {
        imApi.getOnLine(body.uidArr, _s);
        function _s(re) {
            var reData = {
                "complete": true,
                "data": {
                    "code": "S",
                    "msg": "查询成功",
                    "results": re.results
                }
            };
            res.json(reData);
        }
    }

    /**
     * 获取im用户的未读取消息数
     * @param body
     * @private
     * @returns {'results':['rockblus']}
     */
    function _noReadNewsCount(body) {
        imApi.noReadNewsCount(body.uid, _s, _e);
        function _s(re) {
            var reData = {
                "complete": true,
                "data": {
                    "code": "S",
                    "msg": "查询成功",
                    "results": re.count,
                    "noReadNews": re.noReadNews
                }
            };
            res.json(reData);
        }

        function _e(e) {
            var reData = {
                "complete": true,
                "data": {
                    "code": "F",
                    "msg": "查询失败",
                    "results": e
                }
            };
            res.json(reData);
        }
    }

}

/**
 * post member:fun 会员相关
 * 16/3/8 */
function postMember(req, res) {
    var fun = req.params.fun;
    switch (fun) {
        // case 'forAddMember' ://循环添加1000条用户
        //     memberCtrl.forAddMember(req.body, function (re) {
        //         res.json(re);
        //     });
        //     break;
        case 'getUserData' ://获取用户数据
            memberCtrl.getUserData(req.body, function (re) {
                re.data.doc[0].uid = re.data.doc[0]._id;
                res.json(re);
            });
            break;
        case 'loginIn' ://用户登录
            memberCtrl.loginIn(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'editHeaderImg' ://用户头像编辑
            memberCtrl.editHeaderImg(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'userDataEdit' ://修改用户资料
            memberCtrl.userDataEdit(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'telType' ://修改是否允许电话咨询
            memberCtrl.telType(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'getKillContent' ://获取技能详情_根据id
            memberCtrl.getKillContent(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'getOrderFromContent' ://获取技能详情_根据id
            memberCtrl.getOrderFromContent(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'xiaDan' ://下单
            memberCtrl.xiaDan(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'jieDan' ://接单
            memberCtrl.jieDan(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'trueXianDan' ://判断技能id是否被当前uid下单
            memberCtrl.trueXianDan(req.body, function (re) {
                res.json(re);
            });
            break;
        case 'trueJieDan' ://判断当前uid是否对orderid接单
            memberCtrl.trueJieDan(req.body, function (re) {
                res.json(re);
            });
            break;

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
