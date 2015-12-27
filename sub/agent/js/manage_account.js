$(document).ready(function() {
	//COOKIE LOADER
	if (Cookies.get('apiKey') === undefined) {
			window.location = 'index.html';
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
    
    	//LOGOUT
	$('#logOff').click(function(){
		
		var apiKey = Cookies.get('apiKey');
		var base_url = 'https://api.concertian.com/agents/auth';

	$.ajax({
		beforeSend: function (request)
        {
            request.setRequestHeader("Authorization", apiKey);
        },
        type: "DELETE", 
        url: base_url,
        success: function(json){
			console.log(json);
			window.location = 'index.html';
            $('#loginResult').append('<div class="loged_out">Boli ste úspešne dohlásený</div>');
			},
		});
	});
    // STYLE SWITCHER
	$('button#night').click(function (){
   		$('link[href="css/main.css"]').attr('href','css/main.night.css');
	});
	$('button#normal').click(function (){
   		$('link[href="css/main.night.css"]').attr('href','css/main.css');
	});
	
    // We generated a client token for you so you can test out this code
            // immediately. In a production-ready integration, you will need to
            // generate a client token on your server (see section below).
            var clientToken;

                $(document).ready(function(){
                    $.ajax({
                        url: "php/generateClientToken.php",
                        success: function (ret) {
                            clientToken = ret;
                            braintree.setup(clientToken, 'dropin',{
                                container: "payment-form"
                            });
                        }
                    });
                });
    
});