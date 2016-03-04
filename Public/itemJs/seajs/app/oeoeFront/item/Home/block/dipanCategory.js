/**
 * @fileOverview angular diPanCategory
 *
 */

define(function (require) {

    var g = require('seajs/app/oeoeFront/g');
    var tools = require('seajs/app/oeoeFront/public/tools');

    /**
     *  声明dipanCategory控制器
     *  15-3-14 */
    g.diPanApp.controller('diPanCategory', function ($scope, $http) {
        /** 分类导航对象模型声明 */
        $scope.categoryList = {
            //默认无三级分类的时候判断三级分类不显示
            threeListDivShow: false
        }


        /** 方法对象 */
        var fun = {
            category: {
                showThreeListDiv: function () {
                    var type = $('#thisKeyCatId').attr('data-threeListType');
                    if (type != '1') {
                        $scope.categoryList.threeListDivShow = true;
                    }
                }
            },

            ui: {
                //				划过导航下面的地区对应下拉选项
                showArea: function () {
                    $('.areaShow').hover(function () {
                        $(this).find('.othrerCityAlertDiv').show();
                    }, function () {
                        $(this).find('.othrerCityAlertDiv').hide();
                    })
                }
            }
        }


        /** 默认执行方法 */
        var startFun = function () {

            //加载 ui jquery
            fun.ui.showArea();

            //判断分类级别显示是否有 三级分类
            fun.category.showThreeListDiv();
        }
        startFun();


    });


    /**
     * 声明加入地盘点击事件控制器
     * 15-7-18 */
    g.diPanApp.controller('classTitle', function ($scope, $http) {
        var fun = {
            /**
             * 判断session 登录
             * 15-7-18 */
            tureLogin: function () {
                if (tools.getCookie('isLogin') == 'ture') {
                    return true;
                }
            }
        }
        $scope.fun = {
            joinClick: function () {
                /**
                 * 判断是否登录
                 * 15-7-18 */
                if(fun.tureLogin()){
                   alert(1) ;
                }else{
                    /**
                     * 记录cookie，
                     * 15-7-20 */ 
                    alert(3);
                }
            }
        }

    })


});


/**
 * *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */