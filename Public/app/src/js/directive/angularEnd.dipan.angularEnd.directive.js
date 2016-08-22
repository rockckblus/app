/**
 * angularEnd.dipan.angularEnd.directive.js
 * 命名注释：directive简称_angularEnd. 父模块_dipan . 功能_angualr 载入完成后显示modele值. 类型_directive .js
 * 使用 ：class='angular'
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';
    angular.module('dipan').directive('angularEnd', angularEnd);
    /**
     * angular 载入完成后。显示modle值
     * 15-12-26 */
    function angularEnd() {
        return {
            restrict: 'C',
            replace: false,
            link: function (scope, element, attrs) {
                console.log(11);
                scope.$watch('$viewContentLoaded', function () {
                    console.log(1111);
                    element[0].style.display = 'block';
                });
            }
        };
    }
})();
