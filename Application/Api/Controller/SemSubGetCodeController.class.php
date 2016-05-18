<?php
/**
 * sem 子类getCode
 * @package Api
 * @subpackage getCode 子类方法
 * @name getCode
 */
namespace Api\Controller;

class SemSubGetCodeController extends SemController
{
    /** 返回接口  */
    function index()
    {
        $return = $this->getCode_addTempData();
        return $return;
    }

    /** 组合数据获取验证码数据 */
    private function getCode_addTempData()
    {
        $userIp = R('Fun/getUserIp');
        /** get来的随机id，生成验证码，写入数据库，发送验证码 */

        if ($userIp) {
            if (!empty($_GET['mtNum'])) {
                $d = $this->tempCode;//实例化 临时验证码表
                $add['mt'] = (int)$_GET['mtNum'];//get来的手机号
                $add['userIp'] = $userIp;//客户端ip
                $add['time'] = time();//当前添加时间
                $add['roundCodeId'] = $_GET['roundCodeId'];//随机生成的验证码标示Id
                $add['code'] = (int)rand(100000, 999999);//随机生成码去发短信

                /** 先去数据库查有没有对应标示id的验证码，如果有就是从新提交来的。再加判断是不是过1分钟发来的，才去更新 */
                $where['roundCodeId'] = $_GET['roundCodeId'];
                $where['userIp'] = $userIp;
                $find = $d->where($where)->find();

                /** 如果找到了，就判断时间大于 60秒 修改当前数据，再去发短信验证码 */
                if (!empty($find)) {
                    if ((time() - $find['time']) > 60) {

                        $where2['roundCodeId'] = $_GET['roundCodeId'];
                        $reSave = $d->where($where2)->save($add);

                        /** 如果save成功 */
                        if ($reSave['updatedExisting']) {

                            /** 删除过期短信  */
                            $this->delOldTempCode();

                            /** 发短信 */
                            $reMt = $this->sendCode($add['mt'], $add['code']);
                            $reMt = json_decode($reMt, true);//解析json代码为数组格式
                            if ($reMt['res_code'] == '0') {
                                /** 如果判断是修改密码，就去Member表修改密码（code字段） */
                                if ($_GET['forget'] == '1') {

                                    $editUserCode = R('Member/editUserCode',array($add['mt'],$add['code']));
                                    return $editUserCode;

                                } else {
                                    return 200;
                                }
                            } else {
                                writeError(113, 'B_SemSub/getCode_addTempData|||注册方法_短信发送失败 天翼接口环节返回状态码不为0 ');
                            }
                        } else {

                            writeError(104, 'B_SemSub/getCode_addTempData|||时间超过1分钟，但是修改验证码数据失败');
                            return 104;
                        }
                    } else {
                        writeError(103, 'B_SemSub/getCode_addTempData|||时间未超过1分钟，不能从新发送');
                        return 103;
                    }

                    /** 没找到，就添加新记录  */
                } else {
                    $addIn = $d->add($add);
                    if ($addIn) {

                        /** 发短信 */
                        $reMt = $this->sendCode($add['mt'], $add['code']);
                        $reMt = json_decode($reMt, true);//解析json代码为数组格式
                        if ($reMt['res_code'] == '0') {

                            /** 如果判断是修改密码，就去Member表修改密码（code字段） */
                            if ($_GET['forget'] == '1') {
                                $editUserCode = R('Member/editUserCode',array($add['mt'],$add['code']));
                                return $editUserCode;
                            } else {
                                return 200;
                            }
                        } else {
                            writeError(113, 'B_SemSub/getCode_addTempData|||注册方法_短信发送失败 天翼接口环节返回状态码不为0 ');
                        }
                    } else {

                        writeError(105, 'B_SemSub/getCode_addTempData|||添加失败,返回状态码,记录错误日志');
                        return 105;
                    }
                }
            } else {
                writeError(102, 'B_SemSub/getCode_addTempData|||获取用户手机号为空，返回状态码,记录错误日志');
                return 102;
            }
        } else {
            writeError(101, 'B_SemSub/getCode_addTempData|||获取用户ip失败，返回状态码,记录错误日志');
            return 101;
        }
    }

    /** 发短信 todo 调短信接口 */
    private function sendCode($mt, $code)
    {
        return sendSm($mt, $code);
    }

    /** 删除过期短信  */
    private function delOldTempCode()
    {
        $d = $this->tempCode;//实例化 临时验证码表
        $thisTime = time();
        $oldTime = $thisTime - (60 * 60);//过期1小时
        $where['time'] = array('lt', $oldTime);//条件为小于当前时间1小时的数据
        $delRe = $d->where($where)->delete();

        /** 如果删除成功 */
        if ($delRe['n']) {
            writeLog(201, 'b_Api/SemSubGetCode/delOldTempCode|||删除过期短信成功');
        } else {
            writeLog(202, 'b_Api/SemSubGetCode/delOldTempCode|||删除过期短信失败，或者无过期短信');
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
 *
 *
 *
 *
 *
 *
 *
 */




