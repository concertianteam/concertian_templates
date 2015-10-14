var screens = {
	'screen1': ['images/experiment/screen1.png'],
	'screen2': ['images/experiment/screen2.png'],
	'screen3': ['images/experiment/screen3.png'],
	'screen4': ['images/experiment/screen4.png'],
	'screen5': ['images/experiment/screen5.png'],
	'screen6': ['images/experiment/screen4.png']
};

var movements = {
	'screen1': [
		[31.71171171171171,33.387096774193544,2000,null],
		[15.855855855855856,35.483870967741936,2000,'screen2']
	],
	'screen2': [
		[19.90990990990991,28.387096774193548,2000,null],
		[19.0990990990991,16.93548387096774,1000,'screen3']
	],
	'screen3': [
		[24.504504504504503,16.612903225806452,1000,'screen4']
	],
	'screen4': [
		[32.16216216216216,45.645161290322584,2000,null],
		[47.11711711711712,48.54838709677419,1200,'screen5']
	],
	'screen5': [
		[60.72072072072072,36.29032258064516,2000,null],
		[67.2072072072072,29.516129032258064,2000,'screen6']
	],
	'screen6': [
		[33.42342342342342,35,2000,null],
		[15.855855855855856,30.32258064516129,2000,'screen1']
	]
};


/* by buri.sk */
$(function(){function n(n){null===t?(i.prepend('<img src="'+screens[n][1].src+'" id="presentationImage">'),t=$("#presentationImage")):t.attr("src",screens[n][1].src),o=n,a=0}function e(){if(null==o&&(o=c),void 0!==movements[o][a]){var r=movements[o][a];l.animate({top:r[1]+"%",left:r[0]+"%"},r[2],function(){a++,null!==r[3]&&n(r[3]),e()})}}var r=0,s=3,c=null,i=$("#screen-presentation"),t=null,l=$("img#mouse");for(_idscreen in screens){var o=screens[_idscreen];null===c&&(c=_idscreen),o[1]=new Image,o[1].rel=_idscreen,o[1].onload=function(){r++,r==s&&(n(c),e())},o[1].src=o[0]}var o=null,a=0});