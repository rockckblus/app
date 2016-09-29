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

    document.addEventListener('plusready', function () {
        window.config = config();
    });

    /**
     * 声明module
     *
     * 此处是hackpost 到 node 转 对象格式问题, 如果是 请求node ,post的 需要传入 queryType = true; todo 默认不hackpost格式
     * 16/2/1 */
    //angular.module('dipan', ['pasvaz.bindonce', 'ui.router', 'block'], hackPost).config(uiRouter);
    angular.module('dipan', ['pasvaz.bindonce', 'ui.router', 'block']).config(uiRouter);

    /**
     * config 定义 全局变量 ,并且保留到window全局变量
     * window.config
     * 16/3/8 */
    angular.module('dipan').factory('config', function () {
        return config();
    });

    /**
     * 手动注入
     * 16/2/1 */
    hackPost.$inject = ['$httpProvider'];
    uiRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** 路由配置  */
    function uiRouter($stateProvider, $urlRouterProvider) {
        //首页 跳转
        $urlRouterProvider.when('', "/home");

        $stateProvider
        //首页 供
            .state('home', {
                url: '/home',
                templateUrl: window.tplPath + 'route/home.html'
            })

            //需
            .state('need', {
                url: '/need',
                templateUrl: window.tplPath + 'route/home.html'
            })

            //标记
            .state('star', {
                url: '/star',
                templateUrl: window.tplPath + 'route/home.html'
            })

            //block 地区选择页面
            .state('area', {
                url: '/area',
                templateUrl: window.tplPath + 'route/block/area.html'
            })

            //search 页面
            .state('search', {
                url: '/search',
                templateUrl: window.tplPath + 'route/block/search.html'
            })

            //memberIndex 我的 member
            .state('memberIndex', {
                url: '/memberIndex',
                templateUrl: window.tplPath + 'route/member/memberIndex.html'
            })

            //member 资料编辑
            .state('member/memberInfo', {
                url: 'member/memberInfo',
                templateUrl: window.tplPath + 'route/member/memberInfo.html'
            })

            //member 退出登录
            .state('loginOut', {
                url: '/loginOut',
                templateUrl: window.tplPath + 'route/member/loginOut.html'
            })

            //member 测试snsArt 添加
            .state('member_addArticle', {
                url: '/member_addArticle',
                templateUrl: window.tplPath + 'route/member/addArticle.html'
            })

            //member 登录
            .state('login', {
                url: '/login',
                templateUrl: window.tplPath + 'route/login.html'
            })
        ;
    }

    /**
     * 修改post传值为标准格式
     * */
    function hackPost($httpProvider) {

        /**
         * 如果传入的 queryType 包含 node,就最后 还原 $httpProvider post 格式,否则 被认为是 php请求,格式化 为 php的数组post格式
         * 16/3/14 */
        var _oldHttpProvider = $httpProvider;
        var httpProvider = $httpProvider;

        // Use x-www-form-urlencoded Content-Type
        httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

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
        httpProvider.defaults.transformRequest = [function (data) {
            if (data && data.queryNode) {
                return data;
            } else {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }
        }];
    }

    /**
     * 定义系统常量config
     * 16/3/8 */

    function config() {
        return {
            //是否开启模拟调试Api
            debugApi: true,

            //版本号默认设置
            version: {
                default: '2.0',//当前默认版本号,第一次安装,写入local用
            },

            //host 配置
            host: {

                // nodeHost: 'http://dipan.so:3082',//nodejsApi hostUrl
                nodeHost: 'http://192.168.0.7:3082',//nodejsApi hostUrl
                nodeHostTest: 'http://192.168.0.7:8878',//nodejsApi 模拟Api

                // phpHost: 'http://dipan.so:8080',//php host
                phpHost: 'http://dipan.so:8080',//php host
                phpHostTest: 'http://192.168.0.7:8889',//php host模拟Api

                //appPath: 'http://dipan.so:8080/Public/App/'//app 静态路径
                appPath: 'http://192.168.0.7:8080/Public/App/'//app 静态路径
            },

            //localStroe 存储标示 name
            localSaveName: {
                downLoad: {
                    //下载相关
                    appJsPath: 'appJsPath',//app.js 更新后的下载存储路径
                    appCssPath: 'appCssPath',//app.css 更新后的下载存储路径
                    isFirstJs: 'isFirstJs',//是否第一次下载Js, 默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2
                    isFirstCss: 'isFirstCss',//是否第一次下载css, 默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2
                },
                system: {
                    //系统配置相关
                    trueUpdata: 'trueUpdata',//(0:自动升级，1.提示升级，2.永不升级)
                },
                user: {
                    //用户数据
                    roundCodeId: 'roundCodeId',//随机id,启动后生成
                    isLogin: 'isLogin',//判断登录
                    userData:'userData',//用户数据
                },
                version: {
                    //版本
                    key: 'version',//localStroe key
                },
            },

            //系统配置
            system: {
                timeoutUpData: 10000,//启动app之后 检查升级的 超时时间 单位:毫秒
            }
        };
    }


})(window, document);
