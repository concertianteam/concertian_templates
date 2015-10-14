$(document).ready(function() {
	$('.imgSearch').hover(function() {
		$('.thirdsRow').toggleClass('buttonHover');
	});

	json = jQuery.parseJSON('{success : true,'+
		'events : [ {'+
			'id : "13",'+
			'eventName : "JazzNight",'+
			'dateTime : "2004-02-12 15:19:21",'+
			'venueName : "Kafe Scherz",'+
			'urlPhoto : "http:\\\\api.bandcloud.net\\images\\kafescherz.jpg",'+
			'city : "Bratislava",'+
			'state : "Slovakia"'+
		'}, {'+
			'id : "18",'+
			'eventName : "JazzNight",'+
			'dateTime : "2004-02-12 15:19:21",'+
			'venueName : "Konzerva bar",'+
			'urlPhoto : "http:\\\\api.bandcloud.net\\images\\konzervabar.jpg",'+
			'city : "Bratislava",'+
			'state : "Slovakia"'+
		'} ]'+
	'}');
	
	console.log(json);

	// console.log(JSON.stringify($.ajax({
	// url : "http://api.bandcloud.net/users/events",
	// method : "POST",
	// data : {
	// results : "10",
	// page : "0"
	// },
	// contentType : "application/x-www-form-urlencoded"
	// })));
});