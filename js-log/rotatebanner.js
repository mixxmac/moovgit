$(document).ready(function () {
	$('#banner-list-wrapper').bannerSlideShow();  
});

$.fn.bannerSlideShow = function() {
	return this.each(function() {
		
		var settings = { 
		
			/*** variables that can be changed ***/
			// transition time between banner-list-wrapper (in milliseconds)
			fadeTime: 400,
			// time to wait before moving to next banner (in milliseconds)
			holdTime: 5000
			
		};
	
		/***************** do not change anything below this line *****************/
	
		// index of second image in rotation
		var i = 1;
		// initiate z-index (ie, stacking order) of images
		var z = 1;
		// create holder for setTimeout()
		var timer;
		// create holder for fading state
		var fading;
		// create holder for playing/pausing banner rotation
		var play = 1;
		
		// create array to hold each banners and their containing <div>
		var banners = new Array();
		// create array to hold banner images
		var img = new Array();
		
		// put each banner container div tag into an array
		$('.banner').each(function(index, ele) {
			banners[index] = $(ele);
		});
		
		// for each banner image...
		$('.banner img').each(function(index, ele) {
			// create a new image object and add it to an array
			img[index] = new Image();
			// assign the image src to the image object
			img[index].src = $(ele).attr('src');
		});
		
		// move the first banner to the top of the stack
		banners[0].css('z-index', z);
		
		
		// Create funtion to rotate banner images
		var rotateBan = function() {
			// revove the active class from all of the jump-to buttons
			$('#jump-links a').removeClass('active-link');
			// add active class to the current jump-to button
			$('#jump-links a').eq(i).addClass('active-link');
			
			// set fading state to true
			fading = 1;
			// hide image, set to top of stack, then fade in
			banners[i].hide().css('z-index', z++).fadeIn(settings.fadeTime, function() {
				// set fading state to false
				fading = 0;
				// if we have not reached the last image, go to the next one
				// otherwise go back to the first image
				if (i < banners.length - 1) { i++ } else { i = 0 }
				// if the banner rotation is not paused, wait specified time, then show the next image
				if (play) timer = setTimeout(rotateBan, settings.holdTime);
			});
		};
		
		// create function to switch banner when link is clicked
		var moveBanner = function(banIndex, thisLink) {
			// when the link is clicked
			$(thisLink).click(function() {
				// create a variable to hold the index of the current banner 
				// (since i = the next banner in the rotation)
				var curBanIndex;
				if ( i == 0 ) {curBanIndex = (banners.length - 1)} else {curBanIndex = i - 1};
				// if the banner is not currently fading and the banner
				// is not already showing (note: the index changes while the
				// the current banner is still showing)
				if (!fading && curBanIndex != banIndex) {
					// clear the hold timer
					clearTimeout(timer);
					// stop any animation
					$('.banImg').stop();
					// set the banner to be changed to
					i = banIndex;
					// set the banner to pause after switching
					play = 0;
					// move to the indicated banner
					rotateBan();
			  return false;
				}
			});
		};
		
		// create function to populate jump-to links
		var createLinks = function() {
			var j = 0;
			var li = '';
			// cycle through the following actions with all of the jump-to buttons
			while ( j <= (banners.length-1) ){
				// if we are on the first iteration of the code...
				if( j == 0 ){
					// ...add the html for the first slide and set it to active (the text inside the tag is "1")
					li = li + '<li><a class="active-link" href="#">' + (j+1) + '<\/a><\/li>';
				// if this is not the first iteration of the code...
				} else {
					// ...add the html for the next slide (the text inside the tag is the next number
					li = li + '<li><a href="#">' + (j+1) + '<\/a><\/li>';
				}
				j++;
			}
			// put all the list elements created above inside a <ul> tag with the class "fssList"
			var List = '<ul id="jump-links">'+li+'<\/ul>';
			// ...place the buttons after the slideshow
			$('#banner-list').after(List);
		};
			
		// fade the banner into view
		$('#banner-list').fadeIn(settings.fadeTime, function() {
		  // when the banner has faded into view, remove the spinning loader image
		  $(this).removeClass('loading');
		});
		// if the rotation is not paused, start banner rotation after specified time
		if (play) timer = setTimeout(rotateBan, settings.holdTime);
		// create the jump-to links
		createLinks();
		// when a link is clicked, move to the associate banner
		$('#jump-links a').each(function(index, ele) {moveBanner(index, ele)});

	});
};

