<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-9-22
 * Time: 下午4:40
 */

namespace Dwz\Model;

use Think\Model\MongoModel;
class KeyModel extends MongoModel{
    Protected $pk = 'id';
    Protected $_idType = self::TYPE_INT;
    protected $_autoinc =  true;
} 