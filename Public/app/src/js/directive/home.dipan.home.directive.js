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

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'update', 'config', 'compile', '$state'];

    function thisController($scope, $rootScope, $timeout, tools, update, config, compile, $state) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        $scope.list = []; //默认首页 列表 数据,

        /*************************
         * todo
         * 默认读取上次的缓存 数据, 然后 再异步更新 到 最新数据
         * 16/8/19 上午7:45 ByRockBlus
         *************************/
        init();

        function init() {
            var localData = tools.getLocalStorageObj($state.current.name);
            console.log('localData', localData);
            if (localData) {//如果缓存的 数据存在,先读缓存数据
                var re = {
                    list: localData
                };
                call(re);
            } else {
                _getList();
            }

            function _getList() {
                //var url = 'http://192.168.0.7:8080/homeListOne.json?' + tools.getRoundCode(8);
                //var url = 'http://127.0.0.1:8080/homeListOne.json?' + tools.getRoundCode(8);
                var url = 'http://192.168.18.13:8888/homeListOne.json?' + tools.getRoundCode(8);
                tools.getJsp(url).then(call, err);
            }
        }

        function plusInit() {
            mui.plusReady(function () {
                function _bind() {
                    mui('#list').on('tap', '.iconStar', function () {
                        var _this = angular.element(this);
                        var id = _this.attr('iconId');
                        reForList(id);
                    });

                    //var scrolldiv = document.getElementById('list');
                    //scrolldiv = angular.element(scrolldiv);
                    window.onscroll = function () {

                    }
                }


                //滚动到底事件
                document.addEventListener('plusscrollbottom', function () {
                    tools.alert({
                        title: '底部'
                    });
                }, false);
                _bind();

            });
        }

        function call(re) {
            $timeout(function () {
                $scope.list = re.list;
                var name = $state.current.name;
                var obj = $scope.list;
                tools.saveLocalStorageObj(name, obj);//存储obj
                plusInit();//绑定点击事件
            }, 0);
        }

        function err() {
            tools.alert({
                title: '网络请求失败',
                content: '请检查网络'
            });
        }

        /*************************
         * 默认读取上次的缓存 1数据, 然后 再异步更新 到 最新数据 todo
         * 16/8/19 上午7:48 ByRockBlus
         *************************/
        function giveDefaultList() {

            $timeout(function () {
                //var url = 'http://192.168.0.7:8080/homeListOne.json?' + tools.getRoundCode(8);
                //var url = 'http://127.0.0.1:8080/homeListOne.json?' + tools.getRoundCode(8);
                var url = 'http://127.0.0.1:8888/homeListOne.json?' + tools.getRoundCode(8);
                tools.getJsp(url).then(call, err);
            }, 400);

        }

        /**
         * 重新给 list
         * @param id
         */
        function reForList(id) {
            angular.forEach($scope.list, function (vo) {
                if (vo.id == id) {
                    if (vo.iconStar == 'fa-star-o') {
                        $timeout(function () {
                            vo.iconStar = 'fa-star';
                        }, 0);
                    } else if (vo.iconStar == 'fa-star') {
                        $timeout(function () {
                            vo.iconStar = 'fa-star-o';
                        }, 0);
                    }

                    var name = $state.current.name;
                    tools.saveLocalStorageObj(name, $scope.list);//存储obj
                }
            });
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