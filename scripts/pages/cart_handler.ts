$("./body") {
  add_class("mw_cart_handler")
  $(".//div") {
    attributes(style: "")
  }
  $(".//h2") {
    text() {
      replace(/\A1\.\s*/, "")
      replace(/\A2\.\s*/, "")
    }
  }
  $(".//div[@class='choice']") {
    $(".//a") {
      add_class("mw_btn1")
      insert_bottom("div", style: "display: inline-block;", class: "sprites-addtocart")
    }
  }
}
