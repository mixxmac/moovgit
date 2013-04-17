$("/html/head") {
  
  $google_analytics_id = ""
  match($host) {
    with(/^mstage\./) {
      $google_analytics_id = "UA-38540717-1"
    }
    with(/^m\./) {
      $google_analytics_id = ""
    }
  }
  
  # setup GA acct info
  insert_bottom("script", type:"text/javascript") {
    inner() {
      append("var _gaq = _gaq || [];")
      append("_gaq.push(['_setAccount', '" + $google_analytics_id + "']);")
      append("_gaq.push(['_trackPageview']);")
    }
  }
}

# on order thank you page (after placing order)
match($path, /checkout.*process=thanks/) {
  # ecommerce conversion tracking
  @import _ga_after_checkout.ts
}

$("/html/head") {
  # fire GA.js request
  insert_bottom("script", type:"text/javascript") {
    inner() {
      append("(function(){ var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();")
    }
  }
}
