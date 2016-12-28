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

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools', 'header', '$q'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools, header, $q) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
        });
        $scope.list = '';//需求list
        $scope.errMsg = '';//错误提示

        init();
        function init() {
            getList()//获取需求列表
                .then(bindClick);
        }

        function getList() {//获取需求列表
            var defer = $q.defer();
            var url = config.host.nodeHost + '/sns/myNeed';
            tools.postJsp(url, {})
                .then(function (re) {
                    if (re && re.data && re.data.code == 'S' && re.data.doc) {
                        defer.resolve(re.data.doc);//成功
                    } else {
                        defer.reject('获取需求列表失败');
                    }
                }, function (err) {
                    defer.reject('获取需求列表失败');
                });
            return defer.promise();
        }

        function bindClick() {

        }


    }
})();
