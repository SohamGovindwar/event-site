; (function () {
	'use strict';

	/* ---- Loading Screen ---- */
	var loader = document.getElementById('wedding-loader');
	var loaderDismissed = false;
	function dismissLoader() {
		if (loaderDismissed || !loader) return;
		loaderDismissed = true;
		loader.classList.add('loader-hidden');
		setTimeout(function () {
			if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
		}, 700);
	}
	// Always hide after 5 seconds max
	var loaderTimeout = setTimeout(dismissLoader, 5000);
	// Hide as soon as page is fully ready (images, etc.)
	if (document.readyState === 'complete') {
		clearTimeout(loaderTimeout);
		dismissLoader();
	} else {
		window.addEventListener('load', function () {
			clearTimeout(loaderTimeout);
			dismissLoader();
		});
	}

	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}
	window.scrollTo(0, 0);

	var mobileMenuOutsideClick = function () { /* removed — no nav */ };

	var offcanvasMenu = function () { /* removed — no nav */ };

	var burgerMenu = function () { /* removed — no nav */ };

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
			if (!hash || hash === '#' || hash === '#wedding-video-modal') return;
			var target = $(hash);
			if (target.length) {
				e.preventDefault();
				if ($('body').hasClass('offcanvas')) {
					$('body').removeClass('overflow offcanvas');
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
				var targetOffset = target.offset().top;
				var finalTop = Math.max(0, targetOffset - 30);
				if ('scrollBehavior' in document.documentElement.style) {
					window.scrollTo({
						top: finalTop,
						behavior: 'smooth'
					});
				} else {
					$('html, body').stop().animate({
						scrollTop: finalTop
					}, 500);
				}
			}
		});
	};

	var goToTop = function () {
		$('.js-gotop').on('click', function (event) {
			event.preventDefault();
			if ('scrollBehavior' in document.documentElement.style) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				$('html, body').stop().animate({ scrollTop: 0 }, 500);
			}
			return false;
		});

		var ticking = false;
		$(window).on('scroll', function () {
			if (!ticking) {
				window.requestAnimationFrame(function () {
					var scrollTop = $(window).scrollTop();
					if (scrollTop > 250) {
						$('.js-top').addClass('active');
					} else {
						$('.js-top').removeClass('active');
					}

					if (scrollTop > 100) {
						$('.fh5co-nav').addClass('scrolled');
					} else {
						$('.fh5co-nav').removeClass('scrolled');
					}

					var scrollPos = scrollTop + 100;
					$('section, div[id^="fh5co-"], header[id^="fh5co-"]').each(function () {
						var top = $(this).offset().top;
						var bottom = top + $(this).outerHeight();
						var id = $(this).attr('id');
						if (id && scrollPos >= top && scrollPos < bottom) {
							$('.fh5co-nav li, #fh5co-offcanvas li').removeClass('active');
							$('.fh5co-nav a[href="#' + id + '"], #fh5co-offcanvas a[href="#' + id + '"]').parent().addClass('active');
							if (id === 'fh5co-header') {
								$('.fh5co-nav a[href="index.html"], #fh5co-offcanvas a[href="index.html"]').parent().addClass('active');
							}
						}
					});

					ticking = false;
				});
				ticking = true;
			}
		});
	};

	var calendarEvents = function () {
		$('#btn-download-ics').on('click', function (e) {
			e.preventDefault();
			var icsLines = [
				'BEGIN:VCALENDAR',
				'VERSION:2.0',
				'PRODID:-//Abhishek & Sakshi Wedding//EN',
				'CALSCALE:GREGORIAN',
				'METHOD:PUBLISH',
				'BEGIN:VEVENT',
				'UID:wedding-abhishek-sakshi-20261219@we.abhinandansakshi.com',
				'DTSTAMP:20260920T120000Z',
				'DTSTART:20261219T070000Z',
				'DTEND:20261219T110000Z',
				'SUMMARY:Abhishek & Sakshi Wedding',
				'DESCRIPTION:We are getting hitched! Join us in celebrating the wedding of Abhishek & Sakshi.\\n\\nWedding: Saturday, 19 December 2026, 12:30 PM IST\\nShevanti & Sangit: Friday, 18 December 2026, 7:00 PM IST\\nVenue: Shrinivasa Garden & Mangal Karyalaya, Nanded\\nMap: https://maps.app.goo.gl/81aMjoMoWF8rJs5w8',
				'LOCATION:Shrinivasa Garden & Mangal Karyalaya, Guruji Chowk, Arjun Nagar, Pawadewadi Road, Wadi Bk., Nanded - 431605',
				'STATUS:CONFIRMED',
				'END:VEVENT',
				'END:VCALENDAR'
			];
			var icsBlob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
			var downloadUrl = window.URL.createObjectURL(icsBlob);
			var a = document.createElement('a');
			a.href = downloadUrl;
			a.download = 'Abhishek_Sakshi_Wedding.ics';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(downloadUrl);
		});
	};

	$(function () {
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		smoothScroll();
		goToTop();
		calendarEvents();
	});

}());
