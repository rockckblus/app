var memberModel = require('../model/member.g.model');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法

var fun = {
    upDataMember: upDataMember,//补充用户资料
    editHeaderImg: editHeaderImg,//修改用户头像
};


//updataMembe
function upDataMember(userUpData) {

    if (userUpData.sex == 'default') {
        userUpData.sex = '女';
    }
    if (userUpData.age == 'default') {
        userUpData.age = '16~24';
    }


    var defer = q.defer();
    memberModel.update(
        {
            _id: userUpData.uid
        },
        {
            sex: userUpData.sex,
            age: userUpData.age,
            city: userUpData.city,
            isUser: true
        },
        {}, function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                var reData = {
                    doc: {
                        data: {
                            code: 'S', msg: '更新用户数据成功'
                        }
                    }
                };
                if (doc.ok == 1) {
                    reData.doc.data.code = 'S';
                    reData.doc.data.msg = '更新用户数据成功';
                } else {
                    reData.err = '';
                }
                defer.resolve(reData);
            }
        });

    return defer.promise;
}

/**
 * 修改用户头像
 */
function editHeaderImg(postObj) {
    var defer = q.defer();
    memberModel.update({_id: postObj.uid}, {headerImg: postObj.headerImg}, {}, function (err, doc) {
        if (!err) {
            if (doc && doc.result && doc.result.n == 1) {
                defer.resolve({
                    data: {
                        code: 'S',
                        msg: '头像更新成功',
                    }
                });
            } else {
                defer.reject('头像更新失败');
            }
        } else {
            defer.reject('头像更新失败');
        }
    });
    return defer.promise;
}

module.exports = fun;
