<?php
include ('httpful.phar');
if (isset($_POST["submit"])) {
	
	$email = $_POST['email'];
    
$url = "http://api.bandcloud.net/agents/verifyemail";
$body = 'email=' . $email;
		
		$response = \Httpful\Request::post ( $url )->body ( $body )->sendsType ( \Httpful\Mime::FORM )->expectsJson ()->send ();
    
    if($response->body->success){
		setcookie("email", $email, time() + 3600, "/");
		setcookie("name", $response->body->name, time() + 3600, "/");
		setcookie("addressFirst", $response->body->addressFirst, time() + 3600, "/");
		setcookie("city", $response->body->city, time() + 3600, "/");
		setcookie("state", $response->body->state, time() + 3600, "/");
		print_r($_COOKIE);
		header('Location: http://localhost/concertian/manager/registration.html');
    }  else {
        echo $response->body->message;  
		header('Location:http://localhost/concertian/manager/registration.html');
    }
		}
?>