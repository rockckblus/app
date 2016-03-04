
seajs.config({
    debug: false,
    charset: function(url) {

        // xxx 目录下的文件用 gbk 编码加载
        if (url.indexOf('http://counter.sina.com.cn/ip/') === 0) {
            return 'gbk';
        }

        // 其他文件用 utf-8 编码
        return 'utf-8';

    }
});

//首页otherJs，会被模板替换，载入对应 Js
seajs.use(["http://www.dipan.so/Public/itemJs/seajs/app/oeoeFront/frontMain2.js", "http://www.dipan.so/Public/itemJs/seajs/app/oeoeFront/item/Home/index.js"], function () {
    angular.element(document).ready(function () {
        angular.bootstrap(window.document, ["oeoe"]);//启动angular

    })
});