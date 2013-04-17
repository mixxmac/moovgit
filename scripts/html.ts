# HTML Transformations go here

rewrite_links()
absolutize_srcs()
remove_all_styles()
remove_html_comments()

$("/html[1]") {
  $("self::*[not(head)]") {
    insert_top("head")
  }
  remove(".//div[contains(@id,'trackingPixels')]")
  
  # Add the mobile meta tags 
  clean_mobile_meta_tags()
  
  # move js to bottom except for pdp
  relocate_scripts()

  # Include mw_analytics file to track the mobile site
  @import "mw_analytics.ts"
  
  # custom google analytics for mobile site (no ga on desktop)
  @import "custom_google_analytics.ts"

  add_assets()
  
  log("--> Importing pages/base.ts in html.ts")
  @import "base.ts"
  
  log("--> Importing pages/header.ts in html.ts")
  @import "sections/header.ts"
  
  log("--> Importing pages/footer.ts in html.ts")
  @import "sections/footer.ts"
  
  log("--> Importing pages/side_slider.ts in html.ts")
  @import "sections/side_slider.ts"

  @import "mappings.ts"
  
  match($cookie, /fuzz_app=true/i) {
    log("")
    log("+++++++++++++++++++++++++++++")
    log("--> Request from the app")
    log("")
    
    log("--> Importing sections/app_base.ts in html.ts")
    @import "sections/app_base.ts"
    
    log("--> Importing app_webview_mappings.ts in html.ts")
    @import "app_webview_mappings.ts"
    
    log("+++++++++++++++++++++++++++++")
    log("")
  }
  
  # Late load all the images on the site
  lateload()

  @import "keep_desktop_js.ts"
  
  # Remove all script tags not marked with "data-keep" attribute
  remove_desktop_js()
  remove("//script[contains(@src, 'mtagconfig.js')]")

  $("./body") {
    inner_wrap("div", id: "mw_body")
    move_here("./div/*[contains(@class, 'mw_side_slider')]")
  }
  
  # uncomment this to see the lib styles on the page 
  # test_lib_styles()
  
}

match($html_fragment, /true/i) {
  @import mappings.ts
}
