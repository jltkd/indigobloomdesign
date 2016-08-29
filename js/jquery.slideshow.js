/*
 * Slideshow
 * Version 0.5.0
 * 
 * Copyright (c) 2009 Ry Racherbaumer
 * 
 * TODO: add more error-checking
 * TODO: add descriptions for each option
 */
(function(jQuery){
	// add slideshow function to jQuery
	jQuery.fn.slideshow = function(options){
		// get plugin options
		options = jQuery.extend({}, jQuery.fn.slideshow.defaults, options);
		// apply slideshow to every matched element
		return this.each(function(){
			// setup slideshow vars
			var current = options.startIndex,
				iId,
				slides = jQuery(options.slideSelector, this),
				len = slides.length,
				nav = false,
				navItems;
			// init slideshow
			options.init.call(this, slides);
			// make sure current index is valid
			if (current < 0 || current > len - 1) current = 0;
			// change slide
			function changeSlide(index, slideOptions) {
				slideOptions = slideOptions || {};
				// make sure index is valid and not current
				if (index !== current && (index < 0 || index > len - 1)) return;
				// remove current slide
				if (!slideOptions.slideOutCurrent || (slideOptions.slideOutCurrent && slideOptions.slideOutCurrent === true)) slideOut(slides.get(current), current, slideOptions);
				// add new slide
				slideIn(slides.get(index), index, slideOptions);
				// change new slide to current
				current = index;
				// update nav
				if (nav !== false) {
					navItems.removeClass(options.currentClass);
					jQuery(navItems.get(index)).addClass(options.currentClass);
				}
			}
			// go to next slide
			function nextSlide() {
				changeSlide(current === len - 1 ? 0 : current + 1);
			}
			// go to previous slide
			function previousSlide() {
				changeSlide(current === 0 ? len - 1 : current - 1);
			}
			// slide in next element
			function slideIn(element, index, slideOptions) {
				options.beforeSlideInCallback.call(this, slides, index, options);
				jQuery(element).css(options.slideInCSS);
				if (slideOptions && slideOptions.cancelAnimation && slideOptions.cancelAnimation === true) {
					options.slideInCallback.call(this, slides, index, options);
				} else {
					jQuery(element).stop().animate(options.slideInAnimation, options.slideDelay, function(){
						options.slideInCallback.call(this, slides, index, options);
					});
				}
			}
			// slide out current element
			function slideOut(element, index, slideOptions) {
				options.beforeSlideOutCallback.call(this, slides, index, options);
				if (slideOptions && slideOptions.cancelAnimation && slideOptions.cancelAnimation === true) {
					jQuery(this).css(options.slideOutCSS);
					options.slideOutCallback.call(this, slides, index, options);
				} else {
					jQuery(element).stop().animate(options.slideOutAnimation, options.slideDelay, function(){
						jQuery(this).css(options.slideOutCSS);
						options.slideOutCallback.call(this, slides, index, options);
					});
				}
			}
			// setup auto-cycle interval
			if (options.autoCycle) {
				iId = setInterval(nextSlide, options.cycleDelay);
			}
			// setup slide navigation
			if (options.navSelector !== '' && jQuery(options.navSelector, this).length === 1) {
				nav = jQuery(options.navSelector, this);
				// setup nav items
				navItems = jQuery(options.navItems, nav);
				jQuery(navItems.get(current)).addClass(options.currentClass);
				// see if nav items are present
				if (navItems.length > 0) {
					// setup nav
					navItems.bind('click', {opts: options}, function(e){
						// prevent default action
						e.preventDefault();
						// get the index of the nav item
						var index = navItems.index(this);
						// exit if index is the same as current
						if (index === current) return;
						// before nav click callback
						var slideOptions = options.beforeNavClickCallback.call(this, slides, index, options);
						// stop auto-cycle
						if (e.data.opts.autoCycle) clearInterval(iId);
						// change to next slide
						changeSlide(index, slideOptions || {});
						// restart the auto-cycle after slide animation
						if (e.data.opts.autoCycle) {
							setTimeout(function(){
								iId = setInterval(nextSlide, e.data.opts.cycleDelay);
							}, e.data.opts.slideDelay);
						}
						// nav click callback
						options.navClickCallback.call(this, slides, index, options);
					});
				}
			}
			// see if next nav is present
			if (options.navNext !== '') {
				// setup next nav
				jQuery(options.navNext).live('click', {opts: options}, function(e){
					// prevent default action
					e.preventDefault();
					// stop auto-cycle
					if (e.data.opts.autoCycle) clearInterval(iId);
					// change to next slide
					nextSlide();
					// restart the auto-cycle after slide animation
					if (e.data.opts.autoCycle) {
						setTimeout(function(){
							iId = setInterval(nextSlide, e.data.opts.cycleDelay);
						}, e.data.opts.slideDelay);
					}
				});
			}
			// see if previous nav is present
			if (options.navPrevious !== '') {
				// setup previous nav
				jQuery(options.navPrevious).live('click', {opts: options}, function(e){
					// prevent default action
					e.preventDefault();
					// stop auto-cycle
					if (e.data.opts.autoCycle) clearInterval(iId);
					// change to next slide
					previousSlide();
					// restart the auto-cycle after slide animation
					if (e.data.opts.autoCycle) {
						setTimeout(function(){
							iId = setInterval(nextSlide, e.data.opts.cycleDelay);
						}, e.data.opts.slideDelay);
					}
				});
			}
			// slide in the first slide
			slideIn(slides.get(current), current);
		});
	}
	// plugin defaults
	jQuery.fn.slideshow.defaults = {
		startIndex: 0,
		slideSelector: '.slide',
		slideOutCSS: {},
		slideOutAnimation: {
			opacity:0
		},
		slideInCSS: {},
		slideInAnimation: {
			opacity:1
		},
		init:function(slides){
			slides.css({
				opacity:0,
				display:'block'
			});
		},
		beforeSlideInCallback: function(slides, index, options){},
		slideInCallback: function(slides, index, options){},
		beforeSlideOutCallback: function(slides, index, options){},
		slideOutCallback: function(slides, index, options){},
		beforeNavClickCallback: function(){},
		navClickCallback: function(){},
		slideDelay: 1000,
		autoCycle: true,
		cycleDelay: 5000,
		navSelector: 'ul.nav',
		navNext: '.next',
		navPrevious: '.previous',
		navItems: 'li',
		currentClass: 'current'
	}
})(jQuery);