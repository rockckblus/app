<?php 
    $appid = "473425090000040482";
    $appsecret = "2cfd6ea6dd74cb30e5d87c92e3c489c1";
    $tokenAPI = "https://oauth.api.189.cn/emp/oauth2/v3/access_token";
/**
 * curl�ຯ��
 */
//post��ʽ�ύ��ȡ���
function curl_post($url='', $postdata='', $options=array()){
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    if (!empty($options)){
        curl_setopt_array($ch, $options);
    }
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

//get��ʽ�ύ��ȡ���
function curl_get($url='', $options=array()){
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    if (!empty($options)){
        curl_setopt_array($ch, $options);
    }
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}
?>