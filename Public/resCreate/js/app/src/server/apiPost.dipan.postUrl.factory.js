/**
 * apiPost.dipan.block.factory.js
 * 命名注释：server简称_apiPost. 父模块 dipan . 功能_post api 接口，加入$q 方法，返回callback. 类型_factory.js
 */

(function () {
    'use strict';

    /** api接口,nodejs,php  */
    var apiUrl = {
        nodejs: {
            system: {},
            city: {}
        },
        php: {}
    };


    angular.module('dipan').factory('api', api);
    api.$inject = ['$http', '$q', 'config'];

    function api($http, $q, config) {
        var postApi = function (funName, postData, callBack, callBackErr) {
            switch (funName) {
                case 'saveSession' ://添加一条session 没有就更新
                    var url = apiUrl.nodejs.system.saveSession;
                    _post(url, postData).then(callBack, callBackErr);
                    break;
                case 'findSessionContent' ://根据sessionid 返回sessionContent
                    var url2 = apiUrl.nodejs.system.findSessionContent;
                    _post(url2, postData).then(callBack, callBackErr);
                    break;
                case 'selectHotCity' ://根据sessionid 返回sessionContent
                    var url3 = apiUrl.nodejs.city.selectHotCity;
                    _post(url3, postData).then(callBack, callBackErr);
                    break;

            }
        };

        //system
        apiUrl.nodejs.system.saveSession = config.host.nodeHost + '/system/saveSession';//save一条session 传reqbody
        apiUrl.nodejs.system.findSessionContent = config.host.nodeHost + '/system/findSessionContent';//根据sessionid find session content

        //city
        apiUrl.nodejs.city.selectHotCity = config.host.nodeHost + '/city/selectHotCity';//返回热门城市

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
