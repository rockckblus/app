/**
 * curl 采集相关
 */

var g = require('../../g.config');
var request = require('request'); //curl 控件
var curl = require('superagent');

var fun = {
    get: _get,
    curlGet: _curlGet
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */
/**
 * curl 一条网页 ,
 * @parme url {Sting}  'http://baidu.ocm'
 * @return {Sting} '网页内容'
 * 16/3/21 */
function _get(urlStr, callback) {
    console.log('urlStr', urlStr);
    request.get({
            url: 'http://' + urlStr,
            // url: urlStr,
            headers: {
                // 'Content-Type': "application/json; charset=utf-8",
            }
        },
        function (error, response, body) {
            console.log('res', response);
            try {
                if (response.statusCode == 200) {
                    callback(body);
                    console.log('200', body);
                } else {
                    console.log('responseCode', response.statusCode);
                }
            } catch (e) {
                console.log('e', e);
            }
        }
    );
}
function _curlGet(urlStr, callBack) {
    console.log('http://baidu.com', urlStr);
    curl.get(urlStr).end(function (err, res) {
        console.log('res', res);
    });
}
module.exports = fun;