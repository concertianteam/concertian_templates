$(document).ready(function() {
	//COOKIE LOADER
	if (Cookies.get('apiKey') === undefined) {
			window.location = 'index.html';
    	}
		else{
		  var apiKey = Cookies.get('apiKey');
		  var name = Cookies.get('name');
		  var urlPhoto = Cookies.get('urlPhoto');
		  var idAccount = Cookies.get('idAccount');
		  var idVenue = Cookies.get('idVenue');
		$('#idVenue').val(idVenue);
		$('#apiKey').val(apiKey);
		$('#venue_logo').append('<img class="logo" src="' + urlPhoto + '">');
		$('#created_concerts').append('<span>Vaše koncerty: <b>' + name + '</b></span>');
		}
  // Slimscroll initialization
	$(function(){
      $('#resultList').slimscroll({
		  height: '93.5%',
      });
		$('#create_event').slimscroll({
			height: '87%',
      	});
			$('#program').slimscroll({
				height: '77%',
      		});
	});		
	
 // EVENTS SEARCH	
	$('form').attr('action', 'javascript:void(0);');
	
	$("#button").click(function(){
		page = 0;
		selectLoad = byCity;
		$("#resultList").empty();
		$("#concerts").empty();
		$("#concertsDate").empty();
		chartData = new Array();
		
		if($("#cityId").val() === ''){
			loadAllConcert('https://api.concertian.com/users/events');
		}else{
			loadConcertByCity($("#cityId").val());
		}
	});
	
	$("#resultList").scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
	        	if($("#spinnerActivator").is_on_screen()){
	        		$("#spinnerActivator").remove();
	        		
	        		if(selectLoad == byAll){
	        			loadAllConcert('https://api.concertian.com/users/events');
	        		}else if(selectLoad == byCity){
	        			loadConcertByCity($("#cityId").val());
	        		}else if(selectLoad == byClub){
	        			loadConcertForClub(selectClub);
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
	$("#concerts").empty();
	$("#concertsDate").empty();
	loadAllConcert('https://api.concertian.com/users/events');
	
	// CREATE CONCERT FORM
	
	  $('#create_event').submit(function(event) {
		  event.preventDefault();
		var apiKey = Cookies.get('apiKey');
      	var idVenue = Cookies.get('idVenue');

        var formData = {
            'idVenue' : idVenue,
            'name'    : $('input[name=eventName]').val(),
            'date'    : $('input[name=eventDate]').val(),
            'time'    : $('input[name=eventTime]').val(),
            'visible' : $('input[name=visibility]').val(),
            'status'  : $('input[name=status]').val(),
        };

			$.ajax({
				type        : 'POST',
				//crossDomain	: true,
				//xhrFields	: {withCredentials:false},
                beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
					request.withCredentials = true;
                },
				url         : 'https://api.concertian.com/agents/events',
				data        : formData,
				dataType    : 'json',
                success     : function(json){
                    var element_success = '<span class="response_sign">'+
                                    '<span class="response_img_success"></span>'+
                                          '</span>'+
                                    '<span class="response_text">Podujatie vytvorené</span>'+
                                    '<a id="form_button">OK</a>';
                    $("#outer_form").empty();
                    $("#outer_form").append(element_success);
                },
                error       : function(json){
                     var element_error = '<span class="response_sign">'+
                                    '<span class="response_img_error"></span>'+
                                          '</span>'+
                                    '<span class="response_text">Podujatie nevytvorené</span>'+
                                    '<a id="form_button">RETRY</a>';
                    $("#outer_form").empty();
                    $("#outer_form").append(element_error);
                },
                });
		  $(document).on('click','#form_button',function(e){
                var form =  '<div class="create_concert">Založte koncert:</div>'+
                            '<form id="create_event" name="form_event">'+
                            '<input type="hidden" name="apiKey" id="apiKey">'+
                            '<input type="hidden" name="idVenue" id="idVenue">'+
                            '<span class="input">Názov</span>'+
                            '<input type="text" class="eventName" name="eventName" placeholder="Názov koncertu" required>'+
                                '<span class="input">Dátum</span>'+
                            '<input id="datepicker" type="text" name="eventDate" name="Date" placeholder="dátum YYYY-MM-dd" required>'+
                                '<span class="input">Čas</span>'+
                            '<input id="timepicker" data-time-format="H:i:s" type="text" name="eventTime" placeholder="čas HH:mm:ss" required>'+
                                '<span class="input">Stav</span>'+
                            '<input id="visibility" name="visibility" type="hidden" value="1" required>'+
                            '<input type="hidden" name="status" value="1">'+
                            '<button type="submit" id="submit_button" name="submit">Vytvoriť koncert</button>'+
                            '</form>';
                $("#outer_form").empty();
                $("#outer_form").append(form);
     	});
      });
	
	// STYLE SWITCHER
	$('button#night').click(function (){
   		$('link[href="css/main.css"]').attr('href','css/main.night.css');
	});
	$('button#normal').click(function (){
   		$('link[href="css/main.night.css"]').attr('href','css/main.css');
	});
	
	// Date & Time picker initialization
	$(function() {
      $("#datepicker").datepicker();
      $("#timepicker").timepicker();
  });
	
	//LOGOUT
	$('#logOff').click(function(){
			console.log("1");
		var apiKey = Cookies.get('apiKey');
		var base_url = 'https://api.concertian.com/agents/auth';

	$.ajax({
		beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
					request.withCredentials = true;
                },
        type: "DELETE", 
        url: base_url,
        success: function(json){
			window.location = 'index.html';
            $('#loginResult').append('<div class="loged_out">Boli ste úspešne dohlásený</div>');
			},
		});
	});
	
	// searchPanel - back_button
	$(".back_button").on('click', function(){
		$("#resultList").empty();
		$("#concerts").empty();
		$("#concertsDate").empty();
		page = 0;
		selectLoad = byAll;
		loadAllConcert('https://api.concertian.com/users/events');
	});
	
	//* Mouse position tracker *//
	$(document).mousemove(function(e){
           mouseX = e.pageX;
           mouseY = e.pageY;
           //To Get the relative position
           if( this.offsetLeft !=undefined)
             mouseX = e.pageX - this.offsetLeft;
           if( this.offsetTop != undefined)
             mouseY = e.pageY - this.offsetTop;

           if(mouseX < 0)
                mouseX =0;
           if(mouseY < 0)
               mouseY = 0;

           windowWidth  = $(window).width()+$(window).scrollLeft();
           windowHeight = $(window).height()+$(window).scrollTop();
   });
	//* Mousewheel horizontal scrolling *//
//	$("html, body, #graph, *").mousewheel(function(event, delta) {
//		this.scrollLeft -= (delta * 80);
//		this.scrollRight -= (delta * 80);
//		event.preventDefault();
//	});
});	

