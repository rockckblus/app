/**
 * 命名注释：directive简称_lianXiang. 父模块_block. 功能_search联想下拉div,类型_directive .js
 * 使用 ：<div lian-xiang></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('lianXiang', lianXiang);

    function lianXiang() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/lianXiang.block.searchLianXiang.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }


    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', '$state', 'tools', 'config'];

    function thisController($scope, $rootScope, $timeout, localData, $state, tools, config) {
        var isShowLianXian = false;//判断是否需要显示联想
        $scope.lianXianShow = false;// 显示联想
        $scope.$on('showLianXianShow', showLianXianShow);//监听显示联想
        $scope.$on('hideLianXianShow', hideLianXianShow);//监听隐藏联想

        $scope.list = [];//联想的 关键词list
        $scope.$on('getKeyList', getKeyList);//监听发送来的搜索事件,传入key去取联想数据


        $scope.$on('changeBody', function () {
            init();
        });

        function init() {
            trueIsShowLianXian();//判断是否需要显示联想
        }

        //判断是否需要显示联想
        function trueIsShowLianXian() {
            $timeout(function () {
                var name = $state.current.name;
                if (name == 'home') {
                    isShowLianXian = true;
                }
            }, 0);
        }

        function getKeyList(v, k) {
            var key;
            if (!k) {
                key = '';
            } else {
                key = k;
            }
            var url = config.host.nodeHost + '/key/lianXiangKey';

            tools.saveLocalStorageObj('searchKey', key);//存入searchKey 去组合查询条件 如果返回 homeList的 数据,再清空此字段
            tools.postJsp(url, {key: key}, true).then(_call);
            function _call(re) {
                $timeout(function () {
                    if (re.data && re.data.doc && re.data.code == "S") {
                        $scope.list = re.data.doc;
                        $timeout(function () {
                            _bindKeyClick();
                        }, 0);
                    }
                }, 0);
            }
        }

        /**
         * bind 关键词的click事件
         */
        function _bindKeyClick() {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
                type = 'tap';
            });

            angular.forEach($scope.list, function (vo) {
                document.getElementById('key_' + vo._id).addEventListener(type, _bindKeyClick);
            });

            function _bindKeyClick(dom) {
                var text = dom.target.innerHTML;
                $rootScope.$broadcast('giveSearch', text);
            }
        }


        /**
         * 显示联想
         */
        function showLianXianShow() {
            $timeout(function () {
                if (isShowLianXian) {
                    $scope.lianXianShow = true;// 显示联想
                }
            }, 0);
        }

        /**
         * 隐藏联想
         */
        function hideLianXianShow() {
            $timeout(function () {
                $scope.lianXianShow = false;// 显示联想
            }, 0);
        }
    }

})();