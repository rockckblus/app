<?php
/**
 * 公共前台方法类
 * @package PublicFun
 * @subpackage publicFun
 * @name function .php
 */

/**
 * 传入数据库名，id ，字段名，返回 字段 值
 */
function getAttrById($dataName, $id, $field)
{
    $data = D($dataName);
    $where["_id"] = $id;
    $find = $data->where($where)->find();
    return $find[$field];
}

/**
 * 获取全站变量
 */
function getG($name)
{
    $data = D('SystemEdit');
    $where['key'] = $name;
    $find = $data->where($where)->find();
    return $find['value'];
}

/**
 * 打开nodejs  nohu 日志，打印出来
 */
function getNode()
{
    $fileUrl = '/home/socketTest/nohup.out';
    $file = fopen($fileUrl, 'r+');
    $re = fread($file, 2000);
    fclose($file);
    file_put_contents($fileUrl, '');
    return $re;
}

/** curl网址，返回html,支持返回json对象 */
function curlBaidu($url, $json = null)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //如果把这行注释掉的话，就会直接输出
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1);//超时1秒
    $result = curl_exec($ch);
    curl_close($ch);
   if($result) {
       if (!empty($json)) {
           return json_decode($result);
       } else {
           return $result;
       }
   }else{
      return false;
   }
}

/** 记录错误日志 传入状态码，和出错方法地址*/
function writeError($code = null, $url = null)
{
    if (!empty($code)) {

        /** 组合字符串 */
        $timeStr = date('Y-m-d h:i:s',time());
        $str = 'errorCode:'.$code.' path:'.$url.' time:'.$timeStr."\n";
        $file = fopen("/home/wwwroot/default/app/log/error.text", "a");
        $echo = fwrite($file,$str);
        fclose($file);
    }
}

/** 记录操作日志 传入状态码，和方法地址*/
function writeLog($code = null, $url = null)
{
    if (!empty($code)) {

        /** 组合字符串 */
        $timeStr = date('Y-m-d h:i:s',time());
        $str = 'logCode:'.$code.' path:'.$url.' time:'.$timeStr."\n";
        $file = fopen("/home/wwwroot/default/app/log/log.text", "a");
        $echo = fwrite($file,$str);
        fclose($file);
    }
}
