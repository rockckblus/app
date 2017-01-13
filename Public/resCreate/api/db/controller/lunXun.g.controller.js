/**
 * lunXun ctrl
 */

var liveMemberCtrl = require('../controller/liveMember.g.controller');//liveMember
var needFromFun = require('../fun/needFrom.g.fun');//needFrom fun
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    lunXunStart: lunXunStart,//启动轮询
    eachHaveNews: eachHaveNews,//遍历请求接口去获取在线用户有没有未读消息
};

/**
 * -------------------------具体方法-----------------
 *  */
function lunXunStart(postObj) {

    if (postObj.passWord === 'HDZrockblus8') {
        //遍历请求接口去获取在线用户有没有未读消息
        eachHaveNews();

        //遍历过期需求,修改需求表 与 用户关系表
        eachTimeOutNeed();

    }
}

/**
 * 遍历请求接口去获取在线用户有没有未读消息,1秒查询1个未请求过接口的个用户  ,此值根据 用户在线情况修改, 和自动删除时间而改变
 */
function eachHaveNews() {
    var _id;
    setInterval(function () {
        //遍历在线用户,去api 取有没有 新消息
        liveMemberCtrl.findOneLiveMemberCtrl(_id)
        //变换memberId
            .then(changeMemberId);

        //变换memberId
        function changeMemberId(re) {
            if (re === null) {
                _id = undefined;
            } else {
                _id = re._id;
            }
        }
    }, 1000);
}

//遍历过期需求,修改需求表 与 用户关系表
function eachTimeOutNeed() {
    var _id;
    setInterval(function () {
        //遍历超时的order
        needFromFun.findOneTimeOutNeedFun(_id)
        //变换memberId
            .then(changeOrderId);

        //变换memberId
        function changeOrderId(re) {
            if (re === null) {
                _id = undefined;
            } else {
                _id = re._id;
            }
        }
    }, 1000);
}

module.exports = fun;





