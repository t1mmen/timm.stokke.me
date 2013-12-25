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
	$(".owl-carousel").owlCarousel({
		singleItem:true,
	});


	// Smooth scroll to #target's.
	// Inspired by http://eriktailor.com Flatbook theme.
	var navBar = $("header"),
		navBarHeight = navBar.outerHeight()+1,
		menuItems = $("header li a");

	menuItems.click(function(e){
		var href = $(this).attr("href"),
				offsetTop = href === "#" ? 0 : $(href).offset().top-navBarHeight;
		$('html, body').stop().animate({
				scrollTop: offsetTop
		}, 600);

		e.preventDefault();

	});




});
