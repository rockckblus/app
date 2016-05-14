/**
 1.启动angular

 2.声明总module，注入子module

 ---- [pasvaz.bindonce', 'ui.router','uiBlock.dipan.uiGroup.module'];

 ---- [单次绑定model,ui路由module,自定义ui碎片组模型]

 3.config 总模型 ：修改post传值为标准格式

 4.config 总模型 ： 使angular兼容ie7

 5.config 总模型 ：配置路由信息*
 * */
(function (window, document) {
    'use strict';

    /** 启动angular  */
    angular.element(document).ready(function () {
        angular.bootstrap(window.document, ["dipan"]);
    });

    /**
     * 声明module
     *
     * 此处是hackpost 到 node 转 对象格式问题, 如果是 请求node ,post的 需要传入 queryType = true; todo 默认不hackpost格式
     * 16/2/1 */
    //angular.module('dipan', ['pasvaz.bindonce', 'ui.router', 'uiBlock.dipan.uiGroup.module'], hackPost).config(uiRouter).config(secProvider);
    angular.module('dipan', ['pasvaz.bindonce', 'ui.router', 'uiBlock.dipan.uiGroup.module']).config(uiRouter).config(secProvider);


    /**
     * config 定义 全局变量
     * 16/3/8 */
    angular.module('dipan').factory('config', function () {
        return config();
    });

    /**
     * 手动注入
     * 16/2/1 */
    hackPost.$inject = ['$httpProvider'];
    secProvider.$inject = ['$sceProvider'];
    uiRouter.$inject = ['$stateProvider', '$urlRouterProvider'];


    /** 路由配置  */
    function uiRouter($stateProvider, $urlRouterProvider) {
        var state1Obj = {
            url: '/state1',
            template: '<div>hhhhh</div>'
        };
        var state2Obj = {
            url: '/state2',
            templateUrl: 'Public/resCreate/html/src/public/test.directive2.html'
        };


        $urlRouterProvider.when('', "/state1");
        $stateProvider.state('state1', state1Obj)
            .state('state2', state2Obj);
    }

    /**
     * 修改post传值为标准格式
     * */
    function hackPost($httpProvider) {

        /**
         * 如果传入的 queryType 包含 node,就最后 还原 $httpProvider post 格式,否则 被认为是 php请求,格式化 为 php的数组post格式
         * 16/3/14 */
        var _oldHttpProvider = $httpProvider;

        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            //return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest todo 返回的 空对象
        $httpProvider.defaults.transformRequest = [function (data) {
            if (data && data.queryNode) {
                return _oldHttpProvider;
            } else {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }
        }];
    }

    /**
     * 使angular兼容ie7
     * 16/2/1 */
    function secProvider($sceProvider) {
        $sceProvider.enabled(false);
    }


    /**
     * 定义系统常量config
     * 16/3/8 */

    function config() {
        return {
            host: {//host 配置
                nodeHost: 'http://169.254.67.106:3008'//nodejsApi hostUrl
            }
        };
    }


})(window, document);
