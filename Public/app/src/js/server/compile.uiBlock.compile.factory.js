/**
 * compile.uiBlock.compile.factory.js
 * 命名注释：server简称_compile. 父模块 uiBlock . 功能_动态绑定html元素到angular. 类型_factory.js
 * 传入 需要append的id，html内容 ，scope
 * Created by rockblus on 16-2-13.
 */

(function () {
    'use strict';
    angular.module('dipan').factory('compile', compile);

    compile.$inject = ['$compile'];

    function compile($compile) {
        /**
         * 动态绑定html元素到angular
         * @param {需要compile的 外层domid} parentDomId
         * @param {需要compile的domId}domId
         * @param {$scope}scope
         * @param {是否动态增加到外层domid里面,而不是清空 ,可选,此时domId 为 html字符串}scope
         * @private
         */
        function _compile(parentDomId, domId, scope, add) {
            try {
                var parentDom = document.getElementById(parentDomId);
                parentDom = angular.element(parentDom);//外层angualr element

                var reBindContent = document.getElementById(domId);
                reBindContent = angular.element(reBindContent);//需要动态绑定的 angular element

                var htmlStr = reBindContent[0];

                if (add) {//如果是 直接传来的 htmlSTr 而且 是追加的方式
                    htmlStr = domId;
                } else {
                    reBindContent.html('');
                }
                var el = $compile(htmlStr)(scope);
                parentDom.append(el);
            } catch (e) {
                console.error(e);
            }
        }

        return _compile;
    }
})();

