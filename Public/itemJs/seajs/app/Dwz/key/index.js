define(function (require) {
    var g = require('/Public/itemJs/seajs/app/Dwz/g');
    var tools = require('/Public/itemJs/seajs/app/oeoeAdminModule/tools');
    require('./filter');//载入angular公用过滤器
    g.app.controller('key', function ($scope, $http, $filter) {
        //声明关键词列表模型
        $scope.keyList;//按分类
        $scope.keyListSearch;//按搜素

        $scope.catName = 'name';
        $scope.key = '';//关键词编辑模型
        $scope.temp = '';
        $scope.level = '';//添加关键词level
        $scope.clickCatId = '';//添加关键词分类ID


        $scope.clickItem = function (target, dataName) {
            $scope.keyList = '';//按分类
            $scope.key = '';//关键词编辑模型
            $scope.temp = target;

            var t = $(target);
            $('.sonDiv').hide();
            t.addClass('thisNavTopItem');
            var catId = t.attr('vid');
            $scope.clickCatId = catId;
            if (catId) {
                var url = '/Api/JsonpAdmin/getKey/catId/' + catId + '/dataName/' + dataName;
                tools.getJsp($http, url, function (re) {
                    console.log(re);
                    $scope.keyList = re;
                    $scope.catName = re.catName.name;
                    $scope.catId = re.catName._id;
                    if (re.catName.name) {
                        $scope.level = '';
                    }

                })
            }

        };

        $scope.showSonDiv = function (target) {
            $('.sonDiv').hide();
            var t = $(target);
            t.find('.sonDiv').show();
        }

        $scope.sonHover = function (target) {
            $('.sonSonDiv').hide();
            var t = $(target);
            t.find('.sonSonDiv').show();
        }

        $scope.getKey = function (target, dataName) {
            console.log('dataName',dataName);
            var t = $(target);
            var id = t.attr('vId');
            if (id) {
                var url = '/Api/JsonpAdmin/getKeyInfo/id/' + id;
                tools.getJsp($http, url, function (re) {
                    console.log('topRe',re);
                    $scope.clickCatId = re.categoryCid;
                    $filter('getAttrById')(re.parentKeyId, 'key', 'name', $http, function (d) {
                        if (d) {
                            re.parentKeyId = d;
                            $filter('getAttrBy_Id')(re.categoryCid, dataName, 'name', $http, function (e) {
                                re.categoryCid = e;
                                $scope.key = re;
                                console.log('re', re);
                                $scope.level = '2';

                            })
                        } else {
                            tools.messDiv('获取信息失败');
                        }

                    });

                });
            } else {
                tools.messDiv('获取信息失败')
            }

        }

        //修改点击事件
        $scope.editKey = function () {
            var id = $('#keyId').val();
            var name = $('#keyName').val();
            if (tools.isEmpty(name)) {
                var url = '/Api/JsonpAdmin/editKeyInfo/id/' + id + '/name/' + name;

                tools.getJsp($http, url, function (re) {
                    if (re.status == 200) {
                        tools.messDiv('修改成功');
                        $scope.clickItem($scope.temp);
                    }
                    ;
                })
            }
        }

        //删除关键词
        $scope.delKey = function () {
            var id = $('#keyId').val();
            var url = '/Api/JsonpAdmin/delKeyInfo/id/' + id;
            console.log('url', url)
            tools.getJsp($http, url, function (re) {
                console.log('delre', re);
                if (re.status == 200) {
                    tools.messDiv('删除成功');
                    $scope.clickItem($scope.temp);
                } else if (re.status == 201) {
                    tools.messDiv('主关键词下有子关键词');
                } else {
                    tools.messDiv('删除失败');
                }
            })
        }


        //搜索
        $scope.searchKey = '';
        $scope.searchClick = function (dataName) {
            $scope.keyList = '';//按分类
            $scope.key = '';//关键词编辑模型
            if (!tools.isEmpty($scope.searchKey)) {
                tools.messDiv('关键词不能为空');
                return false;
            }
            var k = $scope.searchKey;
            var url = '/Api/JsonpAdmin/searchKey/key/' + k + '/dataName/' + dataName;
            console.log(url);
            tools.getJsp($http, url, function (re) {
                if (re.status == 200) {
                    $scope.keyListSearch = re;
                } else {
                    tools.messDiv(re.msg);
                    return false;
                }
            });
        }

        /** 判断网址传不同数据库名称 15-3-13 */
       function getUrlAciton() {
          var url = window.location.href;
            url = url.split('/');
            return url[5];
       }
        /** 监听回车 15-3-13 */
        document.onkeydown = function(e) {
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            //var activeElementId = document.activeElement.id;//当前处于焦点的元素的id
            //if (code == 13 && activeElementId == "input_id") {
            if (code == 13) {
                var ac = getUrlAciton();
                if(ac == 'angularIndexZhaoPin'){
                $scope.searchClick('categoryzhaopin');
                }
                if (ac == 'angularIndex'){
                   $scope.searchClick('categoryService') ;
                }
                return false;
            }
            return true;
        }
    })

})
