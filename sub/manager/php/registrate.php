<?php
include ('httpful.phar');
if (isset($_POST["submit"])) {
    $venue_name = $_POST['venue_name'];
    $venue_email = $_POST['email'];
    $password = $_POST['password'];
    $state = $_POST['state'];
    $city = $_POST['city'];
    $adressFirst = $_POST['address'];
    
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
?>