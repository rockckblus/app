<?php
return array(
    'db_type' => 'mongo',
    'db_host' => '169.254.154.116',
    'db_port' => '27017',
    'db_Name' => 'dipan',
//    'DB_USER'   => 'rockblus', // 用户名
//    'DB_PWD'    => 'HDZrockblus8', // 密码
    'MODULE_ALLOW_LIST' => array(
        'Home', 'Admin', 'Dwz','MySql','Api','Mongod'
    ),
    'DEFAULT_MODULE' => 'Home'
);
