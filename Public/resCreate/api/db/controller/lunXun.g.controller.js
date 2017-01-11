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
        var memberId;
        setInterval(function () {
            console.log('遍历在线用户,去api 取有没有 新消息');
            //遍历在线用户,去api 取有没有 新消息
            liveMemberCtrl.findOneLiveMemberCtrl(memberId)
            //变换memberId
                .then(changeMemberId);

            //变换memberId
            function changeMemberId(re) {
                console.log('re', re);
                if (re === null) {
                    memberId = undefined;
                } else {
                    memberId = re.uid;
                }
            }

        }, 6000);
    }
}


module.exports = fun;





