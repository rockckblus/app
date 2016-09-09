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
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/home.dipan.home.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'update', 'config', 'compile', '$state', 'getList'];

    function thisController($scope, $rootScope, $timeout, tools, update, config, compile, $state, getList) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        $scope.list = []; //默认首页 列表 数据,

        /*************************
         * 默认读取上次的缓存 数据, 然后 再异步更新 到 最新数据
         * 16/8/19 上午7:45 ByRockBlus
         *************************/
        init();

        function init() {
            //function testLocalStroageBig() {
            //    if (!window.localStorage) {
            //        console.log('浏览器不支持localStorage');
            //    }
            //    var size = 0;
            //    for (var item in window.localStorage) {
            //        if (window.localStorage.hasOwnProperty(item)) {
            //            size += window.localStorage.getItem(item).length;
            //        }
            //    }
            //    setTimeout(function(){
            //        console.log('当前localStorage剩余容量为' + (size / 1024).toFixed(2) + 'KB');
            //    },5000);
            //}
            //
            //testLocalStroageBig();

            var localData = tools.getLocalStorageObj($state.current.name);
            if (localData) {//如果缓存的 数据存在,先读缓存数据
                var re = {
                    list: localData
                };
                call(re);
                var scrollTopName = $state.current.name + '_scrollTop';
                if (localStorage.getItem(scrollTopName) === '0') {
                    getList.getList($state.current.name, false, false, $scope, 'list', _bind);
                    ////如果记录的 缓存有位置信息,并且 位置 是0 ,去addNewList 请求 最新 数据, 放到缓存 之前
                    //tools.alert({
                    //    title: '请求NewData'
                    //})
                    console.log('请求带缓存数据');
                }
            } else {
                getList.getList($state.current.name, false, false, $scope, 'list', _bind);
                //_getList();
                console.log('请求全新数据');
            }

            //function _getList() {
            //    var url = 'http://192.168.0.7:8080/homeListOne.json?' + tools.getRoundCode(8);
            //    //var url = 'http://127.0.0.1:8080/homeListOne.json?' + tools.getRoundCode(8);
            //    tools.getJsp(url).then(call, err);
            //}
        }

        function plusInit() {
            mui.plusReady(function () {
                //滚动到底事件
                document.addEventListener('plusscrollbottom', function () {
                    getList.getList($state.current.name, false, false, $scope, 'list', _bind);
                }, false);
                _bind();
            });
        }


        function _bind() {
            mui('#list').on('tap', '.iconStar', function () {
                var _this = angular.element(this);
                var id = _this.attr('iconId');
                reForList(id);
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




    }
})();