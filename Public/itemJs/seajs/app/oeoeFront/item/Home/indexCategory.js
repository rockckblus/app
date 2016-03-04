/**
 * category 载入js
 * 15-6-26 */
define(function (require) {

    /**请求top angular控制器,切换城市，注册，发布信息按钮 Public 15-3-14 */
    require('seajs/app/oeoeFront/item/Home/block/diPanTop');

    /**请求category angular控制器,  不同模块调用不同 15-3-14 */
    require('seajs/app/oeoeFront/item/Home/block/dipanCategory');

});