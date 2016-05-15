/**
 * pois.admin.inputPois.directive.js
 * 命名注释：directive简称_pois. 父模块_admin. 功能 入库pois表 类型_directive .js
 * 使用 ：<div pois></div>
 */
(function () {
    'use strict';

    angular.module('admin').directive('pois', inputPois);

    /**
     * angular 载入完成后。显示modle值
     * 15-12-26 */
    function inputPois() {
        return {
            restrict: 'A',
            templateUrl: '/Public/resCreate/js/admin/directiveHtml/pois.html',
            replace: false,
            scope: {},
            controller: controller
        };
    }

    controller.$inject = ['$scope', '$timeout', 'pois', 'api'];

    function controller($scope, $timeout, pois, api) {
        var stopGetGpsInChina;//停止去soso查 是否 再中国
        $scope.mess = '';//信息提示
        $scope.fun = {
            startClick: _startClick,//start 点击事件,调用 pois factovry start方法
//            addTempCount: _addTempCount// 添加一条临时统计数据 只执行一次 注释掉
//            startTempGpsInDb:_startTempGpsInDb//入库全国临时gps表点击事件
            eachGpsInChina: _eachGpsInChina, //遍历临时gps表判断 在中国
            stopGetGpsInChina: _stopGetGpsInChina//停止去soso查 是否 再中国 点击事件
        };

        /**
         * fun 详情 *********************
         * 16/3/22 */

        /** 添加一条临时统计数据 只执行一次 注释掉  */
        function _addTempCount() {
            api('addTempCount', {}, function () {
            });
        }

        /*************************
         * 遍历临时gps表判断 在中国 返回 查出 的 10条数据,解析到模板 统计数字
         * 16/5/14 下午5:39 ByRockBlus
         *************************/
        function _eachGpsInChina() {
            var count = 0;
            api('eachGpsInChina', {}, function (doc) {
                $timeout(function () {
                    console.log('doc', doc);
                    $scope.mess = doc.tempCount;
                    _forGpsObj(doc.data);//循环遍历
                }, 0)
            });

            /*************************
             * 设置间隔一秒 去请求 10条数据
             * 16/5/14 下午6:33 ByRockBlus
             *************************/
            function _forGpsObj(doc) {
                var time = 0;
                angular.forEach(doc, function (vo, index) {
                    time = time + 600;//间隔400hao秒
                    setTimeout(function () {
                        count++;
                        _getTrueSosoGps(vo.gps);
                        if (count == 10 && !stopGetGpsInChina) {
                            $timeout(function () {
                                _eachGpsInChina();//重复执行 下个10条
                            }, 1000);
                        }
                    }, time);
                })
            }

            /*************************
             * 遍历 返回的 gps 去搜搜 查 判断 是不是 在中国,如果 在中国就去  addTempGpsChina 添加一条数据 {gps:{lat:num,lng:num}}
             * 16/5/14 下午6:29 ByRockBlus
             *************************/
            function _getTrueSosoGps(gpsObj) {
                if (gpsObj) {
                    api('getGetPost', {lat: gpsObj.lat, lng: gpsObj.lng}, function (rePois) {
                        var jsonPost = JSON.parse(JSON.parse(rePois));
                        __inTempGpsChina(jsonPost);//判断中国入库
                    }, function (err) {
                        console.log('s3Err', err);
                    })
                }

                /*************************
                 * 入库tempGpsChina 表 {gps:{lat:num,lng:num}}
                 * 16/5/14 下午8:18 ByRockBlus
                 *************************/
                function __inTempGpsChina(jsonPost) {
                    try {
                        if (jsonPost.result.address_component.nation == '中国') {
                            var inObj = {
                                gps: jsonPost.result.location,
                                address: jsonPost.result.address_component,//地址信息
                                pois: jsonPost.result.pois//周边数组
                            }
                            api('addTempGpsChina', inObj);
                            $timeout(function () {
                                $scope.mess = '中国' + jsonPost.result.address_component.province + jsonPost.result.address_component.street;
                            }, 0)
                        } else {
                            $timeout(function () {
                                $scope.mess = jsonPost.result.address_component.nation + jsonPost.result.address_component.street;
                            }, 0)
                        }
                    } catch (e) {
                        console.error('error', e);
                    }
                }
            }
        }

        /**
         * start 点击事件,调用 pois factovry start方法
         * 16/3/22 */
        function _startClick() {
            pois.start(function (re) {
                $timeout(function () {
                    $scope.mess = re;
                }, 0)
            }, 1);
        }

        /*************************
         * 停止 或者 从新 开始 去soso查 是否 再中国 点击事件
         * 16/5/14 下午9:01 ByRockBlus
         *************************/
        function _stopGetGpsInChina() {
            if (!stopGetGpsInChina) {
                stopGetGpsInChina = true;
            } else {
                stopGetGpsInChina = false;
            }
        }

    }


})();