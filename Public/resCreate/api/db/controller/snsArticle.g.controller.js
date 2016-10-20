/**
 * snsArticle 社区文章表 contrller
 */

/**
 * sns 文章 模型
 * */
var snsArticleModel = require('../model/snsArticle.g.model');
var g = require('../../g.config');

var fun = {
    addOneArticle: addOneArticle,//添加一条文章
    getList: getList,//get 多条
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 添加一条文章
 * @param { Object }postObj
 title: String,//标题
 type: {type: Number, default: 3},//供 1,需 2,其他 3
 sort: {type: Number, default: 0},//排序
 state: {type: Number, default: 1},//状态 1.正常
 sendTime: {type: Date, default: Date.now},//发布时间
 editTime: {type: Date, default: Date.now},//修改时间 (无修改时间的时候与发布时间相同)
 tags: [{keyId: ObjectId}],//标签数组
 content: [{key: String, val: String}],//内容 键值对

 * @param {function 成功回调}callBack
 * @param {function 错误回调}errCallBack
 *
 */
function addOneArticle(postObj, callBack, errCallBack) {
    snsArticleModel.create({
            title: postObj.title,
            //type: postObj.type,
            //sort: postObj.sort,
            //state: postObj.state,
            //tags: postObj.tags,
            iconStar: 'fa-star-o',
            content: [{'key': postObj.content}]
        }, function (err, small) {
            if (err) {
                g.alert(err);
                errCallBack(err);
            } else {
                callBack(small[0]);
            }

        }
    )
}


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
        .exec(callBack);
};


module.exports = fun;





