var memberModel = require('../model/member.g.model');
var snsFun = require('../fun/snsArticle.g.fun');
var q = require('q');//异步编程对象
var pub = require('../fun/pub.g.fun');//公共方法

var fun = {
    upDataMember: upDataMember,//补充用户资料
    editHeaderImg: editHeaderImg,//修改用户头像
    userDataEdit: userDataEdit,// 修改用户资料
    upUserGpsArea: upUserGpsArea,//修改用地位gps
    telType: telType//修改是否允许电话咨询
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
 * 修改用户资料
 */
function userDataEdit(userUpData) {

    switch (userUpData.sex) {
        case '0':
            userUpData.sex = '女';
            break;
        case '1':
            userUpData.sex = '男';
            break;
        default:
            userUpData.sex = '女';
            break;
    }
    switch (userUpData.age) {
        case '0':
            userUpData.age = '16~24';
            break;
        case '1':
            userUpData.age = '25~35';
            break;
        case '2':
            userUpData.age = '35+';
            break;
        default:
            userUpData.age = '16~24';
            break;
    }

    var defer = q.defer();
    memberModel.update(
        {
            _id: userUpData.uid
        },
        {
            name: userUpData.name,
            sex: userUpData.sex,
            age: userUpData.age,
            city: userUpData.city,
            isUser: true
        },
        {}, function (err, doc) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {

                //修改用户的技能筛选条件 sex
                snsFun.upDateKillGpsFun({uid: userUpData.uid, sex: userUpData.sex});

                var reData = {
                    doc: {
                        data: {
                            code: 'S', msg: '修改用户资料成功'
                        }
                    }
                };
                if (doc.ok == 1) {
                    reData.doc.data.code = 'S';
                    reData.doc.data.msg = '修改用户资料成功';
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

/**
 * 修改用户的所有技能的 hot live sex
 * 修改用户定位gps ,无返回,直接更新成功就成功,失败就忽略
 */
function upUserGpsArea(areaObj, uid) {
    memberModel.update({_id: uid}, {areaGps: areaObj}, {}, function (err, doc) {
        return {
            err: err,
            doc: doc
        };
    });

}

/**************************
 * 允许电话咨询
 * 16/12/12 上午6:18 ByRockBlus
 **************************/
function telType(postObj) {
    var defer = q.defer();
    memberModel.update({_id: postObj.uid}, {telType: postObj.telType}, {}, function (err, doc) {
        if (!err) {
            if (doc && doc.n == 1) {
                defer.resolve({
                    data: {
                        code: 'S',
                        msg: '电话咨询更新成功',
                    }
                });
            } else {
                defer.reject('电话咨询更新失败');
            }
        } else {
            defer.reject('电话咨询更新失败');
        }
    });
    return defer.promise;
}

module.exports = fun;





