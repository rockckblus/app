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
            scope: {},
            controller: thisController,
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$state', '$timeout'];

    function thisController($state, $timeout) {
        var delCatch = [
            'isLogin',
            'userData',
            'clickShaXuan',
            'starArr',
            'home_scrollTop',
            'need_scrollTop',
            'radio1',
            'radio2',
            'radio3',
            'radio4',
            'needRadio1',
            'needRadio2',
            'roundCodeId',
        ];
        angular.forEach(delCatch, function (vo) {
            localStorage.removeItem(vo);
        });
        $timeout(function () {
            $state.go('login');
        }, 0);
    }


})();
