<?php
/**
 * 后台公共方法
 * 15-3-23
 * @package Application
 * @subpackage function
 * @name function
 */


/** //传入数据库名，id ，字段名，返回 字段 值 */

function getAttrById($dataName, $id, $field)
{
    if ($id) {
        $data = D($dataName);
        $find = $data->find($id);
        return $find[$field];
    }

}

/**获取全站变量  */

function getG($name)
{
    $data = D('SystemEdit');
    $where['key'] = $name;
    $find = $data->where($where)->find();
    return $find['value'];
}


/** curl网址，返回html,支持返回json对象 */
function curlBaidu($url, $json = null)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, false);
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //如果把这行注释掉的话，就会直接输出
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1);//超时1秒
    $result = curl_exec($ch);
    curl_close($ch);
    if ($result) {
        if (!empty($json)) {
            return json_decode($result);
        } else {
            return $result;
        }
    } else {
        return false;
    }
}


/** curl Post */
function curl_post($url = '', $postdata = '', $options = array())
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    if (!empty($options)) {
        curl_setopt_array($ch, $options);
    }
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

/** curl短信 微米*/
function curlSem($mtNum, $content)
{
    if (!empty($mtNum) && !empty($content)) {
        $content = '【兼职鼠】' . $content;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://api.weimi.cc/2/sms/send.html");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        /*
        短信接口一，自写短信内容。该接口提交的短信均由人工审核，下发后请联系在线客服。适合：节假日祝福、会员营销群发等。
        1、设定微米账号的接口UID和接口密码
        2、传入目标手机号码，多个以“,”分隔，一次性调用最多100个号码，示例：139********,138********
        3、传入短信内容。必须设置好短信签名，签名规范：
            1）短信内容一定要带签名，签名放在短信内容的最前面；
            2）签名格式：【***】，签名内容为三个汉字以上（包括三个）；
            3）短信内容不允许双签名，即短信内容里只有一个“【】”
        */
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'uid=PoE6qjWN52Ax&pas=6s5775fb&mob=' . $mtNum . '&cid=sskia98oT8Gs&p1=' . urlencode($content) . '&type=json');
        $res = curl_exec($ch);
        curl_close($ch);
        return $res;
    } else {
        return false;
    }
}

/** 天翼发送短信接口 */
function sendSm($mtNum = null, $code = null)
{


    $curl = 'http://api.189.cn/v2/emp/templateSms/sendSms';//post地址
    $app_secret = '2cfd6ea6dd74cb30e5d87c92e3c489c1';
    $access_token = '';

    $app_id = '473425090000040482';
    $acceptor_tel = $mtNum;
    $template_id = '91004562';
    $template_param = '{"param1":"' . $code . '"}';
    $timestamp = date('Y-m-d H:i:s');

    $access_token = getToken();
    if ($access_token) {


        $array['app_id'] = $app_id;
        $array['access_token'] = $access_token;
        $array['acceptor_tel'] = $acceptor_tel;
        $array['template_id'] = $template_id;
        $array['template_param'] = $template_param;
        $array['timestamp'] = $timestamp;

//        ksort($array);//升序排序

//    将数组传入buildPlainText方法生成明文
        $plaintext = http_build_query($array);
//        $plaintext = urlencode($plaintext);
        $cipherText = base64_encode(hash_hmac("sha1", $plaintext, $app_secret));

         return curl_post($curl,$plaintext);

    }
}

/** 获取天翼令牌 */
function getToken()
{
    $array['grant_type'] = 'client_credentials';
    $array['app_id'] = '473425090000040482';
    $array['app_secret'] = '2cfd6ea6dd74cb30e5d87c92e3c489c1';

    $query = http_build_query($array);
    $postUrl = "https://oauth.api.189.cn/emp/oauth2/v3/access_token";
    $reJsonp = curl_post($postUrl, $query);
    $reJsonp = json_decode($reJsonp);
    return $reJsonp->access_token;

}

/** 记录错误日志 传入状态码，和出错方法地址*/
function writeError($code = null, $url = null)
{
    if (!empty($code)) {

        /** 组合字符串 */
        $timeStr = date('Y-m-d h:i:s', time());
        $str = 'errorCode:' . $code . ' path:' . $url . ' time:' . $timeStr . "\n";
        $file = fopen("/home/wwwroot/default/app/log/error.text", "a");
        $echo = fwrite($file, $str);
        fclose($file);
    }
}

/** 记录操作日志 传入状态码，和方法地址*/
function writeLog($code = null, $url = null)
{
    if (!empty($code)) {
        /** 组合字符串 */
        $timeStr = date('Y-m-d h:i:s', time());
        $str = 'logCode:' . $code . ' path:' . $url . ' time:' . $timeStr . "\n";
        $file = fopen("/home/wwwroot/default/app/log/log.text", "a");
        $echo = fwrite($file, $str);
        fclose($file);
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
 */

