angular.module('dipan').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('Public/app/src/html/directive/block/top.block.topNav.html',
    "<!--topNav-->\n" +
    "<div class=\"navbar navbar-app navbar-absolute-top\">\n" +
    "    <div class=\"navbar-brand navbar-brand-center\">\n" +
    "        <!--top中间title-->\n" +
    "        {{title}}\n" +
    "    </div>\n" +
    "    <div class=\"btn-group pull-left\">\n" +
    "        <div class=\"btn\" onclick=\"history.go(-1);\">\n" +
    "            <!--top导航左侧图标-->\n" +
    "                <i class=\"fa fa-angle-left\" ></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"btn-group pull-right\">\n" +
    "        <div class=\"btn\">\n" +
    "            <!--top导航右侧图标-->\n" +
    "            <i class=\"fa fa-search\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('Public/app/src/html/directive/member/my.dipan.myIndexNav.html',
    "<div class=\"scrollable-content\" ui-scroll-bottom=\"bottomReached()\">\n" +
    "    <div class=\"list-group\">\n" +
    "        <a ui-sref=\"state1\" class=\"list-group-item ng-binding ng-scope\">\n" +
    "            Item 11 <i class=\"fa fa-chevron-right pull-right\"></i>\n" +
    "        </a>\n" +
    "        <a ui-sref=\"state2\" class=\"list-group-item ng-binding ng-scope\">\n" +
    "            Item 2 <i class=\"fa fa-chevron-right pull-right\"></i>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('Public/app/src/html/index.html',
    "<!DOCTYPE html>\n" +
    "<html ng-app=\"dipan\">\n" +
    "<head>\n" +
    "    <meta charset=\"utf-8\"/>\n" +
    "    <title>dipan.so</title>\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"/>\n" +
    "    <meta name=\"viewport\" content=\"user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimal-ui\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"yes\"/>\n" +
    "    <script>\n" +
    "        var dist = true;//生产环境\n" +
    "        var isWeb = true;//是否 web\n" +
    "        var basePath = 'Public/app';//跟路径\n" +
    "        var tplPath = 'Public/app/src/html/';//模板路径\n" +
    "        var jsPath = 'Public/app/src/js/';//js路径\n" +
    "        var jsDate = new Date().getFullYear() + '' + new Date().getMonth() + '' + new Date().getDate();\n" +
    "        if (!trueWeb()) {\n" +
    "            basePath = '../..';//跟路径\n" +
    "            tplPath = '';//模板路径\n" +
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
    "                plus.nativeUI.toast(\"Geolocation\\nLatitude:\" + p.coords.latitude + \"\\nLongitude:\" + p.coords.longitude + \"\\nAltitude:\" + p.coords.altitude);\n" +
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
    "            <a href=\"#\" class=\"btn btn-navbar\"><i class=\"fa fa-home fa-navbar\"></i> </a>\n" +
    "            <a href=\"#\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-github fa-navbar\"></i> </a>\n" +
    "            <a ui-sref=\"my\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-exclamation-circle fa-navbar\"></i> 我的</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- App Body -->\n" +
    "    <div class=\"app-body\">\n" +
    "\n" +
    "        <ui-view></ui-view>\n" +
    "\n" +
    "\n" +
    "        <!--<div class=\"app-content\">-->\n" +
    "        <!--<div class=\"scrollable\">-->\n" +
    "        <!--<div class=\"scrollable-content section\" ui-scroll-bottom=\"loadMore()\">-->\n" +
    "        <!--<ul>-->\n" +
    "        <!--<li>-->\n" +
    "        <!--item.name-->\n" +
    "        <!--</li>-->\n" +
    "        <!--</ul>-->\n" +
    "        <!--</div>-->\n" +
    "        <!--</div>-->\n" +
    "        <!--</div>-->\n" +
    "\n" +
    "\n" +
    "        <!--<ui-view></ui-view>-->\n" +
    "        <!--<a ui-sref=\"state1\">State 1</a>-->\n" +
    "        <!--<a ui-sref=\"state2\">State 2</a>-->\n" +
    "    </div>\n" +
    "\n" +
    "</div><!-- ~ .app -->\n" +
    "\n" +
    "<!--<div ui-yield-to=\"modals\"></div>-->\n" +
    "\n" +
    "<!--数据div-->\n" +
    "<!--<div url-parse={{$indexAllRe}}></div>-->\n" +
    "\n" +
    "\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('Public/app/src/html/route/home.html',
    "<section class=\"section container-fluid\">\n" +
    "  <h1 class=\"page-header\">Welcome dkkddk to My App</h1>\n" +
    "</section>\n"
  );


  $templateCache.put('Public/app/src/html/route/member/my.html',
    "<!--我的导航列表-->\n" +
    "<div my></div>\n"
  );


  $templateCache.put('Public/app/src/html/route/state1.html',
    "<h1>\n" +
    "    item1\n" +
    "</h1>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('Public/app/src/html/route/state2.html',
    "<h1>\n" +
    "    ite2m\n" +
    "</h1>\n" +
    "\n" +
    "\n"
  );

}]);
