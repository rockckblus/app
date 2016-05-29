<?php
/**
 * 前台公共继承类
 * @package Common
 * @subpackage Common
 * @name CommonController
 */
namespace Common;

use Think\Controller;

class CommonController extends Controller
{

    public $indexAllRe;

    /**
     * 分配网站公共数据
     */
    public function  assignPublicSystem()
    {
        $systemEditData = D('systemEdit');
        $systemEditDataList = $systemEditData->select();
        $allData['getG'] = $this->formartSys($systemEditDataList);//全局变量配置

        $this->indexAllRe['g'] = $allData;//给indexAllRe
        //给js 不缓存 变量,默认是 给个 日期,
        $this->assign('jsDate',time());
        $this->assign('g', $allData);
    }

    /**
     * 整理system 数据 返回 键值对数值
     */
    function formartSys($data)
    {
        $r = array();
        foreach ($data as $v) {
            $r[$v['key']] = $v['value'];
        }
        return $r;
    }

    /**
     * 全局主入口方法
     * @see assignUrl
     */
    public function _initialize()
    {
        $url = 'http://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $this->assignUrl($url);
    }


    /**
     *整理url路由，分配到session
     * @see findPlace
     * @see findKey
     */
    function assignUrl($url)
    {
        $urlArr = parse_url($url);
        $twoDmain = explode('.', $urlArr['host']);
        $twoDmain = $twoDmain[0];//2级域名

        /**
         * 如果是不是www入口或者一级域名入口就按2级域名地址分配变量
         * @funciton
         * @see findAllCity
         */
        if ($twoDmain !== 'www' && $twoDmain !== 'dipan') {
            /** 写入cookie defaultCity */
            cookie('defaultCity', $twoDmain, 'domain=dipan.so');
            $path = explode('/', $urlArr['path']);
            $key = $path[1];//关键词或者分类名称
            $place = $this->findPlace($twoDmain);

            $this->indexAllRe['session']['place'] = $place;
            $_SESSION['place'] = $place;//写入session地点

            $this->indexAllRe['session']['key'] = $this->findKey($key);
            $_SESSION['key'] = $this->findKey($key);//写入关键词，或者分类
        } else {

            /** 判断cookie 城市 是否存在 */
            $defaultCity = cookie('defaultCity');
            if (empty($defaultCity)) {
                /** 获取城市2级域名，写入cookie */
                $cityStr = $this->getCityStr();
                cookie('defaultCity', $cityStr, 'domain=dipan.so');
            } else {
                if ($defaultCity != 'www') {
                    $urlArr['host'] = $defaultCity . '.dipan.so';
                    $goUrl = 'http://' . $urlArr['host'] . $urlArr['path'];
                    header("Location:$goUrl");
//确保重定向后，后续代码不会被执行
                    exit;
                } else {
                    $path = explode('/', $urlArr['path']);
                    $key = $path[1];//关键词或者分类名称


                    $this->indexAllRe['session']['key'] = $this->findKey($key);
                    $_SESSION['key'] = $this->findKey($key);//写入关键词，或者分类

                    $this->indexAllRe['allCity'] = $this->findAllCity();
                    $this->assign('allCity', $this->findAllCity());
                }
            }

        }

    }

    /**
     * findPlace 返回地名id
     * @see getCity,getOtherCity
     */
    function findPlace($twoDmain)
    {
        if ($twoDmain) {
            $data = D('CityPinYin');
            $where['name'] = $twoDmain;
            $find = $data->where($where)->find();
            if ($find) {
                if ($find['type'] == 1) {
                    $find['oneCityId'] = $find['linkId'];
                    $find['thisCityInfo'] = $this->getCity($find['oneCityId']);
                } else {
                    $find['thisCityInfo'] = $this->getCity($find['linkId']);
                }
                $find['oneCityInfo'] = $this->getCity($find['oneCityId']);
                $find['twoCityInfo'] = $this->getCity($find['towCityId']);
                $find['otherCity'] = $this->getOtherCity($find['oneCityId']);
                return $find;
            };
        }
    }

