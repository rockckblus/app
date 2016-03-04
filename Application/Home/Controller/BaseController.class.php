<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-1
 * Time: 上午8:27
 */

namespace Common;
use Think\Controller;

class BaseController extends Controller
{

//    整理url路由，分配到session
    function assignUrl($url){
        $urlArr = parse_url($url);
        dump($urlArr);
    }




}