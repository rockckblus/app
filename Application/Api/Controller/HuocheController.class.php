<?php
namespace Api\Controller;

use Think\Controller;
use Api\Model\ChinesePinyinModel;

class HuocheController extends Controller
{
    function huoChe()
    {
        $this->display();
    }

    //添加采集数据web发布
    function instHuoChe()
    {
        $data = D('city');
        $_POST = $this->editPost($_POST);
        $r = $data->add($_POST);
        dump($r);
    }

    //整理post数据
    function editPost($post)
    {
        $cityM = D('city');
        $post['pinyin'] = $this->getPy($post['name']); //获得拼音首字母
        dump($post['pinyin']);
        switch ($post['type']) {
            case '1'; //天津
                $post['pid'] = '0';
                unset($post['oneName'], $post['twoName']);
                return $post; //直接返回
                break;
            case '2'; //武清
                $where['type'] = '1'; //给pid 条件 为一级
                $where['name'] = $post['oneName']; //查询1级名称相符的
                break;
            case '3'; //杨村
                $where['type'] = '2'; //给pid 条件 为2级
                $where['name'] = $post['twoName']; //查询2级名称相符的
                break;
        }
        $tempcount = $cityM->where($where)->count();
        dump($tempcount);
        if ($tempcount == 1) { //如果就只有一个结果，就直接 赋值，
            $find = $cityM->where($where)->find();
            $post['pid'] = $find['_id'];
        } elseif ($tempcount > 1 && $post['type'] == '3') { //如果是3级地区如果结果 有多个（2级type 不存在多个结果情况），就查2个条件 ，post数据就需要传入 1级 名称，2级名称
            $tempSelect = $cityM->where($where)->select(); //select 2级名称重复的项
            $whereOne['type'] = '1'; //type 为1级
            $whereOne['name'] = $post['oneName']; //1级NAME
            $onePid = $cityM->where($whereOne)->find(); //查出2级的pid
            $onePid = $onePid['_id']; //查出2级的pid
            foreach ($tempSelect as $v) {
                if ($v['pid'] == $onePid) {
                    $post['pid'] = $v['_id']; //给pid值
                }
            }
        }
        unset($post['oneName'], $post['twoName']);
        return $post;
    }

    //返回拼音首字母（一个。如 返回 a）
    function getPy($words = '')
    {
        $Pinyin = new ChinesePinyinModel();
        //转成带有声调的汉语拼音
//        $result = $Pinyin->TransformWithTone($words);
        //转成带无声调的汉语拼音
//        $result = $Pinyin->TransformWithoutTone($words,' ');
        //转成汉语拼音首字母
        $result = $Pinyin->TransformUcwords($words);
//        $test = $PingYing->TransformUcwords('进');
        $resultArr = str_split($result);
        return $resultArr[0];
    }

    //返回拼音首字母（一个。如 返回 a）
    function getPyAll($words = '')
    {
        $Pinyin = new ChinesePinyinModel();
        //转成带有声调的汉语拼音
//        $result = $Pinyin->TransformWithTone($words);
        //转成带无声调的汉语拼音
        $result = $Pinyin->TransformWithoutTone($words, '');
        //转成汉语拼音首字母
//        $result = $Pinyin->TransformUcwords($words);
//        $test = $PingYing->TransformUcwords('进');
//        $resultArr = str_split($result);
//        return $resultArr[0];
        return $result;
    }

    function telNet()
    {
// 建立客户端的socet连接
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        $connection = socket_connect($socket, '122.141.236.235', 2004); //连接服务器端socket
        while ($buffer = @socket_read($socket, 1024, PHP_NORMAL_READ)) {
            //服务端告诉客户端，自己的状态
            if (preg_match("/not connect/", $buffer)) {
                echo "don`t connect\n";
                break;
            } else {
                //服务器传来信息
                echo "Buffer Data: " . $buffer . "\n";
                echo "Writing to Socket\n";
                // 将客户的信息写到通道中，传给服务器端
                if (!socket_write($socket, "SOME DATA\n")) {
                    echo "Write failed\n";
                }
                //服务器端收到信息后，给于的回应信息
                while ($buffer = socket_read($socket, 1024, PHP_NORMAL_READ)) {
                    echo "sent to server: SOME DATA\n response from server was:" . $buffer . "\n";
                }
            }
        }
    }

    //入库分类by频道
    function categoryDisplay()
    {
        $this->display();
    }

    //入库分类by频道add 生活服务
    function categoryIns()
    {
        dump($_POST);
        $_POST['type'] = (int)$_POST['type'];
        $data = D('CategoryService');
        $end = $data->add($_POST);
        dump($end);
    }

    //入库分类by频道
    function pro()
    {
        $this->display();
    }

