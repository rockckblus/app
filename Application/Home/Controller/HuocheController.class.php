<?php
namespace Home\Controller;

use Think\Controller;
use Home\Model\ChinesePinyinModel;

class HuocheController extends Controller
{


    function _initialize(){
        dump('kdkd');
    }
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

   

}