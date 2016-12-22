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
    angular.module('dipan', ['pasvaz.bindonce', 'ui.router', 'block', 'from']).config(uiRouter);

    /**
     * config 定义 全局变量 ,并且保留到window全局变量
     * window.config
     * 16/3/8 */
    angular.module('dipan').factory('config', reConfig);
    function reConfig() {
        return config();
    }

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

            //发布技能
            .state('subkill', {
                url: '/subkill',
                templateUrl: window.tplPath + 'route/from/subkill.html'
            })

            //发布需求
            .state('subneed', {
                url: '/subneed',
                templateUrl: window.tplPath + 'route/from/subneed.html'
            })

            //技能详情
            .state('killContent', {
                url: '/killContent/:jiNengId',
                templateUrl: window.tplPath + 'route/member/killContent.html'
            })

            //需求详情
            .state('needContent', {
                url: '/needContent/:needId',
                templateUrl: window.tplPath + 'route/member/needContent.html'
            })

            //我的消息
            .state('myNews', {
                url: '/myNews',
                templateUrl: window.tplPath + 'route/member/myNews.html'
            })

            //订单列表
            .state('orderFrom', {
                url: '/orderFrom',
                templateUrl: window.tplPath + 'route/member/orderFrom.html'
            })

            //订单详细页面 type 技能方进入,可接单(show) 自己方进入,可选单(select)
            .state('orderFromContent', {
                url: '/orderFromContent/:type/:orderId',
                templateUrl: window.tplPath + 'route/member/orderFromContent.html'
            })

            //memberIndex 我的 member
            .state('memberIndex', {
                url: '/memberIndex',
                templateUrl: window.tplPath + 'route/member/memberIndex.html'
            })

            //member 资料编辑
            .state('editMemberInfo', {
                url: '/editMemberInfo',
                templateUrl: window.tplPath + 'route/member/memberInfo.html'
            })

            //member 退出登录
            .state('loginOut', {
                url: '/loginOut',
                templateUrl: window.tplPath + 'route/member/loginOut.html'
            })

            //member 登录
            .state('login', {
                url: '/login',
                templateUrl: window.tplPath + 'route/login.html'
            });

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
                nodeHost: returnIp() + ':3082',//nodejsApi hostUrl
                nodeHostTest: returnIp() + ':8878',//nodejsApi 模拟Api

                phpHost: returnIp() + ':8080',//php host
                phpHostTest: returnIp() + ':8889',//php host模拟Api

                appPath: returnIp() + ':8080/Public/App/',//app 静态路径

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
                    userData: 'userData',//用户数据
                    clickShaiXuan: 'clickShaiXuan',//筛选点击id数组
                    area: 'area',//gps 坐标信息,城市名称,邮编
                    areaGps: 'areaGps',//gps 坐标信息,城市名称,邮编,此处是 第一次运行,手机定位成功的时候 记录的精确位置信息
                    searchKey: 'searchKey',//搜索时候存储的关键词,返回homeList数据时候就清空此字段
                    searchCity: 'searchCity',//搜索时候选择的城市字段,如果有城市就有城市的搜索条件,如果没有 或者 附近,就是全国,按照gpsObj传来的数据 去按照定位距离搜索,
                },
                version: {
                    //版本
                    key: 'version',//localStroe key
                },
                form: {
                    //表单单相关
                    killRoundId: 'killRoundId',//随机技能表单id
                    needRoundId: 'needRoundId',//随机技能表单id
                    killContentRoundId: 'killContentRoundId',//生成随机技能详情表单id,如果点击下单,就用这个id作为 needRoundId(需求订单随机id),去生成需求订单,
                    radio1: 'radio1',//技能价格单位 default:1次
                    radio2: 'radio2',//技能服务方式 default:不限
                    radio3: 'radio3',//会员补充资料,男,女 default:女
                    radio4: 'radio4',//会员补充资料,年龄 default:16~24
                }

            },

            //系统配置
            system: {
                timeoutUpData: 10000,//启动app之后 检查升级的 超时时间 单位:毫秒
            }
        };

        //根据web,手机 配置不同ip地址 //
        function returnIp() {

            var reUrl;

            /*************************
             * function trueWeb(web,app) 判断手机,还是 wap,回调函数
             * 16/8/19 上午7:32 ByRockBlus
             *************************/
            function trueWeb(web, app) {
                if (window.trueWeb()) {
                    web();
                } else {
                    app();
                }
            }

            trueWeb(function () {//web
                // return 'http://www.dipan.so';// 生产
                // reUrl = 'http://169.254.210.14';//dev
                reUrl = 'http://127.0.0.1';//dev
            }, function () {//app
                if (mui.os.android) {
                    reUrl = 'http://192.168.0.25';//dev
                    // reUrl = 'http://192.168.18.9';//dev
                } else {
                    // reUrl = 'http://192.168.0.50';//dev ipad
                    reUrl = 'http://127.0.0.1';//dev ios模拟器
                }
            });

            return reUrl;
        }


    }


})(window, document);
