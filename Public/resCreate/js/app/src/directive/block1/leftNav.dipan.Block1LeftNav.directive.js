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
            var list = $scope.ui.category;
            console.log('list1', list);


            angular.forEach(list, function (vo) {
                vo = false;
                list[itemStr] = true;
            });

            console.log('indexlist', list);
            //$timeout(function () {
            //    $scope.ui.category = list;
            //}, 0);
        }


    }
})();
