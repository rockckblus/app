/**
 * update.block.getJsCss.factory.js
 * 命名注释：server简称_update. 父模块 block.
 * 功能_ plus 方法 , 更新app相关操作.  (下载文件,写入localstroe相关标示),plusReady 之后调用
 * 类型_factory.js
 */

(function() {
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

        _this = re;
        _config = config;

        return re;
    }

    setTimeout(function() {
        _this.init('app.js');
    }, 2000);



    //升级更新起始动作,plusReady之后再调用,传入 name  str ,单独文件名(app.js,app.css),
    function _init(name) {
        //判断是否存在,如果不存在 直接下载,记录localStroe
        //存在,先删除,再下载
        _trueUpdate(name, __isHaveCall, __isNoCall);

        /*************************
         * 存在
         * 16/8/22 下午5:09 ByRockBlus
         *************************/
        function __isHaveCall() {

        }

        /**
         * [__isNoCall 不存在 直接下载n]
         * @param  {[string]} savePath       [存储到app本地的 路径]
         * @param  {[string]} downItemNetUrl [需要下载的文件url]
         * @param  {[string]} localName      []
         */
        function __isNoCall(savePath, downItemNetUrl, localName) {
            _saveFile(savePath, downItemNetUrl, function(savePath) {
                _saveItemLocalStore(localName, savePath); //存储本地localstroe name，val
            }, function(err) {
                console.error('err', err);
            });
        }

    }

    //删除文件 app.js app.css ,传入 文件路径 ,回调
    function _delAppJsCss(filePath, createDownload) {
        plus.io.resolveLocalFileSystemURL(filePath, succesCb, errorCb); //判断是否存在app.js 存在就删除,然后下载,不存在,直接下载

        function succesCb(e) {
            e.remove(function() {
                createDownload();
            });
        }

        function errorCb() {
            createDownload();
        }
    }

    //判断是否升级,
    function _trueUpdate(name, __isHaveCall, __isNoCall) {
        var savePath; //需要存储的 文件path
        var downItemNetUrl; //需要远程下载 的url
        var localName; //local标示
        var isHave; //get local ,是否存在

        switch (name) {
            case 'app.js':
                savePath = _this.upFileList.appJsSavePath;
                downItemNetUrl = _this.upFileList.appJs;
                isHave = localStorage.getItem(_config.localSaveName.downLoad.appJsPath);
                localName = _config.localSaveName.downLoad.appJsPath;
                break;
            case 'app.css':
                savePath = _this.upFileList.appCssSavePath;
                downItemNetUrl = _this.upFileList.appCss;
                isHave = localStorage.getItem(_config.localSaveName.downLoad.appCssPath);
                localName = _config.localSaveName.downLoad.appJsPath;
                break;
        }

        if (isHave) {
            console.log('log', '存在');
            /**
             * 
             */

        } else {
            /**
             * 不存在,直接下载
             */
            console.log('log', '不存在');
            __isNoCall(savePath, downItemNetUrl, localName);

        }

    }

    //建立下载 传 文件path,成功回调,失败回调
    function _saveFile(filePath, downItemNetUrl, succesCall, errCall) {
                console.log('downItemll',downItemNetUrl);
        var dtask = plus.downloader.createDownload(downItemNetUrl, {
            filename: filePath,
            timeout: 1000
        }, function(d, status) {
            // 下载完成
            if (status == 200) {
                plus.io.resolveLocalFileSystemURL(d.filename, function(entry) {
                    console.log('下载成功');
                    // succesCall(entry);
                });
            } else {
                console.log('下载失败');
                //下载失败
                // errCall();
            }
        });

        dtask.start();
    }

    //_saveItemLocalStore ,存储localStore
    function _saveItemLocalStore(name, path) {
        if (name && path) {
            //先清除
            _delItemLocalStore(name);
            setTimeout(function() {
                // 1秒后存储
                localStorage.saveItem(name, path);
            }, 1000);
        }

    }

    //_delItemLocalStore ,删除localStore
    function _delItemLocalStore(name) {
        localStorage.removeItem(name);
    }

})();