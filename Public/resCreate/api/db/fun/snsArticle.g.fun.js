var snsArticleModel = require('../model/snsArticle.g.model');
var q = require('q');//异步编程对象

var fun = {
    killAdd: killAdd,//添加一条技能
    getOneKill: getOneKill,//判断订单是否存在,防止重复提交 ,传 killRoundId,
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
            defer.resolve({err: err, doc: doc});
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
        defer.resolve({err: err, doc: reData});
    });
    return defer.promise;
}

module.exports = fun;
