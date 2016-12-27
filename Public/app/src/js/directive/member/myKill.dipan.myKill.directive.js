/**
 * 命名注释：directive简称_myKill. 父模块_dipan . 功能_我的技能 类型_directive .js
 * 使用 ：<div my-kill></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('myKill', myKill);
    function myKill() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/myKill.dipan.myKill.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools', 'header'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools, header) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
        });
        $scope.list = '';//联系人列表

        init();
        function init() {
        }
    }
})();
