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

    thisController.$inject = ['$scope', 'urlParse'];

    function thisController($scope, urlParse) {
        $scope.topArea = 'ddddd88888';

        /**
         * 监听php的全局变量对象解析事件,来更新key 并使用bindOne从新绑定
         * 16/3/17 */
        $scope.$on('urlParseChange', function () {
            $scope.topArea = 'aaaa';
            console.log('urlParse', urlParse);
        });

        /**
         * 给地方名称
         *
         <switch name="s['place']['type']">
         <case value='1'>{//一级 --天津} {$s['place']['thisCityInfo']['name']}
         </case>
         <case value='2'>{//2级 --武清} {$s['place']['oneCityInfo']['name']}{$s['place']['thisCityInfo']['name']}
         </case>
         <case value='3'>{//3级 --河西务} {$s['place']['oneCityInfo']['name']}{$s['place']['twoCityInfo']['name']}{$s['place']['thisCityInfo']['name']}
         </case>
         </switch>
         * 16/3/17 */


    }


})();
