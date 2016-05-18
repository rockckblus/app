/**
 * @fileOverview angular diPanTop
 *
 * 15-3-14
 */

define(function (require) {

    var g = require('seajs/app/oeoeFront/g');
    var tools = require('seajs/app/oeoeFront/public/tools');

    /**
     * public 全局dipanBody 控制器
     * 15-6-26 */
    g.diPanApp.controller('diPanBody', function ($scope, $http) {

        /**body控制器公共方法 默认根据ip载入对应城市功能 2期开发 todo data  2015-6-26*/

        $scope.defaultCity = '全国';
        /** 百度api服务，新浪获取失败时调用 */
        function getBaidu() {
            //百度接口
            var baiIpApiUrl = 'http://api.map.baidu.com/location/ip';
            tools.getJsp($http, baiIpApiUrl, '', function (re) {
                if (re) {
                    $scope.defaultArea = re.content.address;
                    g.city = re.content.address; //赋值全局城市字符串
                    tools.setCookie('defaultCity', re.content.address); //写入cookie城市信息
                }
            });
        }

        /**  获取city名*/
        function getFirstCity() {
            var getCityUrl = g.apiUrl + 'Home/Jsonp/getIpCity';
            tools.getJsp($http, getCityUrl, function (re) {
                if (re) {
                    $scope.defaultArea = re;
                    g.city = re;
                    tools.setCookie('defaultCity', re); //写入cookie城市信息
                } else {
                    getBaidu();
                }
            })
        };

    });

    /**
     *  声明dipanTop控制器
     *  15-3-14 */
    g.diPanApp.controller('diPanTop', function ($scope, $http) {


        /**
         * 声明城市模型
         * 15-3-14 */
        $scope.allCityData = null;

        /**
         * 作用域fun
         * 15-3-14 */
        var fun = {

            /** show默认城市，showgai 15-3-14 */
            showAllCitydiv: function () {
                tools.showGai();
                $('.allCity').show();
                $('.closeAllDiv').show();
            },

            /** closeDiv 15-3-14 */
            colseAllCityDiv: function () {
                tools.hideGai();
                $('.mapCity').hide();
                $('.closeAllDiv').hide();
            },

            /** get全国城市，按照abcd  15-3-14 */
            getAllCityData: function (re1) {
                var url = g.apiUrl + 'Api/Jsonp/getAllCity/';
                tools.getJsp($http, url, function (re) {
                    re1(re);
                })
            }
        };

        /**
         *  切换城市点击事件
         *  15-3-14 */
        $scope.qieHuanClick = function () {

            /** showAllcityDiv */
            fun.showAllCitydiv();

            /** 赋值全国城市模型  15-3-14 */
            fun.getAllCityData(function (re) {
                if (re) {
                    tools.ui.colseLoading();
                    $scope.allCityData = re;
                }
            })
        };

        /**
         * 关闭按钮点击事件
         * 15-3-14 */
        $scope.colseAllCityDiv = function () {
            fun.colseAllCityDiv();
        };

        /**
         *  2级城市点击事件
         *  15-3-14 */
        $scope.allCitytwoCityClick = function (target) {
            var t = $(target);
            var city = t.attr('city');

            /** 记录cookie默认城市 15-3-14 */
            tools.setCookie('defaultCity', city, 'domain=dipan.so')

            /** 组合新城市url 跳转 15-3-14 */
            var url = window.location.href;
            url = url.split('.');
            if (url[0] == 'http://dipan') {
                url[0] = 'http://' + city + '.dipan';
            } else {
                url[0] = 'http://' + city;
            }
            url = url.join('.');
            window.location.href = url;
        };

        /**
         *  注册点击事件
         *  15-3-15 */
        $scope.showReg = function () {
            tools.showGai();
            $('#regDiv').show().animate(
                {'top': '30px'},
                600,
                'easeOutQuint'
            );

            /**默认电话输入焦点  15-3-22 */
            setTimeout(function () {
                $('#regTel').focus();
                $('#regTel').attr('placeholder', '请输入手机号');
            }, 0);
        };

        /**
         *  关闭注册div事件
         *  15-3-15 */
        $scope.closeRegDiv = function (noHideGai) {

            $('#regDiv').animate(
                {'top': '-230px'},
                300,
                'easeOutQuint',
                function () {
                    $('#regDiv').hide();

                    /**
                     * 如果有参数传进来就不关闭gai，是切换登录注册用
                     * 15-5-29 */
                    if (!noHideGai) {
                        tools.hideGai();
                    }
                }
            );
        };

        /**
         *  关闭登录div事件
         *  15-3-15 */
        $scope.closeLoginDiv = function (noHideGai) {
            $('#loginDiv').animate(
                {'top': '-230px'},
                300,
                'easeOutQuint',
                function () {
                    $('#loginDiv').hide();

                    /**
                     * 如果有参数传进来就不关闭gai，是切换登录注册用
                     * 15-5-29 */
                    if (!noHideGai) {
                        tools.hideGai();
                    }
                }
            );
        };

        /**
         *  登录点击事件
         *  15-3-15 */
        $scope.showLogin = function () {
            tools.showGai();
            $('#loginDiv').show().animate(
                {'top': '30px'},
                600,
                'easeOutQuint'
            );
        };

        /**
         *  忘记密码点击事件
         *  15-3-15 */
        $scope.forgetPass = function () {
            $scope.closeLoginDiv(true);
            setTimeout(function () {

                /**
                 * 如果登录的时候填写过手机号，就带入忘记密码
                 * 15-5-29 */
                var mt = $('#loginTel').val();

                /**
                 * 验证手机号是否空
                 * 15-5-29 */
                if (tools.verify.isEmpty(mt)) {

                    /**
                     * 验证手机号格式
                     * 15-5-29 */
                    if (tools.verify.checkMobile(mt)) {
                        $('#forgetRegTel').val(mt);
                    }
                }

                /**
                 * show 忘记密码div
                 * 15-5-29 */
                $('#forgetPassDiv').show().animate(
                    {'top': '30px'},
                    600,
                    'easeOutQuint'
                );
            }, 800);
        };

        /**
         *  关闭登录div事件
         *  15-3-15 */
        $scope.colseLoginDiv = function () {

            $('#loginDiv').animate(
                {'top': '-230px'},
                300,
                'easeOutQuint',
                function () {
                    $('#loginDiv').hide();
                    tools.hideGai();
                }
            );
        };

        /**
         *  关闭忘记密码div事件
         *  15-3-15 */
        $scope.closeForgetDiv = function () {

            $('#forgetPassDiv').animate(
                {'top': '-230px'},
                300,
                'easeOutQuint',
                function () {
                    $('#forgetPassDiv').hide();
                    tools.hideGai();
                }
            );
        };

        /**
         * 顶部注册对象
         * 15-3-17 */
        $scope.reg = {
            /** reg文字相关 15-3-17 */
            text: {
                defaultSm: '<span style="color: #D9D4D4">发送短信获取<\/span> <b>登录密码<\/b>',
                defaultStyle: {
                    backgroundColor: '#004499',
                    lineHeight: '14px',
                    color: '#ffffff'
                },
                reDefaultStyle: {
                    backgroundColor: '#004499',
                    lineHeight: '14px',
                    color: '#ffffff'
                },
                heightStyle: {
                    backgroundColor: '#e3e3e3',
                    lineHeight: '14px',
                    color: '#000000'
                },
                restSm: '秒后重发',
                sixTen: 60
            },

            /** input相关 15-3-22 */
            input: {

                /** 静态相关 15-3-22 */
                telDefaultText: '手机号',

                /** 短信验证码 15-3-22 */
                smCodeDefault: '登录密码',

                /** 方法相关 15-3-22 */
                fun: {

                    /** 手机号输入焦点事件 15-3-22 */
                    regTelFocus: function () {

                        /** 关闭infodiv 15-3-22 */
                        $scope.reg.alertInfo.closeAlertDiv();

                        $scope.reg.input.telDefaultText = '';
                    },

                    /** 手机验证 方法对象 15-3-22 */
                    telFun: {

                        /**手机号为空，手机号格式是否正确  15-3-22 */

                        /** 验证手机号为空 15-3-22 */
                        _empty: function (telNum) {

                            /** 关闭infodiv 15-3-22 */
                            $scope.reg.alertInfo.closeAlertDiv();

                            if (!tools.verify.isEmpty(telNum)) {
                                $scope.reg.input.telDefaultText = '请输入手机号';
                                $scope.reg.alertInfo.alertDiv('手机号不能为空', function () {
                                });
                                return false;
                            } else {
                                return true;
                            }
                        },

                        /** 验证手机格式 15-3-22 */
                        _format: function (telNum) {

                            /** 关闭infodiv 15-3-22 */
                            $scope.reg.alertInfo.closeAlertDiv();

                            if (!tools.verify.checkMobile(telNum)) {
                                $scope.reg.alertInfo.alertDiv('手机格式不正确');
                                return false;
                            } else {
                                return true;
                            }
                        },

                        /** 验证手机号是否被注册 15-3-22 */
                        _isset: function (telNum, fun) {
                            var url = 'http://www.dipan.so/Api/Api/trueUserMt/mtNum/' + telNum;
                            tools.getJsp($http, url, function (re) {
                                if (re != 200) {
                                    var mess = tools.verify.getError(re);
                                    setTimeout(function () {
                                        $scope.reg.alertInfo.alertDiv(mess, function () {

                                            /**
                                             * 手机号已经注册，点击alertDvi mess里面的登录jquery事件
                                             * 15-5-7 */
                                            $('#loginAlert').click(function () {

                                                /**
                                                 * 关闭regDiv
                                                 * 15-5-7 */
                                                $scope.closeRegDiv(true);

                                                setTimeout(function () {
                                                    /**
                                                     * 打开登录Div
                                                     * 15-5-7 */
                                                    $scope.showLogin();
                                                    $('#loginTel').val(telNum);
                                                }, 800);

                                            })
                                        });
                                    }, 200);
                                    return false;
                                } else {
                                    fun(re);
                                }

                            });
                        }
                    },

                    /** 验证码验证 方法对象 15-3-22 */
                    codeFun: {

                        /** 验证验证码为空 15-3-22 */
                        _empty: function (telNum) {

                            /** 关闭infodiv 15-3-22 */
                            $scope.reg.alertInfo.closeAlertDiv();

                            if (!tools.verify.isEmpty(telNum)) {
                                $scope.reg.input.telDefaultText = '请输入验证码';
                                $scope.reg.alertInfo.alertDiv('验证码不能为空');
                                return false;
                            } else {
                                return true;
                            }
                        },

                        /** 验证验证的正确性 15-3-22 */
                        _codeTrue: function (telNum, code, fun) {
                            var url = 'http://www.dipan.so/Api/Api/trueCode/mtNum/' + telNum + '/code/' + code;
                            tools.getJsp($http, url, function (re) {
                                if (re != 200) {
                                    $scope.reg.alertInfo.alertDiv(tools.verify.getError(re));
                                    return false;
                                } else {
                                    fun(re);
                                }
                            });
                        }
                    },

                    /** 手机号输入离开事件 15-3-22 */
                    regTelBlur: function () {

                        /** 关闭infodiv 15-3-22 */
                        $scope.reg.alertInfo.closeAlertDiv();

                        var telNum = $('#regTel').val();

                        /** 验证手机空 15-3-22 */
                        if (this.telFun._empty(telNum)) {
                            /** 验证手机格式 15-3-22 */
                            if (this.telFun._format(telNum)) {
                                /** 验证手机号是否被注册 15-3-24 */
                                this.telFun._isset(telNum, function (re) {
                                })
                            }
                        }
                    },

                    /** 发送验证码点击事件  15-3-17 */
                    clickSendSm: function () {

                        var telNum = $('#regTel').val();

                        /** 验证手机号空和格式 15-3-22 */
                        if ($scope.reg.input.fun.telFun._empty(telNum) && $scope.reg.input.fun.telFun._format(telNum) && ($scope.reg.text.sixTen == 60)) {

                            /** 验证手机号是否注册过  15-3-24 */
                            $scope.reg.input.fun.telFun._isset(telNum, function (re) {

                                if (re == 200) {

                                    /**
                                     * 验证手机号存在，发送验证码
                                     * 15-4-3 */
                                    var roundCodeId = $('#code').attr('roundCodeId');

                                    /** 如果有随机id && 倒计时没开始，就去获取验证码 15-3-24 */
                                    if (roundCodeId && ($scope.reg.text.sixTen == 60)) {
                                        var url = g.apiUrl + 'Api/Sem/getCode/roundCodeId/' + roundCodeId + '/mtNum/' + telNum;
                                        tools.getJsp($http, url, function (re) {
                                            if (re == 200) {

                                                /** 判断计时器为60 的时候 才有点击动作 15-3-22 */
                                                if ($scope.reg.text.sixTen == 60) {

                                                    /** 验证吗发送成功 15-3-24 */
                                                    $scope.reg.alertInfo.alertDiv('登录密码已发送');

                                                    /** 变换按钮颜色 15-3-17 */
                                                    $scope.reg.fun.changeBackColor();

                                                    /** 倒计时字数切换 15-3-22 */
                                                    for (var i = 0; i < 60; i++) {
                                                        $scope.reg.fun.startSix(i);
                                                    }
                                                }

                                            }
                                        });
                                    } else {

                                        /**如果倒计时开始  15-3-24 */
                                        if ($scope.reg.text.sixTen == 60) {
                                            $scope.reg.alertInfo.alertDiv('获取短信密码失败');
                                            console.log('error', 'roundCodeId未获取到');
                                        }
                                    }

                                }
                                //else {
                                //    $scope.reg.alertInfo.alertDiv('手机号已存在,可以直接<span class="button" id="loginAlert">登录</span>', function () {
                                //        /**
                                //         * todo,绑定登录按钮点击事件
                                //         * 15-5-7 */
                                //    });
                                //    return false;
                                //}
                            });
                        }

                    },

                    /** 注册按钮提交事件 15-3-22 */
                    regSub: function () {

                        /** 验证电话空，格式，是否注册过 ||| 验证码空，正确性 15-3-22 */

                        var telNum = $('#regTel').val();//电话号码val
                        var code = $('#code').val();//验证码


                        /** 验证手机号空和格式,是否注册过 ,验证码空 15-3-22 */
                        if ($scope.reg.input.fun.telFun._empty(telNum) && $scope.reg.input.fun.telFun._format(telNum) && $scope.reg.input.fun.codeFun._empty(code)) {

                            /** 判断手机号是否注册，执行回调 15-3-24 */
                            $scope.reg.input.fun.telFun._isset(telNum, function (re) {

                                /** 判断未注册 15-3-24 */
                                if (re == 200) {

                                    /**
                                     * 验证码对应电话正确性
                                     * 15-3-25 */
                                    $scope.reg.input.fun.codeFun._codeTrue(telNum, code, function (re) {
                                        if (re == 200) {
                                            var postArr = $('#regFrom').serializeArray();
                                            var url = '/Member/Index/regIn';
                                            tools.postJsp($http, url, postArr, function (re) {
                                                console.log('postRe', re);
                                                if (re != 200) {
                                                    $scope.reg.alertInfo.alertDiv(tools.verify.getError(re));
                                                } else {
                                                    /**
                                                     * 跳转到会员中心，或者审核发帖通过
                                                     * 15-3-27 */
                                                    userFun.goUserCenter(telNum, code);
                                                    $scope.reg.alertInfo.alertDiv('注册成功');
                                                }
                                            })


                                        } else {
                                            $scope.reg.alertInfo.alertDiv(tools.verify.getError(re));
                                            return false;
                                        }
                                    });
                                } else {
                                    $scope.reg.alertInfo.alertDiv(tools.verify.getError(re));
                                    return false;
                                }

                            })
                        }
                    }
                }
            },

            /** 提示信息 15-3-22 */
            alertInfo: {
                /** 弹出div动作 ,传入text 或 html ,可执行回调函数15-3-22 */
                alertDiv: function (t, fun) {
                    var _temCount = $scope.reg.input.tempCount;

                    /**
                     * 重置angular,给传入text绑定
                     * 15-5-3 */

                    $('#regDiv').find('.alertDiv').show().html(t).animate(
                        {'top': '5px'},
                        600,
                        'easeOutElastic',
                        function () {
                            if (fun) {
                                fun();
                            }
                        }
                    );
                },

                /** 关闭div动作 15-3-22 */
                closeAlertDiv: function () {

                    /**隐藏alertDiv  15-3-22 */

                    /** 清空提示字符 15-3-22 */
                    $('#regDiv').find('.alertDiv').text('');

                    /** 隐藏div 15-3-22 */
                    $('#regDiv').find('.alertDiv').hide().css('top', '-43px');

                }
            },

            /** reg相关方法 15-3-17 */
            fun: {

                /** 变化按钮颜色 15-3-17 */
                changeBackColor: function () {

                    /** 变背景 变字颜色 15-3-22 */
                    $scope.reg.text.defaultStyle = $scope.reg.text.heightStyle;
                },


                /** 倒计时方法  15-3-20 */
                startSix: function (num) {
                    setTimeout(function () {

                        /** 判断num 为 59 的时候，计时结束，重置发短信按钮 15-3-22 */
                        if (num == 59) {
                            $scope.$apply(function () {
                                $scope.reg.text.sixTen = 60;
                                $scope.reg.text.defaultSm = '发送短信验证码';
                                $scope.reg.fun.resGetSm();
                            });
                        } else {

                            /**计时器自减  15-3-22 */
                            $scope.reg.text.sixTen--;

                            /** 变换内容为 60秒后重发 15-3-22 */
                            $scope.$apply(function () {
                                $scope.reg.text.defaultSm = $scope.reg.text.sixTen + $scope.reg.text.restSm;
                            });
                        }
                    }, 1000 * num);

                },


                /** 重置短信发送按钮 15-3-22 */
                resGetSm: function () {

                    /** 还原背景还原字体颜色  15-3-22 */
                    $scope.reg.text.defaultStyle = $scope.reg.text.reDefaultStyle;

                    /** 还原计时器 15-3-22 */
                    $scope.reg.text.sixTen = 60;
                },


            }

        };

        /**
         * 顶部登录对象
         * 15-4-3 */
        $scope.login = {

            /**
             * 文字相关
             * 15-4-3 */
            text: {},


            /**
             * login提示信息
             * 15-3-22 */
            alertInfo: {
                /** 弹出div动作 ,传入text或 html ,可执行回调函数15-3-22 */
                alertDiv: function (t, fun) {

                    /**
                     * 重置angular,给传入text绑定
                     * 15-5-3 */

                    $('#loginDiv').find('.alertDiv').show().html(t).animate(
                        {'top': '5px'},
                        600,
                        'easeOutElastic',
                        function () {
                            if (fun) {
                                fun();
                            }
                        }
                    );
                },

                /** 关闭div动作 15-3-22 */
                closeAlertDiv: function () {

                    /**隐藏alertDiv  15-3-22 */

                    /** 清空提示字符 15-3-22 */
                    $('#loginDiv').find('.alertDiv').text('');

                    /** 隐藏div 15-3-22 */
                    $('#loginDiv').find('.alertDiv').hide().css('top', '-43px');

                }
            },

            /**
             * 方法相关
             * 15-5-28 */
            fun: {
                /**
                 * input焦点动作 关闭closeLoginAlert
                 * 15-5-28 */
                focusInput: function () {
                    $scope.login.alertInfo.closeAlertDiv();
                },

                /**
                 * 验证用户名密码
                 * 15-5-28 */
                trueTelPass: function (tel, pass, fun) {
                    var url = '/Api/Api/trueLogin/';
                    var req = [
                        {name: 'mtNum', value: tel},
                        {name: 'passWord', value: pass}
                    ];
                    tools.postJsp($http, url, req, function (re) {
                        fun(re);
                    })
                },

                /**
                 * 登陆按钮点击动作
                 * 15-5-28 */
                loginInClick: function () {

                    /**
                     * 验证用户名空
                     * 15-5-28 */
                    var tel = $("#loginTel").val();
                    var passWord = $('#loginPass').val();

                    if (!tools.verify.isEmpty(tel) || !tools.verify.isEmpty(passWord)) {
                        /**
                         * 弹窗text, reg.alertInfo.alertDiv(t,fun)
                         * 15-5-28 */
                        $scope.login.alertInfo.alertDiv('手机号或者密码<br>不能为空');
                        return false;
                    } else {
                        $scope.login.fun.trueTelPass(tel, passWord, function (re) {
                            re = parseInt(re);
                            if (re == 200) {//登录成功
                                userFun.goUserCenter(tel, passWord);
                            } else {//显示错误信息
                                $scope.login.alertInfo.alertDiv(tools.verify.getError(re));
                                return false;
                            }
                        })
                    }
                },


            }
        };

        /**
         * 顶部忘记密码点击事件
         * 15-5-29 */
        $scope.forget = {
            /** reg文字相关 15-3-17 */
            text: {
                defaultSm: '<span style="color: #D9D4D4">发送短信获取<\/span> <b>登录密码<\/b>',
                defaultStyle: {
                    backgroundColor: '#004499',
                    lineHeight: '14px',
                    color: '#ffffff'
                },
                reDefaultStyle: {
                    backgroundColor: '#004499',
                    lineHeight: '14px',
                    color: '#ffffff'
                },
                heightStyle: {
                    backgroundColor: '#e3e3e3',
                    lineHeight: '14px',
                    color: '#000000'
                },
                restSm: '秒后重发',
                sixTen: 60
            },

            /** input相关 15-3-22 */
            input: {

                /** 静态相关 15-3-22 */
                telDefaultText: '手机号',

                /** 短信验证码 15-3-22 */
                smCodeDefault: '登录密码',

                /** 方法相关 15-3-22 */
                fun: {

                    /** 手机号输入焦点事件 15-3-22 */
                    regTelFocus: function () {

                        /** 关闭infodiv 15-3-22 */
                        $scope.forget.alertInfo.closeAlertDiv();

                        $scope.forget.input.telDefaultText = '';
                    },

                    /** 手机验证 方法对象 15-3-22 */
                    telFun: {

                        /**手机号为空，手机号格式是否正确  15-3-22 */

                        /** 验证手机号为空 15-3-22 */
                        _empty: function (telNum) {

                            /** 关闭infodiv 15-3-22 */
                            $scope.forget.alertInfo.closeAlertDiv();

                            if (!tools.verify.isEmpty(telNum)) {
                                $scope.forget.input.telDefaultText = '请输入手机号';
                                $scope.forget.alertInfo.alertDiv('手机号不能为空', function () {
                                });
                                return false;
                            } else {
                                return true;
                            }
                        },

                        /** 验证手机格式 15-3-22 */
                        _format: function (telNum) {

                            /** 关闭infodiv 15-3-22 */
                            $scope.forget.alertInfo.closeAlertDiv();

                            if (!tools.verify.checkMobile(telNum)) {
                                $scope.forget.alertInfo.alertDiv('手机格式不正确');
                                return false;
                            } else {
                                return true;
                            }
                        },

                        /** 验证手机号是否被注册 15-3-22 */
                        _isset: function (telNum, fun) {
                            var url = 'http://www.dipan.so/Api/Api/trueUserMt/mtNum/' + telNum;
                            tools.getJsp($http, url, function (re) {
                                if (re == 200) {
                                    var mess = '手机号不存在';
                                    $scope.forget.alertInfo.alertDiv(mess);
                                }
                                else if (re != 107) {//如果手机号存在就发送验证码
                                    var mess = tools.verify.getError(re);
                                    $scope.forget.alertInfo.alertDiv(mess);
                                    return false;
                                } else {
                                    fun(re);
                                }
                            });
                        }
                    },

                    /** 验证码验证 方法对象 15-3-22 */
                    codeFun: {

                        /** 验证验证码为空 15-3-22 */
                        _empty: function (telNum) {

                            /** 关闭infodiv 15-3-22 */
                            $scope.forget.alertInfo.closeAlertDiv();

                            if (!tools.verify.isEmpty(telNum)) {
                                $scope.forget.input.telDefaultText = '请输入验证码';
                                $scope.forget.alertInfo.alertDiv('验证码不能为空');
                                return false;
                            } else {
                                return true;
                            }
                        },

                        /** 验证验证的正确性 15-3-22 */
                        _codeTrue: function (telNum, code, fun) {
                            var url = 'http://www.dipan.so/Api/Api/trueCode/mtNum/' + telNum + '/code/' + code;
                            tools.getJsp($http, url, function (re) {
                                if (re != 200) {
                                    $scope.forget.alertInfo.alertDiv(tools.verify.getError(re));
                                    return false;
                                } else {
                                    fun(re);
                                }
                            });
                        }
                    },

                    /** 手机号输入离开事件 15-3-22 */
                    regTelBlur: function () {

                        /** 关闭infodiv 15-3-22 */
                        $scope.forget.alertInfo.closeAlertDiv();

                        var telNum = $('#forgetRegTel').val();

                        /** 验证手机空 15-3-22 */
                        if (this.telFun._empty(telNum)) {
                            /** 验证手机格式 15-3-22 */
                            if (this.telFun._format(telNum)) {
                                /** 验证手机号是否被注册 15-3-24 */
                                this.telFun._isset(telNum, function (re) {
                                })
                            }
                        }
                    },

                    /** 发送验证码点击事件  15-3-17 */
                    clickSendSm: function () {

                        var telNum = $('#forgetRegTel').val();

                        /** 验证手机号空和格式 15-3-22 */
                        if ($scope.forget.input.fun.telFun._empty(telNum) && $scope.forget.input.fun.telFun._format(telNum) && ($scope.forget.text.sixTen == 60)) {

                            /** 验证手机号是否注册过  15-3-24 */
                            $scope.forget.input.fun.telFun._isset(telNum, function (re) {

                                if (re == 107) {//如果手机号注册过，就去发送验证码

                                    /**
                                     * 验证手机号存在，发送验证码
                                     * 15-4-3 */
                                    var roundCodeId = $('#forgetCode').attr('roundCodeId');

                                    /** 如果有随机id && 倒计时没开始，就去获取验证码 15-3-24 */
                                    if (roundCodeId && ($scope.forget.text.sixTen == 60)) {
                                        var url = g.apiUrl + 'Api/Sem/getCode/forget/1/roundCodeId/' + roundCodeId + '/mtNum/' + telNum;//组合网址加入 forget参数，判断为忘记密码发短信方法，连贯操作修改用户密码
                                        tools.getJsp($http, url, function (re) {
                                            if (re == 200) {

                                                /** 判断计时器为60 的时候 才有点击动作 15-3-22 */
                                                if ($scope.forget.text.sixTen == 60) {

                                                    /** 验证吗发送成功 15-3-24 */
                                                    $scope.forget.alertInfo.alertDiv('登录密码已发送');

                                                    /** 变换按钮颜色 15-3-17 */
                                                    $scope.forget.fun.changeBackColor();

                                                    /** 倒计时字数切换 15-3-22 */
                                                    for (var i = 0; i < 60; i++) {
                                                        $scope.forget.fun.startSix(i);
                                                    }
                                                }

                                            }
                                        });
                                    } else {

                                        /**如果倒计时开始  15-3-24 */
                                        if ($scope.forget.text.sixTen == 60) {
                                            $scope.forget.alertInfo.alertDiv('获取短信密码失败');
                                            console.log('error', 'roundCodeId未获取到');
                                        }
                                    }

                                } else {
                                    $scope.forget.alertInfo.alertDiv('手机号不存在', function () {
                                    });
                                    return false;
                                }
                            });
                        }

                    },

                    /** 忘记密码登录按钮提交事件 15-3-22 */
                    //forgetLoginSub: function () {
                    //
                    //    /** 验证电话空，格式，是否注册过 ||| 验证码空，正确性 15-3-22 */
                    //
                    //    var telNum = $('#forgetRegTel').val();//电话号码val
                    //    var code = $('#forgetCode').val();//验证码
                    //
                    //
                    //    /** 验证手机号空和格式,是否注册过 ,验证码空 15-3-22 */
                    //    if ($scope.forget.input.fun.telFun._empty(telNum) && $scope.forget.input.fun.telFun._format(telNum) && $scope.forget.input.fun.codeFun._empty(code)) {
                    //
                    //        /** 判断手机号是否注册，执行回调 15-3-24 */
                    //        $scope.forget.input.fun.telFun._isset(telNum, function (re) {
                    //
                    //            /** 判断已经注册(手机号存在) 15-3-24 */
                    //            if (re == 107) {
                    //                /**
                    //                 * 验证码对应电话正确性
                    //                 * 15-3-25 */
                    //                $scope.forget.input.fun.codeFun._codeTrue(telNum, code, function (re) {
                    //                    if (re == 200) {
                    //                        var postArr = $('#forgetFrom').serializeArray();
                    //                        var url = '/Member/Index/regIn';
                    //                        tools.postJsp($http, url, postArr, function (re) {
                    //                            console.log('postRe', re);
                    //                            if (re != 200) {
                    //                                $scope.forget.alertInfo.alertDiv(tools.verify.getError(re));
                    //                            } else {
                    //                                /**
                    //                                 * todo,跳转到会员中心，或者审核发帖通过
                    //                                 * 15-3-27 */
                    //                                $scope.forget.alertInfo.alertDiv('注册成功');
                    //                            }
                    //                        })
                    //
                    //
                    //                    } else {
                    //                        $scope.forget.alertInfo.alertDiv(tools.verify.getError(re));
                    //                        return false;
                    //                    }
                    //                });
                    //            } else {
                    //                $scope.forget.alertInfo.alertDiv(tools.verify.getError(re));
                    //                return false;
                    //            }
                    //
                    //        })
                    //    }
                    //},


                    /**
                     * 忘记密码登陆按钮点击动作
                     * 15-5-28 */
                    loginInClick: function () {

                        /**
                         * 验证用户名空
                         * 15-5-28 */
                        var tel = $("#forgetRegTel").val();
                        var passWord = $('#forgetCode').val();

                        if (!tools.verify.isEmpty(tel) || !tools.verify.isEmpty(passWord)) {
                            /**
                             * 弹窗text, reg.alertInfo.alertDiv(t,fun)
                             * 15-5-28 */
                            $scope.forget.alertInfo.alertDiv('手机号或者密码<br>不能为空');
                            return false;
                        } else {
                            $scope.login.fun.trueTelPass(tel, passWord, function (re) {
                                re = parseInt(re);
                                if (re == 200) {//登录成功
                                    userFun.goUserCenter(tel, passWord);
                                } else {//显示错误信息
                                    $scope.forget.alertInfo.alertDiv(tools.verify.getError(re));
                                    return false;
                                }
                            })
                        }
                    }

                }
            },

            /** 提示信息 15-3-22 */
            alertInfo: {
                /** 弹出div动作 ,传入text 或 html ,可执行回调函数15-3-22 */
                alertDiv: function (t, fun) {
                    var _temCount = $scope.forget.input.tempCount;

                    /**
                     * 重置angular,给传入text绑定
                     * 15-5-3 */

                    $('#forgetPassDiv').find('.alertDiv').show().html(t).animate(
                        {'top': '5px'},
                        600,
                        'easeOutElastic',
                        function () {
                            if (fun) {
                                fun();
                            }
                        }
                    );
                },

                /** 关闭div动作 15-3-22 */
                closeAlertDiv: function () {

                    /**隐藏alertDiv  15-3-22 */

                    /** 清空提示字符 15-3-22 */
                    $('#forgetPassDiv').find('.alertDiv').text('');

                    /** 隐藏div 15-3-22 */
                    $('#forgetPassDiv').find('.alertDiv').hide().css('top', '-43px');

                }
            },

            /** 忘记密相关方法 15-3-17 */
            fun: {

                /** 变化按钮颜色 15-3-17 */
                changeBackColor: function () {

                    /** 变背景 变字颜色 15-3-22 */
                    $scope.forget.text.defaultStyle = $scope.forget.text.heightStyle;
                },


                /** 倒计时方法  15-3-20 */
                startSix: function (num) {
                    setTimeout(function () {

                        /** 判断num 为 59 的时候，计时结束，重置发短信按钮 15-3-22 */
                        if (num == 59) {
                            $scope.$apply(function () {
                                $scope.forget.text.sixTen = 60;
                                $scope.forget.text.defaultSm = '发送短信验证码';
                                $scope.forget.fun.resGetSm();
                            });
                        } else {

                            /**计时器自减  15-3-22 */
                            $scope.forget.text.sixTen--;

                            /** 变换内容为 60秒后重发 15-3-22 */
                            $scope.$apply(function () {
                                $scope.forget.text.defaultSm = $scope.forget.text.sixTen + $scope.forget.text.restSm;
                            });
                        }
                    }, 1000 * num);

                },


                /** 重置短信发送按钮 15-3-22 */
                resGetSm: function () {

                    /** 还原背景还原字体颜色  15-3-22 */
                    $scope.forget.text.defaultStyle = $scope.forget.text.reDefaultStyle;

                    /** 还原计时器 15-3-22 */
                    $scope.forget.text.sixTen = 60;
                }


            }

        };

        /**
         * 判断会员中心 登录 跳转的 login网址。来显示 登录面板
         * 15-6-23 */
        var loginUrlTure = function () {
            var url = window.location.href;
            url = url.split('dipan.so/');
            console.log('url', url[1]);
            if (url[1] == 'Member/Index/login') {
                /**
                 * 调用登录点击事件
                 * 15-6-23 */
                $scope.showLogin();
            }
            ;
        };
        loginUrlTure();


        /**
         * 用户登录后跳转到会员中心，同时记录cookie
         * 15-6-11 */
        var userFun = {

            /**
             * 跳转到会员中心
             * 15-6-11 */
            goUserCenter: function (mt, passWord) {
                this.setLogin(mt, passWord, function () {
                    var url = '/Member/MemberIn/';
                    setTimeout(function () {
                        window.location.href = url;
                    }, 800);
                })
            },

            /**
             * 记录cookie,session登录
             * 15-6-11 */
            setLogin: function (mt, passWord, fun) {
                if (mt && passWord) {

                    userFun.setSession(mt, passWord, function (re) {

                        if (re == 200) {

                            /**
                             * 如果 session isLogin 写入成功,记录 cookie
                             * 15-6-25 */
                            tools.setCookie('isLogin', 'ture');
                            tools.setCookie('userMt', mt);

                            /**
                             * 回调
                             * 15-6-11 */
                            setTimeout(function () {
                                fun(re);
                            }, 400);
                        } else {
                            /**
                             * 弹出错误
                             * 15-6-25 */
                            var mess = tools.verify.getError(re);
                            setTimeout(function () {
                                $scope.login.alertInfo.alertDiv(mess);
                                return false;
                            }, 200);
                        }
                    });


                }
            },

            /**
             * 请求MebmerApi 记录session
             * 15-6-18 */
            setSession: function (mt, passWord, fun) {
                var url = '/Member/Index/giveSession';
                var data = [
                    {
                        name: 'mtNum',
                        value: mt
                    },
                    {
                        name: 'passWord',
                        value: passWord
                    }
                ];

                tools.postJsp($http, url, data, function (re) {
                    fun(re);
                });
            }
        }

        /**
         * 会员中心顶部对象
         * 15-6-25 */
        $scope.memberTop = {}


        /**
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         *
         * 15-3-17 */
    });
});