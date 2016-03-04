<?php
/**
 * HOME 类
 * @package Home
 * @subpackage index控制器
 * @name index控制器
 */
namespace Home\Controller;

use Common\CommonController;

class IndexController extends CommonController
{
    /**
     * index控制器总继承
     * 判断url路由之后的name， 正常A方法解析 $_GET['name'] ,$_GET['action']
     * 示例：http://dipan.so/Home/Fun/action/writeNode "Fun"为控制器名  "action" 为方法名
     */
    public function _initialize()
    {
        $url = 'http://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $this->assignUrl($url);//分配当前城市,周边城市信息
        $this->assign('roundCodeId', round(1, 9999) . time() . round(1, 9999));//分配注册验证码id,便于定位验证码
    }

    /**
     * index 入口
     * @see assignSunCity
     * @see assignPublicSystem() 分配全局变量
     */
    public function  index()
    {
        $this->assignPublicSystem();//分配全局数据
        $this->assignCategory();//分配分类变量
        $re = '';
        //城市级别switch
        switch ($_SESSION['place']['thisCityInfo']['type']) {
            case 1:
                $re['one'] = $this->editOne();
                $re['two'] = $this->editTwo1();
                $re['pinDao'] = $this->editTwo1(1);
                break;
            case 2:
                $re['one'] = $this->editOne();
                $re['two'] = $this->editTwo2();
                $re['pinDao'] = $this->editTwo2(1);
                break;
            case 3:
                $re['one'] = $this->editOne();
                $re['two'] = $this->editTwo2();
                $re['pinDao'] = $this->editTwo2(1);
                break;
        }
        //如果没有关键词
        if (empty($re['two'])) {
            $seoTitle = $_SESSION['place']['thisCityInfo']['name'] . '地盘网|免费发布信息广告的网站';
            $pinDao = $_SESSION['place']['thisCityInfo']['name'];//分类聊天频道字符串
            $this->assign('pinDao', $pinDao);
//            $this->giveCat();//只分配频道和频道下一级分类
        } else {
            $seoTitle = '※〓' . $re['one'] . $re['two'] . ' [' . $_SESSION['place']['thisCityInfo']['name'] . '地盘网]';
            $pinDao = $re['pinDao'];//分类聊天频道字符串
            $this->assign('pinDao', $pinDao);
        }
        //分配当前城市所有地区
        $this->assignSunCity();
        $this->assign('first', $re['one']);
        $this->assign('seoTitle', $seoTitle);
        if (empty($_SESSION['key'])) {//如果没有关键词。就显示www主页模板
            $this->display('Index/www');
        } else {
            //分配分类导航数据
            $this->assignCategoryOneTwo();
            $this->display();
        }
    }

    //分配分类导航数据
    function assignCategoryOneTwo()
    {
        $caiId = $_SESSION['key']['catAndThisKey']['thisKey']['categoryCid'];
        $type = $_SESSION['key']['catAndThisKey']['thisKey']['categoryInfo']['type'];
        $getCatList = R('Api/Api/getCatList',array($caiId,$type));
        $this->assign('catTwoList',$getCatList['twoCatList']);
        $this->assign('catThreeList',$getCatList['threeCatList']);
    }

    /**
     * 分配分类nav
     * 15-2-24
     */
    function  assignCategory()
    {
        $d = D('CategoryService');
        $where['nav'] = 1;
        $list = $d->where($where)->order('sort desc')->select();
        foreach ($list as &$v) {
            $v['url'] = $this->getCatAsKeyPy($v['_id']);
        }

        $this->assign('category', $list);
    }


    /**
     * 关键词级别switch
     */
    function echoKey()
    {
        switch ($_SESSION['key']['catAndThisKey']['thisKey']['level']) {
            case 1:
                $re[0] = $_SESSION['key']['catAndThisKey']['thisKey']['name'];
                return $re;
                break;
            case 2:
                $re[0] = $_SESSION['key']['catAndThisKey']['thisKey']['name'];
                $re[1] = $_SESSION['key']['parentKey']['name'];
                return $re;
                break;
        }
    }

