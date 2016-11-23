/**
 * 命名注释：directive简称_editMemberInfo. 父模块_dipan . 功能_资料编辑 类型_directive .js
 * 使用 ：<div edit-member-info></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('editMemberInfo', editMemberInfo);
    function editMemberInfo() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/editMemberInfo.dipan.editMemberInfo.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools', '$state'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools, $state) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
            $rootScope.$broadcast('closeAddFrom');//关闭底部发布需求技能面板
            $rootScope.$broadcast('closeLoading');//关闭loading
            init();
        });
        $scope.city = '不限';
        $scope.$on('changeArea', giveThisCity);//监听地址变换事件
        $scope.from = {
            name: '',//昵称
        };

        var radioArr = {//radio 数组
            editRadio3: ['女', '男'],
            editRadio4: ['16', '25', '35']
        };

        function init() {
            hideBottomNav();//隐藏底部导航
            giveOldVal();//给性别,年龄,昵称
            bindCityClick();//bind 城市按钮click事件
            bindRadio();//bind radio
            bindSub();//bind 发布按钮点击事件
            giveUserCity();//给用户定义的默认城市
        }

        /**
         * 给性别,年龄,昵称
         */
        function giveOldVal() {
            var nvDom = document.getElementById('editRadio3_0');//女dom
            var nanDom = document.getElementById('editRadio3_1');//男dom
            var age1Dom = document.getElementById('editRadio4_0');//16
            var age2Dom = document.getElementById('editRadio4_1');//25
            var age3Dom = document.getElementById('editRadio4_2');//35+

            var userData = tools.getLocalStorageObj('userData');
            if (userData.sex) {
                _changeSex(userData.sex);
            }
            if (userData.age) {
                _changeAge(userData.age);
            }
            if (userData.userName) {
                _changeName(userData.userName);
            }

            function _changeSex(sex) {
                if (sex == '男') {
                    nanDom.style.borderColor = '#ccc';
                    nvDom.style.borderColor = '#fff';
                }
            }

            function _changeAge(age) {
                if (age == '25~35') {
                    age1Dom.style.borderColor = '#fff';
                    age2Dom.style.borderColor = '#ccc';
                    age3Dom.style.borderColor = '#fff';
                }
                if (age == '35+') {
                    console.log(1111);
                    age1Dom.style.borderColor = '#fff';
                    age2Dom.style.borderColor = '#fff';
                    age3Dom.style.borderColor = '#ccc';
                }

            }

            function _changeName(name) {
                $timeout(function () {
                    $scope.from.name = name;
                }, 0);
            }

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
         * 给用户定义的city,没有定义再去根据gps定位
         */
        function giveUserCity() {
            var user = tools.getLocalStorageObj('userData');
            if (user && user.city) {
                $timeout(function () {
                    $scope.city = user.city;
                }, 1000);
            } else {
                giveThisCity();
            }
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
            document.getElementById('editFromCityClick').addEventListener(type, _bind);
            function _bind(dom) {
                $scope.from.cityBuXian = false;
                dom.target.style.borderColor = '#ccc';
                $rootScope.$broadcast('showArea', 'noFujin');
            }
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
            document.getElementById('editMemberSub').addEventListener(type, _sub);
            function _sub() {
                var postData = {};
                postData.uid = tools.getLocalStorageObj('userData').uid;//uid
                postData.name = $scope.from.name;//用户name
                postData.city = $scope.city;//city
                postData.sex = getDefault('sex');
                postData.age = getDefault('age');
                var url = config.host.nodeHost + '/member/userDataEdit';
                tools.postJsp(url, postData).then(_s, _f);
                function _s(re) {
                    if (re.data.code == 'S') {
                        //清空 radio
                        tools.saveLocalStorageObj('radio1', '');

                        tools.trueWeb(function () {
                            var con = confirm("修改成功! 跳转到个人中心");
                            if (con) {
                                $state.go('memberIndex');//跳转到我会员中心
                            }
                        }, function () {
                            plus.nativeUI.actionSheet({
                                title: "修改成功!",
                                buttons: [{title: "跳转到个人中心"}]
                            }, function (e) {
                                if (e.index == 1) {
                                    $state.go('memberIndex');//跳转到我会员中心
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
                case 'sex'://性别
                    return find('editRadio3');
                case 'age'://年龄
                    return find('editRadio4');
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
