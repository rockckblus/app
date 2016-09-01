<?php
namespace Api\Controller;

use Common\CommonController;

class JsonpController extends CommonController
{

//    get百度下拉api
//http://api.map.baidu.com/place/v2/suggestion?query=天安门=全国（天津市）&output=json&ak=E4805d16520de693a3fe707cdc962045 //返回一组包含"天安门"字段的建议词条列表
    function getBaiduXiaLaData()
    {
        $baiduUrl = $this->CC('baiduXiaLaUrl');
        $baiduAk = $this->CC('baiduAk');
        $getUrl = $baiduUrl;
        $getUrl .= '?query=';
        $getUrl .= $_GET['key'];
        $getUrl .= '&region=';
        $getUrl .= $_GET['region'];
        $getUrl .= '&output=json&ak=';
        $getUrl .= $baiduAk;

        $res = $this->curlBaidu($getUrl);
        $this->ajaxReturn($res, 'JSONP');
    }

    //get Ip data 调用接口http://freeipapi.17mon.cn/ ip 传入 8.8.8.8
    function getIpCity(){
        $ip = $this->getIP();
        $apiUrl = 'http://freeipapi.17mon.cn/'.$ip;
        $res = $this->curlBaidu($apiUrl);
        if($res[2]){
           $this->ajaxReturn($res[2], 'JSONP');
        }else{
           $this->ajaxReturn($res[1], 'JSONP');
        };
    }

    // 定义一个函数getIP()
    function getIP()
    {
        header('Access-Control-Allow-Origin:*');

        if (getenv("HTTP_CLIENT_IP"))
            $ip = getenv("HTTP_CLIENT_IP");
        else if (getenv("HTTP_X_FORWARDED_FOR"))
            $ip = getenv("HTTP_X_FORWARDED_FOR");
        else if (getenv("REMOTE_ADDR"))
            $ip = getenv("REMOTE_ADDR");
        else $ip = "Unknow";

        if($_GET['from']=='web'){
            /** 判断是前端查询来的 */
            $re = array('ip'=>$ip);
            $this->ajaxReturn($re);
        }else{
            return $ip;
        }
    }

    //curl 百度Api 传入网址，返回 json
    function curlBaidu($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //如果把这行注释掉的话，就会直接输出
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result);
    }

    function getTwoCityData()
    {
        $city = $_GET['city'];
        $city = str_replace('市', '', $city);

        $data = D('city');
        $where['name'] = $city;
        $where['type'] = '1';
        $find = $data->where($where)->find();

        $where2['pid'] = $find['_id'];
        $where2['type'] = '2';

        $list = $data->where($where2)->select();

//        ["_id"] => string(24) "54632f51d6c08b61748b45fb"
//        ["name"] => string(6) "和平"
//        ["type"] => string(1) "2"
//        ["pinyin"] => string(1) "H"
//        ["pid"] => string(24) "54630dc8d6c08b12558b45e4"


        $allCityArr['name'] = "全$city";
        $allCityArr['thisClass'] = "pure-menu-selected hackUlLifocus"; //焦点Class

        array_unshift($list, $allCityArr); //吧全城市 加入list 数组 第一个
//        dump($list);

        $endReturn['list'] = $list;
        $this->ajaxReturn($endReturn, 'JSONP');
    }


    //get 三级地区
    function getThreeCityData(){
        $twoCityId = $_GET['id'];
        if($twoCityId){
            $data = D('city');
            $where['type']='3';
            $where['pid']=$twoCityId;
            $list = $data->where($where)->select();
            if($list){
                $re['list'] = $list;
                $re['state'] = 200;
            }else{
                $re['state'] = 400;
            }
            $this->ajaxReturn($re,'JSONP');
        }else{
            $re['state'] = 400;
            $this->ajaxReturn($re,'JSONP');
        }

    }

    //get 全国城市 按 abcd
        function getAllCity(){
            $data = D('city');
            $where['type'] = '1';
            $pinYinArr = array('A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z');
            $getPlaceAciton =A('Home/Index') ;
            foreach($pinYinArr as $v1){
                $where['pinyin'] = $v1;
                $list = $data->where($where)->select();
                   foreach($list as &$v2) {
                      $v2['py2']  = $getPlaceAciton::getPlacePy($v2['_id']) ;
                   }
                $pinArr[$v1] = $list;
                $pinArr[$v1]['header'] = $v1;
            }
            $this->ajaxReturn($pinArr,'JSONP');
        }

}