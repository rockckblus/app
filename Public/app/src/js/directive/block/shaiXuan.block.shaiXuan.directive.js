/**
 * 命名注释：directive简称_shaiXuan. 父模块_block. 功能_筛选block,类型_directive .js
 * 使用 ：<div sub-from></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('shaiXuan', shaiXuan);

    function shaiXuan() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/shaiXuan.block.shaiXuan.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }


    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', '$state', 'tools'];

    function thisController($scope, $rootScope, $timeout, localData, $state, tools) {
        $scope.shaiXuanList = '';//筛选list data
        $scope.clickThis = clickThis;//筛选点击事件
        var clcikSaiXuanArr = [];//点击筛选数组

        $scope.show = {
            one: false,
            two: false,
            three: false,
        };//显示对应面板
        $scope.$on('changeBody', function () {
            init();
        });

        init();
        function init() {
            _getClickSaiXuanDb();//获取筛选数组
            getList();
        }


        /**
         * 给筛选赋值
         */
        function getList() {
            $timeout(function () {
                var url = $state.current.url;
                var list = localData.shaiXuan(url);
                angular.forEach(list, function (vo, index) {
                    angular.forEach(vo, function (vo2, index2) {
                        if (index2 === 0) {
                            vo.thisName = vo2.name;
                            vo.thisId = vo2.id;

                            if (clcikSaiXuanArr.indexOf(vo2.id) == -1) {
                                vo.shaiXuanGaoLiang = '';//不在记录数组,就不给高亮
                            } else {
                                vo.shaiXuanGaoLiang = 'shaiXuanGaoLiang';//在记录数组里面,给高亮
                            }
                            bindClickId(index, vo.thisId);
                        }
                    });
                });
                $scope.shaiXuanList = list;
            }, 0);
        }

        /**
         * 获取筛选数组
         * @private
         */
        function _getClickSaiXuanDb() {
            var clcikSaiXuanArrTemp = tools.getLocalStorageObj('clickShaiXuan');
            if (clcikSaiXuanArrTemp) {
                clcikSaiXuanArr = clcikSaiXuanArrTemp;
            }
        }

        /**
         * bind 筛选点击 dom
         */
        function bindClickId(index) {
            $timeout(function () {
                var idStr = "shaiXuanClick_" + index;
                console.log('idStar', idStr);
                try {
                    var idClickDom = document.getElementById(idStr);
                    idClickDom.addEventListener('tap', function () {
                        var idDom = angular.element(idClickDom);
                        console.log('idDom', idDom);
                        var thisId = idDom.attr('thisid');
                        clickThis(index, thisId);
                    });
                } catch (e) {
                    console.log('id不存在');
                }
            }, 0);

        }


        /**
         * 筛选点击事件,传入 index
         * @param index
         */

        function clickThis(index, thisId) {
            angular.forEach($scope.shaiXuanList[index], function (vo, index2) {
                var long = $scope.shaiXuanList[index].length;
                var getIndex;
                if (vo.id == thisId) {
                    if ((index2 + 1) == long) {
                        getIndex = 0;
                    } else {
                        getIndex = index2 + 1;
                    }

                    $timeout(function () {
                        $scope.shaiXuanList[index].thisName = $scope.shaiXuanList[index][getIndex].name;
                        $scope.shaiXuanList[index].thisId = $scope.shaiXuanList[index][getIndex].id;
                        if ($scope.shaiXuanList[index].shaiXuanGaoLiang == 'shaiXuanGaoLiang') {
                            $scope.shaiXuanList[index].shaiXuanGaoLiang = '';

                            var tempIndex = clcikSaiXuanArr.indexOf($scope.shaiXuanList[index].thisId);
                            if (tempIndex != -1) {
                                clcikSaiXuanArr.splice(tempIndex, 1);
                                tools.saveLocalStorageObj('clickShaiXuan', clcikSaiXuanArr);//存储本地数据库
                            }
                        } else {
                            var type = $scope.shaiXuanList[index][0].type;
                            angular.forEach($scope.shaiXuanList, function (vo, index2) {
                                if (vo[0].type == type) {
                                    $scope.shaiXuanList[index2].shaiXuanGaoLiang = '';
                                    var tempIndex = clcikSaiXuanArr.indexOf(vo[0].id);
                                    if (tempIndex != -1) {
                                        clcikSaiXuanArr.splice(tempIndex, 1);
                                        console.log('cl', clcikSaiXuanArr);
                                    }
                                }
                            });
                            $scope.shaiXuanList[index].shaiXuanGaoLiang = 'shaiXuanGaoLiang';
                            clcikSaiXuanArr.push($scope.shaiXuanList[index].thisId);
                            tools.saveLocalStorageObj('clickShaiXuan', clcikSaiXuanArr);//存储本地数据库
                        }
                    }, 0);

                }
            });
        }


    }

})();