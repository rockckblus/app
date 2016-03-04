<?php
/**
 * HOME 工具类
 * @package Home
 * @subpackage HOME工具类
 * @name HOME工具类
 */
namespace Home\Controller;
use THINK\Controller;

class FunController extends Controller
{
    /**
     * nodeJs 调试 操作 nohuOut 日志文件测试方法
     *
     */
    function writeNode()
    {
       dump(getNode());
    }
    
    public function test(){
        return 1;
    }
}