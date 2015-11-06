$(document).ready(function() {
//	// FORM
	$('#form').attr('action', 'javascript:void(0);');
	
	$("#button").click(function(){
		page = 0;
		selectLoad = byCity;
		$("#resultList").empty();
		
		if($("#cityId").val() == ''){
			loadAllConcert('http://api.bandcloud.net/users/events');
		}else{
			loadConcertByCity($("#cityId").val());
		}
	});
	
	// Scroll effect
	$("#resultList").scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
	        	if($("#spinnerActivator").is_on_screen()){
	        		console.log($("#spinnerActivator").length);
	        		$("#spinnerActivator").remove();
	        		
	        		if(selectLoad == all){
	        			loadAllConcert('http://api.bandcloud.net/users/events');
	        		}else if(selectLoad == byCity){
	        			loadConcertByCity($("#cityId").val());
	        		}
	        	}
		    }, 19));
		}
	);
	
	$.fn.is_on_screen = function(){
	    var win = $(window);
	    var viewport = {
	        top : win.scrollTop(),
	        left : win.scrollLeft()
	    };
	    viewport.right = viewport.left + win.width();
	    viewport.bottom = viewport.top + win.height();
	 
	    var bounds = this.offset();
	    bounds.right = bounds.left + this.outerWidth();
	    bounds.bottom = bounds.top + this.outerHeight();
	 
	    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	};

	$("#resultList").empty();
	loadAllConcert('http://api.bandcloud.net/users/events');
});

var page = 0;

var all = 0;
var byCity = 1;
var selectLoad = all;

function loadAllConcert(url){
	$.ajax({ 'url' : url,
		  'method' : 'POST',
		  'data' : { 'results' : "20",
			 		 'page' : page
		 		   },
	  	  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
          addElements(json);
	  	},
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  	}
    });
}

function loadConcertByCity(city){
	$.ajax({ 'url' : 'http://api.bandcloud.net/users/events/city',
		  'method' : 'POST',
		  'data' : { 'results' : "10",
			 		 'page' : page,
			 		 'city' : city
		 		   },
	  	  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  addElements(json);
	  	},
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  	}
    });
}

function addElements(json){

	var minus = 0;
	page++;
	for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
		var element = '<div class="resultElement">'+
                        '<div class="whenElement">'+
                            '<div class="resultDate">' + value.date + '</div>'+
                            '<div class="resultTime">' + value.time + '</div>'+
                        '</div>'+
                        '<div class="whereElement">'+
                            '<div class="resultName">' + value.eventName + '</div>'+                                   '<div class="resultVenuename">'+
                                '<div class="city">' + value.city + '</div>'+
                                '<div calss="venueName">' + value.venueName + '</div>'+
                            '</div>'+
                        '</div>'+    
                        '<div class="venueImg">'+
                            '<a class="resultImg" href="mailto:' + value.venueEmail + '">'+
				            '<img src="' + value.urlPhoto + '" alt="venue_img" class="img_result">'+ 
                            '</a>'+
                        '</div>'+
                    '</div>';
		
		$("#resultList").append(element);
		if(json.events.length % 20 == 0 && i == json.events.length - 5){
			$(".containerResult").append('<span id="spinnerActivator"></span>');
			minus = 1;
		}
	}
	
    
    if(minus == 1){
        $("#resultList").append('<div class="spinner">' +
                                          '<div class="dot1"></div>'+
                                          '<div class="dot2"></div>'+
                                    '</div>');
    }
	
	$('.bold').empty();
	$('.bold').append($("#resultList").children().length - minus + ' results');
}


