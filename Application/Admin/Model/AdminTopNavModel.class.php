<?php
/**
 * adminTopNav 后台导航表.
 *
 * 字段设计：_id ,name(名称),pid (父id,默认0为顶级分类)，
 * icon（图标），path（链接路径）
 * 
 * User: apple
 * Date: 14-9-22
 * Time: 下午4:40
 */

namespace Admin\Model;

use Think\Model\MongoModel;
class AdminTopNavModel extends MongoModel{
 
} 