    /**
     * get周边城市
     */
    function getOtherCity($oneCityId)
    {
        $d = D('nearCity');
        $where['pidLinkId'] = $oneCityId;
        $list = $d->where($where)->select();

        $endList = array();
        foreach ($list as $v) {
            $tempFind = $this->getCity($v['thisLinkId']);
            array_push($endList, $tempFind);
        }
        return $endList;
    }

    /**
     *  findKey 返回 主分类，分类 ，主关键词关键词 。当前关键词
     */
    function findKey($key)
    {
        if ($key) {
            $dp = D('keyPinYin');
            $d = D('key');
            $where['name'] = $key;
            $fp = $dp->where($where)->find();
            $f = $this->getKeyInfo($fp['linkId']);//keyInfo
            $re = array();
            $re['catAndThisKey'] = $f;
            if ($f['thisKey']['level'] == 1) {
                $where2['level'] = 2;
                $where2['parentKeyId'] = $f['thisKey']['id'];
                $re['parentKey'] = $f['thisKey'];
                $re['parentKey']['py'] = $this->getKeyPy($re['parentKey']['id']);
//                $re['level2List'] = $d->where($where2)->select();//主关键词的长尾词

//                foreach ($re['level2List'] as &$v2) {
//                    $v2['py'] = $this->getKeyPy($v2['id']);
//                }

//                $where3['categoryCid'] = $f['thisKey']['categoryCid'];
//                $where3['level'] = 1;
//                $re['level1List'] = $d->where($where3)->select();//分类下其他主关键

//                foreach ($re['level1List'] as &$v) {
//                    $v['py'] = $this->getKeyPy($v['id']);
//                }

            } elseif ($f['thisKey']['level'] == 2) {
                $where1['id'] = $f['thisKey']['parentKeyId'];
                $re['parentKey'] = $d->where($where1)->find();
                $re['parentKey']['py'] = $this->getKeyPy($re['parentKey']['id']);
//                $where1List['categoryCid'] = $re['parentKey']['categoryCid'];
//                $where1List['level'] = 1;
//                $re['level1List'] = $d->where($where1List)->select();
//                foreach ($re['level1List'] as &$v) {
//                    $v['py'] = $this->getKeyPy($v['id']);
//                }
//                $where2['parentKeyId'] = $f['thisKey']['parentKeyId'];
//                $where2['level'] = 2;
//                $re['level2List'] = $d->where($where2)->select();//同级长尾词\
//                foreach ($re['level2List'] as &$v2) {
//                    $v2['py'] = $this->getKeyPy($v2['id']);
//                }
            }
            return $re;
        }
    }

    /**
     * 传入地名id 返回拼音
     */
    function getPlacePy($id = '')
    {
        if ($id) {
            $d = D('CityPinYin');
            $where['linkId'] = $id;

            $find = $d->where($where)->find();
//            dump($d->getLastSql());
            return $find['name'];
        }
    }

    /**
     * 传入keyid 返回拼音
     */
    function getKeyPy($id = '')
    {
        if ($id) {
            $d = D('KeyPinYin');
            $where['linkId'] = $id;
            $find = $d->where($where)->find();
            return $find['name'];
        }
    }

    /**
     * 传入keyid 返回关键词信息
     */
    function getKeyInfo($id)
    {
        if ($id) {
            $d = D('key');
            $f = $d->find($id);
            $f['py'] = $this->getKeyPy($f['id']);
            $f['categoryInfo'] = $this->getCategory($f['categoryCid']);
            /**
             * 前台去掉相关关键词数组，只返回当前关键词
             * 15-2-23
             */
//            $cat = $this->getCategoryArr($f['categoryCid']);
//            $re['cat'] = $cat;
            $re['thisKey'] = $f;

            return $re;
        }
    }

