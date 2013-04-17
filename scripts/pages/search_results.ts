$("./body") {
  add_class("mw_search_results")
  
  $("//header") {
    move_here("/html/body//div[@id='searchTop']/*[@id='searchResultsFor']", "after") {
      move_here("/html/body//div[@id='searchTop']/*[@id='searchTerm']")
      wrap("div", class: "mw_title")
    }
  }
  
  match(fetch("./@class")) {
    with(/searchNoResults /) {
      remove(".//div[@id='noSearchProds']")
      $(".//div[@id='mainContent']") {
        $(".//h1") {
          add_class("mw_title")
          $(".//span") {
            add_class("mw_header")
          }
          $title = path()
        }
        $(".//fieldset") {
          $(".//input[@type='text']") {
            wrap("div", id: "searchInputContainer", class: "mw_search_wrapper";)
          }
          $(".//label") {
            wrap("p", class: "mw_margin")
          }
        }
      }
      $(".//div[@id='container']") {
        move_here($title, position("before"))
      }
    }
  }

  log("--> Importing pages/_category_shared.ts in search_results.ts")
  @import _category_shared.ts
}
