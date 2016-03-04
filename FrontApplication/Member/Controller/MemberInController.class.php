<?php
/**
 * Member 类
 * @package Member
 * @subpackage Member控制器HaveSession
 * @name Member控制器
 */
namespace Member\Controller;

use Think\Controller;

class MemberInController extends Controller
{

    /** 会员中心初始化方法 */
    function _initialize()
    {

        /** 判断session登录 */
        if (!isset($_SESSION['isLogin']) || ($_SESSION['isLogin'] != 'true')) {
            /** todo 跳转到登录
             * */
            $this->success('请登录', '/Member/Index/login');
        }

    }

    /** 会员中心 */
    function index()
    {

        $this->display();
    }


    /** 登出 */
    function logOut()
    {
        $a = setcookie('isLogin',null,null,'/','.dipan.so');
        if($a){
            $_SESSION['isLogin'] = '';
            $_SESSION['mt'] = '';
            $this->success('注销成功', '/');
        }else{
            $this->success('注销失败', '/');
        }
    }


}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */