(function () {
    'use strict';

    /**
     * body 控制器
     * 16/2/1 */
    angular.module('dipan').controller('body', body);

    /**
     * 手动注入
     * 16/2/1 */
    body.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tap', '$state'];

    /**
     * controllerFun
     * 16/2/1 */
    function body($scope, $rootScope, $timeout, localData, tap, $state) {
        $scope.$on('changeBody', function () {
            $rootScope.$broadcast('openLoading');//载入时候 默认打开loading
            var _url = '/' + $state.current.name;
            $timeout(function () {
                $scope.title = localData.getTitle(_url);//getTitle
                $scope.showTab = localData.showTab(_url);//是否显示 tab
                $scope.tabList = localData.tab(_url);//tablist body 控制器
                $scope.url = _url;//url变量,判断 top 模板 显示图标用

                mui.plusReady(function () {
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
                });
                tap.init();
            }, 0);
        });

    }

})();
