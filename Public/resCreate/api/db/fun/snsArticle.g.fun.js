var snsArticleModel = require('../model/snsArticle.g.model');
var killFromImgModel = require('../model/killFromImg.g.model');
var memberModel = require('../model/member.g.model');
var mumberFun;
var needFromFun = require('../fun/needFrom.g.fun');
var orderFromBindUserCtrl = require('../controller/orderFromBindUser.g.controller');//订单用户对应关系 ctrl
var q = require('q');//异步编程对象
var g = require('../../g.config');
var pub = require('../fun/pub.g.fun');//公共方法
var fun = {
    killAdd: killAdd,//添加一条技能
    getOneKill: getOneKill,//判断订单是否存在,防止重复提交 ,传 killRoundId,
    addKillFromImg: addKillFromImg,//添加技能图片
    delKillImg: delKillImg,//删除技能图片
    getKillContent: getKillContent,//获取技能详情_根据id
    homeGetListFun: homeGetListFun,//获取首页技能列表
    getUserIdKillList: getUserIdKillList,//查询用户发布的所有 技能
    getKillImgs: getKillImgs,//技能图片选择
    xiaDanFun: xiaDanFun,//下单
    jieDanFun: jieDanFun,//接单
    trueXianDanFun: trueXianDanFun,//判断技能id是否被当前uid下单
    trueJieDanFun: trueJieDanFun,//判断orderId是否被当前uid接单
    upDateKillGpsFun: upDateKillGpsFun,//更新uid下的 技能表 会员资料字段,gpsSearch,sex,hot,live
    trueFirstKill: trueFirstKill,//判断是否第一次发布技能
    myKillFun: myKillFun,//我的技能
    delKillFun: delKillFun,//删除一条技能
    setMasterFun: setMasterFun,//设置主技能
};

/**
 * 添加一条技能
 * @param postObj
 * @returns {l.promise|{then, catch, finally}|*|deferred.promise|promise.promise|jQuery.promise}
 */
function killAdd(postObj) {
    var defer = q.defer();
    switch (postObj.sex) {
        case '0':
            postObj.sex = '女';
            break;
        case '1':
            postObj.sex = '男';
            break;
        default:
            postObj.sex = '女';
            break;
    }
    if (!postObj.price) {//如果价格为空,修改 单位为面议
        postObj.priceUnit = '3';
    }
    var gpsArea = {};
    var gpsSearch = [0, 0];
    var cityCode = 777;
    if (postObj.areaGps) {
        gpsArea = postObj.areaGps;
        if (postObj.areaGps && postObj.areaGps.gpsObj && postObj.areaGps.gpsObj.lat) {
            gpsSearch[0] = postObj.areaGps.gpsObj.lng;
            gpsSearch[1] = postObj.areaGps.gpsObj.lat;
        }
    }
    if (postObj.areaGps && postObj.areaGps.city && postObj.areaGps.city.cityCode) {
        cityCode = postObj.areaGps.city.cityCode;
    }

    //判断是否是第一条技能,如果是,就给master:true
    trueFirstKill(postObj.uid).then(function (re) {
        var master = false;
        if (re && !re[0]) {
            master = true;
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
                cityCode: cityCode,//城市编码
                gpsArea: gpsArea,//gps位置
                gpsSearch: gpsSearch,//monogo索引地理位置坐标
                sex: postObj.sex,//性别
                hot: postObj.hot,//人气
                live: postObj.live,//热度
                master: master,//主技能
            }, function (err, doc) {
                if (err) {
                    defer.resolve(JSON.stringify(err));
                } else {
                    defer.resolve({err: err, doc: doc});
                }
            }
        );
    });

    return defer.promise;
}

/**
 * 删除一条技能
 */