    //入库分类by频道add 生活服务
    function proIns()
    {
        dump($_POST);
        $_POST['type'] = (int)$_POST['type'];
        $data = D('CategoryService');
        $end = $data->add($_POST);
        dump($end);
    }

    //统计城市1级
    function countCityOne()
    {
        $data = D('city');
        $where['type'] = '2';
        $list = $data->where($where)->select();
        dump($list);
    }


    //城市拼音入库方法
    function inCityPy()
    {
//        name：城市拼音名称
//type:地区级别
//
//linkid：对应城市表id
//	本身id
//oneCityId：所属城市id
//	如果type是2级就有对应1级，否则为0
//	twoCityId:所属2级地区id
//	如果type是3级就有对应2级，否则为0
    }

    //合并4级数据到city表。条件为 4级地区，没有的，就传3级地区名字 去mysql查接口

    function chaCity4()
    {
        return false;
        $cityData = D('city');
        $where['type'] = '2';
        $type2List = $cityData->where($where)->limit('3000,1000')->select();
        foreach ($type2List as $v) {
            if (isset($v['pid'])) {
                $where2['type'] = '3';
                $where2['pid'] = $v['_id'];
                $tempCity = $cityData->find($v['pid']);
                $find = $cityData->where($where2)->find();
                if (empty($find)) {
                    $url = 'http://182.92.170.127/Mysql/Index/cha4ji/name/' . $v['name'] . '/city/' . $tempCity['name'];
                    $re = $this->curlBaidu($url);
                    if (!empty($re[0])) {
                        $this->addOtherCity($re, $v['_id']); //返回的三级地区，去添加到city表，传国的id是pid
                    };
                }
            }
        }
    }