var page = 0;
var byAll = 0;
var byCity = 1;
var byClub = 2;
var selectClub;
var selectLoad = byAll;
var chartData = new Array();
var results = [];
var mouseX,mouseY,windowWidth,windowHeight;
var popupLeft,popupTop;

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
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/city',
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
	  	}
    });
}

// Load concerts for Club (on club click)
function loadConcertForClub(clickedClubId){
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/venue',
		  'method' : 'POST',
		  'data' : { 'results' : "20",
					 'page' : page,
					 'idVenue' : clickedClubId
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
	$(".spinner").remove();
	
	var minus = 0;
	var bufferedArray = new Array();
	var length = page * 20;
	for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
        var arr = value.stringDate.split('-');
	
        results[length + i] = value;
        
		var element = '<div class="resultElement">'+
                        '<div class="wrapper">'+
						    '<div class="wrapper_text">' + (length + i) + '</div>'+
                            '<input type="hidden" value="' + value.venueId  + '">'+
                            '<div class="whenElement">'+
                                '<div class="resultDate">' + arr[2] + ' ' + arr[1] + "</span><br>" + arr[0] + '</div>'+
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
                      '</div>'+
                    '</div>';
		
		$("#resultList").append(element);
		if(json.events.length % 20 === 0 && i == json.events.length - 5)		{
			$("#resultList").append('<span id="spinnerActivator"></span>');
			minus = 1;
		}
		
		if(chartData.length > 0 && bufferedArray.length === 0 && value.stringDate == chartData[chartData.length - 1][0][0]){
			bufferedArray = chartData[chartData.length - 1];
			chartData = jQuery.grep(chartData, function( a ) {
							  return a !== bufferedArray;
						});
		}
		
		bufferedArray.push(new Array(value.stringDate, value.time, value.urlPhoto, value.eventName));
		
		if((i + 1 < json.events.length && value.stringDate != json.events[i+1].stringDate) || i + 1 == json.events.length){
			chartData.push(bufferedArray);
			bufferedArray = new Array();
		}
	}
	
	if(page > 0){
		$(".wrapper").off();
	}
	
    $(".wrapper").on( "click", function() {
        $("#resultList").empty();
        $("#concerts").empty();
		$("#concertsDate").empty();
		$("#custom_program_menu").empty();
		chartData = new Array();
		page = 0;
		selectLoad = byClub;
		selectClub = results[$(this).find(".wrapper_text").text()].venueId;
		loadConcertForClub(selectClub);
	});
	
	$("#concerts").empty();
	$("#concertsDate").empty();
	$("#custom_program_menu").empty();
	
	for(var i = 0; i < chartData.length; i++){
		var arrayForDay = chartData[i];
		var element = '<td>';
		for(var j = 0; j < arrayForDay.length; j++){
			element = element + '<span class="venuePointChart">' + i + '</span>';
		}
	}
	//* Timeline - vertical align based on time *//
		$("#concerts").empty();
	$("#concertsDate").empty();
	$("#lineContainer").empty();
	
	var height = $("#concerts").innerHeight() - 75;
//	For 24 hour
//	var constant = height / 1440;
//	For 10 hours
	var constant = height / 600;
	var counter = 0;
	/*
	 *  <= 5  - yelow
	 *  <= 12 - blue
	 *  > 12 - red
	 */
	var color = {'yelow' : '#ffbb33',
        		  'blue'  : '#5F7395',
        		  'red'  : '#FF4747'};
	
	for(var i = 0; i < chartData.length; i++){
		var arrayForDay = chartData[i];
		var element = '<td>';
		for(var j = 0; j < arrayForDay.length; j++){
			if((j+1 < arrayForDay.length && arrayForDay[j][1] != arrayForDay[j+1][1]) || j+1 == arrayForDay.length){
				if(arrayForDay[j][1].split(':')[0] > 13){
					element = element + '<span class="venuePointChart" style="top:' + (height - getMinutes(arrayForDay[j][1]) * constant) + 'px; background-color: ' + (counter <= 5 ? color['yelow'] : (counter <= 12 ? color['blue'] : color['red'])) + ';">' + i + '</span>';
				}
				counter = 0;
			}else{
				counter++;
			}
		}
		$("#concerts").append(element + '</td>');
		var arr = arrayForDay[0][0].split('-');
		$("#concertsDate").append('<td>' + arr[2] + ' ' + arr[1] + "<br>" + arr[0] + '</td>');
	}
	
//	22 = 1320
//	20 = 1200
	
	$("#lineContainer").append(	'<span class="timeLine" style="top: ' + (height - 480 * constant) + 'px;">' +
						  	   		'<span class="timeLineText">22:00</span>' +
						  	   		'<span class="timeLineLine"></span>' +
					  	   		'</span>' +
					  	   		'<span class="timeLine" style="top: ' + (height - 360 * constant) + 'px;">' +
									'<span class="timeLineText">20:00</span>' +
									'<span class="timeLineLine"></span>' +
							   	'</span>' +
								'<span class="timeLine" style="top: ' + height + 'px;">' +
									'<span class="timeLineText">14:00</span>' +
									'<span class="timeLineLine"></span>' +
							   	'</span>');


function getMinutes(time){
	var timeSplit = time.split(":");
	var hour = parseInt(timeSplit[0]);
	var minute = parseInt(timeSplit[1]);
	
	return (hour * 60) + minute - 840;
}
	//* ----- On click concerts showcase ----- *//
	$(".venuePointChart").on('mouseenter', function(){
		$("#custom_program_menu").empty();
		var value = chartData[$(this).text()];
		for(var i = 0; i < value.length; i++){
			var element = 
			'<span class="result">'+
				'<span class="event_time">'+ value[i][1] +'</span>'+
				'<span class="box">'+
				'<span class="venue_img">'+
					'<img class="venue_img_src" src="'+ value[i][2] +'">'+
				'</span>'+	
				'<span class="event_name">'+ value[i][3] +'</span>'+
				'</span>'+
			'</span>';
			$("#custom_program_menu").append(element);
		}
		$("#custom_program_menu").show();
		 var popupWidth  = $('#custom_program_menu').outerWidth();
		 var popupHeight =  $('#custom_program_menu').outerHeight();

		if(mouseX+popupWidth > windowWidth)
         popupLeft = mouseX-popupWidth;
		  else
		   popupLeft = mouseX;

			if(mouseY+popupHeight > windowHeight)
		     popupTop = mouseY-popupHeight;
				else
			     popupTop = mouseY; 

			if( popupLeft < $(window).scrollLeft()){
			 popupLeft = $(window).scrollLeft();
			}
			if( popupTop < $(window).scrollTop()){
			 popupTop = $(window).scrollTop();
			}
			if(popupLeft < 0 || popupLeft === undefined)
			 popupLeft = 0;
		    if(popupTop < 0 || popupTop === undefined)
			 popupTop = 0;

	$('#custom_program_menu').offset({top:popupTop,left:popupLeft});
	});
	$("#custom_program_menu").on('mouseleave', function(){
		$("#custom_program_menu").hide(200);
	});
	
	page++;
}
// SMARTPHONE RESPONSIVITY
$(function() {
    function mobilecheck() {
        var check = false;
        (function(a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                check = true;
            }
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    var clickevent = mobilecheck() ? 'touchstart' : 'click';

    var items = $('.slide');
    var content = $('.content');

    function open() {
        $(items).removeClass('close').addClass('open');
    }

    function close() {
        $(items).removeClass('open').addClass('close');
    }

    $('#navToggle').on(clickevent, function(event) {
        event.stopPropagation();
        event.preventDefault();
        if (content.hasClass('open')) {
            close();
        } else {
            open();
        }
    });
    content.click(function() {
        if (content.hasClass('open')) {
            close();
        }
    });

});