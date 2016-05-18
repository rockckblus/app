/**
 * angular.module  admin
 * factory config {
 *  host:nodeHost //api url
 * }
 * */
(function (window, document) {
    'use strict';

    /**
     * 声明module
     * 16/2/1 */
    var admin = angular.module('admin', []);

    admin.controller('body', body);

    body.$inject = ['$scope'];

    function body($scope) {
    }

    /**
     * config 定义 全局变量
     * 16/3/8 */
    angular.module('admin').factory('config', function () {
        return config();
    });

    /**
     * 定义系统常量config
     * 16/3/8 */

    function config() {
        var port = _getPort();
        return {
            host: {//host 配置
                nodeHost: 'http://www.dipan.so:' + port//nodejsApi hostUrl
            }
        };
    }

    /**************************
     * 获取当前url端口号
     * 16-5-17 上午8:43 ByRockBlus
     **************************/
    function _getPort() {
        var url = window.location.href;
        var port;
        url = url.split(':');
        url = url[2];
        url = url.split('/');
        url = url[0];

        switch (url) {
            case '8082':
                port = '3082';
                break;
            case '8083':
                port = '3083';
                break;
            case '8084':
                port = '3084';
                break;
            case '8085':
                port = '3085';
                break;
            case '8086':
                port = '3086';
                break;
            case '8087':
                port = '3087';
                break;
            case '8088':
                port = '3088';
                break;
            case '8089':
                port = '3089';
                break;
            case '8090':
                port = '3090';
                break;
            case '8091':
                port = '3091';
                break;
        }
        return port;
    }


})(window, document);