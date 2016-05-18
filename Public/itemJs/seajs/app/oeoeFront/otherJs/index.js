
seajs.config({
    debug: false
});

//首页otherJs，会被模板替换，载入对应 Js
seajs.use(["http://www.dipan.so/Public/itemJs/seajs/app/oeoeFront/frontMain.js", "http://www.dipan.so/Public/itemJs/seajs/app/oeoeFront/item/Home/index.js"], function () {
    angular.element(document).ready(function () {
        angular.bootstrap(window.document, ["oeoe"]);//启动angular
    })
});