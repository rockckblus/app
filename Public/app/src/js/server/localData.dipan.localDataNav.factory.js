/**
 * localData.dipan.localDataNav.factory.js
 * 命名注释：server简称_localData. 父模块 dipan . 功能_本地 & app 默认数据. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('localData', localData);

    localData.$inject = ['$location','tools','$rootScope'];

    var location;
    var thisLocalData = {};
    var thisTools;
    var thisRootScope;
    setTimeout(function(){
        getGps();//获取gps数据
    },0);

    function localData($location,tools,$rootScope) {
        thisTools= tools;
        thisRootScope = $rootScope;

        location = $location;
        thisLocalData.memberIndexNav = _memberIndexNav(); //我的 首页导航list
        thisLocalData.tab = _tab;//根据 url 遍历 给tab数据
        thisLocalData.showTab = _showTab;//遍历url 返回true false ,控制是否显示tab
        thisLocalData.getTitle = _getTitle;//getTitle
        thisLocalData.gps = {
            isHaveGps:false,//判断
        };


        return thisLocalData ;
    }

    /*************************
     * getTitle
     * 16/8/17 上午10:18 ByRockBlus
     *************************/
    function _getTitle(url) {
        switch (url) {
            case '/memberIndex' :
                return '我的';
            case '/home' :
                return 'Home';
            default:
                return false;
        }
    }

    /*************************
     * 我的 首页 导航 list
     * 16/8/15 上午9:02 ByRockBlus
     *************************/
    function _memberIndexNav() {
        return [
            {
                'name': '资料编辑',
                'url': 'member/memberInfo'
            },
            {
                'name': '退出登录',
                'url': 'member/loginOut'
            }
        ];
    }


    /*************************
     * 遍历url 返回true false ,控制是否显示tab
     * 16/8/17 上午9:31 ByRockBlus
     *************************/
    function _showTab(url) {
        console.log('rul', url);
        switch (url) {
            case '/home' :
                return true;
            case '/memberIndex' :
                return true;
            default:
                return false;
        }
    }

    /*************************
     * 根据 url 遍历 给tab数据
     * 16/8/17 上午7:47 ByRockBlus
     *************************/
    function _tab(url) {
        var _obj = [];
        //var title = _getTitle();
        var title = '_getTitle()';
        var _objDefaulOne = {
            colNumCss: 'twoTab',//设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            thisItem: 'thisItem',//高亮 css 名称
            name: title,//名称
            route: url//routeUrl
        };
        switch (url) {
            case '/home':
                _obj = [
                    {
                        colNumCss: 'fourTab',//设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                        thisItem: _objDefaulOne.thisItem,//高亮
                        name: '供',//名称
                        route: 'home'//routeUrl
                    },
                    {
                        colNumCss: 'fourTab',//设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                        thisItem: false,//高亮
                        name: '需',//名称
                        route: 'memberIndex'//routeUrl
                    },
                    {
                        colNumCss: 'fourTab',//设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                        thisItem: false,//高亮
                        name: '评',//名称
                        route: 'memberIndex'//routeUrl
                    },
                    {
                        colNumCss: 'fourTab',//设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                        thisItem: false,//高亮
                        name: '<i class="fa fa-ellipsis-h"></i>',//名称
                        route: 'memberIndex'//routeUrl
                    },
                ];
                return _obj;
            case '/memberIndex':
                _obj = [
                    {
                        colNumCss: _objDefaulOne.colNumCss,//设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                        thisItem: false,//高亮
                        name: '首页',//名称
                        route: 'home'//routeUrl
                    },
                    {
                        colNumCss: _objDefaulOne.colNumCss,//设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                        thisItem: _objDefaulOne.thisItem,//高亮
                        name: '我的',//名称
                        route: 'memberIndex'//routeUrl
                    },
                ];
                return _obj;
            default:
                return [];
        }


    }


    /**************************
     * get gps 获取gps 或者 ip定位 拿到 gps(web), 给到 gpsObj
     * 广播全局 gps 事件.
     * 16/8/21 上午9:53 ByRockBlus
     **************************/
    function getGps(){
        thisTools.trueWeb(_web, _app);//判断手机 或者 app 来判断 定位 ,获取地理位置数据
            thisTools.alert({title:4446667777888});


        /*************************
         * todo
         * //获取 ip地址,去反查地址数据
         * 16/8/19 上午7:43 ByRockBlus
         *************************/
        function _web() {
            //获取 ip地址,去反查地址数据
        }

        /*************************
         * todo
         *获取手机导航gps,去soso拿地址数据
         * 16/8/19 上午7:43 ByRockBlus
         *************************/
        function _app() {
            var  gpsObj = {};
            document.addEventListener('plusready',function(e){
                plus.geolocation.getCurrentPosition(_success,_err,_option);

                //定位成功回调
                function _success(p){
                    console.log('p',p);
                    gpsObj.lat = p.coords.latitude;
                    gpsObj.lng = p.coords.longitude ;
                    thisTools.alert({'title':gpsObj.lat,'content':gpsObj.lng});
                }

                //失败回调
                function _err(e){
                    thisTools.alert({title:'获取位置失败',content: ''});

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

                function _option(){
                    return{
                        enableHightAccuracy:false,
                        timeout:10000,
                        maximumAge:600000,
                    };
                }
            });
        }



    }


})();

