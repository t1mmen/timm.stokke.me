/*
 * Main JS
 */

$(document).ready(function() {

	// Avatar animations
	window.setTimeout(function() {
		$('.avatar').addClass('fadeInLeft').removeClass('invisible');
	}, 1000);


	// Generic "show element" style snippet
	$('.js-expand').click(function(e){

		e.preventDefault();

		var $this = $(this),
			data = $this.data(),
			$target = $(data.target),
			targetAnimationIn = data.animationIn,
			targetAnimationOut = data.animationOut,
			btnAnimationOut = data.btnAnimationOut,
			hideTriggerAfterClick = data.hideTrigger,
			toggle = data.toggle;

		if (targetAnimationIn === undefined) {
			targetAnimationIn = 'slideInLeft';
		}

		if (targetAnimationOut === undefined) {
			targetAnimationOut = 'slideOutLeft';
		}

		if (btnAnimationOut === undefined) {
			btnAnimationOut = 'flipOutX';
		}

		if (hideTriggerAfterClick === undefined) {
			hideTriggerAfterClick = true;
		}

		if (toggle === undefined) {
			toggle = true;
		}

		if ($target.hasClass(targetAnimationIn) && toggle == true) {

			$target.removeClass(targetAnimationIn).addClass(targetAnimationOut);

			$target.one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
				$target.addClass('hide invisible');
			});

		} else {

			$target.removeClass('hide invisible').removeClass(targetAnimationOut).addClass(targetAnimationIn);

		}

		if (hideTriggerAfterClick != false) {
			$this.addClass('animated ' + btnAnimationOut);
		}

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

	// Animate timeline
	// Delay animations on history timeline
	$('#timeline').waypoint({
		//horizontal: true,
  		offset: '70%',
		handler: animateTimelineNodes
	});


	// Loop though timeline nodes and animate them after delay
	function animateTimelineNodes(selector) {

		// http://stackoverflow.com/questions/19597735/animate-each-child-jquery
		$('.timeline-node').not('.hide').each(function(i) {
			delay =(i)*500;
			setTimeout(function (div) {
				div.show().addClass('animated flipInX').removeClass('invisible');
			}, delay, $(this));
		});

	};

});
