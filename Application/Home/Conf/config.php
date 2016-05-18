<?php
/**
 * 定义homeConfig
 * @package Home 
 * @subpackage config
 */
return array(
    /**
     * 开启路由,定义路由规则
     */
    'URL_ROUTER_ON' => true, //开启路由
    'URL_ROUTE_RULES' => array( //定义路由规则
        ':name' => ':name'
    ),
//    'SHOW_PAGE_TRACE'=>1,
);