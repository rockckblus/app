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

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools', 'header'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools, header) {

        var yunXu, jinZhi;//声明允许禁止的dom全局变量

        $scope.$watch('$viewContentLoading', function () {
            yunXu = document.getElementById('myRadio1_0');//允许
            jinZhi = document.getElementById('myRadio1_1');//禁止

            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
            $timeout(function () {
                getUserData();// 延时异步去取用户数据,并获取 电话咨询状态
                getCount();// 延时异步去取 技能统计,需求统计
            }, 400);
            bindTelCall();//bind电话咨询选择事件
            init();
        });

        $scope.version = config.version.default;//版本
        $scope.jiNengCount = undefined;//技能count
        $scope.needCount = undefined;//需求count
        // $scope.showNews = false;//显示有新消息 ,读member数据
        $scope.showNewsHistory = undefined;//显示有新的联系消息
        $scope.getNoReadNewsEnd = undefined;//联系的未读消息显示的消息内容
        $scope.noReadNewsCount = undefined;//未读消息的统计

        $scope.showNoReadFromCount = false;//显示未读的订单消息
        $scope.noReadFromCount = undefined;//未读的订单统计
        $scope.noReadFrom = undefined;//未读的订单list


        $scope.$on('showNews', showNews);//监听有新消息图标显示事件
        $scope.$on('hideNews', hideNews);//监听关闭新消息图标事件

        $scope.$on('getUserData', function () {
            getUserData();
        });

        function init() {
            getNewsData();//获取有没有新消息,给图片状态
            getNoReadFrom();//获取未读订单
            getNoReadNews();//获取有未读的联系人消息
        }

        /**
         * 获取有未读的联系人消息
         */
        function getNoReadNews() {
            var url = config.host.nodeHost + "/imApi/noReadNewsCount";
            var postData = {};
            try {
                postData.uid = tools.getLocalStorageObj('userData').uid;
            } catch (e) {
                postData.uid = '';
            }
            tools.postJsp(url, postData, true).then(_s);
            function _s(re) {
                if (re.data.code == 'S') {
                    $timeout(function () {
                        $scope.showNewsHistory = true;
                        $scope.getNoReadNewsEnd = re.data.getNoReadNewsEnd;//联系的未读消息显示的消息内容
                        $scope.noReadNewsCount = re.data.results;//未读消息的统计
                    }, 0);
                }
            }
        }

        /**
         * 获取未读订单
         */
        function getNoReadFrom() {
            var url = config.host.nodeHost + "/member/noReadOrderFromCount";
            var postData = {};
            try {
                postData.uid = tools.getLocalStorageObj('userData').uid;
            } catch (e) {
                postData.uid = '';
            }
            tools.postJsp(url, postData, true).then(_s);
            function _s(re) {
                console.log('re', re);
                if (re.data.code == 'S') {
                    $timeout(function () {
                        $scope.showNoReadFromCount = true;
                        $scope.noReadFromCount = re.data.itemStrAllCount;
                        $scope.noReadFrom = re.data.itemStr;
                    }, 0);
                }
            }

        }

        /**
         * 获取是否允许电话咨询,如果没有,就是默认允许状态,去改变dom
         */
        function getTelType() {
            var userData = tools.getLocalStorageObj('userData');
            if (userData) {
                if (userData.telType == 'yunXu') {
                    _yunXun();
                } else if (userData.telType == 'jinZhi') {
                    _jinZhi();
                } else {//给默认 允许
                    _yunXun();
                }
            }
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
                    tools.saveLocalStorageObj('userData', re.data.doc[0]);
                    $timeout(function () {
                        $rootScope.$broadcast('changeBody');
                        $rootScope.$broadcast('closeLoading');
                    }, 200);
                    giveTellCallStatus(re.data.doc[0].telType);
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
                if (uid && uid.uid) {
                    uid = uid.uid;
                    tools.postJsp(url, {uid: uid}, true).then(_scuess, function () {
                    });
                }
            }, 0);

            function _scuess(re) {
                if (re.data && re.data.code == 'S') {
                    $timeout(function () {
                        $scope.jiNengCount = re.data.jiNengCount;//技能count
                        $scope.needCount = re.data.needCount;//需求count
                    }, 0);
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
                var url = config.host.nodeHost + "/member/telType";
                tools.postJsp(url, {
                    'telType': telType,
                    'uid': tools.getLocalStorageObj('userData').uid
                }, true).then(_s);
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
            if (telType == 'yunXu') {
                _yunXun();
            }
            else if (telType == 'jinZhi') {
                _jinZhi();
            } else {
                _yunXun();
            }
        }

        /**
         * 允许的dom样式
         * @private
         */
        function _yunXun() {
            yunXu.style.borderColor = '#ccc';
            jinZhi.style.borderColor = '#fff';
        }

        /**
         * 禁止的dom样式
         * @private
         */
        function _jinZhi() {
            yunXu.style.borderColor = '#fff';
            jinZhi.style.borderColor = '#ccc';
        }

    }
})();
