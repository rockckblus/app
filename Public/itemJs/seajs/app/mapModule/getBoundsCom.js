define({
    getBoundsCom:function(oMap){
                var defaultFour = oMap.getBounds();
//            console.log('getBounds300033',defaultFour);
                var arr = [//上右下左
                    defaultFour.lat.maxY.toFixed(5),
                    defaultFour.lng.maxX.toFixed(5),
                    defaultFour.lat.minY.toFixed(5),
                    defaultFour.lng.minX.toFixed(5)
                ];
                 return arr;
    }
})