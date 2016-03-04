<?php
/**
 * tempCode 临时获取验证码注册表
 * 15-3-23
 * @package Model
 * @subpackage tempCode
 * @name tempCode
 */
namespace Mongod\Model;

use Think\Model\MongoModel;
class TempCodeModel extends MongoModel{
    Protected $pk = 'id';
    Protected $_idType = self::TYPE_INT;
    protected $_autoinc =  true;
} 