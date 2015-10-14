$(function() {
	//$('section#listPanel').mCustomScrollbar({
	$('div#eventList').mCustomScrollbar({
		theme: 'dark',
		axis: 'y',
		alwaysShowScrollbar: 1
	});
	
	var resize = function(){
        var wrapperH = $('#container').height();
		$('div#container, div#container > section, #eventList, #eventpanel, table.calendar').each(function() {
			var k = (wrapperH + ($(window).height() - wrapperH));
			switch($(this).attr('id'))
			{
				case 'eventList':
					$(this).css('height', (k-31)+'px'); /* 30 topmenu + 1 border */
					break;
					
				case 'contentPanel':
					$(this).css('width', $(window).width() - 2 - $('section#mainPanel').width() - $('section#listPanel').width() - $('section#eventPanel').width()+'px');
					break;
					
				case 'programMap':
					$(this).css('width', $(window).width() - 2 - $('section#mainPanel').width() - 640);
					break;
                
                case 'mainCalendar':
                    $(this).css('height', $(window).height() - 2 - $('div.titlePanel').height());
					break;
				
				default:
					$(this).css('height', k+'px');
			}
		});
    };

	resize();
    $(window).resize(resize);
	$.fancybox.open({
        closeClick: false,
		fitToView: false,
		href: '#popup',
		closeBtn: false,
		arrows: false,
		modal: false,
		wrapCSS: 'popupWraper',
		padding: 0,
		afterShow: function() {
			resize();
		},
		helpers : {
			//*overlay : {
			//	closeClick: true,
			//	css : {
			//		'background' : 'rgba(255, 255, 255, 0.5)'
			//	}
			///
			overlay : null
		 }
	});
});