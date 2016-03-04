<?php
namespace Mysql\Controller;
use Think\Controller;

class Index2Controller extends Controller{


    //周边城市遍历打印
    function selectOtherCity(){
        $data = M('cshy_city');
//        $list = $data->select();
//        $this->ajaxReturn($list,'JSON');
        return 2;
    }




}