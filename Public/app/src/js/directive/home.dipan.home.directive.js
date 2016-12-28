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

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'update', 'config', 'compile', '$state', 'getList', 'header', '$q'];

    function thisController($scope, $rootScope, $timeout, tools, update, config, compile, $state, getList, header, $q) {

        var clickType = 'tap';
        tools.trueWeb(function () {
            clickType = 'click';
        }, function () {
            clickType = 'tap';
        });
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
            $timeout(function () {
                init();
            }, 0);
        });

        $scope.moreInfo = '加载更多...';
        $scope.$on('changeMoreInfo', changeMoreInfo);//变换moreInfo内容 监听

        $scope.titleInfo = '';
        $scope.$on('changeTitleInfo', changeTitleInfo);//变换titleInfo

        $scope.urlName = $state.current.name;//当前url Name
        $scope.list = []; //默认首页 列表 数据,每次刷新请求后 push list变量名称
        $scope.listTop = {'margin-top': '45px'};//homeList 的 style
        $scope.defaultHeader = header.defaultHeader;//默认头像
        // var endId;//下拉后 得到 的 最后一条id ,改为存入本地数据库
        var firstId;//第一条id,上拉时候用
        var type = 'up';//当前请求方式 up down

        $scope.$on('getSelectDown', getSelectDown);//获取筛选条件去请求接口

        /*************************
         * 默认读取上次的缓存 数据, 然后 再异步更新 到 最新数据,
         * bind 点击事件
         * 16/8/19 上午7:45 ByRockBlus
         *************************/
        function init() {
            _init();//判断缓存,去执行响应逻辑(变换滚动位置,获取最新数据)
            plusInit();//bind plus 滚动到底部事件
            bindLoadMoreClick();//bind 加载 更多点击事件
            giveListTop();//根据url 给内容部分marginTop
            bindTitleInfo();//bind titleInfo clcik
            getLocalKey();//判断有搜索关键词缓存,去geititleINfo数据
        }

        /**
         * 判断缓存,去执行响应逻辑(变换滚动位置,获取最新数据)
         */
        function _init() {

            /**
             * @return 当前url 的 缓存 list 数据
             * @private
             */
            function _getThisCatceList() {
                var thisLogName = 'catchList_' + $state.current.name + '-' + tools.getToday();
                return tools.getLocalStorageObj(thisLogName);
            }

            var thisCatchList = _getThisCatceList();
            if (thisCatchList && thisCatchList[0]) {//如果缓存的 数据存在,先读缓存数据 (只取当天浏览的数据,遍历不是今天浏览的 数据,并删除)
                getList.pushToGoldCatcth(thisCatchList);//把最新的数据 的缓存,push 到 全局 缓存对象

                /**
                 * 读缓存 作为list[0] push到 缓存数组 ,绑定点击事件,
                 */
                getList.giveFirstCatchList(_getThisCatceList(), function (reList) {
                    $timeout(function () {
                        $scope.list = reList;
                        _bind(reList, 'list');//回调去绑定点击事件
                        $rootScope.$broadcast('closeLoading');//关闭 loading
                    }, 0);
                }, 'list', $scope, true);

                /**
                 * 判断如果 是 0 就去取上拉数据
                 */
                var scrollTopName = $state.current.name + '_scrollTop';
                if (localStorage.getItem(scrollTopName) === '0') {
                    return false;
                    // console.log('请求NewData');
                }

            } else {
                var endId = localStorage.getItem($state.current.name + 'EndId');
                getList.getList($state.current.name, false, endId, $scope, 'list', _bind);
            }

        }

        /**
         * 判断有搜索关键词缓存,去geititleINfo数据
         */
        function getLocalKey() {
            var key = localStorage.getItem('searchKey');
            if (key && key !== '""') {
                $timeout(function () {
                    key = key.replace(/\"/g, "");
                    $scope.titleInfo = key;
                }, 0);
            }
        }

        /**
         * 清空搜索key 焦点搜索 显示搜索面板
         * bind titleInfo clcik
         */
        function bindTitleInfo() {
            tools.bindClick('titleInfo', function () {
                $rootScope.$broadcast('focusSearch');
                $rootScope.$broadcast('giveSearch', '');
            });
        }

        /**
         * 变换moreInfo内容 监听
         */
        function changeMoreInfo(d, val) {
            $timeout(function () {
                $scope.moreInfo = val;
            }, 0);
        }

        /**
         * 变换titleInfo
         */
        function changeTitleInfo(d, v) {
            $timeout(function () {
                $scope.titleInfo = v;
            }, 0);
        }

        /**
         * bind 加载 更多点击事件
         */
        function bindLoadMoreClick() {
            try {
                tools.bindClick('isWeb', function () {
                    downGetList();//请求下拉更多数据,
                });
            } catch (e) {
                console.log('没找到isWebId');
            }
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
                //_bind();
            });
        }

        /**
         * bind listItem 点击事件
         * @param doc
         * @param listName
         * @private
         */
        function _bind(doc, listName) {

            if (type == 'down') {
                var down = 1;
            }

            if (!firstId) {//如果没有 firstId,就给 firstId
                try {
                    firstId = doc[0]._id;
                } catch (e) {
                    console.log('error');
                }
            }
            try {
                var endId = _getLastId(doc);//给最后一条id
                localStorage.setItem($state.current.name + 'EndId', endId);
            } catch (e) {
                console.log('error');
            }

            $timeout(function () {
                angular.forEach(doc, function (vo) {
                    var str = 'homeList_' + vo._id;
                    var dom = document.getElementById(str);
                    try {
                        dom.addEventListener(clickType, function () {
                            __bindClick(dom);
                        });
                    } catch (e) {
                        return false;
                    }
                });
            }, 400);

            function __bindClick(dom) {
                var goUrl = dom.getAttribute('url');
                var type = dom.getAttribute('type');
                var _id = dom.getAttribute('subid');
                if (type == 'kill') {
                    getList.saveCatecNewList();
                    $state.go(goUrl, {'jiNengId': _id});
                }
                if (type == 'orderFrom') {
                    getList.saveCatecNewList();
                    $state.go(goUrl, {'orderId': _id, 'type': 'show'});
                }
            }

            function _getLastId(re) {
                var endIdArr = [];
                angular.forEach(re, function (vo) {
                    endIdArr.push(vo._id);
                });
                endIdArr.sort();
                var end = endIdArr[re.length - 1];
                return end;
            }
        }

        /**
         *底部下拉,去请求数据,
         * @param {布尔 判断是点击来的} isClickBtn
         */
        function downGetList() {
            type = 'down';
            var endId = localStorage.getItem($state.current.name + 'EndId');
            if (!endId) {
                endId = 0;
            }
            getList.getList($state.current.name, false, endId, $scope, 'list', _bind);
        }

        /**
         * giveListTop
         */
        function giveListTop() {
            switch ($state.current.name) {
                case 'star':
                    $timeout(function () {
                        $scope.listTop = {
                            'margin-top': '10px'
                        };
                    }, 0);
                    break;
                default:
                    return;
            }
        }

        /**
         * 监听筛选获取homeList 事件
         * @param t
         * @param urlName
         */
        function getSelectDown() {
            clearEndIdAndList().then(
                function (re) {
                    if (re && re.code == 'S') {
                        downGetList();
                    }
                },
                function () {
                    tools.alert({
                        title: '请求失败'
                    });
                });
        }

        /**
         *  清空缓存的 对应url的endId, 清空 对应List 的缓存数据
         *  验证清空数据之后,再deferPromise(去加入search数据,去请求api)
         *  @param urlName (home need)
         */
        function clearEndIdAndList() {
            var defer = $q.defer();
            localStorage.removeItem($state.current.name + 'EndId');
            var thisLogName = 'catchList_' + $state.current.name + '-' + tools.getToday();
            localStorage.removeItem(thisLogName);
            var endId = localStorage.getItem($state.current.name + 'EndId');
            var thisLogNameThis = localStorage.getItem(thisLogName);
            $timeout(function () {
                getList.delGoldCatcth();
                $scope.list = [];
            }, 0);

            if (!endId && !thisLogNameThis) {
                defer.resolve({
                    code: 'S'
                });
            } else {
                defer.reject({
                    code: 'F'
                });
            }
            return defer.promise;
        }
    }
})();