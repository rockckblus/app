/**
 * 命名注释：directive简称_commend. 父模块_from. 功能_推荐技能联想 类型_directive .js
 * 使用 ：<div commend></div>
 */
(function () {
    'use strict';
    angular.module('from').directive('commend', commend);
    function commend() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/from/commend.from.commend.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'config', '$state'];

    function thisController($scope, $rootScope, $timeout, tools, config, $state) {
        $scope.commendShow = false;//推荐技能div显示
        $scope.$on('showCommendShow', showCommendShow);//监听显示推荐技能
        $scope.$on('hideCommendShow', hideCommendShow);//监听隐藏推荐技能

        $scope.list = '';

        init();
        function init() {
            bindChangeOneChange();//绑定换一换点击事件,打看推荐面板,title焦点
        }

        /**
         * 显示推荐技能
         */
        function showCommendShow() {
            $timeout(function () {
                $scope.commendShow = true;
            }, 0);
            getList();
        }

        /**
         * 隐藏推荐技能
         */
        function hideCommendShow() {
            $timeout(function () {
                $scope.commendShow = false;
            }, 0);
        }

        /**
         * api取随机推荐技能关键词
         */
        function getList() {
            var url = config.host.nodeHost + '/key/commendKey';
            tools.postJsp(url, {}, true).then(_res);
            function _res(re) {
                $timeout(function () {
                    $scope.list = re.list;
                    $timeout(function () {
                        bindCommendClick();
                    }, 0);
                }, 0);
            }
        }

        /**
         * 换一换 点击事件
         */
        function bindChangeOneChange() {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
                type = 'tap';
            });
            document.getElementById('changOneChange').addEventListener(type, _click);
            function _click() {
                showCommendShow();
                $rootScope.$broadcast('fromTitleFoucs');
            }
        }


        /**
         * bind 推荐技能列表点击事件
         */
        function bindCommendClick() {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
                type = 'tap';
            });
            angular.forEach($scope.list, function (vo) {
                document.getElementById('comList_' + vo._id).addEventListener(type, function () {
                    clickCommendKey(vo);
                });
            });
        }

        /**
         * 技能列表点击事件
         */
        function clickCommendKey(vo) {//广播frome.title
            $rootScope.$broadcast('giveFromTitle', vo.key);
        }

    }
})();
