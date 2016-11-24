/**
 * 命名注释：directive简称_loading. 父模块_block. 功能_顶部导航 类型_directive .js
 * 使用 ：<div loading></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('loading', loading);

    function loading() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/loading.dipan.loanding.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools'];

    function thisController($scope, $rootScope, $timeout, tools) {
        $scope.loading = false;//默认打开loading

        /*************************
         * 监听closeLoading事件,关闭loading动画
         * 16/8/15 下午2:42 ByRockBlus
         *************************/
        $scope.$on('closeLoading', function () {
            $timeout(function () {
                tools.trueWeb(function () {
                    $timeout(function () {
                        $scope.loading = false;
                    }, 0);
                }, function () {
                    $scope.loading = false;
                    plus.nativeUI.closeWaiting();
                    $timeout(function () {
                        plus.nativeUI.closeWaiting();
                    }, 500);
                });
            }, 0);
        });

        /*************************
         * 监听openLoading事件,打开loading动画
         * 16/8/15 下午2:42 ByRockBlus
         *************************/
        $scope.$on('openLoading', function () {
            $timeout(function () {
                tools.trueWeb(function () {
                    $timeout(function () {
                        $scope.loading = true;
                    }, 0);
                }, function () {
                    $scope.loading = false;
                    plus.nativeUI.showWaiting();
                });
            }, 0);
        });
    }

})();
