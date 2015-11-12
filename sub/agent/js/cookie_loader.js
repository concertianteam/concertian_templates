jQuery(document).ready(function() {
	if  (Cookies.get('idAccount') == undefined) {
		console.log('No cookie');
	}
	else{
	  var apiKey = Cookies.get('apiKey');
      var name = Cookies.get('name');
      var urlPhoto = Cookies.get('urlPhoto');
      var idAccount = Cookies.get('idAccount');
	console.log(apiKey, name, urlPhoto, idAccount);
	$('#idVenue').val(idAccount);
	}
			
});