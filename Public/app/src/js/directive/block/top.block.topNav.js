/**
 * 命名注释：directive简称_top. 父模块_block. 功能_顶部导航 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('top', top);

    function top() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/top.block.topNav.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', '$state'];

    function thisController($scope, $rootScope, $timeout, localData, $state) {

        $scope.titleText = '';


        $scope.$on('changeBody', changeTitleText);


        /**
         * getTitle 获取主标题   "分类"
         * @param {网址}url
         * @returns {*}
         * @private
         */

        function changeTitleText() {
            $timeout(function () {
                var url = $state;
                _getTitle(url.current.url);
            }, 0);

            function _getTitle(url) {
                switch (url) {
                    case '/home':
                        $timeout(function () {
                            $scope.titleText = '技能分类';
                        }, 0);
                        break;
                    case '/need':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/star':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/login':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/area':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/search':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/setting':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    default:
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        return false;
                }


            }

        }


    }


})();
