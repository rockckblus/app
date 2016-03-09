/**
 * keyShow.dipan.keyShowSelect.directive.js
 * 命名注释：directive简称_keyShow. 父模块_dipan . 功能_顶部key展示选择directive. 类型_directive .js
 * 使用 ：<div key-show></div>
 * Created by rockblus
 */
(function () {
    'use strict';

    angular.module('dipan').directive('keyShow', keyShow);


    function keyShow() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            templateUrl: 'Public/resCreate/html/src/public/areaKey/keyShow.dipan.keyShowSelect.directive.html',
            controller: thisController,
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', 'areaKey'];

    function thisController($scope, areaKey) {

    }


})();
