/**
 * 命名注释：directive简称_login. 父模块_dipan . 功能_login 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('login', login);
    function login() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/login.dipan.login.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tools', 'config'];

    function thisController($scope, $rootScope, $timeout, localData, tools, config) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        /*************************
         * 判断数据赋值成功 关闭 loading
         * 16/8/15 下午2:57 ByRockBlus
         *************************/
        setTimeout(function () {
            $rootScope.$broadcast('closeLoading');
        }, 0);


        $scope.formSub = _formSub;//表单提交事件
        $scope.getCode = _getCode;//获取验证码
        $scope.codeText = '获取验证码';
        $scope.tel = false;
        $scope.code = false;
        $scope.codeClass = 'btn-danger';//获取验证码 变换背景颜色

        //function hideLeftTop() {
        //    var leftTop = document.getElementById('topLeftBut');
        //    leftTop = angular.element(leftTop);
        //    leftTop[0].style.display = 'none';
        //}
        //
        //hideLeftTop();


        /*************************
         * 获取验证码
         * 16/8/30 下午4:00 ByRockBlus
         *************************/
        var isGetNow;
        var count = 59;
        var setInt;

        function timeGo() {
            count--;
            $timeout(function () {
                $scope.codeText = count + '秒后重发';
            }, 0);
            if (count === 0) {
                clearInterval(setInt);
                isGetNow = false;
                count = 59;
                $timeout(function () {
                    $scope.codeClass = 'btn-danger';//获取验证码 变换背景颜色
                    $scope.codeText = '获取验证码';

                }, 0);
            }
        }

        function _getCode() {
            if (!$scope.tel) {
                tools.alert({
                    title: '手机必填'
                });
                return false;
            }
            else if (!tools.checkMobile($scope.tel)) {
                tools.alert({
                    title: '手机号格式不正确'
                });
                return false;
            }

            if (isGetNow) {
                return;
            } else {
                var roundCodeId = localStorage.getItem(config.localSaveName.user.roundCodeId);

                //'Api/Sem/getCode/roundCodeId/' + roundCodeId + '/mtNum/' + telNum;
                tools.postJsp(config.host.phpHost + '/Api/Sem/getCode/roundCodeId/' + roundCodeId + '/mtNum/' + $scope.tel, {}, true).then(function (re) {
                    tools.alert({
                        title: re
                    });
                    console.log('re', re);
                });
                $timeout(function () {
                    $scope.codeText = 60 + '秒后重发';
                }, 0);
                $scope.codeClass = 'btn-warning';//获取验证码 变换背景颜色
                isGetNow = true;
                setInt = setInterval(timeGo, 1000);
            }

        }


        /*************************
         * 表单提交点击事件
         * 16/8/30 下午3:23 ByRockBlus
         *************************/
        function _formSub() {
            if (!$scope.tel || !$scope.code) {
                tools.alert({
                    title: '手机和验证码都必填'
                });
                return false;
            } else if (!tools.checkMobile($scope.tel)) {
                tools.alert({
                    title: '手机号格式不正确'
                });
            } else {
                tools.alert({
                    title: '提交验证'
                });
            }
        }
    }


})();
