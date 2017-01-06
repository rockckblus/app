/**
 * 命名注释：directive简称_orderFrom. 父模块_dipan . 订单列表页面 类型_directive .js
 * 使用 ：<div order-from></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('orderFrom', orderFrom);
    function orderFrom() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/orderFrom.dipan.orderFromList.directive.html',
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

        $scope.isHaveNeedOrderFrom = false;//有需求订单显示
        $scope.isHaveJinengOrderFrom = false;//有技能订单显示
        $scope.isHaveSelectOrderFrom = false;//有选单订单显示
        $scope.isHaveLoseOrderFrom = false;//有失效订单显示
        $scope.list = undefined;//订单列表数据
        $scope.defaultHeader = header.defaultHeader; //默认头像

        function init() {
            getList();//获取技能,需求订单
        }

        function getList() {
            var url = config.host.nodeHost + '/member/getOrderFromList';

            var userData = tools.getLocalStorageObj('userData');
            var uid;
            if (userData && userData.uid) {
                uid = userData.uid;
            }

            if (uid) {
                tools.postJsp(url, {uid: uid}, true).then(_s, _err);
            } else {
                $timeout(function () {
                    tools.postJsp(url, {uid: uid}, true).then(_s, _err);
                }, 200);
            }

            function _s(re) {
                if (re.data.code == 'S') {
                    re.data = re.data.doc;
                    console.log('re', re.data);
                    $timeout(function () {
                        if (re.data.jiNengOrderList[0]) {
                            $scope.isHaveJinengOrderFrom = true;
                        }
                        if (re.data.needOrderList[0]) {
                            $scope.isHaveNeedOrderFrom = true;
                        }
                        if (re.data.selectOrderList[0] || re.data.selectBindUidOrderList[0]) {
                            $scope.isHaveSelectOrderFrom = true;
                        }
                        if (re.data.loseOrderList[0] || re.data.loseOrderNeedList[0]) {
                            $scope.isHaveLoseOrderFrom = true;
                        }
                        $scope.list = re.data;
                        $timeout(function () {
                            bindClick();
                        }, 0);
                    }, 0);
                }
            }

            function _err(err) {
                console.log('err', err);
            }
        }

        /**
         * bind 订单列表点击事件
         */
        function bindClick() {
            //技能绑定
            angular.forEach($scope.list.jiNengOrderList, function (vo) {
                var dom = document.getElementById('jinengOreder_' + vo.orderId._id);
                dom.addEventListener(clickType, function () {
                    upDateIsReadMark(vo.orderId._id, function () {
                        _bindJiNeng(dom, vo.orderId._id, 'show');
                    });
                });
            });

            //成交订单 跳转绑定
            angular.forEach($scope.list.selectOrderList, function (vo) {
                tools.bindClick('selectListGo_' + vo.orderId, _bindJiNengByDom);
            });
            //成交订单 跳转绑定
            angular.forEach($scope.list.selectBindUidOrderList, function (vo) {
                tools.bindClick('selectListGo_' + vo.orderId._id, _bindJiNengByDom);
            });

            //需求绑定
            angular.forEach($scope.list.needOrderList, function (vo) {
                var dom = document.getElementById('needOrder_' + vo.orderId);
                dom.addEventListener(clickType, function () {
                    _bindJiNeng(dom, vo.orderId, 'select');
                });
            });

            //选别人和 作为bindUid过期 跳转绑定
            angular.forEach($scope.list.loseOrderList, function (vo) {
                tools.bindClick('loseOrderGo_' + vo.orderId._id, _bindJiNengByDom);
            });

            // 作为orderUid 过期 跳转绑定
            angular.forEach($scope.list.loseOrderNeedList, function (vo) {
                tools.bindClick('loseNeedOrderGo_' + vo._id, _bindJiNengByDom);
            });

            //删除成交订单 绑定 ,如果没评价就跳转
            angular.forEach($scope.list.selectOrderList, function (vo) {
                tools.bindClick('delSelect_' + vo.orderId, delSelectOrderId);
                tools.bindClick('pingJiaGo_' + vo.orderId, _bindJiNengByDom);
            });

            //删除bindUid 过期订单 绑定
            angular.forEach($scope.list.loseOrderList, function (vo) {
                tools.bindClick('delLose_' + vo.orderId._id, delLoseOrderId);
            });

            //删除 bindUid 成交订单 绑定 如果没评价就跳转
            angular.forEach($scope.list.selectBindUidOrderList, function (vo) {
                tools.bindClick('delLose_' + vo.orderId._id, delLoseOrderId);
                tools.bindClick('pingJiaGo_' + vo.orderId._id, _bindJiNengByDom);
            });

            //删除orderUid 过期订单 绑定
            angular.forEach($scope.list.loseOrderNeedList, function (vo) {
                tools.bindClick('delLoseNeed_' + vo._id, delLoseNeedOrderId);
            });

            //跳转订单详情
            function _bindJiNeng(dom, orderId, type) {
                $state.go('orderFromContent', {'orderId': orderId, 'type': type});
            }

            //跳转订单详情 by domOrder
            function _bindJiNengByDom(dom) {
                var orderId = dom.getAttribute('orderId');
                $state.go('orderFromContent', {'orderId': orderId, 'type': 'select'});
            }

            //删除成交订单
            function delSelectOrderId(dom) {
                var thisOrderId = dom.getAttribute('orderid');
                var url = config.host.nodeHost + '/sns/delNeed';
                tools.postJsp(url, {needId: thisOrderId})
                    .then(function (re) {
                        if (re.data && re.data.code == 'S') {
                            $timeout(function () {
                                $scope.isHaveSelectOrderFrom = false;//有选单订单显示
                                getList();
                            }, 0);
                        } else {
                            tools.alert({title: '删除失败'});
                        }
                    });
            }

            //删除过期订单 作为 bindUid
            function delLoseOrderId(dom) {
                var thisOrderId = dom.getAttribute('orderid');
                var url = config.host.nodeHost + '/member/delBindUser';
                tools.postJsp(url, {orderId: thisOrderId})
                    .then(function (re) {
                        if (re.data && re.data.code == 'S') {
                            $timeout(function () {
                                $scope.isHaveLoseOrderFrom = false;//有选单订单显示
                                getList();
                            }, 0);
                        } else {
                            tools.alert({title: '删除失败'});
                        }
                    });
            }

            //删除过期订单 作为 orderUid
            function delLoseNeedOrderId(dom) {
                var thisOrderId = dom.getAttribute('orderid');
                var url = config.host.nodeHost + '/sns/delNeed';
                tools.postJsp(url, {needId: thisOrderId})
                    .then(function (re) {
                        if (re.data && re.data.code == 'S') {
                            $timeout(function () {
                                $scope.isHaveLoseOrderFrom = false;//有选单订单显示
                                getList();
                            }, 0);
                        } else {
                            tools.alert({title: '删除失败'});
                        }
                    });
            }

        }


        /**
         * 更新当前订单为已读
         * @param callBack
         */

        function upDateIsReadMark(needId, callBack) {
            var url = config.host.nodeHost + '/member/editIsReatMark';
            tools.postJsp(url, {orderId: needId}, true)
                .then(function () {
                    callBack();
                });
        }


    }
})();
