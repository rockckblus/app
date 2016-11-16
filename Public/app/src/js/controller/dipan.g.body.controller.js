(function () {
    'use strict';

    /**
     * body 控制器
     * 16/2/1 */
    angular.module('dipan').controller('body', body);

    /**
     * 手动注入
     * 16/2/1 */
    body.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tap', '$state', 'tools', 'getList', 'getCity'];

    /**
     * controllerFun
     * 16/2/1 */
    function body($scope, $rootScope, $timeout, localData, tap, $state, tools, getList, getCity) {
        $scope.push = 'fa-plus-circle';//发布需求按钮的 图标样式
        $scope.$on('changeBody', function () {
            trueIsLogin();//判断登录
            trueShowHeader();//判断是否显示header
            $rootScope.$broadcast('openLoading');//载入时候 默认打开loading
            $rootScope.$broadcast('closeAddFrom');//默认 关闭 技能发布按钮面板
            changeSubBtnIcon(true);//默认变换发布按钮为 加号
            var _url = '/' + $state.current.name;
            $timeout(function () {
                $scope.title = localData.getTitle(_url);//getTitle
                $scope.showTab = localData.showTab(_url);//是否显示 tab
                $scope.tabList = localData.tab(_url);//tablist body 控制器
                $scope.url = _url;//url变量,判断 top 模板 显示图标用
                bindH1SearchBtn();//首页搜索按钮显示隐藏
                /**
                 * 变换list 到 滚动记录的位置,判断 不同状态来 确定 是否 请求新的list数据
                 */
                mui.plusReady(function () {
                    function _init() {
                        changeScroll();
                        trueGetNew();
                    }

                    _init();

                    //变换到记录的 滚动位置
                    function changeScroll() {
                        var scrollTopNum = $state.current.name + '_scrollTop';
                        var num = parseInt(localStorage.getItem(scrollTopNum));
                        try {
                            document.body.scrollTop = num;
                        } catch (e) {
                            try {
                                window.pageYOffset = num;
                            } catch (e) {
                                document.documentElement.scrollTop = num;
                            }
                        }
                    }

                    /**
                     * 判断scroll 位置,是需要 请求 url
                     * @param name
                     * @param postUrl
                     */
                    function trueGetNew() {

                        //监听滚动 事件
                        window.onscroll = function () {
                            _trueGetNew();
                        };

                        function _trueGetNew() {

                            //判断当前url 是否需要 newList
                            if (!trueNeedNewList()) {
                                return false;
                            }

                            //var scrollTopName = $state.current.name + '_scrollTop';
                            //if ((localStorage.getItem(scrollTopName) === '0') && localStorage.getItem($state.current.name)) {
                            //    //如果记录的 缓存有位置信息,并且 位置 是0, && 有缓存数据信息就去请求最新数据
                            //}

                            var num = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                            if (num === 0) {//当滚动到0的时候
                                $rootScope.$broadcast('showHeader');//显示header
                                $rootScope.$broadcast('showShaiXuan');//显示筛选
                                console.log('请求最新数据');
                            }
                        }
                    }

                    /**
                     * 判断是否需要获取newlist
                     * @returns {布尔} 需要就 是true
                     */
                    function trueNeedNewList() {
                        switch ($state.current.name) {
                            case 'home':
                                return true;
                            case 'need':
                                return true;
                        }
                    }


                });
                tap.init();//判断手机网页 手机 绑定 tap 事件, 网页绑定 click事件,(点击跳转url)
            }, 0);
        });

        //显示H1SearchBtn 监听事件
        $scope.$on('showHiSearchBtn', showH1SearchBtn);

        /**
         * 判断登录
         */
        function trueIsLogin() {
            if (localStorage.getItem('isLogin')) {
                return true;
            } else {//跳转到登录
                _goLogin();
                return false;
            }

            /**
             * 跳转到登录
             * @private
             */
            function _goLogin() {
                $state.go('login');
            }


        }

        /**
         * 修改发布按钮图标
         */
        function changeSubBtnIcon(def) {
            if (def) {
                $timeout(function () {
                    $scope.push = 'fa-plus-circle';
                }, 0);
            } else {
                if ($scope.push == 'fa-plus-circle') {
                    $timeout(function () {
                        $scope.push = 'fa-minus-circle';
                    }, 0);
                } else {
                    $timeout(function () {
                        $scope.push = 'fa-plus-circle';
                    }, 0);
                }
            }
        }

        /**
         * 底部导航 显示 添加需求技能面板 按钮
         * @type {Element}
         */
        var addFromBtn = document.getElementById('addFromBtn');
        clickBin(addFromBtn);

        /**
         * bin 添加按钮点击事件
         */
        function clickBin(doc) {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
            });
            doc.addEventListener(type, function () {
                changeSubBtnIcon();
                $rootScope.$broadcast('showAddFrom');
            });
        }

        /**
         * bindH1SearchBtn 绑定 h1 搜索按钮点击事件
         */
        function bindH1SearchBtn() {
            $timeout(function () {
                try {
                    var searchBtnDom = document.getElementById('searchIconH1');
                    var angularSearchBtnDom = angular.element(searchBtnDom);
                    searchBtnDom.addEventListener('tap', function () {
                        $rootScope.$broadcast('focusSearch');//搜索焦点事件
                        angularSearchBtnDom.css({
                            'display': 'none'
                        });
                    });
                } catch (e) {
                    console.log('无searchBtn');
                }
            }, 0);
        }

        /**
         * 显示 h1SearchBtn
         */
        function showH1SearchBtn() {
            $timeout(function () {
                try {
                    var searchBtnDom = document.getElementById('searchIconH1');
                    var angularSearchBtnDom = angular.element(searchBtnDom);
                    angularSearchBtnDom.css({
                        'display': 'block'
                    });
                } catch (e) {
                    console.log('无searchBtn');
                }
            }, 0);
        }

        /**
         * 判断是否显示 hedaer trueShowHeader
         */
        function trueShowHeader() {
            if (localData.trueShowHedaer($state.current.name)) {
                $rootScope.$broadcast('showHeader', true);//广播当前页面需要显示 header
            } else {
                $rootScope.$broadcast('hideHeader', true);//广播当前页面需要隐藏 header
            }
        }

    }
})();
