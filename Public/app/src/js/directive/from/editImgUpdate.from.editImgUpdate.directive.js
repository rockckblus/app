/**
 * 命名注释：directive简称_editImgUpDate. 父模块_from. 功能_头像图片上传 类型_directive .js
 * 使用 ：<div edit-img-up-date></div>
 */
(function () {
    'use strict';
    angular.module('from').directive('editImgUpDate', editImgUpDate);
    function editImgUpDate() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/from/editImgUpDate.from.editImgUpdate.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'config', '$state', 'header'];

    function thisController($scope, $rootScope, $timeout, tools, config, $state, header) {


        $scope.upImg1 = false;
        $scope.img1 = '';
        var clickArr = ['editUpImgClick1'];
        init();

        function init() {
            forBind();
            giveDefaultImg();//给默认头像
        }

        /**
         * 给默认头像
         */
        function giveDefaultImg() {
            var userData = tools.getLocalStorageObj('userData');
            if (userData.headerImg) {
                $timeout(function () {
                    $scope.img1 = userData.headerImg;
                }, 0);
            } else {
                $timeout(function () {
                    $scope.img1 = header.defaultHeader;
                }, 0);
            }
        }


        function forBind() {
            angular.forEach(clickArr, function (vo) {
                bindImgClick(vo);
            });
        }

        function bindImgClick(voId) {
            document.getElementById(voId).addEventListener('tap', function () {
                var thisImgId = voId.replace('editUpImgClick', '');
                if (mui.os.plus) {
                    var a = [
                        {
                            title: "拍照"
                        }, {
                            title: "从手机相册选择"
                        }
                    ];

                    if ($scope['img' + thisImgId]) {
                        a = [
                            {
                                title: "拍照"
                            }, {
                                title: "从手机相册选择"
                            },
                        ];
                    }


                    plus.nativeUI.actionSheet({
                        title: "修改头像",
                        cancel: "取消",
                        buttons: a
                    }, function (b) { /*actionSheet 按钮点击事件*/
                        switch (b.index) {
                            case 0:
                                break;
                            case 1:
                                getImage(voId);
                                /*拍照*/
                                break;
                            case 2:
                                galleryImg(voId);
                                /*打开相册*/
                                break;
                            default:
                                break;
                        }
                    });
                } else {
                    tools.trueWeb(function () {
                        alert('请下载手机app修改头像');
                    }, function () {
                        tools.alert({title: '您的设备不支持修改头像功能'});
                    });
                }
            }, false);
        }


        //拍照
        function getImage(voId) {
            var c = plus.camera.getCamera();
            c.captureImage(function (e) {
                plus.io.resolveLocalFileSystemURL(e, function (entry) {
                    var s = entry.toLocalURL() + "?version=" + new Date().getTime();
                    uploadHead(s, voId);
                    /*上传图片*/
                }, function (e) {
                    console.log("读取拍照文件错误：" + e.message);
                });
            }, function (s) {
                console.log("error" + s);
            }, {
                filename: "_doc/edithead_" + voId + ".png"
            });
        }

//本地相册选择
        function galleryImg(voId) {
            plus.gallery.pick(function (a) {
                plus.io.resolveLocalFileSystemURL(a, function (entry) {
                    plus.io.resolveLocalFileSystemURL("_doc/", function (root) {
                        root.getFile("edithead_" + voId + ".png", {}, function (file) {
                            //文件已存在
                            file.remove(function () {
                                console.log("file remove success");
                                entry.copyTo(root, 'edithead_' + voId + '.png', function (e) {
                                        var ee = e.fullPath + "?version=" + new Date().getTime();
                                        uploadHead(ee, voId);
                                        /*上传图片*/
                                        //变更大图预览的src
                                        //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
                                    },
                                    function (e) {
                                        console.log('copy image fail:' + e.message);
                                    });
                            }, function (e) {
                                console.log("delete image fail:" + e.message);
                            });
                        }, function () {
                            //文件不存在
                            var fielName = 'edithead_' + voId + '.png';
                            entry.copyTo(root, fielName, function (eee) {
                                    var path = eee.fullPath + "?version=" + new Date().getTime();
                                    uploadHead(path, voId);
                                    /*上传图片*/
                                },
                                function (e) {
                                    console.log('copy image fail:' + e.message);
                                });
                        });
                    }, function (e) {
                        console.log("get _www folder fail");
                    });
                }, function (e) {
                    console.log("读取拍照文件错误：" + e.message);
                });
            }, function (a) {
            }, {
                filter: "image"
            });
        }

//上传头像图片
        function uploadHead(imgPath, voId) {
            console.log('voId', voId);
            $timeout(function () {
                switch (voId) {
                    case 'editUpImgClick1':
                        $scope.img1 = imgPath;
                        break;
                }
            }, 0);

            var image = new Image();
            image.src = imgPath;
            image.onload = function () {
                var imgData = getBase64Image(image);
                apiUpImg(imgData, voId);
            };
        }

        //将图片压缩转成base64
        function getBase64Image(img) {
            var canvas = document.createElement("canvas");
            var width = img.width;
            var height = img.height;
            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > 100) {
                    height = Math.round(height *= 100 / width);
                    width = 100;
                }
            } else {
                if (height > 100) {
                    width = Math.round(width *= 100 / height);
                    height = 100;
                }
            }
            canvas.width = width;
            /*设置新的图片的宽度*/
            canvas.height = height;
            /*设置新的图片的长度*/
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            /*绘图*/
            var dataURL = canvas.toDataURL("image/png", 0.8);
            return dataURL.replace("data:image/png;base64,", "");
        }

        /**
         *图片上传到api接口,传 图片,uid,技能表单随机id,头像id
         */
        function apiUpImg(imgData, voId) {
            var postData = {
                imgData: imgData,
                uid: tools.getLocalStorageObj('userData').uid,
                voId: voId
            };
            var url = config.host.nodeHost + '/member/editHeaderImg';
            tools.postJsp(url, postData, true).then(function (re) {
                if (re.data.code == 'S') {
                    console.log('提交服务器成功', re);
                } else {
                    console.error('提交服务器失败');
                }
            }, function (e) {
                console.error('提交服务器失败');
            });
        }
    }

})();
