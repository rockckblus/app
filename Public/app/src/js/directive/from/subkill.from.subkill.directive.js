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
            replace: true,
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
        $scope.city = '未知';
        $scope.$on('changeArea', giveThisCity);//监听地址变换事件

        $scope.from = {
            title: '',//技能标题
            content: '',//技能介绍
            price: '',//价格
        };
        $scope.titleFocus = titleFocus;//当title焦点的事件
        $scope.titleBlur = titleBlur;//当title失去焦点的事件
        var watchTitleCount = 0;//默认第一次不弹出联想
        $scope.$watch('from.title', watchTitle);//watch title, title为空的时候显示推荐技能div
        $scope.$on('fromTitleFoucs', focusTitle);//监听广播 使title焦点
        $scope.$on('giveFromTitle', giveFromTitle);//监听改变title值
        $scope.showImgUp = false;
        $scope.isUser = false;//是否有会员资料
        $scope.priceDisabled = false;//价格禁止输入,如果选择面议,就禁止

        var radioArr = {//radio 数组
            radio1: ['1小时', '1次', '1单', '面议'],
            radio2: ['不限', '线上', '线下'],
            radio3: ['女', '男'],
            radio4: ['16', '25', '35']
        };

        function init() {
            hideBottomNav();//隐藏底部导航
            giveThisCity();//给默认城市
            bindCityClick();//bind 城市按钮click事件
            bindRadio();//bind radio
            bindSub();//bind 发布按钮点击事件
            trueWebUpImg();//判断web是否显示图片上传
            creatKillRoundId();//生成随机技能表单id
            trueUser();//判断是否有初始用户信息,来显示不同表单
        }

        /**
         * 判断是否有初始用户信息,来显示不同表单
         */
        function trueUser() {
            $rootScope.$broadcast('getUserData');
            $timeout(function () {
                var isUser = tools.getLocalStorageObj('userData').isUser;
                if (isUser) {
                    $scope.isUser = true;
                }
            }, 1000);
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
         * 生成随机技能表单id
         */
        function creatKillRoundId() {
            var roundCode = tools.getRoundCode(8);
            tools.saveLocalStorageObj('killRoundId', 'killRoundId_' + roundCode);
        }

        /**
         * 判断是否web来加载图片上传
         */
        function trueWebUpImg() {
            tools.trueWeb(function () {
                $timeout(function () {
                    $scope.showImgUp = false;
                }, 0);

            }, function () {
                $timeout(function () {
                    $scope.showImgUp = true;
                }, 0);
            });
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
            watchTitleCount++;
            if (watchTitleCount > 1) {
                if ($scope.from.title === '') {
                    $rootScope.$broadcast('showCommendShow');
                } else {
                    $rootScope.$broadcast('hideCommendShow');
                }
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
                });
            });
            function clickRadio(dom) {
                var idS = dom.target.id;
                if (idS == 'radio1_3') {//面议
                    $timeout(function () {
                        $scope.from.price = '';
                        $scope.priceDisabled = true;
                    }, 0);
                } else if ((idS == 'radio1_0') || (idS == 'radio1_1') || (idS == 'radio1_2')) {
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
            document.getElementById('subJiNeng').addEventListener(type, _sub);
            function _sub() {
                var postData = {};
                postData.uid = tools.getLocalStorageObj('userData').uid;//uid
                postData.killRoundId = tools.getLocalStorageObj('killRoundId');//技能随机提交的生成的id
                postData.title = $scope.from.title;//技能标题
                postData.content = $scope.from.content;//技能介绍
                postData.price = $scope.from.price;//价格
                postData.priceUnit = getDefault('priceUnit');//价格单位
                postData.service = getDefault('service');//服务方式
                postData.isUser = $scope.isUser;//是否 有会员资料 ,布尔 ,用了判断是否 还取其他 会员默认值(sex,age,city)
                postData.sex = getDefault('sex');//会员补充 男女
                postData.age = getDefault('age');//会员补充 年龄
                postData.city = $scope.city;//会员补充 男女
                postData.areaGps = tools.getLocalStorageObj('areaGps');//地理位置
                if (!tools.isEmpty(postData.title)) {
                    tools.trueWeb(function () {
                        alert('技能必须填');
                    }, function () {
                        plus.nativeUI.toast('技能必须填');
                    });
                } else {
                    var url = config.host.nodeHost + '/sns/postKillFrom';
                    tools.postJsp(url, postData).then(_s, _f);
                }
                function _s(re) {
                    if (re.data.code == 'S') {
                        //清空 radio
                        tools.saveLocalStorageObj('radio1', '');
                        tools.saveLocalStorageObj('radio2', '');
                        tools.saveLocalStorageObj('radio3', '');
                        tools.saveLocalStorageObj('radio4', '');
                        tools.trueWeb(function () {
                            var con = confirm("发布成功! 按确定继续发布");
                            if (con) {
                                window.location.reload();
                            } else {
                                $state.go('myNeed');//跳转到需求列表
                            }
                        }, function () {
                            plus.nativeUI.actionSheet({
                                title: "发布成功!",
                                buttons: [{title: "继续发布"}, {title: "我的技能"}]
                            }, function (e) {
                                console.log("User pressed: " + e.index);
                                if (e.index == 1 || e.index == -1) {
                                    window.location.reload();
                                }
                                if (e.index == 2) {
                                    $state.go('myKill');//跳转到需求列表
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
                    return find('radio1');
                case 'service'://服务方式
                    return find('radio2');
                case 'sex'://服务方式
                    return find('radio3');
                case 'age'://服务方式
                    return find('radio4');
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
