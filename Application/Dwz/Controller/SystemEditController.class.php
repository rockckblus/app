<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-14
 * Time: 下午7:15
 */

namespace Dwz\Controller;


use Dwz\Common\Common2Controller;

class SystemEditController  extends Common2Controller{

    function setCookie(){//设置COOKIE
        cookie('checkUser','rockblus');  //设置cookie
        echo 'ok';

    }


} 