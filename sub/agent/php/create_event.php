<?php
include ('./httpful.phar');
if (isset($_POST["submit"])) {
	$apiKey = $_POST['apiKey'];
    $id_venue = $_POST['idVenue'];
    $event_name = $_POST['eventName'];
    $event_date = $_POST['eventDate'];
    $event_time = $_POST['eventTime'];
    $visible = $_POST['visibility'];
    $status = $_POST['status'];
   	
$url = "http://api.bandcloud.net/agents/events";
$body = "&apiKey=" . $apiKey . "&idVenue=" . $id_venue . "&eventName=" . $event_name . "&date=" . $event_date . "&time=" . $event_time . "&visible=" . $visible . "&status=" . $status;
	
$response = \Httpful\Request::post ( $url )->body ( $body )->sendsType ( \Httpful\Mime::FORM )->expectsJson ()->send ();
				
	echo $response;

}  
?>