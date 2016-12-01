/**
 * member member contrller 全局
 */

/**
 * 会员模型
 * 16/3/7 */
var memberServiceModel = require('../model/member.g.model');
var g = require('../../g.config');
var request = require('request'); //curl 控件
var q = require('q');//异步编程

var fun = {

    /**
     * 获取用户数据
     * 传callBack
     * 16/3/7 */
    getUserData: getUserData,//获取用户数据
    loginIn: loginIn,//用户登录

};

/**
 * -------------------------具体方法-----------------
 *  */

/**
 * 获取用户数据
 *  */
function getUserData(post, callBack) {
    memberServiceModel.find({_id: post.uid})
        .select('uid name mt headerImg city sex age isUser telType')
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);//输出错误信息
            }
            var re = {
                data: {
                    code: "F",
                    msg: "获取用户数据失败"
                }
            };
            if (err || !doc[0]) {
                callBack(re);
            } else {
                re.data.code = 'S';
                re.data.msg = '获取用户数据成功';
                callBack(re);
            }
        });
}

/**
 * 用户登录
 */
function loginIn(post, callBack) {
    curlLoginIn().then(function (re) {
        console.log('re', re);
    }, function (re) {
        console.error(re);
    });

    /**
     * curl php接口的 登录api
     */
    function curlLoginIn() {
        var defered = q.defer();

        request({
                method: 'POST',
                url: g.host.phpApi + '/Member/Index/regIn',
                headers: {
                    "Content-Type": "application/json"
                },
                // body: '{"tel": ' + post.mtNum + ', "code": ' + post.code + '}'
            },
            function (error, response, bodyRe) {
                console.log('bodyRe',bodyRe);
                try {
                    if (response.statusCode == 200) {
                        defered.resolve(bodyRe);
                    } else {
                        defered.reject(response.statusCode);
                    }
                } catch (e) {
                    defered.reject(e);
                }
            }
        );

        return defered.promise;
    }

}
module.exports = fun;





