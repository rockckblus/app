/**
 *tools.dipan.block.factory.js
 * 命名注释：server简称_tools. 父模块 dipan . 功能_tools 相关服务:otherDiv. 类型_factory.js
 * otherDiv
 * Created by rockblus on 16-2-5.
 */

(function (window) {
    'use strict';
    angular.module('dipan').factory('tools', tools);

    tools.$inject = ['$http', '$rootScope', '$q', 'ui', '$filter', 'config'];

    function tools($http, $rootScope, $q, ui, $filter, config) {

        var re;

        re = {
            /**
             * alertDiv.alertInfo 在模板挂载了一个 点击事件传来的 attr。可以带到 alertInfo 的模板中，
             * 此处是返回这个 otherDiv 的module json串转换的对象
             * 16/2/18 */
            otherData: otherData,

            /********************
             * 验证相关
             * 16/2/18 ************************/
            /** 验证空 15-3-22 */
            isEmpty: isEmpty,

            /** 验证手机号 15-3-22 */
            checkMobile: checkMobile,

            /**
             * 删除数组中的 第几个元素
             * 16/2/18 */
            arrDel: arrDel,

            /**
             * postJsp
             * 16/2/19 */
            getJsp: getJsp,

            /**
             * postJsp
             * 16/2/19 */
            postJsp: postJsp,

            /**
             * 判断是否 function
             * 16/2/19 */
            isFunction: isFunction,

            /*************************
             * alert 判断app 还是 html 显示不同的 弹出框,手机用原生弹窗
             * 16/8/15 下午3:18 ByRockBlus
             *************************/
            alert: toolsAlert,

            /*************************
             * function trueWeb(web,app) 判断手机,还是 wap,回调函数
             * 16/8/19 上午7:32 ByRockBlus
             *************************/
            trueWeb: trueWeb,

            /**
             * 根据名称 存储obj
             * @param localName
             * @param obj
             */
            saveLocalStorageObj: saveLocalStorageObj,

            /**
             * 根据名称 getobj
             * @param localName
             * @param obj
             */
            getLocalStorageObj: getLocalStorageObj,

            /**************************
             *  遍历所有localStorage,返回一个 键名数组对象
             * 16/9/17 上午10:40 ByRockBlus
             **************************/
            getAllCatchListName: getAllCatchListName,

            /**
             * 返回一个 随机数
             * @param {位数}n
             * @returns {string}
             */
            getRoundCode: getRoundCode,

            /**
             * 获取当天 时间字符串 标示 2016_09_18
             */
            getToday: getToday,

            /**
             * 解析url
             */
            parseUrl: parseUrl,

        };

        /**
         * 具体fun *****************************
         * 16/2/18 */

        /**
         * alertDiv.alertInfo 在模板挂载了一个 点击事件传来的 attr。可以带到 alertInfo 的模板中，
         * 此处是回调这个 otherDiv 的module json串转换的对象
         * 16/2/18 */
        function otherData(fun) {
            var reContent = document.getElementById('otherData');
            if (reContent) {
                reContent = angular.element(reContent);
                setTimeout(function () {
                    reContent = reContent.attr('data');
                    reContent = JSON.parse(reContent);
                    fun(reContent);
                }, 0);
            }
        }

        /********************
         * 验证相关
         * 16/2/18 ************************/
        /** 验证空 15-3-22 */
        function isEmpty(t) {
            return t ? true : false;
        }

        /** 验证手机号 15-3-22 */
        function checkMobile(sMobile) {
            if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(sMobile))) {
                return false;
            } else {
                return true;
            }
        }

        /**
         * 删除数组中的元素,传入数组，和第几个
         * @param {Array} arr
         * @param {Number} num
         */
        function arrDel(arr, num) {
            if (!Array.prototype.remove) {
                Array.prototype.remove = function (from, to) {
                    var rest = this.slice((to || from) + 1 || this.length);
                    this.length = from < 0 ? this.length + from : from;
                    return this.push.apply(this, rest);
                };
            }
            arr.remove(num);
            delete Array.prototype.remove;
        }

        /**
         * angular get
         * 传 url
         * data对象
         * isNoLoading (可选 true:不显示loading动画)
         * 15-3-27 */
        function getJsp(getMoreUrl, isNoLoading) {
            if (!isNoLoading) {
                $rootScope.$broadcast('openLoading'); //http请求前 显示loading
            }


            function _get(url) {
                var defer = $q.defer();
                $http({
                    url: url,
                    method: 'GET',
                    timeout: 10000
                })
                    .success(function (doc) {
                        if (!isNoLoading) {
                            $rootScope.$broadcast('closeLoading'); //http请求成功 关闭loading
                        }
                        defer.resolve(doc);
                    }).error(function (err) {
                    if (!isNoLoading) {
                        $rootScope.$broadcast('closeLoading'); //http请求成功 关闭loading
                    }
                    defer.reject(err);
                    re.alert({
                        title: '网络请求失败',
                        content: '请检查网络设置'
                    });
                });
                return defer.promise;
            }

            return _get(getMoreUrl);

        }

        /**
         * angular post
         * 传 url
         * data对象
         * isNoLoading (可选 true:不显示loading动画)
         * 15-3-27 */
        function postJsp(getMoreUrl, data, isNoLoading) {
            var oldGetMoreUrl = getMoreUrl;//记录原始地址

            //先解析url , 转换到 测试 url
            if (config.debugApi) {
                var urlObj = parseUrl(getMoreUrl);
                var urlHostStr = 'http://' + urlObj.host + ':' + urlObj.port;

                if (urlHostStr == config.host.nodeHost) {
                    getMoreUrl = config.host.nodeHostTest + urlObj.path;
                } else if (urlHostStr == config.host.phpHost) {
                    getMoreUrl = config.host.phpHostTest + urlObj.path + urlObj.query;
                }
            }

            if (!isNoLoading) {
                $rootScope.$broadcast('openLoading'); //http请求前 显示loading
            }
            var endData = {};
            for (var vo in data) {
                endData[vo] = data[vo];
            }


            function _post(url, postData, isComplete) {
                var defer = $q.defer();
                $http({
                    url: url,
                    method: 'POST',
                    data: postData,
                    timeout: 10000
                })
                    .success(function (doc) {

                        /**
                         * 判断模拟模式如果开启,去判断 当前api是模拟还是已经 完成,
                         * 如果完成就调用完成的 接口,再从新请求真实数据,
                         * 如果没完成,就直接返回模拟数据
                         * @param doc
                         * @param _success
                         * @private
                         */
                        _editDoc(_success);
                        function _editDoc(_success) {
                            if (config.debugApi && !isComplete) {//开启调试模式,判断是否完成api功能
                                if (doc.complete) {//返回的complete 已经完成,就去真实地址取数据
                                    _post(oldGetMoreUrl, postData, true);
                                } else {
                                    _success();
                                }
                            } else {
                                _success();
                            }
                        }

                        function _success() {
                            if (!isNoLoading) {
                                $rootScope.$broadcast('closeLoading'); //http请求成功 关闭loading
                            }
                            defer.resolve(doc);
                        }
                    }).error(function (err) {
                    if (!isNoLoading) {
                        $rootScope.$broadcast('closeLoading'); //http请求成功 关闭loading
                    }
                    defer.reject(err);
                    re.alert({
                        title: '网络请求失败',
                        content: '请检查网络设置'
                    });
                });
                return defer.promise;
            }

            return _post(getMoreUrl, endData);

        }

        /**
         * 判断是 function
         * @param {Function} fn
         * @returns {boolean}
         */
        function isFunction(fn) {
            return Object.prototype.toString.call(fn) === '[object Function]';
        }

        /*************************
         * alert 判断app 还是 html 显示不同的 弹出框,手机用原生弹窗
         * 16/8/15 下午3:18 ByRockBlus
         *************************/
        function toolsAlert(msgObj) {
            ui.alert(msgObj);
        }

        /*************************
         * function trueWeb(web,app) 判断手机,还是 wap,回调函数
         * 16/8/19 上午7:32 ByRockBlus
         *************************/
        function trueWeb(web, app) {
            setTimeout(function () {
                if (window.trueWeb()) {
                    web();
                } else {
                    app();
                }
            }, 0);

        }

        /**
         * 根据名称 存储obj
         * @param localName
         * @param obj
         */
        function saveLocalStorageObj(localName, obj) {
            localStorage.removeItem(localName);
            setTimeout(function () {
                var objStr = JSON.stringify(obj);
                localStorage.setItem(localName, objStr);
            }, 200);
        }

        /**
         * 根据名称 getObj
         * @param localName
         * @return obj
         */
        function getLocalStorageObj(localName) {
            var obj = localStorage.getItem(localName);
            if (obj !== 'undefined') {
                var objStr = JSON.parse(obj);
                return objStr;
            }
        }

        /**
         * 遍历所有localStorage,返回一个 键名数组对象
         * @returns {Array} ['key1','key2']
         */
        function getAllCatchListName() {
            var nameArr = [];
            angular.forEach(localStorage, function (k, v) {
                nameArr.push(v);
            });
            return nameArr;
        }

        /**
         * 返回一个 随机数
         * @param {位数}n
         * @returns {string}
         */
        function getRoundCode(n) {
            var rnd = "";
            for (var i = 0; i < n; i++) {
                rnd += Math.floor(Math.random() * 10);
            }
            return rnd;
        }

        /**
         * 获取当天 时间字符串 标示 2016_09_18
         * @return {string} 2016_09_18
         */
        function getToday() {
            var today = new Date();
            return $filter('date')(today, 'yyyy_MM_dd');//当天的 日期 2016_09_18
        }

        /**
         *@param {string} url 完整的URL地址
         *@returns {object} 自定义的对象
         *@description 用法示例：var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
         *
         * myURL.file='index.html'

         myURL.hash= 'top'

         myURL.host= 'abc.com'

         myURL.query= '?id=255&m=hello'

         myURL.params= Object = { id: 255, m: hello }

         myURL.path= '/dir/index.html'

         myURL.port= '8080'

         */
        function parseUrl(url) {
            var a = document.createElement('a');
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':', ''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function () {
                    var ret = {},
                        seg = a.search.replace(/^\?/, '').split('&'),
                        len = seg.length, i = 0, s;
                    for (; i < len; i++) {
                        if (!seg[i]) {
                            continue;
                        }
                        s = seg[i].split('=');
                        ret[s[0]] = s[1];
                    }
                    return ret;
                })(),
                hash: a.hash.replace('#', ''),
                path: a.pathname.replace(/^([^\/])/, '/$1'),
            };
        }


        return re;
    }
})(window);