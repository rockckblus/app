/**
 * localData.dipan.localDataNav.factory.js
 * 命名注释：server简称_localData. 父模块 dipan . 功能_本地 & app 默认数据. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('localData', localData);

    localData.$inject = ['$location'];

    var location;

    function localData($location) {
        location = $location;
        var localData = {};
        localData.memberIndexNav = _memberIndexNav(); //我的 首页导航list
        localData.tab = _tab;//根据 url 遍历 给tab数据
        localData.showTab = _showTab;//遍历url 返回true false ,控制是否显示tab
        localData.getTitle = _getTitle;//getTitle
        return localData;
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

})();

