angular.module('dipan').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('Public/resCreate/html/src/public/areaKey/areaKey.dipan.topAreaKey.directive.html',
    "<div id='areaKey' class=\"left\" style=\"font-weight: bold;margin-left: 14px\">\n" +
    "    <!--<div class=\"linkMouse left\" ng-mouseleave=\"areaLeave()\" ng-mousemove=\"areaHover()\" ng-class=\"area.hoverLine\"-->\n" +
    "    <!--style=\"font-size: 16px;margin-right: 10px\">-->\n" +
    "    <div class=\"linkMouse left\" ng-mouseleave=\"areaLeave()\" ng-mousemove=\"areaHover()\" ng-class=\"area.hoverLine\"\n" +
    "         style=\"font-size: 16px;margin-right: 10px\">\n" +
    "        <!--bindOnce topArea-->\n" +
    "        <div class=\"clear\" id=\"topArea\" bindonce bo-text='topArea'></div>\n" +
    "        <!--<div class=\"clear \" ng-class=\"area.shan\">{{area.jianTou}}</div>-->\n" +
    "        <!--<div ng-show=\"area.hoverLineShow\" id=\"areaAlert\">-->\n" +
    "\n" +
    "        <!--<div area-show></div>-->\n" +
    "        <!--</div>-->\n" +
    "    </div>\n" +
    "    <!--<div class=\"linkMouse  left\" ng-mouseleave=\"keyLeave()\" ng-mousemove=\"keyHover()\" ng-class=\"key.hoverLine\"-->\n" +
    "    <!--style=\"font-size: 16px\">-->\n" +
    "    <div class=\"linkMouse  left\"\n" +
    "         style=\"font-size: 16px\">\n" +
    "        <!--bindOnce topKey-->\n" +
    "        <div class=\"clear\" id=\"topKey\" bindonce bo-text=\"topKey\"></div>\n" +
    "        <!--<div class=\"clear \" ng-class=\"key.shan\">{{key.jianTou}}</div>-->\n" +
    "        <!--<div ng-show=\"key.hoverLineShow\" id=\"keyAlert\">-->\n" +
    "        <!--<div key-show></div>-->\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('Public/resCreate/html/src/public/areaKey/areaShow.dipan.areaShowSelect.directive.html',
    "<div id=\"areaShow\">\n" +
    "    <div class=\"item clear\">\n" +
    "        <div class=\"leftArea\">\n" +
    "            <div class=\"clear\">\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"rightCity\">\n" +
    "            <div class=\"right allCityBtn btn btn-success btn-xs\" style=\"margin-right: 10px;margin-top: 10px\"\n" +
    "                 ng-mouseover=\"showAllCity = true\" ng-mouseleave=\"showAllCity = false\">\n" +
    "                &nbsp;&nbsp;<span id=\"oneCityInfoName\" bindonce bo-text=\"oneCityInfoName\"></span>&nbsp;▾\n" +
    "                <div class=\"right allCity\" style=\"\" ng-show=\"showAllCity\">\n" +
    "                    <li bindonce ng-repeat=\"vo in otherCityList\" bo-text=\"vo.name\"></li>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('Public/resCreate/html/src/public/areaKey/keyShow.dipan.keyShowSelect.directive.html',
    "<div id=\"keyShow\">\n" +
    "    <div class=\"category\">\n" +
    "        ggg\n" +
    "    </div>\n" +
    "    <div class=\"pindao\"></div>\n" +
    "</div>"
  );


  $templateCache.put('Public/resCreate/html/src/public/block1/leftNav.dipan.Block1Leftnav.derective.html',
    "<div id=\"leftNav\" style=\"overflow-y: scroll;height:100%\">\n" +
    "    <div id=\"allCateTitle\">全部分类</div>\n" +
    "    <div class=\"pinDaoItem \">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">\n" +
    "                <div ng-mouseover=\"fun.category.hoverThis('item1');\">生活服务</div>\n" +
    "                <div class=\"rightJianTou\">></div>\n" +
    "                <div id=\"listCategory\" ng-show=\"ui.category.item1\" class=\"listCategory\">\n" +
    "                    <div bindonce ng-repeat=\"vo in categoryService\" class=\"oneCateAllDiv\">\n" +
    "                        <div class=\"clear mt10\">\n" +
    "                            <!--一级标题 -->\n" +
    "                            <div class=\"left\" style=\"color:red\" bo-text=\"vo.name\"></div>\n" +
    "\n" +
    "                            <!--循环2级-->\n" +
    "                            <div class=\"left\" ng-repeat=\"vo2 in vo.twoCat\">\n" +
    "                                <div class=\"left\" bo-text=\"vo2.name\"></div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pinDaoItem\">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">\n" +
    "                <div ng-mouseover=\"fun.category.hoverThis('item2');\">招聘求职</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pinDaoItem\">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">二手市场\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pinDaoItem\">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">二手车\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pinDaoItem\">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">旅游酒店\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pinDaoItem\">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">宠物/宠物用品\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pinDaoItem\">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">同城交友\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pinDaoItem\">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">行业信息\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pinDaoItem\">\n" +
    "        <div class=\"pinDaoName\">\n" +
    "            <div class=\"itemTopName linkMouse\">房屋信息\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('Public/resCreate/html/src/public/uiBlock/alertDiv/alertInfo.alertDiv.showInfo.directive.html',
    "<div id=\"alertInfo\" ng-show=\"show\">\n" +
    "    <div class=\"block blockContent\" id=\"infoContent\">\n" +
    "        <div class=\"closeButton\" id=\"alertInfoCloseButton\">&times;</div>\n" +
    "        <div class=\"content\" id=\"reBindContent\">{{content}}</div>\n" +
    "        <div id=\"otherData\" otherData='{{otherData}}'></div>\n" +
    "    </div>\n" +
    "    <div class=\"backPositon linkMouse\" id=\"backPositon\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('Public/resCreate/html/src/public/uiBlock/alertDiv/alertWarn.alertDiv.alertWarn.directive.html',
    "<div id=\"alertWarn\" ng-show=\"show\">\n" +
    "    <div class=\"block2 blockContent\" id=\"warnContent\">\n" +
    "        <div class=\"closeButton\" id=\"alertWarnCloseButton\">&times;</div>\n" +
    "        <div class=\"content\" id=\"reBindWarnContent\">{{content}}</div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
