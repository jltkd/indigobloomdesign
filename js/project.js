jQuery(function(){

	jQuery('#project-details span.opener').click(function(e){
		jQuery('#project-details .tabs').animate({
			top:-300
		}, 500);
	});
	
	jQuery('#project-details span.closer').click(function(e){
		jQuery('#project-details .tabs').animate({
			top:30
		}, 500);
	});
	
	
	var ml = 0;
	
	var scrollPane = jQuery('#scroll-pane');
	var scrollContent = jQuery('#scroll-content');
	
	var scrollHelp = true;
	
	var scrollBar = jQuery('#slider').slider({
		slide: function( event, ui ) {
			if (scrollHelp) {
				scrollHelp = false;
				jQuery('#slider-wrap p').fadeOut(500);
			}
			if ( scrollContent.width() > scrollPane.width() ) {
				scrollContent.css( "margin-left", Math.round(
					ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
				) + "px" );
			} else {
				scrollContent.css( "margin-left", 0 );
			}
		},
		change: function( event, ui ) {
			if (scrollHelp) {
				scrollHelp = false;
				jQuery('#slider-wrap p').fadeOut(500);
			}
			if ( scrollContent.width() > scrollPane.width() ) {
				scrollContent.css( "margin-left", Math.round(
					ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
				) + "px" );
			} else {
				scrollContent.css( "margin-left", 0 );
			}
		}
	});
	
	jQuery('#scroll-pane').mousewheel(function(e, delta){
		var dir = delta > 0 ? '-1' : '1',
			vel = Math.abs(delta);
		
		scrollBar.slider('value', scrollBar.slider('value') + (dir * vel));
		return false;
	});
	
	var handleHelper = scrollBar.find(".ui-slider-handle")
		.wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
	
	var handleSize = 75;
	
	scrollBar.find('.ui-slider-handle').css({
		width: handleSize,
		"margin-left": -handleSize / 2
	});
	
	handleHelper.width(scrollBar.width() - handleSize);
	scrollBar.width(scrollBar.width() - handleSize);
	
	var contentWidth = 0;
	
	jQuery('#elements li').each(function(){
		contentWidth += jQuery(this).outerWidth();
	});
	
	function positionElements() {
		var oldml = ml;
		ml = Math.round((jQuery(window).width() / 2) - (650 / 2));
		jQuery('#elements').css({
			'margin-left': ml,
			'margin-right': ml
		});
		scrollContent.width(contentWidth + (ml * 2) + 20);
	}

	jQuery(window).resize(function(){
		positionElements();
	});
	
	jQuery('#slider-wrap').css({
		position: 'fixed',
		bottom: 40,
		left: '50%',
		'margin-left':-200
	});
	
	positionElements();
	
	scrollPane.css({
		top: '50%',
		'margin-top': -(scrollPane.height() / 2)
	});
	jQuery('#content').css('min-height', scrollPane.height());
	
	jQuery('#project-details .tabs').tabs({
		navSelector: 'li'
	});
	
});