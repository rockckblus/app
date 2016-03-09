/**
 * urlParse.dipan.urlParse.factory.js
 * 命名注释：server简称_urlParse. 父模块 dipan . 功能_解析url服务 根据url 取对应地区 分类 关键词 初始数据. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('urlParse', urlParse);

    urlParse.$inject = ['$http', '$q', 'config'];

    function urlParse($http, $q, config) {
        var re;

//        var topUrl = window.location.href;
//        var url = config.host.nodeHost + '/city/getAllOneCity';
//        $http.post(url, {}).success(function (re) {
//            console.log('re', re);
//        });

        re = {};
        return re;
    }
})();

