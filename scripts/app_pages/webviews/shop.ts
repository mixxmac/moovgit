$("./body") {
  add_class("mw_app_shop")
  inner_wrap("div", class: "mw_remove_me")
  
  insert("div", id: "mw_main_content") {
    move_here("..//div[@id='container']//div[@id='mainNav']//div[contains(@class, 'mainNavItem')]")
  }
  
  remove("./div[@class='mw_remove_me']")
}
