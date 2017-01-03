/**
 * 命名注释：directive简称_myNeed. 父模块_dipan . 功能_我的需求 类型_directive .js
 * 使用 ：<div my-need></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('myNeed', myNeed);
    function myNeed() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/myNeed.dipan.myNeed.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools', 'header', '$q', '$state'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools, header, $q, $state) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
        });
        $scope.listTypeOne = '';//需求list state正常
        $scope.listTypeTwo = '';//需求list state失效
        $scope.errMsg = '';//错误提示

        init();
        function init() {
            $timeout(function () {
                $scope.listTypeOne = '';
                $scope.listTypeTwo = '';
                $scope.errMsg = '';
            }, 0);
            getList()//获取需求列表
                .then(bindClick);
        }

        function getList() {//获取需求列表
            var defer = $q.defer();
            var url = config.host.nodeHost + '/sns/myNeed';
            tools.postJsp(url, {})
                .then(function (re) {
                    if (re && re.data && re.data.code == 'S' && re.data.doc) {

                        var typeOne = [];
                        var typeTwo = [];
                        angular.forEach(re.data.doc, function (vo) {
                            if (vo.state !== 4) {
                                if (vo.state == 3) {
                                    typeTwo.push(vo);
                                } else {
                                    typeOne.push(vo);
                                }
                            } else {
                                typeTwo.push(vo);
                            }
                        });

                        $timeout(function () {
                            $scope.listTypeOne = typeOne;
                            $scope.listTypeTwo = typeTwo;
                            defer.resolve(re.data.doc);//成功
                        }, 0);
                    } else {
                        defer.reject('获取需求列表失败');
                    }
                }, function (err) {
                    defer.reject('获取需求列表失败');
                });
            return defer.promise;
        }

        function bindClick(list) {
            $timeout(function () {
                angular.forEach(list, function (vo) {
                    var domId = 'myNeedListClick_' + vo._id;
                    var domIdDel = 'myNeedListDel_' + vo._id;
                    tools.bindClick(domId, _bindClick);
                    tools.bindClick(domIdDel, _bindDel);
                });
                function _bindClick(dom) {//点击
                    var needId = dom.getAttribute('needid');
                    goNeedUrl(needId);//跳转到需求详情
                }


                function _bindDel(dom) {//删除
                    var needId = dom.getAttribute('needid');
                    delOneNeed(needId);
                }

            }, 0);

        }


        /**
         * 删除1条需求
         */
        function delOneNeed(needId) {
            tools.trueWeb(function () {
                var con = confirm("确定删除此需求吗?");
                if (con) {
                    _del()
                        .then(function () {
                            $timeout(function () {
                                init();
                            }, 0);
                        }, function (err) {
                            $timeout(function () {
                                $scope.errMsg = err;
                            }, 0);
                        });
                }
            }, function () {
                plus.nativeUI.actionSheet({
                    title: "确定删除此需求吗?",
                    buttons: [{title: "确定"}, {title: "取消"}]
                }, function (e) {
                    if (e.index == 1) {
                        _del()
                            .then(function () {
                                $timeout(function () {
                                    init();
                                }, 0);
                            }, function (err) {
                                $timeout(function () {
                                    $scope.errMsg = err;
                                }, 0);
                            });
                    }
                });
            });


            function _del() {
                var defer = $q.defer();
                var url = config.host.nodeHost + '/sns/delNeed';
                tools.postJsp(url, {needId: needId})
                    .then(_call, _err);

                function _call(re) {
                    if (re && re.data && re.data.code == 'S') {
                        defer.resolve();
                    } else {
                        _err('删除需求失败');
                    }
                }

                function _err(err) {
                    err = err || '删除需求失败';
                    defer.reject(err);
                }

                return defer.promise;
            }
        }

        /**
         * goNeedUrl
         */
        function goNeedUrl(needId) {
            $state.go('orderFromContent', {'orderId': needId, 'type': 'show'});
        }

    }
})();
