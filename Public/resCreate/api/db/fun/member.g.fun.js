var memberModel = require('../model/member.g.model');
var q = require('q');//异步编程对象

var fun = {
    upDataMember: upDataMember,//补充用户资料
};


//updataMembe
function upDataMember(userUpData) {
    var defer = q.defer();
    memberModel.update(
        {
            _id: userUpData.uid
        },
        {
            sex: userUpData.sex,
            age: userUpData.age,
            city: userUpData.city
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


module.exports = fun;
