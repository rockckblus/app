<?php
/**
 * token表
 */
namespace Mongod\Model;

use Think\Model\MongoModel;
class TokenModel extends MongoModel{
    Protected $pk = 'id';
    Protected $_idType = self::TYPE_INT;
    protected $_autoinc =  true;
} 