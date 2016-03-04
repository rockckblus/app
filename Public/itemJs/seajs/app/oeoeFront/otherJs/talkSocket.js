/**
 * @fileOverview talkSocket.js 全局广播angualr控制器
 * 15-2-26
 */


define(function (require) {
    /**
     * 载入全局
     * 15-2-25
     */
    var g = require('seajs/app/oeoeFront/g');

    /**
     * 载入angularFactory
     * 15-2-25
     */
    require('seajs/dist/angular/factory');

    /**
     * @description socket控制器
     * @namespace talkSocket
     */
    g.diPanApp.controller('talkSocket', function ($scope, socket) {


        /**
         * 15-2-26
         * @description 声明一个socket对象
         * @class
         * @memberOf talkSocket
         */
        $scope.sk = {

            /**
             * @description  talk 新接受的List
             * @field
             */
            list: [],

            /**
             * @description talk 刷新之后记录的List
             * @field
             */
            oldList: [],

            /**
             * @description 临时newList，给下拉效果时候的model
             * @field
             */
            newList: []
        }

        /**
         * @description 获取房间id
         * @field
         */
        var roomId = $('#talkRoomId').attr('roomid');//

        /**
         * 15-2-26
         * @description  talk ui缓动 效果
         * @constructor talkUi
         * @memberOf talkSocket
         */
        var fun = {

            /**
             * @param content {args} 一条talkOBJ
             * @description 向LIST开头插入一条talk
             * @field
             */
            setTimCount: true,
            setIntFun: function () {
                setInterval(function () {//间隔2秒 设置 时间统计为true
                    fun.setTimCount = true;
                }, 2000);
            },
            unShift: function (content) {
                /** 向新list插入 15-2-26 */
                $scope.sk.list.push(content);
                if (fun.setTimCount) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            fun.inOldList($scope.sk.list);

                            /** 清空list 15-2-27 */
                            $scope.sk.list = [];
                        })
                    }, 2000)
                }
            },

            /**
             * @param d  {args} $scope.sk.list
             * @description 向oldList插入并销毁新list
             * @field
             */
            inOldList: function (d) {

                /** 下移oldListDiv 15-2-26 */
                fun.moveDownOldListDiv(d.length);

                /** 给newList值 15-2-26 */
                $scope.sk.newList = $scope.sk.list.reverse();

                /** newList缓动效果 15-2-26 */
                fun.newListMoveDown(d.length, function () {
                    /** 回调 15-2-27 */
                    d.reverse();
                    /** 给oldList push newList的item 15-2-27 */
                    for (var i = 0; i < d.length; i++) {
                        $scope.sk.oldList.unshift(d[i]);
                        if (i == (d.length - 1)) {
                            /** 当循环完成执行方法 15-2-27 */

                            fun.setTimCount = false;
                            setTimeout(function () {
                                /** 上移动oldListDiv */
                                fun.moveUpOldListdiv();


                                /** 上移动newList， 15-2-26 */
                                fun.hideNewList();
                                setTimeout(function () {

                                    /** 清空newList 15-2-27 */
                                    $scope.sk.newList = [];
                                    $scope.$apply();
                                }, 100);
                            }, 0);
                        }
                    }
                });
            },

            /**
             * @param length {int} newList的长度
             * @description 像下移动oldList div 固定长度 X newList的数量
             * @field
             */
            moveDownOldListDiv: function (length) {
                $('.oldList').css('top', 0 * length + 'px');
            },

            /**
             * @description oldList向上移动到顶部
             * @field
             */
            moveUpOldListdiv: function () {
                $('.oldList').css('top', '0px');
            },

            /**
             * @description newList缓动函数
             * @field
             */
            newListMoveDown: function (length, fun) {
                $('.newList').css('top', -10 * length + 'px');
                $('.newList').animate({'top': '0px'}, 1200, "easeOutSine", function () {
                    fun();
                });
            },

            /**
             * @description newlist 隐藏
             * @field
             */
            hideNewList: function () {
                $('.newList').css('top', '0px');
            }

        }


        /**
         * @description 间隔2秒 设置 时间统计为true
         * @field
         */
        fun.setIntFun();

        /**
         * 15-2-26
         * @description 当服务连接事件
         * @constructor sockeOnconnect
         * @event
         * @memberOf talkSocket
         */
        socket.on('connect', function () {

            /**
             * 15-2-26
             * @description 发射房间id
             * @constructor socketEmitJoin
             * @memberOf talkSocket
             * @event
             */
            socket.emit('join', roomId);
            fun.unShift({'hello': '连接'});
            /**
             * 15-2-26
             * @description 接受socket服务传来的 news 事件消息
             * @constructor socketOnNew
             * @memberOf talkSocket
             * @event
             */
            socket.on('news', function (message) {
                fun.unShift(message);
            });

            /** 其他 15-2-26 */
            socket.on('my other event', function () {
                $('#incomingChatMessages').append('<li>Disconnected</li>');
            });
        });
        /**
         * 15-2-26
         * @description 键盘回车事件，绑定到 #inputTall 。value
         * @constructor inputTalkKeypres
         * @memberOf talkSocket
         * @event
         */
        /** 键盘回车事件 15-2-26 */
        $('#inputTalk').keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                var msg = $('#inputTalk').val();
                socket.emit('talk', msg);
                $scope.$apply(function () {
                    fun.unShift({'hello': msg});
                });
                $('#inputTalk').val('');
            }
        });
    })
});
