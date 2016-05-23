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
        var sosoAk = _getPort();//判断url 分配 不同 的sosoAk
        var stopGetGpsInChina;//停止去soso查 是否 再中国
        $scope.mess = '';//信息提示
        $scope.fun = {
            startClick: _startClick,//start 点击事件,调用 pois factovry start方法
//            addTempCount: _addTempCount// 添加一条临时统计数据 只执行一次 注释掉
//            startTempGpsInDb:_startTempGpsInDb//入库全国临时gps表点击事件
            eachGpsInChina: _eachGpsInChina, //遍历临时gps表判断 在中国
            stopGetGpsInChina: _stopGetGpsInChina//停止去soso查 是否 再中国 点击事件
        };

        //$scope.fun.eachGpsInChina();//默认 就去 自动开始

        /**
         * fun 详情 *********************
         * 16/3/22 */

        /**************************
         * 获取当前url端口号
         * 16-5-17 上午8:43 ByRockBlus
         **************************/
        function _getPort() {
            var url = window.location.href;
            var ak;
            url = url.split(':');
            url = url[2];
            url = url.split('/');
            url = url[0];


            switch (url) {
                case '8082':
                    ak = 'WGKBZ-YIYRU-3IOVL-B6A3J-HYANJ-BWFUC';//sosoak 3008 4
                    break;
                case '8083':
                    ak = '4RMBZ-AS2R5-6JQIN-QHTBT-NDU25-Y7FTD';//soso ak 3008 5
                    break;
                case '8084':
                    ak = 'E63BZ-HJPRQ-L6Y5L-GA6Q5-XXWQV-T2BXQ';//soso ak 3008 6
                    break;
                case '8085':
                    ak = 'I26BZ-CUUW5-25AIJ-QXZRI-A5N46-YSBEZ';//soso ak 3008 7
                    break;
                case '8086':
                    ak = 'ZBMBZ-CFCA5-INFIM-QH7EC-XOW2K-WCBPU';//soso ak 3008 8
                    break;
                case '8087':
                    ak = 'KM4BZ-KIJRU-6UMVZ-BYRS4-4R2J5-KXBYQ';//soso ak 3008 9
                    break;
                case '8088':
                    ak = 'ZVTBZ-ENYA6-E35S4-M47JC-3FI6Q-HEBSY';//sosoak 3008 1
                    break;
                case '8089':
                    ak = 'AXNBZ-VOS2P-NB5DC-LWNCN-4UBME-P7F23';//soso ak 3008 2
                    break;
                case '8090':
                    ak = 'WPWBZ-VI63R-XM3WG-WEDEB-ZTQ3V-XXBT4';//soso ak 3008 10
                    break;
                case '8091':
                    ak = 'FJPBZ-ABHHF-D77JS-JXS25-JBVD6-CHFEK';//soso ak 3008 3
                    break;

                case '8092':
                    ak = 'M5SBZ-LWL3X-BOI4K-TNVQ7-TECL7-IHB5G';//sosoak2 3008 1
                    break;
                case '8093':
                    ak = 'RYOBZ-AKH3U-TC2VZ-4QRXE-DUEFZ-65BDB';//sosoak2 3008 2
                    break;
                case '8094':
                    ak = '73YBZ-HCBWI-IDAGO-5HRRE-ZQHIQ-BJBKX';//sosoak2 3008 3
                    break;
                case '8095':
                    ak = '4YHBZ-N6433-KLQ3B-3W7GI-EH5RO-57F7M';//sosoak2 3008 4
                    break;
                case '8096':
                    ak = 'SW2BZ-FLMW5-R5FIJ-QOYYN-WN643-VFFY4';//sosoak2 3008 5
                    break;
                case '8097':
                    ak = 'MDDBZ-YE7WR-SMJWT-WUWFV-LWL3Z-BXFYT';//sosoak2 3008 6
                    break;
                case '8098':
                    ak = 'XNLBZ-3YHKU-PUWVI-BMZZ6-2Q6J3-C2BQN';//sosoak2 3008 7
                    break;
                case '8099':
                    ak = '2FXBZ-VOQR3-6Q23J-3YK67-KRSOH-VZBFS';//sosoak2 3008 8
                    break;
                case '8100':
                    ak = 'WQDBZ-6NT3I-FXGGB-5GDZT-TMCI5-OEB7W';//sosoak2 3008 9
                    break;
                case '8101':
                    ak = '6JMBZ-V7B3X-3FM4L-TTQXL-SWIVZ-S7FUH';//sosoak2 3008 10
                    break;
                
            }
            return ak;
        }


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
                    $scope.mess = doc.tempCount;
                    _forGpsObj(doc.data);//循环遍历
                }, 0)
            });

            /*************************
             * 设置间隔一秒 去请求 10条数据
             * 16/5/14 下午6:33 ByRockBlus
             *************************/
            function _forGpsObj(doc) {
                angular.forEach(doc, function (vo, index) {
                    setTimeout(function () {
                        _getTrueSosoGps(vo.gps, __callBack);
                    }, 1000);
                })

                function __callBack() {
                    if (!stopGetGpsInChina) {
                        _eachGpsInChina();//重复执行 下个1条
                    }
                }


            }

            /*************************
             * 遍历 返回的 gps 去搜搜 查 判断 是不是 在中国,如果 在中国就去  addTempGpsChina 添加一条数据 {gps:{lat:num,lng:num}}
             * 16/5/14 下午6:29 ByRockBlus
             *************************/
            function _getTrueSosoGps(gpsObj, call) {
                if (gpsObj) {
                    api('getGetPost', {lat: gpsObj.lat, lng: gpsObj.lng, sosoAk: sosoAk}, function (rePois) {
                        var jsonPost = JSON.parse(JSON.parse(rePois));
                        __inTempGpsChina(jsonPost);//判断中国入库
                        call();
                    }, function (err) {//如果错误,就3秒后 再去 重复请求
                        $timeout(function () {
                            console.log('s3Err', err);
                            call();
                        }, 3000);
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