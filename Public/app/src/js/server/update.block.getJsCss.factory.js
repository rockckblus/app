/**
 * update.block.getJsCss.factory.js
 * 命名注释：server简称_update. 父模块 block.
 * 功能_ plus 方法 , 更新app相关操作.  (下载文件,写入localstroe相关标示),plusReady 之后调用
 * 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('update', upData);
    upData.$inject = ['config', '$q', 'tools'];

    var _this;
    var _config;
    var _tools;
    var q;

    function upData(config, $q, tools) {
        var re = {};
        re.trueUpdata = trueUpdata; //根据版本号判断是否升级
        re.init = _init; //起始动作,plusReady之后再调用

        _this = re;
        _config = config;
        _tools = tools;
        q = $q;

        setTimeout(function () {
            _init();
        }, config.system.timeoutUpData);

        return re;
    }

<<<<<<< HEAD

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
=======
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

>>>>>>> origin/mobileAngualrUi
    }

    //根据版本号判断是否升级
    function trueUpdata() {

        var defer = q.defer();
        var version = localStorage.getItem(_config.version.key);
        //if没有版本号,就写入config 默认版本号
        if (!version) {
            localStorage.setItem(_config.version.key, _config.version.default);
            defer.reject('第一次运行,写入版本号');
        }

        //if 有version 就去接口拿需最新的 版本号,然后比较
        if (version) {
            _getVersion(function () {
                try {
                    if (interval(version) < re.version) {
                        defer.resolve(true);//回调成功执行then的 升级步骤
                    } else {
                        defer.reject('无需升级');
                    }
                } catch (e) {
                    console.error('请求版本失败(callBack方法中)');
                    defer.reject('写入版本号请求版本失败(callBack方法中)');
                }
            }, function (err) {
                defer.reject(err);
            })
        }

        //请求接口版本号
        function _getVersion(callBack, callBackErr) {
            var url = '';//todo
            _tools.postJsp(url, {}, true).then(function (re) {
                    callBack(re);
                },
                function (err) {
                    callBackErr(err);
                    console.log('err', '请求version接口失败');
                }
            )
        }

<<<<<<< HEAD
        return defer.promise;
    }

    //启动 升级 打开 webview updata.html
    function openUdataWebView() {
        _tools.alert({
            title: '打开updataWebView'
        })
=======
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
>>>>>>> origin/mobileAngualrUi
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
    //function _saveItemLocalStore(name, path) {
    //    if (name && path) {
    //        //先清除
    //        _delItemLocalStore(name);
    //        setTimeout(function() {
    //            // 1秒后存储
    //            localStorage.saveItem(name, path);
    //        }, 1000);
    //    }
    //
    //}

    //_delItemLocalStore ,删除localStore
<<<<<<< HEAD
    //function _delItemLocalStore(name) {
    //    localStorage.removeItem(name);
    //}

=======
    function _delItemLocalStore(name) {
        localStorage.removeItem(name);
    }
>>>>>>> origin/mobileAngualrUi

})();