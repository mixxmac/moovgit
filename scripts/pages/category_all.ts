$("./body") {
  add_class("mw_category_all")
  
  $("//header") {
    insert_after("div", class: "mw_title") {
      $title = fetch("/html/body//div[@id='mainContent']//h3[contains(@class, 'root')]/text()")
      inner($title)
    }
  }
  
  log("--> Importing pages/_category_shared.ts in category_all.ts")
  @import _category_shared.ts
}