jQuery(document).ready(function() {
	if  (Cookies.get('successfull') == undefined) {
		$(".response_text").append( "Zadaný email sa už používa. Skúste to ešte raz.");
	}
	else{
		$(".response_text").append( "<p>Registrácia prebehla úspešne<br>využívajte aplikáciu na 15 dní zadarmo<p>");
        $(".response_button").text('LOG IN');
	}

    $(".response_button").click(function() {
        if (Cookies.get('successfull') == undefined){
            location.href='../registrate.html';
        }
        else{
            location.href='../agent/index.html';
        }
    });
});