    /**
     * 返回关联分类数组
     */
    function getCategoryArr($id = '', $type = '')
    {
        if (!empty($id) && !empty($type)) {

            /** 判断 catid 所属频道 。遍历出 频道 数据库名称 */

            $dataName = $this->switchDataName($id);
            if (!empty($dataName)) {
                $reArr = array();//声明返回数组
                switch ($type) {
                    case '1';//一级分类 ,需返回 一级分类 。高亮全部

                        $twoCatList = $this->getSunCategory($id, $dataName);
                        foreach ($twoCatList as &$v) {
                            $v['keyPy'] = $this->getCatAsKeyPy($v['_id']);
                            $v['gaoLiang'] = false;
                        }

                        /** '全部'的keyPy */
                        $allKeyPy = $this->getCatAsKeyPy($id);
                        $reArr['twoCatList'] = $twoCatList;

                        //默认全部高亮
                        $all = array('keyPy' => $allKeyPy, 'name' => '全部', 'gaoLiang' => 'selectedTab', 'sort' => 1000);
                        array_push($reArr['twoCatList'], $all);

                        //默认2级分类高亮是全部的时候，没有三级分类
                        $threeCatList = null;
                        $reArr['threeCatList'] = $threeCatList;
                        break;

                    case '2';//二级分类 ,需返回 一级分类 。

                        $twoCatList = $this->getSelfCategory($id, $dataName);

                        foreach ($twoCatList as &$v) {
                            $v['keyPy'] = $this->getCatAsKeyPy($v['_id']);
                            if ($v['_id'] == $id) {

                                /** '全部'的keyPy */
                                $allKeyPy = $this->getCatAsKeyPy($v['pid']);

                                //select 出 高亮2级 的3级 分类
                                $threeList = $this->getSunCategory($id, $dataName);
                                $v['gaoLiang'] = 'selectedTab';
                            } else {
                                $v['gaoLiang'] = false;
                            }
                        }

                        foreach ($threeList as &$v) {
                            $v['keyPy'] = $this->getCatAsKeyPy($v['_id']);
                        }


                        $reArr['twoCatList'] = $twoCatList;

                        //默认全部 不是高亮
                        $all = array('keyPy' => $allKeyPy, 'name' => '全部', 'gaoLiang' => false, 'sort' => 1000);
                        array_push($reArr['twoCatList'], $all);

                        //默认三级导航 加入全部 高亮
                        $reArr['threeCatList'] = $threeList;
                        $allThree = array('name' => '全部', 'gaoLiang' => 'selectedTab', 'sort' => 1000);
                        array_push($reArr['threeCatList'], $allThree);

                        break;

                    case '3';//三级分类  。

                        //select 出 2级  父级分类
                        $twoCatListFind = $this->getPreCategory($id, $dataName);

                        /** '全部'的keyPy */
                        $allKeyPy = $this->getCatAsKeyPy($twoCatListFind['_id']);

                        $twoCatList = $this->getSelfCategory($twoCatListFind['_id'], $dataName);

                        //select 出 高亮3级  同级分类
                        $threeList = $this->getSelfCategory($id, $dataName);

                        foreach ($twoCatList as &$v) {
                            $v['keyPy'] = $this->getCatAsKeyPy($v['_id']);
                            if ($v['_id'] == $twoCatListFind['_id']) {
                                //高亮2级
                                $v['gaoLiang'] = 'selectedTab';
                            } else {
                                $v['gaoLiang'] = false;
                            }
                        }

                        foreach ($threeList as &$v) {
                            $v['keyPy'] = $this->getCatAsKeyPy($v['_id']);
                            if ($v['_id'] == $id) {
                                //高亮三级
                                $v['gaoLiang'] = 'selectedTab';
                            } else {
                                $v['gaoLiang'] = false;
                            }
                        }

                        $reArr['twoCatList'] = $twoCatList;
                        $reArr['threeCatList'] = $threeList;

                        //默认全部2级3级 都不是高亮
                        $all = array('keyPy' => $allKeyPy, 'name' => '全部', 'gaoLiang' => false, 'sort' => 1000);
                        array_push($reArr['twoCatList'], $all);
                        array_push($reArr['threeCatList'], $all);

                        break;

                }
            }


            return $reArr;
        }
    }

    /** 判断 catid 所属频道 。遍历出 频道 数据库名称 todo */
    private function  switchDataName($catid = '')
    {
        if (!empty($catid)) {

            $arr = array('categoryService', 'categoryzhaopin');
            foreach ($arr as $v) {
                $data = D($v);
                $find = $data->find($catid);
                if (!empty($find)) {
                    return $v;
                }
            }

        }

    }


