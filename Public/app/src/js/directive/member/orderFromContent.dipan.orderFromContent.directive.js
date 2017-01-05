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
        // $scope.userShow = false;//技能方进入   判断是不是此用户发的,是此用户发的,就不显示个人资料
        // $scope.userSelect = false;//需求方(自己进入)  判断是不是此用户发的,是此用户发的,就不显示个人资料
        $scope.bindUserShow = false;//技能方进入并且 是 下单,(等待技能方接单)
        $scope.userType = false;//判断进入的用户角色显示不同ui 1公共 2 技能方进入  3需求方进入
        $scope.showUserData = false;//显示用户资料面板

        $scope.bindUserShowName = '';//bindUserShowName 等您接单
        $scope.seeOtherKillInfo = '暂时无人接单,去看看其他人的技能吧!';
        $scope.bindUserShowAlreadyJieDan = false;//技能方 已经成交 给评价
        $scope.$on('getOrderContent', getOrderContent);//监听获取订单详情


        function init() {
            getOrderContent();//获取订单详情
        }

        function getOrderContent() {
            var url = config.host.nodeHost + '/member/getOrderFromContent';
            var uid = tools.getLocalStorageObj('userData').uid;
            tools.postJsp(url,
                {
                    uid: uid,
                    orderId: $state.params.orderId,
                    areaGps: tools.getLocalStorageObj('areaGps').gpsObj
                }, true).then(_s);
            function _s(re) {
                if (re.data && re.data.code == 'S' && re.data.doc) {

                    //头像
                    if (re.data.doc.userData && !re.data.doc.userData.headerImg) {
                        re.data.doc.userData.headerImg = header.defaultHeader;
                    }

                    //价格
                    if (re.data.doc.thisNeed && re.data.doc.thisNeed.priceUnit == '面议') {
                        re.data.doc.thisNeed.priceStr = '价格面议';
                    } else if (re.data.doc.thisNeed) {
                        re.data.doc.thisNeed.priceStr = re.data.doc.thisNeed.price + ' ' + re.data.doc.thisNeed.priceUnit;
                    }

                    //组合单位str
                    angular.forEach(re.data.doc.needList, function (vo) {
                        if (vo.priceUnit == '面议') {
                            vo.priceStr = '';
                        } else {
                            vo.priceStr = "<span style='color: red;'>" + vo.price + "</span>" + ' ' + vo.priceUnit;
                        }
                    });

                    if (re.data.doc.thisNeed && re.data.doc.thisNeed.bidUserArr) {
                        var trueXiaDan = {
                            isHaveXiaDan: false, //是否有下单
                            bindUid: '',//被下单的uid
                            orderUid: '',//orderUid
                        };//判断是下单,等待技能方接单的情况
                        angular.forEach(re.data.doc.thisNeed.bidUserArr, function (vo2) {
                                if (!vo2.headerImg) {
                                    vo2.headerImg = header.defaultHeader;
                                }

                                if (vo2.bindUidType == 2) {//被动接单(点击下单)
                                    trueXiaDan.isHaveXiaDan = true;
                                    trueXiaDan.bindUid = vo2.uid;
                                    trueXiaDan.orderUid = re.data.doc.thisNeed.uid._id;
                                    trueXiaDan.orderId = re.data.doc.orderId;
                                    trueXiaDan.showName = re.data.doc.thisNeed.uid.name;
                                    if (!trueXiaDan.showName) {
                                        trueXiaDan.showName = re.data.doc.thisNeed.uid.mt;
                                    }
                                    if (vo2.bindUid && vo2.bindUid.name) {
                                        $timeout(function () {
                                            $scope.seeOtherKillInfo = '等待\"' + vo2.bindUid.name + '\"接单';
                                        }, 0);
                                    }
                                    else {
                                        $timeout(function () {
                                            $scope.seeOtherKillInfo = '等待\"' + vo2.bindUid.mt + '\"接单';
                                        }, 0);
                                    }
                                }
                            }
                        );

                        if (trueXiaDan.isHaveXiaDan) {//如果是下单,等待技能方接单的情况
                            //判断当前uid, 是否接单id(bindUid),是就显示接单按钮,(接单后直接 成交)
                            var thisUidLocal = tools.getLocalStorageObj('userData');
                            if (thisUidLocal && thisUidLocal.uid) {
                                if (thisUidLocal.uid == trueXiaDan.bindUid) {
                                    $timeout(function () {
                                        $scope.bindUserShow = true;
                                        $scope.bindUserShowName = trueXiaDan.showName;
                                        $scope.bindUserShowData = trueXiaDan;
                                        $timeout(function () {
                                            tools.bindClick('bindJieDan', bindJieDan);//bind接单点击
                                        }, 0);
                                    }, 0);
                                }
                            } else {
                                $state.go('loginout');
                            }
                        }
                    }

                    //判断有接单的bindUser 给头像
                    if (re.data.doc.thisNeed && re.data.doc.thisNeed.bindUser && !re.data.doc.thisNeed.binUser.headerImg) {
                        re.data.doc.thisNeed.binUser.headerImg = header.defaultHeader;
                    }

                    $timeout(function () {
                        if ((re.data.doc.userData._id == tools.getLocalStorageObj('userData').uid)) {
                            $timeout(function () {
                                $scope.userType = 3;//需求方
                                showUi('select');
                            }, 0);
                        }
                        else if (re.data.doc.userType == 2) {//技能方


                            if (re.data.doc.userData.isJion) {//如果当前用户已经接了这单,隐藏接单按钮
                                $rootScope.$broadcast('hideXiaDan');
                            } else if ((re.data.doc.thisNeed.state !== 1) && (re.data.doc.thisNeed.state !== 2)) {//如果隐藏打电话
                                document.getElementById('bottomNavCall').style.display = 'none';
                            }

                            $timeout(function () {
                                //如果当前已选单,并且被选技能方不是 当前 技能方的 uid , 那摸当前技能方就转换为公共方角色
                                if (trueKillType(re)) {
                                    $scope.userType = 1;//转换为公共方
                                } else {
                                    $scope.userType = 2;//技能方
                                }
                                showUi('show');
                            }, 0);
                        }
                        else {//公共方
                            $timeout(function () {
                                $scope.userType = 1;//公共方
                            }, 0);
                        }
                        $scope.data = re.data.doc;
                        $timeout(function () {
                            bindClick();//bind用户列表 打电话,发消息,评价,没有订单 点击事件
                            bindJiNengListClick();//绑定更多需求点击事件
                            bindUserDataClick();//绑定用户数据弹窗事件
                        }, 0);
                    }, 0);
                }
            }
        }

        /**
         * 如果当前已选单,并且被选技能方不是 当前 技能方的 uid , 那摸当前技能方就转换为公共方角色
         */
        function trueKillType(re) {
            console.log('re', re);
            if (tools.getLocalStorageObj('userData')) {
                var uid = tools.getLocalStorageObj('userData').uid;
                if (re.data && re.data.doc && re.data.doc.thisNeed && re.data.doc.thisNeed.state == 3) {//如果已选单
                    //判断当前uid 是不选单的 技能uid
                    if (re.data && re.data.doc && re.data.doc.thisNeed && re.data.doc.thisNeed.bidUser && re.data.doc.thisNeed.bidUser.uid != uid) {
                        return true;
                    }
                    return false;
                } else {
                    return false;
                }
            }
        }

        /**
         * 绑定用户数据弹窗事件
         */
        function bindUserDataClick() {

            tools.bindClick('showUserDataFromBtn', _bindShow);
            tools.bindClick('closeUserDataFromePage', _bindClose);

            function _bindShow() {
                $timeout(function () {
                    $scope.showUserData = true;//显示用户资料面板
                }, 0);
            }

            function _bindClose() {
                $timeout(function () {
                    $scope.showUserData = false;//显示用户资料面板
                }, 0);
            }
        }

        /**bindJieDan
         * bind接单点击事件,(等您接单)
         */
        function bindJieDan(dom) {
            var url = config.host.nodeHost + '/member/selectOrderFrom';
            var postObj = {
                bindUid: dom.getAttribute('binduid'),
                orderUid: dom.getAttribute('orderuid'),
                orderId: dom.getAttribute('orderid')
            };


            plus.nativeUI.confirm("网络交易注意防骗!建议走淘宝交易流程!", function (e) {
                if (e.index === 0) {
                    tools.postJsp(url, postObj).then(_call, _err);
                }
            }, "确定接单吗?", ["确定", "取消"]);


            function _call(re) {
                if (re && re.data && re.data.code == 'S') {
                    $timeout(function () {
                        $scope.bindUserShow = false;
                    }, 0);
                    getOrderContent();//接单成功,获取订单详情,
                } else {
                    _err('接单失败');
                }
            }

            function _err(err) {
                err = err || '接单失败';
                tools.alert({title: err});
            }
        }

        /**
         * 根据不同的角色进入,显示不同ui
         */
        function showUi(type) {
            if (type == 'select') {//需求方
                $timeout(function () {
                    $scope.userShow = false;
                    $scope.userSelect = true;
                    document.getElementById('bottomNavCall').style.display = 'none';
                }, 0);
            }
            if (type == 'show') {//技能方
                $timeout(function () {
                    $scope.userShow = true;
                    $scope.userSelect = false;
                    trueKillUserAleadeySelect();//判断技订单已经成交,显示技能方评价
                }, 0);

            }
        }

        /**
         * 判断技订单已经成交,显示技能方评价
         */
        function trueKillUserAleadeySelect() {
            if ($scope.data && $scope.data.thisNeed && $scope.data.thisNeed.state == 3) {//如果已经成交
                $timeout(function () {
                    $scope.bindUserShowAlreadyJieDan = true;
                }, 0);
            }
        }

        /**
         * bind点击
         */
        function bindClick() {
            if ($scope.data && $scope.data.thisNeed && $scope.data.thisNeed.bidUserArr) {
                angular.forEach($scope.data.thisNeed.bidUserArr, function (vo) {
                    tools.bindClick('telCall_' + vo.uid, telCall);
                    tools.bindClick('imCall_' + vo.uid, imCall);
                    tools.bindClick('selectUser_' + vo.uid, selectUser);
                });
                var binId;
                if ($scope.data.thisNeed.bidUser && $scope.data.thisNeed.bidUser.uid) {
                    binId = $scope.data.thisNeed.bidUser.uid;
                }
                if (binId) {
                    tools.bindClick('telCallSelect_' + binId, telCall);
                    tools.bindClick('imCallSelect_' + binId, imCall);
                    tools.bindClick('givePingJiaBtnNeed', pingJiaSubNeed);
                    tools.bindClick('givePingJiaBtnKill', pingJiaSubKill);
                }
            } else {
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
            }, "确定选择\"" + gName + '\"?', ["确定", "取消"]);
        }

        /**
         * 选单
         */
        function selectOrderFrom(uid, orderId) {
            var url = config.host.nodeHost + '/member/selectOrderFrom';
            tools.postJsp(url, {bindUid: uid, orderId: orderId}).then(_s, _e);

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
         * pingJiaSub need
         */
        function pingJiaSubNeed() {
            var val = document.getElementById('pingJiaNeed').value;
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

        /**
         * pingJiaSub kill
         */
        function pingJiaSubKill() {
            var val = document.getElementById('pingJiaKill').value;
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

        /**
         * bind 更多需求点击
         */
        function bindJiNengListClick() {
            angular.forEach($scope.data.needList, function (vo) {
                // var dom = document.getElementById('needlist_' + vo._id);
                // dom.addEventListener(clickType, function () {
                //     _bind(dom);
                // });

                tools.bindClick('needlist_' + vo._id, _bind);


            });
            function _bind(dom) {
                var _id = dom.getAttribute('subid');
                $state.go('orderFromContent', {'orderId': _id});
            }
        }

    }
})
();
