/**
 * lunXun ctrl
 */

var liveMemberCtrl = require('../controller/liveMember.g.controller');//liveMember
var imCtrl = require('../controller/imApi.imApi.controller');//im
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
    //遍历请求接口去获取在线用户有没有未读消息
    eachHaveNews(postObj);

}

/**
 * 遍历请求接口去获取在线用户有没有未读消息,1秒查询1个用户
 */
function eachHaveNews(postObj) {
    if (postObj.passWord === 'HDZrockblus8') {
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
}


module.exports = fun;





