/**
 * 命名注释：directive简称_imgUpDate. 父模块_from. 功能_技能发布图片上传 类型_directive .js
 * 使用 ：<div img-up-date></div>
 */
(function () {
    'use strict';
    angular.module('from').directive('imgUpDate', imgUpDate);
    function imgUpDate() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/from/imgUpDate.from.imgUpdate.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'config', '$state'];

    function thisController($scope, $rootScope, $timeout, tools, config, $state) {

        $scope.upImg1 = false;
        $scope.upImg2 = false;
        $scope.upImg3 = false;
        $scope.img1 = '';
        $scope.img2 = '';
        $scope.img3 = '';
        var clickArr = ['upImgClick1', 'upImgClick2', 'upImgClick3'];

        init();

        function init() {
            forBind();
        }

        function forBind() {
            angular.forEach(clickArr, function (vo) {
                bindImgClick(vo);
            });
        }

        function bindImgClick(voId) {
            document.getElementById(voId).addEventListener('tap', function () {
                var thisImgId = voId.replace('upImgClick', '');

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
                            {
                                title: "删除"
                            }
                        ];
                    }


                    plus.nativeUI.actionSheet({
                        title: "作品图片/靓照",
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
                            case 3:
                                delImg(voId);
                                /*删除delImg*/
                                break;
                            default:
                                break;
                        }
                    });
                }
            }, false);
        }

        //删除
        function delImg(voId) {
            $timeout(function () {
                switch (voId) {
                    case 'upImgClick1':
                        $scope.img1 = false;
                        break;
                    case 'upImgClick2':
                        $scope.img2 = false;
                        break;
                    case 'upImgClick3':
                        $scope.img3 = false;
                        break;
                }
            }, 0);
            var url = config.host.nodeHost + '/sns/delKillImg';//删除服务器上的图片
            var postData = {
                killRoundId: tools.getLocalStorageObj('killRoundId'),
                uid: tools.getLocalStorageObj('user').uid,
                voId: voId
            };
            tools.postJsp(url, postData, true).then(function (re) {
                if (re.data.code == 'S') {
                    console.log('删除服务器图片成功', re.data.msg);
                } else {
                    console.log('删除服务器图片失败', re.data.msg);
                }
            }, function (e) {
                console.log('删除服务器图片失败2');
            });
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
                filename: "_doc/head_" + voId + ".png"
            });
        }

//本地相册选择
        function galleryImg(voId) {
            plus.gallery.pick(function (a) {
                plus.io.resolveLocalFileSystemURL(a, function (entry) {
                    plus.io.resolveLocalFileSystemURL("_doc/", function (root) {
                        root.getFile("head_" + voId + ".png", {}, function (file) {
                            //文件已存在
                            file.remove(function () {
                                console.log("file remove success");
                                entry.copyTo(root, 'head_' + voId + '.png', function (e) {
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
                            var fielName = 'head_' + voId + '.png';
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
                    case 'upImgClick1':
                        $scope.img1 = imgPath;
                        break;
                    case 'upImgClick2':
                        $scope.img2 = imgPath;
                        break;
                    case 'upImgClick3':
                        $scope.img3 = imgPath;
                        break;
                }
            }, 0);
            // mainImage.src = imgPath;
            // mainImage.style.width = "60px";
            // mainImage.style.height = "60px";

            var image = new Image();
            image.src = imgPath;
            image.onload = function () {
                var imgData = getBase64Image(image);
                apiUpImg(imgData, voId);
                // console.log('imgData', imgData);
                /*在这里调用上传接口*/
//              mui.ajax("图片上传接口", {
//                  data: {
//
//                  },
//                  dataType: 'json',
//                  type: 'post',
//                  timeout: 10000,
//                  success: function(data) {
//                      console.log('上传成功');
//                  },
//                  error: function(xhr, type, errorThrown) {
//                      mui.toast('网络异常，请稍后再试！');
//                  }
//              });
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
                killRoundId: tools.getLocalStorageObj('killRoundId'),
                voId: voId
            };
            var url = config.host.nodeHost + '/sns/addKillImg';
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
