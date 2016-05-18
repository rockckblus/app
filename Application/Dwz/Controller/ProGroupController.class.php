<?php
/**
 * 属性组管理
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-14
 * Time: 下午7:15
 */

namespace Dwz\Controller;


use Dwz\Common\Common2Controller;

class ProGroupController  extends Common2Controller{

//判断属性type表。里面没有属于proGrounp表的item
//如果有就删除失败
    function _before_del(){
        $data = D('proType');
        $where['typeGroupId'] = $_GET['id'];

        $t = $data->where($where)->find();


        if (!empty($t)) {
            $return['statusCode'] = '300';
            $return['message'] = 'proType表里面有属于proGrounp表的item';
            $this->ajaxReturn($return, 'json');
            return false;
        }
    }

} 