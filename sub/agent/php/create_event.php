<?php
include ('./httpful.phar');
if (isset($_POST["button"])) {
    echo "IN";
    $id_venue = $_POST['id_venue'];
    $event_name = $_POST['event_name'];
    $event_date = $_POST['event_date'];
    $event_time = $_POST['event_time'];
    
$url = "http://api.bandcloud.net/agents/events/unregistered";
$body = "&idVenue=" . $id_venue . "&eventName=" . $event_name . "&date=" . $event_date . "&time=" . $event_time;
$response = \Httpful\Request::post($url)
    ->body($body)
    ->sendsType(\Httpful\Mime::FORM)
    ->expectsJson()
    ->send();
		
		echo $response;
		$success = $response->body->success;
		if ($success) {
			 echo '<meta http-equiv="refresh" content="0; url=http://event.concertian.com/event_created.html" />';
        }
		else {
			 echo '<meta http-equiv="refresh" content="0; url=http://event.concertian.com/event_not_created.html" />';
        }
	}   