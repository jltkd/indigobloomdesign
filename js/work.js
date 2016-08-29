jQuery(function(){
	
	jQuery('#content').css('min-height', jQuery('#projects').height());
	
	jQuery('#projects').css({
		top:'50%',
		'margin-top':-(jQuery('#projects').height() / 2)
	});
	
	
	jQuery('#projects li').bind('mouseenter', function(){
		jQuery('#projects li').not(this).stop().animate({
			opacity: 0.3
		}, 200);
	});
	
	jQuery('#projects li').bind('mouseleave', function(){
		jQuery('#projects li').not(this).stop().animate({
			opacity: 1
		}, 200, function(){
			jQuery('#projects li').not(this).removeAttr('style');
		});
	});
	
});