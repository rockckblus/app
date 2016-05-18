define({//angular GETJSP方法
    getJsp: function ($http, getMoreUrl, re) {
        $http({method: 'JSONP', url: getMoreUrl + "?callback=JSON_CALLBACK"}).success(function (data) {
            re(data);
        }).error(function (data, status, headers, config) {
//            console.log("error");
            });
    },
    getFour:function(oMap){
        var defaultFour = oMap.getBounds();
        var arr = [//上右下左
            defaultFour.lat.maxY.toFixed(5),
            defaultFour.lng.maxX.toFixed(5),
            defaultFour.lat.minY.toFixed(5),
            defaultFour.lng.minX.toFixed(5)
        ];
            console.log('arr',arr);
    }

})