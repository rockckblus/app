/**
 * 命名注释：directive简称_area. 父模块_dipan. 功能_选择地区页面 类型_directive .js
 * 使用 ：<div area></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('area', area);

    function area() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/area.dipan.areaSelect.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools'];

    function thisController($scope, $rootScope, $timeout, tools) {

        $scope.showArea = true;//显示地区选择div
        $scope.$on('showArea', showArea);//监听打开areaDiv事件
        $scope.$on('hideArea', hideArea);//监听关闭areaDiv事件
        init();

        function init() {
            bindSelectAreaBtn();//绑定选择area点击事件
        }

        /**
         * 监听打开areaDiv事件
         */
        function showArea() {
            $timeout(function () {
                $scope.showArea = true;
            }, 0);
        }

        /**
         * 监听关闭areaDiv事件
         */
        function hideArea() {
            $timeout(function () {
                $scope.showArea = false;
            }, 0);
        }

        /**
         * 绑定选择area点击事件
         */
        function bindSelectAreaBtn() {
            var bindBtn = document.getElementById('topSearchLeft');
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
                type = 'tap';
            });
            bindBtn.addEventListener(type, _bind);

            function _bind() {
                $rootScope.$broadcast('showArea');
            }
        }

    }
})();