define(
    function (require) {//声明全局相关变量
        require('http://dipan.so:8080/Public/publicDefault/angular.min.js');//angular
        var dwzApp = angular.module('dwz', []).config(function ($sceProvider) {//声明 angular
            $sceProvider.enabled(false);//使angular兼容ie7
        });

        //全局对象
        var g = {};
        g.app = dwzApp;
        return g;
    }
);