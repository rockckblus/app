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

        $scope.list = []; //默认首页 列表 数据,每次刷新请求后 push list变量名称
        var listCount = 0;//list数组统计变量
        $scope.isWeb = true;//加载更多按钮
        tools.trueWeb(function () {
        }, function () {
            $scope.isWeb = false;
            compile('list', 'isWeb', $scope);
        });//判断手机隐藏加载更多按钮


        /*************************
         * 默认读取上次的缓存 数据, 然后 再异步更新 到 最新数据,
         * bind 点击事件
         * 16/8/19 上午7:45 ByRockBlus
         *************************/
        init();

        function init() {
            _init();//判断缓存,去执行响应逻辑(变换滚动位置,获取最新数据)
            plusInit();//bind plus 滚动到底部事件
            bindLoadMoreClick();//bind 加载 更多点击事件
        }


        /**
         * 判断缓存,去执行响应逻辑(变换滚动位置,获取最新数据)
         */
        function _init() {
            var localData = tools.getLocalStorageObj($state.current.name);
            //if (localData) {//如果缓存的 数据存在,先读缓存数据
            //    var re = {
            //        list: localData
            //    };
            //    call(re);
            //    var scrollTopName = $state.current.name + '_scrollTop';
            //    if (localStorage.getItem(scrollTopName) === '0') {
            //        listCount++;
            //        getList.getList($state.current.name, false, false, $scope, 'list_' + listCount, _bind);
            //        ////如果记录的 缓存有位置信息,并且 位置 是0 ,去addNewList 请求 最新 数据, 放到缓存 之前
            //        //tools.alert({
            //        //    title: '请求NewData'
            //        //})
            //        console.log('请求带缓存数据');
            //    }
            //} else {
            getList.getList($state.current.name, false, false, $scope, 'list[' + listCount + ']', _bind);
            listCount ++;
            console.log('请求全新数据');
            //}
        }


        /**
         * bind 加载 更多点击事件
         */
        function bindLoadMoreClick() {
            var bindBtn = document.getElementById('isWeb');
            bindBtn.addEventListener('tap', function () {
                downGetList();//请求下拉更多数据
            })

        }


        /**
         * plus App 绑定滚动到底部事件
         */
        function plusInit() {
            mui.plusReady(function () {
                //滚动到底事件
                document.addEventListener('plusscrollbottom', function () {
                    downGetList();
                }, false);
                _bind();
            });
        }


        //bind 星标 点击事件
        function _bind() {
            mui('#list').on('tap', '.iconStar', function () {
                var _this = angular.element(this);
                var id = _this.attr('iconId');
                reForList(id);
            });
        }


        //底部下拉,去请求数据
        function downGetList() {
            var endId = _getLastId();
            getList.getList($state.current.name, false, endId, $scope, 'list_' + listCount, _bind);
            listCount++;

            /**
             * 遍历list 取最后一条的 id
             * @return {String} _id
             */
            function _getLastId() {
                console.log('listcount', listCount);
                console.log('listcount', $scope.list);
                var endNum = $scope.list[listCount-1].length - 1;
                return $scope.list[listCount-1][endNum]._id;
            }
        }

        /**
         * 请求成功后重新给list 赋值
         * 记录list模型名称
         * @param re
         */
        function call(re) {
            $timeout(function () {
                console.log('re', re);
                //$scope.list[listCount] = re.list;
                listCount++;
                //var name = $state.current.name;
                //var obj = $scope.list;
                //tools.saveLocalStorageObj(name, obj);//存储obj
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