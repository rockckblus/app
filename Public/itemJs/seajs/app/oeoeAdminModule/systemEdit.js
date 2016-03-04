var tools;
define(function (require) {
    tools = require('./tools');
})

var adminTopNav = function ($scope, $http) {
    $scope.firstCategory = {};//声明一级分类模型
    $scope.twoAddForm = {};//声明二级分类模型
    $scope.firstCategoryReturn = [];//一级分类返回信息
    $scope.firstAdd = '添加';//一级分类添加按钮文字
    $scope.topNavList = {};//一级分类模型

    var getTopNavList = function () {//get 一级分类list
        var url = '/Admin/Seetings/topNavList';
        tools.getJsp($http, url, function (re) {
            $scope.topNavList = re;
        })

    }
    getTopNavList();
    //adminTopNav 页面 表单验证
    $('#firstCategory').form(
        {
            name: {
                identifier: 'name',
                rules: [
                    {
                        type: 'empty',
                        prompt: '请输入分类名'
                    }
                ]
            },
            icon: {
                identifier: 'icon',
                rules: [
                    {
                        type: 'empty',
                        prompt: '请输入图标'
                    }
                ]
            }


        },
        {
            inline: true,
            on: 'blur',
            onSuccess: function () {
                var url = '/Admin/System/add';
                $scope.firstCategory.pid = 0;
                var data = $scope.firstCategory;
                data = $.param(data);
                tools.postApi($http, url, data, function (re) {

                    if (re == 200) {
                        getTopNavList();

                        $scope.firstCategory.name = $scope.firstCategory.name + '-添加成功';
                        var o = {name: $scope.firstCategory.name};
                    } else {
                        $scope.firstCategory.name = $scope.firstCategory.name + '添加失败';
                        var o = {name: $scope.firstCategory.name};
                    }


                    $('#firstCategoryReturn').show();
                    $scope.firstCategory.name = '';//清空name
                    $scope.firstCategory.icon = '';//清空 icon
                    $scope.firstAdd = '继续添加';//一级分类添加按钮文字
                    $scope.firstCategoryReturn.push(o);
                });
            }
        }

    );


    //adminTopNav 添加2级分类 页面 表单验证
    $('#twoAddForm').form(
        {
            name: {
                identifier: 'name',
                rules: [
                    {
                        type: 'empty',
                        prompt: '请输入分类名'
                    }
                ]
            },
            path: {
                identifier: 'path',
                rules: [
                    {
                        type: 'empty',
                        prompt: '请输入链接'
                    }
                ]
            },
            pid: {
                identifier: 'pid',
                rules: [
                    {
                        type: 'checked',
                        prompt: '必须选择一级分类'
                    }
                ]
            }


        },
        {
            inline: true,
            on: 'blur',
            onSuccess: function () {
                var url = '/Admin/Seetings/add';
                var pid = $("input[name='pid']:checked").val();

                $scope.twoAddForm.pid = pid;
                var data = $scope.twoAddForm;
                data = $.param(data);

                tools.postApi($http, url, data, function (re) {
                    re = JSON.parse(re);
                    if (re) {
                        $scope.twoAddForm.name = '';
                        $scope.twoAddForm.path = '';
                        $('#twoCategoryReturn').show().html('添加成功');
                    }

                });
            }
        }

    );





    //编辑页面，当INPUT 失去焦点动作

    var tempVal = '';//声明临时值
    $('.outFocus').focus(function () {
        tempVal = $(this).val();
    });
    $('.outFocus').blur(function () {
        var data = {};
        data._id = $(this).attr('_id');

        var val = $(this).val();
        if(val != tempVal){//判断是否修改过val
            var field = $(this).attr('name');//get 得到字段
            data[field] = val;
            data = $.param(data);
            var url = '/Admin/Seetings/editCategory';
            tools.postApi($http, url, data, function (re) {
                if(re.state == '200'){
                    tools.tsDiv.messDiv('修改成功');
                    getTopNavList();

                }
            })
        }
    })

    //删除导航点击事件
    $('.delNav').click(function(){
        var _this = $(this);
        var navId = $(this).attr('navId');

        var url = '/Admin/Seetings/delNav';
        var data = {};
        data['navId'] = navId;
        data = $.param(data);
        tools.postApi($http, url, data, function (re) {
            if(re.state == '200'){
                tools.tsDiv.messDiv('删除成功');
                _this.closest('.item').hide();

            }
        })
    })


}



