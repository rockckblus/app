angular.module('dipan').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directive/block/alert.block.alertUi.html',
    "<div id=\"alertUi\" ng-if=\"showAlertUi\">\n" +
    "    <div style=\"width: 100%;height: 100%;\" ng-class=\"alertUiClass\">\n" +
    "        <div class=\"left\" style=\"margin-left: 30px;\">\n" +
    "            <i class=\"fa fa-ban fa-4x\" style=\"color: #f4f4f4;margin-top: 7px\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"left\">\n" +
    "            <div class=\"clear\" style=\"margin-left: 20px;font-size: 1.2em;margin-top: 10px \">{{title}}</div>\n" +
    "            <div class=\"clear\" style=\"margin-left: 20px;font-size: 0.9em;margin-top: 3px;color: #777;height: 20px;overflow: hidden \">{{content}}</div> </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('directive/block/loading.dipan.loanding.directive.html',
    "<i ng-show=\"loading\"  class=\"fa fa-spinner fa-spin fa-3x fa-fw loading\"></i>"
  );


  $templateCache.put('directive/block/tab.block.tabNav.directive.html',
    "<div id=\"tab\" class=\"clear\" style=\"\">\n" +
    "    <div ng-class=\"vo.colNumCss\" ng-repeat=\"vo in tabList\">\n" +
    "        <span ui-sref=\"{{vo.route}}\" ng-class=\"vo.thisItem\" class=\"btn\" ng-bind-html=\"vo.name|toHtml\"></span>\n" +
    "    </div>\n" +
    "    <style>\n" +
    "        .has-navbar-top .app-body {\n" +
    "            padding-top: 104px;\n" +
    "        }\n" +
    "    </style>\n" +
    "</div>"
  );


  $templateCache.put('directive/block/top.block.topNav.html',
    "<!--topNav-->\n" +
    "<div class=\"navbar navbar-app navbar-absolute-top\">\n" +
    "    <div class=\"navbar-brand navbar-brand-center\">\n" +
    "        <!--top中间title-->\n" +
    "        {{title}}\n" +
    "    </div>\n" +
    "    <div class=\"btn-group pull-left\">\n" +
    "\n" +
    "        <!--home-->\n" +
    "        <div class=\"btn\" ng-if=\"url !== '/home'\" onclick=\"history.go(-1);\">\n" +
    "            <!--top导航左侧图标-->\n" +
    "            <i class=\"fa fa-angle-left fa-lg\"></i>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--default-->\n" +
    "        <div class=\"btn\" ng-if=\"url == '/home'\" ui-sref=\"memberIndex\" >\n" +
    "            <!--top导航左侧图标-->\n" +
    "            <i class=\"fa fa-location-arrow fa-lg\" aria-hidden=\"true\" ></i>\n" +
    "            <!--<i class=\"fa fa-caret-down fa-1\" aria-hidden=\"true\" ></i>-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"btn-group pull-right\">\n" +
    "        <div class=\"btn\">\n" +
    "            <!--top导航右侧图标-->\n" +
    "            <i class=\"fa fa-search fa-lg\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div tab ng-if=\"showTab\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('directive/home.dipan.home.directive.html',
    "<div class=\"scrollable-content\" ui-scroll-bottom=\"a()\">\n" +
    "    <div class=\"list-group\">\n" +
    "        <a class=\"list-group-item \" ng-repeat=\"vo in list\" style=\"height: 100px\">\n" +
    "            <span style=\"font-size: 1.4em\">{{vo.branch_name}}</span> <i class=\"fa fa-chevron-right pull-right\"></i>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('directive/member/my.dipan.myIndexNav.html',
    "<div class=\"scrollable-content\" ui-scroll-bottom=\"bottomReached()\">\n" +
    "    <div class=\"list-group\">\n" +
    "        <a ui-sref=\"{{vo.url}}\" class=\"list-group-item ng-binding ng-scope\" ng-repeat=\"vo in listNav\">\n" +
    "           <span style=\"font-size: 1.4em\">{{vo.name}}</span>  <i class=\"fa fa-chevron-right pull-right\"></i>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('index.html',
    "<!DOCTYPE html>\n" +
    "<html manifest=\"http://192.168.0.25/Public/app/index.appcache\" ng-app=\"dipan\">\n" +
    "<head>\n" +
    "    <meta charset=\"utf-8\"/>\n" +
    "    <title>dipan.so</title>\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"/>\n" +
    "    <meta name=\"viewport\" content=\"user-scalable=no, initial-scale=1.0, maximum-scale=1.0\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"yes\"/>\n" +
    "    <meta http-equiv=\"Cache-Control\" content=\"public\"/>\n" +
    "\n" +
    "    <script>\n" +
    "        var dist = true;//生产环境\n" +
    "        var basePath = 'Public/app';//跟路径\n" +
    "        var tplPath = '';//模板路径\n" +
    "        var jsPath = 'Public/app/src/js/';//js路径\n" +
    "        var jsDate = new Date().getFullYear() + '' + new Date().getMonth() + '' + new Date().getDate();\n" +
    "        var appJsPath = 'http://192.168.0.25/Public/app/dist/js/app.js';//net url app.js\n" +
    "\n" +
    "        /*************************\n" +
    "         * plusReady 之后执行\n" +
    "         * 16/8/22 上午11:31 ByRockBlus\n" +
    "         *************************/\n" +
    "        function init(appPath) {\n" +
    "\n" +
    "            /*************************\n" +
    "             * 生产环境 配置\n" +
    "             * 16/8/22 上午11:32 ByRockBlus\n" +
    "             *************************/\n" +
    "            if (dist) {\n" +
    "                if (trueWeb()) {\n" +
    "                    //web 端\n" +
    "                    document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "                    document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/responsive.css\"/>');\n" +
    "//                document.write('<script src=\"' + basePath + '/dist/js/app.js?' + jsDate + '\"><\\/script>');\n" +
    "                    document.write('<script src=\"http://192.168.0.25/Public/app/dist/js/app.js?' + jsDate + '\"><\\/script>');\n" +
    "                } else {\n" +
    "                    //app端\n" +
    "                    document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "//                document.write('<script src=\"' + basePath + '/dist/js/app.js?' + jsDate + '\"><\\/script>');\n" +
    "                    document.write('<script src=' + appPath + '><\\/script>');\n" +
    "                }\n" +
    "            }\n" +
    "            /*************************\n" +
    "             * 开发环境配置\n" +
    "             * 16/8/22 上午11:34 ByRockBlus\n" +
    "             *************************/\n" +
    "            else {\n" +
    "                if (trueWeb()) {\n" +
    "                    //web端\n" +
    "                    tplPath = 'Public/app/src/html/';//web 环境下,调试模式时候的 模板路径 全局变量\n" +
    "\n" +
    "                    document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "                    document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/responsive.css\"/>');\n" +
    "                    document.write('<script src=\"' + basePath + '/dist/js/appDev.js\"><\\/script>');\n" +
    "                } else {\n" +
    "                    //app端\n" +
    "                    basePath = '../..';//跟路径\n" +
    "                    document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "                    document.write('<script src=\"' + basePath + '/dist/js/appDev.js\"><\\/script>');\n" +
    "                }\n" +
    "            }\n" +
    "\n" +
    "\n" +
    "        }\n" +
    "\n" +
    "        //判断web 还是 app\n" +
    "        function trueWeb() {\n" +
    "            var url = window.location.href;\n" +
    "            url = url.split(':');\n" +
    "            if (url[0] === 'http') {\n" +
    "                return true;\n" +
    "            }\n" +
    "        }\n" +
    "\n" +
    "    </script>\n" +
    "    <script type=\"text/javascript\">\n" +
    "        document.addEventListener('plusready', function () {\n" +
    "            var appJsName = '_documents/app.js';\n" +
    "\n" +
    "            delAppJs();\n" +
    "\n" +
    "            /*************************\n" +
    "             * 删除app文件\n" +
    "             * 16/8/22 上午11:06 ByRockBlus\n" +
    "             *************************/\n" +
    "            function delAppJs() {\n" +
    "                plus.io.resolveLocalFileSystemURL(appJsName, succesCb, errorCb);//判断是否存在app.js 存在就删除,然后下载,不存在,直接下载\n" +
    "\n" +
    "                function succesCb(e) {\n" +
    "                    e.remove(function () {\n" +
    "                        createDownload();\n" +
    "                    });\n" +
    "                }\n" +
    "\n" +
    "                function errorCb() {\n" +
    "                    createDownload();\n" +
    "                }\n" +
    "\n" +
    "            }\n" +
    "\n" +
    "\n" +
    "            // 创建下载任务\n" +
    "            function createDownload() {\n" +
    "\n" +
    "                var dtask = plus.downloader.createDownload(\"http://192.168.0.25/Public/app/dist/js/app.js\", {\n" +
    "                    filename: appJsName\n" +
    "                }, function (d, status) {\n" +
    "                    // 下载完成\n" +
    "                    if (status == 200) {\n" +
    "                        plus.io.resolveLocalFileSystemURL(d.filename, function (entry) {\n" +
    "                            console.log('entry', entry);\n" +
    "                            init(entry.fullPath);\n" +
    "                        });\n" +
    "//                        alert(\"Download success: \" + d.filename);\n" +
    "                    } else {\n" +
    "                        console.log('err', '下载文件失败,直接使用线上app.js');\n" +
    "                        init('http://192.168.0.25/Public/app/dist/js/app.js');\n" +
    "                    }\n" +
    "                });\n" +
    "                //dtask.addEventListener( \"statechanged\", onStateChanged, false );\n" +
    "                dtask.start();\n" +
    "            }\n" +
    "\n" +
    "        });\n" +
    "    </script>\n" +
    "</head>\n" +
    "\n" +
    "<body class=\"angularEnd\" ng-controller=\"body\">\n" +
    "<div class=\"app\">\n" +
    "    <!-- topNavbars -->\n" +
    "    <div top></div>\n" +
    "\n" +
    "    <div class=\"navbar navbar-app navbar-absolute-bottom\">\n" +
    "        <div class=\"btn-group justified\">\n" +
    "            <!--底部连接-->\n" +
    "            <a ui-sref=\"home\" class=\"btn btn-navbar\"><i class=\"fa fa-home fa-navbar fa-lg\"></i> </a>\n" +
    "            <a href=\"#\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-map-marker fa-navbar fa-lg\"></i> </a>\n" +
    "            <a ui-sref=\"memberIndex\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-user fa-navbar fa-lg\"></i> </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- App Body -->\n" +
    "    <div class=\"app-body\">\n" +
    "\n" +
    "        <button id=\"down\">下载</button>\n" +
    "\n" +
    "\n" +
    "        <!--loading directive-->\n" +
    "        <div loading></div>\n" +
    "        <div alert></div>\n" +
    "        <ui-view></ui-view>\n" +
    "    </div>\n" +
    "\n" +
    "</div><!-- ~ .app -->\n" +
    "\n" +
    "<!--数据div-->\n" +
    "<!--<div url-parse={{$indexAllRe}}></div>-->\n" +
    "\n" +
    "\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('route/home.html',
    "\n" +
    "<div home></div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('route/member/loginOut.html',
    "loginOUt"
  );


  $templateCache.put('route/member/memberIndex.html',
    "<!--我的导航列表-->\n" +
    "<div my></div>\n"
  );


  $templateCache.put('route/member/memberInfo.html',
    "memberINfo"
  );

}]);
