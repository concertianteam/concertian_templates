<?php
include ('httpful.phar');

if (isset($_POST["submit"])) {
	
	$email = $_POST['email'];
	$password = $_POST['password'];

$url = "http://api.bandcloud.net/agents/auth";
$body = 'email=' . $email . '&password=' . $password;
		
		$response = \Httpful\Request::post ( $url )->body ( $body )->sendsType ( \Httpful\Mime::FORM )->expectsJson ()->send ();
    
    if($response->body->success){		
		setcookie("apiKey", $response->body->apiKey, time() + 3600, "/");
		setcookie("name", $response->body->name, time() + 3600, "/");
		setcookie("urlPhoto", $response->body->urlPhoto, time() + 3600, "/");
		setcookie("idAccount", $response->body->idAccount, time() + 3600, "/");
		setcookie("idVenue", $response->body->idVenue, time() + 3600, "/");
		header('Location: http://localhost/sub/agent/app.html');
    }  else {
		header('Location:http://localhost/sub/manager/registration.html');
    }
		}
?>