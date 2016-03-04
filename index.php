<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用入口文件
/** 设置跨域Session  */
ini_set('session.cookie_path', '/');
ini_set('session.cookie_domain', '.dipan.so');

// 检测PHP环境
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');

// 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('APP_DEBUG',true);
define ( "GZIP_ENABLE", function_exists ( 'ob_gzhandler' ) );
ob_start ( GZIP_ENABLE ? 'ob_gzhandler' : null );


//判断爬虫
function is_crawler() {
    $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
    $spiders = array(
        'Googlebot', // Google 爬虫
        'Baiduspider', // 百度爬虫
        'Yahoo! Slurp', // 雅虎爬虫
        'YodaoBot', // 有道爬虫
        'msnbot', // Bing爬虫
        '360Spider' // 360爬虫
        // 更多爬虫关键字
    );
    foreach ($spiders as $spider) {
        $spider = strtolower($spider);
        if (strpos($userAgent, $spider) !== false) {
            return true;
        }
    }
    return false;
}

if(is_crawler()  || ($_SERVER["SERVER_PORT"]=='8080')){
    // 定义应用目录
    define('APP_PATH','./Application/');
}else{
    // 定义应用目录
    define('APP_PATH','./FrontApplication/');
//    define('APP_PATH','./Application/');
}


// 引入ThinkPHP入口文件
require './ThinkPHP/ThinkPHP.php';

// 亲^_^ 后面不需要任何代码了 就是如此简单
