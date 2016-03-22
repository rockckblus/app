/**
 * pois.admin.inputPois.factory.js
 * 命名注释：server简称_pois. 父模块 admin . 功能_三级周边数组入库 类型_factory.js
 *
 * 0.声明 一个 采集 数值,循环采集多少租pois ,
 * 1.查出 所有 city 3级表,限制到 1条
 * 3.查出的 3级,拿到 城市 1级,2级
 * 4.组合成 字符串,去soso api 拿周边pois 信息
 * 5.遍历 周边 信息, 去php api 取拼音
 * 6.组合字段入库,
 * 7.去临时统计表 加 1
 *
 */

(function () {
    'use strict';

    angular.module('admin').factory('pois', pois);
    pois.$inject = ['api'];

    function pois(api) {
        var poisRe;

        api.
            poisRe = 1;
        return poisRe;
    }

})();