    //删除数据
    function delType3()
    {
        $data = D('city');
        $where['type'] = 3;
        $list = $data->where($where)->delete();
        dump($list);
    }

//返回的三级地区，去添加到city表，传国的id是pid
    function addOtherCity($re, $pid)
    {
        $data = D('city');
        foreach ($re as $v) {
            $add['mark'] = 'rock';
            $add['name'] = $v;
            $add['type'] = '3';
            $add['pinyin'] = $this->getPy($v); //获得拼音首字母
            $add['pid'] = $pid;
            $data->add($add);
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
//        return json_decode($result);
        return $result;
    }

//写入一级城市拼音
    function ll()
    {
        $cityData = D('city');
        $cityPyData = D('cityPinYin');
        $allCountPy = D('allCountPy');
        $where['type'] = '1';
        $list = $cityData->where($where)->select();
        foreach ($list as $v) {
            $url = 'http://182.92.170.127/Mysql/Index/getOneCity/name/' . $v['name'];
            $re = $this->curlBaidu($url);
            if ($re) {
                $add['name'] = $re;
            } else {
                $add['name'] = $this->getPyAll($v['name']);
            }
            $add['type'] = 1;
            $add['linkId'] = $v['_id'];
            $add['oneCityId'] = 0;
            $add['towCityId'] = 0;
            $cityPyData->add($add);
            $allCountPy->add($add);
        }
    }

    //写入2级地区拼音
    function writeTwo()
    {
        $cityData = D('city');
        $cityPyData = D('cityPinYin');
        $allcityPyData = D('allCountPy');
        $where['type'] = '2';
        $list = $cityData->where($where)->select();
        $endNameArr = array();
        foreach ($list as $v) {
            $add['name'] = $this->getPyAll($v['name']);
            $whereAllPy['name'] = $add['name'];
            $findTrueSet = $allcityPyData->where($whereAllPy)->find();
            if (empty($findTrueSet)) {
                $addAllPy['name'] = $add['name'];
            } else {
                $findOne = $cityData->find($v['pid']);
                $where2['linkId'] = $findOne['_id'];
                $linkOne = $cityPyData->where($where2)->find();
                $addAllPy['name'] = $linkOne['name'] . '-' . $add['name'];
            }
            $addAllPy['type'] = 2;
            $allcityPyData->add($addAllPy);
            $add['name'] = $addAllPy['name'];
            $add['type'] = 2;
            $add['linkId'] = $v['_id'];
            $add['oneCityId'] = $v['pid'];
            $add['towCityId'] = 0;
            $cityPyData->add($add);
        }
    }

    //写入3级地区拼音
    function writeThree()
    {
        $cityData = D('city');
        $cityPyData = D('cityPinYin');
        $allcityPyData = D('allCountPy');
        $tempCount = $this->getTempCount();
        $where['type'] = '3';
        $list = $cityData->where($where)->limit($tempCount, '1000')->select();
        foreach ($list as $v) {
            $add['name'] = $this->getPyAll($v['name']);
            $whereAllPy['name'] = $add['name'];
            $findTrueSet = $allcityPyData->where($whereAllPy)->find();
            if (empty($findTrueSet)) {
                $addAllPy['name'] = $add['name'];
                $findTwo = $cityData->find($v['pid']); //得到父区县
                $findOne = $cityData->find($findTwo['pid']); //get 城市
            } else {
                $findTwo = $cityData->find($v['pid']); //得到父区县
                $where4['linkId'] = $findTwo['_id'];
                $findTwopy = $cityPyData->where($where4)->find(); //get  区县py
                $findOne = $cityData->find($findTwo['pid']); //get 城市
                $where2['linkId'] = $findOne['_id'];
                $linkOne = $cityPyData->where($where2)->find(); //get  城市简写py
                $addAllPy['name'] = $linkOne['name'] . '-' . $add['name']; //得到城市+乡镇
                $whereAllPy2['name'] = $addAllPy['name']; //如果城市+乡镇 也存在 就 加 区县
                $findTrueSet2 = $allcityPyData->where($whereAllPy2)->find();
                if (!empty($findTrueSet2)) { //如果 城市+乡镇 不为空，就是城市+区县+乡镇
                    $addAllPy['name'] = $linkOne['name'] . '-' . $findTwopy['name'] . '-' . $add['name']; //得到城市+乡镇
                }
            }
            $addAllPy['type'] = 3;
            $allcityPyData->add($addAllPy);
            $add['name'] = $addAllPy['name'];
            $add['type'] = 3;
            $add['linkId'] = $v['_id'];
            $add['oneCityId'] = $findOne['_id'];
            $add['towCityId'] = $v['pid'];;
            dump($add);
            $cityPyData->add($add);
        }
        $this->saveTempCount($tempCount + 1000);
        echo $tempCount;
        echo "<script language=JavaScript>setTimeout(function(){location.replace(location.href);},1000)</script>";
    }

    function getTempCount()
    {
        $data = D('tempCount');
        $find = $data->find(1);
        return $find['num'];
    }

    function saveTempCount($num)
    {
        $data = D('tempCount');
        $where['id'] = 1;
        $save['num'] = $num;
        $data->where($where)->save($save);
    }

    function addTempCount()
    {
        $data = D('tempCount');
        $add['num'] = 0;
        $data->add($add);
    }

    function countAllPy()
    {
        $allCountPy = D('allCountPy');
        $list = $allCountPy->select();
        $arr = array();
        foreach ($list as $v) {
            $arr[] = $v['name'];
        }
        asort($arr);
        dump($arr);
    }

    function testId()
    {
        $allCountPy = D('allCountPy');
        $where['linkId'] = '54630d5cd6c08bb9138b4638';
        $list = $allCountPy->where($where)->find();
        dump($list);
    }

    //入库周边城市
    function inOtherCity()
    {
        return false;
        $city = D('city');
        $where['type'] = '1';
        $list = $this->curlBaidu('http://182.92.170.127/Mysql/Index/selectOtherCity');
        foreach ($list as $v) {
            $where['name'] = $v->pidName;
            $find = $city->where($where)->find();
            if (!empty($find)) {
                $where2['type'] = '1';
                $where2['name'] = $v->name;
                $find2 = $city->where($where2)->find();
                if (!empty($find2)) {
                    $add['pidLinkId'] = $find['_id'];
                    $add['thisLinkId'] = $find2['_id'];
                    $otherM = D('Home/Model/NearCity');

                    $otherM->add($add);
                }
            }
        }
    }

    /**
     * 提取赶集关键词
     */
    function getGanjiKey()
    {
        $str = 'http://www.ganji.com/' . $_GET['url'] . '/';
        $key = $this->get_keywords($str);
        $this->ajaxReturn($key, 'JSON');
    }

    /**
     * 入库分类
     */
    function postObj()
    {
        return false;
        $data['get'] = $_GET;
//        level: "3", oneCatTitle: "家政服务", twoCatTitle: "保险", title: "意外保险", url: "/yiwaibaoxian/"
        $addData['name'] = $_GET['title'];//分类名称
        $addData['pinYin'] = $_GET['url'];//赶紧的分类URL链接
        $addData['type'] = (int)$_GET['level'];//type级别
        $addData['state'] = 1;
        /**
         * 给pid
         */
        if ($_GET['level'] == 1) {
            $addData['pid'] = 0;
        } else {
            /**
             * 如果不是1级分类。就去找pid传oneTitle，towTitle
             * todo
             */
            $addData['pid'] = $this->getPid($_GET['level'], $_GET['oneCatTitle'], $_GET['twoCatTitle']);
        }
        $cateData = D('categoryService');
        $reId = $cateData->add($addData);
        if ($reId) {
            $data['state'] = 200;
            $data['get'] = $_GET;
        } else {
            $data['state'] = 201;//添加失败
            $data['get'] = '添加失败';
        }
//        $this->ajaxReturn($data, 'JSON');
    }

    /**
     * 给pid
     */
    function getPid($type, $oneTitle, $twoTitle = null)
    {
        $cateData = D('categoryService');
        /**
         * 如果二级分类title不为空,就是3级分类,就去找type2的级别，否则找1级title
         */
        if ($type == 3) {
            $where['name'] = $twoTitle;
            $where['type'] = 2;
            $find = $cateData->where($where)->find();
            return $find['_id'];
        } else {//如果是2级分类
            $where['name'] = $oneTitle;
            $where['type'] = 1;
            $find = $cateData->where($where)->find();
            return $find['_id'];
        }
    }

    function get_keywords($html)
    {
        $meta = get_meta_tags($html);
        $keywords = $meta['keywords'];
// 分割关键词
        $keywords = explode(',', $keywords);
// 整理
        $keywords = array_map('trim', $keywords);
// 去掉空内容
        $keywords = array_filter($keywords);
        return $keywords;
    }

    /**
     * 分类关键词采集dispaly页面
     */
    function caiJiKey()
    {
        $cateData = D('categoryService');
        $list = $cateData->select();
        $this->assign('list', $list);
        $this->display();
    }

    /**
     * 采集赶集key
     */
    function getCaiJiKey()
    {
        $_GET['url'] = trim($_GET['url'], '/');
        $url = 'http://tj.ganji.com/' . $_GET['url'] . '/';
        $key = $this->curlBaidu($url);
        $matches = array();
        preg_match_all('/<[\s]*meta[\s]*name="?' . '([^>"]*)"?[\s]*' . 'content="?([^>"]*)"?[\s]*[\/]?[\s]*>/si', $key, $matches);

        $keyStr = $matches[2][1];
        $key = explode(',', $keyStr);
        foreach ($key as &$v) {
            $v = str_replace('/', '', $v);
            $v = str_replace('(', '', $v);
            $v = str_replace(')', '', $v);
            $v = str_replace('天津', '', $v);
        }
        $re['key'] = $key;
        $re['get'] = $_GET;
        $this->ajaxReturn($re, 'JSON');
    }

    /**
     * 采集赶集招聘频道分类显示页面
     * 15-3-4
     */
    function zhaoPinIndex()
    {
        $data = D('Temp');
        $where['name'] = 'ganJiHome';//查赶集首页标示
        $find = $data->where($where)->find();
        /** 判断临时表里有没有赶集招聘的数据，没有就写入Temp数据库 */
        if (!empty($find)) {
            $body = $find['content'];
        } else {
            $body = $this->curlBaidu('http://tj.ganji.com/zhaopin/');
            $addTemp['content'] = $body;
            $addTemp['name'] = 'ganJiHome';
            $data->add($addTemp);
        }
        $this->assign('body', $body);

        /** get一级分类 */
        $oneCategory = $this->getZhaoPinCAtNameId(1);
        $this->assign('oneCategory', $oneCategory);

        /** get二级分类 */
        $twoCategory = $this->getZhaoPinCAtNameId(2);
        $this->assign('twoCategory', $twoCategory);
        $this->display();
    }

    /** getZhaoPinCatNamePid 返回招聘分类的名称 和 _id*/
    function getZhaoPinCAtNameId($type = null)
    {
        if (!empty($type)) {
            $data = D('CategoryZhaopin');
            $where['type'] = $type;
            $list = $data->where($where)->order('sort asc')->select();
            return $list;
        }
    }


    /** 入库赶集招聘频道分类 */
    function inZhaoPinPost()
    {
        $data = D('CategoryZhaopin');
        $_POST['type'] = (int)$_POST['type'];
        $_POST['state'] = (int)$_POST['state'];
        $_POST['nav'] = (int)$_POST['nav'];
        $_POST['sort'] = (int)$_POST['sort'];
        $re = $data->add($_POST);
        if ($re !== false) {
            $this->ajaxReturn(true, 'json');
        } else {
            $this->ajaxReturn(false, 'json');
        }
    }


    /** 采集赶集招聘 */
    function caiJiZhaoPinKey()
    {
        $data = D('CategoryZhaopin');
        $where['type'] = array('neq', 1);
        $list = $data->where($where)->select();
        $this->assign('list', $list);
        $this->display();
    }


    /** find 无关键词的 分类 */
    function findNoKeyCat()
    {
        $data = D('Categoryzhaopin');
//        $data = D('CategoryService');
        $key = D('Key');
        $where1['type'] = 3;
        $listCat = $data->where($where1)->select();
        foreach ($listCat as $v) {
            $where['categoryCid'] = $v['_id'];
            $re=$key->where($where)->find();
            if(empty($re)){
                $end['id'] = $v['_id'];
                $end['key'] =str_replace('/','',$v['name']).'行业招工招聘人才';
               dump($end) ;
            }
        }

    }


}