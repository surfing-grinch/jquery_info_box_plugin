// Info Box Plug-In (Version 1.0) by Zabludovskiy Grigoriy 2015 ☄

	var jsonScript = document.createElement('script');

	jsonScript.src = 'info_box_json.js';

	var firstScriptTag = document.getElementsByTagName('script')[0];

	firstScriptTag.parentNode.insertBefore(jsonScript, firstScriptTag);

jQuery(document).ready(function($) {

	var expandInterval;

	var easing;

	jQuery.fn.infoBox = function(theme) {

		var theme = $.extend({

			bgTopColor: '#fe7f1e',

			bgBottomColor: '#fc4203',

			color: '#ff6200'

		}, theme);

		expandInterval = (theme.expandInterval) ? theme.expandInterval : 300;

		easing = (theme.easing === 'easeInOutBack') ? 'easeInOutBack' : 'easeOutBounce';

		$('div.info_box').addClass('info_box--shadow_' + theme.shadow);

		var red = {

			bgTopColor: '#e74c3c',

			bgBottomColor: '#b93d30',

			color: '#b93d30'

		};

		var green = {

			bgTopColor: '#62cb31',

			bgBottomColor: '#4ea327',

			color: '#4ea327'

		};

		var blue = {

			bgTopColor: '#3498db',

			bgBottomColor: '#2a7aaf',

			color: '#2a7aaf'

		};

		var orange = {

			bgTopColor: '#fe7f1e',

			bgBottomColor: '#fc4203',

			color: '#ff6200'

		};

		switch (theme.themeStyle) {

			case 'red':
				theme = red;
				 break;

			case 'green':
				theme = green;
				 break;

			case 'blue':
				theme = blue;
				 break;

			case 'orange':
				theme = orange;
				 break;

			/* default:
				theme = orange;
				 break; */

		}

		var go = function() {

			var themeStyle = document.createElement('style');

			var body = document.body;

			var theme_bg_css = 'div.info_box__navigation_container--buttons:hover div.info_box__navigation--theme_bg, div.info_box__navigation_container--buttons.lte_ie_7--hover div.info_box__navigation--theme_bg { background: ' + theme.bgBottomColor + '; /* Old browsers */background: -moz-linear-gradient(top, ' + theme.bgTopColor + ' 0%, ' + theme.bgBottomColor + ' 100%); /* FF3.6-15 */background: -webkit-linear-gradient(top, ' + theme.bgTopColor + ' 0%,' + theme.bgBottomColor + ' 100%); /* Chrome10-25,Safari5.1-6 */background: linear-gradient(to bottom, ' + theme.bgTopColor + ' 0%,' + theme.bgBottomColor + ' 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */ } .info_box--theme_color { color: ' + theme.color + ' } ';

			var styleNode = document.createTextNode(theme_bg_css);

			body.parentNode.insertBefore(themeStyle, body);

			themeStyle.appendChild(styleNode);

		};

		go();

	};

	jQuery.easing['jswing'] = jQuery.easing['swing'];

	jQuery.extend( jQuery.easing, {

		def: 'jswing',

		swing: function (x, t, b, c, d) {
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},

		easeInOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},

		easeOutBounce: function (x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		}

	});

	// Info Box Expand
	$('p.info_box__details').on('click', function() {

		$('header.info_box__hero, main.info_box__content, figure.info_box__description_container').stop(true, true);

		expandTrigger();

	});

	function expandTrigger() {

		var mainContentHeight = $('div.js_info_box__description--content_height').outerHeight();

		if (!($('main.info_box__content').hasClass('js_expanded'))) {

			$('span.info_box__details__text').text('hide details');

			$('main.info_box__content').stop(true).animate({

				marginTop: 20

			}, expandInterval, easing).addClass('js_expanded');

			$('figure.info_box__description_container').stop(true).animate({

				height: mainContentHeight

			}, expandInterval, easing);

			$('header.info_box__hero').fadeOut(expandInterval);

		}

		else if ($('main.info_box__content').hasClass('js_expanded')) {

				collapseExpanded();

			}

	}

	function collapseExpanded() {

		$('span.info_box__details__text').text('show details');

		$('main.info_box__content').stop(true).animate({

			margin: '200px 0 40px 0'

		}, expandInterval, easing).removeClass('js_expanded');

		$('figure.info_box__description_container').stop(true).animate({

			height: 24

		}, expandInterval, easing);

		$('header.info_box__hero').fadeIn(expandInterval);

	}

	// Info Box JSON Load
	var infoBoxContent;

	var productNumber = 0;

	$(window).load(function() {

		infoBoxContent = JSON.parse(infoBoxJson);

		loadContent();

	}); // window.load end

	function loadContent() {

		$('h1.info_box__heading').text(infoBoxContent[productNumber].title);

		$('header.info_box__hero').css('background-image', 'url("images/' + infoBoxContent[productNumber].img + '")');

		$('p.info_box__description').text(infoBoxContent[productNumber].description);

		$('p.info_box__description_note').text(infoBoxContent[productNumber].note);

		$('a.info_box__navigation_action_button_link').attr('href', infoBoxContent[productNumber].productUrl);

		// console.info(infoBoxContent.length);

	}

	function fadeInNewProduct() {

		loadContent();

		$('header.info_box__hero, main.info_box__content').fadeIn(expandInterval);

	}

	var nextProduct = function() {

		$('header.info_box__hero, main.info_box__content, figure.info_box__description_container').stop(true, true);

		if (infoBoxContent.length > productNumber && productNumber != infoBoxContent.length - 1) {

			productNumber++;

			if ($('main.info_box__content').hasClass('js_expanded')) {

				collapseExpanded();

				$('header.info_box__hero').hide();

				$('main.info_box__content').fadeOut({

					duration: expandInterval,

					queue: false,

					complete: fadeInNewProduct

				});

				return;

			}

			$('header.info_box__hero, main.info_box__content').fadeOut(expandInterval, fadeInNewProduct);

		}

	};

	$('div.info_box__navigation_container--buttons_next').click(nextProduct);

	var previousProduct = function() {

		$('header.info_box__hero, main.info_box__content, figure.info_box__description_container').stop(true, true);

		if (infoBoxContent.length > 1 && productNumber != 0) {

			productNumber--;

			if ($('main.info_box__content').hasClass('js_expanded')) {

				collapseExpanded();

				$('header.info_box__hero').hide();

				$('main.info_box__content').fadeOut({

					duration: expandInterval,

					queue: false,

					complete: fadeInNewProduct

				});

				return;

			}

			$('header.info_box__hero, main.info_box__content').fadeOut(expandInterval, fadeInNewProduct);

		}

	};

	$('div.info_box__navigation_container--buttons_previous').click(previousProduct);

});