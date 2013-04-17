$("./body") {
  $(".//header") {
    # hide main header for app
    add_class("mw_hide")
  }
  $(".//div[@id='footer']") {
    add_class("mw_hide")
  }
  $("../body[contains(@class, 'mw_home')]") {
    $(".//div[@class='mw_carousel_wrapper']") {
      add_class("mw_hide")
    }
  }
}
