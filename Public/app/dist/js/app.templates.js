angular.module('dipan').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directive/block/loading.dipan.loanding.directive.html',
    "<i ng-show=\"loading\"  class=\"fa fa-spinner fa-spin fa-3x fa-fw loading\"></i>"
  );


  $templateCache.put('directive/block/top.block.topNav.html',
    "<!--topNav-->\n" +
    "<div class=\"navbar navbar-app navbar-absolute-top\">\n" +
    "    <div class=\"navbar-brand navbar-brand-center\">\n" +
    "        <!--top中间title-->\n" +
    "        {{title}}\n" +
    "    </div>\n" +
    "    <div class=\"btn-group pull-left\" >\n" +
    "        <div class=\"btn\" onclick=\"history.go(-1);\">\n" +
    "            <!--top导航左侧图标-->\n" +
    "                <i class=\"fa fa-angle-left fa-lg\" ></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"btn-group pull-right\">\n" +
    "        <div class=\"btn\">\n" +
    "            <!--top导航右侧图标-->\n" +
    "            <i class=\"fa fa-search fa-lg\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('directive/member/my.dipan.myIndexNav.html',
    "<div class=\"scrollable-content\" ui-scroll-bottom=\"bottomReached()\">\n" +
    "\n" +
    "    <div class=\"list-group\" style=\"margin-top: 1em\">\n" +
    "        <a ui-sref=\"{{vo.url}}\" class=\"list-group-item ng-binding ng-scope\" ng-repeat=\"vo in listNav\">\n" +
    "           <span style=\"font-size: 1.4em\">{{vo.name}}</span>  <i class=\"fa fa-chevron-right pull-right\"></i>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('index.html',
    "<!DOCTYPE html>\n" +
    "<html ng-app=\"dipan\">\n" +
    "<head>\n" +
    "    <meta charset=\"utf-8\"/>\n" +
    "    <title>dipan.so</title>\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"/>\n" +
    "    <meta name=\"viewport\" content=\"user-scalable=no, initial-scale=1.0, maximum-scale=1.0\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"yes\"/>\n" +
    "    <script>\n" +
    "        var dist = true;//生产环境\n" +
    "        var isWeb = true;//是否 web\n" +
    "        var basePath = 'Public/app';//跟路径\n" +
    "        var tplPath = '';//模板路径\n" +
    "        var jsPath = 'Public/app/src/js/';//js路径\n" +
    "        var jsDate = new Date().getFullYear() + '' + new Date().getMonth() + '' + new Date().getDate();\n" +
    "        if (!trueWeb()) {\n" +
    "            //如果是 app 环境\n" +
    "            basePath = '../..';//跟路径\n" +
    "        } else if (!dist) {\n" +
    "            tplPath = 'Public/app/src/html/';//web 环境下,调试模式时候的 模板路径\n" +
    "        }\n" +
    "        if (dist) {\n" +
    "            if (isWeb) {\n" +
    "                document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "                document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/responsive.css\"/>');\n" +
    "\n" +
    "                document.write('<script src=\"' + basePath + '/dist/js/app.js?' + jsDate + '\"><\\/script>');\n" +
    "            } else {\n" +
    "                document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "                document.write('<script src=\"' + basePath + '/dist/js/app.js?' + jsDate + '\"><\\/script>');\n" +
    "            }\n" +
    "        }\n" +
    "        else {\n" +
    "            if (isWeb) {\n" +
    "                document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "                document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/responsive.css\"/>');\n" +
    "\n" +
    "                document.write('<script src=\"' + basePath + '/dist/js/appDev.js\"><\\/script>');\n" +
    "            } else {\n" +
    "                document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "                document.write('<script src=\"' + basePath + '/dist/js/appDev.js\"><\\/script>');\n" +
    "            }\n" +
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
    "    </script>\n" +
    "    <script type=\"text/javascript\">\n" +
    "        document.addEventListener('plusready', function () {\n" +
    "            plus.geolocation.watchPosition(function (p) {\n" +
    "//                plus.nativeUI.toast(\"Geolocation\\nLatitude:\" + p.coords.latitude + \"\\nLongitude:\" + p.coords.longitude + \"\\nAltitude:\" + p.coords.altitude);\n" +
    "            }, function (e) {\n" +
    "//              plus.nativeUI.toast(\"Geolocation error: \" + e.message);\n" +
    "            });\n" +
    "            //console.log(\"所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。\"\n" +
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
    "                    class=\"fa fa-github fa-navbar fa-lg\"></i> </a>\n" +
    "            <a ui-sref=\"memberIndex\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-exclamation-circle fa-navbar fa-lg\"></i> 我的</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- App Body -->\n" +
    "    <div class=\"app-body\">\n" +
    "        <!--loading directive-->\n" +
    "        <div  loading></div>\n" +
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
    "<section class=\"section container-fluid\" home>\n" +
    "  <h1 class=\"page-header\">Welcome dkkddk to My App</h1>\n" +
    "</section>\n"
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
