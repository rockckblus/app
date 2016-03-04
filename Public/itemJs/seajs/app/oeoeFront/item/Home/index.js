//define(function (require) {
//    var g = require('seajs/app/oeoeFront/g');
//    var tools = require('seajs/app/oeoeFront/public/tools');
//
//    /**请求top angular控制器,切换城市，注册，发布信息按钮  15-3-14 */
//    require('seajs/app/oeoeFront/item/Home/block/diPanTop');
//
//    ///**根据url标示确定 url 载入不同对应js */
//    //var urlMark = $('#urlMark').attr('urlMark');
//    //
//    //if(urlMark == 'category'){
//    //    /**请求top angular控制器,切换城市，注册，发布信息按钮  15-3-14 */
//    //    require('seajs/app/oeoeFront/item/Home/block/dipanCategory');
//    //}
//
//
//    g.diPanApp.controller('diPanBody', function ($scope, $http) {
//
//        /**body控制器公共方法 默认根据ip载入对应城市功能 2期开发 todo data  2015-6-26*/
//
//        $scope.defaultCity = '全国';
//        /** 百度api服务，新浪获取失败时调用 */
//        function getBaidu() {
//            //百度接口
//            var baiIpApiUrl = 'http://api.map.baidu.com/location/ip';
//            tools.getJsp($http, baiIpApiUrl, '', function (re) {
//                if (re) {
//                    $scope.defaultArea = re.content.address;
//                    g.city = re.content.address; //赋值全局城市字符串
//                    tools.setCookie('defaultCity', re.content.address); //写入cookie城市信息
//                }
//            });
//        }
//
//        /**  获取city名*/
//        function getFirstCity() {
//            var getCityUrl = g.apiUrl + 'Home/Jsonp/getIpCity';
//            tools.getJsp($http, getCityUrl, function (re) {
//                if (re) {
//                    $scope.defaultArea = re;
//                    g.city = re;
//                    tools.setCookie('defaultCity', re); //写入cookie城市信息
//                } else {
//                    getBaidu();
//                }
//            })
//        };
//
//    })
//});