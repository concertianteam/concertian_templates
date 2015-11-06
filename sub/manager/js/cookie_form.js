jQuery(document).ready(function() {
	if  (Cookies.get('name') == undefined) {
		console.log('No cookie');
		$( "#response1" ).append( "<p>Emailovú adresu, ktroú ste zadali nemáme v databáze. Prosím zaregistrujte sa.</p>");
	}
	else{
	  var email = Cookies.get('email');
      var name = Cookies.get('name');
      var state = Cookies.get('state');
      var city = Cookies.get('city');
      var addressFirst = Cookies.get('addressFirst');
	console.log(email, name, state, city, addressFirst);
	$('#email').val(email);
	$('#venueName').val(name);
	$('#state').val(state);
	$('#city').val(city);
	$('#addressFirst').val(addressFirst);  
	$( "#response2" ).append( "<p>Doplnte len heslo a sme hotoví.</p>");
	}
			
});