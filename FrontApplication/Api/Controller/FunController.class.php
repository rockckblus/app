<?php
/**
 * fun 类
 * @package Api
 * @subpackage Api公共方法
 * @name Api公共方法控制器
 */
namespace Api\Controller;

use Think\Controller;

class FunController extends Controller
{

    /** get用户ip */
    public function getUserIp()
    {
        $user_IP = ($_SERVER["HTTP_VIA"]) ? $_SERVER["HTTP_X_FORWARDED_FOR"] : $_SERVER["REMOTE_ADDR"];
        $user_IP = ($user_IP) ? $user_IP : $_SERVER["REMOTE_ADDR"];
        return $user_IP;
    }

    /** 验证用户手机号是否存在 */
    public function trueUserMt($mtNum = null)
    {
        if (!empty($mtNum)) {
            $d = D('Mongod/Member');
            $where['mt'] = (int)$mtNum;
            $find = $d->where($where)->find();
            if (empty($find)) {
                return 200;
            } else {
                writeError(107, 'f_Api/Controller/FunController.class.php');
                return 107;//传入的手机号已经存在
            }
        } else {
            writeError(108, 'f_Api/Controller/FunController.class.php');
            return 108;//传入的手机号为空
        }
    }

    /** 验证用户名对应密码是否正确 */
    public function trueMtPass($mt, $passWord)
    {
        if (!empty($mt) && !empty($passWord)) {
            $d = D('Mongod/Member');
            $where['mt'] = (int) $mt;
            $where['code'] = (int) $passWord;
            $find = $d->where($where)->select();
            if (!empty($find)) {
                return 200;
            } else {
                writeError(115, 'f_Api/Controller/FunController.class.php');
                return 115;//用户名和密码不对应
            }
        } else {
            writeError(114, 'f_Api/Controller/FunController.class.php');
            return 114;//登陆方法_验证传入的登陆手机号或者密码为空
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
 */