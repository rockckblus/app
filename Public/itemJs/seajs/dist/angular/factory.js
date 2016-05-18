/**
 * angular Factory
 * @namespace all
 * 15-2-25
 */
define(function(require){

    /**
     * 载入全局
     * 15-2-25
     */
    var g = require('seajs/app/oeoeFront/g');

    /**
     * 载入socket.io库
     * 15-2-25
     */
    require('http://www.dipan.so:8081/socket.io/socket.io.js');

    /**
     * 封装socket到angular
     * 15-2-25
     */
    g.diPanApp.factory('socket', function ($rootScope) {
        var socket = io.connect('http://www.dipan.so:8081');
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    })
                })
            },
            emit:function (eventName,data,callback){
                socket.emit(eventName,data,function(){
                    var args = arguments;
                    $rootScope.$apply(function(){
                        if(callback){
                           callback.apply(socket,args);
                        }
                    })
                })
            }
        }
    })});