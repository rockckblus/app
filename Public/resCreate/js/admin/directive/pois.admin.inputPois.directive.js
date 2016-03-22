/**
 * pois.admin.inputPois.directive.js
 * 命名注释：directive简称_pois. 父模块_admin. 功能 入库pois表 类型_directive .js
 * 使用 ：<div pois></div>
 */
(function () {
    'use strict';

    angular.module('admin').directive('pois', inputPois);

    /**
     * angular 载入完成后。显示modle值
     * 15-12-26 */
    function inputPois() {
        return {
            restrict: 'A',
            templateUrl: '/Public/resCreate/js/admin/directiveHtml/pois.html',
            replace: false,
            scope: {},
            controller: controller
        };
    }

    controller.$inject = ['$scope', '$timeout', 'pois'];

    function controller($scope, $timeout, pois) {

        $scope.fun = {};


    }


})();
