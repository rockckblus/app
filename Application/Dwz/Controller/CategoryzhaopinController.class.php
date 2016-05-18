<?php
/**
 * 招聘分类后台设置
 * @package qlixin
 * @subpackage
 * @name qinlinxName
 */
namespace Dwz\Controller;


use Dwz\Common\Common2Controller;

class categoryzhaopinController extends Common2Controller
{

    /**
     * subTestTitle
     * @name subTest
     * @param
     * @example
     */
    //分配父亲ID数据
    function _before_add()
    {
        $data = D('categoryzhaopin');
        $where1['type'] = 1;
        $list1 = $data->where($where1)->order('sort')->select();
        $list = $data->order('sort')->select();

        $this->assign('oneCateList', $list1);
        $this->assign('twoCateList', $list);

        $dataGroup = D('proGroup'); //属性组模型
        $listTypeGroup = $dataGroup->select();
        $this->assign('listTypeGroup', $listTypeGroup);
    }


    //分配edit 数据
    function _before_edit()
    {
        $this->_before_add();
    }


    /** 修改入库前，判断是否有二级批量修改属性组*/
    function _before_editIn()
    {
        if (isset($_POST['addAllSon'])) {
            $data = D('categoryzhaopin');
            $where['pid'] = $_POST['id'];
            $list = $data->where($where)->select();
            foreach ($list as $v) {
                $where2['_id'] = $v['_id'];
                $saveData['proGroupId'] = $_POST['proGroupId'];
                $data->where($where2)->save($saveData);
            }
        }
    }

    /**
     * 分配导航index
     * 15-2-23
     */
    function editList()
    {
        $dataName = 'categoryzhaopin';
        $data = D($dataName);
        $list = $data->select();
        $this->assign('list', $list);
        $this->display();
    }

    /**
     *分类导航设置批量入库
     * 15-2-23
     */
    function editNavIn()
    {
        $dataName = 'categoryzhaopin';
        $data = D($dataName);
        foreach ($_POST['sort'] as $k => $v) {
            if ($_POST['nav'][$k] == 'on') {
                $edit['nav'] = 1;
            } else {
                $edit['nav'] = 0;
            }
            $edit['sort'] = (int)$v;
            $where['_id'] = $k;
            $find = $data->where($where)->save($edit);
        }
    }
} 