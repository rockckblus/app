/**
 * localData.dipan.localDataNav.factory.js
 * 命名注释：server简称_localData. 父模块 dipan . 功能_本地 & app 默认数据. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('localData', localData);
    function localData() {
        var localData = {};
        localData.memberIndexNav = _memberIndexNav(); //我的 首页导航list
        localData.ti

        return localData;
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
                'name':'退出登录',
                'url':'member/loginOut'
            }
        ];


    }


})();

