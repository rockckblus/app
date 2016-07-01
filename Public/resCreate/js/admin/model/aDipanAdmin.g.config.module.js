/**
 * angular.module  admin
 * factory config {
 *  host:nodeHost //api url
 * }
 * */
(function (window, document) {
    'use strict';

    /**
     * 声明module
     * 16/2/1 */
    var admin = angular.module('admin', []);

    admin.controller('body', body);

    body.$inject = ['$scope'];

    function body($scope) {
    }

    /**
     * config 定义 全局变量
     * 16/3/8 */
    angular.module('admin').factory('config', function () {
        return config();
    });

    /**
     * 定义系统常量config
     * 16/3/8 */

    function config() {
        var port = _getPort();
        return {
            host: {//host 配置
                nodeHost: 'http://www.dipan.so:' + port//nodejsApi hostUrl
            }
        };
    }

    /**************************
     * 获取当前url端口号
     * 16-5-17 上午8:43 ByRockBlus
     **************************/
    function _getPort() {
        var url = window.location.href;
        var port;
        url = url.split(':');
        url = url[2];
        url = url.split('/');
        url = url[0];

        switch (url) {
            case '8082':
                port = '3082';
                break;
            case '8083':
                port = '3083';
                break;
            case '8084':
                port = '3084';
                break;
            case '8085':
                port = '3085';
                break;
            case '8086':
                port = '3086';
                break;
            case '8087':
                port = '3087';
                break;
            case '8088':
                port = '3088';
                break;
            case '8089':
                port = '3089';
                break;
            case '8090':
                port = '3090';
                break;
            case '8091':
                port = '3091';
                break;

            case '8092':
                port = '3092';
                break;
            case '8093':
                port = '3093';
                break;
            case '8094':
                port = '3094';
                break;
            case '8095':
                port = '3095';
                break;
            case '8096':
                port = '3096';
                break;
            case '8097':
                port = '3097';
                break;
            case '8098':
                port = '3098';
                break;
            case '8099':
                port = '3099';
                break;
            case '8100':
                port = '3100';
                break;
            case '8101':
                port = '3101';
                break;

        /*************************
         * next 20
         * 16/6/28 下午6:58 ByRockBlus
         *************************/
            case '8201':
                port = '3201';
                break;
            case '8202':
                port = '3202';
                break;
            case '8203':
                port = '3203';
                break;
            case '8204':
                port = '3204';
                break;
            case '8205':
                port = '3205';
                break;
            case '8206':
                port = '3206';
                break;
            case '8207':
                port = '3207';
                break;
            case '8208':
                port = '3208';
                break;
            case '8209':
                port = '3209';
                break;
            case '8210':
                port = '3210';
                break;
            case '8211':
                port = '3211';
                break;
            case '8212':
                port = '3212';
                break;
            case '8213':
                port = '3213';
                break;
            case '8214':
                port = '3214';
                break;
            case '8215':
                port = '3215';
                break;
            case '8216':
                port = '3216';
                break;
            case '8217':
                port = '3217';
                break;
            case '8218':
                port = '3218';
                break;
            case '8219':
                port = '3219';
                break;
            case '8220':
                port = '3220';
                break;

        /*************************
         * next40
         * 16/7/1 下午1:10 ByRockBlus
         *************************/
            case '8301':
                port = '3301';
                break;
            case '8302':
                port = '3302';
                break;
            case '8303':
                port = '3303';
                break;
            case '8304':
                port = '3304';
                break;
            case '8305':
                port = '3305';
                break;
            case '8306':
                port = '3306';
                break;
            case '8307':
                port = '3307';
                break;
            case '8308':
                port = '3308';
                break;
            case '8309':
                port = '3309';
                break;
            case '8310':
                port = '3310';
                break;

            case '8311':
                port = '3311';
                break;
            case '8312':
                port = '3312';
                break;
            case '8313':
                port = '3313';
                break;
            case '8314':
                port = '3314';
                break;
            case '8315':
                port = '3315';
                break;
            case '8316':
                port = '3316';
                break;
            case '8317':
                port = '3317';
                break;
            case '8318':
                port = '3318';
                break;
            case '8319':
                port = '3319';
                break;
            case '8320':
                port = '3320';
                break;

        }
        return port;
    }


})(window, document);