<?php
/**
 * 属性表管理，关联属性组
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-14
 * Time: 下午7:15
 */

namespace Dwz\Controller;


use Dwz\Common\Common2Controller;

class ProTypeController  extends Common2Controller{

    //属性组list
    function _before_add(){
        $data = D('proGroup');
        $list = $data->select();
        $this->assign('listTypeGroup',$list);
    }


} 