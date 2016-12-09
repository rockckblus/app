/**
 * 命名注释：directive简称_area. 父模块_dipan. 功能_选择地区页面 类型_directive .js
 * 使用 ：<div area></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('area', area);

    function area() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/area.dipan.areaSelect.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'getCity', '$state'];

    function thisController($scope, $rootScope, $timeout, tools, getCity, $state) {

        $scope.thisCity = {'name': '', 'cityCode': '', 'location': ''};
        $scope.showArea = false;//显示地区选择div
        $scope.showAreaFujin = true;//显示附近div
        $scope.shengRep = [
            {id: 1, name: '广东', type: 'sheng', 'searchStr': '广东省'},
            {id: 2, name: '江苏', type: 'sheng', 'searchStr': '江苏省'},
            {id: 3, name: '浙江', type: 'sheng', 'searchStr': '浙江省'},
            {id: 4, name: '四川', type: 'sheng', 'searchStr': '四川省'},
            {id: 5, name: '河南', type: 'sheng', 'searchStr': '河南省'},
            {id: 6, name: '河北', type: 'sheng', 'searchStr': '河北省'},
            {id: 7, name: '山东', type: 'sheng', 'searchStr': '山东省'},
            {id: 8, name: '湖南', type: 'sheng', 'searchStr': '湖南省'},
            {id: 9, name: '湖北', type: 'sheng', 'searchStr': '湖北省'},
            {id: 10, name: '安徽', type: 'sheng', 'searchStr': '安徽省'},
            {id: 11, name: '辽宁', type: 'sheng', 'searchStr': '辽宁省'},
            {id: 12, name: '吉林', type: 'sheng', 'searchStr': '吉林省'},
            {id: 14, name: '陕西', type: 'sheng', 'searchStr': '陕西省'},
            {id: 15, name: '山西', type: 'sheng', 'searchStr': '山西省'},
            {id: 22, name: '江西', type: 'ziZhi', 'searchStr': '江西省'},
            {id: 16, name: '福建', type: 'sheng', 'searchStr': '福建省'},
            {id: 17, name: '甘肃', type: 'sheng', 'searchStr': '甘肃省'},
            {id: 18, name: '贵州', type: 'sheng', 'searchStr': '贵州省'},
            {id: 19, name: '云南', type: 'sheng', 'searchStr': '云南省'},
            {id: 20, name: '海南', type: 'sheng', 'searchStr': '海南省'},
            {id: 21, name: '青海', type: 'sheng', 'searchStr': '青海省'},
            {id: 23, name: '宁夏', type: 'ziZhi', 'searchStr': '宁夏回族自治区'},
            {id: 24, name: '新疆', type: 'ziZhi', 'searchStr': '新疆维吾尔自治区'},
            {id: 25, name: '内蒙', type: 'ziZhi', 'searchStr': '内蒙古自治区'},
            {id: 26, name: '西藏', type: 'ziZhi', 'searchStr': '西藏自治区'},
            {id: 27, name: '广西', type: 'ziZhi', 'searchStr': '广西壮族自治区'},
            {id: 13, name: '黑龙江', type: 'sheng', 'searchStr': '黑龙江省'},
        ];
        $scope.thisSheng = [];
        $scope.thisShengShow = false;//省下面城市alertDiv
        $scope.$on('showArea', showArea);//监听打开areaDiv事件
        $scope.$on('hideArea', hideArea);//监听关闭areaDiv事件

        bindSelectAreaBtn();//绑定选择area点击事件
        function init() {
            getDefault();//获取默认本地存储的地址信息
            $timeout(function () {
                bindShengDomClick();//绑定省名
                bindHotCity();//绑定热门城市点击事件
                bindCloseShengSub();//绑定省下面的子城市面板的 close 按钮
            }, 0);
        }

        /**
         * getDefault 获取默认城市
         */
        function getDefault() {
            var re = {};
            var area = tools.getLocalStorageObj('area');
            if (area) {
                re.name = area.city.city;
                re.cityCode = area.city.cityCode;
                re.location = area.gpsObj.lng + ',' + area.gpsObj.lat;
            } else {
                re.name = '全国';
                re.cityCode = '000';
                re.location = '116.405285,39.904989';
            }
            $timeout(function () {
                $scope.thisCity = re;
            }, 0);
        }

        /**
         * 监听打开areaDiv事件
         */
        function showArea(k, v) {
            // getCity.inTable();//接口请求 城市数据,写入数据库
            $timeout(function () {
                $scope.showArea = true;
                if (v) {
                    $scope.showAreaFujin = false;
                }
                init();//执行绑定
            }, 0);
        }

        /**
         * 监听关闭areaDiv事件
         */
        function hideArea() {
            $timeout(function () {
                $scope.showArea = false;
            }, 0);
        }

        /**
         * 绑定选择area点击事件
         */
        function bindSelectAreaBtn() {
            var bindBtn = document.getElementById('topSearchLeft');
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
                type = 'tap';
            });

            bindBtn.addEventListener(type, _bind);

            function _bind() {
                $rootScope.$broadcast('showArea');
                $rootScope.$broadcast('blurSearch');
            }
        }

        /**
         * 绑定省份选择点击事件
         */
        function bindShengDomClick() {
            var index = 0;
            angular.forEach($scope.shengRep, function (vo) {
                if (index < 27) {
                    index++;
                    var tempId = 'shengRep_' + index;
                    var dom = document.getElementById(tempId);
                    _bind(dom);
                }
            });
            function _bind(dom) {
                var type = 'tap';
                tools.trueWeb(function () {
                    type = 'click';
                }, function () {
                    type = 'tap';
                });
                dom.addEventListener(type, function () {
                    _showSubContent(dom);//显示SubCounte
                });
            }
        }

        /**
         * 显示SubCounte
         */
        function _showSubContent(dom) {
            var aDom = angular.element(dom);
            $rootScope.$broadcast('openLoading');
            getCity.selectByCityCode(aDom.attr('nameid')).then(_show);
            function _show(row) {
                $rootScope.$broadcast('closeLoading');
                $timeout(function () {
                    $scope.thisShengShow = true;
                    angular.forEach(row, function (vo) {
                        vo = _editText(vo);
                        $scope.thisSheng.push(vo);
                    });

                    $timeout(function () {
                        try {
                            _bindThisShengClick();//绑定点击
                        } catch (e) {
                            console.log('无法绑定子城市点击事件');
                        }
                    }, 0);

                }, 0);
            }

            function _bindThisShengClick() {
                angular.forEach($scope.thisSheng, function (vo2) {
                    var dom = document.getElementById('shengSubRep_' + vo2._id);
                    var type = 'tap';
                    tools.trueWeb(function () {
                        type = 'click';
                    }, function () {
                        type = 'tap';
                    });
                    dom.addEventListener(type, function () {
                        _bindCityClick(dom);
                    });
                });
            }

            function _editText(v) {
                try {
                    v.city = v.city.replace('市', '');
                    v.city = v.city.replace('自治州', '');
                    v.city = v.city.replace('地区', '');
                } catch (e) {
                    console.log('noV.city');
                }
                return v;
            }
        }

        /**
         * 绑定热门城市click
         */
        function bindHotCity() {
            var hostList = document.getElementsByClassName('hotCity');
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
                type = 'tap';
            });
            angular.forEach(hostList, function (vo) {
                vo.addEventListener(type, function () {
                    _bindCityClick(vo);
                });
            });
        }

        /**
         * bind城市click (hot & shengSub)
         * @param vo
         * @private
         */
        function _bindCityClick(vo) {
            $timeout(function () {
                $scope.thisCity.name = vo.innerText;
                $scope.thisCity.cityCode = vo.getAttribute('code');
                $scope.thisCity.location = vo.getAttribute('location');
                saveLocalArea();
                closeThisShengShow();
            }, 0);
        }

        /**
         * 绑定子城市显示div关闭按钮点击事件
         */
        function bindCloseShengSub() {
            var dom = document.getElementById('closeAlertSub');
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
                type = 'tap';
            });
            dom.addEventListener(type, function () {
                closeThisShengShow(true);
            });
        }

        /**
         * 写入本地缓存gps信息
         */
        function saveLocalArea() {
            var location = $scope.thisCity.location;
            var gpsObj = {};
            var tempGpsObj = location.split(',');
            gpsObj.lat = tempGpsObj[1];
            gpsObj.lng = tempGpsObj[0];

            var obj = {
                gpsObj: gpsObj,
                city: {
                    "city": $scope.thisCity.name,
                    "cityCode": $scope.thisCity.cityCode
                }
            };
            tools.saveLocalStorageObj('area', obj);//存储
            $timeout(function () {
                $rootScope.$broadcast('changeArea');//广播变换地址事件
            }, 400);
        }

        /**
         * 关闭省下面城市显示alertDiv
         */
        function closeThisShengShow(sub) {
            $timeout(function () {
                $scope.thisSheng = [];
                $scope.thisShengShow = false;//省下面城市alertDiv
                if (!sub) {//如果 不是 点击关闭按钮的调用
                    $rootScope.$broadcast('hideArea');//关闭地区alert
                    if ($state.current.name == 'home') {
                        $rootScope.$broadcast('focusSearch');//焦点搜索框
                    }
                }
            }, 0);
        }

    }

})();