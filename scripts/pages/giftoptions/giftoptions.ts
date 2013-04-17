$("./body") {
  add_class("mw_giftoptions")
  $(".//div[contains(@class,'giftcard-con')]") {
    $(".//h1") {
      add_class("mw_header")
      name("p")
    }
    $(".//img") {
      remove()
    }
    //Go through and find btns and map right text
    $(".//span/a[@class='shop-egift-card']") {
      text("Shop Online Gift Certificates")
      add_class("mw_btn1")
      insert_after("hr")
    }
    $(".//span/a[@class='shop-gift-card']") {
      text("Shop Gift Cards")
      add_class("mw_btn1")
    }
    $(".//span/a[@class='gift-card-balance']") {
      text("Check Gift Card Balance")
      add_class("mw_btn1")
      insert_after("hr")
    }
    $(".//span/a[@class='shop-bulk-card']") {
      text("Purchase Bulk Gift Cards")
      add_class("mw_btn1")
    }
  }
}
