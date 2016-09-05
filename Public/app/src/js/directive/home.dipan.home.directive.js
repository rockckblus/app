/**
 * 命名注释：directive简称_home. 父模块_dipan. 功能_首页模块 类型_directive .js
 * 使用 ：<div home></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('home', home);

    function home() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/home.dipan.home.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'update', 'config', 'compile','$state'];

    function thisController($scope, $rootScope, $timeout, tools, update, config, compile,$state) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        $scope.list = []; //默认首页 列表 数据,


        $scope.text = 1111;
        /*************************
         * todo
         * 默认读取上次的缓存 数据, 然后 再异步更新 到 最新数据
         * 16/8/19 上午7:45 ByRockBlus
         *************************/
        giveDefaultList();


        mui.plusReady(function () {
            function _bind() {
                mui('#list').on('tap', '.iconStar', function () {
                    var _this = angular.element(this);
                    var id = _this.attr('iconId');
                    reForList(id);
                });
            }

            //滚动到底事件
            document.addEventListener('plusscrollbottom', function () {
                alert(11);
            }, false);
            _bind();
        });


        /**
         * 重新给 list
         * @param id
         */
        function reForList(id) {
            console.log('id', id);
            angular.forEach($scope.list, function (vo) {
                if (vo.id == id) {
                    if (vo.iconStar == 'fa-star-o') {
                        $timeout(function () {
                            vo.iconStar = 'fa-star';
                        }, 0);
                    } else if (vo.iconStar == 'fa-star') {
                        $timeout(function () {
                            vo.iconStar = 'fa-star-o';
                        }, 0);
                    }
                }
            });
        }


        //var url = 'http://city.5656111.com/Member/GetAjax/get_union_user_list/begin_city/%E5%A4%A9%E6%B4%A5';
        //tools.postJsp(url, {}).then(call, err);

        function call(re) {
            $timeout(function () {
                $scope.list = re.data.list;
            }, 0);
        }

        function err() {
            tools.alert({
                title: '网络请求失败',
                content: '请检查网络'
            });
        }

        /*************************
         * 默认读取上次的缓存 1数据, 然后 再异步更新 到 最新数据 todo
         * 16/8/19 上午7:48 ByRockBlus
         *************************/
        function giveDefaultList() {
            var obj =
                [
                    {
                        id: 1,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 2,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                            内容: '扣扣水电费 ,送福利卡士大夫阿萨德法师打发斯蒂芬,啊扫地理发卡思考的浪费阿斯蒂芬,,按时到付款了  扩散到付款'
                        },

                    },
                    {
                        id: 3,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 4,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 5,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 6,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 7,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 8,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 9,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 10,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 11,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 12,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                    {
                        id: 13,
                        listHeader: 'https://avatars1.githubusercontent.com/u/3006580?v=3&s=40',
                        title: 'titleTest1,titleTest1titleTest1titleTest1',
                        iconStar: 'fa-star-o',
                        content: {
                            姓名: 1,
                            电话: 222,
                        },

                    },
                ];

            $scope.list = obj;
            //tools.saveLocalStorageObj();
            console.log('s',$state);

            $scope.text = 2222;

        }


        /*************************
         * // 滚动到 底部 的 触发动作 test todo
         * 16/8/19 上午7:47 ByRockBlus
         *************************/
        $scope.a = function () {
            tools.alert({
                title: '这是标题',
                content: '内容 '
            });
        };
    }
})();