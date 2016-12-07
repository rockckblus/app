var needFromModel = require('../model/needFrom.g.model');
var q = require('q');//异步编程对象
var moment = require('moment');//日期插件

var fun = {
    needAdd: needAdd,//添加一条需求
    getOneFrom: getOneFrom,//判断需求是否存在,防止重复提交 ,传 fromRoundId,

};

/**
 * 添加一条需求
 * @param postObj
 */
function needAdd(postObj) {
    var defer = q.defer();
    if (!postObj.price) {//如果价格为空,修改 单位为面议
        postObj.priceUnit = '3';
        postObj.price = '';
    }
    if (postObj.cityBuXian) {//城市输入如果选不限，就忽略city字段
        postObj.city = "不限";
    }


    needFromModel.create({
            needRoundId: postObj.needRoundId,//随机id 仿制重复提交
            uid: postObj.uid,
            title: postObj.title,//需求标题
            content: postObj.content,//需求介绍
            attr: {
                price: postObj.price,//价格
                priceUnit: postObj.priceUnit,//价格单位
            },//属性
            endTime: getEndTime(postObj.endTime),//计算出来的最后过期时间
            cityBuXian: postObj.cityBuXian,//城市输入如果选不限，就忽略city字段
            city: postObj.city,//城市

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
 * 转换有效期,返回最后日期
 */
function getEndTime(dayStr) {

    switch (dayStr) {
        case '0'://3天
            return moment().add(3, 'day');
        case '1'://1周
            return moment().add(7, 'day');
        case '2'://1个月
            return moment().add(30, 'day');
        default://3
            return moment().add(3, 'day');
    }
}

/**
 * 判断订单是否存在,防止重复提交 ,传 killRoundId,
 */
function getOneFrom(needRoundId) {
    var defer = q.defer();
    needFromModel.findOne({needRoundId: needRoundId}).exec(function (err, doc) {
        var reData = {};
        if (err) {
            defer.reject(JSON.stringify(err));
        } else {
            if (doc && doc._doc && doc._doc.needRoundId) {
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

module.exports = fun;
