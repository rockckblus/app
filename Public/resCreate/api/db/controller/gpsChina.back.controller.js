/**
 * gpsChina表 contrller 全局
 */

/**
 * gpsChina模型
 * 16/3/7 */
var gpsChinaModel = require('../model/gpsChina.back.model');

var g = require('../../g.config');

/**
 * 临时统计
 * 16/3/21 */
var tempCountCtrl = require('../controller/tempCount.back.controller');

/** 临时gps表  */
var tempGpsCtrl = require('../controller/tempGps.back.controller');

var fun = {
    addOne: addOne,//添加一条
    eachAdd: eachAdd,//循环添加
    eachGpsInChina: eachGpsInChina//遍历临时gps表，提交到soso判断是不是中国的gps
};

/**
 * -------------------------具体方法-----------------
 * 16/3/7 */

/**
 * 添加一条
 * @parem {lat:Number,lng:Number}
 * */
function addOne(obj) {
    _add(obj);

    /**
     * 添加一条新记录
     * 16/3/14 */
    function _add(obj) {
        gpsChinaModel.create({
            gps: {
                lat: obj.lat,
                lng: obj.lng
            }
        });
    }
}

/** 循环添加  */
var allCount = 0;
function eachAdd() {
    /** name:tempCountGpsInDb  添加到数据库，gps坐标 入库执行到多少的 统计数字 */
    tempCountCtrl.findOne('tempCountGpsInDb', gpsFun);

    function gpsFun(doc) {
        if (doc == null) {//如果文档不存在 就添加初始统计值
            tempCountCtrl.add({name: 'tempCountGpsInDb', value: 2010});
        } else {
            allCount++;
            if ((allCount < 50) && (doc.value < 5300)) {//配置 入库循环 个数
                var nextCount = doc.value + 10;
                tempCountCtrl.upData({name: 'tempCountGpsInDb', value: nextCount}, function () {
                });
            } else {
                return 'over';
            }
        }

        var latArr = [];
        var lngArr = [];

//    var latGoldMin = 20.00;//全国最下面 x  ,小于 53
        var latGoldMin = doc.value - 10;//全国最下面 x  ,小于 53
//    var lngGoldMin = 73.00;//全国最下面 y , 小于135
        var lngGoldMin = 7300;//全国最下面 y , 小于135


        while (latGoldMin < doc.value) {
//        latGoldMin = latGoldMin + 0.01;
            latGoldMin = latGoldMin + 1;
            latArr.push(latGoldMin);
        }

        function _eachLng() {
            while (lngGoldMin < 13500) {
                lngGoldMin = lngGoldMin + 1;
                lngArr.push(lngGoldMin);
            }
        }

        function _forLat() {
            var tempLat;
            var tempCount = 0;
            for (var i in latArr) {
                tempLat = latArr[i];
                for (var ii in lngArr) {
                    tempCount = tempCount + 100;
                    var latFloat = tempLat / 100;
                    var lngFloat = lngArr[ii] / 100;
                    __add(latFloat, lngFloat, tempCount);

                }

                var len = latArr.length - 1;
                if (i == len) {
                    console.log('over');
                    _endOver();
                }
            }
            function __add(latFloat, lngFloat, tempCount) {
                setTimeout(function () {
                    tempGpsCtrl.add({
                        lat: latFloat,
                        lng: lngFloat
                    });
                    console.log(latFloat, lngFloat);

                }, tempCount);
            }

            function _endOver() {
                setTimeout(function () {
                    eachAdd();
                }, 120000);
            }

        }

        _eachLng();
        setTimeout(function () {
            _forLat();
        }, 0);
    }
}

/** eahcGpsInChina  遍历临时gps表，提交到soso判断是不是中国的gps*/
function eachGpsInChina(callBack) {

    tempCountCtrl.findOne('判断allGps执行的指针', _findTempCount);
    function _findTempCount(re) {
        //try {
        //    /*************************
        //     * 查出allGps old 指针,然后 指针 加10, 完成后,再去从临时gps表 查出,old指针的10条数据 //废弃
        //     * 16/5/14 ByRockBlus
        //     *************************/
        //
        //    /*************************
        //     * 查出 查询的 当前 id,然后 去 临时gps表 查出 当前 id 的 下一条 id
        //     * 16/6/22 上午9:00 ByRockBlus
        //     *************************/
        //
        //
        //    thisObjId = re.value;
        //    //_allGpsAddTen(startNumber, _select);//效率不高 废弃
        //} catch (e) {
        //    console.error('error', e);
        //}


        try {
            tempGpsCtrl.findNextObj(re.value, _callBack);
        } catch (e) {
            console.log('error', '没有re.value');
        }

        /**************************
         * 回调 去修改tempCount 的 id
         * 16/6/24 下午6:57 ByRockBlus
         **************************/
        function _callBack(nextObj) {

            upTempCountObjId(nextObj, _callBack);

            function _callBack() {
                var reData = {
                    tempCount: nextObj._id,
                    data: nextObj
                };
                callBack(reData);
            }

            //function _errCall(err) {
            //    g.alert(err);
            //}
        }


    }

    /*************************
     * 每请求一次,就 记录 判断allGps执行的指针 当前执行过的 id
     * 16/6/22 上午9:03 ByRockBlus
     *************************/
    function upTempCountObjId(thisObjId, _call) {
        tempCountCtrl.upData({'name': '判断allGps执行的指针', 'value': thisObjId._id}, _call);
    }


    /*************************
     *  每请求一次, allGps 指针就  就自增 10条
     *  //效率不高 废弃
     *  16/5/14 ByRockBlus
     *************************/
    function _allGpsAddTen(startOldNum, funCall) {
        var addTen = startOldNum + 1;
        tempCountCtrl.upData({'name': '判断allGps执行的指针', 'value': addTen}, function () {
            funCall(startOldNum);
        });
    }

    /*************************
     * 去临时gps表查出10条数据,并callBack
     * //效率不高 废弃
     *  16/5/14 ByRockBlus
     *************************/
    function _select(num) {
        tempGpsCtrl.select(num, _callBack);

        /*************************
         * 返回条件加入num tempCount
         * 16/5/14 下午5:23 ByRockBlus
         *************************/
        function _callBack(re) {
            var reData = {
                tempCount: num,
                data: re
            };
            callBack(reData);
        }
    }

    /*************************
     * find next
     * 16/6/22 上午9:08 ByRockBlus
     *************************/
    function findNext(_id) {


    }


}
module.exports = fun;