var snsArticleModel = require('../model/snsArticle.g.model');
var killFromImgModel = require('../model/killFromImg.g.model');
var memberModel = require('../model/member.g.model');
var q = require('q');//异步编程对象
var g = require('../../g.config');
var pub = require('../fun/pub.g.fun');//公共方法
var fun = {
    killAdd: killAdd,//添加一条技能
    getOneKill: getOneKill,//判断订单是否存在,防止重复提交 ,传 killRoundId,
    addKillFromImg: addKillFromImg,//添加技能图片
    delKillImg: delKillImg,//删除技能图片
    getKillContent: getKillContent,//获取技能详情_根据id
    getUserIdKillList: getUserIdKillList,//查询用户发布的所有 技能
    getKillImgs: getKillImgs,//技能图片选择
    xiaDanFun: xiaDanFun,//下单
    trueXianDanFun: trueXianDanFun,//判断技能id是否被当前uid下单
};

/**
 * 添加一条技能
 * @param postObj
 * @returns {l.promise|{then, catch, finally}|*|deferred.promise|promise.promise|jQuery.promise}
 */
function killAdd(postObj) {
    var defer = q.defer();

    if (!postObj.price) {//如果价格为空,修改 单位为面议
        postObj.priceUnit = '3';
    }
    snsArticleModel.create({
            killRoundId: postObj.killRoundId,//随机id 仿制重复提交
            uid: postObj.uid,
            userId: postObj.uid,
            title: postObj.title,//技能标题
            content: postObj.content,//技能介绍
            attr: {
                price: postObj.price,//价格
                priceUnit: postObj.priceUnit,//价格单位
                service: postObj.service,//服务方式
            },//属性
        }, function (err, doc) {
            if (err) {
                defer.resolve(JSON.stringify(err));
            } else {
                defer.resolve({err: err, doc: doc});
            }
        }
    );
    return defer.promise;
}

/**
 * 获取技能详情_根据id ,发节能的用户资料
 * */
function getKillContent(postObj) {
    var defer = q.defer();
    snsArticleModel.find({_id: postObj.jiNengId})
        .populate(
            {
                'path': 'uid',
                'model': memberModel,
            }
        )
        .exec(function (err, doc) {
            var reDoc = {
                userData: {},
                thisJiNeng: {},
                jiNengList: {}
            };
            if (err) {
                defer.reject(err);
            } else {
                if (doc && doc[0] && doc[0].uid && doc[0].uid._doc) {
                    reDoc.userData = doc[0].uid._doc;
                    reDoc.userData.headerImg = g.host.imageHost + reDoc.userData.headerImg;
                    reDoc.userData.mt = pub.changeMt(reDoc.userData.mt);

                    // reDoc.userData.far = pub.farGps(39.911843, 116.390533, 39.079774, 117.172880);//北京到天津117
                    if (postObj.areaGps && postObj.areaGps.lat && reDoc.userData.areaGps && reDoc.userData.areaGps.gpsObj && reDoc.userData.areaGps.gpsObj.lat) {//如果有客户gps 就去计算距离
                        reDoc.userData.far = pub.farGps(postObj.areaGps.lat, postObj.areaGps.lng, reDoc.userData.areaGps.gpsObj.lat, reDoc.userData.areaGps.gpsObj.lng);
                    }
                    reDoc.thisJiNeng = doc[0]._doc;
                    reDoc.thisJiNeng.price = doc[0]._doc.attr.price;
                    reDoc.thisJiNeng.priceUnit = pub.getDefaultVal('kill_priceUnit', doc[0]._doc.attr.priceUnit);
                    reDoc.thisJiNeng.service = pub.getDefaultVal('kill_service', doc[0]._doc.attr.service);

                    getUserIdKillList(doc.userId).then(function (doc) {//取用户发布的其他
                        reDoc.jiNengList = doc;
                        defer.resolve(reDoc);
                    }, function (err) {
                        defer.reject(err);
                    });
                } else {
                    defer.reject('doc为空');
                }
            }
        });
    return defer.promise;
}

/**
 * 查询用户发布的所有 技能
 * @param postObj
 */
function getUserIdKillList(userId) {
    var defer = q.defer();
    snsArticleModel.find({userId: userId, state: 1})
        .select('_id title attr')
        .limit(5)
        .exec(function (err, doc) {
            for (var i in doc) {
                doc[i]._doc.price = doc[i]._doc.attr.price;
                doc[i]._doc.priceUnit = pub.getDefaultVal('kill_priceUnit', doc[i]._doc.attr.priceUnit);
                doc[i]._doc.service = pub.getDefaultVal('kill_service', doc[i]._doc.attr.service);
            }
            if (err) {
                defer.reject(err);
            }
            defer.resolve(doc);
        });
    return defer.promise;
}

