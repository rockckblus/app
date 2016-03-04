<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <title><?php echo ($_SESSION['key']['catAndThisKey']['thisKey']['name']); ?> 地盘网|免费发布信息广告的网站</title>
</head>
<style>
    a {
        color: #ffffff
    }

    li {
        list-style: none;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    .mt10 {
        margin-top: 10px;
    }

    .mt20 {
        margin-top: 20px;
    }

    .mt30 {
        margin-top: 30px;
    }

    .mt40 {
        margin-top: 40px;
    }

    .mt50 {
        margin-top: 50px;
    }

    .mt3 {
        margin-top: 3px;
    }

    .mt7 {
        margin-top: 7px;
    }

    .ml10 {
        margin-left: 10px;
    }

    .ml20 {
        margin-left: 20px;
    }

    .ml30 {
        margin-left: 30px;
    }

    .ml40 {
        margin-left: 40px;
    }

    .ml50 {
        margin-left: 50px;
    }

    .ml3 {
        margin-left: 3px;
    }

    .ml65 {
        margin-left: 65px;
    }

    .mb10 {
        margin-bottom: 10px;
    }

    .mb20 {
        margin-bottom: 20px;
    }

    .mb30 {
        margin-bottom: 30px;
    }

    .mb40 {
        margin-bottom: 40px;
    }

    .mb50 {
        margin-bottom: 50px;
    }

    .pl10 {
        padding-left: 10px;
    }

    .pl20 {
        padding-left: 20px;
    }

    .pl30 {
        padding-left: 30px;
    }

    .pl40 {
        padding-left: 40px;
    }

    .pl50 {
        padding-left: 50px;
    }

    .pr10 {
        padding-right: 10px;
    }

    .pr20 {
        padding-right: 20px;
    }

    .pr30 {
        padding-right: 30px;
    }

    .pr40 {
        padding-right: 40px;
    }

    .pr50 {
        padding-right: 50px;
    }

    .pb10 {
        padding-bottom: 10px;
    }

    .pb20 {
        padding-bottom: 20px;
    }

    .pb30 {
        padding-bottom: 30px;
    }

    .pb40 {
        padding-bottom: 40px;
    }

    .pb50 {
        padding-bottom: 50px;
    }

    .pb3 {
        padding-bottom: 3px;
    }

    .centext {
        text-align: center;
    }

    .linkMouse {
        cursor: pointer;
    }

    .clearThis:before, .clearThis:after {
        content: "";
        display: table;
    }

    .clearThis:after {
        clear: both;
    }

    .clearThis {
        zoom: 1;
    }

    .hide {
        display: none;
    }

    .font20 {
        font-size: 20px
    }

</style>


<body style="background-color: midnightblue;color: #99f19e;font-size: 12px;font-weight: normal">
<h1><?php echo date('Y跨年m皓月-d裤日',time());?></h1>



<?php if(!empty($_SESSION['key']['catAndThisKey']['thisKey']['name'])): if(is_array($allCity)): $i = 0; $__LIST__ = $allCity;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><li class="ml10 left">
            <a href="http://<?php echo ($vo["py"]); ?>.dipan.so/<?php echo ($_SESSION['key']['catAndThisKey']['thisKey']['py']); ?>"><?php echo ($vo["name"]); echo ($_SESSION['key']['catAndThisKey']['thisKey']['name']); ?></a>
        </li><?php endforeach; endif; else: echo "" ;endif; ?>
    <?php else: ?>
    
    <?php if(is_array($allCity)): $i = 0; $__LIST__ = $allCity;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><div class="mt10 clearThis">
            <?php if(is_array($catOneList)): $i = 0; $__LIST__ = $catOneList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo2): $mod = ($i % 2 );++$i;?><li class="left ml10">
                    <a href="http://<?php echo ($vo["py"]); ?>.dipan.so/<?php echo ($vo2['py']); ?>"><?php echo ($vo["name"]); echo ($vo2['name']); ?></a>
                </li><?php endforeach; endif; else: echo "" ;endif; ?>
            <li class="clearThis line"></li>
            <?php if(is_array($catOneList2)): $i = 0; $__LIST__ = $catOneList2;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo22): $mod = ($i % 2 );++$i;?><li class="left ml10">
                    <a href="http://<?php echo ($vo["py"]); ?>.dipan.so/<?php echo ($vo22['py']); ?>"><?php echo ($vo["name"]); echo ($vo22['name']); ?></a>
                </li><?php endforeach; endif; else: echo "" ;endif; ?>
        </div><?php endforeach; endif; else: echo "" ;endif; endif; ?>


</body>
</html>