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

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config', 'tools'];

    function thisController($scope, $rootScope, $timeout, localData, config, tools) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');//默认读取缓存用户数据
        });

        init();
        function init() {
            aleryRead();//已经读过新消息了,请求api 改状态
        }

        /**
         * 已经读过新消息了,请求api 改状态
         */
        function aleryRead() {
            var uid = '';
            var url = config.host.nodeHost + "/member/myNewsIsRead";
            try {
                uid = tools.getLocalStorageObj('userData').uid;
            } catch (e) {
                uid = '';
            }
            tools.postJsp(url, {uid: uid}, true).then(_s);
            function _s(re) {
                if (re.data.code == 'S') {
                    $rootScope.$broadcast('hideNews');//关闭新消息提示图标
                }
            }
        }

    }
})();
