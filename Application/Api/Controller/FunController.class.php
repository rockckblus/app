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
    public function test(){
        dump(1);
        return 1;
    }

    /** get用户ip */
    public function getUserIp()
    {
        $user_IP = ($_SERVER["HTTP_VIA"]) ? $_SERVER["HTTP_X_FORWARDED_FOR"] : $_SERVER["REMOTE_ADDR"];
        $user_IP = ($user_IP) ? $user_IP : $_SERVER["REMOTE_ADDR"];
        return $user_IP;
    }

    /** 验证用户手机号是否存在 */
    public  function trueUserMt($mtNum = null)
    {
        if (!empty($mtNum)) {
            $d = D('Mongod/Member');
            $where['mt'] = (int)$mtNum;
            $find = $d->where($where)->find();
            if(empty($find)){
                return 200;
            }else{
                writeError(107,'b_Api/Controller/FunController.class.php');
                return 107;//传入的手机号已经存在
            }
        }else{
            writeError(108,'b_Api/Controller/FunController.class.php');
            return 108;//传入的手机号为空
        }
    }
}