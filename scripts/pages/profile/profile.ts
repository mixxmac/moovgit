$("./body") {
  add_class("mw_profile") 
  $(".//div[@id='mainContent']") {
    add_class("mw_content")
    $(".//h2") {
      add_class("mw_header")
    }
    $(".//input[@type='text']") {
      add_class("mw_input")
    }
    $(".//input[@type='image']") {
      add_class("mw_btn1")
      attributes(type: "submit", src: "", value: "SAVE")
    }
    $(".//label") {
      wrap("p")
    }
    $(".//span/small") {
      wrap("p")
    }
  }
}
