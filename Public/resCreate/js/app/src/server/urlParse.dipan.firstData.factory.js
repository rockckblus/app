/**
 * urlParse.dipan.urlParse.factory.js
 * 命名注释：server简称_urlParse. 父模块 dipan . 功能_全局变量 数据 模型. 类型_factory.js
 * ------------------------------------------------
 * 监听从模板解析来的 php变量对象 赋值改变事件 urlParseChange
 * 同时广播 所有 子域, 变量改变事件 urlParseChange
 */

(function () {
    'use strict';
    angular.module('dipan').factory('urlParse', urlParse);

    urlParse.$inject = ['$rootScope', 'api'];

    var fun = {};//urlParse 相关方法对象
    var data = {};//全局变量对象
    var apiPost;//apiPost server
    function urlParse($rootScope, api) {
        apiPost = api;
        /**
         * 监听从模板解析来的 php变量对象 赋值改变事件 urlParseChange
         * 同时广播 所有 子域, 变量改变事件 urlParseChange
         * 16/3/10 */
        onUrlParseChange();

        /**
         * 返回urlParse变量对象
         * 16/3/10 */
        return {
            data: data,
            fun: fun
        };

        /**
         * 监听从模板解析来的 php变量对象 赋值改变事件
         * 同时广播 所有 子域, 变量改变事件 urlParseChange
         * 16/3/10 */
        function onUrlParseChange() {
            $rootScope.$on('urlParseChange', function () {
                $rootScope.$broadcast('urlParseChangeSub');
            });
        }
    }

    /*************************
     * fun 详情
     * 16/3/10 ***************/

    /**
     * 获取topArea地区 字符串
     * @param {obj} session 对象
     * @returns {String}
     * 16/3/17 */
    fun.getTopArea = function (session) {
        var re;
        try {
            switch (session.place.type) {
                case 1:
                    re = session.place.thisCityInfo.name;//一级天津
                    break;
                case 2:
                    re = session.place.oneCityInfo.name + session.place.thisCityInfo.name;//2级武清
                    break;
                case 3:
                    re = session.place.oneCityInfo.name + session.place.twoCityInfo.name + session.place.thisCityInfo.name;//2级武清
                    break;
                default:
                    re = '地盘网';
                    break;
            }
            return re;
        } catch (e) {
            return '地盘网';
        }
    };

    /**
     * 获取热门城市
     * selectHotCity
     * 16/3/18 */
    fun.selectHotCity = function (callback) {
        apiPost('selectHotCity', {}, function (doc) {
            callback(doc);
        }, function (err) {
            console.error(err);
        });
    };
})();


