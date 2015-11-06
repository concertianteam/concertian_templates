<?php
include ('httpful.phar');
if (isset($_POST["button"])) {
	$email = $_POST['email'];
    $venue_name = $_POST['venue_name'];
    $password = $_POST['password'];
    $state = $_POST['state'];
    $city = $_POST['city'];
    $addressFirst = $_POST['address'];
    
$url = "http://api.bandcloud.net/agents/register";
$body = 'email=' . $email . '&name=' . $venue_name . '&password=' . $password . '&addressFirst=' . $addressFirst . '&state=' . $state . '&city=' . $city;
		
		$response = \Httpful\Request::post ( $url )->body ( $body )->sendsType ( \Httpful\Mime::FORM )->expectsJson ()->send ();
    
    if($response->body->success){
        header('Location: http://localhost/concertian/promotion');
    } else {
        echo $response->body->message;   
    }
		}
?>