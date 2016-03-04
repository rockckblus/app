<?php 
 function my_file_get_contents($url){
    $start_time = microtime(true)*1000;
      $ch = curl_init();
      $timeout = 30; // set to zero for no timeout
      $read_timeout = 5;
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
      curl_setopt($ch, CURLOPT_TIMEOUT, $timeout + $read_timeout);
      $handles = curl_exec($ch);
      if(curl_errno($ch))
    {
        curl_close($ch);
        return "" ;
    }
    else
    {
      curl_close($ch);
      return $handles;
    }

  $a = my_file_get_contents("http://www.baidu.com");
  echo $a;
  #
  }
 
	
 
 
  