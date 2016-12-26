(function () {
    'use strict';

    /**
     * body 控制器
     * 16/2/1 */
    angular.module('dipan').controller('body', body);
    angular.module('dipan').run(run);//angualr 第一次 启动后,加载一次run,去socket请求最新消息

    run.$inject = ['$rootScope', 'tools', 'config', '$interval'];
    function run($rootScope, tools, config, $interval) {
        getNewsData();
        var timer = $interval(function () {
            getNewsData();
        }, 60000);

        /**
         * 去socket请求最新消息
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
                    } else {
                        $rootScope.$broadcast('hideNews');//广播显示 没有有新消息
                    }
                }
            }
        }


    }

    /**
     * 手动注入
     * 16/2/1 */
    body.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tap', '$state', 'tools', 'getList', 'getCity', 'config', 'header'];

    /**
     * controllerFun
     * 16/2/1 */
    function body($scope, $rootScope, $timeout, localData, tap, $state, tools, getList, getCity, config, header) {

        var clickType = 'tap';
        tools.trueWeb(function () {
            clickType = 'click';
        }, function () {
            clickType = 'tap';
        });

        $scope.showNews = false;//底部会员有新消息图标显示
        $scope.xiaDan = false;//用户是否点击下单按钮,点击了,就隐藏下单,显示电话和在线联系
        $scope.$on('showNews', showNews);//监听有新消息图标显示事件
        $scope.$on('hideNews', hideNews);//监听关闭新消息图标事件
        $scope.$on('trueXiaDan', trueXiaDan);//监听判断当前用户是否对当前技能id下过单
        $scope.$on('callTelAlertCount0', callTelAlertCount0);//监听使打电话alertCount归0
        $scope.$on('callTel', callTel);//监听打电话 ,传obj{code=S,jiNengId,uid}
        $scope.$on('hideXiaDan', hideXiaDan);//监听隐藏下单按钮
        $scope.$on('showXianDan', showXiaDan);//监听显示下单按钮

        $scope.$on('openIm', openImInit);//监听跳转到聊天页面

        $scope.push = 'fa-plus-circle';//发布需求按钮的 图标样式
        $scope.$on('changeBody', function () {
            trueIsLogin();//判断登录
            trueShowHeader();//判断是否显示header
            // $rootScope.$broadcast('openLoading');//载入时候 默认打开loading
            $rootScope.$broadcast('closeAddFrom');//默认 关闭 技能发布按钮面板
            changeSubBtnIcon(true);//默认变换发布按钮为 加号
            showBottomNav();//显示底部导航
            var _url = '/' + $state.current.name;
            console.log('_url', _url);
            $timeout(function () {
                $scope.title = localData.getTitle(_url);//getTitle
                $scope.showTab = localData.showTab(_url);//是否显示 tab
                $scope.tabList = localData.tab(_url);//tablist body 控制器
                $scope.url = _url;//url变量,判断 top 模板 显示图标用
                bindH1SearchBtn();//首页搜索按钮显示隐藏
                /**
                 * 变换list 到 滚动记录的位置,判断 不同状态来 确定 是否 请求新的list数据
                 */
                mui.plusReady(function () {
                    function _init() {
                        changeScroll();
                        trueGetNew();
                    }

                    _init();
                    //变换到记录的 滚动位置
                    function changeScroll() {
                        try {
                            if ($scope.current.name == 'killContent') {
                                return false;
                            }
                            var scrollTopNum = $state.current.name + '_scrollTop';
                            var num = parseInt(localStorage.getItem(scrollTopNum));
                            try {
                                document.body.scrollTop = num;
                            } catch (e) {
                                try {
                                    window.pageYOffset = num;
                                } catch (e) {
                                    document.documentElement.scrollTop = num;
                                }
                            }
                        } catch (e) {
                            console.error('无当前页面name');
                        }
                    }

                    /**
                     * 判断scroll 位置,是需要 请求 url
                     * @param name
                     * @param postUrl
                     */
                    function trueGetNew() {

                        //监听滚动 事件
                        window.onscroll = function () {
                            _trueGetNew();
                        };

                        function _trueGetNew() {

                            //判断当前url 是否需要 newList
                            if (!trueNeedNewList()) {
                                return false;
                            }

                            //var scrollTopName = $state.current.name + '_scrollTop';
                            //if ((localStorage.getItem(scrollTopName) === '0') && localStorage.getItem($state.current.name)) {
                            //    //如果记录的 缓存有位置信息,并且 位置 是0, && 有缓存数据信息就去请求最新数据
                            //}

                            var num = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                            if (num === 0) {//当滚动到0的时候
                                $rootScope.$broadcast('showHeader');//显示header
                                $rootScope.$broadcast('showShaiXuan');//显示筛选
                                console.log('请求最新数据');
                            }
                        }
                    }

                    /**
                     * 判断是否需要获取newlist
                     * @returns {布尔} 需要就 是true
                     */
                    function trueNeedNewList() {
                        switch ($state.current.name) {
                            case 'home':
                                return true;
                            case 'need':
                                return true;
                        }
                    }


                });
                tap.init();//判断手机网页 手机 绑定 tap 事件, 网页绑定 click事件,(点击跳转url)
                trueXiaDan();//检测当前技能页面是否已经被下单过
                $scope.xiaDan = false;//changebody 的时候先默认关闭
            }, 0);
            init();
        });

        //显示H1SearchBtn 监听事件
        $scope.$on('showHiSearchBtn', showH1SearchBtn);

        function init() {
            $timeout(function () {
                bindXiaDanClick();//bind 下单按钮点击
                bindCallTel();//bind 打电话点击事件
                bindCallIm();//bind 聊一聊点击事件
            }, 0);
        }


        /**
         * 解析监听传来的数据,再跳转到聊天
         * @param e
         * @param v
         */
        function openImInit(e, v) {
            openIm(v.gHeader, v.gUId, v.gName, v.userHeader, v.userId);
        }


        /**
         * bind 聊一聊点击事件
         */
        function bindCallIm() {
            if ($state.current.name == 'killContent') {
                var ele = document.getElementById('callIm');
                tools.loginEvent(ele, clickType, _bind);
            }

            function _bind() {
                getGuest();
                function getGuest() {//获取技能用户资料
                    var url = config.host.nodeHost + '/member/getKillContent';
                    tools.postJsp(url, {jiNengId: $state.params.jiNengId}, true).then(function (re) {
                        if (re.data && re.data.code == 'S' && re.data.doc) {
                            var gHeader = header.defaultHeader;
                            if (re.data.doc.userData.headerImg) {
                                gHeader = re.data.doc.userData.headerImg;
                            }
                            var userHeader = header.defaultHeader;
                            var thisHeader = tools.getLocalStorageObj('userData').headerImg;
                            if (thisHeader) {
                                userHeader = thisHeader;
                            }
                            var uid = tools.getLocalStorageObj('userData').uid;
                            var gName = re.data.doc.userData.name;
                            if (!gName) {
                                gName = re.data.doc.userData.mt;
                            }
                            openIm(gHeader, re.data.doc.userData._id, gName, userHeader, uid);
                        } else {
                            _err(re.msg);
                        }
                    }, _err);

                    function _err(msg) {
                        var reMsg = '获取该用户的信息失败';
                        if (msg) {
                            reMsg = msg;
                        }
                        tools.alert({title: reMsg});
                    }
                }


            }
        }

        /**
         * 跳转
         * @param gHeader 来宾联系人的头像
         * @param gUId 来宾联系人的id
         * @param gName 来宾联系人的name
         * @param userHeader 用户头像
         * @param userId 用户id
         */
        function openIm(gHeader, gUId, gName, userHeader, userId) {
            if (gUId && userId) {
                mui.openWindow({
                    url: 'callIm.html',
                    extras: {
                        gusetHeader: gHeader,
                        gusetId: gUId,
                        userHeader: userHeader,
                        userId: userId,
                        gName: gName,
                    }
                });
            }
        }

        /**
         * 打电话点击事件
         */
        var alertCount = 0;

        /**
         * 监听使打电话alertCount归0
         */
        function callTelAlertCount0() {
            alertCount = 0;
        }

        /**
         * bind 打电话点击事件
         */
        function bindCallTel() {
            if ($state.current.name == 'killContent') {
                var ele = document.getElementById('callTel');
                tools.loginEvent(ele, clickType, _bind);
            }

            function _bind() {
                //去请求接口查询是否有打电话权限
                var jinengId = $state.params.jiNengId;
                var uid = tools.getLocalStorageObj('userData').uid;
                if (uid) {
                    var postData = {
                        uid: uid,
                        jiNengId: jinengId
                    };
                    var url = config.host.nodeHost + "/member/trueTelCall";
                    tools.postJsp(url, postData).then(callTel, callTelerr);
                }
            }
        }

        /**
         * 大电话
         */
        function callTel(re, re2) {
            if (re2) {
                re = re2;
            }

            if (re.data && re.data.code == 'S') {
                alertCount++;
                tools.trueWeb(function () {
                    if (alertCount == 1) {
                        alert('请下载手机app使用此功能');
                    }
                }, function () {
                    var postData2 = {
                        uid: re.data.uid,
                        jiNengId: re.data.jiNengId
                    };
                    var url2 = config.host.nodeHost + "/member/getUserTel";//todo 加密解密
                    tools.postJsp(url2, postData2, true).then(__s, __err);

                    function __s(re2) {
                        if (re2.data && re2.data.code == 'S') {
                            if (alertCount > 1) {
                                plus.device.dial(re2.data.mt, false);
                            }
                        } else {
                            __err();
                        }
                    }

                    function __err() {
                        tools.alert({title: '拨打电话失败'});
                    }
                });
            } else {
                callTelerr();
            }
        }

        function callTelerr() {
            tools.alert('此用户禁止了电话服务!');
        }


        /**
         *bind 下单按钮点击
         */
        function bindXiaDanClick() {
            try {
                if ($state.current.name == 'killContent') {//对技能下单
                    document.getElementById('xiaDan').addEventListener(clickType, _bindXiaDan);
                }
                if ($state.current.name == 'orderFromContent') {//对需求接单
                    document.getElementById('xiaDan').addEventListener(clickType, _bindJieDan);
                }
            } catch (e) {
                console.error('无下单按钮');
            }

            /**
             * 对技能下单
             * @private
             */
            function _bindXiaDan() {

                //去请求接口标记技能id
                var jinengId = $state.params.jiNengId;
                var uid = tools.getLocalStorageObj('userData').uid;
                var needRoundId = tools.getLocalStorageObj('killContentRoundId');
                var gpsObj = tools.getLocalStorageObj('areaGps');
                if (uid) {
                    var postData = {
                        uid: uid,//下单用户id
                        jiNengId: jinengId,
                        needRoundId: needRoundId,
                        areaGps: gpsObj
                    };
                    var url = config.host.nodeHost + "/member/xiaDan";
                    tools.postJsp(url, postData, true).then(_s, _err);
                }
            }

            /**
             * 对需求接单
             * @private
             */
            function _bindJieDan() {
                // 需求id
                var orderId = $state.params.orderId;
                var uid = tools.getLocalStorageObj('userData').uid;
                if (uid) {
                    var postData = {
                        uid: uid,//下单用户id
                        orderId: orderId //订单id
                    };
                    var url = config.host.nodeHost + "/member/jieDan";
                    tools.postJsp(url, postData, true).then(_s, _err);
                }
            }

            function _s(re) {
                if (re.data && re.data.code == 'S') {
                    $timeout(function () {
                        $scope.xiaDan = true;
                    }, 0);
                } else {
                    _err();
                }
            }

            function _err(err) {
                tools.alert({
                    title: err
                });
            }

        }

        /**
         * 检测当前技能页面是否已经被下单过,来控制显示和隐藏电话
         */
        function trueXiaDan() {
            if ($state.current.name == 'killContent') {
                var uid = tools.getLocalStorageObj('userData').uid;
                var jinengId = $state.params.jiNengId;
                if (uid) {
                    var postData = {
                        uid: uid,
                        jiNengId: jinengId
                    };
                    var url = config.host.nodeHost + "/member/trueXianDan";
                    tools.postJsp(url, postData, true).then(_s, _err);
                }
            }

            if ($state.current.name == 'needContent') {
                var uid = tools.getLocalStorageObj('userData').uid;
                var orderId = $state.params.orderId;
                if (uid) {
                    var postData = {
                        uid: uid,
                        orderId: orderId
                    };
                    var url = config.host.nodeHost + "/member/trueJieDan";
                    tools.postJsp(url, postData, true).then(_s, _err);
                }
            }

            function _s(re) {
                if (re.data && re.data.code == 'S') {
                    $timeout(function () {
                        $scope.xiaDan = true;
                    }, 0);
                } else {
                    _err();
                }
            }

            function _err() {
                $timeout(function () {
                    $scope.xiaDan = false;
                }, 0);
            }
        }

        /**
         * 隐藏下单
         */
        function hideXiaDan() {
            $timeout(function () {
                $scope.xiaDan = true;
            }, 0);
        }

        /**
         * 显示下单
         */
        function showXiaDan() {
            $timeout(function () {
                $scope.xiaDan = false;
            }, 0);
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
         * 判断登录
         */
        function trueIsLogin() {
            if (localStorage.getItem('isLogin')) {
                return true;
            } else {//跳转到登录
                _goLogin();
                return false;
            }

            /**
             * 跳转到登录
             * @private
             */
            function _goLogin() {
                $state.go('login');
            }


        }

        /**
         * 修改发布按钮图标
         */
        function changeSubBtnIcon(def) {
            if (def) {
                $timeout(function () {
                    $scope.push = 'fa-plus-circle';
                }, 0);
            } else {
                if ($scope.push == 'fa-plus-circle') {
                    $timeout(function () {
                        $scope.push = 'fa-minus-circle';
                    }, 0);
                } else {
                    $timeout(function () {
                        $scope.push = 'fa-plus-circle';
                    }, 0);
                }
            }
        }

        /**
         * 底部导航 显示 添加需求技能面板 按钮
         * @type {Element}
         */
        var addFromBtn = document.getElementById('addFromBtn');
        clickBin(addFromBtn);

        /**
         * bin 添加按钮点击事件
         */
        function clickBin(doc) {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
            });
            try {
                doc.addEventListener(type, function () {
                    changeSubBtnIcon();
                    $rootScope.$broadcast('showAddFrom');
                });
            } catch (e) {
                console.error('无底部');
            }
        }

        /**
         * bindH1SearchBtn 绑定 h1 搜索按钮点击事件
         */
        function bindH1SearchBtn() {
            $timeout(function () {
                try {
                    var searchBtnDom = document.getElementById('searchIconH1');
                    var angularSearchBtnDom = angular.element(searchBtnDom);
                    searchBtnDom.addEventListener('tap', function () {
                        $rootScope.$broadcast('focusSearch');//搜索焦点事件
                        angularSearchBtnDom.css({
                            'display': 'none'
                        });
                    });
                } catch (e) {
                    console.log('无searchBtn');
                }
            }, 0);
        }

        /**
         * 显示 h1SearchBtn
         */
        function showH1SearchBtn() {
            $timeout(function () {
                try {
                    var searchBtnDom = document.getElementById('searchIconH1');
                    var angularSearchBtnDom = angular.element(searchBtnDom);
                    angularSearchBtnDom.css({
                        'display': 'block'
                    });
                } catch (e) {
                    console.log('无searchBtn');
                }
            }, 0);
        }

        /**
         * 判断是否显示 hedaer trueShowHeader
         */
        function trueShowHeader() {
            if (localData.trueShowHedaer($state.current.name)) {
                $rootScope.$broadcast('showHeader', true);//广播当前页面需要显示 header
            } else {
                $rootScope.$broadcast('hideHeader', true);//广播当前页面需要隐藏 header
            }
        }

        /**
         * 显示底部导航
         */

        function showBottomNav() {
            var dom = document.getElementById('bottomNav');
            try {
                dom.style.display = "block";
            } catch (e) {
                console.error('无底部');
            }
        }
    }
})
();
