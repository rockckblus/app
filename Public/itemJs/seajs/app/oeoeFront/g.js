define(
    function (require) {//声明全局相关变量
        require('http://www.dipan.so:8080/Public/publicDefault/angular.min.js');//angular
        var diPanApp = angular.module('diPanSo', []).config(function ($sceProvider) {
            $sceProvider.enabled(false);//使angular兼容ie7
        });

        /**
         * 地盘的全局dipanBody控制器
         * 15-2-25
         */
        diPanApp.controller('diPanBody', function ($scope) {
            $scope.$watch('$viewContentLoaded', function () {//angular 载入完成后。显示modle值
                $('.angularEnd').show();
            });
        })

        /**
         * 全局对象
         * @class
         * @memberOf all
         * 15-2-25
         */
        var g = {};
        g.apiUrl = 'http://dipan.so:8080/';
        g.diPanApp = diPanApp;//全局地盘网对象声明
        g.suggestion = 'http://api.map.baidu.com/place/v2/suggestion';//百度地图api相关
        g.baiduAk = 'pefbY6zsGmy2ugp6qPUeyp8Z';//百度开发ak
        return g;
    }
);
