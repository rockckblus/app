/**
 * snsArticle 社区文章表 contrller
 */

/**
 * sns 文章 模型
 * */
var snsArticleModel = require('../model/snsArticle.g.model');
var pubFun = require('../fun/pub.g.fun');//公共方法
var snsArticleFun = require('../fun/snsArticle.g.fun');//技能方法相关
var memberFun = require('../fun/member.g.fun');//技能方法相关

var fun = {
    getList: getList,//get 多条
    postKillFrom: postKillFrom,//添加一条技能 dist
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
        .then(_add);


    function _add(re) {
        if (re.doc && re.doc.data && re.doc.data.code && re.doc.data.code == 'S') {
            snsArticleFun.killAdd(postObj).then(upMember);
        } else {
            pubFun.pubReturn('id存在,不可以入库', {}, '成功', re.doc.data.msg, callBack);
            return false;
        }
    }

    function upMember() {
        memberFun.upDataMember(postObj).then(_call);
    }

    function _call(re) {
        pubFun.pubReturn(re.err, re.doc, '技能添加成功', '技能添加失败', callBack);
    }


}


module.exports = fun;





