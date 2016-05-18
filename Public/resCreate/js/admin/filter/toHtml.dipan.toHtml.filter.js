/**
 * toHtml.admin.toHtml.directive.js
 * 命名注释：filter简称_toHtml. 父模块_dipan . 功能_html代码解析成正常html代码输出 . 类型_filter .js
 * 使用：    <div ng-bind-html="doc|toHtml"></div>
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';

    /**
     * html filter
     * 15-12-31 */

    angular.module('admin').filter('toHtml', toHtml);
    toHtml.$inject = ['$sce'];
    function toHtml($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }
})();