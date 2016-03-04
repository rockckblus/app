<?php
header ( 'Content-type: textml; charset=utf-8' );
require_once ("http://127.0.0.1:5656/JavaBridge/java/Java.inc");
// get instance of Java class java.lang.System in PHP
$system = new Java ( 'java.lang.System' );

// demonstrate property access
echo 'Java version=' . $system->getProperty ( 'java.version' ) . '<br/>';
echo 'Java vendor=' . $system->getProperty ( 'java.vendor' ) . '<br/>';
echo 'OS=' . $system->getProperty ( 'os.name' ) . ' ' . $system->getProperty ( 'os.version' ) . ' on ' . $system->getProperty ( 'os.arch' ) . ' <br/>';

