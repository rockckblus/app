/**
 * 命名注释：directive简称_subFrom. 父模块_block. 功能_发布需求,技能按钮面板 类型_directive .js
 * 使用 ：<div sub-from></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('subFrom', subFrom);

    function subFrom() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/subFrom.block.addFrom.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }


    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData'];

    function thisController($scope, $rootScope, $timeout, localData) {
        $scope.show = false;//显示按钮面板
        $scope.$on('showAddFrom', function () {
            $timeout(function () {
                if ($scope.show) {//关闭
                    $scope.show = false;
                } else {//显示
                    $scope.show = true;
                }
            }, 0);
        });
        $scope.$on('closeAddFrom', function () {
            $timeout(function () {
                $scope.show = false;
            }, 0);
        });
    }

})();