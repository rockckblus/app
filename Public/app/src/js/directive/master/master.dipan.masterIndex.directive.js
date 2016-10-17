/**
 * 命名注释：directive简称_master. 父模块_dipan . 功能_地盘地主首页 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('master', master);
    function master() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/master/master.dipan.masterIndex.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tools', 'config', '$state'];

    function thisController($scope, $rootScope, $timeout, localData, tools, config, $state) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        /*************************
         * 判断数据赋值成功 关闭 loading
         * 16/8/15 下午2:57 ByRockBlus
         *************************/
        // $rootScope.$broadcast('closeLoading');







    }


})();
