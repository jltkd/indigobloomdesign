/*** Hover Effect on Work Page ***/
jQuery(document).ready(function(){

	jQuery('.hovercard').bind('mouseenter', function(){
		jQuery('.hovercard').not(this).stop().animate({
			opacity: 0.3
		}, 200);
		jQuery('.hovercard p').not(this).stop().addClass('purple');
	});

	jQuery('.hovercard').bind('mouseleave', function(){
		jQuery('.hovercard').not(this).stop().animate({
			opacity: 1
		}, 200);
		jQuery('.hovercard p').not(this).stop().removeClass('purple');
	});


});