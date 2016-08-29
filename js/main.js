jQuery(function(){
	
	var hh = jQuery('#header').outerHeight(),
		fh = jQuery('#footer').outerHeight(),
		wh, nh, mh;
	
	function resizeContent() {
		wh = jQuery(window).height();
		mh = parseInt(jQuery('#content').css('min-height'));
		nh = wh - hh - fh;
		nh = mh > 0 && nh < mh ? mh : nh;
		jQuery('#content').height(nh);
	}
	
	jQuery(window).resize(resizeContent);
	
	resizeContent();
	
});