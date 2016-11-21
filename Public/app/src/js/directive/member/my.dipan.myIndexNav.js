/**
 * 命名注释：directive简称_my. 父模块_dipan . 功能_我的功能导航IndexList 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('my', my);
    function my() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/my.dipan.myIndexNav.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools) {

        mui.plusReady(function () {
            mui.previewImage();
        });


        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
            $timeout(function () {
                getUserData();// 延时异步去取用户数据
            }, 400);
        });

        $scope.$on('getUserData', function () {
            getUserData();
        });//监听获取用户数据事件

        //我的 导航list > 本地数据
        $scope.listNav = localData.memberIndexNav;

        /*************************
         * 判断数据赋值成功 关闭 loading
         * 16/8/15 下午2:57 ByRockBlus
         *************************/
        if ($scope.listNav) {
            $timeout(function () {
                $rootScope.$broadcast('closeLoading');
            }, 0);
        }

        /**
         * 拿uid 去服务器取用户数据
         */
        function getUserData() {
            var url = config.host.nodeHost + '/member/getUserData';
            var uid = tools.getLocalStorageObj('userData');
            $timeout(function () {
                uid = uid.uid;
                tools.postJsp(url, {uid: uid}, true).then(_scuess, function () {
                });
            }, 0);

            function _scuess(re) {
                if (re.data.code == 'S') {
                    tools.saveLocalStorageObj('userData', re.data.userData);
                    $timeout(function () {
                        $rootScope.$broadcast('changeBody');
                        $rootScope.$broadcast('closeLoading');
                    }, 200);
                }
            }
        }
    }


})();
