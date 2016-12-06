/**
 * member member contrller 全局
 */

/**
 * 会员模型
 * 16/3/7 */
var memberServiceModel = require('../model/member.g.model');
var g = require('../../g.config');
var request = require('superagent'); //curl 控件
var q = require('q');//异步编程
var pubFun = require('../fun/pub.g.fun');//公共方法

var fun = {

    /**
     * 获取用户数据
     * 传callBack
     * 16/3/7 */
    getUserData: getUserData,//获取用户数据
    loginIn: loginIn,//用户登录
    getUidByMt: getUidByMt,//根据电话号码获取uid

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
            pubFun.pubReturn(err, doc, '查询用户数据成功', '查询用户数据失败', callBack);
        });
}

/**
 * 用户登录
 */
function loginIn(post, callBack) {
    curlLoginIn().then(getUid);
    function getUid(re) {
        if (re.code == 'S') {
            getUidByMt(post.mtNum, function (re) {
                var callRe = {
                    data: {
                        code: "S",
                        userData: re.data.userData,
                        msg: "登录成功",
                    }
                };
                callRe.data.userData.uid = re.data.userData._id;
                callBack(callRe);
            });
        } else {
            var callRe = {
                data: {
                    code: "F",
                    msg: '登录失败' + JSON.stringify(re)
                }
            };
            callBack(callRe);
        }
    }

    /**
     * curl php接口的 登录api
     */
    function curlLoginIn() {

        var defered = q.defer();

        var urlStr = encodeURI(g.host.phpApi + '/Member/Index/regIn');

        request
            .post(urlStr)
            .send({tel: post.mtNum, code: post.code, roundCodeId: post.roundCodeId})
            .set('Accept', 'application/json')
            .end(function (err, res) {
                try {
                    if (res.statusCode == 200) {
                        defered.resolve(res.body);
                    } else {
                        defered.reject(res.statusCode);
                    }
                } catch (e) {
                    defered.reject(e);
                }
            });

        return defered.promise;
    }

}

/**
 * 根据电话号码获取uid
 */
function getUidByMt(mt, callBack) {
    memberServiceModel.find({mt: mt})
    // .select('_id')
        .exec(function (err, doc) {
            if (err) {
                g.alert.err(err);//输出错误信息
            }
            var re = {
                data: {
                    code: "F",
                    msg: "获取用户uid失败"
                }
            };
            if (err || !doc[0]) {
                callBack(re);
            } else {
                re.data.code = 'S';
                re.data.msg = '获取用户uid成功';
                re.data.userData = doc[0]._doc;
                callBack(re);
            }
        });
}


module.exports = fun;





