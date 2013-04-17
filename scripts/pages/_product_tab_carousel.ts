move_here("//*[@class='productTabPanel']") {
  insert_before("div", class: "mw_overlay")
  # set up the product info carousel
  # the outer most container will be a uranium data-ur-set tabs
  #### under it will be 2 elements:
  ##### 1) data-ur-set=carousel which will represent the carousel of buttons,
  ##### each of these buttons will also be a uranium tab button
  ##### 2) a div containing each section of content for the uranium tabs
  ##### i.e. show the description content when the description button is clicked or
  ##### show the supplement facts content when that button is clicked
  add_class("mw_tab_carousel_buttons")

  attributes(data-ur-set: "carousel", data-ur-carousel-component: "view_container", data-ur-infinite: "disabled", data-ur-center: "enabled")

  $("./dl") {
    $("./dt[.//span[contains(text(), 'Ask A Question')]]") {
      # remove the Ask A Question section - out of scope
      remove("./following-sibling::*[1]/self::dd")
      remove()
    }
    $("./dt") {
      $tab_id = "mw_tabid" + index()
      inner_wrap("div", class: "mw_tab_button", data-ur-tab-id: $tab_id, data-ur-tabs-component: "button")
      $("./following-sibling::*[1]/self::dd") {
        attributes(data-ur-tab-id: $tab_id, data-ur-tabs-component: "content")
      }
    }
    $("./dt[1]") {
      $("./div[@class='mw_tab_button']") {
        attributes(data-ur-state: "enabled")
      }
      $("./following-sibling::*[1]/self::dd") {
        attributes(data-ur-state: "enabled")
      }
    }
  } 
  
  move_here(".//dt") {
    name("div")
    attributes(data-ur-carousel-component: "item")
    add_class("mw_tab_title")
    $(".//a") {
      name("div")
    }
    $("./self::*[.//span[contains(text(), 'Reviews')]]") {
      add_class("mw_reviews_tab")
    }
  }
  inner_wrap("div", data-ur-carousel-component: "scroll_container")
  
  wrap("div", class: "mw_tab_carousel_buttons_wrapper") {
    wrap("div", class: "mw_tab_carousel_wrapper", data-ur-set: "tabs") {
      insert("div", class: "mw_tab_carousel_contents") {
        ###########################################
        ####### CONTENTS OF DIFFERENT TABS ########
        ###########################################
        move_here("..//dd") {
          name("div")
        }
        $(".//div[@class='supplement_facts' and not(*)]") {
          # inject text instead of using img
          # for Supplement Facts tab
          text("Supplement Facts")
        }
        $(".//div[@id='lightBoxMask']") {
          # separate the disclaimer mask for Health Notes tab
          move_here("./div[@id='lightBox']", "after")
        }
        $(".//div[@class='pr-review-engine']") {
          # REVIEWS
          $(".//div[@class='pr-review-author-info-wrapper']") {
            remove("./p[.//img]")
            remove("./p[./*[contains(text(), 'all my reviews')]]")
          }
        }
      }
      # remove dl since the dt's and dd's have been extracted
      remove(".//dl")
    }
  }
}
