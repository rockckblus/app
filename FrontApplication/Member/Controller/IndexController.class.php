<?php
/**
 * Member 类
 * @package Member
 * @subpackage Member控制器NoSession
 * @name Member控制器
 */
namespace Member\Controller;

use Think\Controller;

class IndexController extends Controller
{



    /** 会员注册提交地址 */
    function regIn()
    {

        /** 接受angularPost数据 */
        $_POST = file_get_contents("php://input");
        $_POST = json_decode($_POST);


        /** new Api 对象 */
        $Api = new \Api\Controller\FunController();

        /** 判断post来的手机号不为空，post来的验证码不为空 */
        if (!empty($_POST->tel) && !empty($_POST->code)) {

            /** 验证电话是否被注册 */
            $trueMt = $Api->trueUserMt($_POST->tel);
            if ($trueMt == 200) {

                /** 电话可以注册，判断验证码  */
                $trueCodeRe = $this->sub_RegIn_trueCode();

                /** 验证判断成功返回200 ,入库注册*/
                if ($trueCodeRe == 200) {
                    $userRegIn = $this->sub_RegIn_userRegIn();
                    if ($userRegIn['code'] == 200) {
                        $re['code']='S';
                        $re['msg']='注册成功';
                        $re['_id']=$userRegIn['_id'];
                        $re['doc']=$this->inRoundCode($re['_id']);//入库用户token
                        $this->ajaxReturn($re, 'JSON');
                    } else {

                        /** 记录错误信息 */
                        writeError($userRegIn, 'f_Member/Index/regIn');
                        $this->ajaxReturn($userRegIn, 'JSON');
                    }
                } else {

                    /** 记录错误信息 */
                    writeError($trueCodeRe, 'f_Member/Index/regIn');
                    $this->ajaxReturn($trueCodeRe, 'JSON');
                }
            } else {

                /** 电话已经注册，判断验证码  */
                $trueCodeRe = $this->sub_RegIn_trueCode();
                if ($trueCodeRe == 200) {
                    $re['code']='S';
                    $re['msg']='登录成功';
                    $re['doc']=$this->inRoundCode();//更新用户token
//                    $re['uid']=
                    $this->ajaxReturn($re, 'JSON');
                }else{
                    $re['code']='F';
                    $re['msg']='登录失败,错误码:' . $trueCodeRe;
                    $this->ajaxReturn($re, 'JSON');
                }

                /** 记录错误信息 */
//                writeError($trueMt, 'f_Member/Index/regIn');
//                $this->ajaxReturn($trueMt, 'JSON');
            }
        } else {

            /** 记录错误信息 */
            writeError(106, 'f_Member/Index/regIn|||注册post来的手机号，或者验证码为空');
            $this->ajaxReturn('注册post来的手机号，或者验证码为空', 'JSON');
        }
    }


    /** 注册方法 入库客户端token，uid,tel修改或添加 */
    private function inRoundCode($uid = null){
        if(!empty($uid)){//去添加
          return $this->inRoundCodeAdd($uid,$_POST->roundCodeId,$_POST->tel);
        }else{//根据电话查出uid 去更新

            /** 实例化member表  */
            $d = D('Mongod/Member');
            $where['mt'] = (int)$_POST->tel;
            $find = $d->where($where)->find();
            if (!empty($find)) {
                return $this->inRoundCodeAdd($find['_id'],$_POST->roundCodeId,$_POST->tel,true);
            } else {
                return '手机号不存在';//
            }

        }
    }

    /** 注册方法 入库客户端token，uid,tel修改或添加 */
    private function inRoundCodeAdd($uid = null,$token = null,$tel = null,$isUpdate=null){
        /** 实例化token*/
        $d = D('Mongod/Token');

        if(!empty($uid) && !empty($token) && !empty($token) && !empty($isUpdate)){//去更新token

            /** 更新用户数据 */
            $where['mt'] = (int)$tel;
            $where['uid'] = $uid;
            $up['token'] = $token;
            $addRe = $d->where($where)->save($up);
            if ($addRe) {
                $re['_id']=$addRe;
                $re['code']=200;
                return $re;
            } else {
                return '更新用户token失败';
            }

        }elseIf(!empty($uid) && !empty($token) && !empty($token)){//去添加

            /** 入库用户数据 */
            $add['mt'] = (int)$tel;
            $add['token'] = $token;
            $add['uid'] = $uid;
            $addRe = $d->add($add);
            if ($addRe) {
                $re['_id']=$addRe;
                $re['code']=200;
                return $re;
            } else {
                return '添加用户token失败';
            }

        }else{
            return 'uid,token,tel有空值';
        }
    }

    /** 注册方法 判断验证码，sub_RegIn */
    private function sub_RegIn_trueCode()
    {


        //判断是测试手机号和测试验证码，就给登录
        $trueTest = false;
        if($_POST->code== '19780807' && ($_POST->tel == '15510986492' || $_POST->tel == '18722278967')){
            $trueTest= true;
        }


        $d = D('Mongod/TempCode');
        $where['roundCodeId'] = $_POST->roundCodeId;
        $where['code'] = (int)$_POST->code;

        $find = $d->where($where)->find();


        if ($find || $trueTest) {
            if($trueTest){//是测试号直接通过
                return 200;
            }else{
                /** 如果找到，就删除返回200 */
                $delRe = $d->where($where)->delete();
                if ($delRe['n']) {

                    /** 删除成功 */
                    return 200;
                } else {
                    writeError(110, 'f_Member/Index/sub_RegIn_trueCode');
                    return '验证码数据库删除失败';//验证码数据库删除失败
                }
            }

        } else {
            writeError(109, 'f_Member/Index/sub_RegIn_trueCode');
            return '手机号，对应随机码没找到';//手机号，对应随机码没找到
        }
    }

    /** 入库用户注册 */
    private function sub_RegIn_userRegIn()
    {

        /** 实例化member表  */
        $d = D('Mongod/Member');

        /** 入库用户数据 */
        $add['mt'] = (int)$_POST->tel;
        $addRe = $d->add($add);
        if ($addRe) {
            $re['_id']=$addRe;
            $re['code']=200;
            return $re;
        } else {
            writeError(110, 'f_Member/Index/sub_RegIn_userRegIn');
            return '注册用户添加失败';//注册用户添加失败
        }
    }


    /** 会员登录页面,跳转来的。前端 js 判断url 。来弹出 登录面板 */
    function login()
    {
        $this->display('./FrontApplication/Home/View/base/layout.html');
    }

    /** 前台 ajax 登录。post请求，传入mt，passWord ,记录跨域session*/
    function giveSession()
    {

        /** 接受angularPost数据 */
        $_POST = file_get_contents("php://input");
        $_POST = json_decode($_POST);

        /** new Api 对象 */
        $Api = new \Api\Controller\FunController();

        /** 去验证用户密码成功返回标示码 */
        $true = $Api->trueMtPass((int)$_POST->mtNum, (int)$_POST->passWord);

        if ($true == 200) {
            /** 记录session */
            $_SESSION['isLogin'] = 'true';
            $_SESSION['mt'] = substr_replace($_POST->mtNum, '****', 3, 4);

            $this->ajaxReturn(200, 'JSON');
        } else {
            $this->ajaxReturn($true, 'JSON');
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