/**
 * snsArticle 社区文章表 contrller
 */

/**
 * sns 文章 模型
 * */
var snsArticleModel = require('../model/snsArticle.g.model');
var g = require('../../g.config');

var fun = {
    addOneArticle: addOneArticle,//添加一条技能
    getList: getList,//get 多条
    addKill: addKill,//添加一条技能
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 添加一条文章
 * @param { Object }postObj
 * @param {function 成功回调}callBack
 * @param {function 错误回调}errCallBack
 *
 */
function addOneArticle(postObj, callBack, errCallBack) {
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


        }, function (err, small) {
            if (err) {
                g.alert(err);
                errCallBack(err);
            } else {
                callBack(small[0]);
            }
        }
    );
}


/**
 * 根据post上拉,下拉返回
 * @param postObj
 * @param callBack
 */
function getList(postObj, callBack) {

    var whereCondition = {};
    if (postObj.endId) {//下拉 find next 查出当前 的 上一条数据
        whereCondition = {
            '_id': {
                '$lt': postObj.endId
            },
            'type': postObj.type

        };
    }

    else if (postObj.frontId) {//下拉 find next 查出当前 的 上一条数据
        whereCondition = {
            '_id': {
                '$gt': postObj.frontId
            },
            'type': postObj.type
        };
    }

    else {
        whereCondition = {
            'type': postObj.type
        };
    }
    snsArticleModel.find(whereCondition)
        .limit(10)
        .sort('-editTime')
        .exec(callBack);
}


/**
 * 添加一条技能 ,如果有补充会员资料,去更新会员资料
 * @param body
 * @param callBack
 * @param callBackErr
 */
function addKill(postObj, callBack, callBackErr) {
    if (!postObj.price) {//如果价格为空,修改 单位为面议
        postObj.priceUnit = '3';
    }
    getOneKill(postObj.killRoundId, function (re) {
        if (!re) {
            _add();
        } else {
            callBack(
                {
                    data: {
                        code: 'F',
                        msg: '不要重复提交'
                    }
                }
            );
        }
    });


    function _add() {
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
            }, function (err, small) {
                if (err) {
                    g.alert(err);
                    callBackErr({
                        data: {
                            code: 'F',
                            msg: '添加技能失败'
                        }
                    });
                } else {
                    callBack(
                        {
                            data: {
                                code: 'S',
                                msg: '添加技能成功',
                                doc: small[0]
                            }
                        }
                    );
                }
            }
        );

    }
}

/**
 * 判断订单是否存在,防止重复提交 ,传 killRoundId,
 */
function getOneKill(killRoundId, callBack) {
    snsArticleModel.findOne({killRoundId: killRoundId}).exec(function (err, doc) {
        if (doc && doc._doc && doc._doc.killRoundId) {
            callBack(true);
        } else {
            callBack(false);
        }
    });
}


module.exports = fun;





