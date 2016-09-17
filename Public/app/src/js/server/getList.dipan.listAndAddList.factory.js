/**
 * getList.dipan.listAndAddList.factory.js
 * 命名注释：server简称_getList. 父模块 dipan . 功能_获取不同板块的数据 , && 判断状态,来新加数据到最前面,或者 最后面 . 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('getList', getList);

    getList.$inject = ['tools', 'config', '$timeout', 'compile', '$state', '$rootScope'];

    var thisObj = {};
    var _tools;
    var _config;
    var _timeout;
    var _compile;
    var _state;
    var _rootScope;


    function getList(tools, config, $timeout, compile, $state, $rootScope) {
        /**
         * 遍历不同url,返回 list 数据 ,
         * @param {$state.current.name} name
         * @param {获取最新数据的本地缓存的 最新id} frontId
         * @param {获取最新数据的本地缓存的 最后id} endId
         */
        thisObj.getList = _getList;//swith name  , 去不同接口拿数据 ,&& 判断状态,来新加数据到最前面,或者 最后面,存储到 本地 最新20条缓存数据.(上啦 最新20条,下拉最后20条)
        thisObj._init = function () {
            _tools = tools;
            _config = config;
            _timeout = $timeout;
            _compile = compile;
            _state = $state;
            _rootScope = $rootScope;
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

    var callSucessCount = 0;

    function _getList(name, frontId, endId, scope, listNam, callBack) {
        var url;
        var type = 1;//1上啦,2下拉
        switch (name) {
            case 'memberIndex':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            case 'home':
                url = 'http://192.168.18.15:3082/sns/getList?' + _tools.getRoundCode(8);
                break;
            case 'need':
                url = 'http://192.168.18.15:3082/sns/getList?' + _tools.getRoundCode(8);
                break;
            case 'star':
                url = true;
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

            /**************************
             * @returns {Obj 缓存的list对象} catchObj
             * @returns {getNext 布尔} getNext true 进行下面的 http 请求
             * 16/9/16 上午11:27 ByRockBlus
             **************************/

            _getCatchList(function (catchObj, getNext) {
                console.log('catObj', catchObj, getNext);
                if (getNext) {
                    _tools.postJsp(url, postData).then(call, err);
                } else {
                    call(catchObj);
                }
            });

        }

        /**************************
         * 先去执行读取缓存逻辑,再回调,网络请求
         * 遍历url 执行不同逻辑,供,需,其他 都执行相同逻辑, 标记 直接 读取缓存数据,
         * 16/9/16 上午8:12 ByRockBlus
         **************************/
        function _getCatchList(__call) {
            switch (_state.current.name) {
                case 'star' :
                    _logicStar(__call);//星标的逻辑
                    break;
                default:
                    _logicHome(__call);//供`需`其他 的逻辑
                    break;
            }
        }

        /**************************
         * 星标的逻辑
         * 读取缓存的 星标 list对象返回,如果 为空  提示alert
         *
         * 16/9/16 上午11:10 ByRockBlus
         **************************/
        function _logicStar(___call) {

            var starCatchList = _tools.getLocalStorageObj('star');
            if (!starCatchList || !starCatchList [0]) {
                _tools.alert({
                    title: '没有标记过的信息'
                });
                _rootScope.$broadcast('closeLoading');
                return;
            } else {
                var re = {
                    doc: starCatchList
                };
                _rootScope.$broadcast('closeLoading');
                ___call(re);
            }
        }

        /**************************
         * home  供`需`其他 的逻辑
         * 16/9/16 上午11:10 ByRockBlus
         **************************/
        function _logicHome(___call) {

            ___call('', true);
        }


        function call(re) {
            //合并新的list 和 缓存的数据,去存储到缓存, 回调 合并后的数据
            _addNewListToOldList(re.doc, function (reList) {
                if (!re.doc[0]) {
                    callSucessCount++;
                    setTimeout(function () {
                        if (callSucessCount > 1) {
                            _tools.alert({
                                title: '没有更多数据啦! ^_^'
                            });
                        }
                    }, 0);
                    return false;
                } else {
                    callSucessCount = 0;
                }

                _timeout(function () {
                    eval("scope." + listNam + "= reList");
                    callBack(reList, listNam);//回调去绑定点击事件
                }, 0);
            });


            /**************************
             * 复写call成功之后逻辑,
             *
             * 思路:每一次请求回来的数据,独立成为一个 list 模型,不去更新原有list,
             * 存储到缓存,覆盖原有的缓存
             *
             * 16/9/12 下午12:30 ByRockBlus
             **************************/



            function _addNewListToOldList(newlist, _call) {
                var strVar = "";
                strVar += "        <li id=\"repListLi\"  class=\"mui-table-view-cell item\" url=\"content#{{vo.id}}\" bindonce bo-attr ng-repeat=\"\"";
                strVar += "            style=\"background-color: #fff;margin-top: 10px\">";
                strVar += "            <div class=\"clear\">";
                strVar += "                <div class=\"left listHeader\">";
                strVar += "                    <img bo-src=\"vo.listHeader\"/>";
                strVar += "                <\/div>";
                strVar += "                <div class=\"left listTitle\">";
                strVar += "                    <span bo-text=\"vo.title\"><\/span>";
                strVar += "                <\/div>";
                strVar += "            <\/div>";
                strVar += "            <div class=\"mui-navigate-right\" style=\"font-size:14px;color: #777;margin-top: 5px\" bindonce";
                strVar += "                 ng-repeat=\"(key,vo2) in vo.content\">";
                strVar += "                <span style=\"color:#bd0000\" bo-text=\"key + ':'\"><\/span>";
                strVar += "                <span bo-text=\"vo2\"><\/span>";
                strVar += "            <\/div>";
                strVar += "";
                strVar += "            <div class=\"panle\">";
                strVar += "                <div class=\"mui-btn fa fa-weixin fa-1x icon-btn\"><\/div>";
                strVar += "                <div class=\"mui-btn fa  fa-1x icon-btn-noBack iconStar\" ng-class=\"vo.iconStar\" bo-attr";
                strVar += "                     bo-attr-iconId=\"vo._id\"><\/div>";
                strVar += "            <\/div>";
                strVar += "        <\/li>";

                var repListHtml = angular.element(strVar);
                repListHtml.attr('ng-repeat', "vo in " + listNam);
                repListHtml.attr('listName', listNam);
                repListHtml.attr('bo-id', 'vo._id');
                _compile('list', repListHtml[0], scope, true);
                _call(newlist);
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

        /**************************
         *  只去存储 当天 浏览 的 数据 ,加入日期标记
         * 16/9/17 上午10:23 ByRockBlus
         **************************/
        function saveCatecNewList(obj) {

        }


    }


})();