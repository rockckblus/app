/**
 * update.block.getJsCss.factory.js
 * 命名注释：server简称_update. 父模块 block.
 * 功能_ plus 方法 , 更新app相关操作.  (下载文件,写入localstroe相关标示),plusReady 之后调用
 * 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('update', upData);
    upData.$inject = ['config'];

    var _this;
    var _config;

    function upData(config) {
        var re = {};
        re.upFileList = {
            //需要下载的 文件url list
            appJs: config.host.appPath + 'dist/js/app.js', //app.js
            appCss: config.host.appPath + 'src/css/app.css', //app.css
            appJsSavePath: '_documents/app.js', //app.js 存储路径
            appCssSavePath: '_documents/app.css', //app.css 存储路径
        };
        re.trueUpdate = _trueUpdate; //判断是否升级
        re.saveFile = _saveFile; //下载文件并存储
        re.saveItemLocalStore = _saveItemLocalStore; //记录localStore
        re.delItemLocalStore = _delItemLocalStore; //删除 localStore
        re.delAppJsCss = _delAppJsCss; //删除文件 app.js app.css
        re.init = _init; //起始动作,plusReady之后再调用
        re.upFileName = ['app.js', 'app.css'];

        _this = re;
        _config = config;

        return re;
    }


    //升级更新起始动作,plusReady之后再调用,传入 name  str ,单独文件名(app.js,app.css),
    function _init() {
        /**************************
         * 1.检测升级
         * 2.需要升级,就去 启动 升级 打开 webview updata.html
         * 16/8/26 上午10:58 ByRockBlus
         **************************/
        trueUpdata().then(openUdataWebView, function (err) {
            _tools.alert({
                title: '升级失败',
                content: err
            })
        });


    }

    //删除文件 app.js app.css ,传入 文件路径 ,回调
    function _delAppJsCss(filePath, createDownload) {
        plus.io.resolveLocalFileSystemURL(filePath, succesCb, errorCb); //判断是否存在app.js 存在就删除,然后下载,不存在,直接下载

        function succesCb(e) {
            e.remove(function () {
                createDownload();
            });
        }

        function errorCb() {
            createDownload();
        }

        return defer.promise;
    }

    //启动 升级 打开 webview updata.html
    function openUdataWebView() {
        _tools.alert({
            title: '打开updataWebView'
        })

    }


    //建立下载 传 文件path,成功回调,失败回调
    //function _saveFile(filePath, downItemNetUrl, succesCall, errCall) {
    //
    //    var dtask = plus.downloader.createDownload(downItemNetUrl, {
    //        filename: filePath
    //    }, function(d, status) {
    //        // 下载完成
    //        if (status == 200) {
    //            plus.io.resolveLocalFileSystemURL(d.filename, function(entry) {
    //                succesCall(entry);
    //            });
    //        } else {
    //            //下载失败
    //            errCall();
    //        }
    //    });
    //    dtask.start();
    //}
    //

    //_saveItemLocalStore ,存储localStore
    function _saveItemLocalStore(name, path) {
        if (name && path) {
            //先清除
            _delItemLocalStore(name);
            setTimeout(function () {
                // 1秒后存储
                localStorage.saveItem(name, path);
            }, 1000);
        }

    //_delItemLocalStore ,删除localStore
    //function _delItemLocalStore(name) {
    //    localStorage.removeItem(name);
    //}




})();