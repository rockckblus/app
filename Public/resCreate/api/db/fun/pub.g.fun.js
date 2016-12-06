var g = require('../../g.config');
/**
 * 公共方法
 */
var fun = {
    pubReturn: pubReturn,//公共返回
};

/**
 * 公共返回
 * @param err Object,成功返回的对象 必传:false
 * @param doc Object,成功返回的对象 必传:false
 * @param sMsg String,成功返回的信息 必传:true
 * @param eMsg String,失败返回的信息 必传:true
 */
function pubReturn(err, doc, sMsg, eMsg, callBack) {
    console.log(err, doc, sMsg);
    var reData = {
        data: {}
    };

    if (err) {
        g.alert(err);
        reData.data = {
            code: 'F',
            msg: JSON.stringify(err)
        }
    } else if ((doc && doc._doc) || (doc && doc[0] && doc[0]._doc)) {
        var reDoc = [];
        if (doc && doc[0] && doc[0]._doc) {
            for (var vo in doc) {
                reDoc.push(doc[vo]._doc);
            }
        } else {
            reDoc = doc._doc;
        }
        reData.data = {
            code: 'S',
            doc: reDoc,
            msg: sMsg
        }
    } else {
        reData.data = {
            code: 'F',
            msg: eMsg
        }
    }
    callBack(reData);
}

module.exports = fun;
