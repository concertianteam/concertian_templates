<?php
require_once 'local_utils.php';

echo "Hello World";

// prevent direct access
$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND
strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
if(!$isAjax) {
  $user_error = 'Zadajte názov klubu';
  trigger_error($user_error, E_USER_ERROR);
}

echo "Hello World";

// get what user typed in autocomplete input
$term = trim($_GET['venue_name']);
 
$a_json = array();
$a_json_row = array();
 
$a_json_invalid = array(array("id" => "utocomplete", "value" => $term, "label" => "Povolené sú len písmena a číslice"));
$json_invalid = json_encode($a_json_invalid);

// replace multiple spaces with one
$term = preg_replace('/\s+/', ' ', $term);

// allow space, any unicode letter and digit, underscore and dash
if(preg_match("/[^\040\pL\pN_-]/u", $term)) {
  print $json_invalid;
  exit;
}

// database connection
$conn = new mysqli("db_server", "db_user", "db_passwd", "db_name");