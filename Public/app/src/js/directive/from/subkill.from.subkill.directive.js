/**
 * 命名注释：directive简称_subkill. 父模块_from. 功能_技能发布 类型_directive .js
 * 使用 ：<div subkill></div>
 */
(function () {
    'use strict';
    angular.module('from').directive('subkill', subkill);
    function subkill() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/from/subkill.from.subkill.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'config', '$state'];

    function thisController($scope, $rootScope, $timeout, tools, config, $state) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
            $rootScope.$broadcast('closeAddFrom');//关闭底部发布需求技能面板
            $rootScope.$broadcast('closeLoading');//关闭loading
            init();
        });


        function init() {
            hideBottomNav();
        }

        /**
         * 隐藏底部导航
         */

        function hideBottomNav() {
            $timeout(function () {
                var dom = document.getElementById('bottomNav');
                dom.style.display = "none";
            }, 0);
        }

    }


})();
