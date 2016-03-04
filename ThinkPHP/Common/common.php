<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-17
 * Time: 上午10:51
 */



//public Aciton

//传入数据库名，id ，字段名，返回 字段 值
function getAttrById($dataName,$id,$field){

    $data = D($dataName);
    $find = $data->find($id);
    return $find[$field];
}

