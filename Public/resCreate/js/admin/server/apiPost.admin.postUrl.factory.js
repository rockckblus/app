/**
 * apiPost.admin.block.factory.js
 * 命名注释：server简称_apiPost. 父模块 admin . 功能_post api 接口，加入$q 方法，返回callback. 类型_factory.js
 */

(function () {
    'use strict';

    /** admin api接口,nodejs  */
    var apiUrl = {
        caiji: {
            getUrl: ''
        }
    };


    angular.module('admin').factory('api', api);
    api.$inject = ['$http', '$q', 'config'];

    function api($http, $q, config) {
        var postApi = function (funName, postData, callBack, callBackErr) {
            switch (funName) {
                case 'getCurlTest' ://测试admin Curl
                    var url = apiUrl.caiji.getUrl;
                    _post(url, postData).then(callBack, callBackErr);
                    break;

            }
        };

        //caiji
        apiUrl.caiji.getUrl = config.host.nodeHost + '/admin/caiji/getUrl';//curl 一条url

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
