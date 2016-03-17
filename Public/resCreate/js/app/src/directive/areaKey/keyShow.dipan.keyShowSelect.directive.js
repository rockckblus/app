/**
 * angularEnd.dipan.angularEnd.directive.js
 * 命名注释：directive简称_angularEnd. 父模块_dipan . 功能_angualr 载入完成后显示modele值. 类型_directive .js
 * 使用 ：class='angular'
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';

    angular.module('dipan').directive('areaKey', areaKey);

    /**
     * angular 载入完成后。显示modle值
     * 15-12-26 */
    function areaKey() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            templateUrl: 'Public/resCreate/html/src/public/areaKey/areaKey.dipan.topAreaKey.directive.html',
            controller: thisController,
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', 'urlParse', 'repBindOnce'];

    function thisController($scope, urlParse, repBindOnce) {

        $scope.topArea = '';//top 地区模型
        $scope.$on('urlParseChange', urlParseChange);//监听主变量赋值成功,给地区模型值

        /** 声明 area 模型  */
        $scope.area = {
            hoverLine: '',
            hoverLineShow: false,
            jianTou: '▾',//▼ ▲▾
            shan: 'shan jianTou' //上箭头闪动效果
        };

        /** 声明line模型  */
        $scope.key = {
            firstShow: false,//判断是否第一次显示
            hoverLine: '',//高亮关键词,目前是加个边框，
            hoverLineShow: false,//控制 高亮显示
            jianTou: '',//▼ ▲▾ 无箭头
            shan: ''//cssk控制 // 无效果
        };


        $scope.areaHover = areaHover;//area 划入
        $scope.areaLeave = areaLeave;//area 划划出
        $scope.keyHover = keyHover;//key 划入
        $scope.keyLeave = keyLeave;//key 划划出

        /**
         * area 划入
         * 16/2/23 */
        function areaHover() {
            $scope.area.hoverLine = 'hoverLine';
            $scope.area.hoverLineShow = true;
            $scope.area.shan = 'jianTou jianTouXia';
            $scope.area.jianTou = '▲';
        }

        /**
         * area 划划出
         * 16/2/23 */
        function areaLeave() {
            $scope.area.hoverLine = false;
            $scope.area.hoverLineShow = false;
            $scope.area.shan = 'jianTou dian';//闪动效果
            $scope.area.jianTou = '.';
            if (!$scope.key.firstShow) {
                $scope.key.firstShow = true;
                $scope.key.shan = 'jianTou shan';
                $scope.key.jianTou = '▾';
            }
        }

        /**
         * key 划入
         * 16/2/23 */
        function keyHover() {
            $scope.key.hoverLine = 'hoverLine';
            $scope.key.hoverLineShow = true;
            $scope.key.shan = 'jianTou jianTouXia';//闪动效果
            $scope.key.jianTou = '▲';
        }

        /**
         * key 划出
         * 16/2/23 */
        function keyLeave() {
            $scope.key.hoverLine = false;
            $scope.key.hoverLineShow = false;
            $scope.key.shan = 'jianTou dian';//闪动效果
            $scope.key.jianTou = '.';
        }


        /**
         * 具体fun*****************
         * 16/3/17 */
        /**
         * 给地区模型赋值
         * 16/3/17 */
        function urlParseChange() {
            $scope.topArea = 'bbbb';
            repBindOnce('topArea', $scope);
        }
    }
})();
