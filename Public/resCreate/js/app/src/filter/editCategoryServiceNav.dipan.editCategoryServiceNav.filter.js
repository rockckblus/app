/**
 * editCategoryServiceNav.dipan.editCategoryServiceNav.filter.js
 * 命名注释：filter简称_editCategoryServiceNav. 父模块_dipan . 功能_编辑服务分类的左侧导航filter. 类型_filter .js
 * 使用：给js使用  $filter('editCategoryServiceNav')(doc);
 * Created by rockblus on
 */
(function () {
    'use strict';

    /**
     * html filter
     * 15-12-31 */

    angular.module('dipan').filter('editCategoryServiceNav', editCategoryServiceNav);
    function editCategoryServiceNav() {
        return function (doc) {
            var reObj = [];
            if (doc.doc) {
                var list = doc.doc;
                angular.forEach(list, function (vo) {
                    if (vo.type == 1) {
                        reObj.push(vo);
                    }
                });
                angular.forEach(reObj, function (vo2) {
                    vo2.twoCat = [];
                    angular.forEach(list, function (vo3) {
                        if ((vo3.type == 2) && (vo3.pid == vo2._id)) {
                            vo2.twoCat.push(vo3);
                        }
                    });
                });
            }
            return reObj;
        };
    }

})();
