jQuery(document).ready(function() {
	
	var idVenue = Cookies.get('idVenue');
	var base_url = 'http://api.bandcloud.net/users/events/venue';
    var response = "";
	console.log(idVenue);
    var form_data = {
		idVenue: idVenue,
        results: 10,
        page: 0,
		
    };
	
    $.ajax({
        type: "POST", 
        url: base_url, 
        data: form_data,
        success: function(data){
        var events = data.events;
        for(var event in events)
                                   
            $("#program").append('<div class="concert_element">'+
                            '<div class="concert_name">'+events[event].eventName+'</div>'+
                            '<div class="concert_date">'+events[event].date+'</div>'+
							'<div class="concert_visibility">'+(events[event].visible == 1 ? "Visible" : "Hidden")+'</div>'+
                    '</div>');
      
        },
        dataType: "json"//set to JSON    
    });	
});