function delKillFun(postObj) {
    var defer = q.defer();
    if (postObj.killId) {
        snsArticleModel.update(
            {
                _id: postObj.killId,
                uid: postObj.uid,
                master: false
            },
            {
                state: 0
            },
            {}, function (err, doc) {
                if (err) {
                    defer.reject(JSON.stringify(err));
                } else {
                    var reData = {
                        doc: {
                            data: {
                                code: 'S', msg: '删除技能成功'
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
    }

    return defer.promise;
}

/**
 * 设置主技能
 */
function setMasterFun(postObj) {
    var defer = q.defer();
    _setMasterFalse(postObj).then(function (reObj) {
        snsArticleModel.update(
            {
                _id: reObj.killId,
                uid: reObj.uid,
                master: false
            },
            {
                master: true
            },
            {}, function (err, doc) {
                if (err) {
                    defer.reject(JSON.stringify(err));
                } else {
                    var reData = {
                        doc: {
                            data: {
                                code: 'S', msg: '设置主技能成功'
                            }
                        }
                    };
                    if (doc.ok == 1) {
                        reData.doc.data.code = 'S';
                        reData.doc.data.msg = '设置主技能成功';
                        defer.resolve(reData);
                    } else {
                        defer.reject('设置主技能失败');
                    }
                }
            });
    }, function (err) {
        defer.reject(err);
    });

    return defer.promise;
}

/**
 * 修改主技能 master 为 false
 */
function _setMasterFalse(postObj) {
    var defer = q.defer();
    if (postObj.killId) {
        snsArticleModel.update(
            {
                uid: postObj.uid,
                master: true,
                state: 1
            },
            {
                master: false
            },
            {}, function (err, doc) {
                if (err) {
                    defer.reject(JSON.stringify(err));
                } else {
                    if (doc.ok == 1) {
                        defer.resolve(postObj);
                    } else {
                        defer.reject('修改master失败');
                    }
                }
            });
    }

    return defer.promise;
}

/**************************
 * 获取我的技能，传 obj.uid
 * 16/12/26 下午10:07 ByRockBlus
 **************************/
function myKillFun(postObj) {
    var defer = q.defer();
    snsArticleModel.find({uid: postObj.uid, state: 1})
        .select('_id title master')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(doc);
            }
        });
    return defer.promise;
}

/**
 * 判断是否是第一条技能,如果是,就给master:true
 */
function trueFirstKill(uid) {
    var defer = q.defer();
    snsArticleModel.find({uid: uid}).exec(function (err, doc) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(doc);
        }
    });
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
                    reDoc.thisJiNeng.serviceNum = doc[0]._doc.attr.service;

                    getUserIdKillList(doc[0].uid._id, doc[0]._id).then(function (doc) {//取用户发布的其他
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
 * @param killId 必穿false  如果有技能id 就返回排除这个 id的其他技能
 * @param userId
 */
function getUserIdKillList(userId, killId, vo) {
    var defer = q.defer();
    var where = {
        uid: userId,
        state: 1
    };

    if (killId) {
        where._id = {$ne: killId};
    }

    snsArticleModel.find(where)
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
            if (vo) {
                doc.vo = vo;
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
function getKillImgs(killRoundId, uid, vo) {
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
            var endRe = {
                vo: '',
                imgArr: []
            };
            for (var i in doc) {
                reArr.push(g.host.imageHost + doc[i].imgUrl);
            }
            if (vo) {//hack 传入循环返回 标示
                endRe.vo = vo;
                endRe.imgArr = reArr;
                defer.resolve(endRe);
            } else {
                defer.resolve(reArr);
            }
        }
    });
    return defer.promise;
}

/**
 *下单
 */
function xiaDanFun(postObj) {
    var defer = q.defer();
    //获取当前的订单详情,组合数据去添加一条需求
    trueXianDanFun(postObj)//判断技能id是否被当前uid下单
        .then(__trueGetOne)//判断重复之后逻辑
        .then(getKillContent)//获取订单详情
        .then(_editData)//组合需求订单数据
        .then(_add)//入库需求订单
        .then(_editBindUserData)//编辑订单用户关系入库数据
        .then(_call, _err);//return promis

    // 判断need重复
    function __trueGetOne(re) {
        var ___defer = q.defer();
        if (re.trueIsHave) {//当前uid已经对技能下单,阻止入库需求
            ___defer.reject('当前uid已经对技能下单');
        } else {//否则去入库需求
            ___defer.resolve(postObj);
        }
        return ___defer.promise;
    }

    /**
     * 组合数据
     * @param re
     * @private
     */
    function _editData(re) {
        var _defer = q.defer();
        if (re.thisJiNeng) {
            if (re.userData && re.userData._id) {
                postObj.jinengUid = re.userData._id;//给postObj一个 技能方 id
            } else {
                _defer.reject('技能详情用户uid获取失败');
            }
            var city = '不限';
            var gpsArea = [0, 0];
            if (postObj.areaGps && postObj.areaGps.gpsObj && postObj.areaGps.gpsObj.lat) {
                gpsArea = [postObj.areaGps.gpsObj.lng, postObj.areaGps.gpsObj.lat];
            }
            if (re.thisJiNeng.uid.city) {
                city = re.thisJiNeng.uid.city;
            }
            var postData = {
                needRoundId: postObj.needRoundId,
                uid: postObj.uid,
                title: re.thisJiNeng.title,//需求标题
                content: '',
                attr: {
                    price: re.thisJiNeng.price,//价格
                    priceUnit: re.thisJiNeng.attr.priceUnit,//价格单位
                },//属性
                endTime: needFromFun.getEndTime('0'),//给有效期3天
                city: city,
                cityCode: re.thisJiNeng.cityCode,
                service: re.thisJiNeng.serviceNum,//服务方式
                gpsSearch: gpsArea,//mongo 地理位置
            };
            _defer.resolve(postData);
        } else {
            _defer.reject('技能详情获取失败');
        }
        return _defer.promise;
    }

    //入库需求
    function _add(postObjEnd) {
        var __defer = q.defer();
        if (postObj.areaGps) {
            mumberFun = mumberFun || require('../fun/member.g.fun');
            mumberFun.upUserGpsArea(postObj.areaGps, postObj.uid);//更新gps数据
        }
        needFromFun.needAdd(postObjEnd).then(function (re) {
            __defer.resolve(re);
        }, function (err) {
            __defer.reject(JSON.stringify(err));
        });
        return __defer.promise;
    }

    //编辑订单用户关系入库数据
    function _editBindUserData(re) {
        var ____defer = q.defer();
        if (re.doc && re.doc._id) {//新添加的需求订单id
            var bindUserData = {
                orderId: re.doc._id,
                orderUid: postObj.uid,
                bindUid: postObj.jinengUid,
                jiNengId: postObj.jiNengId
            };
            orderFromBindUserCtrl.addOneBindUser(bindUserData, 2).then(function (re2) {
                ____defer.resolve(re2);
            }, function (err) {
                ____defer.reject('添加对应关系失败!');
            });
        } else {
            ____defer.reject('添加需求订单未返回id');
        }
        return ____defer.promise;
    }

    function _call(re) {
        defer.resolve(re);
    }

    function _err(err) {
        defer.reject(err);
    }

    return defer.promise;
}

/**
 *接单
 *0.根据orderId获取订单的uid
 *1.判断接单的重复id 订单id 订单uid 技能uid 是否存在,
 *
 *2.入库订单用户关系
 * 3.    //修改订单表的 订单状态为 2 接单
 */
function jieDanFun(postObj) {
    var defer = q.defer();

    needFromFun.getOrderUidFun(postObj)//根据orderId获取订单的uid
        .then(orderFromBindUserCtrl.trueIsHave)//判断接单的重复id 订单id 订单uid 技能uid 是否存在 返回 postObj.trueIsHav = true
        .then(_editBindUserData)//编辑订单用户关系入库数据
        .then(_editOrderState)//修改订单表的 订单状态为 2 接单
        .then(_call, _err);

    //修改订单表的 订单状态为 2 接单
    function _editOrderState(re3) {
        var deferE = q.defer();
        needFromFun.editOrderStateFun(re3, 2)
            .then(function (re4) {
                deferE.resolve(re4);
            }, function (err) {
                deferE.reject(err);
            });
        return deferE.promise;
    }


    //编辑订单用户关系入库数据
    function _editBindUserData(re) {
        var ____defer = q.defer();
        if (!re.trueIsHave) {//判断如果没有进对应关系表就新建对应关系
            var bindUserData = {
                orderId: re.orderId,
                orderUid: re.orderUid,
                bindUid: re.uid
            };
            orderFromBindUserCtrl.addOneBindUser(bindUserData, 1).then(function (re2) {
                ____defer.resolve(re2);
            }, function (err) {
                ____defer.reject('添加对应关系失败!');
            });
        } else {
            ____defer.reject('添加需求订单对应关系已经存在');
        }
        return ____defer.promise;
    }


    function _call(doc) {
        defer.resolve(doc);
    }

    function _err(err) {
        defer.reject(err);
    }

    return defer.promise;
}

/**
 *判断技能id是否被当前uid下单
 */
function trueXianDanFun(postObj) {
    var defer = q.defer();
    var findObj = {
        jiNengId: postObj.jiNengId,
        uid: postObj.uid,
    };

    orderFromBindUserCtrl.trueXianDanBindUser(findObj).then(_call, _err);

    function _call(doc) {
        defer.resolve(doc);
    }

    function _err(err) {
        defer.reject(err);
    }

    return defer.promise;
}

/**
 *判断orderId是否被当前uid接单
 */
function trueJieDanFun(postObj) {
    var defer = q.defer();
    var findObj = {
        orderId: postObj.orderId,
        bindUid: postObj.uid,
    };

    orderFromBindUserCtrl.trueJieDanBindUser(findObj).then(_call, _err);

    function _call(doc) {
        defer.resolve(doc);
    }

    function _err(err) {
        defer.reject(err);
    }

    return defer.promise;
}

/**
 * 获取首页技能列表
 */
function homeGetListFun(postObj) {
    var defer = q.defer();
    var whereCondition = {master: true}; //where条件 ,默认先找到1条主展示技能
    var sortStr = '_id';//排序条件 留空就是 按距离

    //下拉 翻页 find next 查出当前 的 下10条数据
    if (postObj.endId !== 0) {
        whereCondition._id = {};
        whereCondition._id.$gt = postObj.endId;
    }


    try {//如果是附近搜索
        if (postObj.condition.area.city.cityCode == '777') {//如果是附近搜索
            whereCondition.gpsSearch = {
                $near: [postObj.condition.areaGps.gpsObj.lng, postObj.condition.areaGps.gpsObj.lat]
            };
        } else {//按照城市搜索
            whereCondition.cityCode = postObj.condition.area.city.cityCode;
            whereCondition.gpsSearch = {
                $near: [postObj.condition.areaGps.gpsObj.lng, postObj.condition.areaGps.gpsObj.lat]
            };
        }
    } catch (e) {
        console.error(e);
    }

    //如果有搜索关键词
    if (postObj.condition && postObj.condition.searchKey) {
        whereCondition.$or = [
            {
                title: {
                    $regex: postObj.condition.searchKey
                }
            },
            {
                content: {
                    $regex: postObj.condition.searchKey
                }
            }

        ];


        //下面为中文全文检索,mongo3.4测试未成功,中文不能分词
        // whereCondition.$text = {$search: postObj.condition.searchKey, $language: "hans"};
        // whereCondition.score = {$meta: "textScore"};
        // delete whereCondition.gpsSearch;
        delete whereCondition.master;
    }

    //如果有筛选
    if (postObj.condition && postObj.condition.clickShaiXuan && postObj.condition.clickShaiXuan[0]) {
        for (var vo in postObj.condition.clickShaiXuan) {
            giveShaiXuanWhere(postObj.condition.clickShaiXuan[vo]);//根据筛选给where条件
        }
    }

    snsArticleModel.find(whereCondition)
        .populate(
            {
                'path': 'uid',
                'model': memberModel,
                'select': 'headerImg name'
            }
        )
        .sort(sortStr)
        .limit(10)
        .select('uid title gpsSearch attr content sex master killRoundId type')
        .exec(function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                if (doc[0]) {
                    var isHaveGps = false;
                    if (postObj.condition && postObj.condition.areaGps && postObj.condition.areaGps.gpsObj && postObj.condition.areaGps.gpsObj.lng) {
                        isHaveGps = true;
                    }
                    for (var vo in doc) {
                        //如果有gps信息就去计算距离
                        if (isHaveGps) {
                            doc[vo]._doc.far = pub.farGps(postObj.condition.areaGps.gpsObj.lat, postObj.condition.areaGps.gpsObj.lng, doc[vo].gpsSearch[1], doc[vo].gpsSearch[0]);
                        } else {
                            doc[vo]._doc.far = 0;
                        }

                        //如果有头像
                        if (doc[vo]._doc && doc[vo]._doc.uid && doc[vo]._doc.uid.headerImg) {
                            doc[vo]._doc.listHeader = g.host.imageHost + doc[vo]._doc.uid.headerImg;
                        } else {
                            doc[vo]._doc.listHeader = '';
                        }

                        //如果有 attr
                        if (doc[vo]._doc && doc[vo]._doc.attr) {
                            doc[vo]._doc.price = doc[vo]._doc.attr.price;
                            doc[vo]._doc.danWei = pub.getDefaultVal('kill_priceUnit', doc[vo]._doc.attr.priceUnit);
                        }

                        //des
                        doc[vo]._doc.des = doc[vo]._doc.content;

                        getKillImgs(doc[vo]._doc.killRoundId, doc[vo]._doc.uid, vo).then(_getImgs, _getImgsErr);
                    }
                } else {
                    defer.reject('暂无数据');
                }
            }

            function _getImgs(imgArr) {
                doc[imgArr.vo]._doc.imgs = imgArr.imgArr;
                if (imgArr.vo == (doc.length - 1)) {
                    defer.resolve(doc);
                }
            }

            function _getImgsErr(err) {
                defer.resolve(doc);
            }

        });

    /**
     *根据筛选给where条件
     */
    function giveShaiXuanWhere(vo) {
        switch (vo) {
            case 'homeShaiXuanThree1' :
                whereCondition.sex = '男';
                break;
            case 'homeShaiXuanThree2' :
                whereCondition.sex = '女';
                break;
            case 'homeShaiXuanOne3' ://人气排序
                sortStr = 'hot';
                break;
            case 'homeShaiXuanTwo4' ://活跃度排序
                sortStr = 'live';
                break;
        }
    }

    return defer.promise;

}

/**
 * 更新uid下的 技能表 会员资料字段,gpsSearch,sex,hot,live
 * 传 obj.uid
 * 传 obj.gpsSearch [lng,lat]
 * 传 obj.sex '男'
 * 传 obj.hot Number 热度
 * 传 obj.live Number 活跃度
 */
function upDateKillGpsFun(obj) {
    var defer = q.defer();
    var saveObj = {};
    if (obj.gpsSearch) {
        saveObj.gpsSearch = obj.gpsSearch;
    }
    if (obj.sex) {
        saveObj.sex = obj.sex;
    }
    if (obj.hot) {
        saveObj.hot = obj.hot;
    }
    if (obj.live) {
        saveObj.live = obj.live;
    }
    snsArticleModel.update({uid: obj.uid}, saveObj, {multi: true}, function (err, doc) {
        if (err) {
            defer.reject(JSON.stringify(err));
        } else {
            defer.resolve(doc);
        }
    });
    return defer.promise;
}

module.exports = fun;
