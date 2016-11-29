/**
 * 命名注释：directive简称_myNews. 父模块_dipan . 功能_我的消息 类型_directive .js
 * 使用 ：<div my-news></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('myNews', myNews);
    function myNews() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/myNews.dipan.myNews.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools', 'header'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools, header) {

        var clickType = 'tap';
        tools.trueWeb(function () {
            clickType = 'click';
        }, function () {
            clickType = 'tap';
        });

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
        });
        $scope.list = '';//联系人列表

        init();
        function init() {
            getList();//获取联系人列表,判断是否联系人有列表新消息,
        }

        /**
         *获取联系人列表,判断是否联系人有列表新消息,
         */
        function getList() {
            var uid = '';
            var url = config.host.nodeHost + "/member/getCallList";
            try {
                uid = tools.getLocalStorageObj('userData').uid;
            } catch (e) {
                uid = '';
            }
            tools.postJsp(url, {uid: uid}, true).then(_s);
            function _s(re) {
                if (re.data && re.data.code == 'S') {
                    $timeout(function () {
                        $scope.list = re.data.list;
                        $timeout(function () {
                            bindListClick();//绑定list点击
                        }, 0);
                    }, 0);
                }
            }
        }

        /**
         * 绑定list点击
         */
        function bindListClick() {
            angular.forEach($scope.list, function (vo) {
                document.getElementById(vo.cid).addEventListener(clickType, function () {

                    _click(vo);
                });
            });


            function _click(vo) {

                aleryRead(vo.cid);//请求接口修改 当前用户的当前会话状态

                var userHeader = header.defaultHeader;
                var userId = tools.getLocalStorageObj('userData').uid;
                // * @param gHeader 来宾联系人的头像
                //     * @param gUId 来宾联系人的id
                //     * @param gName 来宾联系人的name
                //     * @param userHeader 用户头像
                //     * @param userId 用户id
                var goObj = {
                    gHeader: vo.userHeader,
                    gUId: vo.gUserId,
                    gName: vo.userNameShow,
                    userHeader: userHeader,
                    userId: userId
                };

                $rootScope.$broadcast('openIm', goObj);
            }

        }

        /**
         * 已经读过的新消息了,请求api 改状态
         */
        function aleryRead(newsId) {
            if (!newsId) {
                return false;
            }
            var uid = '';
            var url = config.host.nodeHost + "/member/myNewsIsRead";
            try {
                uid = tools.getLocalStorageObj('userData').uid;
            } catch (e) {
                uid = '';
            }
            tools.postJsp(url, {uid: uid, cid: newsId}, true).then(_s);
            function _s(re) {
                if (re.data.code == 'S') {
                    console.log(newsId + 'uid' + uid + '会话消息已读');
                    // $rootScope.$broadcast('hideNews');//关闭新消息提示图标
                }
            }
        }
    }
})();
