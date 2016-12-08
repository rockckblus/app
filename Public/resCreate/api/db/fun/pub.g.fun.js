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
    farGps:farGps,//计算2个gps 之间的 距离
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
            reData.data = doc.data;
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
    var path = 'imagesUpData/' + moment().format("YYYY_MM_DD");
    var imgName = moment().format("YYYYMMDDhhmmss") + '.png';
    fs.exists(path, function (re) {//判断文件夹存在
        if (re) {
            _write();
        } else {
            fs.mkdirSync(path);//创建文件夹
            _write();
        }
    })

    function _write() {
        fs.writeFile(path + '/' + imgName, dataBuffer, function (err) {
            if (err) {
                defer.reject(JSON.stringify(err));
            } else {
                var reData = {
                    data: {
                        code: 'S',
                        msg: '保存成功！',
                        imgUrl: path + '/' + imgName
                    }
                };
                defer.resolve(reData);
            }
        });
    }

    return defer.promise;
}


/**************************
 * 计算2个gps 之间的 距离
 * // #lat为纬度, lng为经度, 一定不要弄错
 * 16/12/7 下午9:18 ByRockBlus
 **************************/

function farGps(lat1, lng1, lat2, lng2){
    return getDisance();
    function toRad(d) {  return d * Math.PI / 180; }
    function getDisance() {
        var dis = 0;
        var radLat1 = toRad(lat1);
        var radLat2 = toRad(lat2);
        var deltaLat = radLat1 - radLat2;
        var deltaLng = toRad(lng1) - toRad(lng2);
        dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
        return dis * 6378137;
    }
}


module.exports = fun;
