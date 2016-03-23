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

    controller.$inject = ['$scope', '$timeout', 'pois', 'api'];

    function controller($scope, $timeout, pois, api) {
        $scope.mess = '';//信息提示

        $scope.fun = {
            startClick: _startClick,//start 点击事件,调用 pois factovry start方法
//            addTempCount: _addTempCount// 添加一条临时统计数据 只执行一次 注释掉
        };

        /**
         * fun 详情 *********************
         * 16/3/22 */

        /** 添加一条临时统计数据 只执行一次 注释掉  */
        function _addTempCount() {
            api('addTempCount', {}, function () {
            });
        }


        /**
         * start 点击事件,调用 pois factovry start方法
         * 16/3/22 */
        function _startClick() {
            pois.start(function (re) {
                $timeout(function () {
                    $scope.mess = re;
                }, 0)
            }, 1);
        }

    }


})();