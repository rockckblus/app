<?php

/**
 * 15-2-23 file:///work/dipanWang/oeoePhp/app/phpDoc/oeoe.cc_FrontApplication/_phpDocApi.php.html
 * @api
 * @name 常用fun示例
 */

/**
 * 错误代码集合参考 <code>
 * 101:获取用户ip失败<br>
 * 102:验证码_get来的手机号为空<br>
 * 103:验证码_重新发送时间未超过1分钟，不能从新发送<br>
 * 104:验证码_时间超过1分钟，但是修改验证码数据失败<br>
 * 105:验证码_新添加失败,返回状态码,记录错误日志<br>
 * 106:注册方法_注册post来的手机号，或者验证码为空<br>
 * 107:注册方法_传入的手机号已经存在<br>
 * 108:注册方法_传入的手机号为空<br>
 * 109:注册方法_手机号，对应随机码对应在tempCode表里没找到<br>
 * 110:注册方法_入库添加用户失败<br>
 * 111:注册方法_验证手机号或者验证码为空<br>
 * 112:注册方法_验证手机号或者验证码 未在数据库找到对应记录<br>
 * 113:注册方法_短信发送失败 天翼接口环节返回状态码不为0 <br>
 * 114:登陆方法_验证传入的登陆手机号或者密码为空<br>
 * 115:登陆方法_验证传入的登陆手机号或者密码不正确<br>
 * 116:登陆方法_验证传入的登陆手机号不存在<br>
 * 117:忘记密码方法_传入的手机号或者对应的短信密码为空 <br>
 * 118:忘记密码方法_密码(code)修改失败,或无修改<br>
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */
function a_errorCode(){}

/**
 * 日志代码集合参考 <code>
 * 201:删除过期短信成功<br>
 * 202:删除过期短信失败，或者没有过期短信<br>
 *
 *
 *
 * */
function a_logCode(){}

/**
 * f_001 <code>dump(getNode());</code>
 *
 * 获取nodejs 打印方法 function.php 调用演示
 *
 * 读取并打印一次nodejs 日志文件，就删除日志
 *
 * @see getNode()
 * @link http://dipan.so/Home/Fun/action/writeNode
 */
function f_001()
{
}

/**
 * f_002 <code>curlBaidu($url,'json')</code>
 *
 * curl网址，返回html,支持返回json对象
 *
 * @see curlBaidu()
 * @link FrontAppLication/Common/Common/function.php
 */
function f_002()
{
}

/**
 * b_003 <code>curlSem('18947157789', $str)</code>
 *
 * 调用短信接口，定义模板免审核方法，传入手机号，密码
 *
 * @see curlSem()
 * @link Appliction/Api/SemController/
 * @link http://www.dipan.so:8080/Api/Sem/
 */
function b_003()
{
}

/**
 * b_004 <code>$userIp = R('Fun/getUserIp');</code>
 * 返回客户端IP方法
 *
 * @see getUserIp()
 * @link Appliction/Fun/getUserIp/
 */
function b_004()
{
}

/** b_005 <code> writeError($code,$url) </code>
 * 记录错误日志，传入 $code(状态码),$url(方法所在路径)
 * @link http://www.dipan.so:8080/log/error.text
 * @see writeError()
 * @link Appliction/Common/funciton.php
 *
 */
function b_005(){}

/** b_006 <code> trueUserMt($mtNum)</code>
 * 判断用户手机是否存在，传入手机号，成功返回 200
 * @see trueUserMt()
 * @link Appliction/Fun/trueUserMt
 */
function b_006(){}


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
 */