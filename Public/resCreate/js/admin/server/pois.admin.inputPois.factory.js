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
        var eachNum = 1;//循环采集条数,默认1
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
                    findOnePois();//执行步骤1-7
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
        function findOnePois() {
            var endNum = 1;//tempCount Number
            var defered = $q.defer();

            /**
             * step0 查出当前 tempCount 统计值
             * 16/3/22 */
            function s0_findEndNum() {
                findEndNum(_success);
                function _success(doc) {
                    if (angular.isDefined(doc.value)) {
                        endNum = doc.value;
                        defered.resolve(doc);
                        console.log(1111111);
                    } else {
                        console.log('11err');
                        defered.reject();
                    }
                }

                return defered.promise;
            }


            /**
             * step1  查出一条 三级地址 ,
             * 先去拿tempCount 数,作为查询的 限制参数
             * 16/3/22 */
            function s1_findOneThreeAred() {
                api('getThreeCityArea', {
                    limit: 1,
                    skip: endNum
                }, function (doc) {
                    if (doc) {
                        console.log(22222);
                        defered.resolve(doc);
                    } else {
                        console.log('22err');
                        defered.reject();
                    }
                });

                return defered.promise;
            }

            /** step2  测试 $q  */
            function s2_q(a) {
                if (a) {
                    console.log('3333', a);
                    defered.resolve();
                } else {
                    defered.reject();
                }
            }

            s0_findEndNum().then(s1_findOneThreeAred).then(s2_q, function () {
                console.log('err');
            });

        }


    }

})();