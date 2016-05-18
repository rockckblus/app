<?php
/**
 * 爬虫入口主继承文件
 * @package Home控制器
 * @subpackage 全局主入口
 * @name 全局主入口name
 */
namespace Home\Common;

use Think\Controller;

class CommonhomeController extends Controller
{
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
        if ($twoDmain !== 'www' && $twoDmain !== 'oeoe') {
            $path = explode('/', $urlArr['path']);
            $key = $path[1];//关键词或者分类名称
            $place = $this->findPlace($twoDmain);
            $_SESSION['place'] = $place;//写入session地点
            $_SESSION['key'] = $this->findKey($key);//写入关键词，或者分类
        } else {
            $path = explode('/', $urlArr['path']);
            $key = $path[1];//关键词或者分类名称
            $_SESSION['key'] = $this->findKey($key);//写入关键词，或者分类
            if (empty($_SESSION['key']['catAndThisKey']['thisKey']['name'])) {
                /**
                 * 无关键词就分配一级分类
                 */
                $this->giveCat();
            }
            $this->assign('allCity', $this->findAllCity());
            $this->display('Index/www');
            exit();
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
                $re['level2List'] = $d->where($where2)->select();//主关键词的长尾词

                foreach ($re['level2List'] as &$v2) {
                    $v2['py'] = $this->getKeyPy($v2['id']);
                }

                $where3['categoryCid'] = $f['thisKey']['categoryCid'];
                $where3['level'] = 1;
                $re['level1List'] = $d->where($where3)->select();//分类下其他主关键

                foreach ($re['level1List'] as &$v) {
                    $v['py'] = $this->getKeyPy($v['id']);
                }

            } elseif ($f['thisKey']['level'] == 2) {
                $where1['id'] = $f['thisKey']['parentKeyId'];
                $re['parentKey'] = $d->where($where1)->find();
                $re['parentKey']['py'] = $this->getKeyPy($re['parentKey']['id']);
                $where1List['categoryCid'] = $re['parentKey']['categoryCid'];
                $where1List['level'] = 1;
                $re['level1List'] = $d->where($where1List)->select();
                foreach ($re['level1List'] as &$v) {
                    $v['py'] = $this->getKeyPy($v['id']);
                }
                $where2['parentKeyId'] = $f['thisKey']['parentKeyId'];
                $where2['level'] = 2;
                $re['level2List'] = $d->where($where2)->select();//同级长尾词\
                foreach ($re['level2List'] as &$v2) {
                    $v2['py'] = $this->getKeyPy($v2['id']);
                }
            }
//            dump($re);
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
            $cat = $this->getCategoryArr($f['categoryCid'], 'categoryService');
            if (empty($cat['oneCat'])) {
                $cat = $this->getCategoryArr($f['categoryCid'], 'categoryzhaopin');
            }
            $re['cat'] = $cat;
            $re['thisKey'] = $f;

            return $re;
        }
    }

    /**
     * 返回关联分类数组
     */
    function getCategoryArr($id = '', $dataName)
    {
        if (!empty($id)) {

            /** 写入session 频道 */
            $_SESSION['categoryChannel']=$dataName;

            $thisFind = $this->getCategory($id, $dataName);
            switch ($thisFind['type']) {
                case '1';
                    $oneFind = $thisFind;
                    $twoFind = $this->getSunCategory($thisFind['_id'], $dataName);
                    $threeFind = array();
                    foreach ($twoFind as $v) {
                        $select = $this->getSunCategory($v['_id'], $dataName);
                        if ($select) {
                            array_push($threeFind, $select);
                        }
                    }
                    break;
                case '2';
                    $twoFind = $this->getSunCategory($thisFind['pid'], $dataName);
                    $oneFind = $this->getCategory($thisFind['pid'], $dataName);
                    $threeFind = array();
                    foreach ($twoFind as $v) {
                        $select = $this->getSunCategory($v['_id'], $dataName);
                        if ($select) {
                            array_push($threeFind, $select);
                        }
                    }
                    break;
                case '3';
                    $twoFind = $this->getSelfCategory($thisFind['pid'], $dataName);
                    $oneFind = $this->getPreCategory($thisFind['pid'], $dataName);
                    $threeFind = array();
                    foreach ($twoFind as $v) {
                        $select = $this->getSunCategory($v['_id'], $dataName);
                        if ($select) {
                            array_push($threeFind, $select);
                        }
                    }
                    break;
            }
            $re['thisCat'] = $thisFind;
            $re['oneCat'] = $oneFind;
            $re['twoCat'] = $twoFind;
            $re['threeCat'] = $threeFind;

            return $re;
        }
    }

    /**
     * 传入id返回分类信息
     */
    function getCategory($id, $dataName)
    {
        if ($id) {
            $d = D($dataName);
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
//        dump($find);

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
            $list = $d->where($where)->select();
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
        $d = D('category_service');//分类模型服务
        $d2 = D('categoryzhaopin');//招聘模型


        $where['pid'] = 0;

        $list = $d->where($where)->select();
        $list2 = $d2->where($where)->select();

        foreach ($list as &$v) {
            $v = $this->getCategory($v['_id'], 'category_service');//查询出服务频道对应分类信息
        }
        foreach ($list2 as &$v2) {
            $v2 = $this->getCategory($v2['_id'], 'categoryzhaopin');//查询招聘模型对应分类信息
        }

//        dump($list2)$list2;
        $this->assign('catOneList', $list);
        $this->assign('catOneList2', $list2);
    }


}