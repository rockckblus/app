/**
 * Created by apple on 14-11-29.
 * 公共UI
 */
define(function (require) {
    var g = {
        //顶部导航点击焦点
        foucsHeaderLi: function (t) {

          

            t.parent('li').parent('div').find('li').removeClass('pure-menu-selected hackUlLifocus');
            t.parent('li').addClass('pure-menu-selected hackUlLifocus');
        }
    };
    return g;
})