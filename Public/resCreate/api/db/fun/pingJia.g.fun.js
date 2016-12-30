var pingJiaModel = require('../model/pingJia.g.model');
var q = require('q');//异步编程对象

var fun = {
    addPingJiaFun: addPingJiaFun,//添加一条评价
};

/**************************
 *   添加一条评价
 * 16/12/29 下午8:09 ByRockBlus
 **************************/
function addPingJiaFun(postObj) {
    pingJiaModel.create({
        orderId: postObj.orderId,
        uid: postObj.uid,
        type: postObj.type,//1order方 2技能方 ,此type是 用binduser 判断出来的
        content: postObj.content,
    })
}

module.exports = fun;






