/**
 * ui.dipan.ui.factory.js
 * 命名注释：server简称_ui. 父模块 dipan . 功能_ui相关封装(alert,),rootScope 下的事件触发,. 类型_factory.js
 */

(function () {
    'use strict';

    /** api接口,nodejs,php  */
    var apiUrl = {};


    angular.module('dipan').factory('ui', ui);
    ui.$inject = ['$rootScope'];

    function ui($rootScope) {
        var re = {};
        re.alert = _alert;//标准alertui

        function _alert(obj) {
            //obj 格式 {'title':title,'content':content}
            $rootScope.$broadcast('alert', obj);
        }
        return re;
    }

})();
