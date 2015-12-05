arrayCity = new Array();
arrayVenueName = new Array();
limitWidth = 620;

function init() {
    var rtime = 0;
    var timeout = false;
    var delta = 200;
    setNormal = false;
    disabled = false;
$(window).resize(function() {
    if (timeout === false){
        rtime = new Date();
        timeout = true;
    }else if( (new Date() - rtime) > delta && !disabled && $(window).width() < limitWidth) {
        setNormal = false;
        timeout = false;
        disabled = true;
        console.log ($( window ).width());
        repaindTextSecond();
    }else if ( $(window).width() > limitWidth){
        disabled = false;
        setNormal = true;
        restore();
    }
});
//	// FORM after enter press don't reload page
	$('#form').attr('action', 'javascript:void(0);');
    
	// Handler for search button click
	$(".imgSearch").click(function(){
        if(selectLoad != byCategories){
            page = 0;
            //selectLoad = byCity;
			emptyContainerAddSpinner();
            removeAllMarkers();

            if(!$("#search_input").val()){
                loadAllConcert();
            }else{
                if(selectLoad == byCity){
                    loadConcertByCity();
                }else if(selectLoad == byClub){
                    loadConcertByClub();
                }
            }
        }
	});
	
	// Handler for click on button Categories
	$("#categories").click(function(){
		selectLoad = byCategories;
        $("#form").css('visibility', 'hidden');

		emptyContainerAddSpinner();
		removeAllMarkers();
		
		loadlandingCards();
	});
	
	// Handler for click on button City
	$("#city").click(function(){
        $("#form").css('visibility', 'visible');
		page = 0;
		
		if(selectLoad == byClub){
			$("#search_input").val("");
		}
		selectLoad = byCity;
		
		emptyContainerAddSpinner();
		removeAllMarkers();
	    
        if(!$("#search_input").val()){
            loadAllConcert();
        }else{
            loadConcertByCity();
        }
	});
    
	// Handler for click on button Club
	$("#club").click(function(){
        $("#form").css('visibility', 'visible');
		page = 0;
		selectLoad = byClub;
        $("#search_input").val("");
		
        emptyContainerAddSpinner();
		removeAllMarkers();
	    
        loadAllConcert();
	});

	// AUTOCOMPLETE
	function getFields(results) {
    	return results;
	}
	
    var autocomplete = $("#search_input").autocomplete({
        minLength: 2,
        source: function (request, response) {
			if(selectLoad == byClub){
				$.ajax({
					'url': 'http://api.bandcloud.net/agents/venues/name',
					'method': 'POST',
					'data': {'startsWith': request.term},
					'success': function (data) {
						response($.map(data, function(d) {
							return {
								fields: getFields(d)
							};
						}));
					},
					'error': function () {
						alert('Tento podnik neevidujeme. Buďte súčasťou concertian a napíšte nám o pridanie clubu v chate. Ďakujeme.');
					}
				});
			}
        },
		
      select: function fillValues( event, ui ) {
		selectedClubId = ui.item.fields.idVenue;
        $("#search_input").val(ui.item.fields.name);
        $("#clubId").val(selectedClubId);
		  	page=0;
		  	emptyContainerAddSpinner();
			removeAllMarkers();
            loadConcertByClub();
        },
        appendTo: $('#menu-container')
    }).data("uiAutocomplete")._renderItem = function (ul, item) {
            return $("<li>").append('<a>' + item.fields.name + '</a>')
                .appendTo(ul);
    };
		
  	// Scroll effect
	$("#results_list").scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
	        	if($("#spinnerActivator").is_on_screen()){
	        		$("#spinnerActivator").remove();
	        		
	        		if(selectLoad == all){
	        			loadAllConcert();
	        		}else if(selectLoad == byCity){
	        			loadConcertByCity();
	        		}else if(selectLoad == byClub){
	        			loadConcertByClub();
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

	$("#results_list").empty();
    $("#form").css('visibility', 'hidden');
	loadlandingCards();
}

function repaindTextSecond (){
    for(var i = 0; i < $("#results_list").children().length; i++){
       if(!disabled){
           return false;
       }
    var textCity = $("#results_list").children().eq(i).children(".resultTextContainer").children(".resultTextSecond").children(".city").text();
     var textVenueName= $("#results_list").children().eq(i).children(".resultTextContainer").children(".resultTextSecond").children(".venueName").text();
        
        arrayCity.push(textCity);
        arrayVenueName.push(textVenueName);
        $("#results_list").children().eq(i).children(".resultTextContainer").children(".resultTextSecond").children(".city").text(shortenTextWithoutSpace(textCity, 20));
        
$("#results_list").children().eq(i).children(".resultTextContainer").children(".resultTextSecond").children(".venueName").text(shortenTextWithoutSpace(textVenueName, 20));
    }
}

function restore(){
    for(var i = 0; i < arrayCity.length; i++){
        if(!setNormal){
            return false;
        }
 $("#results_list").children().eq(i).children(".resultTextContainer").children(".resultTextSecond").children(".city").text(arrayCity[i]);
    }
    
    for(var i = 0; i < arrayVenueName.length; i++){
        if(!setNormal){
            return false;
        }
 $("#results_list").children().eq(i).children(".resultTextContainer").children(".resultTextSecond").children(".venueName").text(arrayVenueName[i]);
    }
}

var page = 0;

var all = 0;
var byCity = 1;
var byCategories = 2;
var byClub = 3;
var selectLoad = byCategories;
var selectedClubId;
var markers = [];
var results = [];

function emptyContainerAddSpinner(){
	$("#results_list").empty();
	$("#results_list").append('<div class="spinner">' +
									  '<div class="dot1"></div>'+
									  '<div class="dot2"></div>'+
								'</div>');
}

function removeAllMarkers(){
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

// Load all concert
function loadAllConcert(){
	$.ajax({ 'url' : 'http://api.bandcloud.net/users/events',
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

// Load Landing Cards
function loadlandingCards(){
	$.ajax({ 'url' : 'http://api.bandcloud.net/users/cards',
		  'method' : 'GET',
	  	  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
          addCategories(json);
	  	},
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  	}
    });
}

// Load concert by City
function loadConcertByCity(){
	$.ajax({ 'url' : 'http://api.bandcloud.net/users/events/city',
		  'method' : 'POST',
		  'data' : { 'results' : "20",
			 		 'page' : page,
			 		 'city' : $("#search_input").val()
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

// Load concert by Club
function loadConcertByClub(){
	$.ajax({ 'url' : 'http://api.bandcloud.net/users/events/venue',
		  'method' : 'POST',
		  'data' : { 'results' : "20",
					 'page' : page,
					 'idVenue' : selectedClubId
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
	
function addCategories(json){
    $(".slim").empty();
	$(".slim").append($("#search_input").val() + ' <span class="bold"></span>');
	$(".spinner").remove();
    
    for(var i = 0; i < json.cards.length; i++){
        var value = json.cards[i];
      
        var element = '<span class="category_card">'+
                            '<span class="categoryImg">'+
                                '<img class="category_img" src="' + value.urlImage + '">'+
                                        '<span class="categoryHeader">'+
                                '<a class="city_text">' + value.name + '</a>'+
                                        '</span><span class="categoryCounter">'+
                                '<a class="counter_number">' + value.count + '</a>'+
                                '<a class="counter_text">koncertov</a>'+
                                        '</span>'+
                            '</span>'+
                        '</span>';
        
        $("#results_list").append(element);
    }
    
//	category_card
	
	$(".categoryImg").on( "click", function() {
		$("#search_input").val($(this).find(".city_text").text());
		$("#city").click();
	});
}

// Add loaded element to container
function addElements(json){
	$(".slim").empty();
	$(".slim").append($("#search_input").val() + ' <span class="bold"></span>');
	$(".spinner").remove();
	
	var minus = 0;
	page++;
	var address = [];
    var length = results.length;
    
	for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
        var arr = value.stringDate.split('-');
        
		address[i] = encodeURIComponent(value.address + " " + value.city);
        results[length + i] = value;
		
		var element = '<span class="resultElement">'+
						  '<a class="resultImage" href="mailto:' + value.venueEmail + '">'+
							  '<img src="' + value.urlPhoto + '" alt="venue_img" class="image">'+
						  '</a>'+
						  '<span class="resultTextContainer">'+
					  		  '<span class="resultTextFirst">' + shortenText( value.eventName, 40) + '</span>'+
                              '<span class="resultTextSecond">'+
                                    '<span class="city">' + ($(window).width()<limitWidth? shortenText(value.city, 15) : value.city) + '</span>'+
                                    '<span class="venueName">' + value.venueName + '</span>'+
                              '</span>'+
                          '</span>' +
						  '<span class="resultTextContainer_datetime resultBorder">'+
							  '<span id="date" class="date_formated">'+
                                '<span>'+arr[2]+' '+arr[1]+
                                    ' <strong>'+arr[0]+'</strong>'+
                                '</span>'+
                            '</span>'+
                          '<span id="time" class="resultTextSecond">' + value.time + '</span>'+
						  '</span>'+
                          '<span class="resultInfoButton">'+						                                   '<span class="imgInfo" style="font-size: 0px;">' + (length + i) + '</span>'+ 
                          '</span>'+
						  '<span class="resultShareButton">'+
                            '<span class="imgShare"></span>'+ 
                          '</span>'+
					  '</span>';
        
		$("#results_list").append(element);
		if(json.events.length % 20 == 0 && i == json.events.length - 5){
			$("#results_list").append('<span id="spinnerActivator"></span>');
			minus = 2;
		}
	} 
    
	$(".resultInfoButton").on("click", function() {
        $("#results_list_sm").empty();
        $(".containerForm").addClass("overlay");
        $("#landing_banner").addClass("overlay");
        $("#results_list").addClass("overlay");
        
        var value = results[$(this).find(".imgInfo").text()];
        var element = '<span class="top">'+
                            '<span class="header_img"><img class="img" src="' + value.urlPhoto + '"></span>'+
                                '<span class="top_text">'+
                                    '<span class="header_name">' + value.venueName + '</span>'+
                                    '<span class="header_city">'+value.city+'</span>'+
                                    '</span>'+
                                '<span id="close_details"><span class="detail_close"></span></span>'+
                                '</span>'+
                                '<span class="body">'+
                                '<span class="details_list">'+
                                    '<span class="eventDate">'+value.stringDate+'</span>'+
                                    '<span class="eventTime">' + value.time + '</span>'+
                                    '<span class="eventName">'+value.eventName+'</span>'+
                                '</span>'+
                                '<span class="detail_cta_buttons"><span><a  class="imgMessage" href="mailto:' + value.venueEmail + '"></a></span><span><a class="imgSocial"></a></span><span><a class="imgAdress"></a></span>'+    
                                '</span>'+
                            '</span>';
    $("#results_list_sm").append(element);
    $("#results_list_sm").fadeIn(200);
        
    $("#close_details").on("click", function() {
        $("#results_list_sm").hide();
        $(".containerForm").removeClass("overlay");
        $("#landing_banner").removeClass("overlay");
        $("#results_list").removeClass("overlay");
    });
	});
    
    
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
        $("#results_list").append('<div class="spinner">' +
                                          '<div class="dot1"></div>'+
                                          '<div class="dot2"></div>'+
                                    '</div>');
    }
	
	$('.bold').empty();
	$('.bold').append($("#results_list").children().length - minus + ' results');
}

// Edit text length
function shortenText(text, maxLength){
	if(text.length > maxLength){
		var position;
		if((position = text.substr(0,maxLength - 3).lastIndexOf(" ")) != -1 ){
			return text.substr(0,position) + "...";
		}else{
			return text.substr(0,maxLength - 3) + "...";
		}
	}else{
		return text;
	}
}

// Edit text length
function shortenTextWithoutSpace(text, maxLength){
	if(text.length > maxLength){
        return text.substr(0,maxLength - 3) + "...";
	}else{
		return text;
	}
}