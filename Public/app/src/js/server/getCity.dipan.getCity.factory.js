/**
 * 命名注释：server简称_getCity. 父模块 dipan. 功能_获取城市相关. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('getCity', getCity);

    getCity.$inject = ['$webSql', '$q', 'tools', 'config', '$timeout'];


    function getCity($webSql, $q, tools, config, $timeout) {
        var re = {};
        re.init = function () {
            return false;
            // getAllCity().then(forGetCityCode).then(function (re) {
            //     console.log('re', re);
            // });
        };

        re.inTable = inTable; //判断有没有地址websQl表,没有就添加
        re.selectByCityCode = selectByCityCode;//根据省查询城市

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

        /**
         * //判断有没有地址websQl表,没有就添加
         */
        function inTable() {
            var userSql = $webSql.openDatabase('area');
            // userSql.dropTable('area');
            userSql.selectAll('area').catch(function () {//没有库就建立
                userSql.createTable('area', {
                    "id": {
                        "type": "INTEGER",
                        "null": "NOT NULL", // default is "NULL" (if not defined)
                        "primary": true, // primary
                        "auto_increment": true // auto increment
                    },
                    "_id": {
                        "type": "TEXT",
                        "null": "NOT NULL",
                    },
                    "city": {
                        "type": "TEXT",
                        "null": "NOT NULL",
                    },
                    "sheng": {
                        "type": "TEXT",
                        "null": "NOT NULL",
                    },
                    "location": {
                        "type": "TEXT",
                        "null": "NOT NULL",
                    },
                    "citycode": {
                        "type": "TEXT",
                        "null": "NOT NULL",
                    },
                    "__v": {
                        "type": "TEXT",
                        "null": "NOT NULL",
                    }
                });
            });
            $timeout(function () {
                getCityJsonToWebSql();
            }, 0);
        }

        /**
         * 遍历城市json数据,添加到 webSql
         */
        function getCityJsonToWebSql() {
            var areaSql = $webSql.openDatabase('area');
            areaSql.select('area', {
                "city": {
                    "value": "鞍山市"
                }
            }).then(function (re) {
                if (!re.rows[0]) {
                    next();//判断有没有 鞍山,没有就 去请求接口 添加到 数据库
                }
            });

            function next() {
                var jsonUrl = config.host.nodeHost + '/city/selectAllCityNew';//获取全部citynewCity
                tools.postJsp(jsonUrl, {}).then(function (re) {
                    _toWebSql(re);
                });

                function _toWebSql(re) {
                    angular.forEach(re, function (vo) {
                        areaSql.insert('area', vo).then(function (res) {
                            // console.log('resAdd', res);
                        });
                    });
                }
            }
        }


        /**
         * selectByCityCode 根据cityCode查询城市
         */
        function selectByCityCode(sheng) {

            var defered = $q.defer();
            var areaSql = $webSql.openDatabase('area');
            areaSql.select('area', {
                "sheng": {
                    "operator": '=',
                    "value": sheng
                }
            }).then(
                function (res) {
                    try {
                        defered.resolve(res.rows);
                    } catch (err) {
                        defered.reject(err);
                    }
                }
            );
            return defered.promise;
        }


        return re;
    }


})();