    /**
     * 组合titleOne部分 城市1
     */
    function editOne()
    {
        $key = $this->echoKey();
        $key = $key[0];
        return $_SESSION['place']['thisCityInfo']['name'] . $key;
    }

    /**
     * 组合出第二部分1
     */
    function editTwo1($pinDao = null)
    {
        $key = $this->echoKey();
        if (!empty($_SESSION['key']['catAndThisKey']['thisKey']['name'])) {//如果有关键词
            if (isset($key[1])) {//如果2级关键词
                if (empty($pinDao)) {
                    return '_' . $_SESSION['place']['thisCityInfo']['name'] . $key[1] . '电话|排名';
                } else {
                    return $_SESSION['place']['thisCityInfo']['name'] . $key[1];
                }
            } else {
                if (empty($pinDao)) {
                    return '.';
                } else {
                    return $this->editOne();
                }
            }
        }
    }

    /**
     * 组合出第二部分2
     */
    function editTwo2($pindao = null)
    {
        $key = $this->echoKey();
        if (!empty($_SESSION['key']['catAndThisKey']['thisKey']['name'])) {//如果有关键词
            if (isset($key[1])) {//如果2级关键词
                if (empty($pindao)) {
                    return '_' . $_SESSION['place']['oneCityInfo']['name'] . $_SESSION['place']['twoCityInfo']['name'] . $_SESSION['place']['thisCityInfo']['name'] . $key[1] . '电话|排名';
                } else {
                    return $_SESSION['place']['oneCityInfo']['name'] . $_SESSION['place']['twoCityInfo']['name'] . $_SESSION['place']['thisCityInfo']['name'] . $key[1];
                }
            } else {
                if (empty($pindao)) {
                    return '_' . $_SESSION['place']['oneCityInfo']['name'] . $_SESSION['place']['twoCityInfo']['name'] . $_SESSION['place']['thisCityInfo']['name'] . $key[0] . '电话|排名';
                } else {
                    return $_SESSION['place']['oneCityInfo']['name'] . $_SESSION['place']['twoCityInfo']['name'] . $_SESSION['place']['thisCityInfo']['name'] . $key[0];
                }
            }
        }
    }

    /**
     * 分配当前城市所有地区
     * @see getPlacePy
     */
    function assignSunCity()
    {

        $thisCityId = $_SESSION['place']['thisCityInfo']['_id'];
        $thisCityType = $_SESSION['place']['thisCityInfo']['type'];
        $thisCityPid = $_SESSION['place']['thisCityInfo']['pid'];
        $d = D('city');
        //如果是3级分类就显示同级与2级
        switch ($thisCityType) {
            case '1'://1级
                $where['type'] = '2';
                $where['pid'] = $thisCityId;
                $this->getTwoCityListForOne($thisCityId);//给2级
                break;
            case '2'://2级
                $where['type'] = '3';
                $where['pid'] = $thisCityId;
                $two = $this->getTwoCityList($thisCityId);//给2级
                break;
            case '3'://3级
                $where['type'] = '3';
                $where['pid'] = $thisCityPid;
                $this->getTwoCityList($thisCityPid);//给2级
                break;
            default:
                return false;
        }

        $listTwo = $d->where($where)->field('name')->select();
        foreach ($listTwo as &$v) {
            $v['py'] = $this->getPlacePy($v['_id']);
        }
        $this->assign('listSonCity', $listTwo);
    }

    /**
     * get 2ji同级
     */
    function getTwoCityList($id)
    {
        $d = D('city');
        $find = $this->getCity($id);
        $where['pid'] = $find['pid'];
        $where['type'] = '2';
        $list = $d->where($where)->field('name')->select();
        foreach ($list as &$v) {
            $v['py'] = $this->getPlacePy($v['_id']);
        }
        $this->assign('twoList', $list);
    }

    /** 给1级 的2级 */
    function getTwoCityListForOne($id)
    {
        if (!empty($id)) {
            $d = D('city');
            $where['pid'] = $id;
            $where['type'] = '2';
            $list = $d->where($where)->field('name')->select();
            foreach ($list as &$v) {
                $v['py'] = $this->getPlacePy($v['_id']);
            }
            $this->assign('twoListOne', $list);
        }
    }

}