/**
 * 请求及时通讯api接口
 */

var request = require('request'); //curl 控件
var q = require('q');//异步编程对象

var Realtime = require('leancloud-realtime').Realtime;//im
var TextMessage = require('leancloud-realtime').TextMessage;//im

var fun = {
    getOnLine: getOnLine,//获取在线状态
    noReadNewsCount: noReadNewsCount,//获取im用户未读消息数量
    getMemberListCtrl: getMemberListCtrl,//
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
                    console.log('bodyReOk', bodyRe);
                } else {
                    errCall(response.statusCode);
                    console.log('responseCode', response.statusCode);
                }
            } catch (e) {
                if (errCall) {
                    errCall(e);
                }
            }
        }
    );
}

/**
 * 请求接口获取未读统计的数量,返回 未读信息的 数据
 * @param cid 用户id
 * @returns {*}
 */
function getMemberList(cid) {
    var defer = q.defer();

// 应用 ID，用来识别应用
    var APP_ID = 'jFnAKF8oIWzB7INn2GpNyPAt-gzGzoHsz';

// 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
    var APP_KEY = 'OvRQhBzP5fW4Uer1gLfPbpzl';
    var realtime = new Realtime({
        appId: APP_ID,
        region: 'cn', //美国节点为 "us"
    });

    var endReArr = [];
    realtime.createIMClient(cid).then(function (client) {
        client.on('unreadmessages', function (payload, conversation) {
            var memberArr = conversation.members;
            var reData = {};
            reData.cid = cid;//客户端id
            for (var vo in memberArr) {
                if (memberArr[vo] !== cid) {
                    reData.gUserId = memberArr[vo];
                }
                reData.lastMessage = conversation.lastMessage;
                reData.lastTime = payload.lastMessageTimestamp;
                endReArr.push(reData);
            }
        });
    });
    setTimeout(function () {
        defer.resolve(endReArr);
    }, 200);
    return defer.promise;
}

getMemberList();


module.exports = fun;





