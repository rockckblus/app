angular.module('dipan').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('Public/app/src/html/block/home.html',
    "<section class=\"section container-fluid\">\n" +
    "  <h1 class=\"page-header\">Welcome dkkddk to My App</h1>\n" +
    "</section>\n"
  );


  $templateCache.put('Public/app/src/html/block/sidebar.html',
    "<h1 class=\"app-name\">分类</h1>\n" +
    "\n" +
    "<div class=\"scrollable\">\n" +
    "  <h1 class=\"scrollable-header app-name\">分类</h1>\n" +
    "  <div class=\"scrollable-content\">\n" +
    "    <div class=\"list-group\" ui-turn-off='uiSidebarLeft'>\n" +
    "      <a class=\"list-group-item\" href=\"#/\">首页<i class=\"fa fa-chevron-right pull-right\"></i></a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('Public/app/src/html/index.html',
    "<!DOCTYPE html>\n" +
    "<html ng-app=\"dipan\">\n" +
    "<head>\n" +
    "    <meta charset=\"utf-8\"/>\n" +
    "    <title ng-controller=\"header\">{{title}}</title>\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"/>\n" +
    "    <meta name=\"viewport\" content=\"user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimal-ui\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"yes\"/>\n" +
    "    <script type=\"text/javascript\">\n" +
    "        document.addEventListener('plusready', function () {\n" +
    "            plus.geolocation.watchPosition(function (a) {\n" +
    "                plus.nativeUI.toast(\"Geolocation\\nLatitude:\" + p.coords.latitude + \"\\nLongitude:\" + p.coords.longitude + \"\\nAltitude:\" + p.coords.altitude);\n" +
    "            }, function (e) {\n" +
    "                plus.nativeUI.toast(\"Geolocation error: \" + e.message);\n" +
    "            });\n" +
    "            ('idkdkkdkdkk2ksdfk');\n" +
    "            //console.log(\"所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。\"\n" +
    "        });\n" +
    "    </script>\n" +
    "</head>\n" +
    "\n" +
    "\n" +
    "<body class=\"angularEnd\" ng-controller=\"body\">\n" +
    "\n" +
    "<!-- Sidebars -->\n" +
    "<div ng-include=\"sidebar\"\n" +
    "     ui-track-as-search-param='true'\n" +
    "     class=\"sidebar sidebar-left\"></div>\n" +
    "\n" +
    "<div class=\"app\">\n" +
    "\n" +
    "    <!-- Navbars -->\n" +
    "\n" +
    "    <div class=\"navbar navbar-app navbar-absolute-top\">\n" +
    "        <div class=\"navbar-brand navbar-brand-center\" ui-yield-to=\"title\">\n" +
    "            Mobile Angular UI\n" +
    "        </div>\n" +
    "        <div class=\"btn-group pull-left\">\n" +
    "            <div ui-toggle=\"uiSidebarLeft\" class=\"btn sidebar-toggle\">\n" +
    "                <i class=\"fa fa-angle-left\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"btn-group pull-right\" ui-yield-to=\"navbarAction\">\n" +
    "            <div ui-toggle=\"uiSidebarRight\" class=\"btn\">\n" +
    "                <i class=\"fa fa-search\"></i> Chat\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"navbar navbar-app navbar-absolute-bottom\">\n" +
    "        <div class=\"btn-group justified\">\n" +
    "            <a href=\"#\" class=\"btn btn-navbar\"><i class=\"fa fa-home fa-navbar\"></i> Docs</a>\n" +
    "            <a href=\"#\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-github fa-navbar\"></i> Sources</a>\n" +
    "            <a href=\"#\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-exclamation-circle fa-navbar\"></i> Issues</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- App Body -->\n" +
    "    <div class=\"app-body\">\n" +
    "        <div class=\"app-content\">\n" +
    "            <!--<ng-view></ng-view>  -->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div><!-- ~ .app -->\n" +
    "\n" +
    "<div ui-yield-to=\"modals\"></div>\n" +
    "\n" +
    "<!--数据div-->\n" +
    "<!--<div url-parse={{$indexAllRe}}></div>-->\n" +
    "\n" +
    "\n" +
    "<script>\n" +
    "    var dist = true;\n" +
    "    var isWeb = true;\n" +
    "    var basePath = 'Public/app';\n" +
    "    if (!trueWeb()) {\n" +
    "        basePath = '../..';\n" +
    "    }\n" +
    "    if (dist) {\n" +
    "        if (isWeb) {\n" +
    "            console.log(basePath);\n" +
    "            document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "            document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/responsive.css\"/>');\n" +
    "\n" +
    "            document.write('<script src=\"' + basePath + '/dist/js/app.js?{$jsDate}\"><\\/script>');\n" +
    "        } else {\n" +
    "            document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "            document.write('<script src=\"' + basePath + '/dist/js/app.js?{$jsDate}\"><\\/script>');\n" +
    "        }\n" +
    "    }\n" +
    "    else {\n" +
    "        if (isWeb) {\n" +
    "            document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "            document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/responsive.css\"/>');\n" +
    "\n" +
    "            document.write('<script src=\"' + basePath + '/dist/js/appDev.js?{$jsDate}\"><\\/script>');\n" +
    "        } else {\n" +
    "            document.write('<link rel=\"stylesheet\" href=\"' + basePath + '/src/css/app.css\"/>');\n" +
    "            document.write('<script src=\"' + basePath + '/dist/js/appDev.js?{$jsDate}\"><\\/script>');\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    function trueWeb() {\n" +
    "        var url = window.location.href;\n" +
    "        url = url.split(':');\n" +
    "        if (url[0] === 'http') {\n" +
    "            return true;\n" +
    "        }\n" +
    "    }\n" +
    "</script>\n" +
    "</body>\n" +
    "</html>\n"
  );

}]);
