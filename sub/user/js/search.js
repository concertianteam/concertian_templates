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
	
	$("#mostViewed").click(function(){
		page = 0;
		selectLoad = mostViewed;
		$(".containerResult").empty();
		
		loadAllConcert('http://api.bandcloud.net/users/events/mostviewed');
	});
//	
//	$(".imgSearch").bind('keyup', function(event){
//		if(event.keyCode == 13){ 
//			event.preventDefault();
//			//$("#buttonSrch").click();
//			page = 0;
//			selectLoad = byCity;
//			loadConcertByCity(this.value);
//		}
//	});
	
	
	// Scroll effect
	$(".containerResult").scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
	        	if($("#spiner").is_on_screen()){
	        		console.log($("#spiner").length);
	        		$("#spiner").remove();
	        		
	        		if(selectLoad == all){
	        			loadAllConcert('http://api.bandcloud.net/users/events');
	        		}else if(selectLoad == byCity){
	        			loadConcertByCity($("#cityId").val());
	        		}else if(selectLoad == recent){
	        			
	        		}else if(selectLoad == mostViewed){
	        			
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
<<<<<<< HEAD
			  	page++;
			  	console.log(json.events.length);
				for(var i = 0; i < json.events.length; i++){
					var value = json.events[i];
					var element = '<span class="resultElement">'+
									  '<a href="mailto:email"><span class="resultImage">'+
										  '<img src="' + value.urlPhoto + '" alt="venue_img" class="image">'+
									  '</span></a>'+
									  '<span class="resultTextContainer">'+
								  		  '<span class="resultTextFirst">' + shortenText(40, value.eventName) + '</span>'+
                                          '<span class="resultTextSecond">'+
                                                '<span class="city">' + value.city + '</span>'+
                                                '<span class="venueName">' + value.venueName + '</span>'+
                                          '</span>'+
                                      '</span>' +
									  '<span class="resultTextContainer_datetime resultBorder">'+
										  '<span class="resultTextFirst">' + value.date + '</span>'+
										  '<span class="resultTextSecond">' + value.time + '</span>'+
									  '</span>'+
									  '<span class="resultInfoButton">'+
									  '<span class="ingShare"></span>'+
								  '</span>';
					
					$(".containerResult").append(element);
					if(i == json.events.length - 5){
						$(".containerResult").append('<span id="spiner"></span>');
					}
				}
				
				$('.bold').empty();
				$('.bold').append($(".containerResult").children().length-1 + ' results');
=======
			  addElements(json);
>>>>>>> origin/master
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
	$(".slim").empty();
	$(".slim").append($("#cityId").val() + ' <span class="bold"></span>');
	
	var minus = 0;
	page++;
	for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
		var element = '<span class="resultElement">'+
						  '<span class="resultImage">'+
							  '<a href="mailto:email"><img src="' + value.urlPhoto + '" alt="venue_img" class="image"></a>'+
							  '<span class="imgHome"></span>'+
						  '</span>'+
						  '<span class="resultTextContainer">'+
					  		  '<span class="resultTextFirst">' + shortenText(40, value.eventName) + '</span>'+
                              '<span class="resultTextSecond">'+
                                    '<span class="city">' + value.city + '</span>'+
                                    '<span class="venueName">' + value.venueName + '</span>'+
                              '</span>'+
                          '</span>' +
						  '<span class="resultTextContainer_datetime resultBorder">'+
							  '<span class="resultTextFirst">' + value.date + '</span>'+
							  '<span class="resultTextSecond">' + value.time + '</span>'+
						  '</span>'+
						  '<span class="resultInfoButton">'+
						  '<span class="ingShare"></span>'+
					  '</span>';
		
		$(".containerResult").append(element);
		if(i == json.events.length - 5){
			$(".containerResult").append('<span id="spiner"></span>');
			minus = 1;
		}
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


