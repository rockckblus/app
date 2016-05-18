<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-16
 * Time: 下午9:50
 */

namespace Dwz\Controller;


use Dwz\Common\Common2Controller;

class LeftNavController extends Common2Controller {

    function _before_add(){//分配 上级导航 到2级
        $data = D('leftNav');
        $list = $data->select();
        $this->assign('leftNav',$list);
    }
    function _before_addIn(){
        if(!$_POST['pid']){
            $_POST['pid'] = '0';
        }
    }
    function _before_edit(){
        $this->_before_add();
    }
}