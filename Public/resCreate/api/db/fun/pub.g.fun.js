var g = require('../../g.config');
var fs = require('fs');
var q = require('q');
var moment = require('moment');//日期插件
/**
 * 公共方法
 */
var fun = {
    pubReturn: pubReturn,//公共返回
    baseToImgUrl: baseToImgUrl,//base64 转 图片文件保存,返回url
    farGps: farGps,//计算2个gps 之间的 距离
    changeMt: changeMt,//转换手机号为 155******92
    getDefaultVal: getDefaultVal,//表单的系统定义值转换为正常值
};

/**
 * 公共返回
 * @param err Object,成功返回的对象 必传:false
 * @param doc Object,成功返回的对象 必传:false
 * @param sMsg String,成功返回的信息 必传:true
 * @param eMsg String,失败返回的信息 必传:true
 */
function pubReturn(err, doc, sMsg, eMsg, callBack) {
    var reData = {
        data: {}
    };

    if (err) {
        g.alert(err);
        reData.data = {
            code: 'F',
            msg: JSON.stringify(err)
        };
    } else if ((doc.data) || (doc && doc._doc) || (doc && doc[0] && doc[0]._doc)) {
        var reDoc = [];
        if (doc.data) {
            reDoc = doc.data;
        }

        else if (doc && doc[0] && doc[0]._doc) {
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
        };

    } else {
        reData.data = {
            code: 'F',
            msg: eMsg
        };
    }

    callBack(reData);
}

/**
 * base64 转 图片文件保存,返回url
 */
function baseToImgUrl(imgData) {
    var defer = q.defer();
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var path = '../../imagesUpData/' + moment().format("YYYY_MM_DD");
    var imgName = moment().format("YYYYMMDDhhmmss") + '.jpg';
    fs.exists(path, function (re) {//判断文件夹存在
        if (re) {
            _write();
        } else {
            fs.mkdirSync(path);//创建文件夹
            _write();
        }
    });

    function _write() {
        fs.writeFile(path + '/' + imgName, dataBuffer, function (err) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                var reData = {
                    data: {
                        code: 'S',
                        msg: '保存成功！',
                        imgUrl: moment().format("YYYY_MM_DD") + '/' + imgName
                    }
                };
                defer.resolve(reData);
            }
        });
    }

    return defer.promise;
}

/**************************
 * 计算2个gps 之间的 距离 todo 转换成小数点后1位公里
 * // #lat为纬度, lng为经度, 一定不要弄错
 * 16/12/7 下午9:18 ByRockBlus
 **************************/

function farGps(lat1, lng1, lat2, lng2) {
    return getDisance();
    function toRad(d) {
        return d * Math.PI / 180;
    }

    function getDisance() {
        var dis = 0;
        var radLat1 = toRad(lat1);
        var radLat2 = toRad(lat2);
        var deltaLat = radLat1 - radLat2;
        var deltaLng = toRad(lng1) - toRad(lng2);
        dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
        dis = dis * 6378137 / 1000;//除1000 变为公里
        dis = dis.toFixed(2);
        if (!dis) {
            dis = 0.01;
        }
        return dis;
    }
}

/**
 * 转换手机号为 155******92
 */
function changeMt(mt) {
    mt = mt.toString();
    return mt.substr(0, 3) + "****" + mt.substr(7);
}

/**
 * 表单的系统定义值转换为正常值
 * 传字段名, 系统值
 * */
function getDefaultVal(fild, val) {
    switch (fild) {
        case 'kill_service'://技能服务方式
            switch (val) {
                case '0':
                    return '服务方式不限';
                case '1':
                    return '线上服务';
                case '2':
                    return '线下服务';
                default:
                    return '服务方式不限';
            }
            break;
        case 'kill_priceUnit'://技能价格单位
            switch (val) {
                case '0':
                    return '每小时';
                case '1':
                    return '每次';
                case '2':
                    return '每单';
                case '3':
                    return '面议';
                default:
                    return '面议';
            }
            break;
    }
}

module.exports = fun;
