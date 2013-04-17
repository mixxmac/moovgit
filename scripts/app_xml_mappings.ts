$("./html") {
  match($path) {
    with(/pagetype=dealoftheday/i) {
      # from the home page, extract deal of the day into xml
      log("--> Importing app_pages/xml/dealofday.ts in app_mappings.ts")
      @import "app_pages/xml/dealofday.ts"
    }
  }
}