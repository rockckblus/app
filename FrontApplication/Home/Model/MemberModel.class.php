<?php
/**
 * Member 表
 * 15-3-23
 * @package Model
 * @subpackage Member
 * @name Member
 */
namespace Home\Model;

use Think\Model\MongoModel;
class MemberModel extends MongoModel{
    Protected $pk = 'id';
    Protected $_idType = self::TYPE_INT;
    protected $_autoinc =  true;
} 