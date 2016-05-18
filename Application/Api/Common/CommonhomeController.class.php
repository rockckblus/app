<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-1
 * Time: 上午8:27
 */

namespace Api\Common;
use Think\Controller;

class CommonhomeController extends Controller
{

//    整理url路由，分配到session
    function assignUrl($url){
        $urlArr = parse_url($url);
        dump($urlArr);
    }




}