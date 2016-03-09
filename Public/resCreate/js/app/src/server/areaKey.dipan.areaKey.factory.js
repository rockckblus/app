/**
 *areaKey.dipan.areaKey.factory.js
 * 命名注释：server简称_areaKey. 父模块 dipan . 功能_areaKey 数据共享. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('areaKey', areaKey);
    areaKey.$inject = ['$http', '$q', 'config'];

    function areaKey($http, $q, config) {

        var defered = $q.defer();

        var re;
        var url = config.host.nodeHost + '/city/getAllOneCity';
        var url2 = config.host.nodeHost + '/acity/getAllOneCity';

        var a = function () {
            $http.post(url2, {})
                .success(function (re) {
                    defered.resolve(re);
                }).error(function (err) {
                    defered.reject(err);
                });
        };

        var b = function () {
            setTimeout(function(){
                $http.post(url, {})
                    .success(function (re) {
                        defered.resolve(re);
                    })
                    .error(function (err) {
                        defered.reject(err);
                    });

            },1000);
        };

        defered.promise
//            .then(a)
            .then(b, function (err) {
                alert('shibai');
            })
            .then(a);

        b();

        re = {};
        return re;
    }
})();

