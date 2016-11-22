/**
 * 命名注释：directive简称_alert. 父模块_block. 功能_alert 公共ui 类型_directive .js
 * 使用 ：<div alert></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('alert', top);

    function top() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/alert.block.alertUi.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tools'];

    function thisController($scope, $rootScope, $timeout, localData, tools) {
        $scope.alertUiClass = 'showThis';
        $scope.showAlertUi = false;
        $scope.title = '错误';
        $scope.content = '请重试';
        $scope.$on('alert', show); //监听alet事件 显示

        /*************************
         * 显示alert 并 2秒后 消失
         * 16/8/19 上午9:45 ByRockBlus
         *************************/
        function show(e, obj) {
            tools.trueWeb(function () {
                $scope.showAlertUi = true;
                $scope.title = obj.title;
                $scope.content = obj.content;
                $timeout(function () {
                    $scope.alertUiClass = 'hideThis';
                    $timeout(function () {
                        $scope.showAlertUi = false;
                        $scope.alertUiClass = 'showThis';
                    }, 0);
                }, 800);
            }, function () {
                plus.nativeUI.toast(obj.title);
            });
        }
    }
})();