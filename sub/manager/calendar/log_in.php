<?php

$url = 'http://api.bandcloud.net/agents/auth';
$data = array('key1' => 'email', 'key2' => 'password');

// use key 'http' even if you send the request to https://...
$options = array(
        'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

var_dump($result);
$json = json_decode($result, true);
$data = array(‘email’ => 'email', ‘password’ => 'password');

?>