;(function () {
	'use strict';

	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}
	window.scrollTo(0, 0);

	var mobileMenuOutsideClick = function () {
		$(document).click(function (e) {
			var container = $('#fh5co-offcanvas, .js-fh5co-nav-toggle');
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas')) {
					$('body').removeClass('overflow offcanvas');
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
			}
		});
	};

	var offcanvasMenu = function () {
		if ($('#fh5co-offcanvas').length === 0) {
			$('#page').prepend('<div id="fh5co-offcanvas" />');
			$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
			var clone1 = $('.menu-1 > ul').clone();
			$('#fh5co-offcanvas').append(clone1);
		}

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas').find('li').removeClass('has-dropdown');

		$('.offcanvas-has-dropdown').mouseenter(function () {
			$(this).addClass('active').find('ul').slideDown(400, 'easeOutExpo');
		}).mouseleave(function () {
			$(this).removeClass('active').find('ul').slideUp(400, 'easeOutExpo');
		});

		$(window).resize(function () {
			if ($('body').hasClass('offcanvas')) {
				$('body').removeClass('overflow offcanvas');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});
	};

	var burgerMenu = function () {
		$('body').on('click', '.js-fh5co-nav-toggle', function (event) {
			event.preventDefault();
			$('body').toggleClass('overflow offcanvas');
			$(this).toggleClass('active');
		});
	};

	var contentWayPoint = function () {
		if (!$().waypoint) return;
		$('.animate-box').waypoint(function (direction) {
			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {
				var el = $(this.element);
				var effect = el.data('animate-effect') || 'fadeInUp';
				el.addClass(effect + ' animated-fast');
			}
		}, { offset: '90%' });
	};

	var smoothScroll = function () {
		$('a[href^="#"]:not([href="#"])').on('click', function (e) {
			var hash = this.getAttribute('href');
			var target = $(hash);
			if (target.length) {
				e.preventDefault();
				if ($('body').hasClass('offcanvas')) {
					$('body').removeClass('overflow offcanvas');
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
				var targetOffset = target.offset().top;
				$('html, body').stop().animate({
					scrollTop: Math.max(0, targetOffset - 30)
				}, 600, 'easeInOutExpo');
			}
		});
	};

	var goToTop = function () {
		$('.js-gotop').on('click', function (event) {
			event.preventDefault();
			$('html, body').stop().animate({ scrollTop: 0 }, 600, 'easeInOutExpo');
			return false;
		});

		var ticking = false;
		$(window).on('scroll', function () {
			if (!ticking) {
				window.requestAnimationFrame(function () {
					if ($(window).scrollTop() > 250) {
						$('.js-top').addClass('active');
					} else {
						$('.js-top').removeClass('active');
					}
					ticking = false;
				});
				ticking = true;
			}
		});
	};

	$(function () {
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		smoothScroll();
		goToTop();
	});

}());
