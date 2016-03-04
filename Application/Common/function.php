<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-17
 * Time: 上午11:24
 */



//传入数据库名，id ，字段名，返回 字段 值
function getAttrById($dataName,$id,$field){

    $data = D($dataName);
    $where["_id"]=$id;
    $find = $data->where($where)->find();
    return $find[$field];
}
 function aaa(){
    echo 'a';
}

