$(document).ready(function(){
    
    //Loading cookies
    if (Cookies.get('name') === undefined) {
        $("#log_inForm").addClass("paddingtop");
        $(".venue_name").append("Prihláste sa");
        $(".login_venue_img").hide();
        
    }
    else{
        var name = Cookies.get('name');
        var urlPhoto = Cookies.get('urlPhoto');
        var element = '<img class="venue_img" src="'+urlPhoto+'">';
        $("#log_inForm").removeClass("paddingtop");
        $(".venue_name").append(name);
        $(".login_venue_img").append(element);
        $("#hide").hide();
    }
	// LOGIN SCRIPT
	 $("#log_inForm").submit(function(event){
    		event.preventDefault();
		$("#loginResult").empty();

	var loginData = {
            'email' : $('#email').val(),
            'password'  : $('#password').val(),
    };

	if (loginData['email'] && loginData['password']) { // values are not empty
      $.ajax({
        type: "POST",
        url: "https://api.concertian.com/agents/auth",
        contentType: "application/x-www-form-urlencoded",
        data: loginData,
        success: function(json){
			  $('form#log_inForm').hide();
			  $(".loginBox").append('<div class="success">Úspešné prihlásanie"</div>'+
									'<div class="spinner">' +
                                          '<div class="dot1_login"></div>'+
                                          '<div class="dot2_login"></div>'+
                                    '</div>');
			var apiKey = json.apiKey;
			var name = json.name;
		  	var urlPhoto = json.urlPhoto;		
		  	var idAccount = json.idAccount;		
		  	var idVenue = json.idVenue;		
			  Cookies.set('apiKey', apiKey, { expires: 7 });
			  Cookies.set('name', name, { expires: 7 });
			  Cookies.set('urlPhoto', urlPhoto, { expires: 7 });
			  Cookies.set('idAccount', idAccount, { expires: 7 });
			  Cookies.set('idVenue', idVenue, { expires: 7 });
			  window.location = "app.html";
           
        },
		  error: function(json){
			  $("#loginResult").text(JSON.parse(json.responseText).message);
	  }
      }); // ajax
    } // if
    else {
      $('div#loginResult').text("enter username and password");
    } // else
  });
});