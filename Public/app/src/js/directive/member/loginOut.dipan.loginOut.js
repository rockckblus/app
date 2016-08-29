/**
 * 命名注释：directive简称_my. 父模块_dipan . 功能_我的功能导航IndexList 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('loginOut', loginOut);
    function loginOut() {
        return {
            restrict: 'A',
            replace: false,
            controller: thisController,
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = [];

    function thisController($scope, $rootScope, $timeout, localData) {
        document.addEventListener('plusready', function () {
            var ws = plus.webview.currentWebview();
            plus.webview.close(ws);
        });
        
    }


})();
