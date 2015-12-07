<?php
include('../brainTreePhp/lib/Braintree.php');

//generate ClientToken by Braintree token config
//TODO: transfer function to backend
Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('zn8d4c74dbnp5ntw');
Braintree_Configuration::publicKey('ttwrprnsj83thjjz');
Braintree_Configuration::privateKey('a818cb5f3164585f31f4f03066f308c8');

echo($clientToken = Braintree_ClientToken::generate());
//return token by ajax for generate brainTree section
?>
