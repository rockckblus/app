/**
 * snsArticle 社区文章表 contrller
 */

/**
 * sns 文章 模型
 * */
var snsArticleModel = require('../model/snsArticle.g.model');
var memberModel = require('../model/member.g.model');
var pubFun = require('../fun/pub.g.fun');//公共方法
var snsArticleFun = require('../fun/snsArticle.g.fun');//技能方法相关
var needFromFun = require('../fun/needFrom.g.fun');//需求方法
var memberCtrl = require('../controller/member.g.controller');//member ctrl
var memberFun = require('../fun/member.g.fun');//member fun
var q = require('q');

var fun = {
    homeGetList: homeGetList,//首页技能列表
    postKillFrom: postKillFrom,//添加一条技能 dist
    postNeedFrom: postNeedFrom,//添加一条需求
    addKillImg: addKillImg,//技能图片添加
    delKillImg: delKillImg,//删除技能图片
    froAddKill: froAddKill,//根据id循环添加 1000条技能
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 根据id循环添加 1000条技能
 */
function froAddKill() {

    selectMember().then(function (idArr) {
        for (var vo in idArr) {
            var name = generateMixed(14);
            var killRoundId = generateMixed(8);
            var content = generateMixed(30);
            snsArticleFun.killAdd({
                killRoundId: killRoundId,
                title: name,
                content: content,
                uid: idArr[vo].toString(),
            })
        }
    });
    function selectMember() {
        var defer = q.defer();
        memberModel.find().exec(function (err, doc) {
            var idArr = [];
            for (var vo in doc) {
                idArr.push(doc[vo]._id);
            }
            defer.resolve(idArr);
        });
        return defer.promise;
    }


    function generateMixed(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
}

/**
 *  condition :
 获取数据库的筛选条件,遍历name 给不同筛选条件
 获取地址逻辑,如果 area.city.city == 附近,(cityCode == 777) ,就取areaGps 的gps 坐标,按照距离排序
 否则如果有值,就取 cityCode 去 筛选城市排序
 * @param postObj
 * @param callBack
 */
function homeGetList(postObj, callBack) {
    snsArticleFun.homeGetListFun(postObj).then(getOtherKill).then(_call, _err);

    //获取用户的 其他技能
    function getOtherKill(doc) {
        var defer = q.defer();
        if (!postObj.searchKey) {
            for (var vo in doc) {
                snsArticleFun.getUserIdKillList(doc[vo]._doc.uid._id, doc[vo]._id, vo).then(_otherCall, _otherErr);
            }
        } else {
            defer.resolve(doc);
        }


        function _otherCall(res) {
            doc[res.vo]._doc.killList = res;
            doc[res.vo]._doc.killListTitle = '';
            for (var i in res) {
                if (res[i].title) {
                    doc[res.vo]._doc.killListTitle = doc[res.vo]._doc.killListTitle + res[i].title + ' ';
                }
            }
            if (res.vo == (doc.length - 1)) {
                defer.resolve(doc);
            }
        }

        function _otherErr(err) {
            defer.reject(err);
        }


        return defer.promise;
    }


    function _call(re) {
        pubFun.pubReturn(false, re, '技能列表查询成功', '技能列表查询失败', callBack);
    }

    function _err(errRe) {
        pubFun.pubReturn(errRe, {}, '', '技能列表查询失败', callBack);
    }
}

/**
 * 添加一条技能 ,如果有补充会员资料,去更新会员资料
 * @param body
 * @param callBack
 * @param callBackErr
 */
function postKillFrom(postObj, callBack) {

    /**
     * 1.判断订单是否存在,防止重复提交 snsArticleFun.getOneKill
     * 2.如果不存在,去拿用户的 人气和热度,加入postObj,就添加一条技能 _add
     * 3.添加更新会员资料
     */
    snsArticleFun.getOneKill(postObj.killRoundId)
        .then(_add)
        .then(memberFun.upDataMember)
        .then(_call, _err);

    function _add(re) {
        var defer = q.defer();
        if (re.doc && re.doc.data && re.doc.data.code && re.doc.data.code == 'S') {

            if (postObj.areaGps) {
                memberFun.upUserGpsArea(postObj.areaGps, postObj.uid);//更新gps数据
            }

            memberCtrl.getUserDataPri(postObj).then(function (userData) {//去拿用户热度
                postObj.hot = userData[0]._doc.hot;//人气
                postObj.live = userData[0]._doc.live;//活跃
                snsArticleFun.killAdd(postObj).then(function () {
                    defer.resolve(postObj);
                }, function (err) {
                    defer.reject(JSON.stringify(err));
                });
            }, function (err) {
                defer.reject(JSON.stringify(err));
            });

        } else {
            defer.reject('id存在,不可以入库');
        }
        return defer.promise;
    }

    function _call(re) {
        pubFun.pubReturn(false, re.doc, '技能添加成功', '技能添加失败', callBack);
    }

    function _err(errRe) {
        pubFun.pubReturn(errRe, {}, '', '技能添加失败', callBack);
    }

}

/**
 * 添加一条需求
 */
function postNeedFrom(postObj, callBack) {
    /**
     * 1.判断需求订单是否存在,防止重复提交
     * 2.如果不存在,就添加一条需求 _add
     */
    needFromFun.getOneFrom(postObj.needRoundId)
        .then(_add)
        .then(_call, _err);

    function _add(re) {
        var defer = q.defer();
        if (re.doc && re.doc.data && re.doc.data.code && re.doc.data.code == 'S') {

            if (postObj.areaGps) {
                memberFun.upUserGpsArea(postObj.areaGps, postObj.uid);//更新gps数据
            }

            needFromFun.needAdd(postObj).then(function (re) {
                defer.resolve(re);
            }, function (err) {
                defer.reject(JSON.stringify(err));
            });
        } else {
            defer.reject('id存在,不可以入库');
        }
        return defer.promise;
    }

    function _call(re) {
        pubFun.pubReturn(false, re.doc, '需求添加成功', '需求添加失败', callBack);
    }

    function _err(errRe) {
        pubFun.pubReturn(errRe, {}, '', '需求添加失败', callBack);
    }
}

/**
 * 技能图片添加
 */
function addKillImg(postObj, callBack) {
    /**
     *1.上传图片,返回url
     * 2.入库技能图片
     */
    pubFun.baseToImgUrl(postObj.imgData).then(_addFromImg).then(_call, _err);

    function _addFromImg(imgUrl) {
        var defer = q.defer();
        postObj.imgUrl = imgUrl.data.imgUrl;//返回的图片url
        snsArticleFun.addKillFromImg(postObj).then(function (re) {
            defer.resolve(re);
        }, function (err) {
            defer.reject(JSON.stringify(err));
        });
        return defer.promise;
    }

    function _call(re) {
        pubFun.pubReturn(false, re.doc, re.doc.data.msg, '技能图片添加失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '技能图片添加失败', callBack);
    }

}

/**
 * 技能图片删除
 * @param postObj
 * @param callBack
 */
function delKillImg(postObj, callBack) {
    snsArticleFun.delKillImg(postObj).then(_call, _err);
    function _call(re) {
        pubFun.pubReturn(false, re, '技能图片删除成功', '技能图片删除失败', callBack);
    }

    function _err(re) {
        pubFun.pubReturn(re, {}, '', '技能图片删除失败', callBack);
    }
}


module.exports = fun;





