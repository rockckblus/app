/**
 * member member contrller 全局
 */

var request = require('superagent'); //curl 控件
var q = require('q');//异步编程
var pubFun = require('../fun/pub.g.fun');//公共方法
var g = require('../../g.config');
/**
 * 会员模型
 * 16/3/7 */
var memberServiceModel = require('../model/member.g.model');
var memberFun = require('../fun/member.g.fun');
var snsArticleFun = require('../fun/snsArticle.g.fun');//技能方法相关
var needFromFun = require('../fun/needFrom.g.fun');//订单方法
var bindUserCtrl = require('../controller/orderFromBindUser.g.controller');//订单对应关系
var pingJiaCtrl = require('../controller/pingJia.g.controller');//评价ctrl

var fun = {

    /**
     * 获取用户数据
     * 传callBack
     * 16/3/7 */
    getUserData: getUserData,//获取用户数据
    getUserDataPri: getUserDataPri,//内部方法获取用户 gpsSearch sex live hot
    loginIn: loginIn,//用户登录
    getUidByMt: getUidByMt,//根据电话号码获取uid
    editHeaderImg: editHeaderImg,//用户头像修改
    userDataEdit: userDataEdit,//修改用户资料
    telType: telType,//设置是否电话咨询
    trueTelCallCtrl: trueTelCallCtrl,//查询是否有打电话权限
    getUserTelCtrl: getUserTelCtrl,//查询电话
    getKillContent: getKillContent,//获取技能详情_根据id
    xiaDan: xiaDan,//下单
    jieDan: jieDan,//接单
    trueXianDan: trueXianDan,//判断技能id是否被当前uid下单
    trueJieDan: trueJieDan,//判断orderId是否被当前uid接单
    getOrderFromContent: getOrderFromContent,//订单详情
    forAddMember: forAddMember,//循环添加1000个用户
    getOrderFromListCtrl: getOrderFromListCtrl,//我的订单
    selectOrderFromCtrl: selectOrderFromCtrl,//选单
    editIsReatMarkCtrl: editIsReatMarkCtrl,//修改已经读取过订单 标记

};

/**
 * -------------------------具体方法-----------------
 *  */
function forAddMember() {
    var name = '';
    for (var i = 0; i <= 1000; i++) {
        name = generateMixed(6);
        add();
    }


    function generateMixed(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }


    function add() {
        memberServiceModel.create({
            name: name,
            mt: 15510987676
        });
    }
}

/**
 * 获取用户数据
 *  */
function getUserData(post, callBack) {
    memberServiceModel.find({_id: post.uid})
        .select('uid name mt headerImg city sex age isUser telType')
        .exec(function (err, doc) {
            if (doc && doc[0] && doc[0]._doc && doc[0]._doc.headerImg) {
                doc[0]._doc.headerImg = g.host.imageHost + doc[0]._doc.headerImg;
            }
            pubFun.pubReturn(err, doc, '查询用户数据成功', '查询用户数据失败', callBack);
        });
}

/**
 * 内部方法获取用户 gpsSearch sex live hot
 * @param uid
 */
function getUserDataPri(post) {
    var defer = q.defer();
    memberServiceModel.find({_id: post.uid})
        .select('sex areaGps live hot')
        .exec(function (err, doc) {
            if (doc[0] && doc[0]._doc && doc[0]._doc.areaGps && doc[0]._doc.areaGps.gpsObj && doc[0]._doc.areaGps.gpsObj.lat) {
                doc[0]._doc.gpsSearch = [doc[0]._doc.areaGps.gpsObj.lng, doc[0]._doc.areaGps.gpsObj.lat];
            }
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
    return defer.promise;
}

/**
 * 用户登录
 */
function loginIn(post, callBack) {
    curlLoginIn().then(getUid, _err);
    function getUid(re) {
        if (re.code == 'S') {
            getUidByMt(post.mtNum, function (re) {
                var callRe = {
                    data: {
                        code: "S",
                        userData: re.data.userData,
                        msg: "登录成功",
                    }
                };
                callRe.data.userData.uid = re.data.userData._id;
                callBack(callRe);
            });
        } else {
            var callRe = {
                data: {
                    code: "F",
                    msg: '登录失败' + JSON.stringify(re)
                }
            };
            callBack(callRe);
        }
    }

    function _err(err) {
        callBack(err);
    }

    /**
     * curl php接口的 登录api
     */
    function curlLoginIn() {

        var defered = q.defer();

        var urlStr = encodeURI(g.host.phpApi + '/Member/Index/regIn');

        request
            .post(urlStr)
            .send({tel: post.mtNum, code: post.code, roundCodeId: post.roundCodeId})
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) {
                    defered.reject(JSON.stringify(err));
                } else {
                    try {
                        if (res.statusCode == 200) {
                            defered.resolve(res.body);
                        } else {
                            defered.reject(res.statusCode);
                        }
                    } catch (e) {
                        defered.reject(e);
                    }
                }
            });

        return defered.promise;
    }

}

