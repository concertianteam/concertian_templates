jQuery(document).ready(function() {
	if (Cookies.get('apiKey') === undefined) {
			window.location = 'http://localhost/sub/agent/index.html';
    	}
	else{
	  var apiKey = Cookies.get('apiKey');
      var name = Cookies.get('name');
      var urlPhoto = Cookies.get('urlPhoto');
      var idAccount = Cookies.get('idAccount');
      var idVenue = Cookies.get('idVenue');
	$('#idVenue').val(idVenue);
	$('#apiKey').val(apiKey);
	$('#venue_logo').append('<img class="logo" src="' + urlPhoto + '">');
	$('#created_concerts').append('<span>Vaše koncerty: <b>' + name + '</b></span>');
	}
			
});