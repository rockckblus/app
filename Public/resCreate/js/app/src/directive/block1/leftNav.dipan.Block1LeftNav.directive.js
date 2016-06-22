/**
 * leftNav.dipan.Block1LeftNav.directive.js
 * 命名注释：directive简称_leftNav. 父模块_dipan .block1 左侧导航directive. 类型_directive .js
 * 使用 ：<div left-nav></div>
 * Created by rockblus
 */
(function () {
    'use strict';

    angular.module('dipan').directive('leftNav', leftNav);

    function leftNav() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            templateUrl: 'Public/resCreate/html/src/public/block1/leftNav.dipan.Block1Leftnav.derective.html',
            controller: thisController,
            link: function (scope, element, attrs) {
            }
        };
    }


    thisController.$inject = ['$scope', '$filter', '$timeout', 'api', 'repBindOnce'];

    function thisController($scope, $filter, $timeout, api, repBindOnce) {
        var isChange = true;//是否需要切换分类导航显示状态 到另一分类
        var mousePos; //鼠标位置 全局变量
        var thisItemCat;//当前划过的 频道name
        document.onmousemove = mousePosition;//给鼠标位置变量
        $scope.categoryService = '';//服务频道导航模型
        $scope.ui = {
            category: {//展开导航包裹div
                item1: false,
                item2: false,
                item3: false,
                item4: false,
                item5: false,
                item6: false,
                item7: false
            }
        };
        $scope.fun = {
            category: {
                hoverThis: _categoryHoverThis,//全部分类hoverFun
                leaveThis: _categoryLeaveThis,//鼠标离开分类,去计算鼠标位置,判断 是否隐藏当前 的 分类显示状态
            }
        };

        /**
         * 监听php的全局变量对象解析事件,来更新key 并使用bindOne从新绑定
         * 16/3/17 */
        api('selectCategoryServiceOneTwo', {}, function (doc) {
            if (doc.doc) {
                $timeout(function () {
                    $scope.categoryService = $filter('editCategoryServiceNav')(doc);
                    angular.forEach($scope.categoryService, function (vo, index) {
                        vo.show = false;
                    });
                    console.log('list', $scope.categoryService);
                }, 0, true);
            }
        });

        /*************************
         * fun详情===============================================================================
         * 16/5/28 下午9:23 ByRockBlus
         *************************/
        /*************************
         * _categoryHover ,//全部分类hoverFun,显示对应 分类 的 ui.cateorgy.item
         * 16/5/28 下午9:23 ByRockBlus
         *************************/
        function _categoryHoverThis(itemStr) {
            thisItemCat = itemStr;
            $timeout(function () {
                if (!isChange) {//判断鼠标动作 如果 不需要切换分类,
                    console.log(1111111111111);
                    return false;
                }
                console.log(22222222222);
                var list = $scope.ui.category;
                angular.forEach(list, function (vo, index) {
                    list[index] = false;
                    list[itemStr] = 'thisCatItem';
                });
            }, 60);
        }


        /*************************
         * _categoryLeaveThis 鼠标离开分类,去计算鼠标位置,判断 是否隐藏当前 的 分类显示状态
         * 16/5/31 上午10:07 ByRockBlus
         *************************/
        function _categoryLeaveThis(itemStr) {
            var levePos = mousePos;
            $timeout(function () {
                if (mousePos.x > levePos.x) {
                    isChange = false;//阻止切换
                    console.log('阻止切换');
                    $timeout(function () {
                        isChange = true;//允许切换
                        _categoryHoverThis(thisItemCat);
                    }, 500);
                } else {
                    isChange = true;//允许切换
                    console.log(444444444444, itemStr);
                }
            }, 50, false);
        }

// 说明：获取鼠标位置
        function mousePosition(ev) {
            if (ev.pageX || ev.pageY) {
                mousePos = {x: ev.pageX, y: ev.pageY};
                return;
            }
            mousePos = {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
            return;
        }
    }
})();
