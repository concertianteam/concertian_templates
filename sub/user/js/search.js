$(document).ready(function() {
//	// FORM
	$('#form').attr('action', 'javascript:void(0);');
	
	// Image Search button
	$('.imgSearch').hover(function() {
		$('.thirdsRow').toggleClass('buttonHover');
	});
	
	$(".imgSearch").click(function(){
		page = 0;
		selectLoad = byCity;
		$(".containerResult").empty();
		
		if($("#cityId").val() == ''){
			loadAllConcert('http://api.bandcloud.net/users/events');
		}else{
			loadConcertByCity($("#cityId").val());
		}
	});
	
	$("#recent").click(function(){
		page = 0;
		selectLoad = recent;
		$(".containerResult").empty();
		$("#cityId").val("");
		
		
		loadAllConcert('http://api.bandcloud.net/users/events');
	});
	
	$("#mostViewed").click(function(){
		page = 0;
		selectLoad = mostViewed;
		$(".containerResult").empty();
		
		loadAllConcert('http://api.bandcloud.net/users/events/mostviewed');
	});
	
	// Scroll effect
	$(".containerResult").scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
	        	if($("#spinnerActivator").is_on_screen()){
	        		$("#spinnerActivator").remove();
	        		
	        		if(selectLoad == all){
	        			loadAllConcert('http://api.bandcloud.net/users/events');
	        		}else if(selectLoad == byCity){
	        			loadConcertByCity($("#cityId").val());
	        		}else if(selectLoad == recent){
	        			loadAllConcert('http://api.bandcloud.net/users/events');
	        		}else if(selectLoad == mostViewed){
	        			loadAllConcert('http://api.bandcloud.net/users/events/mostviewed');
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
	    
	    if(bounds != null){
	    	bounds.right = bounds.left + this.outerWidth();
	    	bounds.bottom = bounds.top + this.outerHeight();
	 
	    	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	    }else{
	    	return false;
	    }
	};

	$(".containerResult").empty();
	loadAllConcert('http://api.bandcloud.net/users/events');
});

var page = 0;

var all = 0;
var byCity = 1;
var recent = 2;
var mostViewed = 3;
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
	  		$(".spinner").remove();
	  	}
    });
}

function loadConcertByCity(city){
	$.ajax({ 'url' : 'http://api.bandcloud.net/users/events/city',
		  'method' : 'POST',
		  'data' : { 'results' : "20",
			 		 'page' : page,
			 		 'city' : city
		 		   },
	  	  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  addElements(json);
	  	},
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  		$(".spinner").remove();
	  	}
    });
}

function addElements(json){
	$(".slim").empty();
	$(".slim").append($("#cityId").val() + ' <span class="bold"></span>');
	$(".spinner").remove();
    
	var minus = 0;
	page++;
	for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
		
		var element = '<span class="resultElement">'+
						  '<a class="resultImage" href="mailto:' + value.venueEmail + '">'+
							  '<img src="' + value.urlPhoto + '" alt="venue_img" class="image">'+
						  '</a>'+
						  '<span class="resultTextContainer">'+
					  		  '<span class="resultTextFirst">' + shortenText(40, value.eventName) + '</span>'+
                              '<span class="resultTextSecond">'+
                                    '<span class="city">' + value.city + '</span>'+
                                    '<span class="venueName">' + value.venueName + '</span>'+
                              '</span>'+
                          '</span>' +
						  '<span class="resultTextContainer_datetime resultBorder">'+
							  '<span id="date" class="resultTextFirst">' + value.date + '</span>'+
							  '<span id="time" class="resultTextSecond">' + value.time + '</span>'+
						  '</span>'+
						  '<span class="resultInfoButton">'+
						  '<span class="imgShare"></span>'+
					  '</span>';
		
		$(".containerResult").append(element);
		if(json.events.length % 20 == 0 && i == json.events.length - 5){
			$(".containerResult").append('<span id="spinnerActivator"></span>');
			minus = 1;
		}
	}
    
    if(minus == 1){
        $(".containerResult").append('<div class="spinner">' +
                                          '<div class="dot1"></div>'+
                                          '<div class="dot2"></div>'+
                                    '</div>');
    }
	
	$('.bold').empty();
	$('.bold').append($(".containerResult").children().length - minus + ' results');
}

function shortenText(maxLength, text){
	if(text.length > maxLength){
		var position
		if((position = text.substr(0,maxLength).lastIndexOf(" ")) != -1 ){
			return text.substr(0,position) + "...";
		}else{
			return value.eventName.substr(0,maxLength) + "...";
		}
	}else{
		return text;
	}
}


