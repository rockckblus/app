/**
 *areaKey.dipan.areaKey.factory.js
 * 命名注释：server简称_areaKey. 父模块 dipan . 功能_areaKey 数据共享. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('areaKey', areaKey);

    areaKey.$inject = ['$http', '$q', 'config'];

    function areaKey($http, $q, config) {
        var re;
        var url = config.host.nodeHost + '/city/getAllOneCity';
        $http.post(url, {}, function (re) {
           console.log('re',re);
        });

        re = {};
        return re;
    }
})();

