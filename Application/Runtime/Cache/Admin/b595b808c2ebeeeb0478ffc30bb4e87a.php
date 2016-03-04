<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <!-- Standard Meta -->
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

    <!-- Site Properities -->
    <title>Admin for dipan.so</title>


<body ng-controller='oeoeBody' class="mt0 pt0" style="background-color: #f4f4f4">



    <div class="ui grid mt0">
        <div class="two wide column mt0"></div>
        <div class="twelve wide column mt0">
            <div class="ui tiered menu inverted" id="headerNavOutDiv">
                <div class="menu" id="headerNav">

                    <?php if(is_array($allData['listTopNav'])): $i = 0; $__LIST__ = $allData['listTopNav'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if(($vo["pid"]) == "0"): static $i = 0; $i++; ?>
                            <a href="<?php echo ($vo["path"]); ?>" class="item" itemCount="<?php echo ($i); ?>">
                                <i class="<?php echo ($vo["icon"]); ?> icon"></i>
                                <?php echo ($vo["name"]); ?>
                            </a><?php endif; ?>

                        <?php
 unset($i); endforeach; endif; else: echo "" ;endif; ?>

                    <a class="item right" href="/Admin/Index/logOut">退出 <i class="icon sign out"></i>
                    </a>

                </div>

                <?php if(is_array($allData['listTopNav'])): $i = 0; $__LIST__ = $allData['listTopNav'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; if(($vo["pid"]) == "0"): static $ii = 0; $ii++; ?>
                        <div class="ui sub menu hide" id="Subitem<?php echo ($ii); ?>" itemCount="<?php echo ($ii); ?>">
                            <?php if(is_array($allData['listTopNav'])): $i = 0; $__LIST__ = $allData['listTopNav'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo2): $mod = ($i % 2 );++$i; if(($vo2["pid"]) == $vo["_id"]): ?><a href="<?php echo ($vo2["path"]); ?>" class=" item"><?php echo ($vo2["name"]); ?></a><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                        </div><?php endif; ?>
                    <?php
 unset($ii); endforeach; endif; else: echo "" ;endif; ?>


            </div>
        </div>
        <div class="two wide column mt0"></div>
    </div>

    <div class="ui error message hide" id="tiShiDiv">
        <i class="close icon"></i>

        <div class="header" style="text-align: center">

        </div>
    </div>



    <div class="ui grid">
        <div class="two wide column"></div>
        <div class="twelve wide column" style="min-height: 500px">




            <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; echo ($vo["a"]); ?>+++++<?php echo ($vo["b"]); ?><br><?php endforeach; endif; else: echo "" ;endif; ?>





    </div>
    <div class="two wide column"></div>
    </div>



    <div class="ui grid">
        <div class="two wide column"></div>
        <div class="twelve wide column">
            <div class="ui horizontal divider"><i class="add icon"></i></div>
        </div>
        <div class="two wide column">
        </div>
    </div>




</body>
<link rel="stylesheet" type="text/css" href="/Public/semantic/css/semantic.min.css">
<link rel="stylesheet" type="text/css" href="/Public/publicCss/style.css">
<link rel="stylesheet" type="text/css" href="/Public/publicCss/index.css">

<script type="text/javascript" src="http://dipan.so:8080/Public/publicDefault/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/Public/itemJs/seajs/dist/sea.js"></script>




    <script>
        seajs.use("/Public/itemJs/seajs/app/main.js", function () {
            angular.bootstrap(window.document, ["myOeoeApp"]);
        });
    </script>


</html>