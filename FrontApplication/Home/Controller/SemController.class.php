<?php
/**
 * HOME 类
 * @package Home
 * @subpackage 短信控制器
 * @name 短信控制器
 */
namespace Home\Controller;

use Think\Controller;

class SemController extends Controller
{

    /**
     * index 入口
     */
    public function  index()
    {
        $url = "http://api.weimi.cc/2/sms/send.html?uid=PoE6qjWN52Ax&pas= 6s5775fb&mob=15510986492
&con=【地盘|dipan.so】您的验证码为111111&type=json";
        curlBaidu($url, 'json');
    }

}