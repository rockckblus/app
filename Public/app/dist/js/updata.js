(function () {

    document.addEventListener('plusready', function () {
        //window.config = {
        //    host: {
        //        appPath: 'http://192.168.0.7:8080/Public/App/'//app 静态路径
        //    },
        //    localSaveName: {
        //        downLoad: {
        //            //下载相关
        //            appJsPath: 'appJsPath',//app.js 更新后的下载存储路径
        //            appCssPath: 'appCssPath',//app.css 更新后的下载存储路径
        //            isFirstJs: 'isFirstJs',//是否第一次下载Js, 默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2
        //            isFirstCss: 'isFirstCss',//是否第一次下载css, 默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2
        //        },
        //        system: {
        //            //系统配置相关
        //            trueUpdata: 'trueUpdata',//(0:自动升级，1.提示升级，2.永不升级)
        //        },
        //        version: {
        //            //版本
        //            key: 'version',//localStroe key
        //        }
        //    }
        //};


        var _this = {};
        _this.newVersion = getNewVersion();//父页面传递来的 版本号
        _this.upFileList = {
            //需要下载的 文件url list
            appJs: window.config.host.appPath + 'dist/js/app.js', //app.js
            appCss: window.config.host.appPath + 'src/css/app.css', //app.css
            //需要存储的app的本地路径
            appJsSavePath: '_documents/app.js', //app.js 存储路径
            appCssSavePath: '_documents/app.css', //app.css 存储路径
        };
        _this.delAppJsCss = _delAppJsCss;//删除文件 app.js app.css ,传入 文件路径 ,回调
        _this.saveFile = _saveFile;//建立下载 传 文件path,成功回调,失败回调
        _this.saveItemLocalStore = _saveItemLocalStore;//存储localStore
        _this.closeThisWebView = _closeThisWebView;//关闭当前webView
        _this.closeThisWebViewOnce = false;//判断存储之后只执行一次 关闭动作
        _this.init = _init;

        setTimeout(function () {
            _init();
        }, 0);
        /**************************
         * init,启动下载 ,直接先删除app.js app.css,然后重新下载,
         * 下载成功后,记录localstore
         * 16/8/26 上午9:58 ByRockBlus
         **************************/
        function _init() {
            _delAppJsCss(__saveFile);

            function __saveFile() {
                _saveFile(_this.upFileList.appJsSavePath, _this.upFileList.appJs, __saveItemLocalStorte, _closeThisWebView);
            }

            function __saveItemLocalStorte(re) {
                _saveItemLocalStore(window.config.localSaveName.downLoad.appJsPath, re.fullPath)
                try {
                    _delItemLocalStore(window.config.localSaveName.version.key);//删除版本version号
                    _saveItemLocalStore(window.config.localSaveName.version.key, _this.newVersion);//写入新版本号
                } catch (e) {
                    console.log('e', e);
                }
            }
        }

        /**************************
         // * 删除文件 app.js app.css
         // * 传入 文件路径 ,回调
         // * 16/8/26 上午9:41 ByRockBlus
         // **************************/


        function _delAppJsCss(createDownloadCall) {
            //逻辑:判断是否第一次下载
            // if (第一次,直接下载) else (删除下载)
            //存在就删除
            //  if(删除成功,去下载) else (删除失败)
            //不存在,,直接下载

            //判断是否有下载
            var appJsPath = localStorage.getItem(window.config.localSaveName.downLoad.appJsPath);

            //if 没下载过 //不需要删除,直接下载(回调)
            if (!appJsPath) {
                createDownloadCall();
            } else {
                plus.io.resolveLocalFileSystemURL('file://' + appJsPath, succesCb, errorCb);
            }

            function succesCb(e) {
                e.remove(function () {
                    console.log('删除成功,去下载');
                    createDownloadCall();
                });
            }

            function errorCb(e) {
                console.log('删除失败,去关闭', e);
                _closeThisWebView();
            }
        }

        //建立下载 传 文件path,成功回调,失败回调
        function _saveFile(filePath, downItemNetUrl, succesCall, errCall) {
            var dtask = plus.downloader.createDownload(downItemNetUrl, {
                filename: filePath,
                timeout: 5,
                retry: 0
            }, function (d, status) {
                // 下载完成
                if (status == 200) {
                    console.log('下载并存储成功');
                    plus.io.resolveLocalFileSystemURL(d.filename, function (entry) {
                        console.log('entry', entry);
                        succesCall(entry);
                    });
                } else {
                    console.log('a', d, status);
                    //下载失败
                    errCall();
                }
            });
            dtask.start();
        }

        //_saveItemLocalStore ,存储localStore
        function _saveItemLocalStore(name, path) {
            if (name && path) {
                _delItemLocalStore(name);
                setTimeout(function () {
                    console.log('存储local');
                    // 1秒后存储
                    localStorage.setItem(name, path);
                }, 1000);

                if (!_this.closeThisWebViewOnce) {
                    _this.closeThisWebViewOnce = true;//只执行一次关闭动作
                    setTimeout(function () {
                        //2秒后关闭
                        _closeThisWebView();
                    }, 2000);
                }
            }
        }

        //_delItemLocalStore ,删除localStore
        function _delItemLocalStore(name) {
            localStorage.removeItem(name);
        }

        /*************************
         * 关闭当前webView
         * 16/8/26 下午4:41 ByRockBlus
         *************************/
        function _closeThisWebView() {
            var ws = plus.webview.currentWebview();
            plus.webview.close(ws);
        }

        //获取当前页面传来的最新版本号
        function getNewVersion() {
            try {
                var ws = plus.webview.currentWebview();
                return ws.verison;
            } catch (e) {
                console.log('传递版本号失败');
            }
        }

    });
})();