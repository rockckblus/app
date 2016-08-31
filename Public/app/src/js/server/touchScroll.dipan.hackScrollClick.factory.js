/**
 * touchScroll.dipan.hackScrollClick.factory.js
 * 命名注释：server简称_touchScroll. 父模块 dipan . 功能_hack scroll 之后的 点击事件. 类型_factory.js
 * 滚动借宿以后,禁止浏览器滚动(touchEnd),这样就可以响应点击事件
 */

(function () {
    'use strict';

    angular.module('dipan').factory('touchScroll', touchScroll);
    touchScroll.$inject = ['$rootScope'];

    function touchScroll($rootScope) {

        /**
         * ji禁止滚动
         * 15/12/22 */
        function preventDefault(e) {
            e.preventDefault();
        };


        /**
         *页面逻辑具体调用方法
         * 15/12/22 */
        var scroll = {
            start: function (e) {
                document.addEventListener('touchmove', preventDefault, false);//禁止浏览器滚动
            },
            stop: function (e) {
                document.removeEventListener('touchmove', preventDefault, false);//恢复浏览器滚动
            }
        };


        document.addEventListener('touchend', function () {
            console.log('end');
        });

        document.addEventListener('touchstart', function () {
            console.log('start');
        });
    }

})();
