define(function (require) {
    document.domain = 'dipan.so';//跨框架共享声明
    require('http://www.dipan.so:8080/Public/publicDefault/angular.min.js');//angular
    require('/Public/semantic/javascript/semantic.min.js');//semantic

    var tools = require('./oeoeAdminModule/tools');


//    angular
    var sosoApp = angular.module('myOeoeApp', []);
    sosoApp.controller('oeoeBody', function ($scope, $http) {
        $('.ui.dropdown').dropdown();//声明下拉菜单
        $('.ui.radio.checkbox').checkbox();//声明单选,多选
        //后台顶部导航js
        //获取当前网址，遍历 top导航的链接地址以便高亮
        var thisUrl = window.location.href;
        thisUrl = thisUrl.split('/');
        thisUrl = '/' + thisUrl[3] + '/' + thisUrl[4] + '/' + thisUrl[5];
        //遍历 top导航的链接地址以便高亮 方法
        function showThisTopNav() {


            $('.sub.menu .item').each(function () {
                    var aa = $(this).attr('href');
                    if (aa == thisUrl) {
                        $('.sub.menu').hide();
                        $(this).parent('div').show();
                        $('#headerNav').find('a').removeClass('active');

                        var subMenu = $(this).parent('div').attr('itemCount');

                        $('#headerNav .item').each(function () {

                            var bb = $(this).attr('itemCount');
                            if (bb == subMenu) {
                                $(this).addClass('active');

                            }


                        });
                        $(this).addClass('active');

                    }
                }


            )
        }

        showThisTopNav();
        //top导航划过动作
        $('#headerNav .item').hover(
            function () {
                $('#headerNav').find('a').removeClass('active');
                $(this).addClass('active');
                var count = $(this).attr('itemCount');
                $('.sub.menu').hide();
                $('#Subitem' + count).show();

            },
            function () {
            })
        $('#headerNavOutDiv').hover('', function () {
            showThisTopNav();

        })

        //登录页面JS
        $('#formLogin').form(
            {
                name: {
                    identifier: 'name',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入用户名'
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '密码不能为空'
                        },
                        {
                            type: 'length[6]',
                            prompt: '密码长度不能小于6位'
                        }
                    ]
                }


            },
            {
                inline: true,
                on: 'blur',
                onSuccess: function () {
                    var userName = $('#name').val();
                    var passWord = $('#password').val();
                    var loginUrl = '/Dwz/Index/loginIn/userName/' + userName + '/passWord/' + passWord;

                    console.log('url', loginUrl);

                    tools.getJsp($http, loginUrl, function (re) {

                        if (re.state != '200') {
                            $('#successMess').css('backgroundColor', '#fcebe1').html('用户名或密码错误').show().transition('tada');
                        } else {
                            $('#successMess').css('backgroundColor', '#eefbe5').html('登录成功，跳转到会员中心').show().transition('tada');
                            setTimeout(function () {
                                window.location.href = '/Dwz/Index/index';
                            }, 2000);

                        }


                    })

                }
            }

        );


        //后台全局公共数据
        $scope.goldData = {};
        var goldDataUrl = '/Admin/Index/getJspGoldData';
        tools.getJsp($http, goldDataUrl, function (re) {
            console.log(re);
            $scope.goldData = re;
        })

//++++++++++++++++++++++++++++++++++++++
        //公共jquery
        $('.close.icon').click(function () {//关闭信息提示图标点击动作
            tools.tsDiv.coloseMessDiv();
        });

        //left增加。修改 删除 按钮 点击事件
        $('.leftClickButton').click(function () {//left 公共click方法
            var clickId = $(this).attr('id');
            $('.showPan').hide();
            $('#leftNavAction').find('a').removeClass('active');

            switch(clickId)
            {
                case 'addButton'://添加按钮
                    $('#uiAdd').show();
                    break;
                case 'editButton'://修改按钮
                    $('#uiEdit').show();
                    break;
                case 'delButton'://删除按钮
                    $('#uiDel').show();
                    break;
                default:
                    tools.tsDiv.messDiv('click方法不存在');
            }

            $(this).addClass('active');
        });


//++++++++++++++++++++++++++++++++++++++ 公共JQUERY end


    })
});