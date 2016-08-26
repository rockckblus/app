(function () {
    document.addEventListener('plusready', function () {

        var _this = {};
        _this.prototype.upFileList = {
            //需要下载的 文件url list
            appJs: window.config.host.appPath + 'dist/js/app.js', //app.js
            appCss: window.config.host.appPath + 'src/css/app.css', //app.css
            //需要存储的app的本地路径
            appJsSavePath: '_documents/app.js', //app.js 存储路径
            appCssSavePath: '_documents/app.css', //app.css 存储路径
        };
        _this.prototype.delAppJsCss = _delAppJsCss;//删除文件 app.js app.css ,传入 文件路径 ,回调
        _this.prototype.saveFile = _saveFile;//建立下载 传 文件path,成功回调,失败回调
        _this.prototype.saveItemLocalStore = _saveItemLocalStore;//存储localStore
        _this.prototype.init = _init;

        /**************************
         * init,启动下载 ,直接先删除app.js app.css,然后重新下载,
         * 下载成功后,记录localstore
         * 16/8/26 上午9:58 ByRockBlus
         **************************/
        function _init() {
            _delAppJsCss(_this.appJsSavePath, _saveFile(_this.appJsSavePath, _this.appJs,))
        }


        /**************************
         * 删除文件 app.js app.css
         * 传入 文件路径 ,回调
         * 16/8/26 上午9:41 ByRockBlus
         **************************/
        function _delAppJsCss(filePath, createDownloadCall) {
            //判断是否第一次下载
            //      if (第一次,直接下载) else (删除下载)
            //存在就删除
            //  if(删除成功,去下载) else (删除失败)
            //不存在,,直接下载
            plus.io.resolveLocalFileSystemURL(filePath, succesCb, errorCb);

            function succesCb(e) {
                e.remove(function () {
                    createDownloadCall();
                });
            }

            function errorCb() {
                createDownloadCall();
            }
        }

        //建立下载 传 文件path,成功回调,失败回调
        function _saveFile(filePath, downItemNetUrl, succesCall, errCall) {
            var dtask = plus.downloader.createDownload(downItemNetUrl, {
                filename: filePath
            }, function (d, status) {
                // 下载完成
                if (status == 200) {
                    plus.io.resolveLocalFileSystemURL(d.filename, function (entry) {
                        succesCall(entry);
                    });
                } else {
                    //下载失败
                    errCall();
                }
            });
            dtask.start();
        }

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

        }

        //_delItemLocalStore ,删除localStore
        function _delItemLocalStore(name) {
            localStorage.removeItem(name);
        }

    });
})();