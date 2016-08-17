/**
 * 命名注释：directive简称_home. 父模块_dipan. 功能_首页模块 类型_directive .js
 * 使用 ：<div home></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('home', loading);

    function loading() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/home.dipan.home.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools'];

    function thisController($scope, $rootScope, $timeout, tools) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        $scope.list = [];
        var url = 'http://city.5656111.com/Member/GetAjax/get_union_user_list/begin_city/%E5%A4%A9%E6%B4%A5';
        tools.postJsp(url, {}).then(call, err);

        function call(re) {
            $timeout(function () {
                $scope.list = re.data.list;
            }, 0);
        }

        function err(err) {
            tools.alert(err);
        }

        $scope.a = function () {
            tools.alert(11);
        };


    }

})();
