jQuery(document).ready(function() {
		$('#logOff').click(function (){
	
	var apiKey = Cookies.get('apiKey');
	var base_url = 'http://api.bandcloud.net/agents/auth';
	
	$.ajax({
        type: "DELETE", 
        url: base_url, 
        data: apiKey,
        success: function(data){ 
			if (data.error) { // script returned error
			window.location = '../index.html';
            $('div#loginResult').text("data.error: " + data.error);
          } // if
          else { // login was successful
			window.location = '../index.html';
            $('div#loginResult').append('<div class="loged_out">Boli ste úspešne dohlásený</div>');
          } //else
        } // success
	});
	});
});