/**
 * 根据电话号码获取uid
 */
function getUidByMt(mt, callBack) {
    memberServiceModel.find({mt: mt})
    // .select('_id')
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);//输出错误信息
            }
            var re = {
                data: {
                    code: "F",
                    msg: "获取用户uid失败"
                }
            };
            if (err || !doc[0]) {
                callBack(re);
            } else {
                re.data.code = 'S';
                re.data.msg = '获取用户uid成功';
                re.data.userData = doc[0]._doc;
                callBack(re);
            }
        });
}

/**
 * 用户头像修改
 */
function editHeaderImg(postObj, callBack) {
    pubFun.baseToImgUrl(postObj.imgData)
        .then(_editHeaderImg)
        .then(_call, _err);

    function _editHeaderImg(re) {
        var defer = q.defer();
        if (re.data && re.data.code == 'S') {
            postObj.headerImg = re.data.imgUrl;
            memberFun.editHeaderImg(postObj).then(function (re2) {
                defer.resolve(re2);
            });
        } else {
            defer.reject('头像入库失败');
        }
        return defer.promise;
    }

    function _call(re) {
        pubFun.pubReturn(false, re, '头像修改成功', '头像修改失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '头像修改失败', callBack);
    }

}

/**
 * 修改用户资料
 */
function userDataEdit(postObj, callBack) {
    memberFun.userDataEdit(postObj).then(_call, _err);

    function _call(re) {
        pubFun.pubReturn(false, re.doc, '修改资料成功', '修改资料失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '头像修改失败', callBack);
    }

}

/**************************
 *  修改用户电话咨询
 * 16/12/12 上午6:22 ByRockBlus
 **************************/
function telType(postObj, callBack) {
    memberFun.telType(postObj).then(_call, _err);

    function _call(re) {
        pubFun.pubReturn(false, re, '修改电话咨询成功', '修改资料失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '修改电话咨询失败', callBack);
    }

}


/**
 * 判断是否有打电话权限
 * @param postObj
 * @param callBack
 */
function trueTelCallCtrl(postObj, callBack) {
    memberFun.trueTelCallFun(postObj).then(_call, _err);

    function _call(re) {
        pubFun.pubReturn(false, re, '查询电话权限成功', '查询电话权限失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '查询电话权限失败', callBack);
    }

}


/**
 * 查询电话
 */
function getUserTelCtrl(postObj, callBack) {
    memberFun.getUserTelFun(postObj).then(_call, _err);

    function _call(re) {
        pubFun.pubReturn(false, re, '查询电话成功', '查询电话失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '查询电话失败', callBack);
    }

}

/**
 * 获取技能详情_根据id
 */
function getKillContent(postObj, callBack) {
    snsArticleFun.getKillContent(postObj)
    //获取技能图片
        .then(getImgS)
        //根据uid获取此用户的所有成交订单 postObj.allOrderId
        .then(bindUserCtrl.getAllOrderIdbyBindUIdCtrl)
        //获取所有order的评价 data.userPingJia ,条件type 选需求方 orderid
        .then(pingJiaCtrl.getAllOrderNeedPingJiaCtrl)
        .then(_call, _err);
    //获取技能图片
    function getImgS(re) {
        var defer = q.defer();
        snsArticleFun.getKillImgs(re.thisJiNeng.killRoundId, re.userData._id).then(function (reImgs) {
            re.thisJiNeng.imgs = reImgs;
            defer.resolve(re);
        }, function (err) {
            defer.reject(JSON.stringify(err));
        });
        return defer.promise;
    }

    function _call(re) {
        var reData = {
            _doc: re
        };
        pubFun.pubReturn(false, reData, '技能获取成功', '技能获取失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '技能获取失败', callBack);
    }

}


/**
 * 订单详情
 * uid
 * orderId
 */
function getOrderFromContent(postObj, callBack) {
    needFromFun.getOrederContentFun(postObj)
    //判断当前用户的userType 1公共 2技能 3需求 userType
        .then(bindUserCtrl.trueUserTypeCtrl)
        .then(pingJiaCtrl.findPingJiaByOrderIdCtrl)
        //判断当前uid是否评价了 pingJiaTrue
        .then(pingJiaCtrl.trueThisUidIsPingJiaCtrl)
        //获取当前用户的所有orderId data.allOrderList
        .then(needFromFun.getAllOrderIdFun)
        //获取所有order的评价 data.userPingJia ,条件type 需求方评价判断 orderid
        .then(pingJiaCtrl.getAllOrderPingJiaCtrl)
        .then(_call, _err);
    function _call(re) {
        var reData = {
            _doc: re
        };
        pubFun.pubReturn(false, reData, '订单详情获取成功', '订单详情获取失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '订单详情获取失败', callBack);
    }
}


/**
 * 下单
 */
function xiaDan(postObj, callBack) {
    snsArticleFun.xiaDanFun(postObj).then(_call, _err);
    function _call(re) {
        pubFun.pubReturn(false, re, '下单成功', '下单失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '下单失败', callBack);

    }
}

/**
 * 接单
 */
function jieDan(postObj, callBack) {
    snsArticleFun.jieDanFun(postObj).then(_call, _err);
    function _call(re) {
        pubFun.pubReturn(false, re, '接单成功', '接单失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '接单失败', callBack);

    }
}


/**
 * 判断技能id是否被当前uid下单
 */
function trueXianDan(postObj, callBack) {
    snsArticleFun.trueXianDanFun(postObj).then(_call, _err);
    function _call(re) {
        if (re.trueIsHave) {//没有下单
            re.data = true;
            pubFun.pubReturn(false, re, '当前用户已经对当前技能下单', '当前用户没有对当前技能下单', callBack);
        } else {
            pubFun.pubReturn(re, {}, '', '当前用户没有对当前技能下单', callBack);
        }
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '是否下单获取失败', callBack);
    }
}

/**
 * 判断orderId是否被当前uid接单
 */
function trueJieDan(postObj, callBack) {
    snsArticleFun.trueJieDanFun(postObj).then(_call, _err);
    function _call(re) {
        if (re.trueIsHave) {//没有接单
            re.data = true;
            pubFun.pubReturn(false, re, '当前用户已经对当前订单接单', '', callBack);
        } else {
            pubFun.pubReturn(re, {}, '', '当前用户没有对当前订单接单', callBack);
        }
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '是否接单获取失败', callBack);
    }
}

/**
 * 我的订单
 *postObj.jiNengOrderList = [];//被动接单,点击下单 bindUsertype  2
 *postObj.needOrderList = {jieDanOrder: [],jieDanCount: 0,//正常接单统计};//需求orderList 主动接单 bindUsertype 1
 *postObj.selectOrderList = [];//成交订单 被选单 bindUserType 3
 *postObj.loseOrderList = [];//失效订单 超时 选其他人
 * 0.根据uid取技能订单列表的订单id 与 对应关系 ,返回4种 状态 的 技能 订单
 * 1.jiNengOrderList 取技能订单列表
 * 2.needOrderList 取需求订单列表
 */
function getOrderFromListCtrl(postObj, callBack) {

    bindUserCtrl.getJiNengListOrderIdCtrl(postObj)// postObj.jiNengOrderList 返回当前uid的 接单 order  被动接单,点击下单 主动接单 bindUsertype 1 2
        .then(bindUserCtrl.getNeedListOrderIdCtrl)//返回当前uid的 需求 order 包括统计
        // snsArticleFun.jiNengOrderListFun(postObj)
        //     .then(needFromFun)
        .then(_call, _err);
    function _call(re) {
        var reEnd = {};
        reEnd.data = re;
        pubFun.pubReturn(false, reEnd, '订单列表获取成功', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '订单列表获取失败', callBack);
    }
}

/**
 * 选单, postobj.bindUid postObj.orderI
 * 1.修改对应关系, 根据orderid 其他对应关系 都改为失效。当前uid 对应关系改为 3选单
 * 2.修改订单状态 为3选单
 */
function selectOrderFromCtrl(postObj, callBack) {
    bindUserCtrl.changeSelectOrderFromCtrl(postObj)
        .then(bindUserCtrl.changeSelectOrderFromNextCtrl)
        .then(needFromFun.editOrderStateFun(postObj, 3))
        .then(_call, _err);

    function _call(re) {
        var endRe = {
            data: re
        };
        pubFun.pubReturn(false, endRe, '选单成功', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '选单失败', callBack);
    }
}

/**
 * 修改已经读取过订单 标记
 * @param postObj.orderId
 * @param callBack
 */
function editIsReatMarkCtrl(postObj, callBack) {
    bindUserCtrl.editIsReatMarkCtrl(postObj)
        .then(_call, _err);

    function _call(re) {
        pubFun.pubReturn(false, re, '成功', '', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '选单失败', callBack);
    }
}

module.exports = fun;





