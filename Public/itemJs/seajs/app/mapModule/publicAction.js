define(function (require) {

    var getBoundsCom = require('./getBoundsCom');//GET4点坐标
    var returnFourArr = {
        one: function (oMap) {//todo
            var fourArr = getBoundsCom.getBoundsCom(oMap);
            console.log('oMap', oMap);
            return fourArr;
        }
    }
    return{
        pub: returnFourArr//返回4点坐标数组
    }

})