/**
 * 请求及时通讯api接口
 */

var request = require('request'); //curl 控件

var fun = {
    getOnLine: getOnLine,//获取在线状态
    noReadNewsCount: noReadNewsCount,//获取im用户未读消息数量
};

/**
 * 获取在线状态
 * @param uidArr
 * @param callback
 */
function getOnLine(uidArr, callback) {
    request({
            method: 'POST',
            url: 'https://leancloud.cn/1.1/rtm/online',
            headers: {
                "X-LC-Id": "jFnAKF8oIWzB7INn2GpNyPAt-gzGzoHsz",
                "X-LC-Key": "4ccVMUdWz7PjOn42v7grgxXD,master",
                "Content-Type": "application/json"
            },
            body: '{"peers": ' + JSON.stringify(uidArr) + '}'
        },
        function (error, response, bodyRe) {
            try {
                if (response.statusCode == 200) {
                    callback(JSON.parse(bodyRe));
                } else {
                    console.log('responseCode', response.statusCode);
                }
            } catch (e) {
                console.log('eeee', e);
            }
        }
    );

}

/**
 * 获取im用户未读消息数量
 * @param uid
 * @param callback
 */
function noReadNewsCount(uid, callback, errCall) {

    request({
            method: 'GET',
            url: 'https://leancloud.cn/1.1/rtm/messages/unread/' + uid,
            headers: {
                "X-LC-Id": "jFnAKF8oIWzB7INn2GpNyPAt-gzGzoHsz",
                "X-LC-Key": "OvRQhBzP5fW4Uer1gLfPbpzl",
                "Content-Type": "application/json"
            }
        },
        function (error, response, bodyRe) {
            try {
                if (response.statusCode == 200) {
                    callback(JSON.parse(bodyRe));
                } else {
                    errCall(response.statusCode);
                    console.log('responseCode', response.statusCode);
                }
            } catch (e) {
                errCall(e);
            }
        }
    );
}


module.exports = fun;





