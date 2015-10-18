$(document).ready(function() {
	$('.imgSearch').hover(function() {
		$('.thirdsRow').toggleClass('buttonHover');
	});
	
	$(".containerResult").scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
	        	if($("#spiner").is_on_screen()){
	        		$("#spiner").remove();
	        		loadAndAddConcert();
	        	}
		    }, 19));
		}
	);
	
	$(".imgSearch").click(function(){
		$(".slim").empty();
		$(".slim").append($("#cityId").val() + '<span class="bold"></span>');
		
		$(".containerResult").empty();
		loadAndAddConcert($("#cityId").val());
	});
	
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
	loadAndAddConcert();
});

var page = 0;

function loadAndAddConcert(city){
	$.ajax({ 'url' : 'http://api.bandcloud.net/users/events',
		  'method' : 'POST',
<<<<<<< HEAD
		  'data' : { 'results' : "10",
			 		 'page' : page
=======
		  'data' : { 'results' : "20",
			 		 'page' : page,
			 		 'city' : "Nitra"
>>>>>>> origin/master
		 		   },
	  	  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  	page++;
			  	console.log(json.events.length);
				for(var i = 0; i < json.events.length; i++){
					var value = json.events[i];
					var element = '<span class="resultElement">'+
									  '<span class="resultImage">'+
										  '<a href="mailto:email"><img src="' + value.urlPhoto + '" alt="venue_img" class="image"></a>'+
										  '<span class="imgHome"></span>'+
									  '</span>'+
									  '<span class="resultTextContainer">'+
<<<<<<< HEAD
								  		  '<span class="resultTextFirst">' + (value.eventName.length > 50 ? value.eventName.substr(0,50) + "..." : value.eventName) + '</span>'+
                                      '<span class="resultTextSecond">'+
                                            '<span class="city">' + value.city + '</span>'+
                                            '<span class="venueName">' + value.venueName + '</span>'+
                                      '</span>'+
=======
										  '<span class="resultTextFirst">' + value.venueName + '</span>'+
										  '<span class="resultTextSecond">' + value.city + '</span>'+
									  '</span>'+
									  '<span class="resultTextContainer resultBorder">'+
								  		  '<span class="resultTextFirst">' + shortenText(40, value.eventName) + '</span>'+
>>>>>>> origin/master
									  '</span>'+
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
	  	},
	  	'error': function(){
	  		console.log('Error.');
	  	}
    });
}

function shortenText(maxLength, text){
	console.log(text + " <-> " + text.substr(0,maxLength));
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


