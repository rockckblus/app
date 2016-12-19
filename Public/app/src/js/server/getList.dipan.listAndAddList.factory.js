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
    var goldListId = [];

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
            case 'home':
                url = _config.host.nodeHost + '/sns/homeGetList?' + _tools.getRoundCode(8);
                break;
            case 'need':
                url = _config.host.nodeHost + '/sns/needGetList?' + _tools.getRoundCode(8);
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

            //获取数据库的筛选条件,遍历name 给不同筛选条件
            var condit = switchSearchCondition();

            var postData = {
                'frontId': _frontId,
                'endId': _endId,
                'condition': condit
            };

            /**************************
             * @returns {Obj 缓存的list对象} catchObj
             * @returns {getNext 布尔} getNext true 进行下面的 http 请求
             * 16/9/16 上午11:27 ByRockBlus
             **************************/

            _getCatchList(function (catchObj, getNext) {
                if (getNext) {
                    _tools.postJsp(url, postData, true).then(
                        function (re) {
//todo
                            var endre = [];
                            angular.forEach(re, function (vo) {
                                if (goldListId.indexOf(vo._id) == -1) {
                                    goldListId.push(vo._id);
                                } else {
                                    endre.push(vo);
                                }
                            });

                            call(re);

                        }

                        , err);
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
                case 'home' :
                    _logicHome(__call);//供`需`其他 的逻辑
                    break;
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
                _addNewListToOldList(re.data.doc, function (reList) {
                    if (!re.data.doc && !re.data.doc[0]) {
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
                _tools.alert({
                    title: '没有更多数据啦! ^_^'
                });
            }
        }

        function err() {
            _tools.alert({
                title: '网络请求失败',
                content: '请检查网络'
            });
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
        strVar += "        <li class=\" item homeListItem thinner-border\" bindonce bo-attr bo-attr-url=\"vo.type + 'Content'\" bo-attr-type=\"vo.type\" bo-attr-subid=\"vo._id\"  bo-id='\"homeList_\" + vo._id'";
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
        strVar += "                <div class='right' bo-text='\"(\"+vo.sex+\")\"'></div>";
        strVar += "                <div class='right' bo-text='vo.uid.name'></div>";
        strVar += "                <\/div>";
        strVar += "                <div class=\"line clear marginLine\"><\/div>";
        strVar += "                <div class=\"clear\">" +
            "<div class='headerLeft left'>" +
            "<img bo-if='vo.listHeader' bo-src='vo.listHeader' style='width: 30px;height: 30px;border-radius:30px;'/>" +
            "<img bo-if='!vo.listHeader' bo-src='defaultHeader' style='width: 30px;height: 30px';border-radius:30px;/>" +
            "</div>" +
            "<div class='left imagesArr' >" +
            "<div class='left imagesItem' bo-if='vo.imgs[0]'>" +
            "<img bo-src='vo.imgs[0]'/>" +
            "</div>" +
            "<div class='left imagesItem' bo-if='vo.imgs[1]'>" +
            "<img bo-src='vo.imgs[1]'/>" +
            "</div>" +
            "<div class='left imagesItem' bo-if='vo.imgs[2]'>" +
            "<img bo-src='vo.imgs[2]'/>" +
            "</div>" +
            "<div class='clear'></div>" +
            "<div class='des' bo-text='vo.des'></div>" +
            "</div>" +
            "<div class='clear'></div>" +
            "<div class='moreKill lan' style='font-size: 0.8rem;margin-top: 10px' bo-if='vo.killListTitle' bo-text='\"更多技能: \"+ vo.killListTitle'></div>" +
            "</div>" +
            "<\/div>";
        strVar += "            <\/div>";
        strVar += "        <\/li>";

        var repListHtml = angular.element(strVar);
        repListHtml.attr('ng-repeat', "vo in " + listNam);
        repListHtml.attr('listName', listNam);
        _compile('list', repListHtml[0], scope, true);
        if (!isCatch) {//如果不是 缓存请求
            pushToGoldCatcth(newlist);//push 到全局变量数组
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
                if (thisObj.globalCatchList.home[0]) {
                    newList = thisObj.globalCatchList.home;
                }
                break;
            case 'need':
                if (thisObj.globalCatchList.need[0]) {
                    newList = thisObj.globalCatchList.need;
                }
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

        delGoldCatcth();//删除当前url的全局缓存数组
    }

    /**
     * push 到全局缓存变量数组
     */
    function pushToGoldCatcth(newList) {

        if (newList) {
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
    }

    /**
     * 清空 全局缓存变量数组
     */
    function delGoldCatcth() {
        var thisUrl = _state.current.name;
        switch (thisUrl) {
            case 'home':
                thisObj.globalCatchList.home = [];
                break;
            case 'need':
                thisObj.globalCatchList.need = [];
                break;
        }
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

    /**
     * 获取数据库的筛选条件,遍历name 给不同筛选条件
     * 获取地址逻辑,如果 area.city.city == 附近,(cityCode == 777) ,就取areaGps 的gps 坐标,按照距离排序
     * 否则如果有值,就取 cityCode 去 筛选城市排序
     */
    function switchSearchCondition() {
        var condi = {
            area: {},
            areaGps: {},
            clickShaiXuan: {}
        };
        condi.area = _tools.getLocalStorageObj('area');
        condi.areaGps = _tools.getLocalStorageObj('areaGps');
        condi.clickShaiXuan = _tools.getLocalStorageObj('clickShaiXuan');
        condi.searchKey = localStorage.getItem('searchKey');
        return condi;
    }

})();