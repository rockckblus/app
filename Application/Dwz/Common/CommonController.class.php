<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-1
 * Time: 上午8:27
 */

namespace Common;


use Admin\Controller\IndexController;
use Think\Controller;

class CommonController extends Controller
{
    public function _initialize()
    {
        //判断登录，后台
        $url = explode('/', $_SERVER['REQUEST_URI']);
        if ($url[1] == 'Dwz' && $url[3] != 'login' && $url[3] != 'loginIn') { //需要判断session的模块
            if ($_SESSION['isLogin'] && $_SESSION['Permission'] == 'admin') {

                //给模板全局变量
                $data = IndexController::getGoldData();
                $this->assign('allData', $data);

                return true;
            } else {
                $this->success('去登录', '/Admin/Index/login');
            }
        } else {
            return true;

        }
    }


}