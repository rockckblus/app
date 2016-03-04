<?php

namespace Notes\Controller;

use Think\Controller;

/**
 * 文档： IndexController
 * @作者： gongmingshi
 * @邮件地址： gongmingshi@qq.com
 */
class IndexController extends Controller {

    public function index() {
        $m = D('notes');
            $w['_id'] = '5440c4bdd6c08b12558b4583';
            $dd = $m->where($w)->find();
        $d = $m->where($w)->find();
dump($d);
//        $this->assign("data", $d);
//        $this->display();
    }

    public function add() {
        $m = D('notes');
        if (isset($_POST['m'])) {
            $w['_id'] = $_POST['m'];
            if (isset($_POST[i])) {
                $i = I('post.i');
                $d = array("replay." . $i . ".title" => I('post.title'), "replay." . $i . ".content" => I('post.content'));
            } else {
                $d = array("title" => I('post.title'), "content" => I('post.content'));
            }
            $r = $m->where($w)->save($d);
            if ($r) {
                $this->success("回复成功修改", __CONTROLLER__ . "/index");
            }
        } elseif (isset($_POST['replay'])) {
            $w['_id'] = I('post.replay');
            $d["replay"] = array("push", I('post.'));
            $r = $m->where($w)->save($d);
            if ($r) {
                $this->success("回复成功", __CONTROLLER__ . "/index");
            }
        } else {
            if (!0 == count(array_filter(I('post.')))) {
                $d = $m->add($_POST);
                if ($d) {
                    $this->success("成功插入", __CONTROLLER__ . "/index");
                }
            } else {
                $this->error("无数据插入");
            }
        }
    }

    public function mydel() {
        $m = D('notes');
        $w['_id'] = I('request.id');
        if (isset($_REQUEST['i'])) {
            $d["replay"] = array("pop", I('request.i'));
            $r = $m->where($w)->save($d);
            if ($r) {
                $this->success("回复成功删除", __CONTROLLER__ . "/index");
            }
        } else {
            $dd = $m->where($w)->delete();
            if ($dd) {
                $this->success("留言成功删除", __CONTROLLER__ . "/index");
            }
        }
    }
}
