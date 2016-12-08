var snsArticleModel = require('../model/snsArticle.g.model');
var killFromImgModel = require('../model/killFromImg.g.model');
var q = require('q');//异步编程对象

var fun = {
    killAdd: killAdd,//添加一条技能
    getOneKill: getOneKill,//判断订单是否存在,防止重复提交 ,传 killRoundId,
    addKillFromImg: addKillFromImg,//添加技能图片
    delKillImg: delKillImg,//删除技能图片
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

module.exports = fun;
