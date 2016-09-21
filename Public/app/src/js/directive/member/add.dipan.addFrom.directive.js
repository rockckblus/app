/**
 * 命名注释：directive简称_add. 父模块_dipan . 功能_add公共表单 类型_directive .js
 * 使用 ：<div add></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('add', add);
    function add() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/add.dipan.addFrom.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools'];

    function thisController($scope, $rootScope, $timeout, tools) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
            setTimeout(function () {
                $rootScope.$broadcast('closeLoading');
            }, 0);
        });


        $scope.form = {};

        $scope.formSub = function () {
            $scope.form.title += '&|';
            //var url = 'http://dipan.so:3082/sns/addOneArticle';
            var url = 'http://192.168.0.56:3082/sns/addOneArticle';
            tools.postJsp(url, $scope.form).then(function () {
                tools.alert({
                    title: '添加成功'
                });
            }, function (err) {
                tools.alert({
                    title: '添加失败',
                    content: err
                });
            });
        };
    }
})();
