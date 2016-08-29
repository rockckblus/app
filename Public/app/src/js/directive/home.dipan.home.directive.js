/**
 * 命名注释：directive简称_home. 父模块_dipan. 功能_首页模块 类型_directive .js
 * 使用 ：<div home></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('home', home);

    function home() {
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

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'update'];

    function thisController($scope, $rootScope, $timeout, tools, update) {

        tools.alert({
            title: '升级测试2.4'
        });
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        $scope.list = []; //默认首页 列表 数据,

        /*************************
         * todo
         * 默认读取上次的缓存 数据, 然后 再异步更新 到 最新数据
         * 16/8/19 上午7:45 ByRockBlus
         *************************/
        giveDefaultList();

        var url = 'http://city.5656111.com/Member/GetAjax/get_union_user_list/begin_city/%E5%A4%A9%E6%B4%A5';
        tools.postJsp(url, {}).then(call, err);


        function call(re) {
            $timeout(function () {
                $scope.list = re.data.list;
            }, 0);
        }

        function err() {
            tools.alert({
                title: '网络请求失败',
                content: '请检查网络'
            });
        }


        /*************************
         * 默认读取上次的缓存 数据, 然后 再异步更新 到 最新数据 todo
         * 16/8/19 上午7:48 ByRockBlus
         *************************/
        function giveDefaultList() {

        }


        /*************************
         * // 滚动到 底部 的 触发动作 test todo
         * 16/8/19 上午7:47 ByRockBlus
         *************************/
        $scope.a = function () {
            tools.alert({
                title: '这是标题',
                content: '内容 '
            });
        };


    }

})();