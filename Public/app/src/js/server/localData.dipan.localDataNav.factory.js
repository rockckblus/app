/**
 * localData.dipan.localDataNav.factory.js
 * 命名注释：server简称_localData. 父模块 dipan . 功能_本地 & app 默认数据. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('localData', localData);

    localData.$inject = ['$location', 'tools', '$rootScope', 'config'];

    var location;
    var thisLocalData = {};
    var thisTools = {};
    var thisRootScope;
    var _config;

    function localData($location, tools, $rootScope, config) {
        console.log('thisTools', tools);
        thisRootScope = $rootScope;
        location = $location;
        thisLocalData.memberIndexNav = _memberIndexNav(); //我的 首页导航list
        thisLocalData.tab = _tab; //根据 url 遍历 给tab数据
        thisLocalData.showTab = _showTab; //遍历url 返回true false ,控制是否显示tab
        thisLocalData.getTitle = _getTitle; //getTitle
        thisLocalData.gps = {
            isHaveGps: false, //判断
        };
        thisLocalData.giveRoundCode = _giveRoundCode;//第一次后给一个随机码,验证用户发送短信用
        thisLocalData._init = function () {
            thisTools = tools;
            _config = config;
            thisLocalData.giveRoundCode();
            getGps();
        };

        //start
        thisLocalData._init();
        return thisLocalData;
    }

    /**
     * getTitle 获取标题
     * @param {网址}url
     * @returns {*}
     * @private
     */
    function _getTitle(url) {
        switch (url) {
            case '/memberIndex':
                return '我的';
            case '/home':
                return 'Home';
            case '/login':
                return '我的';
            case '/area':
                return '地区选择';
            case '/search':
                return '搜索';
            default:
                return false;
        }
    }


    /**
     * 我的 首页 导航 list
     * @returns {*[]}
     * @private
     */
    function _memberIndexNav() {
        return [{
            'name': '资料编辑',
            'url': 'member/memberInfo',
            'id': 1,
            'icon': 'fa fa-pencil-square-o fa-1x'
        }, {
            'name': '退出登录',
            'url': 'member/loginOut',
            'id': 2,
            'icon': 'fa fa-sign-out fa-1x'
        }];
    }

    /**
     * 遍历url 返回true false ,控制是否显示tab
     * @param url
     * @returns {boolean}
     * @private
     */
    function _showTab(url) {
        switch (url) {
            case '/home':
                return true;
            case '/memberIndex':
                return true;
            case '/login':
                return true;
            case '/area':
                return false;
            case '/search':
                return false;
            default:
                return false;
        }
    }

    /**
     * 根据 url 遍历 给tab数据
     * @param url
     * @returns {Array}
     * @private
     */
    function _tab(url) {
        var _obj = [];
        var title = _getTitle();
        var _objDefaulOne = {
            colNumCss: 'twoTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            thisItem: 'thisItem', //高亮 css 名称
            name: title, //名称
            route: url //routeUrl
        };
        switch (url) {
            case '/home':
                _obj = [{
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: _objDefaulOne.thisItem, //高亮
                    name: '供', //名称
                    route: 'home' //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '需', //名称
                    route: 'memberIndex' //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '评', //名称
                    route: 'memberIndex' //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '<i class="fa fa-ellipsis-h"></i>', //名称
                    route: 'memberIndex' //routeUrl
                },];
                return _obj;
            case '/memberIndex':
                _obj = [{
                    colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '登录', //名称
                    route: 'login' //routeUrl
                }, {
                    colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: _objDefaulOne.thisItem, //高亮
                    name: '设置', //名称
                    route: 'memberIndex' //routeUrl
                },];
                return _obj;
            case '/login':
                _obj = [{
                    colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: _objDefaulOne.thisItem, //高亮
                    name: '登录', //名称
                    route: 'login' //routeUrl
                }, {
                    colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '设置', //名称
                    route: 'memberIndex' //routeUrl
                },];
                return _obj;
            default:
                return [];
        }


    }

    /**
     * get gps 获取gps 或者 ip定位 拿到 gps(web), 给到 gpsObj
     * 广播全局 gps 事件.
     */
    function getGps() {
        thisTools.trueWeb(_web, _app);//判断手机 或者 app 来判断 定位 ,获取地理位置数据

        /*************************
         * todo
         * //获取 ip地址,去反查地址数据
         * 16/8/19 上午7:43 ByRockBlus
         *************************/
        function _web() {
            var url = _config.host.phpHost + '/Api/Jsonp/getIP/from/web';

            thisTools.getJsp(url, true).then(_s, _f);


            function _s(re) {
                thisTools.alert({title: re.ip});
            }

            function _f() {

            }

            //获取 ip地址,去反查地址数据
        }

        /*************************
         *获取手机导航gps,去soso拿地址数据
         * 16/8/19 上午7:43 ByRockBlus
         *************************/
        function _app() {
            var gpsObj = {};

            // H5 plus事件处理
            function plusReady() {
                if (!window.plus) {
                    return;
                }
                setTimeout(function () {
                    //todo ios 真机调试
                    plus.geolocation.getCurrentPosition(_success, _err, _option);
                }, 0);
            }

            if (window.plus) {
                plusReady();
            } else {
                document.addEventListener("plusready", plusReady, false);
            }


            //定位成功回调
            function _success(p) {
                gpsObj.lat = p.coords.latitude;
                gpsObj.lng = p.coords.longitude;
                thisTools.alert({
                    'title': 'title' + gpsObj.lat,
                    'content': gpsObj.lng
                });
            }

            //失败回调
            function _err(e) {

                console.log(e);
                thisTools.alert({
                    title: '获取位置失败',
                    content: e.message
                });
            }

            //参数配置
            /**************************
             * enableHighAccuracy: (Boolean 类型 )是否高精确度获取位置信息
             高精度获取表示需要使用更多的系统资源，默认值为false。

             timeout: (Number 类型 )获取位置信息的超时时间
             单位为毫秒（ms），默认值为不超时。如果在指定的时间内没有获取到位置信息则触发错误回调函数。

             maximumAge: (Number 类型 )获取位置信息的缓存时间
             单位为毫秒（ms），默认值为0（立即更新获取）。如果设备缓存的位置信息超过指定的缓存时间，将重新更新位置信息后再返回。

             provider: (String 类型 )优先使用的定位模块
             可取以下供应者： "system"：表示系统定位模块，支持wgs84坐标系；
             "baidu"：表示百度定位模块，支持gcj02/bd09/bd09ll坐标系；
             "amap"：表示高德定位模板，支持gcj02坐标系。
             默认值按以下优先顺序获取（amap>baidu>system），若指定的provider不存在或无效则返回错误回调。
             注意：百度/高德定位模块需要配置百度/高德地图相关参数才能正常使用。
             * 16/8/21 上午7:43 ByRockBlus
             **************************/

            function _option() {
                return {
                    enableHightAccuracy: false,
                    timeout: 10000,
                    maximumAge: 600000,
                };
            }
        }

    }


    /*************************
     * 根据 ip 定位城市
     * 16/9/2 上午8:09 ByRockBlus
     *************************/

    function ipToCity() {
        console.log('arg', arguments);

    }


    /*************************
     * 根据gps 定位城市,并返回 具体信息 (app)
     * 16/9/2 上午8:10 ByRockBlus
     *************************/

    /**
     * 第一次后给localStorage一个随机码,验证用户发送短信用
     * @private
     */
    function _giveRoundCode() {
        localStorage.clear(_config.localSaveName.user.roundCodeId);
        setTimeout(function () {
            var roundCode = rndNum(8);
            localStorage.setItem(_config.localSaveName.user.roundCodeId, roundCode);
        }, 200);

        /**
         * 返回一个 随机数
         * @param {位数}n
         * @returns {string}
         */
        function rndNum(n) {
            var rnd = "";
            for (var i = 0; i < n; i++) {
                rnd += Math.floor(Math.random() * 10);
            }
            return rnd;
        }
    }

})();