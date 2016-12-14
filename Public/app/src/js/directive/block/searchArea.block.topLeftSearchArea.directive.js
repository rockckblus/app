/**
 * 命名注释：directive简称_searchArea. 父模块_block. 功能_搜索焦点事件的时候,显示的 左侧 地区搜索 类型_directive .js
 * 使用 ：<div ssearch-area></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('searchArea', searchArea);

    function searchArea() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/searchArea.block.topLeftSearchArea.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', '$state', 'tools'];

    function thisController($scope, $rootScope, $timeout, localData, $state, tools) {
        $scope.searchArea = false;
        $scope.thisCity = '';
        $scope.$on('showSearchArea', showSearchArea);//监听显示 block事件 来显示area block
        $scope.$on('hideSearchArea', hideSearchArea);//监听隐藏 block事件 来隐藏area block
        $scope.$on('changeArea', giveThisCity);//监听地址变换事件

        init();
        function init() {
            giveThisCity();
        }

        /**
         * 给搜索默认城市
         */
        function giveThisCity() {
            var area = tools.getLocalStorageObj('area');
            $timeout(function () {
                try {
                    $scope.thisCity = area.city.city;
                } catch (e) {
                    $scope.thisCity = '全国';
                }
            }, 0);
        }

        /**
         * 显示地区areaBlock
         */
        function showSearchArea() {
            $timeout(function () {
                $scope.searchArea = true;
                changeTopSearchWidth();
            }, 0);
        }

        /**
         * 隐藏地区areaBlock
         */
        function hideSearchArea() {
            $timeout(function () {
                $scope.searchArea = false;
                changeTopSearchWidth();
            }, 0);
        }

        /**
         * 变换topSearchLeft,topSearchCenter 宽度
         */
        function changeTopSearchWidth() {
            var searchLeftDom = document.getElementById('topSearchLeft');
            searchLeftDom = angular.element(searchLeftDom);//left
            var searchCenterDom = document.getElementById('topSearchCenter');
            searchCenterDom = angular.element(searchCenterDom);//center

            if ($scope.searchArea) {
                searchLeftDom.css({
                    width: '25%'
                });

                searchCenterDom.css({
                    width: '44%'
                });
            } else {
                searchLeftDom.css({
                    width: '10%'
                });

                searchCenterDom.css({
                    width: '79%'
                });

            }


        }

    }


})();
