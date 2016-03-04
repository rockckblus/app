/**
 * 前台工具类.
 * Created by apple on 14-10-24.
 */

define({
    //angular GETJSP方法
    getJsp: function ($http, getMoreUrl, re) {
        $http({method: 'JSONP', url: getMoreUrl + "?callback=JSON_CALLBACK"}).success(function (data) {
            console.log('model', data, getMoreUrl);
            if (re) {
                re(data);
            }
        }).error(function (data, status, headers, config) {
//            console.log("error");
        });
    },

    //get json
    getJson: function ($http, getMoreUrl, re) {
        console.log('getJson', getMoreUrl);
        $http({method: 'JSON', url: getMoreUrl + "?callback=JSON_CALLBACK"}).success(function (data) {
            re(data);
        }).error(function (data, status, headers, config) {
//            console.log("error");
        });
    },

    /**
     * angular post
     *
     * 15-3-27 */
    postJsp: function ($http, getMoreUrl, data, re) {
        var endData = {};
        for (vo in data) {
            endData[data[vo].name] = data[vo].value;
        }

        console.log('enddata', endData);
        $http({
            url: getMoreUrl,
            method: "POST",
            data: endData
        }).success(function (response) {
            re(response);
        })
    },

    //判断浏览器客户端。pc 还是 mac
    macTrue: function () {
        //平台、设备和操作系统
        var system = {
            win: false,
            mac: false,
            xll: false
        };
//检测平台
        var p = navigator.platform;
//        console.log('p',p);
        system.win = p.indexOf("Win") == 0;
//        console.log('win',system.win);
        system.mac = p.indexOf("Mac") == 0;
//        console.log('mac',system.mac);

        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//跳转语句
        if (system.mac) {
            return 'mac';
        }
        else if (system.win) {
            return 'pc';
        }
    },
    ie7True: function () {

        if (navigator.userAgent.indexOf("MSIE") > 0) {
//是否是IE浏览器
            if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                window.location.href = "http://www.dipan.so/ie7.html";
            }
            if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
                window.location.href = "http://www.dipan.so/ie7.html";
            }
        } else {
            return true;
        }
    },

    //cookIe 操作
    setCookie: function (name, value, moreCount) {
        var moreCountStr = '';
        if (moreCount) {
            moreCountStr = '\;' + moreCount;
        }
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);


        document.cookie = name + "=" + value + "\;expires=" + exp.toGMTString() + "\;domain=.dipan.so" + "\;path=/";
    },
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return arr[2];
        else return null;
    },
    showGai: function () {//显示gai
        $('#gai').show();
    },
    hideGai: function () {//显示gai
        $('#gai').hide();
    },

    /** ui相关 15-3-14 */
    ui: {
        /** 关闭loading 15-3-14 */
        colseLoading: function () {
            $('.loadIngIcon').hide();
        }
    },

    /**验证相关  15-3-22 */
    verify: {

        /** 验证空 15-3-22 */
        isEmpty: function (t) {
            return $.trim(t) ? true : false;
        },

        /** 验证手机号 15-3-22 */
        checkMobile: function (sMobile) {
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))) {
                return false;
            } else {
                return true;
            }
        },

        /** getError 遍历错误代码返回错误提示信息 15-3-24 */
        getError: function (codeNum) {
            switch (codeNum) {
                case 101:
                    return '获取用户IP失败';
                    break;
                case 102:
                    return '错误:手机号为空';
                    break;
                case 103:
                    return '错误:重新发送时间未超过1分钟，不能从新发送';
                    break;
                case 104:
                    return '错误:修改验证码失败';
                    break;
                case 105:
                    return '错误:添加用户失败';
                    break;
                case 106:
                    return '错误:手机号,或验证码为空';
                    break;
                case 107:
                    return '错误:手机号已存在,可直接<span class="button linkMouse " id="loginAlert">登录</span>';
                    break;
                case 108:
                    return '错误:手机号为空';
                    break;
                case 109:
                    return '错误:手机号对应随机码错误';
                    break;
                case 110:
                    return '错误:添加用户失败';
                    break;
                case 111:
                    return '错误:验证手机号或者验证码为空';
                    break;
                case 112:
                    return '验证码错误';
                    break;
                case 113:
                    return '短信发送失败';
                    break;
                case 114:
                    return '登陆手机号或者密码为';
                    break;
                case 115:
                    return '登陆手机号或者密码不正确';
                    break;
                case 116:
                    return '登陆手机号不存在';
                    break;
                case 117:
                    return '传入的手机号或者对应的短信密码为空';
                    break;
                case 118:
                    return '失败,或无修改陆手机号不存在';
                    break;
                default :
                    return '错误';
                    break;
            }
        }
    }
});
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */