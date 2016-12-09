/**
 * 命名注释：directive简称_orderFromContent. 父模块_dipan . 需求(订单)详情页面 类型_directive .js
 * 使用 ：<div order-from-content></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('orderFromContent', orderFromContent);
    function orderFromContent() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/orderFromContent.dipan.orderFromContent.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', '$state', 'config', 'tools', 'header'];

    function thisController($scope, $rootScope, $timeout, $state, config, tools, header) {


        var clickType = 'tap';
        tools.trueWeb(function () {
            clickType = 'click';
        }, function () {
            clickType = 'tap';
        });

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
            init();
        });

        $scope.data = '';//订单详情数据

        $scope.userShow = false;//技能方进入   判断是不是此用户发的,是此用户发的,就不显示个人资料
        $scope.userSelect = false;//需求方(自己进入)  判断是不是此用户发的,是此用户发的,就不显示个人资料


        function init() {
            getOrderContent();//获取订单详情
        }

        function getOrderContent() {
            var url = config.host.nodeHost + '/member/getOrderFromContent';
            var uid = tools.getLocalStorageObj('userData').uid;
            tools.postJsp(url, {uid: uid, orderId: $state.params.orderId}, true).then(_s);
            function _s(re) {
                if (re.data && re.data.code == 'S') {
                    try {
                        if (!re.data.userData.headerImg) {
                            re.data.userData.headerImg = header.defaultHeader;
                        }
                    } catch (e) {
                        console.error('无headerImg');
                    }
                    try {
                        if (re.data.thisNeed.priceUnit == '面议') {
                            re.data.thisNeed.priceStr = '面议';
                        } else {
                            re.data.thisNeed.priceStr = re.data.thisNeed.price + ' ' + re.data.thisNeed.priceUnit;
                        }
                    } catch (e) {

                    }


                    angular.forEach(re.data.needList, function (vo) {
                        if (vo.priceUnit == '面议') {
                            vo.priceStr = '';
                        } else {
                            vo.priceStr = "<span style='color: red;'>" + vo.price + "</span>" + ' ' + vo.priceUnit;
                        }
                    });

                    angular.forEach(re.data.thisNeed.bidUserArr, function (vo2) {
                        if (!vo2.headerImg) {
                            vo2.headerImg = header.defaultHeader;
                        }
                    });

                    if (!re.data.thisNeed.binUser.headerImg) {
                        re.data.thisNeed.binUser.headerImg = header.defaultHeader;
                    }


                    $timeout(function () {
                        if ((re.data.userData.uid == tools.getLocalStorageObj('userData').uid) || ($state.params.type == 'select')) {
                            showUi('select');
                        } else {
                            if (re.data.isJion) {//如果当前用户已经接了这单,隐藏接单按钮
                                $rootScope.$broadcast('hideXiaDan');
                            } else if ((re.data.thisNeed.status !== 1) && (re.data.thisNeed.status !== 2)) {
                                document.getElementById('bottomNavCall').style.display = 'none';
                            }
                            showUi('show');
                        }
                        $scope.data = re.data;
                        $timeout(function () {
                            bindClick();
                        }, 0);
                    }, 0);
                }
            }
        }

        /**
         * 根据不同的角色进入,显示不同ui
         */
        function showUi(type) {
            if (type == 'select') {
                $scope.userShow = false;
                $scope.userSelect = true;
                document.getElementById('bottomNavCall').style.display = 'none';
            }
            if (type == 'show') {
                $scope.userShow = true;
                $scope.userSelect = false;
            }
        }

        /**
         * bind点击
         */
        function bindClick() {
            angular.forEach($scope.data.thisNeed.bidUserArr, function (vo) {
                tools.bindClick('telCall_' + vo.uid, telCall);
                tools.bindClick('imCall_' + vo.uid, imCall);
                tools.bindClick('selectUser_' + vo.uid, selectUser);
            });
            var binId = $scope.data.thisNeed.binUser.uid;
            if (binId) {
                tools.bindClick('telCallSelect_' + binId, telCall);
                tools.bindClick('imCallSelect_' + binId, imCall);
                tools.bindClick('givePingJiaBtn', pingJiaSub);
                tools.bindClick('noOrderGoHome', goHome);

            }

        }

        /**
         * goHome
         */
        function goHome() {
            $state.go('home');
        }

        /**
         * 打电话
         */
        function telCall(dom) {
            var uid = dom.getAttribute('uid');
            $rootScope.$broadcast('callTel', {
                data: {
                    code: 'S',
                    uid: tools.getLocalStorageObj('userData').uid,
                    jiNengId: uid
                }
            });
        }

        /**
         * imCall
         */
        function imCall(dom) {
            var gHeader = dom.getAttribute('headerimg');
            var gUid = dom.getAttribute('uid');
            var gName = dom.getAttribute('gname');
            var userHeader = header.defaultHeader;
            var tempHeader = tools.getLocalStorageObj('userData').headerImg;
            if (tempHeader) {
                userHeader = tempHeader;
            }
            var uid = tools.getLocalStorageObj('userData').uid;

            var pushData = {
                gHeader: gHeader,
                gUId: gUid,
                gName: gName,
                userHeader: userHeader,
                userId: uid
            };

            $rootScope.$broadcast('openIm', pushData);

        }

        /**
         * 选单点击事件
         */
        function selectUser(dom) {
            var uid = dom.getAttribute('uid');
            var gName = dom.getAttribute('gname');
            plus.nativeUI.confirm("网络交易注意防骗!建议走淘宝交易流程!", function (e) {
                if (e.index === 0) {
                    selectOrderFrom(uid, $state.params.orderId);
                }
            }, "确定选择" + gName + '?', ["确定", "取消"]);
        }

        /**
         * 选单
         */
        function selectOrderFrom(uid, orderId) {
            var url = config.host.nodeHost + '/member/selectOrderFrom';
            tools.postJsp(url, {uid: uid, orderId: orderId}).then(_s, _e);

            function _s(re) {
                if (re.data && re.data.code == 'S') {
                    getOrderContent();//从新获取数据
                } else {
                    _e(re.data.msg);
                }
            }

            function _e(e) {
                var enE = e;
                if (!e) {
                    enE = '选单失败';
                }
                tools.alert({title: enE});
            }
        }

        /**
         * pingJiaSub
         */
        function pingJiaSub() {
            var val = document.getElementById('pingJia').value;
            if (!val) {
                tools.alert({title: '评价不能为空'});
            } else {
                var url = config.host.nodeHost + '/member/pingJia';
                tools.postJsp(url, {'orderId': $state.params.orderId, 'content': val}).then(_s, _e);
            }

            function _s(re) {
                if (re.data && re.data.code == 'S') {
                    getOrderContent();//从新获取数据
                } else {
                    _e(re.data.msg);
                }
            }

            function _e(e) {
                var enE = e;
                if (!e) {
                    enE = '评价失败';
                }
                tools.alert({title: enE});
            }
        }
    }
})();