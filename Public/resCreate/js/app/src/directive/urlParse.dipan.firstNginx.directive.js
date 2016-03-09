/**
 * 测试directiv
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';
    angular.module('dipan').directive('urlParse', urlParse);
    function urlParse() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            link: function (scope, element, attrs) {
                console.log('attr', JSON.parse(attrs.urlParse));
//                console.log('attr', attrs.urlParse);
            }
        };
    }

    thisController.$inject = ['$scope', 'urlParse'];

    function thisController($scope, urlParse) {
        $scope.urlParse = urlParse;
    }

})();
