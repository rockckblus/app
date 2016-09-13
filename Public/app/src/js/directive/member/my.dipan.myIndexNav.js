/**
 * 命名注释：directive简称_my. 父模块_dipan . 功能_我的功能导航IndexList 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('my', urlParse);
    function urlParse() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/my.dipan.myIndexNav.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config'];

    function thisController($scope, $rootScope, $timeout, localData, config) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        //我的 导航list > 本地数据
        $scope.listNav = localData.memberIndexNav;
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
