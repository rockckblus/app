/**
 * 命名注释：directive简称_orderFromContent. 父模块_dipan . 需求(订单)详情页面 类型_directive .js
 * 使用 ：<div order-from-content></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('orderFromContent', orderFromContent);
    function orderFromContent() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/orderFromContent.dipan.orderFromContent.directive.html',
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

        $scope.data = '';//订单详情数据

        function init() {
            getOrderContent();//获取订单详情
        }

        function getOrderContent() {
            var url = config.host.nodeHost + '/member/getOrderFromContent';
            var uid = tools.getLocalStorageObj('userData').uid;
            tools.postJsp(url, {uid: uid, orderId: $state.params.orderId}, true).then(_s);
            function _s(re) {
                if (re.data && re.data.code == 'S') {
                    try {
                        if (!re.data.userData.headerImg) {
                            re.data.userData.headerImg = header.defaultHeader;
                        }
                    } catch (e) {
                        console.error('无headerImg');
                    }
                    try {
                        if (re.data.thisNeed.priceUnit == '面议') {
                            re.data.thisNeed.priceStr = '面议';
                        } else {
                            re.data.thisNeed.priceStr = re.data.thisNeed.price + ' ' + re.data.thisNeed.priceUnit;
                        }
                    } catch (e) {

                    }


                    angular.forEach(re.data.needList, function (vo) {
                        if (vo.priceUnit == '面议') {
                            vo.priceStr = '';
                        } else {
                            vo.priceStr = "<span style='color: red;'>" + vo.price + "</span>" + ' ' + vo.priceUnit;
                        }
                    });

                    $timeout(function () {
                        $scope.data = re.data;
                        $timeout(function () {
                            // bindJiNengListClick();
                        }, 0);
                    }, 0);
                }
            }
        }

    }
})();
