/**
 * 命名注释：directive简称_subkill. 父模块_from. 功能_技能发布 类型_directive .js
 * 使用 ：<div subkill></div>
 */
(function () {
    'use strict';
    angular.module('from').directive('subkill', subkill);
    function subkill() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/from/subkill.from.subkill.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'config', '$state'];

    function thisController($scope, $rootScope, $timeout, tools, config, $state) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
            $rootScope.$broadcast('closeAddFrom');//关闭底部发布需求技能面板
            $rootScope.$broadcast('closeLoading');//关闭loading
            init();
        });
        $scope.city = '全国';
        $scope.$on('changeArea', giveThisCity);//监听地址变换事件

        $scope.from = {
            title: '',//技能标题
        };
        $scope.titleFocus = titleFocus;//当title焦点的事件
        $scope.titleBlur = titleBlur;//当title失去焦点的事件
        $scope.$watch('from.title', watchTitle);//watch title, title为空的时候显示推荐技能div
        $scope.$on('fromTitleFoucs', focusTitle);//监听广播 使title焦点

        var radioArr = {//radio 数组
            radio1: ['1小时', '1次', '1单'],
            radio2: ['不限', '线上', '线下'],
            radio3: ['男', '女'],
            radio4: ['16', '25', '35']
        };
        function init() {
            hideBottomNav();//隐藏底部导航
            giveThisCity();//给默认城市
            bindCityClick();//bind 城市按钮click事件
            bindRadio();//bind radio
        }

        /**
         * 隐藏底部导航
         */
        function hideBottomNav() {
            $timeout(function () {
                var dom = document.getElementById('bottomNav');
                dom.style.display = "none";
            }, 0);
        }

        /**
         * 给默认城市
         */
        function giveThisCity() {
            var area = tools.getLocalStorageObj('area');
            $timeout(function () {
                try {
                    $scope.city = area.city.city;
                } catch (e) {
                    $scope.city = '全国';
                }
            }, 0);
        }

        /**
         * bind 城市按钮click事件
         */
        function bindCityClick() {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
            });
            document.getElementById('fromCityClick').addEventListener(type, _bind);
            function _bind() {
                $rootScope.$broadcast('showArea','noFujin');
            }
        }

        /**
         * title 焦点事件
         */
        function titleFocus() {
            watchTitle();
        }

        /**
         * title blur 失去焦点事件
         */
        function titleBlur() {
            $rootScope.$broadcast('hideCommendShow');
        }

        /**
         * watch title
         */
        function watchTitle() {
            if ($scope.from.title === '') {
                $rootScope.$broadcast('showCommendShow');
            } else {
                $rootScope.$broadcast('hideCommendShow');
            }
        }

        /**
         * 使title焦点
         * document.getElementById("inputId").focus();
         */
        function focusTitle() {
            $timeout(function () {
                document.getElementById("fromTitle").focus();
            }, 0);
        }



        /**
         * bind radio 点击
         */
        function bindRadio() {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
                type = 'tap';
            });
            angular.forEach(radioArr, function (vo, index1) {
                angular.forEach(vo, function (vo1, index2) {
                    var domId = index1 + '_' + index2;
                    document.getElementById(domId).addEventListener(type, clickRadio);
                })
            });
            function clickRadio(dom) {
                var idS = dom.target.id;
                idS = idS.split('_');
                idS = idS[0];
                angular.forEach(radioArr[idS], function (vo, index) {
                    document.getElementById(idS + '_' + index).style.borderColor = '#fff';
                });
                dom.target.style.borderColor = '#ccc';
            }
        }



    }

})();
