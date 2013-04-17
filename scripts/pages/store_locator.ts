$("./body") {
  add_class("mw_store_locator")
  
  $("//header") {
    insert_after("div", class: "mw_title") {
      $title = fetch("/html/body//div[@id='store-locator']//h1/text()")
      inner($title)
    }
  }
  
  $(".//form[@id='store-search']") {
    wrap("div", data-ur-set: "reverse-geocode")
    $label = fetch("./label/text()")
    remove("./label")
    $label {
      replace(/:\s*$/, "")
    }
    $("./input[@id='store-search-zip']") {
      attributes(placeholder: $label, data-ur-reverse-geocode-component: "rg-zip")
      add_class("mw_input mw_flex_box_item_1")
      wrap("div", class: "mw_flex_box") {
        move_here("../button") {
          add_class("mw_btn1")
        }
      }
    }
  }
  
}
