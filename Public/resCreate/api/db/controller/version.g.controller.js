/**
 * version ctrl
 */

var versionModel = require('../model/version.g.model');

var fun = {
    findThisVersion: findThisVersion,//获取当前版本
    upDateVersion: upDateVersion,//更新version 传 string.version String
    creatFirst: creatFirst,//建立第一个数据
};

/**
 * -------------------------具体方法-----------------
 *  */
//获取当前版本
function findThisVersion(postObj, callBack) {
    versionModel.findOne({}).exec(function (err, doc) {
        if (doc && doc.version) {
            callBack({
                "code": "S",
                "version": doc.version,
                "msg": "获取版本成功"
            });
        } else {
            callBack({
                "code": "F",
            });
        }
    });
}

//更新一个版本
function upDateVersion(postObj, callBack) {
    if (postObj.passWord == 'HDZrockblus8') {
        versionModel.update({}, {version: postObj.version}, {mluti: false}, function (err, row) {
            callBack(row);
        });
    } else {
        callBack('权限验证失败');
    }
}

//creatFrist
function creatFirst(postObj, callBack) {
    versionModel.findOne({}).exec(function (err, doc) {
        if (doc == null) {
            if (postObj.passWord == 'HDZrockblus8') {
                versionModel.create({
                    version: '1.0'
                }, function (err, doc) {
                    callBack(err || doc);
                });
            } else {
                callBack('权限验证失败');
            }
        } else {
            callBack('第一条数据已经存在');
        }
    });
}

module.exports = fun;
