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
var chartData = new Array();

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
	$(".spinner").remove();
	
	var minus = 0;
	page++;
	for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
		
		chartData.push(new Array(value.date, value.time, value.urlPhoto));
		
		var element = '<div class="resultElement">'+
                        '<div class="whenElement">'+
                            '<div class="resultDate">' + value.date + '</div>'+
                            '<div class="resultTime">' + value.time + '</div>'+
                        '</div>'+
                        '<div class="whereElement">'+
                            '<div class="resultName">' + value.eventName + '</div>'+                                   
								'<div class="resultVenuename">'+
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
			$("#resultList").append('<span id="spinnerActivator"></span>');
			minus = 1;
		}
	}
	
	var min = null;
	var max = null;
	for (var i = 0; i < chartData.length; i++){
		if(min == null){
			min = chartData[i][1];
			max = chartData[i][1];
		}else if(chartData[i][1] > max){
			max = chartData[i][1];
		}else if(chartData[i][1] < min){
		}
	}
	
	var minSplit = min.split(":");
	var minHour = minSplit[0];
	var minMinute = minSplit[1];
	var maxSplit = max.split(":");
	var maxHour = maxSplit[0];
	var maxMinute = maxSplit[1];
	
	min = getMinutes(min);
	max = getMinutes(max);
	var different = (max - min) / $("#graph").height();
	var height = $("#graph").height();
	var distanceLeft = 10;
	
	for (var i = 0; i < chartData.length; i++){
		console.log(different + " - " + (max - getMinutes(chartData[i][1])) + " - " + getMinutes(chartData[i][1]) + " - " + height);
		
		if(i > 0 && ((max - getMinutes(chartData[i][1])) / different) == ((max - getMinutes(chartData[i-1][1])) / different)){
			distanceLeft = distanceLeft + 10;
		}else{
			distanceLeft = distanceLeft + 55;
		}
		
		var element = '<div class="venueImg" style="left: ' + distanceLeft + 'px; top: ' + (max - getMinutes(chartData[i][1])) / different + 'px;">'+
							'<span class="resultImg" >'+
								'<img src="' + chartData[i][2] + '" alt="venue_img" class="img_result">'+ 
							'</span>'+
					  '</div>';
		
		$("#graph").append(element);
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

function getMinutes(time){
	var timeSplit = time.split(":");
	var hour = timeSplit[0];
	var minute = timeSplit[1];
	
	return (hour * 60) + minute;
}
