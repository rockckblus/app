<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-1
 * Time: 上午8:27
 */

namespace Api\Common;
use Think\Controller;

class CommonController extends Controller
{
    //公共返回配置变量 传入键名，返回 值
    public function CC($key = null)
    {
        if(isset($key)){
            $systemEditData = D('systemEdit');
            $systemEditDataList = $systemEditData->select();
            $allData = $this->formartSys($systemEditDataList);//全局变量配置
            return $allData[$key];
        }else{
            return false;
        }

    }

    //整理system 数据 返回 键值对数值
    function formartSys($data){
        $r = array();
        foreach($data as $v){
            $r[$v['key']] = $v['value'];
        }
        return $r;
    }




}