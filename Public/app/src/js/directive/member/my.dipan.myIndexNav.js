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
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/my.dipan.myIndexNav.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
            $timeout(function () {
                getUserData();// 延时异步去取用户数据
                // getCount();// 延时异步去取 技能统计,需求统计
            }, 400);
            bindTelCall();//bind电话咨询选择事件
        });

        $scope.version = config.version.default;//版本
        $scope.jiNengCount = undefined;//技能count
        $scope.needCount = undefined;//需求count
        $scope.showNews = false;//显示有新消息
        $scope.$on('showNews', showNews);//监听有新消息图标显示事件
        $scope.$on('hideNews', hideNews);//监听关闭新消息图标事件

        $scope.$on('getUserData', function () {
            getUserData();
        });

        init();
        function init() {
            getNewsData();//获取有没有新消息,给图片状态
        }


        /**
         * 获取有没有新消息,给图片状态
         */
        function getNewsData() {
            var url = config.host.nodeHost + "/member/getUserNews";
            var postData = {};
            try {
                postData.uid = tools.getLocalStorageObj('userData').uid;
            } catch (e) {
                postData.uid = '';
            }
            tools.postJsp(url, postData, true).then(_s);
            function _s(re) {
                if (re.data.code == 'S') {
                    if (re.data.haveNews) {
                        $rootScope.$broadcast('showNews');//广播显示 有新消息
                    }
                    else {
                        $rootScope.$broadcast('hideNews');//广播显示 没有有新消息
                    }
                }
            }
        }


        /**
         * 监听关闭新消息图标事件
         */
        function showNews() {
            $timeout(function () {
                $scope.showNews = true;
            }, 0);
        }

        /**
         * 监听关闭新消息图标事件
         */
        function hideNews() {
            $timeout(function () {
                $scope.showNews = false;
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
                    giveTellCallStatus(re.data.userData.telType);
                }
            }
        }

        /**
         * 延时异步去取统计
         */
        function getCount() {
            var url = config.host.nodeHost + '/member/getUserCount';
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

        /**
         * bind电话咨询选择事件
         */
        function bindTelCall() {
            var yunXu = document.getElementById('myRadio1_0');//允许
            var jinZhi = document.getElementById('myRadio1_1');//禁止

            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
            });

            yunXu.addEventListener(type, _yunXun);
            jinZhi.addEventListener(type, _jinZhi);

            function _yunXun() {
                yunXu.style.borderColor = '#ccc';
                jinZhi.style.borderColor = '#fff';
                postApi('yunXun');
            }

            function _jinZhi() {
                yunXu.style.borderColor = '#fff';
                jinZhi.style.borderColor = '#ccc';
                postApi('jinZhi');
            }

            function postApi(telType) {
                var url = config.host.nodeHost + "/member/telType"
                tools.postJsp(url, {'telType': telType}, true).then(_s);
                function _s(re) {
                    if (re.data.code == 'S') {
                        var userData = tools.getLocalStorageObj('userData');
                        userData.telType = telType;
                        tools.saveLocalStorageObj('userData', userData);
                    }
                }
            }
        }

        /**
         * 给电话咨询状态
         */
        function giveTellCallStatus(telType) {
            console.log('tel',telType);
            var yunXu = document.getElementById('myRadio1_0');//允许
            var jinZhi = document.getElementById('myRadio1_1');//禁止

            if (telType == 'yunXu') {
                _yunXun();
            }
            if (telType == 'jinZhi') {
                _jinZhi();
            }

            function _yunXun() {
                yunXu.style.borderColor = '#ccc';
                jinZhi.style.borderColor = '#fff';
            }

            function _jinZhi() {
                yunXu.style.borderColor = '#fff';
                jinZhi.style.borderColor = '#ccc';
            }


        }


    }
})();
