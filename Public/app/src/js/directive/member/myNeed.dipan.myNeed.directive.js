/**
 * 命名注释：directive简称_myNeed. 父模块_dipan . 功能_我的需求 类型_directive .js
 * 使用 ：<div my-need></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('myNeed', myNeed);
    function myNeed() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/myNeed.dipan.myNeed.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools', 'header'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools, header) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
        });
        $scope.list = '';//

        init();
        function init() {
        }
    }
})();