/**
 * 判断订单是否存在,防止重复提交 ,传 killRoundId,
 */
function getOneKill(killRoundId) {
    var defer = q.defer();
    snsArticleModel.findOne({killRoundId: killRoundId}).exec(function (err, doc) {
        var reData = {};
        if (err) {
            defer.reject(JSON.stringify(err));
        } else {
            if (doc && doc._doc && doc._doc.killRoundId) {
                reData = {
                    data: {
                        code: 'F',
                        msg: 'id存在,不可以入库'
                    }
                };
            } else {
                reData = {
                    data: {
                        code: 'S',
                        msg: 'id不存在,可以入库'
                    }
                };
            }
        }
        defer.resolve({err: err, doc: reData});
    });
    return defer.promise;
}

/**
 * 添加技能图片*/
function addKillFromImg(postObj) {
    /**
     * 1.find killRoundId , 图片数组排序是否存在, 如果存在,就更新这个图片
     * 2.否则,就添加一个新记录
     */
    var defer = q.defer();
    _trueKillImgIsSet(postObj)
        .then(_trueFun)
        .then(_call, _err);

    function _trueFun(re) {
        var defer2 = q.defer();
        if (!re[0]) {
            _addKillImg(postObj).then(function (re) {
                defer2.resolve(re);
            }, _err);
        } else {
            _upDataKillImg(postObj).then(function (re) {
                defer2.resolve(re);
            }, _err);
        }
        return defer2.promise;
    }

    function _call(re) {
        defer.resolve(re);
    }

    function _err(re) {
        defer.reject(re);
    }

    return defer.promise;

}

/**
 * find killRoundId 并且 图片数组顺序 是否存在
 */
function _trueKillImgIsSet(postObj) {
    var defer = q.defer();
    killFromImgModel.find({killRoundId: postObj.killRoundId, voId: postObj.voId, uid: postObj.uid})
        .exec(function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                defer.resolve(doc);
            }
        });
    return defer.promise;
}

/**
 * 添加图片
 */
function _addKillImg(postObj) {
    var defer = q.defer();
    killFromImgModel.create(
        {
            killRoundId: postObj.killRoundId,
            voId: postObj.voId,
            uid: postObj.uid,
            imgUrl: postObj.imgUrl,
        }, function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                var reData = {
                    doc: {
                        data: {
                            code: 'S', msg: '添加图片成功'
                        }
                    }
                };
                defer.resolve(reData);
            }
        });
    return defer.promise;
}

/**
 * 更新图片
 */
function _upDataKillImg(postObj) {
    var defer = q.defer();
    killFromImgModel.update(
        {
            killRoundId: postObj.killRoundId,
            voId: postObj.voId
        },
        {
            imgUrl: postObj.imgUrl
        },
        {}, function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                var reData = {
                    doc: {
                        data: {
                            code: 'S', msg: '更新图片成功'
                        }
                    }
                };
                if (doc.ok == 1) {
                    reData.doc.data.code = 'S';
                    reData.doc.data.msg = '更新图片成功';
                    defer.resolve(reData);
                } else {
                    defer.reject('更新图片失败');
                }
            }
        });

    return defer.promise;
}

/**
 * 删除图片
 */
function delKillImg(postObj) {
    var defer = q.defer();
    killFromImgModel.remove({
        killRoundId: postObj.killRoundId,
        uid: postObj.uid,
        voId: postObj.voId
    }, function (err, doc) {
        if (err) {
            defer.reject({
                data: {
                    code: 'F',
                    msg: '删除技能图片失败'
                }
            });
        }
        if (doc && doc.result && doc.result.n == 1) {
            defer.resolve({
                data: {
                    code: 'S',
                    msg: '删除技能图片成功'
                }
            });
        } else {
            defer.reject('图片不存在');
        }
    });

    return defer.promise;
}

/**
 * 技能图片选择
 * 传 uid,killRoundId
 */
function getKillImgs(killRoundId, uid) {
    var defer = q.defer();
    killFromImgModel.find(
        {
            killRoundId: killRoundId,
            uid: uid
        }).exec(function (err, doc) {
        if (err) {
            defer.reject(JSON.stringify(err));
        } else {
            var reArr = [];
            for (var i in doc) {
                reArr.push(g.host.imageHost + doc[i].imgUrl);
            }
            defer.resolve(reArr);
        }
    });
    return defer.promise;
}

/**
 *下单
 */
function xiaDanFun(postObj) {

}


/**
 *判断技能id是否被当前uid下单 todo
 */
function trueXianDanFun(postObj) {

}

module.exports = fun;
