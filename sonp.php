<?php
header("content-type:text/html;charset=utf-8");
try {
    $soap = new SoapClient("http://113.31.29.156/VehNewWebService/WebService.asmx?WSDL");
    $result = $soap->__soapCall("GetNewPosition", array('admin','13166666666'));
    echo $result . "<br/>";

//    echo $result2;
} catch (SoapFault $e) {
    echo $e->getMessage();
} catch (Exception $e) {
    echo $e->getMessage();
}
?>