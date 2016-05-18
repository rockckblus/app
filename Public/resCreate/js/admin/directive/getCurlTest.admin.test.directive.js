/**
 * getCurlTest.admin.test.directive.js
 * 命名注释：directive简称_getCurlTest. 父模块_admin. 功能 curl 一个url,返回的json ,模板 解析成 html 类型_directive .js
 * 使用 ：<div get-curl-test></div>
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';

    angular.module('admin').directive('getCurlTest', getCurlTest);


    /**
     * angular 载入完成后。显示modle值
     * 15-12-26 */
    function getCurlTest() {
        return {
            restrict: 'A',
            templateUrl: '/Public/resCreate/js/admin/directiveHtml/getCurlTest.html',
            replace: false,
            scope: {},
            controller: controller
        };
    }

    controller.$inject = ['$http', '$scope', '$timeout', 'api'];

    function controller($http, $scope, $timeout, api) {
        $scope.doc = '';//返回的文档
        $scope.url = '';//url
        $scope.mess = '';//提示信息
        $scope.isJson = false;//是否 显示json 还是 解析成 html

        $scope.fun = {
            /**
             * curl 按钮 点击事件
             * 16/3/22 */
            getCurlUrl: getCurlTest
        };


        function getCurlTest() {
            if ($scope.url == '') {
                $scope.mess = '无url';
                return false;
            }
            var postObj = {
                url: $scope.url.replace('http://', '')
            };
            api('getCurlTest', postObj, _callBack,_err);


            function _callBack(doc) {
                $timeout(function () {
                    if ($scope.isJson) {
                        $scope.doc = doc;
                    } else {
                        $scope.doc = angular.fromJson(doc);
                    }
                }, 0);
            }

            function _err(){
                $timeout(function (err) {
                    $scope.doc = err ;
                })
            }
        }
    }


})();