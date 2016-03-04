define(function (require) {
    var g = require('./g');//声明全局变量
    document.domain = 'dipan.so';//跨框架共享声明


    var publicJquery = require('./public/publicJquery');//publicJquery


    var tools = require('./public/tools');
    var ieTrue = function () {
        setTimeout(function () {
            tools.ie7True();//判断 低于ie7 跳转
        }, 1000);
    };

    ieTrue();

    //public angular
    g.oeoeApp.controller('oeoeBody', function ($scope, $http) {



        //全部angular oeoeBody 公共 方法
        var allOeoeBodyFun = {

            //get全国城市，按照abcd
            getAllCityData:function(re1){
                var url = g.apiUrl + 'Api/Jsonp/getAllCity/';
                tools.getJsp($http,url,function(re){
                    re1(re);
                })
            }
        }









//            //开发阶段 判断 cookie
//        var cookIeTrue = function(){
//            var url = 'http://oeoe.cc:8080/Home/Index/getCookIe';
//            tools.getJsp($http,url,'',function(re){
//                if(re.getCookIe == 0){
//                    window.location.href = 'http://oeoe.cc:8080/404.html'
//                }
//            })
//        };
//        cookIeTrue();


            $scope.$watch('$viewContentLoaded', function(){//angular 载入完成后。显示modle值
                $('.angularEnd').show();
            });







        $scope.mac = '';
        var str = tools.macTrue();//判断 pc mac
        if (str == 'pc') {
            $scope.mac = 'pc'
        } else if (str == 'mac') {
            $scope.mac = 'mac'
        }






        $scope.allCityData = '';//全部城市模型

        var cityHover = function(){
            //城市划过事件
            $('.allCityHover').hover(function(){
                $('.allCityHover').css('backgroundColor','#fff');
                $(this).css('backgroundColor','#F2F5E9');
            });

            //城市 li 项目 划过 事件
            $('.allCityHover').find('.hackHover').hover(function(){
                $(this).css({'backgroundColor':'#6A8B82','color':'#fff'});
            },function(){
                $(this).css({'backgroundColor':'','color':''});
            })
        };

        //切换城市点击事件
        $scope.qieHuanClick = function(){
            tools.showGai();
            $('.allCity').show();
            allOeoeBodyFun.getAllCityData(function(re){
                console.log('re',re);
                $scope.allCityData = re;
                setTimeout(function(){
                    cityHover();
                },0)

            })
        };



        //传播到子控制器（topSearch，topTagNav）
        var sunTopSearch = {
            allCitytwoCityClick:function(d){
                $scope.$broadcast('oeoeBodyAllCitytwoCityClick',d);
            }
        };


        //接收首次无cookie载入给2级城市方法
        $scope.$on('setNoCookIeGiveTwoCity',function(event,data){
            $scope.$broadcast('oeoeBodyAllCitytwoCityClick',data);
        })

        //切换城市 城市点击事件
        $scope.allCitytwoCityClick = function(target){
            tools.hideGai();
            $('.allCity').hide();
            var t = $(target);
            sunTopSearch.allCitytwoCityClick(t.attr('name'));//修改默认城市
            defaultFaoc();//搜索框默认焦点
            clearSearch();//清空搜索框
        }







    });


});