/**
 * 命名注释：directive简称_orderFrom. 父模块_dipan . 订单列表页面 类型_directive .js
 * 使用 ：<div order-from></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('orderFrom', orderFrom);
    function orderFrom() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/orderFrom.dipan.orderFromList.directive.html',
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
            init();
        });

        $scope.isHaveNeedOrderFrom = true;//有需求订单显示
        $scope.isHaveJinengOrderFrom = true;//有技能订单显示
        $scope.isHaveSelectOrderFrom = true;//有选单订单显示
        $scope.isHaveLoseOrderFrom = true;//有失效订单显示
        $scope.list = undefined;//订单列表数据


        function init() {
            getList();//获取技能,需求订单
        }

        function getList() {
            var url = config.host.nodeHost + '/member/getOrderFromList';
            var uid = tools.getLocalStorageObj('userData').uid;
            tools.postJsp(url, {uid: uid}, true).then(_s);
            function _s(re) {
                if (re.data && re.data.code == 'S') {
                    $timeout(function () {
                        if (re.data.jiNengOrderList[0]) {
                            $scope.isHaveJinengOrderFrom = true;
                        }
                        if (re.data.needOrderList[0]) {
                            $scope.isHaveNeedOrderFrom = true;
                        }
                        $scope.list = re.data;
                        $timeout(function () {
                            bindClick();
                        }, 0);
                    }, 0);
                }
            }
        }

        /**
         * bind 订单列表点击事件
         */
        function bindClick() {
            //技能绑定
            angular.forEach($scope.list.jiNengOrderList, function (vo) {
                var dom = document.getElementById('jinengOreder_' + vo.orderId);
                dom.addEventListener(clickType, function () {
                    _bindJiNeng(dom, vo.orderId, 'show');
                });
            });

            //需求绑定
            angular.forEach($scope.list.needOrderList, function (vo) {
                var dom = document.getElementById('needOrder_' + vo.orderId);
                dom.addEventListener(clickType, function () {
                    _bindJiNeng(dom, vo.orderId, 'select');
                });
            });


            //跳转订单详情
            function _bindJiNeng(dom, orderId, type) {
                $state.go('orderFromContent', {'orderId': orderId, 'type': type});
            }

        }

    }
})();
