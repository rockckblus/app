/**
 * 路由通用方法
 */

var g = require('../g.config');
var tokenFun = require('../db/fun/token.g.fun');


/**
 * router All post get
 * 16/3/8 */
function all(req, res, next) {




    //需要验证token的接口url
    var isTrueToke = [
        '/member/getUserData',//获取用户数据
        '/member/userDataEdit',//修改用户信息
        '/member/telType',//修改用户允许打电话
        '/member/xiaDan',//对技能下单
        '/member/jieDan',//对需求接单
        '/sns/delKill',//删除一条技能
        '/sns/setMaster',//设置主技能
        '/member/getUserTel',//查询电话
        '/member/selectOrderFrom',//选单
        '/member/pingJia',//评价
    ];
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'POST,GET');
    if (!g.mongoConnect) {//如果mongo连接失败,首次启动node的时候
        res.json('mongo数据库连接失败');
    } else {
        if (req.method == 'GET') {
            next();
            return false;
        }
        if (isTrueToke.indexOf(req.url) == -1) {
            next();
            return false;
        }
        //判断随机码
        tokenFun.findToken(req.body).then(function (re) {
            if (re && re.data && re.data.code == 'S') {
                next();
            } else {
                res.json({
                    data: {
                        code: 'F',
                        msg: 'token失效'
                    }
                });
            }
        }, function (err) {
            res.json({
                data: {
                    code: 'F',
                    msg: 'token失效'
                }
            });
        });
    }
}
module.exports = all;

