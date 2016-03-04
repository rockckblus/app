define(function (require) {
    var g = require('/Public/itemJs/seajs/app/Dwz/g');
    var tools = require('/Public/itemJs/seajs/app/oeoeAdminModule/tools');
    //过滤器
    g.app.filter({
        //传入id，数据库名称，字段
        'getAttrById': function () {
            return function (id, model, field, http, res) {
                if (id) {
                    var url = '/Api/JsonpAdmin/getAttrById/model/' + model + '/field/' + field + '/id/' + id;
                    tools.getJsp(http, url, function (re) {
                        res(re);
                    })
                }
            }
        },
         //传入id，数据库名称，字段
        'getAttrBy_Id': function () {
            return function (id, model, field, http, res) {
                if (id) {
                    var url = '/Api/JsonpAdmin/getAttrBy_Id/model/' + model + '/field/' + field + '/id/' + id;
                    tools.getJsp(http, url, function (re) {
                        res(re);
                    })
                }
            }
        }
    })

})