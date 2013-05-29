$(function() {
	
	var originalForm = $("#contact_form").html();
	var refreshLink = $('<p><strong><a href="#" class="refresh_link">Submit Another Question</a></strong></p>');
	$(refreshLink).on("click",function(e){ 
			$('#contact_form').html(originalForm);
			$('.error').hide();
			e.preventDefault();
		});
	
  $('.error').hide();
  $('input.text-input').css({backgroundColor:"#FFFFFF"});
  $('input.text-input').focus(function(){
    $(this).css({backgroundColor:"#FFDDAA"});
  });
  $('input.text-input').blur(function(){
    $(this).css({backgroundColor:"#FFFFFF"});
  });

  $(".button").click(function() {
		// validate and process form
		// first hide any error messages
    $('.error').hide();
		
	  var name = $("input#name").val();
		if (name == "") {
      $("label#name_error").show();
      $("input#name").focus();
      return false;
    }
		
		var email = $("input#email").val();
		var atpos=email.indexOf("@");
		var dotpos=email.lastIndexOf(".");
		if (atpos < 1 || dotpos < (atpos+2) || (dotpos+2) >= email.length || email == "") {
      $("label#email_error").show();
      $("input#email").focus();
      return false;
    }
		
		var comment = $("textarea#comment").val();
		if (comment == "") {
      $("label#comment_error").show();
      $("textarea#comment").focus();
      return false;
    }
	
	var signup = ($("input#signup:checked").length === 1) ? "Yes" : "No";
	
	var signupMAB = ($("input#signupMAB:checked").length === 1) ? "Yes" : "No";
		
	var dataString = 'name='+ name + '&email=' + email + '&comment=' + comment + '&signup=' + signup + '&signupMAB=' + signupMAB;
			
		$.ajax({
      type: "POST",
      url: "bin/process.php",
      data: dataString,
      success: function() {
        $('#contact_form').html("<div id='message'></div>");
        $('#message').html("<h2>Thank you for submitting your question!</h2><p>The Medical Advisory Board will review your question. In the meantime, checkout our <a class='anchorLink' href='#AskTheExperts'>Ask The Experts section</a> for answers to commonly asked questions.</p>")
				.append(refreshLink)
        .hide()
        .fadeIn(1500, function() {
          $('#message');
        });
      }
     });
    return false;
	});
});
runOnLoad(function(){
  $("input#name").select().focus();
});
