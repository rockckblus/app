angular.module('dipan').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/dev/html/src/public/areaKey/areaKey.dipan.topAreaKey.directive.html',
    "<div id='areaKey'  class=\"left\" style=\"font-weight: bold;margin-left: 12px\">\n" +
    "    <div class=\"linkMouse left\" ng-mouseleave=\"areaLeave()\" ng-mousemove=\"areaHover()\" ng-class=\"area.hoverLine\" style=\"font-size: 24px;margin-right: 10px\">\n" +
    "        <div class=\"clear\">岳阳华容北景港</div>\n" +
    "        <div class=\"clear \" ng-class=\"area.shan\">{{area.jianTou}}</div>\n" +
    "        <div ng-show=\"area.hoverLineShow\"  id=\"areaAlert\">\n" +
    "\n" +
    "            <div area-show></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"linkMouse  left\" ng-mouseleave=\"keyLeave()\" ng-mousemove=\"keyHover()\" ng-class=\"key.hoverLine\"  style=\"font-size: 24px\">\n" +
    "        <div class=\"clear\">技工工人行业招工</div>\n" +
    "        <div class=\"clear \" ng-class=\"key.shan\" >{{key.jianTou}}</div>\n" +
    "        <div ng-show=\"key.hoverLineShow\" id=\"keyAlert\">\n" +
    "           <div key-show></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/dev/html/src/public/areaKey/areaShow.dipan.areaShowSelect.directive.html',
    "<div id=\"areaShow\">\n" +
    "    <div class=\"item clear\">\n" +
    "        <div class=\"leftArea\">dd</div>\n" +
    "        <div class=\"rightCity\">\n" +
    "            <div class=\"right allCityBtn btn btn-success btn-xs\" style=\"margin-right: 10px;margin-top: 10px\" ng-mouseover=\"showAllCity = true\" ng-mouseleave=\"showAllCity = false\">&nbsp;&nbsp;岳阳&nbsp;▾\n" +
    "\n" +
    "\n" +
    "                <div class=\"right allCity\" style=\"\" ng-show=\"showAllCity\">\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                    <li>天津</li>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/dev/html/src/public/areaKey/keyShow.dipan.keyShowSelect.directive.html',
    "<div id=\"keyShow\">\n" +
    "    <div class=\"category\">\n" +
    "        ggg\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/dev/html/src/public/uiBlock/alertDiv/alertInfo.alertDiv.showInfo.directive.html',
    "<div id=\"alertInfo\" ng-show=\"show\">\n" +
    "    <div class=\"block blockContent\" id=\"infoContent\">\n" +
    "        <div class=\"closeButton\" id=\"alertInfoCloseButton\">&times;</div>\n" +
    "        <div class=\"content\" id=\"reBindContent\">{{content}}</div>\n" +
    "        <div id=\"otherData\" otherData='{{otherData}}'></div>\n" +
    "    </div>\n" +
    "    <div class=\"backPositon linkMouse\" id=\"backPositon\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/dev/html/src/public/uiBlock/alertDiv/alertWarn.alertDiv.alertWarn.directive.html',
    "<div id=\"alertWarn\" ng-show=\"show\">\n" +
    "    <div class=\"block2 blockContent\" id=\"warnContent\">\n" +
    "        <div class=\"closeButton\" id=\"alertWarnCloseButton\">&times;</div>\n" +
    "        <div class=\"content\" id=\"reBindWarnContent\">{{content}}</div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
