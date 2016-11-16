/**
 * getList.dipan.listAndAddList.factory.js
 * 命名注释：server简称_getList. 父模块 dipan . 功能_获取不同板块的数据 , && 判断状态,来新加数据到最前面,或者 最后面 . 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('getList', getList);

    getList.$inject = ['tools', 'config', '$timeout', 'compile', '$state', '$rootScope', '$filter'];

    var thisObj = {};
    var _tools;
    var _config;
    var _timeout;
    var _compile;
    var _state;
    var _rootScope;
    var _filter;


    function getList(tools, config, $timeout, compile, $state, $rootScope, $filter) {
        /**
         * 全局缓存变量对象
         * @type {{home: Array, need: Array}}
         */
        thisObj.globalCatchList = {
            home: [],
            need: [],
            starArr: [],//标记数组
        };
        thisObj.pushToGoldCatcth = pushToGoldCatcth;//push 到全局变量数组 ,传入 newList
        thisObj.delGoldCatcth = delGoldCatcth;//del 全局变量数组
        thisObj.saveCatecNewList = saveCatecNewList;//存储全局变量数组 到本地localStroe 传入listObj
        thisObj.delStarIdFromStarArr = delStarIdFromStarArr;//从标记的 全局缓存数组里删除 指定 标记 id
        thisObj.editShowStar = editShowStar;//从全局缓存数组遍历 标记过的 star, 给list 赋值

        /**
         * 遍历不同url,返回 list 数据 ,
         * @param {$state.current.name} name
         * @param {获取最新数据的本地缓存的 最新id} frontId
         * @param {获取最新数据的本地缓存的 最后id} endId
         */
        thisObj.getList = _getList;//swith name  , 去不同接口拿数据 ,&& 判断状态,来新加数据到最前面,或者 最后面,存储到 本地 最新20条缓存数据.(上啦 最新20条,下拉最后20条)
        thisObj.giveFirstCatchList = _addNewListToOldList;//第一次 绑定缓存的情况 供外部调用
        thisObj._init = function () {
            _tools = tools;
            _config = config;
            _timeout = $timeout;
            _compile = compile;
            _state = $state;
            _rootScope = $rootScope;
            _filter = $filter;
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
                url = _config.host.nodeHost + '/sns/homeGetList?' + _tools.getRoundCode(8);
                break;
            case 'need':
                url = _config.host.nodeHost + '/sns/needGetList?' + _tools.getRoundCode(8);
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
                if (getNext) {
                    //call(catchObj);
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
                    list: starCatchList
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
            delDataReturnThisData();
            ___call('', true);
        }

        function call(re) {

            try {
                //合并新的list 和 缓存的数据,去存储到缓存, 回调 合并后的数据
                _addNewListToOldList(re.list, function (reList) {
                    //标记star
                    reList = editShowStar(reList);

                    if (!re.list && !re.list[0]) {
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
                }, listNam, scope);
            } catch (e) {
                console.error('error', e);
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
         * 遍历catchname, 删除 过期的 缓存数据,
         * 16/9/17 下午1:45 ByRockBlus
         **************************/
        function delDataReturnThisData() {
            var allList = _tools.getAllCatchListName();//所有缓存的 key
            _init();
            function _init() {
                _delNoTodyCatchList();//删除不需要缓存的 list 数据
            }

            /**
             * 删除不是 今天的缓存list 数据
             * @private
             */
            function _delNoTodyCatchList() {
                angular.forEach(allList, function (vo) {
                    __delCatchListName(vo);
                });
                /**
                 * 判断是不是需要删除的listName,如果是就删除
                 * @parme {catchName}
                 * @private
                 */
                function __delCatchListName(catchName) {

                    var chaName = catchName.split('_');
                    if (chaName[0] == 'catchList') {//判断 是 list对象
                        var _chaName = catchName.split('-');
                        var thisToday = _tools.getToday();
                        if (_chaName[1] !== thisToday) {
                            localStorage.removeItem(catchName);
                        }
                    }
                }
            }
        }

    }

    /**
     * 复写call成功之后逻辑,
     *
     * 思路:每一次请求回来的数据,独立成为一个 list 模型,不去更新原有list,
     * 存储到缓存,覆盖原有的缓存
     *
     * @param newlist
     * @param _call
     * @param listNam
     * @param scope
     * @param  {布尔}isCatch 判断是缓存调用的
     *
     * */
    function _addNewListToOldList(newlist, _call, listNam, scope, isCatch) {

        //判断newList 里面的 id 是否有 标记
        var strVar = "";
        strVar += "        <li class=\" item homeListItem thinner-border\" bindonce bo-attr bo-attr-url=\"'content#'+vo.id\"  bo-id='vo._id' ";
        strVar += "            style=\"background-color: #fff;\">";
        strVar += "            <div class=\"clear contentItem\">";
        strVar += "                <div class=\"contentItemTitle clear\" bo-text=\"vo.title\"><\/div>";
        strVar += "                <div class=\"contentItemTitleCounent clear\">";
        strVar += "                <div class=\"left \">" +
            "<span class='' style='color:#db5140' bo-text='\"￥\" + vo.price'><\/span>" +
            "<span class=''>\&nbsp;|&nbsp;</span>" +
            "<span class='' bo-text='vo.danWei'></span>" +
            "<span class='fa fa-map-marker' style='margin-left: 1rem'></span>" +
            "<span class='' style='margin-left: 3px' bo-text='vo.far + \"km\"'></span>" +
            "<\/div>";
        strVar += "                <\/div>";
        strVar += "                <div class=\"line clear marginLine\"><\/div>";
        // strVar += "                <div class=\"left listHeader\">";
        // strVar += "                    <img bo-src=\"vo.listHeader\"/>";
        // strVar += "                <\/div>";
        strVar += "            <\/div>";
        // strVar += "            <div class=\"mui-navigate-right\" style=\"font-size:14px;color: #777;margin-top: 5px\" bindonce";
        // strVar += "                 ng-repeat=\"(key,vo2) in vo.content\">";
        // strVar += "                <span style=\"color:#bd0000\" bo-text=\"key + ':'\"><\/span>";
        // strVar += "                <span bo-text=\"vo2\"><\/span>";
        // strVar += "            <\/div>";
        // strVar += "";
        // strVar += "            <div class=\"panle\">";
        // strVar += "                <div class=\"mui-btn fa fa-weixin fa-1x icon-btn\"><\/div>";
        // strVar += "                <div class=\"mui-btn fa  fa-1x icon-btn-noBack iconStar\" ng-class=\"vo.iconStar\" bo-attr";
        // strVar += "                     bo-attr-iconId=\"vo._id\"><\/div>";
        // strVar += "            <\/div>";
        strVar += "        <\/li>";

        var repListHtml = angular.element(strVar);
        repListHtml.attr('ng-repeat', "vo in " + listNam);
        repListHtml.attr('listName', listNam);
        // repListHtml.attr('bo-id', 'vo._id');

        _compile('list', repListHtml[0], scope, true);
        if (!isCatch) {//如果不是 缓存请求
            pushToGoldCatcth(newlist);//push 到全局变量数组
            //saveCatecNewList(newlist);//合并存储到缓存
        }
        _call(newlist);
    }

    /**************************
     *  只去存储 当天 浏览 的 数据 ,加入日期标记
     *  传入 list对象
     * 16/9/17 上午10:23 ByRockBlus
     **************************/
    function saveCatecNewList() {

        var newList;
        var thisUrl = _state.current.name;
        switch (thisUrl) {
            case 'home':
                newList = thisObj.globalCatchList.home;
                _tools.saveLocalStorageObj('starArr', thisObj.globalCatchList.starArr);
                break;
            case 'need':
                newList = thisObj.globalCatchList.need;
                _tools.saveLocalStorageObj('starArr', thisObj.globalCatchList.starArr);
                break;
            case 'star':
                //存储 star
                _tools.saveLocalStorageObj('starArr', thisObj.globalCatchList.starArr);
                break;
        }

        if (!newList) {
            return false;
        }

        var oldArr = [];
        var thisLogName = 'catchList_' + _state.current.name + '-' + _tools.getToday();

        var tempCount = 0;
        angular.forEach(newList, function (voNew) {
            angular.forEach(voNew, function (vo) {
                tempCount++;
                try {
                    vo.iconStar = 'fa-star-o';
                    delete(vo.$$hashKey);
                } catch (e) {
                    console.error('删除hashKey失败');
                }
                if (tempCount < 10) {
                    oldArr.push(vo);
                } else {
                    return false;
                }
            });
        });

        //存储 catch
        _tools.saveLocalStorageObj(thisLogName, oldArr);

        //存储 star 从本地读取 记录的,加上新加的 ,一起存储
        // _saveStarNewAndOld();
        function _saveStarNewAndOld() {
            var endArr = [];
            var oldArr = _tools.getLocalStorageObj('starArr');
            console.log('oldArr', oldArr);
            var newArr = thisObj.globalCatchList.starArr;
            angular.forEach(oldArr, function (vo1) {
                endArr.push(vo1);
            });
            angular.forEach(newArr, function (vo2) {
                endArr.push(vo2);
            });

            _tools.saveLocalStorageObj('starArr', endArr);
        }

        delGoldCatcth();//删除当前url的全局缓存数组
    }

    /**
     * push 到全局缓存变量数组
     */
    function pushToGoldCatcth(newList) {
        var thisUrl = _state.current.name;
        switch (thisUrl) {
            case 'home':
                thisObj.globalCatchList.home.push(newList);
                break;
            case 'need':
                thisObj.globalCatchList.need.push(newList);
                break;
        }
    }

    /**
     * 清空 全局缓存变量数组
     */
    function delGoldCatcth() {
        var thisUrl = _state.current.name;
        switch (thisUrl) {
            case 'home':
                thisObj.globalCatchList.home = [];
                thisObj.globalCatchList.starArr = [];
                break;
            case 'need':
                thisObj.globalCatchList.need = [];
                thisObj.globalCatchList.starArr = [];
                break;
            case 'star':
                thisObj.globalCatchList.starArr = [];
                break;
        }
    }

    /**
     * saveStar 存储star 数组
     */
    function saveStarArrToGoldCatch(_id) {
        thisObj.globalCatchList.starArr.push(_id);
    }

    /**
     * 删除star缓存数组
     */
    function delStarIdFromStarArr(_id) {
        var newStarArr = [];
        angular.forEach(thisObj.globalCatchList.starArr, function (vo) {
            if (vo != _id) {
                newStarArr.push(vo);
            }
        });
        thisObj.globalCatchList.starArr = newStarArr;
    }

    /**
     * 从全局缓存数组遍历 标记过的 star, 给list 赋值
     * @parme list
     * @return list
     * editShowStar
     */
    function editShowStar(list) {
        var reList = [];
        angular.forEach(list, function (vo) {
            vo = _trueStar(vo);
            reList.push(vo);
        });
        return reList;

        /**
         * 判断star
         * return vo
         * @private
         */
        function _trueStar(vo) {
            var trueNum = thisObj.globalCatchList.starArr.indexOf(vo._id);
            if (trueNum !== -1) {
                vo.iconStar = "fa-star";
            }
            return vo;
        }
    }


})();