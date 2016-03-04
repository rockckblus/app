<?php

namespace Dwz\Controller;


use Dwz\Common\Common2Controller;

class PinYinController extends  Common2Controller
{

    //临时添加生活服务到拼音表
   function addMore(){
       $pyData = D('CategoryService');
       $pData = D('PinYin');
       $list = $pyData->order('pinYin')->select();

       return false;
       foreach($list as $v){
           $add['name'] = $v['pinYin'];
           $add['tableName'] = 'CategoryService';
           $add['linkId'] = $v['_id'];
           $pData->add($add);
       }
   }



}
