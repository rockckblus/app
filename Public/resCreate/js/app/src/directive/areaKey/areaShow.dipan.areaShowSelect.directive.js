/**
 * areaShow.dipan.areaShowSelect.directive.js
 * 命名注释：directive简称_areaShow. 父模块_dipan . 功能_地区展示与选择. 类型_directive .js
 * 使用 ：<div area - key></div>
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';

    angular.module('dipan').directive('areaShow', areaShow);

    function areaShow() {
        return {
            restrict: 'A',
            replace: false,
            templateUrl: 'Public/resCreate/html/src/public/areaKey/areaShow.dipan.areaShowSelect.directive.html',
            scope: {},
            controller: thisController,
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', 'urlParse', 'repBindOnce'];

    function thisController($scope, urlParse, repBindOnce) {
        /**
         * 模板模型声明
         * 16/3/18 */
        $scope.oneCityInfoName = '城市';//一级城市
        $scope.otherCityList = [];//周边城市list

        /**
         * 监听全局变量 变换事件,给模型赋值
         * 16/3/18 */
        $scope.$on('urlParseChange', urlParseChange);

        /**
         * fun**********************
         * 热门 北京 上海 广州 武汉 成都 深圳 杭州 西安 南京 郑州 长沙 温州 福州 沈阳
         * 16/3/18 */
        function urlParseChange() {
            try {
                var session = urlParse.data.session;
                $scope.oneCityInfoName = session.place.oneCityInfo.name;//一级城市 :天津
                repBindOnce('oneCityInfoName', $scope);
                $scope.otherCityList = session.place.otherCity;//周边城市 廊坊 保定
            } catch (e) {
                urlParse.fun.selectHotCity(_giveHotCity);
            }

            function _giveHotCity(re) {//赋值热门城市
                $scope.otherCityList = re;
                console.log('otherCityList', $scope.otherCityList);
            }
        }


    }


})();
