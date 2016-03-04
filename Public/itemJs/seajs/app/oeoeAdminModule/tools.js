define({//angular GETJSP方法
    getJsp: function ($http, getMoreUrl, re) {
        $http({method: 'JSONP', url: getMoreUrl + "?callback=JSON_CALLBACK"}).success(function (data) {
            re(data);
        }).error(function (data, status, headers, config) {
//            console.log("error");
        });
    },
    postApi: function ($http, url, data, re) {
        $http({
            url: url,
            method: "post",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        }).success(function (de) {
            re(de);
        }).error(function (de, status, headers, config) {
            console.log('error', status, headers, config);
        })
    },


    //判断空方法
    isEmpty: function (t) {
        return $.trim(t) ? true : false;
    },




    //提示框对象，全站
        messDiv: function (str) {//提示框，出现
            $('#tiShiDiv').show();
            $('#tiShiDiv').html(str);
            setTimeout(function () {
                $('#tiShiDiv').fadeOut(200).html('');
            }, 1000);
        }

})