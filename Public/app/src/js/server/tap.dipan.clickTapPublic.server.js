/**
 * tap.dipan.clickTapPublic.server.js
 * 命名注释：directive简称_tap. 父模块_dipan . 功能_原生mui点击tap事件 bind id.
 * 取跳转值url  , 事件点击,tap ,写在 单独的页面里面,这里是导航路由跳转 , 带url 属性的 才生效
 * . 类型_directive .js
 * 使用 ：class='angular'
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';
    angular.module('dipan').factory('tap', tap);
    tap.$inject = ['$state', 'tools'];


    /**
     * angular 载入完成后。显示modle值
     * 15-12-26 */
    function tap($state, tools) {
        var re = {
            init: init
        };

        var ids = [
            'goHistory',//返回上一页
            'hrefArea',//地区选择
            'hrefSearch',//搜索
            'hrefHome',//主页 供
            'hrefTabHome',//主页 供
            'hrefTabNeed',//需
            'hrefMaster',//地主
            'hrefMember',//我的首页
            'hrefMemberAddArticle',//test添加文章
        ];

        var idsIsBind = [];//已经在服务绑定过的 id,就不去绑定了

        //排除 加入 绑定的 id
        var noIdIsBing = [
            'hrefTabHome',
            'hrefTabNeed',
            'hrefMemberAddArticle'
        ];

        function plus(callBack) {
            // H5 plus事件处理
            function plusReady() {
                if (!window.plus) {
                    return;
                }
                setTimeout(function () {
                    callBack();
                }, 0);

            }

            if (window.plus) {
                plusReady();
            } else {
                document.addEventListener("plusready", plusReady, false);
            }

        }

        function init() {

            tools.trueWeb(_call,
                function () {
                    plus(_call);
                });//判断手机网页 手机 绑定 tap 事件, 网页绑定 click事件

            function _call() {
                angular.forEach(ids, function (vo) {
                    var doc = _trueIsSetId(vo);
                    if (doc) {//判断id存在
                        var _doc = angular.element(doc);
                        var url = _doc.attr('url');
                        _goUrl(doc, url);
                    }
                });
            }
        }


        /**
         * 跳转url
         * @param {document}doc
         * @param {String}url
         * @private
         */
        function _goUrl(doc, url) {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
            });


            doc.addEventListener(type, function () {
                __saveScrollTop();
                if (url == 'goHistory') {//判断是 返回上页的点击事件
                    history.go(-1);
                } else {
                    $state.go(url);
                }
            });


            /**
             * 记录body滚动位置,对应url 去存储
             * @private
             */
            function __saveScrollTop() {
                var url = $state.current.name;
                var saveStr = url + '_scrollTop';
                var num = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                localStorage.removeItem(saveStr);
                localStorage.setItem(saveStr, num);
            }

        }


        /**
         * 判断id 是否存在,存在的话,返回 true
         * @param {传入id} id
         * @returns {document}
         * @private
         */
        function _trueIsSetId(id) {
            if (id) {
                if (idsIsBind.indexOf(id) == -1) {
                    var doc = document.getElementById(id);
                    if (doc) {
                        if (noIdIsBing.indexOf(id) == -1) {//排除 不绑定的 id
                            idsIsBind.push(id);
                        }
                        return doc;
                    }
                }
            }
        }

        return re;
    }


})();
