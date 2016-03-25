/**
 * apiPost.admin.block.factory.js
 * 命名注释：server简称_apiPost. 父模块 admin . 功能_post api 接口，加入$q 方法，返回callback. 类型_factory.js
 */

(function () {
    'use strict';

    /**
     * 配置相关
     * 16/3/23 */
    var conf = {
        sosoAk: 'KFSBZ-RR7H4-5IMUE-X7I67-R6EZS-PWBCK',//sosoak
        gaoDeAk:'8bc8bb3d13cc9fdab255b1aeb5d1c533'//高德ak
    };

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
                case 'getCurlJson' ://测试admin Curl
                    var urlJson = apiUrl.caiji.getUrl;
                    _post(urlJson, postData).then(callBack, callBackErr);
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
                case 'getOneCityArea' ://根据2级pid 查询 1级
                    var url5 = apiUrl.caiji.getOneCityArea;
                    console.log('getOneCityArea', postData);
                    _post(url5, postData).then(callBack, callBackErr);
                    break;
                case 'getStrGps' ://根据地址反查gps 传str
                    var url6 = apiUrl.caiji.getStrGps + postData.str + "&key=" + conf.sosoAk;
                    _get(url6).then(callBack, callBackErr);
                    break;
                case 'getGetPost' ://传gpsObj 返回 gps的 pois 显示短地址,半径 5000
                    //var url7 = apiUrl.caiji.getGetPost + postData.lat + ',' + postData.lng + '&get_poi=1&poi_options?address_format=short;radius=5000;' + "&key=" + conf.sosoAk;
                    var url7 = apiUrl.caiji.getGetPost + postData.lat + ',' + postData.lng + '&get_poi=1&poi_options?address_format=short;radius=5000;policy=3;' + "&key=" + conf.sosoAk;
                    _get(url7).then(callBack, callBackErr);
                    break;
            }
        };

        //caiji
        apiUrl.caiji.getUrl = config.host.nodeHost + '/admin/caiji/getUrl';//curl 一条url
        apiUrl.caiji.getJsonUrl = config.host.nodeHost + '/admin/caiji/getJsonUrl';// curl一条json

        //city
        apiUrl.caiji.getThreeCityArea = config.host.nodeHost + '/admin/caiji/getThreeCityArea';// 查询全部三级 传 {limit:num,skip:num}
        apiUrl.caiji.getOneCityArea = config.host.nodeHost + '/admin/caiji/getOneCityArea';// 根据2级pid 查询 1级

        //临时统计 tempcount
        apiUrl.caiji.addTempCount = config.host.nodeHost + '/admin/caiji/addTempCount';//添加一条count数据
        apiUrl.caiji.upDataTempCount = config.host.nodeHost + '/admin/caiji/saveTempCount';//更新一条数据
        apiUrl.caiji.getPoisTempCountNubmer = config.host.nodeHost + '/admin/caiji/findOneTempCountVal';//获取pois临时统计 数

        //soso 地图接口
        //apiUrl.caiji.getStrGps = "http://apis.map.qq.com/ws/geocoder/v1/?address=" + conf.str + "&key=" + conf.sosoAk;
        apiUrl.caiji.getStrGps = "http://apis.map.qq.com/ws/geocoder/v1/?address=";//get gps

        //http://apis.map.qq.com/ws/geocoder/v1/?location=39.984154,116.307490&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&get_poi=1
        apiUrl.caiji.getGetPost = "http://apis.map.qq.com/ws/geocoder/v1/?location=";//get pois

        function _post(url, postData) {
            var defer = $q.defer();
            $http.post(url, postData).success(function (doc) {
                defer.resolve(doc);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }

        function _get(url) {
            var defer = $q.defer();
            url = url.replace('http://', '');
            postApi('getCurlTest', {url: url}, function (doc) {
                defer.resolve(doc);
            }, function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }

        return postApi;
    }
})();