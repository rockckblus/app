/**
 * pois.admin.inputPois.factory.js
 * 命名注释：server简称_pois. 父模块 admin . 功能_三级周边数组入库 类型_factory.js
 *
 * 0.声明 一个 采集 数值,循环采集多少租pois ,
 * 1.查出 所有 city 3级表,限制到 1条
 * 3.查出的 3级,拿到 城市 1级,2级
 * 4.组合成 字符串,去soso api 拿周边pois 信息
 * 5.遍历 周边 信息, 去php api 取拼音
 * 6.组合字段入库,
 * 7.去临时统计表 加 1
 *
 */

(function () {
    'use strict';

    angular.module('admin').factory('pois', pois);
    pois.$inject = ['api', '$timeout', '$q'];

    function pois(api, $timeout, $q) {
        var eachNum = 1;
        var poisRe = {}; //return 方法对象

        poisRe.start = _start;//起始动作,传入 循环采集条数


        return poisRe;


        /**
         * 开始动作,
         * @prame Number  循环采集多少条 pois
         * 16/3/22 */
        function _start(callback, num) {
            var timeCount = 0;//间隔时间循环
            var settimeI = 0;
            if (num) {
                eachNum = num;
            }
            for (var i = 0; i < eachNum; i++) {
                timeCount = timeCount + 1000;//加1秒
                setTimeout(function () {
                    settimeI++;
                    console.log('settimeI', settimeI);
                    findOnePois(callback);//执行步骤1-7
                    if (settimeI == eachNum) {
                        $timeout(function () {
                            findEndNum(callback);//callback tempNum
                        }, 2000);
                    }
                }, timeCount);
            }
        }

        /**
         * find tempCount num
         * 16/3/22 */
        function findEndNum(callback) {
            api('getPoisTempCountNumber', {}, callback);
        }

        /**
         * step 1 -> 7
         * 16/3/22 */
        function findOnePois(callback) {


            /**
             * 逻辑
             * 16/3/23 */
            s0_findEndNum()//查出当前 tempCount 统计值
                .then(s1_findOneThreeAred)//查出一条 三级地址 2 级 接收
                .then(s2_findOneAreaByTwoArea)// edit post 加入 一级城市名称
                .then(s3_strGetSosoGps)//去soso接口查询 gps
                .then(s9_temp, function (err) {//测试过程中回调 显示到模板
                    console.log(err);
                });

            /**
             * step0 查出当前 tempCount 统计值
             * 16/3/22 */
            function s0_findEndNum() {
                var defered = $q.defer();
                findEndNum(_success);
                function _success(doc) {
                    if (angular.isDefined(doc.value)) {
                        console.log(11111);
                        defered.resolve(doc.value);//传 tempCountNum 到s1
                    } else {
                        defered.reject('s0Err');
                    }
                }

                return defered.promise;
            }

            /**
             * step1  查出一条 三级地址 2 级, 传到step2
             * 先去拿tempCount 数,作为查询的 限制参数
             * 16/3/22 */
            function s1_findOneThreeAred(tempCountNum) {
                var defered = $q.defer();
                api('getThreeCityArea', {
                    limit: 1,
                    skip: tempCountNum
                }, function (doc) {
                    if (doc) {
                        console.log('s1');
                        defered.resolve(doc);//传3级数据到 s2
                    } else {
                        defered.reject('s1Err');
                    }
                });
                return defered.promise;
            }

            /** step2  接收  edit post 加入 一级城市名称 */
            function s2_findOneAreaByTwoArea(doc) {
                var defered = $q.defer();

                if (doc) {
                    api('getOneCityArea', {
                        id: doc[0].pid.pid
                    }, function (reDoc) {
                        if (reDoc) {
                            doc.oneArea = reDoc;
                            doc.allStr = _editStr(doc);
                            if (doc.allStr) {
                                defered.resolve(doc);//传组合123级数据到 s3
                            } else {
                                defered.reject('组合字符串失败');
                            }
                        } else {
                            defered.reject('s2Err');
                        }
                    })
                } else {
                    defered.reject('s2ErrNODoc');
                }

                /**
                 * 组合字符串
                 * 16/3/23 */
                function _editStr(doc) {
                    var str = '';
                    try {
                        str = doc.oneArea.name + doc[0].pid.name + doc[0].name;
                    } catch (e) {
                        str = '';
                    }
                    return str;
                }

                return defered.promise;
            }

            /**
             * step3 去soso接口查询 gps
             * 16/3/23 */
            function s3_strGetSosoGps(doc) {
                var defered = $q.defer();
                if (doc) {
                    api('getStrGps', {str: encodeURI(doc.allStr)}, function (reGpsObj) {
                        defered.resolve(reGpsObj);
                        console.log('reGpsObj', reGpsObj);
                    })
                }
                return defered.promise;
            }

            /**
             * s9_temp回调
             * 16/3/23 */
            function s9_temp(data) {
                callback(data);
            }

        }


    }

})();