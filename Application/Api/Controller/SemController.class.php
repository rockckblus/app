<?php
/**
 * sem 类 验证码
 * @package Api
 * @subpackage 短信控制器
 * @name 短信控制器
 */
namespace Api\Controller;

use Think\Controller;
class SemController extends Controller
{
    /** 声明模型，临时验证码表 */
    public $tempCode;

    /** 继承方法 */
    function _initialize()
    {
        $this->tempCode = D('Mongod/tempCode');//验证码模型
    }

    /** 获取验证码 获取客户ip 限制超过1分钟*/
    function getCode()
    {
        $return = R('SemSubGetCode/index');
        $this->ajaxReturn($return, 'JSONP');
    }

    /** getToken */
    function getTokenText(){
       dump(sendSm('18947157789','123456'));
    }

    /** smReturn */
    function smReturn(){
        return 1234321;
    }

}