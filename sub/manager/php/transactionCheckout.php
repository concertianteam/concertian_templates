<?php
include('../brainTreePhp/lib/Braintree.php');
$nonceFromTheClient = $_POST['payment_method_nonce'];

Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('zn8d4c74dbnp5ntw');
Braintree_Configuration::publicKey('ttwrprnsj83thjjz');
Braintree_Configuration::privateKey('a818cb5f3164585f31f4f03066f308c8');
$result = Braintree_Transaction::sale([
  'amount' => '100.00', //set ammount of transaction, maybe by GET paramter of brainTree FORM
  'paymentMethodNonce' => $nonceFromTheClient //value of $_POST from brainTree server
]);
var_dump($result); //TODO: make HTML for transaction success, now only dump for see something
?>
