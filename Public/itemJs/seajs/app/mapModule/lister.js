
define({
//监听模块，传入 地图对象，和监听到动作后的方法
//返回一个监听地图对象
    mapAddLister: function (oMap, fun) {
        var listerObj = new qq.maps.event.addListener(oMap, 'idle', fun);
        return listerObj;
    },
//移除监听
    removeListener: function(oMap){
       qq.maps.event.removeListener(oMap);
   }
})