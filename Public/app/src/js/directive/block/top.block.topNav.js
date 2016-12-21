/**
 * 命名注释：directive简称_top. 父模块_block. 功能_顶部导航 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('top', top);

    function top() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/top.block.topNav.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', '$state'];

    function thisController($scope, $rootScope, $timeout, localData, $state) {

        var isShowHeader = false;//声明当前页面是否需要显示header
        $scope.titleText = '';
        $scope.headerShow = false;//显示 header
        $scope.delSearch = false;//删除搜索按钮 显示
        $scope.searchPlace = '';//搜索的 place
        $scope.search = '';//搜索模型
        $scope.searchIcon = false;//search图标显示
        $scope.topSearch = false;//search input Div
        $scope.searchLeftArea = false;//search 左侧 地区搜索 directive
        $scope.showCancel = false;//取消搜索按钮显示
        $scope.cancelClick = cancelClick;//取消按钮点击事件
        $scope.focusSearch = focusSearch;//search焦点事件
        $scope.blurSearch = blurSearch;//search失去焦点事件
        $scope.$on('blurSearch', blurSearch);//监听让搜素事情焦点
        $scope.$on('hideHeader', function (e, gold) {
            if (gold) {//如果是全局穿过来的 隐藏header事件,
                isShowHeader = false;
            }
            if (!isShowHeader) {
                $rootScope.$broadcast('isShowHeader', false);//广播 tab 设置是否需要 变换tab样式
            }
            $timeout(function () {
                $scope.headerShow = false;  //关闭header
            }, 0);
            hideHeader();
        });
        $scope.$on('showHeader', function (e, gold) {
            cancelClick();//取消按钮点击事件,先还原顶部 搜索按钮
            if (gold) {//如果是全局穿过来的 显示header事件,
                isShowHeader = true;
                $rootScope.$broadcast('isShowHeader', true);//广播 tab 设置是否需要 变换tab样式
            }
            if (isShowHeader) {
                $rootScope.$broadcast('isShowHeader', true);//广播 tab 设置是否需要 变换tab样式
            }
            if (isShowHeader) {//如果当前页面需要显示header,再去显示header
                $timeout(function () {
                    $scope.headerShow = true;  //关闭header
                    showHeader();
                }, 0);
            }
        });
        $scope.$on('changeBody', changeTitleText);
        $scope.$on('focusSearch', focusSearch);
        $scope.$on('cancelClick', cancelClick);//监听取消点击事件

        //topSearch 显示隐藏监听事件
        $scope.$on('showTopSearch', showTopSearch);
        $scope.$on('hideTopSearch', hideTopSearch);

        //watch search
        $scope.$watch('search', changeSearch);

        //监听外部传来的关键词赋值
        $scope.$on('giveSearch', giveSearch);

        init();
        function init() {
            bindDelSearchBtn();//绑定删除按钮点击事件
            bindCancelBtn();//绑定取消按钮点击事件
        }


        /**
         * getTitle 获取主标题   "分类"
         * @param {网址}url
         * @returns {*}
         * @private
         */
        function changeTitleText() {
            $timeout(function () {
                var url = $state;
                _getTitle(url.current.url);
            }, 0);

            function _getTitle(url) {
                switch (url) {
                    case '/home':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/need':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/star':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/login':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/area':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/search':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    case '/setting':
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        break;
                    default:
                        $timeout(function () {
                            $scope.titleText = '';
                        }, 0);
                        return false;
                }
            }

        }

        /**
         * changeSearch search模型变化的响应事件
         */
        function changeSearch(e) {
            if (e) {
                showDelSearch();//显示删除按钮
            } else {
                hideDelSearch();//隐藏删除按钮
            }

            //获取联想搜索
            $rootScope.$broadcast('getKeyList', e);
            //给titleInfo 数据
            $rootScope.$broadcast('changeTitleInfo', e);
            //去搜索数据
            $rootScope.$broadcast('getSelectDown', e);

        }

        /**
         *search 焦点事件
         */
        function focusSearch() {
            showHeader();
            $timeout(function () {
                $scope.topSearch = true;//显示inputDiv
                $scope.searchPlace = '技能';
                $scope.showCancel = true;//显示取消按钮
                // $scope.search = '';
                $timeout(function () {
                    document.getElementById('searchTop').focus();
                }, 400);
            }, 0);
            $rootScope.$broadcast('showSearchArea');//显示地区选择面板
            $rootScope.$broadcast('showLianXianShow');//显示联想选择面板
            $rootScope.$broadcast('getKeyList', '');//默认去取热门关键词,不传key,就是热门
            hideSearchIcon();//隐藏搜索icon
        }

        /**
         * search 失去焦点事件
         */
        function blurSearch() {
            $timeout(function () {
                $scope.searchPlace = '技能';
            }, 0);

            if (!$scope.showCancel) {
                $rootScope.$broadcast('hideSearchArea');//隐藏地区选择面板
                showSearchIcon();//显示搜索icon
            }
            $rootScope.$broadcast('hideLianXianShow');//显示联想选择面板
        }

        /**
         * show delSearch
         */
        function showDelSearch() {
            $timeout(function () {
                $scope.delSearch = true;
            }, 0);
        }

        /**
         * hide delSearch
         */
        function hideDelSearch() {
            $timeout(function () {
                $scope.delSearch = false;
            }, 0);
        }

        /**
         *bindDelSearchBtn();//绑定删除按钮点击事件
         */
        function bindDelSearchBtn() {
            var delDom = document.getElementById('topSearchRight');
            if (!delDom) {
                return false;
            }
            delDom.addEventListener('tap', function () {
                $timeout(function () {
                    $scope.search = '';
                    $timeout(function () {
                        document.getElementById('searchTop').focus();
                    }, 0);
                }, 0);
            });
        }

        /**
         *$scope.searchIcon = true;//search图标显示
         */
        function showSearchIcon() {
            $timeout(function () {
                $scope.searchIcon = true;//search图标显示
            }, 0);
        }

        /**
         *$scope.searchIcon = false;//search图标隐藏
         */
        function hideSearchIcon() {
            $timeout(function () {
                $scope.searchIcon = false;//search图标显示
            }, 0);
        }

        /**
         * cancelClick 取消按钮点击事件
         */
        function cancelClick() {
            hideHeader();
            $timeout(function () {
                // $scope.search = '';
                $scope.showCancel = false;
                $scope.topSearch = false;//隐藏inputDiv
                $rootScope.$broadcast('hideSearchArea');//隐藏地区选择面板
                $rootScope.$broadcast('showHiSearchBtn');//显示h1搜索btn
                showSearchIcon();//显示搜索icon
            }, 0);
        }

        /**
         * bindCancelBtn 绑定取消按钮点击事件
         */
        function bindCancelBtn() {
            try {
                document.getElementById('cancel').addEventListener('tap', function () {
                    cancelClick();
                });
            } catch (e) {
                console.log('no cancel dom');
            }
        }

        /**
         * 显示topSearch
         */
        function showTopSearch() {
            $timeout(function () {
                $scope.topSearch = true;
            }, 0);
            showHeader();
        }

        /**
         * 隐藏topSearch
         */
        function hideTopSearch() {
            $timeout(function () {
                $scope.topSearch = false;
            }, 0);
            hideHeader();
        }

        /**
         * 给 search 赋值 giveSearch
         */
        function giveSearch(v, key) {
            $timeout(function () {
                $scope.search = key;
            }, 0);
        }

        /**显示header
         */
        function showHeader() {
            var allHeaderDom = document.getElementById('allHeader');
            allHeaderDom.style.display = 'block';
            $timeout(function () {
                $scope.headerShow = true;  //打开header
            }, 0);
            try {
                var tabDom = document.getElementById('tab');
                var viewContent = document.getElementById('viewContent');
                tabDom.style.top = '50px';
                viewContent.style.marginTop = '50px';
            } catch (e) {
                console.error(e);
            }
        }

        /**隐藏header
         */
        function hideHeader() {
            if ($state.current.name == 'home') {
                try {
                    var allHeaderDom = document.getElementById('allHeader');
                    var tabDom = document.getElementById('tab');
                    var viewContent = document.getElementById('viewContent');
                    $timeout(function () {
                        $scope.headerShow = false;  //关闭header
                        allHeaderDom.style.display = 'none';
                        tabDom.style.top = '0px';
                        viewContent.style.marginTop = '0px';
                    }, 0);

                } catch (e) {
                    console.error(e);
                }
            }
        }
    }


})();
