<?php

namespace Dwz\Controller;


use Dwz\Common\Common2Controller;

class IndexController extends  Common2Controller
{
    /**
     * 第一行介绍,klkljllljl
     * lkjljljllklkjkljll22222
     * @name 快递费
     * @param 楼上的客流量
     *
     */
    function arr(){

    }

//从启动 NODE 服务器
    function restNode(){
        $curl = curl_init();
        curl_setopt($curl,CURLOPT_URL,'http://oeoe.cc/'.'rest');
        curl_setopt($curl,CURLOPT_HEADER,1);
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
        $data['message'] = curl_exec($curl);
        $data['statusCode']=200;
        fclose($curl);
        echo json_encode($data);
    }

    public function index()
    {
        $m = D('News');
        $list = $m->select();
        $this->assign('list', $list);
        $this->display();



    }


    function login()
    {

        $this->display();
    }

    function loginIn()
    {
        $data['state'] = '600';
        if ($_GET['userName'] == 'rockblus' && $_GET['passWord'] == 'HDZrockblus8') {
            $data['state'] = '200';
            $_SESSION['isLogin'] = true;
            $_SESSION['Permission'] = 'admin';
        } else {
            $data['state'] = '400';
        }
        $this->ajaxReturn($data, 'JSONP');
    }


    function logOut()
    {
        session('[destroy]');
        $this->success('退出成功', '/Admin/Index/login');
    }

    public function test()
    {
        $m = D('admin');
        $add['jhh'] = 'jk';

        $m->add($add);


        $where["a"] = "aa";
        $list = $m->where($where)->select();

        static $a = 1880;
        foreach ($list as $v) {

            $a++;
            $v['kkk'] = $a;
            $w2['_id'] = $v['_id'];

            $kf = $v;


            unset($kf['_id']);


            $r = $m->where($w2)->add($kf);
        }

        $list = $m->where($where)->select();
        echo '<br>';
        dump($list);
    }


    function getJspGoldData(){// getjsonp 全局数据

        $data =  $this->getGoldData();
        $this->ajaxReturn($data,'JSONP');

    }


    function getGoldData()
    { //return 全站公共数据

        //顶部导航数据
        $listTopNavData = D('AdminTopNav'); //顶部导航表
        $listTopNav = $listTopNavData->order('order desc,_id asc')->select();
        $reAllData['listTopNav'] = $listTopNav;//顶部导航
        return $reAllData;

    }


    function leftNavIndex(){
        $data = D('leftNav');
        $list  = $data->select();

        $this->assign('leftNavList',$list);
        $this->display();
    }



}
