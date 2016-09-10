/**
 * getList.dipan.listAndAddList.factory.js
 * 命名注释：server简称_getList. 父模块 dipan . 功能_获取不同板块的数据 , && 判断状态,来新加数据到最前面,或者 最后面 . 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('getList', getList);

    getList.$inject = ['tools', 'config', '$timeout'];

    var thisObj = {};
    var _tools;
    var _config;
    var _timeout;

    function getList(tools, config, $timeout) {
        /**
         * 遍历不同url,返回 list 数据 ,
         * @param {$state.current.name} name
         * @param {获取最新数据的本地缓存的 最新id} frontId
         * @param {获取最新数据的本地缓存的 最后id} endId
         */
        thisObj.getList = _getList;//swith name  , 去不同接口拿数据 ,&& 判断状态,来新加数据到最前面,或者 最后面,存储到 本地 20条缓存数据.(上啦 最新20条,下拉最后20条)
        thisObj._init = function () {
            _tools = tools;
            _config = config;
            _timeout = $timeout;
        };

        //start
        thisObj._init();
        return thisObj;
    }

    /**
     * 遍历不同url,返回 list 数据 ,
     * @param {$state.current.name} name
     * @param {获取最新数据的本地缓存的 最新id} frontId
     * @param {获取最新数据的本地缓存的 最后id} endId
     * @param {作用域变量} scope.list
     * @param {function 成功后的回调} callBack
     */
    function _getList(name, frontId, endId, scope, listNam, callBack) {
        var url;
        var type = 1;//1上啦,2下拉
        switch (name) {
            case 'memberIndex':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            case 'home':
                url = 'http://dipan.so:3082/sns/getList?' + _tools.getRoundCode(8);
                  break;
            case 'login':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            case 'area':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            case 'search':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            default:
                return false;
        }

        if (url) {
            var _frontId = 0;
            if (frontId) {
                _frontId = frontId;
            }

            var _endId = 0;
            if (endId) {
                _endId = endId;
                type = 2;
            }

            var postData = {
                'frontId': _frontId,
                'endId': _endId,
            };

            _tools.postJsp(url,postData).then(call, err);//正式
            //_tools.getJsp(url).then(call, err);//测试 todo
        }

        function call(re) {
            //合并新的list 和 缓存的数据,去存储到缓存, 回调 合并后的数据
            _addNewListToOldList(re.doc, function (reAllList) {
                _timeout(function () {
                    eval("scope." + listNam + "= reAllList");
                    callBack();//回调去绑定点击事件
                }, 0);
            });

            function _addNewListToOldList(newlist, _call) {
                var allList = [];
                var tempNewList = [];//下拉用

                angular.forEach(newlist, function (vo) {
                    if (type == 2) {//下拉
                        tempNewList.push(vo);
                    } else {//上啦
                        allList.push(vo);
                    }
                });

                //数据库的 数据 push
                setTimeout(function () {
                    var oldList = _tools.getLocalStorageObj(name);
                    if (oldList) {
                        angular.forEach(oldList, function (vo2) {
                            delete vo2.$$hashKey;
                            allList.push(vo2);
                        });
                    }

                }, 200);

                if (type == 2) {//下拉
                    setTimeout(function () {
                        angular.forEach(tempNewList, function (vo3) {
                            allList.push(vo3);
                        });
                    }, 300);
                }

                setTimeout(function () {
                    var saveList = saveLocalObjEdit(allList);
                    _tools.saveLocalStorageObj(name, saveList);//存储obj 20条
                    _call(allList);
                }, 400);
            }
        }

        function err() {
            _tools.alert({
                title: '网络请求失败',
                content: '请检查网络'
            });
        }

        /**
         * save到数据库之前的 编辑 ,只缓存20条数据
         * @param {obj}obj
         * @param {NUmber 1上滑 2下滑}type
         * @returns {obj 过滤后的数据}
         */
        function saveLocalObjEdit(obj) {
            var re = [];
            var tempCount = 0;
            angular.forEach(obj, function (vo) {
                tempCount++;

                if (obj.length < 20) {
                    re.push(vo);
                } else {
                    if (type == 1) {// 上啦条件 小于20
                        if (tempCount < 20) {
                            re.push(vo);
                        }
                    }

                    if (type == 2) {//下拉条件 大于总数量 - 20
                        if (tempCount > (obj.length - 20)) {
                            re.push(vo);
                        }
                    }
                }


            });
            return re;
        }
    }


})();