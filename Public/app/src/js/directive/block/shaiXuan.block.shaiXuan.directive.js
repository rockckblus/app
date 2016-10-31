/**
 * 命名注释：directive简称_shaiXuan. 父模块_block. 功能_筛选block,类型_directive .js
 * 使用 ：<div sub-from></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('shaiXuan', shaiXuan);

    function shaiXuan() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/shaiXuan.block.shaiXuan.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }


    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData'];

    function thisController($scope, $rootScope, $timeout, localData) {
        $scope.show = {
            one: false,
            two: false,
            three: false,
        };//显示对应面板
    }

})();