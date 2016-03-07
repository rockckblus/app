<?php
namespace Api\Controller;

use Common\CommonController;

class JsonpAdminController extends CommonController
{
    //传get CatId 返回 所属 关键词列表
    function getKey()
    {
        if ($_GET['catId'] && $_GET['dataName']) {
            $d = D('key');
            $c = D($_GET['dataName']);
            $re['catName'] = $c->find($_GET['catId']);
            $where['categoryCid'] = $_GET['catId'];
            $list = $d->where($where)->select();
            $re['levelOne'] = array();
            $re['levelTwo'] = array();
            foreach ($list as $v) {
                if ($v['level'] == 1) {
                    array_push($re['levelOne'], $v);
                }
                if ($v['level'] == 2) {
                    array_push($re['levelTwo'], $v);
                }
            }
            $this->ajaxReturn($re, 'JSONP');
        }
    }

    //get 单个关键词信息
    function getKeyInfo()
    {
        if ($_GET['id']) {
            $d = D('key');
            $pinYin = D('keyPinYin');
            $find = $d->find((int)$_GET['id']);
            $where['linkId'] = $find['id'];
            $findPY = $pinYin->where($where)->find();
            $find['py'] = $findPY['name'];
            $this->ajaxReturn($find, 'JSONP');
        }
    }

    //修改 关键词 name
    function editKeyInfo()
    {
        if ($_GET['id'] && $_GET['name']) {
            $d = D('key');
            $edit['name'] = $_GET['name'];
            $where['id'] = (int)$_GET['id'];
            $re = $d->where($where)->save($edit);
            if ($re['updatedExisting']) {
                $reEnd['status'] = 200;
                $reEnd['msg'] = '修改成功';
            } else {
                $reEnd['status'] = 201;
                $reEnd['msg'] = '修改失败';
            }
            $this->ajaxReturn($reEnd, 'JSONP');
        }
    }

    //删除关键词
    function delKeyInfo()
    {
        if ($_GET['id']) {
            $d = D('key');
            $find = $d->find((int)$_GET['id']);
            if (!empty($find)) {
                if ($find['level'] == 2) {
                    $re = $d->delete((int)$_GET['id']);
                    $this->delKeyPy((int)$_GET['id']);
                    if ($re['ok'] == 1) {
                        $reEnd['status'] = 200;
                        $reEnd['msg'] = '删除成功';
                    };
                } elseif ($find['level'] == 1) {
                    $w['level'] = 2;
                    $w['parentKeyId'] = (int)$_GET['id'];
                    $l = $d->where($w)->select();
                    if (!empty($l)) {

                        $reEnd['status'] = 201;
                        $reEnd['msg'] = '删除失败，有子关键词';
                    } else {
                        $re = $d->delete((int)$_GET['id']);
                        $this->delKeyPy((int)$_GET['id']);
                        if ($re['ok']) {
                            $reEnd['status'] = 200;
                            $reEnd['msg'] = '删除成功';
                        } else {
                            $reEnd['status'] = 203;
                            $reEnd['msg'] = '删除失败';
                        };
                    };
                }


                $this->ajaxReturn($reEnd, 'JSONP');
            } else {
                $re['status'] = 204;
                $re['msg'] = '关键词不存在';
                $this->ajaxReturn($re, 'JSONP');
            }
        }
    }

    //删除 key 拼音
    function delKeyPy($id = '')
    {
        if ($id) {
            $d = D('keyPinYin');
            $where['linkId'] = $id;
            $d->where($where)->delete();
        }
    }

    function getAttrById()
    {
        $d = D($_GET['model']);
        $find = $d->field($_GET['field'])->find((int)$_GET['id']);
        $this->ajaxReturn($find[$_GET['field']], 'JSONP');
    }

    function getAttrBy_Id()
    {
        $d = D($_GET['model']);
        $find = $d->field($_GET['field'])->find($_GET['id']);
        $this->ajaxReturn($find[$_GET['field']], 'JSONP');
    }

    /**
     * 根据分类频道搜索关键词方法
     * 15-3-8
     */
    function searchKey()
    {
        if ($_GET['key'] && !empty($_GET['dataName'])) {//$_get[dataName]频道数据库
            $d = D('key');

            /** 声明一个频道分类Id，数组 作为以后判断用*/
            $dListArr = array();
            $dPinDao = D($_GET['dataName']);
            $dList = $dPinDao->select();
            foreach ($dList as $v) {
                array_push($dListArr, $v['_id']);
            }

            $where['name'] = array('like', trim($_GET['key']));
            $list = $d->where($where)->select();

            if (!empty($list)) {
                $re['levelOne'] = array();
                $re['levelTwo'] = array();
                foreach ($list as $v) {

                    /** 过滤所属频道 */
                    if (in_array($v['categoryCid'], $dListArr)) {
                        if ($v['level'] == 1) {
                            array_push($re['levelOne'], $v);
                        }
                        if ($v['level'] == 2) {
                            array_push($re['levelTwo'], $v);
                        }
                    }
                }
                $re['status'] = 200;
                $this->ajaxReturn($re, 'JSONP');
            } else {
                $re['status'] = 204;
                $re['msg'] = '无搜索结果';
                $this->ajaxReturn($re, 'JSONP');
            }
        }
    }

}