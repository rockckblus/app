(function () {
    'use strict';

    /**
     * body 控制器
     * 16/2/1 */
    angular.module('dipan').controller('body', body);

    /**
     * 手动注入
     * 16/2/1 */
    body.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tap', '$state', 'tools', 'getList'];

    /**
     * controllerFun
     * 16/2/1 */
    function body($scope, $rootScope, $timeout, localData, tap, $state, tools, getList) {
        $scope.$on('changeBody', function () {
            $rootScope.$broadcast('openLoading');//载入时候 默认打开loading
            var _url = '/' + $state.current.name;
            console.log('state', $state);
            $timeout(function () {
                $scope.title = localData.getTitle(_url);//getTitle
                $scope.showTab = localData.showTab(_url);//是否显示 tab
                $scope.tabList = localData.tab(_url);//tablist body 控制器
                $scope.url = _url;//url变量,判断 top 模板 显示图标用

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
                                tools.alert({
                                    title: '请求最新数据'
                                });
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
                        }
                    }
                });

                tap.init();//判断手机网页 手机 绑定 tap 事件, 网页绑定 click事件,(点击跳转url)
            }, 0);
        });

    }

})();