    /**
     * 传入id返回分类信息
     */
    function getCategory($id)
    {
        if ($id) {
            $d = D('CategoryService');
            $find = $d->find($id);
            $find['py'] = $this->getCatAsKeyPy($find['_id']);
            return $find;
        }
    }

    /**
     * 传入id返会父类信息
     */
    function getPreCategory($id, $dataName)
    {
        if ($id) {
            $d = D($dataName);
            $find = $d->find($id);
            $find1 = $d->find($find['pid']);
            $find1['py'] = $this->getCatAsKeyPy($find1['_id']);
            return $find1;
        }
    }

    /**
     * 传入分类id 返回 对应一级关键词拼音
     */
    function getCatAsKeyPy($id)
    {
        $kd = D('key');
        $where['categoryCid'] = $id;
        $where['level'] = 1;
        $key = $kd->where($where)->find();
        $find = $this->getKeyPy($key['id']);
        return $find;
    }

    /**
     * 传入id返回子集分类信息
     */
    function getSunCategory($id, $dataName)
    {
        if ($id) {
            $d = D($dataName);
            $where['pid'] = $id;
            $list = $d->where($where)->order('sort asc')->select();
            foreach ($list as &$v) {
                $v['py'] = $this->getCatAsKeyPy($v['_id']);
            }
            return $list;
        }
    }

    /**
     * 返回同级分类
     */
    function getSelfCategory($id, $dataName)
    {
        if ($id) {
            $d = D($dataName);
            $where['_id'] = $id;
            $find = $d->where($where)->find();
            $where2['pid'] = $find['pid'];
            $list = $d->where($where2)->select();
            foreach ($list as &$v) {
                $v['py'] = $this->getCatAsKeyPy($v['_id']);
            }
            return $list;
        }
    }

    /**
     * 返回城市信息
     */
    function getCity($id)
    {
        if ($id) {
            $d = D('city');
            $find = $d->find($id);
            $find['py'] = $this->getPlacePy($id);
            return $find;
        }
    }

    /**
     * 返回全国城市
     */
    function findAllCity()
    {
        $data = D('city');
        $where['type'] = '1';
        $pinArr = $data->where($where)->select();
        foreach ($pinArr as &$vv) {
            $vv = $this->getCity($vv['_id']);
        }
        return $pinArr;
    }

    /**
     * 首页给分类信息，适合没有关键词，|| 有 城市 的情况
     * 只分配频道和频道下一级分类
     * @see getCategory
     * @link http://www.dipan.so/Index/giveCat
     */
    function giveCat()
    {
        $d = D('category_service');//服务分类模型
        $d2 = D('categoryzhaopin');//招聘分类模型

        $where['pid'] = 0;

        $list = $d->where($where)->select();
        $list2 = $d2->where($where)->select();

        foreach ($list as &$v) {
            $v = $this->getCategory($v['_id'], 'category_service');//查询出对应分类信息
        }
        foreach ($list2 as &$v2) {
            $v2 = $this->getCategory($v2['_id'], 'categoryzhaopin');//查询出对应分类信息
        }

        $this->indexAllRe ['catOneList'] = $list;
        $this->assign('catOneList', $list);

        $this->indexAllRe ['catOneList2'] = $list;
        $this->assign('catOneList2', $list);
    }

    /** 传入城市名称，返回1级城市对应二级域名拼音，如果没找到返回www */
    function getCityPy($name = null)
    {
        if (!empty($name)) {
            $cityData = D('city');
            $where['type'] = '1';
            $where['name'] = $name;
            $find = $cityData->where($where)->find();
            if (!empty($find)) {
                $re = $this->getCity($find['_id']);
                return $re['py'];
            } else {
                return 'www';
            }
        } else {
            return 'www';
        }

    }


    /** 获取城市2级域名，写入cookie */
    function getCityStr()
    {
        /** 获取客户端ip */
        $ip = $_SERVER['REMOTE_ADDR'];
        $cityName = curlBaidu('http://freeipapi.17mon.cn/' . $ip, 'json');
        if ($cityName) {
            if (empty($cityName[2])) {
                $re = $cityName[1];
            } else {
                $re = $cityName[2];
            }
            $re = str_replace('地区', '', $re);
            return $this->getCityPy($re);
        } else {
            return 'www';
        }
    }
}
