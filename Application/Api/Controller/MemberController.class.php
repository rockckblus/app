<?php
/**
 * Member 类
 * @package Member
 * @subpackage Member控制器NoSession
 * @name Member控制器
 */
namespace Api\Controller;

use Think\Controller;

class MemberController extends Controller
{

    /** 修改用户密码 */
    function editUserCode($tel = null, $code = null)
    {
        if (!empty($tel) && !empty($code)) {

            /** 实例化member表  */
            $d = D('Member');
            $save['code'] = (int)$code;
            $where['mt'] = (int)$tel;
            $re = $d->where($where)->save($save);

            /** 注意网上环境与本地环境返回数组键名不一样,做兼容 */
            if (($re['nModified'] == 1) || ($re['n']==1) ){
                return 200;
            } else {
                writeError(118, 'f_Member/Index/editUserCode');
                return 118;//忘记密码方法_密码(code)修改失败
            }
        } else {
            writeError(117, 'f_Member/Index/editUserCode');
            return 117;//忘记密码方法_传入的手机号或者对应的短信密码为空
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
