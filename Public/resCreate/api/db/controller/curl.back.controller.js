/**
 * curl 采集相关
 */

var g = require('../../g.config');
var request = require('request'); //curl 控件


var fun = {
    get: _get
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */
/**
 * curl 一条网页 ,
 * @parme url {Sting}  'http://baidu.ocm'
 * @return {Sting} '网页内容'
 * 16/3/21 */
function _get(url, callback) {
    request.get({
            url: 'http://' + url,
            encoding: 'utf8'
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                callback(body);
                console.log('200', body);
            } else {
                console.log('responseCode', response.statusCode);
            }
        }
    );
}

module.exports = fun;