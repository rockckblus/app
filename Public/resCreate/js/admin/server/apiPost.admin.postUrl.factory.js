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
        //sosoAk: 'KM4BZ-KIJRU-6UMVZ-BYRS4-4R2J5-KXBYQ',//sosoak 3008 3
        //sosoAk: 'KFSBZ-RR7H4-5IMUE-X7I67-R6EZS-PWBCK',//sosoak
        //sosoAk: '7YBBZ-P6FAF-N77JZ-J6U4X-XJZD2-AXF5J',//sosoak
        sosoAk: _getPort(),
        gaoDeAk: '8bc8bb3d13cc9fdab255b1aeb5d1c533'//高德ak
    }

    /**************************
     * 获取当前url端口号
     * 16-5-17 上午8:43 ByRockBlus
     **************************/
    function _getPort() {
        var url = window.location.href;
        console.log('url', url);
        var ak;
        url = url.split(':');
        url = url[2];
        url = url.split('/');
        url = url[0];


        switch (url) {
            case '3008':
                ak = 'ZVTBZ-ENYA6-E35S4-M47JC-3FI6Q-HEBSY';//sosoak 3008 1
                break;
            case '3009':
                ak = 'AXNBZ-VOS2P-NB5DC-LWNCN-4UBME-P7F23';//soso ak 3008 2
                break;
        }
        return ak;
    }

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
                    console.log('postData', postData);
                    var url7 = apiUrl.caiji.getGetPost + postData.lat + ',' + postData.lng + '&get_poi=1&poi_options?address_format=short;radius=5000;policy=3;' + "&key=" + postData.sosoAk;
                    _get(url7).then(callBack, callBackErr);
                    break;
                case 'eachGpsInChina' ://判断soso接口, 判断 临时 gps表,是否属于中国
                    var url8 = apiUrl.caiji.eachGpsInChina;
                    _post(url8, {}).then(callBack, callBackErr);
                    break;
                case 'addTempGpsChina' ://添加一条 中国gps数据
                    var url9 = apiUrl.caiji.addTempGpsChina;
                    _post(url9, postData).then(callBack, callBackErr);
                    break;

            }
        };

        //caiji
        apiUrl.caiji.getUrl = config.host.nodeHost + '/admin/caiji/getUrl';//curl 一条url
        apiUrl.caiji.getJsonUrl = config.host.nodeHost + '/admin/caiji/getJsonUrl';// curl一条json
        apiUrl.caiji.eachGpsInChina = config.host.nodeHost + '/admin/caiji/eachGpsInChina';//去soso接口,判断 临时gps表再不在中国
        apiUrl.caiji.addTempGpsChina = config.host.nodeHost + '/admin/caiji/addTempGpsChina';//添加一条 中国gps数据

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