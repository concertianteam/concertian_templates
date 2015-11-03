function init() {
//	// FORM after enter press don't reload page
	$('#form').attr('action', 'javascript:void(0);');
	
	// Image Search button hover effect
	$('.imgSearch').hover(function() {
		$('.thirdsRow').toggleClass('buttonHover');
	});
	
	// Handler for search button click
	$(".imgSearch").click(function(){
		page = 0;
		selectLoad = byCity;
		$(".containerResult").empty();
		
		for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(null);
		}
		markers = [];
		
		if($("#cityId").val() == ''){
			loadAllConcert('http://api.bandcloud.net/users/events');
		}else{
			loadConcertByCity($("#cityId").val());
		}
	});
	
	// Handler for click on button Recent
	$("#recent").click(function(){
		page = 0;
		selectLoad = recent;
		$(".containerResult").empty();
		$("#cityId").val("");

		for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(null);
		}
		markers = [];
		
		loadAllConcert('http://api.bandcloud.net/users/events');
	});
	
	// Handler for click on button MostViewed
	$("#mostViewed").click(function(){
		page = 0;
		selectLoad = mostViewed;
		$(".containerResult").empty();

		for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(null);
		}
		markers = [];
	    
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
	
	// Check if scroll is on end
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
}

var page = 0;

var all = 0;
var byCity = 1;
var recent = 2;
var mostViewed = 3;
var selectLoad = all;
var markers = [];

// Load all concert by URL
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

// Load concert by City
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

// Add loaded element to container
function addElements(json){
	$(".slim").empty();
	$(".slim").append($("#cityId").val() + ' <span class="bold"></span>');
	$(".spinner").remove();
	
	var minus = 0;
	page++;
	var address = [];
	for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
		
		address[i] = encodeURIComponent(value.address + " " + value.city);
		
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
			minus = 2;
		}
	}
	
	/**
	 *	Search location and add markers
	 */
	var bounds = new google.maps.LatLngBounds();
	for(var i = 0; i < address.length; i++){
		$.ajax({ 'url' : 'http://maps.googleapis.com/maps/api/geocode/xml?address=' + address[i] + '&sensor=false?key= AIzaSyABFQjmkcjHWLYzAzibPX5Dp-LKYbC5-Jc',
			  'method' : 'GET',
		  	  contentType : "application/x-www-form-urlencoded",
			  'success' : function (results, status){
				  if (status == 'success') {
					  var doc = $.parseXML((new XMLSerializer()).serializeToString(results));
					  
					  var location = $($(doc).find('geometry')).find('location');
					  var lat = parseFloat($(location).find('lat').text());
					  var lng = parseFloat($(location).find('lng').text());
					  var title = $(doc).find('formatted_address').text();
					
					  if(!isNaN(lat)){
						  var myLatLng = new google.maps.LatLng(lat, lng);
						  var marker = new google.maps.Marker({
							  position: myLatLng,
							  map: map,
							  title: title
					      });
						  
						  markers.push(marker);
						  bounds.extend(myLatLng);
						  map.fitBounds(bounds);
					  }
				  }
  			   },
  			   'error': function(error){
  				   console.log('Error. ' + error);
  			   }
	    });
	}
	
    if(minus == 2){
        $(".containerResult").append('<div class="spinner">' +
                                          '<div class="dot1"></div>'+
                                          '<div class="dot2"></div>'+
                                    '</div>');
    }
	
	$('.bold').empty();
	$('.bold').append($(".containerResult").children().length - minus + ' results');
}

// Edit text length
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


