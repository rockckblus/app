/**
 * urlParse.dipan.firstNginx.directive.js
 * 命名注释：directive简称_urlParse. 父模块_dipan . 功能_解析url服务 根据url 取对应地区 分类 关键词 初始数据,并通知改变全局变量 类型_directive .js
 * 使用 ：<div url-parse></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('urlParse', urlParse);
    function urlParse() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            link: function (scope, element, attrs) {
                scope.data = JSON.parse(attrs.urlParse);
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'urlParse', 'api'];

    function thisController($scope, $rootScope, $timeout, urlParse, api) {

        $timeout(function () {
            urlParse.data = $scope.data;
            $scope.data.queryNode = true;//是node Api
            api('saveSession', $scope.data, saveSessionCallBack);
            $rootScope.$broadcast('urlParseChange');//通知全局变量更新 urlParse.dipan.firstData.factory.js

            /**
             * 测试findSessionContent
             * 16/3/16 */
            api('findSessionContent', $scope.data.session, function (re) {
                //console.log('reContent', re);
            });
        }, 0);


    }

    function saveSessionCallBack(doc) {
        //console.log('docFront', doc);
    }

})();
