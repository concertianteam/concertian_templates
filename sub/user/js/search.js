arrayCity = new Array();
arrayVenueName = new Array();
limitWidth = 620;

function init() {
	
	if(Cookies.get('language') == null){
		language = slovak;
	}else{
		switch(Cookies.get('language')){
			case "slovak":
				language = slovak;
				$("#language_menu").text('SK');
				break;
			case "english":
				language = english;
				$("#language_menu").text('EN');
				break;
			case "czech":
				language = czech;
				$("#language_menu").text('CZ');
				break;
		}
	}
	setLanguage();
	
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
	
	//Back button handler
	$("#backButton").click(function(){
		hiddenClubConcerts();
	});
    
	// Handler for search button click
	$(".imgSearch").click(function(){
		hiddenClubConcerts();
		
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
	// LANGUAGE OPERATOR
	
	    // LANGUAGE MENU HANDLER
    $("#language_menu").click(function(event){
        event.stopPropagation();
        $(".languagemenu").fadeIn(200);
    });
    $(document).click( function(){
    $('.languagemenu').fadeOut(200);
    });
    
    //SET COOKIE FOR LANGUAGE
    $("#en").on('click', function(){
		language = english;
		$("#language_menu").text('EN');
		setLanguage();
        Cookies.set('language', 'english', { expires: 100 });
    });
    $("#sk").on('click', function(){
		language = slovak;
		$("#language_menu").text('SK');
		setLanguage();
        Cookies.set('language', 'slovak', { expires: 100 });
    });
    $("#cz").on('click', function(){
		language = czech;
		$("#language_menu").text('CZ');
		setLanguage();
        Cookies.set('language', 'czech', { expires: 100 });
    });
	
	
	(function(d, src, c) { var t=d.scripts[d.scripts.length - 1],s=d.createElement('script');s.id='la_x2s6df8d';s.async=true;s.src=src;s.onload=s.onreadystatechange=function(){var rs=this.readyState;if(rs&&(rs!='complete')&&(rs!='loaded')){return;}c(this);};t.parentElement.insertBefore(s,t.nextSibling);})(document,
'//concertian.ladesk.com/scripts/track.js',
function(e){ LiveAgent.createButton('bfe3d30c', e); });
	
	// Handler for click on button Categories
	$("#categories").click(function(){
		hiddenClubConcerts();
		
		selectLoad = byCategories;
        $("#form").css('visibility', 'hidden');

		emptyContainerAddSpinner();
		removeAllMarkers();
		
		loadlandingCards();
	});
	
	// Handler for click on button City
	$("#city").click(function(){
		hiddenClubConcerts();
		
        $("#form").css('visibility', 'visible');
		$("#search_input").attr("placeholder", language["searchByCity"]);
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
		hiddenClubConcerts();
		
        $("#form").css('visibility', 'visible');
		$("#search_input").attr("placeholder", language["searchByClub"]);
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
					'url': 'https://api.concertian.com/agents/venues/name',
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

	/* ---- Facebook graph stories ----- */
		/* Facebook jquery sdk implementation */
	  $.ajaxSetup({ cache: true });
	  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
		FB.init({
		  appId: '1128811043811214',
		  version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
		});     
		$('#loginbutton,#feedbutton').removeAttr('disabled');
		FB.getLoginStatus(updateStatusCallback);
	  });
	//* --------- Twitter asynchronus calling -------- *//
	window.twttr = (function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0],
			t = window.twttr || {};
		  if (d.getElementById(id)) return t;
		  js = d.createElement(s);
		  js.id = id;
		  js.src = "https://platform.twitter.com/widgets.js";
		  fjs.parentNode.insertBefore(js, fjs);

		  t._e = [];
		  t.ready = function(f) {
			t._e.push(f);
		  };
  	return t;
	}
	(document, "script", "twitter-wjs"));
	//* -------- Slim scroll ------- *//
	$(function(){
      $('#results_list').slimscroll({
		  height: '91.5%',
      });
	  $('#event_name').slimscroll({
		  height: '91.5%',
      });
    });
	//* -------------- Hide Banner ---------- *//
	 $("#close").click(function(){
        $("#landing_banner").hide(800);
		$(".slimScrollDiv").css('height', '108%');
		$("#clubconcerts").css('top', '0');
		$("#clubconcerts").css('height', '100%');
     });
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
var clubclicked = false;
var markers = [];
var results = [];
var language;
var slovak = {
	categories:"PONUKA", 
	city:"MESTO", 
	club:"KLUBY",
	searchByCity:"V akom meste hľadáme?",
	searchByClub:"Aký klub hľadáme?",
	textHeader:"Zviditelnite Vaše koncerty jednoducho a efektívne s <strong>concertian for managers</strong> teraz <strong>na 15 dní zadarmo</strong>",
	tryit:"VYSKÚŠAŤ",
	googleBadge:"Stiahnite si appku<br><strong>do smartphonu"
}
var english = {
	categories:"CATEGORIES", 
	city:"CITY", 
	club:"CLUBS",
	searchByCity:"In which city we are looking?",
	searchByClub:"What club are we looking for?",
}
var czech = {
}

function hiddenClubConcerts(){
	if(clubclicked){
		clubclicked = false;
		$('#clubconcerts').removeClass('pullDown');
		$("#backButton").css('visibility', 'hidden');
		$('#clubconcerts').addClass('pullUp');
		setTimeout(function(){
			$('#clubconcerts').removeClass('pullUp');
		}, 500);
	}
}

function emptyContainerAddSpinner(elementDetails){
	if(clubclicked){
		$("#backButton").css('visibility', 'visible');
		$("#clubconcerts").empty();
		$("#clubconcerts").append(elementDetails+
								  '<div class="spinner">' +
									  '<div class="dot1"></div>'+
									  '<div class="dot2"></div>'+
								  '</div>');
	}else{
		$("#results_list").empty();
		$("#results_list").append('<div class="spinner">' +
									  '<div class="dot1"></div>'+
									  '<div class="dot2"></div>'+
								  '</div>');
	}
}

function removeAllMarkers(){
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

// Load all concert
function loadAllConcert(){
	$.ajax({ 'url' : 'https://api.concertian.com/users/events',
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
	$.ajax({ 'url' : 'https://api.concertian.com/users/cards',
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
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/city',
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
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/venue',
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
// SET TEXT BUILDER
function setLanguage(){
		$("#categories").text(language["categories"]);
		$("#city").text(language["city"]);
		$("#club").text(language["club"]);
		$("#search_input").attr('placeholder','V akom meste hľadáme?');
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
						'<span class="elementCore">'+
							'<span class="lenght">'+ (length + i) +'</span>'+
			'<input type="hidden" class="idVenue" val="' + value.venueId + '">'+		
							'<img class="elementCore_cover" src="'+ value.urlPhoto +'">'+
							'<span class="when_element">'+
								'<span class="date_value">'+arr[2]+' '+arr[1]+'<strong>'+' '+arr[0]+'</strong>'+'</span>'+
								'<span class="time_value">'+ value.time +'</span>'+
							'</span>'+
							'<span class="share_button">'+
								'<span class="share_icon">'+ (length + i) +'</span>'+
							'</span>'+
							'<span id="event_name">'+ shortenText( value.eventName, 40) +'</span>'+
							'<span id="hover"></span>'+
						'</span>'+
					'</span>';
        if(clubclicked){
			$("#clubconcerts").append(element);
		}else{
			$("#results_list").append(element);
		}
		if(json.events.length % 20 == 0 && i == json.events.length - 5){
			$("#results_list").append('<span id="spinnerActivator"></span>');
			minus = 2;
		}
	} 
    $(".share_button").on("click", function() {
		var value = results[$(this).find(".share_icon").text()];
				FB.ui({
				  method: 'feed',
				  picture: value.urlPhoto,
				  name: value.eventName,
				  caption: value.venueName,
				  description: value.date +" o "+value.time,
				}, function(response){});
	});
							   
	$(".elementCore").on( "click", function() {
        var value = results[$(this).find(".lenght").text()];
		var elementDetails = 
			'<span class="bar_detail">'+
				'<span class="detail_text">' + value.venueName + '<strong>' + ' ' + ($(window).width()<limitWidth? shortenText(value.city, 15) : value.city) + ' ' + value.address + '</strong></span>'+
				'<a href="mailto:'+ value.venueEmail +'">'+
					'<span class="send_message">'+
						'<span class="send_message_icon"></span>'+
					'</span>'+
				'</a>'+
			'</span>';
		
		clubclicked = true;
		emptyContainerAddSpinner(elementDetails);
		
		$('#clubconcerts').removeClass('pullUp');
		$('#clubconcerts').addClass('pullDown');
		
		selectedClubId = value.venueId;
		page = 0;
		loadConcertByClub();
	});
    
	/**
	 *	Search location and add markers
	 */
	var bounds = new google.maps.LatLngBounds();
	for(var i = 0; i < address.length; i++){
		$.ajax({ 'url' : 'https://maps.googleapis.com/maps/api/geocode/xml?address=' + address[i] + '&sensor=false?key= AIzaSyABFQjmkcjHWLYzAzibPX5Dp-LKYbC5-Jc',
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
							  title: title,
							  icon: 'images/marker.svg'
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
		$( ".resultElement" ).on("click", function() {
		 	marker.setIcon('images/marker.red.svg');
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