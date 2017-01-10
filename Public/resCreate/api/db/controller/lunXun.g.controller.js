/**
 * lunXun ctrl
 */

var liveMemberCtrl = require('../controller/liveMember.g.controller');//liveMember
var imCtrl = require('../controller/imApi.imApi.controller');//im
var pubFun = require('../fun/pub.g.fun');//公共方法
var q = require('q');

var fun = {
    lunXunStart: lunXunStart,//启动轮询
};

/**
 * -------------------------具体方法-----------------
 *  */
function lunXunStart(postObj) {
    if (postObj.passWord === 'HDZrockblus8') {
        setInterval(function () {
            var tempLiveMemberSkip = 0;//循环去取member前多少名,去api 取 在线统计
            console.log('遍历在线用户,去api 取有没有 新消息');
            //遍历在线用户,去api 取有没有 新消息
        }, 6000);
    }
}


module.exports = fun;





