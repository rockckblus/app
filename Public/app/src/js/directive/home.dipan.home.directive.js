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

        $scope.urlName = $state.current.name;//当前url Name
        $scope.list = []; //默认首页 列表 数据,每次刷新请求后 push list变量名称
        var endId;//下拉后 得到 的 最后一条id
        var firstId;//第一条id,上拉时候用
        var type = 'up';//当前请求方式 up down
        var star = [];//标记数组 ,


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

            /**
             *
             * @return 当前url 的 缓存 list 数据
             * @private
             */
            function _getThisCatceList() {
                var thisLogName = 'catchList_' + $state.current.name + '-' + tools.getToday();
                return tools.getLocalStorageObj(thisLogName);
            }

            /**
             * 返回 标记star 的 id 数组
             * @returns {array|*}
             * @private
             */
            function _getThisCatchStarArr() {
                return tools.getLocalStorageObj('starArr');
            }

            var strArr = _getThisCatchStarArr();
            if (strArr && strArr[0]) {//赋值 标记数组
                getList.globalCatchList.starArr = strArr;
            }

            var thisCatchList = _getThisCatceList();
            if (thisCatchList && thisCatchList[0]) {//如果缓存的 数据存在,先读缓存数据 (只取当天浏览的数据,遍历不是今天浏览的 数据,并删除)
                getList.pushToGoldCatcth(thisCatchList);//把最新的数据 的缓存,push 到 全局 缓存对象

                /**
                 * 读缓存 作为list[0] push到 缓存数组 ,绑定点击事件,
                 */
                getList.giveFirstCatchList(_getThisCatceList(), function (reList) {
                    reList = getList.editShowStar(reList);//赋值星标
                    $timeout(function () {
                        $scope.list.push(reList);
                        _bind(reList, 'list[0]');//回调去绑定点击事件
                        $rootScope.$broadcast('closeLoading');//关闭 loading
                    }, 0);
                }, 'list[0]', $scope, true);

                /**
                 * 判断如果 是 0 就去取上拉数据
                 */
                var scrollTopName = $state.current.name + '_scrollTop';
                if (localStorage.getItem(scrollTopName) === '0') {
                    //getList.getList($state.current.name, false, false, $scope, 'list[0]', _bind);
                    ////如果记录的 缓存有位置信息,并且 位置 是0 ,去addNewList 请求 最新 数据, 放到缓存 之前
                    tools.alert({
                        title: '请求NewData'
                    });
                }

            } else {
                getList.getList($state.current.name, false, false, $scope, 'list[0]', _bind);
            }

        }

        /**
         * bind 加载 更多点击事件
         */
        function bindLoadMoreClick() {
            var bindBtn = document.getElementById('isWeb');
            try {
                console.log('binBtn', bindBtn);
                bindBtn.addEventListener('tap', function () {
                    downGetList(true);//请求下拉更多数据,
                });

            } catch (e) {
                console.log('binBtn', bindBtn);
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

        //bind 星标 点击事件
        function _bind(doc, listName) {

            if (type == 'down') {
                console.log('down', type);
            }

            if (!firstId) {//如果没有 firstId,就给 firstId
                try {
                    firstId = doc[0]._id;
                } catch (e) {
                    console.log('error');
                }
            }
            try {
                endId = _getLastId(doc);//给最后一条id
            } catch (e) {
                console.log('error');
            }

            _bindTapIcon();

            ///**
            // * 遍历list 取最后一条的 id
            // * @return {String} _id
            // */
            function _getLastId(re) {
                var endNum = re.length - 1;
                return re[endNum]._id;
            }

            //bind 星标 点击事件
            function _bindTapIcon() {
                angular.forEach(eval("$scope." + listName), function (vo) {
                    var idStr = '#' + vo._id;
                    $timeout(function () {
                        mui(idStr).on('tap', '.iconStar', function () {
                            if (vo.iconStar == 'fa-star-o') {
                                $timeout(function () {
                                    vo.iconStar = 'fa-star';
                                    _saveStarArr(vo._id);
                                }, 0);
                            } else if (vo.iconStar == 'fa-star') {
                                $timeout(function () {
                                    vo.iconStar = 'fa-star-o';
                                    _delStarArr(vo._id);
                                }, 0);
                            }
                            //reForList(liId, thisScope);
                        });
                    }, 400);

                    /**************************
                     * 从缓存 读取 star 数组
                     *
                     * star 缓存命名 state.name + '_star'
                     * @param callBack
                     *
                     * 16/9/14 下午9:21 ByRockBlus
                     **************************/
                    function _getStartFromCatch(callBack) {
                        var stateName = 'star';
                        star = tools.getLocalStorageObj(stateName);
                        if (!star) {
                            star = [];
                        }
                        $timeout(function () {
                            callBack();
                        }, 200);
                    }

                    /**************************
                     * 存储标记对象 到 缓存的 标记数组
                     * 16/9/14 下午7:37 ByRockBlus
                     **************************/
                    function _saveStarArr(_id) {
                        getList.globalCatchList.starArr.push(_id);//push 到 全局数组
                        var idDom = document.getElementById(_id);
                        idDom = angular.element(idDom);
                        var listName = idDom.attr('listName');
                        var thisScope = eval('$scope.' + listName);
                        angular.forEach(thisScope, function (vo) {
                            if (vo._id == _id) {
                                delete(vo.$$hashKey);
                                _getStartFromCatch(function () {
                                    star.push(vo);
                                    //var stateName = $state.current.name + '_star';
                                    var stateName = 'star';
                                    tools.saveLocalStorageObj(stateName, star);
                                });
                            }
                        });
                    }

                    /**************************
                     * 删除存储标记对象 到 缓存的 标记数组
                     * 16/9/14 下午7:37 ByRockBlus
                     **************************/
                    function _delStarArr(_id) {
                        getList.delStarIdFromStarArr(_id);
                        _getStartFromCatch(function () {
                            var tempStar = [];
                            angular.forEach(star, function (vo) {
                                if (vo._id !== _id) {
                                    tempStar.push(vo);
                                }
                            });

                            var stateName = 'star';
                            tools.saveLocalStorageObj(stateName, tempStar);
                        });
                    }
                });
            }


        }

        /**
         *底部下拉,去请求数据,
         * @param {布尔 判断是点击来的} isClickBtn
         */
        function downGetList() {
            if ($state.current.name == 'star') {//如果 是标记分类 底部下拉事件 没有任何 操作
                return false;
            }
            type = 'down';
            getList.getList($state.current.name, false, endId, $scope, 'list[' + $scope.list.length + ']', _bind);
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
                //listCount++;
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
        function reForList(id, thisScope) {
            angular.forEach(thisScope, function (vo) {
                if (vo._id == id) {
                    if (vo.iconStar == 'fa-star-o') {
                        $timeout(function () {
                            vo.iconStar = 'fa-star';
                        }, 0);
                    } else if (vo.iconStar == 'fa-star') {
                        $timeout(function () {
                            vo.iconStar = 'fa-star-o';
                        }, 0);
                    }

                    //var name = $state.current.name;
                    //tools.saveLocalStorageObj(name, $scope.list);//存储obj
                }
            });
        }

    }
})();