/**
 * 命名注释：directive简称_myKill. 父模块_dipan . 功能_我的技能 类型_directive .js
 * 使用 ：<div my-kill></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('myKill', myKill);
    function myKill() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/myKill.dipan.myKill.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools', 'header', '$q'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools, header, $q) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
        });
        $scope.list = '';//联系人列表
        $scope.errMsg = '';//错误信息

        init();
        function init() {
            $timeout(function () {
                $scope.errMsg = '';
            }, 0);
            getList()//获取list
                .then(bindClick);//bind点击
        }

        function getList() {
            var defer = $q.defer();
            var url = config.host.nodeHost + '/sns/myKill';

            tools.postJsp(url, {uid: tools.getLocalStorageObj('userData').uid})
                .then(_call, _err);
            function _call(re) {
                if (re.data && re.data.code == 'S' && re.data.doc && re.data.doc[0]) {
                    $timeout(function () {
                        $scope.list = re.data.doc;
                        defer.resolve(re.data.doc);
                    }, 0);
                } else {
                    _err('没有数据');
                    $timeout(function () {
                        $scope.list = '';
                    }, 0);
                }
            }

            function _err(err) {
                err = err || '数据获取失败';
                $timeout(function () {
                    $scope.errMsg = err;
                    defer.reject();
                }, 0);
            }

            return defer.promise;
        }

        function bindClick(list) {
            $timeout(function () {
                angular.forEach(list, function (vo) {
                    var domId = 'myKillList_' + vo._id;
                    var domIdEdit = 'myKillListEdit_' + vo._id;
                    var domIdDel = 'myKillListDel_' + vo._id;
                    var domSetMaster = 'setMaster_' + vo._id;
                    tools.bindClick(domId, _bindClick);
                    tools.bindClick(domIdEdit, _bindEdit);
                    tools.bindClick(domIdDel, _bindDel);
                    tools.bindClick(domSetMaster, _bindSetMaster);
                });
                function _bindClick(dom) {//点击
                    var killId = dom.getAttribute('killid');
                }

                function _bindEdit(dom) {//编辑
                    var killId = dom.getAttribute('killid');
                }

                function _bindDel(dom) {//删除
                    var killId = dom.getAttribute('killid');
                    delOneKill(killId);
                }

                function _bindSetMaster(dom) {
                    var killId = dom.getAttribute('killid');
                    setMaster(killId);
                }
            }, 0);
        }

        /**
         * 删除1条技能
         */
        function delOneKill(killId) {

            tools.trueWeb(function () {
                var con = confirm("确定删除此技能吗?");
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
                    title: "确定删除此技能吗?",
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
                var url = config.host.nodeHost + '/sns/delKill';
                tools.postJsp(url, {killId: killId})
                    .then(_call, _err);

                function _call(re) {
                    if (re && re.data && re.data.code == 'S') {
                        defer.resolve();
                    } else {
                        _err('删除技能失败');
                    }
                }

                function _err(err) {
                    err = err || '删除技能失败';
                    defer.reject(err);
                }

                return defer.promise;
            }
        }

        /**
         * 设置主技能
         */
        function setMaster(killId) {
            var url = config.host.nodeHost + '/sns/setMaster';
            tools.postJsp(url, {killId: killId})
                .then(_call, _err);
            function _call(re) {
                if (re && re.data && re.data.code == 'S') {
                    $timeout(function () {
                        init();
                    }, 0);
                } else {
                    _err('设置主技能失败');
                }
            }

            function _err(err) {
                err = err || '设置主技能失败';
                $timeout(function () {
                    $scope.errMsg = err;
                }, 0);
            }

        }
    }
})();
