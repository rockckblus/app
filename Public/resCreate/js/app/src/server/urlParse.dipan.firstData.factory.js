/**
 * urlParse.dipan.urlParse.factory.js
 * 命名注释：server简称_urlParse. 父模块 dipan . 功能_全局变量 数据 模型. 类型_factory.js
 * ------------------------------------------------
 * 监听从模板解析来的 php变量对象 赋值改变事件 urlParseChange
 * 同时广播 所有 子域, 变量改变事件 urlParseChange
 */

(function () {
    'use strict';
    angular.module('dipan').factory('urlParse', urlParse);

    urlParse.$inject = ['$rootScope'];

    function urlParse($rootScope) {
        /**
         * 监听从模板解析来的 php变量对象 赋值改变事件 urlParseChange
         * 同时广播 所有 子域, 变量改变事件 urlParseChange
         * 16/3/10 */
        onUrlParseChange();

        /**
         * 返回urlParse变量对象
         * 16/3/10 */
        return {};


        /*************************
         * fun 详情
         * 16/3/10 ***************/

        /**
         * 监听从模板解析来的 php变量对象 赋值改变事件
         * 同时广播 所有 子域, 变量改变事件 urlParseChange
         * 16/3/10 */
        function onUrlParseChange() {
            $rootScope.$on('urlParseChange', function () {
                $rootScope.$broadcast('urlParseChangeSub');
            });
        }
    }
})();

