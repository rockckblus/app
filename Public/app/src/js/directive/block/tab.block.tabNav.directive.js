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
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/tab.block.tabNav.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout'];

    function thisController($scope, $rootScope, $timeout) {




    }

})();
