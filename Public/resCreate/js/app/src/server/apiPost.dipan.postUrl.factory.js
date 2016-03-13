/**
 * tools.dipan.block.factory.js
 * 命名注释：server简称_api. 父模块 dipan . 功能_post api 接口，加入$q 方法，返回callback. 类型_factory.js
 */

(function () {
    'use strict';

    /** api接口,nodejs,php  */
    var apiUrl = {
        nodejs: {
            system: {}
        },
        php: {}
    };


    angular.module('dipan').factory('api', api);
    api.$inject = ['$http', '$q', 'config'];

    function api($http, $q, config) {
        var postApi = function (funName, callBack, callBackErr) {
            switch (funName) {
                case 'saveSession' :
                    var url = apiUrl.nodejs.system.saveSession;
                    _post(url).then(callBack, callBackErr);
                    break;
            }
        };


        //system
        apiUrl.nodejs.system.saveSession = config.host.nodeHost + '/system/saveSession';

        var defer = $q.defer();

        function _post(url) {
            $http.post(url).success(function (doc) {
                defer.resolve(doc);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }

        return postApi;
    }

})();
