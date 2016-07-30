(function () {
    'use strict';

    /**
     * body 控制器
     * 16/2/1 */
    angular.module('dipan').controller('body', body);

    angular.module('dipan').controller('header', header);
    header.$inject = ['$scope'];
    function header($scope, api) {
        $scope.title = '';
        $scope.$on('urlParseChangeSub', function () {
            //try {
            //    $scope.title = urlParse.data.seoTitle;
            //} catch (e) {
            //    console.error(e);
            //}

        });


    }


    /**
     * 手动注入
     * 16/2/1 */
    body.$inject = ['$scope', '$timeout'];

    /**
     * controllerFun
     * 16/2/1 */
    function body($scope, $timeout) {
        $scope.sidebar = basePath + '/src/html/block/sidebar.html';
    }


})();
