//创建一个soso地图
define({
    init: function (lat, lng) {
        var map = new qq.maps.Map(document.getElementById("container"), {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(lat, lng),
            zoom: 9,
            scrollwheel: false,//缩放鼠标滚轮停用
            disableDoubleClickZoom: true,
            maxZoom: 11,
            minZoom: 6
        });

        return map;
    }
})
