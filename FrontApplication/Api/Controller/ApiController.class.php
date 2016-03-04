<?php
/**
 * FrontApp Api 类 对前台提供接口
 * @package Api
 * @subpackage Api公共方法
 * @name Api公共方法控制器
 */
namespace Api\Controller;

use Common\CommonController;
use Think\Controller;

class ApiController extends CommonController
{

    /** 覆盖CommonController 的默认执行方法 */
    public function _initialize()
    {

    }

    /** 验证用户手机号是否存在 */
    public function trueUserMt()
    {
        if (!empty($_GET['mtNum'])) {

            /** 实例化api  */
            $api = new FunController();

            /** 判断手机号存在 */
            $reMtTrue = $api->trueUserMt($_GET['mtNum']);
            if ($reMtTrue == 200) {
                $this->ajaxReturn(200, 'JSONP');
            } else {
                writeError($reMtTrue, 'f_Api/trueUserMt');
                $this->ajaxReturn($reMtTrue, 'JSONP');
            }
        } else {
            writeError(108, 'f_Api/trueUserMt');
            $this->ajaxReturn(108, 'JSONP');
            // 手机号为空
        }
    }

    /** 验证手机号对应code 是否存在 */
    public function trueCode()
    {

        if (!empty($_GET['mtNum']) && !empty($_GET['code'])) {
            $d = D('Mongod/TempCode');
            $where['mt'] = (int)$_GET['mtNum'];
            $where['code'] = (int)$_GET['code'];
            $find = $d->where($where)->find();
            if ($find) {
                $this->ajaxReturn(200, 'JSONP');
            } else {
                writeError(112, 'f_api/trueCode');
                $this->ajaxReturn(112, 'JSONP');
                //没在数据找到对应记录
            }
        } else {
            writeError(111, 'f_api/trueCode');
            $this->ajaxReturn(111, 'JSONP');
            //get来的手机号，或者验证码为空
        }

    }

    /** 验证用户登陆 post用户名，密码 */
    public function trueLogin()
    {
        /** 接受angularPost数据 */
        $_POST = file_get_contents("php://input");
        $_POST = json_decode($_POST);

        if (!empty($_POST->mtNum) || !empty($_POST->passWord)) {

            /** 实例化api  */
            $api = new FunController();

            /** 验证用户名密码正确性  */
            $reMtPassTrue = $api->trueMtPass($_POST->mtNum, $_POST->passWord);

            /** 判断手机号是否存在  */
            $reMtTrue = $api->trueUserMt((int)($_POST->mtNum));
            if ($reMtTrue == 107) {//107 用户手机号存在
                $this->ajaxReturn($reMtPassTrue, 'JSON');
            } else {
                $this->ajaxReturn(116, 'JSON');
                //116手机号不存在
            }
        } else {
            $this->ajaxReturn(114, 'JSON');
            // 114:登陆方法_验证传入的登陆手机号或者密码为空<br>
        }
    }

    /** 传入catId，type 1 2 3 对应 123 返回对应分类 1级，2级，3级。与默认高type亮 todo */
    public function getCatList($catId, $type)
    {
        if (!empty($catId) && !empty($type)) {
            $find = $this->getCategoryArr($catId, $type);
            $find['twoCatList'] = array_reverse($find['twoCatList']);
            $find['threeCatList'] = array_reverse($find['threeCatList']);
            if (!empty($find['twoCatList'])) {
                return $find;
            } else {
                return 119;
                // 119:获取列表分类方法_返回数据为空<br>
            }
        } else {
            return 120;
            // 120:获取列表分类方法_get来的catid 或者 分类type 级别为空<br>
        }
    }

}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
