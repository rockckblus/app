<?php
/**
 * 城市拼音表 name(城市拼音名称),type(int,城市级别123),linkId(对应中文名称id),oneCityId(所属1级城市id),twoCityId(所属2级城市id),id(主键)
 * 15-2-23
 * @package mongod模型
 * @subpackage 城市拼音表
 * @name 城市拼音表
 */
namespace Home\Model;
use Think\Model\MongoModel;
class CityPinYinModel extends MongoModel{
    Protected $pk = 'id';
    Protected $_idType = self::TYPE_INT;
    protected $_autoinc =  true;
} 