/**
 * sns_article sns 文章表model,
 *
 * _id; ObjectId
 * title String 标题;
 * type Number 供 1,需 2,其他 3
 * sort Number 排序
 * state Number 状态
 * sendTime Date 发布时间
 * editTime Date 修改时间
 * tags Array 标签 [tagId1,tagId2] 连表标签表
 * content Array 内容数组 [{key:val},{key:val}]
 *
 * 索引:sort state editTime tags
 *  */


/**
 * 全局
 * 16/3/7 */
var g = require('../../g.config');

/**
 * article结构
 * 16/3/7 */
var articleSchema = new g.Schema({
    title: String,//标题
    type: {type: Number, default: 3},//供 1,需 2,其他 3
    sort: {type: Number, default: 0},//排序
    state: {type: Number, default: 1},//状态 1.正常
    sendTime: {type: Date, default: Date.now},//发布时间
    editTime: {type: Date, default: Date.now},//修改时间 (无修改时间的时候与发布时间相同)
    tags: [],//标签数组
    content: [{key: String, val: String}],//内容 键值对
});


/**
 * articleModel
 * 16/3/7 */
var articleModel = g.mongoose.model('sns.article', articleSchema, 'sns.article');

module.exports = articleModel;


/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * 16/3/7 */


