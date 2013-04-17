$("./body") {
  add_class("mw_thanks")
  //HEADER
  $(".//div[@id='checkout']") {
    $(".//div[@class='wrap']") {
      table_dump("./table")
    }
    $(".//div[contains(@class,'wizmaincolor')]") {
      remove(".//div[contains(@class,'wizmaincolor')]")
      $(".//div[contains(@class,'wizhighcolor')]") {
        remove("//*[contains(@class, 'mw_header')]")
        add_class("mw_header mw_center")
        remove("../div[not(contains(@class,'wizhighcolor'))]")
      }
      wrap_together(".//div[contains(@class, 'mw_breadcrumb')]", "div", class: "mw_no_overflow")
    }
    //END HEADER
    table_dump(".//table")
    $(".//div[@id='checkoutPanelsHolder']") {
      remove("br")
    }
    
    $(".//span[@id='add-my-list']") {
      remove()
    }
    //Header Text
    $(".//h4") {
      add_class("mw_header")
      remove("../br")
      $("../span") {
        name("div")
      }
    }
    //End Text
    remove(".//a[contains(@href, 'print')]")
    remove(".//img[contains(@src, 'tracking')]")
    $(".//img") {
      name("div")
      add_class("mw_btn1 mw_center")
      text(fetch("./@alt"))
    }
    $(".//div[contains(@class,'thanksReminderAndReturnButton')]") {
      remove(".//br")
    }
    remove(".//div[contains(@class, 'rightPanel')]")
    //Item manipulations
    $(".//div[@id='items']") {
      remove("./div[1]")
      $("./div") {
        add_class("mw_item")
        $("./div") {
          remove(".//font[contains(@class,'details')]")
          add_class("mw_item_attr")
          attributes(align: "", valign: "")
          match(index()) {
            with('1') {
              add_class("mw_float_right")
              insert_top("div", class: "mw_title") {
                text("Quantity:")
              }
            }
            with('2') {
              add_class("mw_description")
              remove(".//font[contains(@class,'promodetails')]")
            }
            with('3') {
              insert_top("div", class: "mw_title") {
                text("Gift Options: ")
              }
            }
            with('5') {
              insert_top("div", class: "mw_title") {
                text("Total: ")
              }
              add_class("mw_float_right mw_move_top")
            }
          }
        }
        move_here("./div[contains(@class, 'mw_move_top')]", position("top"))
      }
    }
    //End item manipulation
    //Add header
    $(".//div[contains(@class, 'maincolor')][not(contains(@class, 'wiz'))]") {
      add_class("mw_bar1")
    }
    //End headers
    //Remove promo links
    $(".//div[@id='costSummarySection']") {
      remove(".//div[contains(@class,'noBR')]")
      remove("./br")
      $(".//div[contains(@class, 'co2-costsummary-label')]") {
        add_class("mw_float_left")
        $("../../div[not(contains(@class, 'mw_overflow_hidden'))][1]") {
          add_class("mw_overflow_hidden")
        }
      }
    }
    //End remove
  }
}
