<?php
/**
 * 前台总配置
 * @package config
 * @subpackage frontAllconfig
 * @name
 */
return array(
    'db_type' => 'mongo',
    'db_host' => '182.92.170.127',
    'db_port' => '27017',
    'db_Name' => 'dipan',
//    'DB_USER'   => 'rockblus', // 用户名
//    'DB_PWD'    => 'HDZrockblus8', // 密码
    'MODULE_ALLOW_LIST' => array (
        'Home','Member','Mongod','Api'
    ),
    'DEFAULT_MODULE' => 'Home',
    'DB_SQL_LOG' => false,
    'LOG_RECORD' => false,
    'LOG_EXCEPTION_RECORD' => false,
    'OUTPUT_ENCODE'=>true
);
