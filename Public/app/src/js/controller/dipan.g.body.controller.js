(function () {
    'use strict';

    /**
     * body 控制器
     * 16/2/1 */
    angular.module('dipan').controller('body', body);

    /**
     * 手动注入
     * 16/2/1 */
    body.$inject = ['$scope', '$rootScope', '$timeout', 'localData', '$location', 'touchScroll'];

    /**
     * controllerFun
     * 16/2/1 */
    function body($scope, $rootScope, $timeout, localData, $location, touchScroll) {
        $scope.$on('changeBody', function () {
            $rootScope.$broadcast('openLoading');//载入时候 默认打开loading
            var _url = $location.url();
            $timeout(function () {
                $scope.title = localData.getTitle(_url);//getTitle
                $scope.showTab = localData.showTab(_url);//是否显示 tab
                $scope.tabList = localData.tab(_url);//tablist body 控制器
                $scope.url = _url;//url变量,判断 top 模板 显示图标用
            }, 0);
        });

    }

})();
