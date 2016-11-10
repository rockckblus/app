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
                }, 0);
            }
        });
        $scope.$on('changeBody', changeTitleText);
        $scope.$on('focusSearch', focusSearch);

        //topSearch 显示隐藏监听事件
        $scope.$on('showTopSearch', showTopSearch);
        $scope.$on('hideTopSearch', hideTopSearch);

        //watch search
        $scope.$watch('search', changeSearch);


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
        }

        /**
         *search 焦点事件
         */
        function focusSearch() {
            $timeout(function () {
                $scope.topSearch = true;//显示inputDiv
                $scope.searchPlace = '技能';
                $scope.showCancel = true;//显示取消按钮
                $scope.search = '';
                $timeout(function () {
                    document.getElementById('searchTop').focus();
                }, 0);
            }, 0);
            $rootScope.$broadcast('showSearchArea');//显示地区选择面板
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
            $timeout(function () {
                $scope.search = '';
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
            document.getElementById('cancel').addEventListener('tap', function () {
                cancelClick();
            });
        }

        /**
         * 显示topSearch
         */
        function showTopSearch() {
            $timeout(function () {
                $scope.topSearch = true;
            }, 0);
        }

        /**
         * 隐藏topSearch
         */
        function hideTopSearch() {
            $timeout(function () {
                $scope.topSearch = false;
            }, 0);
        }


    }


})();
