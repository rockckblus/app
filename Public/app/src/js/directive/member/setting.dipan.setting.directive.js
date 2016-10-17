/**
 * 命名注释：directive简称_setting. 父模块_dipan . 功能_设置 类型_directive .js
 * 使用 ：<div add></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('setting', setting);
    function setting() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/setting.dipan.setting.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'localData', 'config'];

    function thisController($scope, $rootScope, $timeout, tools, localData, config) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
            setTimeout(function () {
                $rootScope.$broadcast('closeLoading');
            }, 0);
        });

        //setting 导航list > 本地数据
        $scope.listNav = localData.setting;
        //版本
        $scope.version = config.version.default;

        /*************************
         * 判断数据赋值成功 关闭 loading
         * 16/8/15 下午2:57 ByRockBlus
         *************************/
        if ($scope.listNav) {
            $timeout(function () {
                $rootScope.$broadcast('closeLoading');
            }, 0);
        }

    }
})();
