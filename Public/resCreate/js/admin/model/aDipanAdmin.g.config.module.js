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
        return {
            host: {//host 配置
                nodeHost: 'http://169.254.67.106:3008'//nodejsApi hostUrl
            }
        };
    }

})(window, document);