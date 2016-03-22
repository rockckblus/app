/**
 * apiPost.admin.block.factory.js
 * 命名注释：server简称_apiPost. 父模块 admin . 功能_post api 接口，加入$q 方法，返回callback. 类型_factory.js
 */

(function () {
    'use strict';

    /** admin api接口,nodejs  */
    var apiUrl = {
        caiji: {}
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
                case 'addTempCount' ://添加一条 临时统计 功能
                    var url0 = apiUrl.caiji.addTempCount;
                    _post(url0, postData).then(callBack, callBackErr);
                    break;
                case 'upCountPoisAddOne' ://临时统计加1 ,postData {value:Number}
                    postData.name = '全部处理完成的3级地址数量';
                    var url2 = apiUrl.caiji.upDataTempCount;
                    _post(url2, postData).then(callBack, callBackErr);
                    break;
                case 'getPoisTempCountNumber' ://获取pois临时统计 数 postData{}
                    postData.name = '全部处理完成的3级地址数量';
                    var url3 = apiUrl.caiji.getPoisTempCountNubmer;
                    _post(url3, postData).then(callBack, callBackErr);
                    break;
                case 'getThreeCityArea' ://查询全部三级 传 {limit:num,skip:num}
                    var url4 = apiUrl.caiji.getThreeCityArea;
                    _post(url4, postData).then(callBack, callBackErr);
                    break;
            }
        };

        //caiji
        apiUrl.caiji.getUrl = config.host.nodeHost + '/admin/caiji/getUrl';//curl 一条url

        //city
        apiUrl.caiji.getThreeCityArea = config.host.nodeHost + '/admin/caiji/getThreeCityArea';// 查询全部三级 传 {limit:num,skip:num}


        //临时统计 tempcount
        apiUrl.caiji.addTempCount = config.host.nodeHost + '/admin/caiji/addTempCount';//添加一条count数据
        apiUrl.caiji.upDataTempCount = config.host.nodeHost + '/admin/caiji/saveTempCount';//更新一条数据
        apiUrl.caiji.getPoisTempCountNubmer = config.host.nodeHost + '/admin/caiji/findOneTempCountVal';//获取pois临时统计 数

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