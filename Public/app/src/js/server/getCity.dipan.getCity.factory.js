/**
 * 命名注释：server简称_getCity. 父模块 dipan. 功能_获取城市相关. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('getCity', getCity);

    getCity.$inject = ['$webSql', '$q', 'tools', 'config'];


    function getCity($webSql, $q, tools, config) {
        var re = {};
        re.init = function () {
            return false;
            getAllCity().then(forGetCityCode).then(function (re) {
                console.log('re', re);
            });
        };

        /**
         * 获取全部城市
         */
        function getAllCity() {
            var defered = $q.defer();
            var url = config.host.nodeHost + '/city/getAllOneCity';
            tools.postJsp(url, {}).then(function (re) {
                defered.resolve(re);
            }, function (err) {
                defered.reject(err);
            });
            return defered.promise;
        }


        /**
         * 循环遍历
         */
        function forGetCityCode(forArr) {
            var endArr = [];
            var defered = $q.defer();

            var timeCount = 0;
            var tempCount = 0;
            angular.forEach(forArr, function (vo) {
                timeCount = timeCount + 1000;
                setTimeout(function () {
                    _getOneCityCode(vo.name).then(function (re) {
                        tempCount++;
                        endArr.push(re);
                        if (tempCount == forArr.length) {
                            defered.resolve(endArr);
                        }
                    });
                }, timeCount);
            });
            return defered.promise;
        }

        /**
         * 遍历查询 单个城市的 022
         */
        function _getOneCityCode(name) {
            var defered = $q.defer();
            var url = config.host.nodeHost + '/soso/sosoApi/strToGps?str=' + name;
            tools.getJsp(url).then(function (re) {
                var oneRe = {};
                try {
                    re = JSON.parse(JSON.parse(re));
                    console.log('re', re);
                    if (re.geocodes[0].level == '市') {
                        oneRe.city = re.geocodes[0].city;
                        oneRe.sheng = re.geocodes[0].province;
                        oneRe.location = re.geocodes[0].location;//gps 字符串
                        oneRe.citycode = re.geocodes[0].citycode;
                        _addCityNew(oneRe);
                    }
                } catch (e) {
                    console.log('err', e);
                }
                defered.resolve(oneRe);
            }, function (err) {
                defered.reject(err);
            });
            return defered.promise;
        }


        /**
         * 存储每个城市到 cityNew 表
         */
        function _addCityNew(oneRe) {
            var url = config.host.nodeHost + '/city/addOneCity';
            tools.postJsp(url, oneRe).then(function (re) {
                console.log('reee', re);
            });
        }

        return re;
    }


})();

