<?php
/**
 * 爬虫界面Index控制器
 * @package Home控制器
 * @subpackage Index
 * @name Index
 */
namespace Home\Controller;

use Home\Common\CommonhomeController;

class IndexController extends CommonhomeController
{

    /** 声明私有全局变量 */
    private $channel;//频道

    /** 当前类继承方法 */
    function _initialize()
    {
        parent::_initialize();
        switch ($_SESSION['categoryChannel']) {
            case 'categoryzhaopin': //招聘频道
                $this->channel = '信息';
                break;
            case 'categoryService': //服务频道
                $this->channel = '电话|排名';
                break;
            default:
                $this->channel = '';
        }
    }

    /**
     * index 入口
     * @see assignSunCity
     */
    public function  index()
    {
        $re = '';
        //城市级别switch
        switch ($_SESSION['place']['thisCityInfo']['type']) {
            case 1:
                $re['one'] = $this->editOne();
                $re['two'] = $this->editTwo1();
                break;
            case 2:
                $re['one'] = $this->editOne();
                $re['two'] = $this->editTwo2();
                break;
            case 3:
                $re['one'] = $this->editOne();
                $re['two'] = $this->editTwo2();
                break;
        }

        //如果没有关键词
        if (empty($re['two'])) {
            $seoTitle = $_SESSION['place']['thisCityInfo']['name'] . '地盘网|免费发布信息广告的网站';
            $this->giveCat();//只分配频道和频道下一级分类
        } else {
            $seoTitle = '※〓' . $re['one'] . $re['two'] . ' [' . $_SESSION['place']['thisCityInfo']['name'] . '地盘网]';
        }
        //分配当前城市所有地区
        $this->assignSunCity();
        $this->assign('first', $re['one']);
        $this->assign('seoTitle', $seoTitle);
        $this->display();

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
    function editTwo1()
    {
        $key = $this->echoKey();
        if (!empty($_SESSION['key']['catAndThisKey']['thisKey']['name'])) {//如果有关键词
            if (isset($key[1])) {//如果2级关键词
                return '_' . $_SESSION['place']['thisCityInfo']['name'] . $key[1] . $this->channel;
            } else {
                return '.';
            }
        }
    }

    /**
     * 组合出第二部分2
     */
    function editTwo2()
    {
        $key = $this->echoKey();
        if (!empty($_SESSION['key']['catAndThisKey']['thisKey']['name'])) {//如果有关键词
            if (isset($key[1])) {//如果2级关键词
                return '_' . $_SESSION['place']['oneCityInfo']['name'] . $_SESSION['place']['twoCityInfo']['name'] . $_SESSION['place']['thisCityInfo']['name'] . $key[1] . $this->channel;
            } else {
                return '_' . $_SESSION['place']['oneCityInfo']['name'] . $_SESSION['place']['twoCityInfo']['name'] . $_SESSION['place']['thisCityInfo']['name'] . $key[0] . $this->channel;
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


}