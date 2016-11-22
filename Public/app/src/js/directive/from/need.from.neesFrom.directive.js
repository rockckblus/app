/**
 * 命名注释：directive简称_need. 父模块_from. 功能_需求发布 类型_directive .js
 * 使用 ：<div need></div>
 */
(function () {
    'use strict';
    angular.module('from').directive('need', need);
    function need() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/from/need.from.needFrom.directive.html',
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
        $scope.city = '不限';
        $scope.$on('changeArea', giveThisCity);//监听地址变换事件

        $scope.from = {
            title: '',//技能标题
            price: '',//价格
            cityBuXian: false,//城市选择不限变量
        };
        $scope.titleFocus = titleFocus;//当title焦点的事件
        $scope.titleBlur = titleBlur;//当title失去焦点的事件
        $scope.$watch('from.title', watchTitle);//watch title, title为空的时候显示推荐技能div
        $scope.$on('fromTitleFoucs', focusTitle);//监听广播 使title焦点
        $scope.$on('giveFromTitle', giveFromTitle);//监听改变title值
        $scope.priceDisabled = false;//价格禁止输入,如果选择面议,就禁止

        var radioArr = {//radio 数组
            needRadio1: ['1小时', '1次', '1单', '面议'],
            needRadio2: ['3天', '1周', '1个月'],//有效期
        };

        function init() {
            hideBottomNav();//隐藏底部导航
            giveThisCity();//给默认城市
            bindCityClick();//bind 城市按钮click事件
            bindRadio();//bind radio
            bindSub();//bind 发布按钮点击事件
            creatNeedRoundId();//生成随机需求表单id
            bindCityBuXian();//bind city 不限点击事件
        }

        /**
         * bind city 不限点击事件
         */
        function bindCityBuXian() {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
            });
            var dom = document.getElementById('needBuXian');
            dom.addEventListener(type, _click);
            function _click() {
                $scope.from.cityBuXian = true;
                dom.style.borderColor = '#ccc';
                document.getElementById('fromCityClickNeed').style.borderColor = '#fff';
            }
        }

        /**
         * 改变title值
         */
        function giveFromTitle(e, v) {
            $timeout(function () {
                $scope.from.title = v;
            }, 0);
        }

        /**
         * 生成随机需求表单id
         */
        function creatNeedRoundId() {
            var roundCode = tools.getRoundCode(8);
            tools.saveLocalStorageObj('needRoundId', 'needRoundId_' + roundCode);
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
            document.getElementById('fromCityClickNeed').addEventListener(type, _bind);
            function _bind(dom) {
                $scope.from.cityBuXian = false;
                document.getElementById('needBuXian').style.borderColor = '#fff';
                dom.target.style.borderColor = '#ccc';
                $rootScope.$broadcast('showArea', 'noFujin');
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
                document.getElementById("fromTitleNeed").focus();
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
                });
            });
            function clickRadio(dom) {
                var idS = dom.target.id;
                if (idS == 'needRadio1_3') {//面议
                    $timeout(function () {
                        $scope.from.price = '';
                        $scope.priceDisabled = true;
                    }, 0);
                } else {
                    $timeout(function () {
                        $scope.priceDisabled = false;
                    }, 0);
                }
                idS = idS.split('_');
                tools.saveLocalStorageObj(idS[0], idS[1]);//记录到本地缓存 radio1 : 0
                idS = idS[0];
                angular.forEach(radioArr[idS], function (vo, index) {
                    document.getElementById(idS + '_' + index).style.borderColor = '#fff';
                });
                dom.target.style.borderColor = '#ccc';
            }
        }

        /**
         * bindSub ,技能发布提交按钮点击事件
         */
        function bindSub() {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
            });
            document.getElementById('subNeed').addEventListener(type, _sub);
            function _sub() {
                var postData = {};
                postData.uid = tools.getLocalStorageObj('userData').uid;//uid
                postData.needRoundId = tools.getLocalStorageObj('needRoundId');//需求随机提交的生成的id
                postData.title = $scope.from.title;//需求标题
                postData.content = $scope.from.content;//需求介绍
                postData.price = $scope.from.price;//价格
                postData.cityBuXian = $scope.from.cityBuXian;//city 不限
                postData.priceUnit = getDefault('priceUnit');//价格单位
                postData.endTime = getDefault('endTime');//信息有效期
                postData.city = $scope.city;//city
                if (!tools.isEmpty(postData.title)) {
                    tools.trueWeb(function () {
                        alert('需求必须填');
                    }, function () {
                        plus.nativeUI.toast('需求必须填');
                    });
                } else {
                    var url = config.host.nodeHost + '/sns/postNeedFrom';
                    tools.postJsp(url, postData).then(_s, _f);
                }
                function _s(re) {
                    if (re.data.code == 'S') {
                        //清空 radio
                        tools.saveLocalStorageObj('radio1', '');

                        tools.trueWeb(function () {
                            var con = confirm("发布成功! 跳转到我的发布");
                            if (con) {
                                $state.go('need');//跳转到我的需求
                            } else {
                                window.location.reload();
                            }
                        }, function () {
                            plus.nativeUI.actionSheet({
                                title: "发布成功!",
                                buttons: [{title: "我的发布"}]
                            }, function (e) {
                                if (e.index == 2) {
                                    $state.go('need');//跳转到我的需求
                                }
                            });
                        });

                    } else {
                        _f(re.data.msg);
                    }
                }

                function _f(e) {
                    if (!e) {
                        e = '发布失败';
                    }
                    tools.trueWeb(function () {
                        alert(e);
                    }, function () {
                        plus.nativeUI.toast(e);
                    });
                }
            }
        }

        /**
         * 获取radio的 值,取不到就是默认值
         */
        function getDefault(type) {
            switch (type) {
                case 'priceUnit'://单位
                    return find('needRadio1');
                case 'endTime'://单位
                    return find('needRadio2');
            }
            function find(thisType) {
                var val = tools.getLocalStorageObj(thisType);
                if (val) {
                    return val;
                } else {
                    return 'default';
                }
            }
        }
    }

})();
