/**
 * 命名注释：directive简称_killContent. 父模块_dipan . 功能_技能详情展示页面 类型_directive .js
 * 使用 ：<div kill-content></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('killContent', killContent);
    function killContent() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/killContent.dipan.killContent.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', '$state', 'config', 'tools', 'header'];

    function thisController($scope, $rootScope, $timeout, $state, config, tools, header) {

        var clickType = 'tap';
        tools.trueWeb(function () {
            clickType = 'click';
        }, function () {
            clickType = 'tap';
        });
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
            $rootScope.$broadcast('callTelAlertCount0');
            $timeout(function () {
                sollTop();
            }, 0);
        });

        init();

        $scope.data = '';//技能详情数据

        function init() {
            $timeout(function () {
                getData();
            }, 0);
        }

        /**
         * 获取数据
         */
        function getData() {
            var url = config.host.nodeHost + "/member/getKillContent";
            var trueAreaGps = tools.getLocalStorageObj('areaGps');
            var areaGps = {};
            if (trueAreaGps) {
                areaGps = trueAreaGps.gpsObj;
            }
            tools.postJsp(url, {
                jiNengId: $state.params.jiNengId,
                areaGps: areaGps
            }).then(_s, _e);
            function _s(re) {
                $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
                if (re.data && re.data.code == 'S' && re.data.doc) {
                    try {
                        if (!re.data.doc.userData.headerImg) {
                            re.data.doc.userData.headerImg = header.defaultHeader;
                        }
                    } catch (e) {
                        console.error('无headerImg');
                    }
                    try {
                        if (re.data.doc.thisJiNeng.priceUnit == '面议') {
                            re.data.doc.thisJiNeng.priceStr = '价格面议';
                        } else {
                            re.data.doc.thisJiNeng.priceStr = re.data.doc.thisJiNeng.price + ' ' + re.data.doc.thisJiNeng.priceUnit;
                        }
                    } catch (e) {

                    }

                    switch (re.data.doc.thisJiNeng.service) {
                        case '线上':
                            re.data.doc.thisJiNeng.serviceStr = '线上服务';
                            break;
                        case '线下':
                            re.data.doc.thisJiNeng.serviceStr = '线下服务';
                            break;
                    }


                    angular.forEach(re.data.doc.jiNengList, function (vo) {
                        if (vo.priceUnit == '面议') {
                            vo.priceStr = '';
                        } else {
                            vo.priceStr = "<span style='color: red;'>" + vo.price + "</span>" + ' ' + vo.priceUnit;
                        }
                    });

                    $timeout(function () {
                        $scope.data = re.data;
                        $timeout(function () {
                            bindJiNengListClick();
                        }, 0);
                    }, 0);


                    $timeout(function () {
                        if ((re.data.doc.userData._id == tools.getLocalStorageObj('userData').uid)) {
                            document.getElementById('bottomNavCall').style.display = 'none';
                        }
                    }, 0);


                } else {
                    _e(re.data.msg);
                }
            }

            function _e(msg) {
                $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
                var errMsg = '读取数据失败';
                if (msg) {
                    errMsg = msg;
                }
                tools.alert({title: errMsg});
            }
        }

        /**
         * bind 技能列表点击
         */
        function bindJiNengListClick() {
            angular.forEach($scope.data.doc.jiNengList, function (vo) {
                var dom = document.getElementById('jiNengList_' + vo._id);
                dom.addEventListener(clickType, function () {
                    _bind(dom);
                });
            });
            function _bind(dom) {
                var _id = dom.getAttribute('subid');
                $state.go('killContent', {'jiNengId': _id});
            }
        }

        /**
         * contentDiv 滚动到页面顶部
         */
        function sollTop() {
            $timeout(function () {
                document.getElementById('killContentSoller').scrollTop = 0;
            }, 0);
        }


    }
})();
