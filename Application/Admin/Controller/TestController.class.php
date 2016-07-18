<?php
namespace Admin\Controller;

use Think\Controller;
use Mongod\Model\Tempgpschina1Model;

class TestController extends Controller
{
    /** mongo 测试查询 */
    function mongoTest()
    {
        $m = new Tempgpschina1Model();
        $find  = $m->find();
        dump($find);
    }

}