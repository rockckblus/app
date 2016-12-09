var tokenModel = require('../model/token.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法

var fun = {
    findToken: findToken,//find token是否存在
};

function findToken(postObj) {
    var defer = q.defer();
    var mt = parseInt(postObj.mt);
    tokenModel.find({
        uid: postObj.uid,
        mt: mt,
        token: postObj.roundCodeId,
    }, function (err, doc) {
        if (err) {
            defer.reject({
                data: {
                    code: 'F'
                }
            });
        }
        if (doc && doc[0]) {
            defer.resolve({
                data: {
                    code: 'S'
                }
            });
        } else {
            defer.reject({
                data: {
                    code: 'F'
                }
            });
        }
    });

    return defer.promise;
}

module.exports = fun;
