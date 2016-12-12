/**
 * snsArticle 社区文章表 contrller
 */

/**
 * sns 文章 模型
 * */
var snsArticleModel = require('../model/snsArticle.g.model');
var pubFun = require('../fun/pub.g.fun');//公共方法
var snsArticleFun = require('../fun/snsArticle.g.fun');//技能方法相关
var needFromFun = require('../fun/needFrom.g.fun');//需求方法
var memberFun = require('../fun/member.g.fun');//技能方法相关
var q = require('q');

var fun = {
    getList: getList,//get 多条
    postKillFrom: postKillFrom,//添加一条技能 dist
    postNeedFrom: postNeedFrom,//添加一条需求
    addKillImg: addKillImg,//技能图片添加
    delKillImg: delKillImg,//删除技能图片
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */


/**
 * 根据post上拉,下拉返回
 * @param postObj
 * @param callBack
 */
function getList(postObj, callBack) {

    var whereCondition = {};
    if (postObj.endId) {//下拉 find next 查出当前 的 上一条数据
        whereCondition = {
            '_id': {
                '$lt': postObj.endId
            },
            'type': postObj.type

        };
    }

    else if (postObj.frontId) {//下拉 find next 查出当前 的 上一条数据
        whereCondition = {
            '_id': {
                '$gt': postObj.frontId
            },
            'type': postObj.type
        };
    }

    else {
        whereCondition = {
            'type': postObj.type
        };
    }
    snsArticleModel.find(whereCondition)
        .limit(10)
        .sort('-editTime')
        .exec(function (err, doc) {
            pubFun.pubReturn(err, doc, '查询成功', '查询失败', callBack);
        });
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
     * 2.如果不存在,就添加一条技能 _add
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

            snsArticleFun.killAdd(postObj).then(function () {
                defer.resolve(postObj);
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





