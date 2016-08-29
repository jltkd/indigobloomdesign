/*
 * Tabs
 * Version 0.0.1
 * 
 * Copyright (c) 2009 Ry Racherbaumer
 */
(function($) {
	
	jQuery.fn.tabs = function(){
		var args = arguments,
			options;
		// setup api
		var api = {
			changeTab: function(index){
				// get the environment
				var environment = $.data(this, 'environment');
				// if index is string, look for it in nav
				if (typeof(index) == 'string') {
					var i = 0;
					environment.nav.each(function(){
						var href = $(this).attr('href');
						href = href.split('#');
						var hash = href[1];
						if (hash === index)
							i = environment.nav.index(this);
					});
					index = i;
				}
				// make sure index is valid and not current
				if (index !== environment.current && (index < 0 || index > environment.len - 1)) return;
				// hide current slide
				options.tabHide.call(environment.tabs.get(environment.current), options);
				// show new tab
				options.tabShow.call(environment.tabs.get(index), options);
				// change new tab to current
				environment.current = index;
				// update nav/environment
				$.data(this, 'environment', environment);
				environment.nav.removeClass(options.currentClass);
				$(environment.nav.get(index)).addClass(options.currentClass);
			},
			nextTab: function(){
				var environment = $.data(this, 'environment');
				if (environment.current === environment.len - 1)
					api['changeTab'].call(this, 0);
				else
					api['changeTab'].call(this, environment.current + 1);
			},
			prevTab: function(){
				var environment = $.data(this, 'environment');
				if (environment.current === 0)
					api['changeTab'].call(this, environment.len - 1);
				else
					api['changeTab'].call(this, environment.current - 1);
			},
			disableTabNavigation: function(){
				var environment = $.data(this, 'environment');
				// TODO: just unbind bound function instead of global unbind
				environment.nav.unbind('click');
			}
		};
		// check for api calls
		if (typeof args[0] === 'string' || args.length === 2) {
			// make sure api call is valid
			if (api[args[0]] && typeof api[args[0]] === 'function') {
				// execute api call for each matched element
				return this.each(function(){
					options = $.data(this, 'options');
					// execute api call
					if (args.length === 2)
						api[args[0]].call(this, args[1]);
					else
						api[args[0]].call(this);	
				});
			} else 
				return;
		// not calling api
		} else {
			// setup tab options
			options = $.extend({}, jQuery.fn.tabs.defaults, args[0]);
			// setup tabs
			return this.each(function(){
				var _this = this;
				// store tab options in element
				$.data(this, 'options', options);
				// setup environment vars
				var environment = {
					current: options.startIndex,
					nav: $(this).find(options.navClass).find(options.navSelector),
					tabs: $(this).find(options.tabSelector)
				}
				environment.len = environment.tabs.length;
				// make sure current index is valid
				if (typeof(environment.current) == 'string') {
					var index = 0;
					environment.nav.each(function(){
						var href = $(this).attr('href');
						href = href.split('#');
						var hash = href[1];
						if (hash === environment.current)
							index = environment.nav.index(this);
					});
					environment.current = index;
				} else {
					if (environment.current < 0 || environment.current > environment.len - 1) 
						environment.current = 0;
				}
				// store environment vars in element
				$.data(this, 'environment', environment);
				// hide tabs
				environment.tabs.hide();
				// setup tab navigation
				if (environment.nav.length > 0) {
					// bind click event to tab nav if enabled
					if (options.enableTabNavigation === true) {
						environment.nav.bind('click', function(e){
							// prevent default action
							//e.preventDefault();
							var index = environment.nav.index(this);
							// change tab
							api['changeTab'].call(_this, index);
						});
					}
				}
				// show initial tab
				options.tabShow.call(environment.tabs.get(environment.current), options);
				$(environment.nav.get(environment.current)).addClass(options.currentClass);
			});
		}
	}
	// plugin defaults
	jQuery.fn.tabs.defaults = {
		startIndex: 0,
		navClass: 'ul.nav',
		navSelector: 'li a',
		tabSelector: 'div.tbody',
		currentClass: 'current',
		tabHide: function(opts){
			$(this).hide();
		},
		tabShow: function(opts){
			$(this).show();
		},
		delay: 1000,
		enableTabNavigation: true
	}
})(jQuery);