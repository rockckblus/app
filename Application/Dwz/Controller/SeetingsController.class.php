<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 14-10-1
 * Time: 下午12:20
 */

namespace Dwz\Controller;


use Common\CommonController;

class SeetingsController extends CommonController{
    public function topNav(){//顶部导航方法
        $data = D('AdminTopNav');//顶部导航表
        $list  = $data->order('order desc')->select();
        $this->assign('list',$list);
        $this->display();
    }

    public function add(){//添加导航
        $data  = D('AdminTopNav');
        $r = $data->add($_POST);
        if($r){
            $this->ajaxReturn(200,'JSON');
        }
    }
    public function topNavList(){
        $data  = D('AdminTopNav');
        $r = $data->limit('0,3')->order('_id asc')->select();
        $this->ajaxReturn($r,'JSONP');
    }


    public function editCategory(){//ajax 修改分类内容
        $data = D('AdminTopNav');
        $where['_id'] = $_POST['_id'];
        unset($_POST['_id']);
        $_POST['order'] = (int) $_POST['order'];
        $re = $data->where($where)->save($_POST);

        if($re){//修改成功
            $reState['state'] = 200;
        }else{//无修改
            $reState['state'] = 400;
        }

        $this->ajaxReturn($reState,'JSON');
    }

    public function delNav(){
        $data  = D('AdminTopNav');
        $where['_id'] = $_POST['navId'];
        $re = $data->where($where)->delete();
            if($re){//修改成功
                $reState['state'] = 200;
            }else{//无修改
                $reState['state'] = 400;
            }

            $this->ajaxReturn($reState,'JSON');
    }

} 