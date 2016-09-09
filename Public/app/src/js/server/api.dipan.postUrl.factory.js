/**
 * apiPost.dipan.block.factory.js
 * 命名注释：server简称_apiPost. 父模块 dipan . 功能_post api 接口，加入$q 方法，返回callback. 类型_factory.js
 */

(function () {
    'use strict';

    /** api接口,nodejs,php  */
    var apiUrl = {};

    angular.module('dipan').factory('api', api);
    api.$inject = ['$http', '$q', 'config'];

    function api($http, $q, config) {
        var postApi;

        function _post(url, postData) {
            var defer = $q.defer();
            $http.post(url, postData).success(function (doc) {
                defer.resolve(doc);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }

        return postApi;
    }

})();
