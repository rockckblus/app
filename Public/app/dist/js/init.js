(function (window, document) {
    'use strict';
    //app端
    var dist = true; //生产环境
    window.basePath = 'Public/app'; //跟路径
    window.tplPath = ''; //模板路径
    window.jsPath = 'Public/app/src/js/'; //js路径
    var jsDate = new Date().getFullYear() + '' + new Date().getMonth() + '' + new Date().getDate();
    var appJsPath = ''; //net url app.js

    /*************************
     * 如果web 直接 init
     * 如果 app,去读本地数据库,有本地 路径的 ,就用本地路径,没有,就用 app封装的 原始app数据
     * 16/8/22 下午12:49 ByRockBlus
     *************************/
    if (window.trueWeb()) {
        //wap 端
        init();
    } else {
        //app 端
        //本地app.js 下载下来的 路径
        appJsPath = localStorage.getItem("appJsPath");
        if (appJsPath) {
            init(appJsPath);
        } else {
            init();
        }
    }

    /*************************
     * plusReady 之后执行
     * 16/8/22 上午11:31 ByRockBlus
     *************************/
    function init(appPath) {

        /*************************
         * 生产环境 配置
         * 16/8/22 上午11:32 ByRockBlus
         *************************/
        if (dist) {
            if (window.trueWeb()) {
                //web 端
                document.write('<link rel="stylesheet" href="' + window.basePath + '/src/css/app.css"/>');
                document.write('<link rel="stylesheet" href="' + window.basePath + '/src/css/responsive.css"/>');
                //                document.write('<script src="' + basePath + '/dist/js/app.js?' + jsDate + '"><\/script>');
                document.write('<script src="/Public/app/dist/js/app.js?' + jsDate + '"><\/script>');
            } else {
                //app端
                basePath = '../..'; //跟路径
                document.write('<link rel="stylesheet" href="' + window.basePath + '/src/css/app.css"/>');
                if (appPath) { //如果有app下载下来的 地址,就用 下载的
                    document.write('<script src=' + appPath + "?" + jsDate + '><\/script>');
                } else { //用本地封装的
                    document.write('<script src="' + window.basePath + '/dist/js/app.js?' + jsDate + '"><\/script>');
                }
            }
        }
        /*************************
         * 开发环境配置
         * 16/8/22 上午11:34 ByRockBlus
         *************************/
        else {
            if (window.trueWeb()) {
                //web端
                window.tplPath = 'Public/app/src/html/'; //web 环境下,调试模式时候的 模板路径 全局变量
                document.write('<link rel="stylesheet" href="' + window.basePath + '/src/css/app.css"/>');
                document.write('<link rel="stylesheet" href="' + window.basePath + '/src/css/responsive.css"/>');
                document.write('<script src="' + window.basePath + '/dist/js/appDev.js"><\/script>');
            } else {
                //app端
                window.basePath = '../..'; //跟路径
                document.write('<link rel="stylesheet" href="' + window.basePath + '/src/css/app.css"/>');
                document.write('<script src="' + window.basePath + '/dist/js/appDev.js?' + jsDate + '"><\/script>');
            }
        }
    }

})(window, document);