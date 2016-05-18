<?php
/**
 * 第一行介绍,klkljllljl
 * @package MyPackage
 * @name 快递费2
 * @param 楼上的客流量
 * @category aaahh
 *
 */

namespace Dwz\Controller;


use Dwz\Common\Common2Controller;
use Api\Model\ChinesePinyinModel;


class KeyController extends Common2Controller
{
    /** 服务频道关键词管理 */
    function angularIndex()
    {
        $d = M('categoryService');
        $list = $d->select();
        $this->assign('category', $list);
        $this->display();
    }

    /** 招聘频道关键词管理 */
    function angularIndexZhaoPin()
    {
        $d = M('categoryzhaopin');
        $list = $d->select();
        $this->assign('category', $list);
        $this->display('angularIndexZhaoPin');
    }


    //批量添加关键词
    function addAll()
    {
        $this->display();
    }

    //批量入库
    function addAllIn()
    {
        $data = D('key');
        foreach ($_POST['name'] as $v) {
            if ($v) {

                $v = str_replace('天津', '', $v);
                $add['categoryCid'] = $_POST['categoryCid']; //分类id
                $add['name'] = $v; //拼音
                $add['level'] = (int)$_POST['level']; //关键词级别
                $add['state'] = 1; //状态
                if (!empty($_POST['parentKeyId'])) { //如果level不为空，就是level2
                    $add['parentKeyId'] = (int)$_POST['parentKeyId']; //所属关键词id
                    $addRe = $data->getMongoNextId();
                    $this->addKeyPy($add['name'], $addRe);
                    $data->add($add);

                } else {
                    $add['level'] = 1;
                    $addRe = $data->getMongoNextId();
                    echo $data->getLastSql();
                    $this->addKeyPy($add['name'], $addRe);
                    $add['parentKeyId'] = (int)$addRe;
                    $data->add($add);
                }
            }
        }
    }

    //入库 KeyPinYin Add方法
    function addKeyPy($name, $id)
    {
        $data = D('KeyPinYin');
        $name = $this->getPyAll($name);//转拼音
        if ($name) {
            $where['name'] = $name;
            $find = $data->where($where)->find();
//            dump($find);
//            return false;
            if (!$find) {
                $add['name'] = $name;
            } else {
                $add['name'] = $name . time() . round(0, 9999);
            }
        } else {
            $add['name'] = time() . round(0, 9999);
        }

        $add['linkId'] = (int)$id;
        $data->add($add);
    }

    //返回拼音首字母（一个。如 返回 a）
    function getPyAll($words = '')
    {
        $words = str_replace('/', '', $words);
        $words = str_replace('|', '', $words);
        $words = str_replace('(', '', $words);
        $words = str_replace(')', '', $words);
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

    /**
     * 去重关键词
     */
    function cutKey()
    {
       return false;
        $data = D('key');
        $pinYIn = D('KeyPinYin');
        $list = $data->select();
        foreach ($list as $v) {
            $where['name'] = $v['name'];
            $count = $data->where($where)->count();
            if ($count > 1) {//如果有重复的词，就删除第2个词，和拼音
                $selectList = $data->where($where)->select();

                foreach ($selectList as $v2) {
                    static $i = 0;
                    $i++;
                    if ($i > 1) {
                        $delId = $v2['id'];
//                        $delpyId = $v2['id'];
                        $where2['id'] = $delId;
                        $data->where($where2)->delete();
                        dump($delId);

//                       dump($data->getLastSql());
                        /**
                         * 删拼音
                         */
                        $wherepy['linkId'] = $delId;
                        $pinYIn->where($wherepy)->delete();
                    }
                }


            }

        }
    }
}