/*
 * Main JS
 */

$(document).ready(function() {

	// Avatar animations
	window.setTimeout(function() {
		$('.avatar').addClass('fadeInLeft').removeClass('invisible');
	}, 1000);


	// Generic "show selector" style snippet
	$('.js-expand').click(function(e){

		e.preventDefault();

		var $this = $(this),
			$target = $($this.data('target')),
			targetAnimationIn = 'slideInLeft',
			btnAnimationOut = 'slideOutRight';

		$target.removeClass('hide').addClass(targetAnimationIn);

		$this.addClass('animated ' + btnAnimationOut);

	});

	// Carousel:
	$('.owl-carousel').owlCarousel({
		singleItem:true
	});


	// Smooth scroll to #target's.
	// From: http://css-tricks.com/snippets/jquery/smooth-scrolling/
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top-50
				}, 600);
				return false;
			}
		}
	});



});
