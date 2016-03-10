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
            controller: thisController,
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope'];

    function thisController($scope){

    }


})();
