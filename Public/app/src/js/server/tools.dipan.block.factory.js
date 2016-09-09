/**
 *tools.dipan.block.factory.js
 * 命名注释：server简称_tools. 父模块 dipan . 功能_tools 相关服务:otherDiv. 类型_factory.js
 * otherDiv
 * Created by rockblus on 16-2-5.
 */

(function (window) {
    'use strict';
    angular.module('dipan').factory('tools', tools);

    tools.$inject = ['$http', '$rootScope', '$q', 'ui'];

    function tools($http, $rootScope, $q, ui) {

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

            /**
             * 返回一个 随机数
             * @param {位数}n
             * @returns {string}
             */
            getRoundCode: getRoundCode
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
            console.log('data',data);
            //data.queryNode = true
            if (!isNoLoading) {
                $rootScope.$broadcast('openLoading'); //http请求前 显示loading
            }
            var endData = {};
            for (var vo in data) {
                endData[vo] = data[vo];
            }
            //$http({
            //    url: getMoreUrl,
            //    method: "POST",
            //    data: endData,
            //    timeout: 10000 //超时设置
            //}).success(function (response) {
            //    $rootScope.$broadcast('closeLoading');//http请求成功 关闭loading
            //    re(response);
            //}).error(function (data, status, headers, config, error) {
            //    if (errRe) {//如果有回调方法,回调错误
            //        $rootScope.$broadcast('closeLoading');//http请求成功 关闭loading
            //        errRe(error);
            //    } else {
            //        $rootScope.$broadcast('closeLoading');//http请求成功 关闭loading
            //        toolsAlert('http错误:' + error);
            //    }
            //    return false;
            //});


            function _post(url, postData) {
                var defer = $q.defer();
                $http({
                    url: url,
                    method: 'POST',
                    data: postData,
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
            if (obj) {
                var objStr = JSON.parse(obj);
                return objStr;
            }
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

        return re;
    }
})(window);