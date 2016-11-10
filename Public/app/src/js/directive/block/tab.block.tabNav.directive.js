/**
 * 命名注释：directive简称_tab. 父模块_block. 功能_顶部tan导航 类型_directive .js
 * 使用 ：<div tab></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('tab', tab);

    function tab() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/tab.block.tabNav.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData'];

    function thisController($scope, $rootScope, $timeout, localData) {
        var isShowHeader = false;//判断当前页面是否需要 变换tab样式
        $scope.tabStyle = {};

        $scope.$on('isShowHeader', function (e, val) {
            isShowHeader = val;
            $timeout(function () {
                var tempTop;
                if (isShowHeader) {
                    tempTop = '50px';
                    changeViewContent('44px');
                } else {
                    tempTop = '0px';
                    changeViewContent('0px');
                }
                $scope.tabStyle = {
                    'top': tempTop
                };
            }, 0);
        });

        $scope.$on('showHeader', function () {
            if (isShowHeader) {
                $scope.tabStyle = {
                    'top': '50px'
                };
            }
        });

        $scope.$on('hideHeader', function () {
            if (isShowHeader) {
                $scope.tabStyle = {
                    'top': '0px'
                };
            }
        });

        /**
         * 变换ViewContent的 位置
         */
        function changeViewContent(px) {
            var viewContent = document.getElementById('viewContent');
            viewContent = angular.element(viewContent);
            viewContent.css({
                'margin-top':px
            });
        }

    }

})();
