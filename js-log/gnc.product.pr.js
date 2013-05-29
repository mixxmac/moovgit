// JavaScript Document
if(gnc) {
}else{
	var gnc={};
}
if(gnc.product){
}else{
	gnc.product={};
}
gnc.product.pr = {}

gnc.product.pr.loadReviews = function() {
	var reviewLoaded = false;
	$$('.pr-review-engine').each(function(v) {
		$('tabRRContents').down('.prodTabContentBlock').insert(v);
		setTimeout(gnc.product.initializeTabset,500);
		reviewLoaded = true;
	});
	if(!reviewLoaded) {
		setTimeout(gnc.product.pr.loadReviews,500);
	}
}
gnc.product.pr.setReviewScrollbars = function() {
	$('tabRRContents').down('.prodTabContentBlock').scrollbar({holder: $('tabRRContents')})
}
gnc.product.pr.loadQA = function() {
	var qaLoaded = false;
    if($$('.prPaNonempty')[0]) {
        $$('.prPaNonempty').each(function(v) {
            $('tab052ContentsQA').down('.prodTabContentBlock').insert(v);
            $('tab052ContentsQA').down('.prodTabContentBlock').scrollbar({holder: $('tab052ContentsQA')});
            qaLoaded = true;
        });
    }
	if(!qaLoaded) {
		setTimeout(gnc.product.pr.loadQA,500);
	}
}

if(window.snippet) {
	if(!$$('.GNCSuperpid').length)
	{
		$$('.ratingBlock').each(function(v) {
			var prArgs = {
							pr_snippet_min_reviews : 0,
							pr_page_id : window.pr_page_id,
							pr_write_review : "/reviews/index.jsp?productId="+window.pr_page_id+"&pr_campaign_id=product_summary",
							pr_read_review: '#showReviews'
			}
			v.write=v.update;
			snippet(v,prArgs);
			v.removeClassName("hide");
		});
	}
}
if(window.engine && $('tabRRContents') && $('tabRRContents').down('.prodTabContentBlock')) {
 	engine(document);
	gnc.product.pr.loadReviews();
}
if(window.productAnswers && $('tab052ContentsQA') && $('tab052ContentsQA').down('.prodTabContentBlock')) {
	productAnswers(document);
	gnc.product.pr.loadQA();
}

function submitReview(pid){
		window.open ('/reviews/index.jsp?productId=' + pid, 'WriteAReview','width=570,height=750,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes')
}

Event.observe(window, 'load', function(){
	if ($$('#tabRRContents .prodTabContentBlock').length > 0) {
		gnc.product.initializeTabset();
		var completed = false;
		var timedOut = (1000 * 60 * .5); //Sets this thing to time out after .5 minutes.  This is a safeguard so that it doesn't run forever.  Adjust as desired...
		var timer = 0;
		var timerIncrement = 100; // Set the interval duration.  Adjust as desired.
		var tabInnerHTML = $$('#tabRRContents .prodTabContentBlock')[0].innerHTML;
		var scrollbarTester = setInterval(function(){
		    if($$('#tabRRContents .prodTabContentBlock')[0].scrollHeight > $$('#tabRRContents .prodTabContentBlock')[0].clientHeight){
			var el = $$('#tabRRContents .prodTabContentBlock')[0];
			el.scrollbar({holder: $('tabRRContents')});
			completed = true;
			clearInterval(scrollbarTester);
			scrollbarTester = '';
		    }
		    timer += 100;
		    if(timer >= timedOut) {
			clearInterval(scrollbarTester);
			scrollbarTester = '';
		    }
		},100);
	}
});

