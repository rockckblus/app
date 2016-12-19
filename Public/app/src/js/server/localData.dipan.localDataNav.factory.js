/**
 * localData.dipan.localDataNav.factory.js
 * 命名注释：server简称_localData. 父模块 dipan . 功能_本地 & app 默认数据. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('localData', localData);

    localData.$inject = ['$location', 'tools', '$rootScope', 'config', '$filter', '$q', '$timeout', 'header'];

    var location;
    var thisLocalData = {};
    var thisTools = {};
    var thisRootScope;
    var _config;
    var _filter;
    var q;
    var thisTimeout;
    var thisHeader;

    function localData($location, tools, $rootScope, config, $filter, $q, $timeout, header) {
        thisRootScope = $rootScope;
        location = $location;
        thisLocalData.trueShowHedaer = _trueShowHedaer;//判断当前页面是否需要显示 header
        thisLocalData.tab = _tab; //根据 url 遍历 给tab数据
        thisLocalData.shaiXuan = _shaiXuan; //根据 url 遍历 筛选条件
        thisLocalData.showTab = _showTab; //遍历url 返回true false ,控制是否显示tab
        thisLocalData.getTitle = _getTitle; //getTitle
        // thisLocalData.giveRoundCode = _giveRoundCode; // 给一个8位随机码,验证短信用
        thisLocalData.gps = {
            isHaveGps: false, //判断
        };
        thisLocalData.loginImg = getLoginImg(); //登录页面bset64 图标
        thisLocalData._init = function () {
            thisTools = tools;
            thisHeader = header;
            _config = config;
            _filter = $filter;
            q = $q;
            thisTimeout = $timeout;
            // thisLocalData.giveRoundCode();
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
                return __getUserTitle();
            // case '/home':
            //     return _filter('toHtml')('<i class="fa fa-search linkMouse mui-btn qiaokeli" id="searchIconH1"></i>');
            case '/editMemberInfo':
                return _filter('toHtml')('资料编辑');
            // case '/star':
            //     return _filter('toHtml')('标记');
            case '/login':
                return _filter('toHtml')('兼职鼠');
            case '/myNews':
                return _filter('toHtml')('联系');
            case '/orderFrom':
                return _filter('toHtml')('订单');
            case '/orderFromContent':
                return _filter('toHtml')('订单详情');
            case '/killContent':
                return _filter('toHtml')('技能详情');
            case '/subkill':
                return _filter('toHtml')('发布技能');
            case '/subneed':
                return _filter('toHtml')('发布需求');

            default:
                return '';
        }

        /**
         * 获取用户手机,头像,昵称
         * 有昵称显示昵称,没有显示手机号
         * @private
         */
        function __getUserTitle() {
            var userData = thisTools.getLocalStorageObj('userData');
            try {
                var reStr = '';
                if (!userData.headerImg) {
                    userData.headerImg = thisHeader.defaultHeader;
                }
                if (userData.headerImg) {
                    reStr += '<img class="hImg" style="margin-top: 13px" src="' + userData.headerImg + '" /> &nbsp;';
                }
                if (userData.name) {
                    userData.mt = userData.name;
                }
                if (userData.mt) {
                    reStr += '<span style="font-size: 0.8rem;color: #777">' + userData.mt + '</span>';
                }
                return _filter('toHtml')(reStr);
            } catch (e) {
                return '我的';
            }
        }
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
            case '/need':
                return true;
            // case '/star':
            //     return true;
            // case '/memberIndex':
            //     return true;
            default:
                return false;
        }
    }

    /**
     * 遍历url 给筛选数据
     * @param url
     * @returns {boolean}
     * @private
     */
    function _shaiXuan(url) {
        switch (url) {
            case '/home':
                return [
                    [{
                        id: 'homeShaiXuanCity',
                        name: '全国',
                        type: 'six',
                    }],
                    [{
                        id: 'homeShaiXuanThree1',
                        name: '男',
                        type: 'more',
                    },],
                    [{
                        id: 'homeShaiXuanThree2',
                        name: '女',
                        type: 'more',
                    },

                    ],
                    [{
                        id: 'homeShaiXuanOne3',
                        name: '人气',
                        type: 'two',
                    },],
                    // [{
                    //     id: 'homeShaiXuanTwo4',
                    //     name: '活跃',
                    //     type: 'two',
                    // },],
                ];
            case '/need':
                return [
                    [{
                        id: 'needShaiXuanThree1',
                        name: '全国',
                        type: 'six',
                    }],
                    [{
                        id: 'needShaiXuanTwo2',
                        name: '最新',
                        type: 'four',
                    },],
                    [{
                        id: 'needShaiXuanOne2',
                        name: '价格',
                        type: 'four',
                    },],
                    [{
                        id: 'needShaiXuanTwo3',
                        name: '线上服务',
                        type: 'five',
                    },],
                ];
            default:
                return false;
        }
    }

    /**
     * trueShowHedaer 判断当前页面是否需要显示 heade
     */
    function _trueShowHedaer(name) {
        switch (name) {
            // case 'home':
            //     return true;
            case 'memberIndex':
                return true;
            case 'myNews':
                return true;
            case 'orderFrom':
                return true;
            case 'orderFromContent':
                return true;
            case 'editMemberInfo':
                return true;
            case 'subkill':
                return true;
            case 'subneed':
                return true;
            case 'killContent':
                return true;
            default :
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
                    colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: _objDefaulOne.thisItem, //高亮
                    name: '技能', //名称
                    route: 'hrefTabHome', //routeUrl
                    stateName: 'home', //routeUrl
                }, {
                    colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '需求', //名称
                    route: 'hrefTabNeed', //routeUrl
                    stateName: 'need', //routeUrl
                },
                    //     {
                    //     colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    //     thisItem: false, //高亮
                    //     name: '<i class="fa fa-star-o"></i>', //名称
                    //     route: 'hrefTabStar', //routeUrl
                    //     stateName: 'star', //routeUrl
                    // }
                ];
                return _obj;
            case '/need':
                _obj = [{
                    colNumCss: 'twoTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '技能', //名称
                    route: 'hrefTabHome', //routeUrl
                    stateName: 'home', //routeUrl
                }, {
                    colNumCss: 'twoTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: 'thisItem', //高亮
                    name: '需求', //名称
                    route: 'hrefTabNeed', //routeUrl
                    stateName: 'need', //routeUrl
                },
                    //     {
                    //     colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    //     thisItem: false, //高亮
                    //     name: '<i class="fa fa-star-o"></i>', //名称
                    //     route: 'hrefTabStar', //routeUrl
                    //     stateName: 'star', //routeUrl
                    // }
                ];
                return _obj;
            // case '/star':
            //     _obj = [{
            //         colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            //         thisItem: false, //高亮
            //         name: '技能', //名称
            //         route: 'hrefTabHome', //routeUrl
            //         stateName: 'home', //routeUrl
            //     }, {
            //         colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            //         thisItem: false, //高亮
            //         name: '需求', //名称
            //         route: 'hrefTabNeed', //routeUrl
            //         stateName: 'need', //routeUrl
            //     }, {
            //         colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            //         thisItem: 'thisItem', //高亮
            //         name: '<i class="fa fa-star-o"></i>', //名称
            //         route: 'hrefTabStar', //routeUrl
            //         stateName: 'star', //routeUrl
            //     }];
            //     return _obj;

            // case '/memberIndex':
            //     _obj = [{
            //         colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            //         thisItem: false, //高亮
            //         name: '粉丝 ' + _getUserData('fensi'), //名称
            //         route: 'hrefTabFensi', //routeUrl
            //         stateName: 'fensi', //routeUrl
            //     }, {
            //         colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            //         thisItem: false, //高亮
            //         name: '关注 ' + _getUserData('guanzhu'), //名称
            //         route: 'hrefTabGuanZhu', //routeUrl
            //         stateName: 'guanzhu', //routeUrl
            //     }, {
            //         colNumCss: 'threeTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            //         thisItem: false, //高亮
            //         name: '联系 ' + _getUserData('lianxi'), //名称
            //         route: 'hrefTabLianXi', //routeUrl
            //         stateName: 'lianxi', //routeUrl
            //     },];
            //
            //
            //     return _obj;
            // case '/login':
            //     _obj = [{
            //         colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            //         thisItem: _objDefaulOne.thisItem, //高亮
            //         name: '登录', //名称
            //         route: 'login' //routeUrl
            //     }, {
            //         colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            //         thisItem: false, //高亮
            //         name: '设置', //名称
            //         route: 'memberIndex' //routeUrl
            //     },];
            //     return _obj;
            default:
                return [];
        }


        /**
         * 获取用户 粉丝 关注 联系
         * @param {string 字段名称} field
         * @return {string} 对应的 统计数量
         * @private
         */
        function _getUserData(field) {
            var userData = thisTools.getLocalStorageObj('userData');
            if (userData[field]) {
                var endStr = '<i style="font-size: 12px">' + userData[field] + '</i>';
                if (userData[field + '_height']) {
                    endStr += '<i class="fa fa-ellipsis-h fa-2x" style="width: 7px;overflow-x: hidden;color:#bd0000;position:absolute;margin-left:-1px;margin-top:-7px;"></i>';
                }
                return endStr;

            } else {
                return '';
            }
        }


    }

    /**
     * get gps 获取gps 或者 ip定位 拿到 gps(web), 给到 gpsObj
     * 广播全局 gps 事件.
     */
    function getGps() {
        thisTools.trueWeb(_web, _app); //判断手机 或者 app 来判断 定位 ,获取地理位置数据

        /*************************
         * todo
         * //获取 ip地址,去反查地址数据
         * 16/8/19 上午7:43 ByRockBlus
         *************************/
        function _web() {

            //todo 由于被墙 无法正常使用
            // if (window.navigator.geolocation) {
            //     console.log('1111',111);
            //     var options = {
            //         enableHighAccuracy: true,
            //     };
            //     window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
            //
            // } else {
            //     alert("浏览器不支持html5来获取地理位置信息");
            // }
            //
            // function handleSuccess(re) {
            //     console.log('re', re);
            // }
            //
            // function handleError(err) {
            //     console.log('re2', err);
            // }
            //
            // return;

            var url = _config.host.phpHost + '/Api/Jsonp/getIP/from/web'; //获取浏览器ip

            thisTools.getJsp(url, true).then(_s1).then(_s2).then(_s3, _err);

            /**
             * 获取浏览器ip re.ip
             * @private
             */
            function _s1(re1) {
                re1.ip = '123.150.38.2'; //todo 测试用

                var defered = q.defer();
                var url1 = _config.host.nodeHost + '/soso/sosoApi/ipToCity?ip=' + re1.ip; //获取城市
                thisTools.getJsp(url1, true).then(function (re2) {
                    defered.resolve(re2);
                }, function (err) {
                    defered.reject('_s1');
                });

                return defered.promise;
            }

            function _s2(re2) {
                var defered = q.defer();
                var city = JSON.parse(JSON.parse(re2));
                city = city.city;
                var url2 = _config.host.nodeHost + '/soso/sosoApi/strToGps?str=' + city; //获取城市ip
                thisTools.getJsp(url2, true).then(function (re3) {
                    defered.resolve(re3);
                }, function (err) {
                    defered.reject('_s2');
                });
                return defered.promise;
            }

            function _s3(re3) {
                var reEdn = JSON.parse(JSON.parse(re3));
                if (reEdn.status == '1') {
                    var gps = reEdn.geocodes[0].location;
                    gps = gps.split(',');
                    var gpsObj = {
                        lat: gps[1] * 1,
                        lng: gps[0] * 1,
                    };

                    var cityObj = {
                        city: reEdn.geocodes[0].city,
                        cityCode: reEdn.geocodes[0].citycode
                    };

                    writeDbGps(gpsObj, cityObj);//写入缓存
                }
            }

            function _err(e) {
                console.error('error', e);
            }


        }

        /*************************
         *获取手机导航gps,去soso拿地址数据
         * 16/8/19 上午7:43 ByRockBlus
         *************************/
        function _app() {
            var gpsObj = {};
            var city = {};

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
                city.city = p.address.city;
                city.cityCode = p.address.cityCode;
                writeDbGps(gpsObj, city);//写入本地数据库
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

        /**
         * 写入gps数据到 本地数据库
         * 传gps坐标,城市名称
         * gpsObj{
          *  lat:'', 存monogo 时候 用 Double,建立gps 2d 索引
          *  lng:''
         * }
         * city{
         *  cityCode:'',存mongo 用 str
         *  city:'天津市'
         * {
         */
        function writeDbGps(gpsObj, city) {
            var area = {
                gpsObj: gpsObj,
                city: city
            };
            thisTools.saveLocalStorageObj('area', area);
            thisTools.saveLocalStorageObj('areaGps', area);
            thisTimeout(function () {
                thisRootScope.$broadcast('changeArea');//广播变换地理位置事件
            }, 400);
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
     * login 页面图标
     */
    function getLoginImg() {
        var img = 'data:image/png;base64,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';
        return img;
    }
})();