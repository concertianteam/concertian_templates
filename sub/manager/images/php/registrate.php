<?php
include (httpful.phar);
if (isset($_POST["submit"])) {
    $venue_name = $_POST['venue_email'];
    $venue_name = $_POST['venue_name'];
    $password = $_POST['password'];
    $password_confirmation = $_POST['password_confirmation'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $business_name = $_POST['business_name'];
    $adressFirst = $_POST['adressFirst'];
    $adreseSecond = $_POST['adressSecond'];
    $city = $_POST['city'];
    $adrese = $_POST['adrese'];
    $state = $_POST['state'];
    
$url = "https://api.bandcloud.net/agents/register";
$body = 'venue_email=' . $body = 'venue_name=' . $venue_name . '&password=' . $password . '&password_confirmation' . $password . '&first_name' . $first_name . '&last_name' . $secondname . '&business_name' . $business_name . '&adressFirst' . $adressFirst . '&adressSecond' . $adressSecond . '&city' . $city . '&adrese' . $adrese . '&state' . $state .;
		
		$response = \Httpful\Request::post ( $url )->body ( $body )->sendsType ( \Httpful\Mime::FORM )->expectsJson ()->send ();
		
		echo $response;
		$success = $response->body->success;
		if ($success)
			return $response->body->accountId;
		else
			return $response->body->status;
	}   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}


