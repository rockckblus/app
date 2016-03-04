<?php
namespace Mysql\Controller;
use Think\Controller;

class IndexController extends Controller{

    public function  index()
    {
        return false;
        $dataCount = M('temp_count');
        $count = $dataCount->find(1);
        $count = $count['count'];
        $addCount = 100;


        for($i=0;$i<50;$i++){
            $data = M('cshy_area');
            $where['level'] = 4;
            $list = $data->where($where)->limit($count,$addCount)->select();
            foreach($list as $v){
                if($this->twoText($v['name'])){
                    $v['name'] = $this->editName($v['name']);
                }
                $where2['id'] = $v['id'];
                $data->where($where2)->save($v);
            }

            $count = $count + 100;
            $this->saveCount($count);
            sleep(1);
        }
            echo $count;
        echo "<script language=JavaScript>setTimeout(function(){location.replace(location.href);},3000)</script>";


    }


    function saveCount($count){
        $data = M('temp_count');
        $where['id'] = 1;
        $add['count'] = (int)$count;
        $data->where($where)->save($add);

    }

    function index2(){
        $data = M('cshy_area');
        $where['pidPy'] = array('neq','');
        $list = $data->where($where)->select();
        dump($list);
    }


    //整理level4 的地区 替换，道办事处,地区,满族乡,乡，镇，道，农场，
//    判断汉字格式，大于2就替换
    function twoText($name){
        $len = strlen($name);
// 输出 FALSE，因为在UTF-8下三个中文占9个字节
        if($len > 6){
            return true;
        }else{
            return false;
        }
    }

    //判断替换过的街道，字符为4个，就删去第四个街字
    function forJie($name){
        $len = strlen($name);
        if($len == 12){
            return true;
        }

    }

    function editName($name){
       $name = str_replace('道办事处','',$name);
        $name = str_replace('回族地区','',$name);
        $name = str_replace('回族乡','',$name);
        $name = str_replace('地区','',$name);
       $name = str_replace('满族乡','',$name);
       $name = str_replace('乡','',$name);
       $name = str_replace('镇','',$name);
       $name = str_replace('道','',$name);
       $name = str_replace('农场','',$name);
       $name = str_replace('街街','街',$name);
        if($this->forJie($name)){
            $name = str_replace('街','',$name);
        }
       return $name;
    }

    function te(){
        dump('kkkk');
    }
    //查4级
    function cha4ji(){
        $name = $_GET['name'];
        $data = M('cshy_area');
        $where['level'] = 3;
        $where['name'] = array('like',$name.'%');
        $list = $data->where($where)->select();

        $end = array();


        foreach($list as $v){
            $city = $data->find($v['upid']);
            $city = $city['name'];//得到城市名

            if(strpos($city,$_GET['city']) !== false){//判断城市名 和 区名
                $where3['upid'] = $v['id'];
                $endList = $data->where($where3)->field('name')->select();
                foreach($endList as $v){
                    $end[] = $v['name'];
                }
            };
        }




        $this->ajaxReturn($end,'JSON');
    }


//get 一级拼音 和 区号
function getOneCity(){
    $data = M('cshy_area');
    $where['name']=array('like',$_GET['name'].'%');
    $where['level']=2;
    $l=$data->where($where)->find();
    $this->ajaxReturn($l['pidPy'],'JSON');
}



    //周边城市遍历打印
    function selectOtherCity(){
        $data = M('cshy_city');
        $list = $data->select();
        $this->ajaxReturn($list,'JSON');
    }




}