<?php
/**
 * Created by PhpStormggggg.
 * User: apple
 * Date: 14-10-1
 * Time: 上午8:27
 */

namespace Dwz\Common;


use Admin\Controller\IndexController;
use Think\Controller;

class Common2Controller extends Controller
{
    public function _initialize()
    {
        //判断登录，后台
        $url = explode('/', $_SERVER['REQUEST_URI']);
        if ($url[1] == 'Dwz' && $url[3] != 'login' && $url[3] != 'loginIn') { //需要判断session的模块
            if ($_SESSION['isLogin'] && $_SESSION['Permission'] == 'admin') {

                //给模板全局变量
                $data = IndexController::getGoldData();
                $this->assign('allData', $data);

                return true;
            } else {
                $this->success('去登录', '/Admin/Index/login');
            }
        } else {
            return true;

        }


    }

    public function index()
    {
        $dataName = $_GET['dataName'];
        $data = D($dataName);
        $list = $data->order('sort asc')->select();
        $this->assign('list', $list);
        $this->display();
    }

    //显示添加面板
    public function add()
    {
        $this->assign('navTabId', $_GET['navTabId']);
        $this->display();
    }

    //添加一条数据
    function addIn()
    {


        $dataName = $_POST['dataName']; //获取数据库名
        $data = D($dataName); //实例化 mongod 模型

        if(isset($_POST['inPinYin'])){//判断提交是否需要入库拼音
            $trueInPinYin = true;
            $dataName = $_POST['dataName'];
        }
        unset($_POST['dataName']);
        unset($_POST['inPinYin']);

        $addReturn = $data->add($_POST);

        if (false != $addReturn) {
            if($trueInPinYin){//如果需要入库拼音
                $this->inPinYin($_POST['pinYin'],$dataName,$addReturn);//入库拼音
            }
            $return['statusCode'] = '200';
            $return['message'] = '操作成功';
            $return['callbackType'] = 'closeCurrent';
            $return['forwardUrl'] = '';
            $return['navTabId'] = $_GET['navTabId'];
        }
        $this->ajaxReturn($return);
    }



    //修改一条数据
    function editIn()
    {


        $dataName = $_POST['dataName']; //获取数据库名
        $data = D($dataName); //实例化 mongod 模型
        unset($_POST['dataName']);
        $where['_id'] = $_POST['id'];
        unset($_POST['id']);
        unset($_POST['addAllSon']);
        $_POST['state']=(int)$_POST['state'];
        $_POST['sort']=(int)$_POST['sort'];
        $_POST['type']=(int)$_POST['type'];

        $a = $data->where($where)->save($_POST);

        if (false != $a['updatedExisting']) {
            $return['statusCode'] = '200';
            $return['message'] = '操作成功';
            $return['callbackType'] = 'closeCurrent';
            $return['forwardUrl'] = '';
            $return['navTabId'] = $_GET['navTabId'];
        }else{
                $return['statusCode'] = '300';
                $return['message'] = '操作失败';
        }


        $this->ajaxReturn($return);
    }

    //删除
    function del()
    {
        $data = D($_GET['dataName']);
        $where['_id'] = $_GET['id'];

        $t = $data->where($where)->delete();
        if ($t['n'] == 1) {
            $return['statusCode'] = '200';
            $return['message'] = '操作成功';
            $return['callbackType'] = 'forward';

        } else {
            $return['statusCode'] = '300';
            $return['message'] = '操作失败';

        }
        $this->ajaxReturn($return, 'json');
    }

    function edit()
    {
        $data = D($_GET['dataName']);
        $where['_id'] = $_GET['id'];
        $find = $data->where($where)->find();
        $this->assign('navTabId', $_GET['navTabId']);
        $this->assign('find', $find);
        $this->display();
    }



//字符串to数组
    function strToArr($info) {
        if($info == '') return array();
        $info=stripcslashes($info);
        eval("\$r = $info;");
        return $r;
    }

//数组to字符串
    function arrToStr($info) {
        if($info == '') return '';
        if(!is_array($info)) $string = stripslashes($info);
        foreach($info as $key => $val) $string[$key] = stripslashes($val);
        return addslashes(var_export($string, TRUE));
    }


    //入库拼音url 如果有相同拼音 就 添加一个 后缀
    function inPinYin($name,$table,$id){
        if(!empty($name)){
            $data = D('PinYin');
            $where['name'] = $name;
            $find = $data->where($where)->find();
            if(empty($find)){
                $add['name'] = $name;
            }else{
                $trueIsSet = true;//声明存在标记，去修改刚添加的pinyin
                $add['name'] = $name.time();
            }

            $add['table'] = $table;
            $add['linkId'] = $id;
            $data->add($add);

            if(isset($trueIsSet)){//修改刚添加的pinyin
                $data2 = D($table);
                $add2['pinYin'] = $add['name'];
                $where2['_id'] = $id;
                $data2->where($where2)->save($add2);
            }

        }


    }

}