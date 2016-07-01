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
        $scope.overCount = 0;//统计执行了多少次
        $scope.sosoAk = sosoAk; // 是哪个 sosoAk  账号 + id
        $scope.fun = {
            startClick: _startClick,//start 点击事件,调用 pois factovry start方法
//            addTempCount: _addTempCount// 添加一条临时统计数据 只执行一次 注释掉
//            startTempGpsInDb:_startTempGpsInDb//入库全国临时gps表点击事件
            eachGpsInChina: _eachGpsInChina, //遍历临时gps表判断 在中国
            stopGetGpsInChina: _stopGetGpsInChina//停止去soso查 是否 再中国 点击事件
        };

        $scope.fun.eachGpsInChina();//默认 就去 自动开始

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

            /*************************
             * next20
             * 16/6/28 下午4:45 ByRockBlus
             *************************/
                case '8201':
                    ak = 'CFABZ-BYTKX-O2S43-TDL3W-XKOVT-LVBI2';//sosoak2 3008 10
                    break;
                case '8202':
                    ak = 'NLXBZ-TO7RX-5AX4Z-TC2ZG-EO5LV-YVB5U';//sosoak2 3008 10
                    break;
                case '8203':
                    ak = 'QVJBZ-6NP35-46PIR-QH4T5-36B4E-ZRFOT';//sosoak2 3008 10
                    break;
                case '8204':
                    ak = '7NWBZ-J7L3K-AMUJ6-ADLR7-OUTCS-3JB7L';//sosoak2 3008 10
                    break;
                case '8205':
                    ak = 'PKNBZ-2DMW3-GNY37-3BV5L-VFARJ-GPFWU';//sosoak2 3008 10
                    break;
                case '8206':
                    ak = 'C3GBZ-S5P3I-5G7GY-5AGWU-WQDIQ-SMFBE';//sosoak2 3008 10
                    break;
                case '8207':
                    ak = '7L2BZ-YGFW3-Q7Z3A-3XP5Z-GX3OV-NBBOV';//sosoak2 3008 10
                    break;
                case '8208':
                    ak = '4UKBZ-3ZDWK-4MPJ5-A6TFS-727CQ-ZNB4C';//sosoak2 3008 10
                    break;
                case '8209':
                    ak = 'PY5BZ-3XOK3-ZNL36-3AWAK-3DKR3-CSBSE';//sosoak2 3008 10
                    break;
                case '8210':
                    ak = '2XMBZ-BV53R-EYWWY-WD7WB-2UJYQ-7LBLY';//sosoak2 3008 10
                    break;
                case '8211':
                    ak = 'GZLBZ-LURCQ-D5R5O-GBVCS-XXMQO-UAFYO';//sosoak2 3008 10
                    break;
                case '8212':
                    ak = 'M5KBZ-KBR33-77M3U-37A6J-XDFOK-QSFWV';//sosoak2 3008 10
                    break;
                case '8213':
                    ak = 'S7XBZ-3TP3F-2STJS-J6LIJ-6BWXT-JIFQX';//sosoak2 3008 10
                    break;
                case '8214':
                    ak = '2CIBZ-XPPWF-LQSJZ-JBCZS-TNPDJ-C2B7T';//sosoak2 3008 10
                    break;
                case '8215':
                    ak = 'H35BZ-22Z33-D733K-3EYFH-H2OOZ-DKF4A';//sosoak2 3008 10
                    break;
                case '8216':
                    ak = 'A2QBZ-KATWP-DRIDM-LVJQU-P5REF-LTBCG';//sosoak2 3008 10
                    break;
                case '8217':
                    ak = 'A2JBZ-JHLWF-DQ2JS-JQWQD-J2YDT-SDBK7';//sosoak2 3008 10
                    break;
                case '8218':
                    ak = '7JSBZ-DRWKX-S2K4I-TPKNC-WNXVZ-FDBWC';//sosoak2 3008 10
                    break;
                case '8219':
                    ak = 'XLXBZ-YWWWP-GKJDI-LIF5H-7CZMQ-JVBVT';//sosoak2 3008 10
                    break;
                case '8220':
                    ak = 'KNBBZ-GKNW3-BNG3M-3XXTP-NV4RK-XQFE7';//sosoak2 3008 10
                    break;

            /*************************
             * 后40线程
             * 16/7/1 下午12:02 ByRockBlus
             *************************/
                case '8301':
                    ak = 'SNYBZ-FTW3X-V2S4W-TDYPN-6AHVO-KWB2B';
                    break;
                case '8302':
                    ak = 'GKIBZ-IPHWP-GFKD3-LSW7U-KIGMF-XHFYQ';
                    break;
                case '8303':
                    ak = 'AP6BZ-I2Q35-B65I7-QE3GH-KUY4Q-EZBPO';
                    break;
                case '8304':
                    ak = 'O3QBZ-3AHWX-AIO4Q-ZGNUV-VSW7F-KWFQS';
                    break;
                case '8305':
                    ak = 'Q37BZ-YHTWP-WFEDL-LSNPG-AMCMV-FSFP4';
                    break;
                case '8306':
                    ak = 'NBTBZ-WR7KF-PS3JN-JECYC-JDKXK-QAFJP';
                    break;
                case '8307':
                    ak = '2GWBZ-L3I3K-MMWJ7-AHQTP-2ATCQ-SGFMT';
                    break;
                case '8308':
                    ak = 'JZDBZ-VWJWQ-Z5C5K-G6QCP-JJGQ2-ECFKY';
                    break;
                case '8309':
                    ak = 'GA5BZ-RC6KF-DXBJA-NT3QA-QGJS3-LXFWE';
                    break;
                case '8310':
                    ak = 'VWIBZ-OKHWR-AYHWY-WH3VP-CX5Y2-YVFCY';
                    break;

                case '8311':
                    ak = 'JFSBZ-F6QWU-KWZVB-4WS3M-RMJFZ-JCBQU';
                    break;
                case '8312':
                    ak = 'KZVBZ-4NWWF-3DWJC-NKXWI-5ZZS5-7UBMX';
                    break;
                case '8313':
                    ak = 'BYFBZ-J5PWP-OKFD2-L3WD7-FECMZ-SMBJK';
                    break;
                case '8314':
                    ak = 'UJCBZ-EX7CK-YEDJG-AT33L-Y4TC6-5QBBZ';
                    break;
                case '8315':
                    ak = 'ZETBZ-BIUKP-AHGD3-V6S4F-QMJ5F-KOFR5';
                    break;
                case '8316':
                    ak = 'OTEBZ-4MUCG-QUHQ7-IL3L6-RARUT-YNFFJ';
                    break;
                case '8317':
                    ak = 'G55BZ-2JCKF-TD4J4-NFEDN-JSDS6-4RBFE';
                    break;
                case '8318':
                    ak = '3UJBZ-W44C5-U6MIB-QPLAU-G3C46-IIFZ6';
                    break;
                case '8319':
                    ak = 'BV5BZ-XQBCP-CRADJ-LASNR-SDTE3-ODFUB';
                    break;
                case '8320':
                    ak = 'MVMBZ-MUP6X-TCH4Q-7OLX5-LMWP7-JDFLM';
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
                console.log('doc', doc);
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

                /**************************
                 * old 取10条,废弃,只取1条,不需要 foreach
                 * 16/6/26 下午6:38 ByRockBlus
                 **************************/
                    //angular.forEach(doc, function (vo, index) {
                    //    setTimeout(function () {
                    //        _getTrueSosoGps(vo.gps, __callBack);
                    //    }, 1000);
                    //})

                setTimeout(function () {
                    _getTrueSosoGps(doc.gps, __callBack);
                }, 300);

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
                if ($scope.overCount > 9900) {//设置 多少次请求 停止
                    _stopGetGpsInChina();
                }
                $timeout(function () {
                    $scope.overCount++;//统计 自增
                }, 0);
                if (gpsObj) {
                    api('getGetPost', {lat: gpsObj.lat, lng: gpsObj.lng, sosoAk: sosoAk}, function (rePois) {
                        var jsonPost = JSON.parse(JSON.parse(rePois));
                        __inTempGpsChina(jsonPost);//判断中国入库
                        call();
                    }, function (err) {//如果错误,就3秒后 再去 重复请求
                        $timeout(function () {
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
                        console.log('sosoReturn', jsonPost);
                        /**************************
                         * soso key 到达上限
                         * 16/6/27 下午8:28 ByRockBlus
                         **************************/
                        if (jsonPost.status == 121) {
                            stopGetGpsInChina = true;
                            return false;
                        }

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