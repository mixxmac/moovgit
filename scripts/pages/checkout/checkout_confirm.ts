$("./body") {
  add_class("mw_checkout_confirm")
  $(".//div[@id='checkout']") {
    //HEADER
    $(".//div[@class='wrap']") {
      table_dump("./table")
    }
    $(".//div") {
      $("./div[contains(@class, 'wizmaincolor')][@onclick][last()]") {
        remove("..//font")
        add_class("mw_breadcrumb mw_float_left")
        insert_top("span", class: "mw_breadcrumb_bracket") {
          text("‹ ") 
        }
        $("../div[contains(@class, 'wizmaincolor')][not(@onclick)][1]") {
          add_class("mw_breadcrumb mw_float_right")
          insert_top("span") {
            text("Next: ")
          }
        }
        remove("../div[contains(@class, 'wizmaincolor')][not(contains(@class, 'mw_breadcrumb'))]")
      }
      $("./div[contains(@class,'wizhighcolor')]") {
        remove("//*[contains(@class, 'mw_header')]")
        add_class("mw_header mw_center")
      }
      wrap_together(".//div[contains(@class, 'mw_breadcrumb')]", "div", class: "mw_no_overflow")
    }
    //END HEADER
    table_dump(".//table")
    remove(".//div[@id='confirmTop']")
    remove(".//div[contains(@class, 'rightPanel')]")
    remove(".//div[contains(@class, 'leftPanel')]/br")
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
      remove(".//font[contains(@class, 'promodetails')]")
      remove(".//span[contains(@class, 'small_note_css')]")
      $(".//div[@align='left']") {
        add_class("mw_float_left")
        $("../../div") {
          add_class("mw_overflow_hidden")
        }
      }
    }
    //End remove
    //Make buttons
    $(".//img[contains(@alt, 'Send')]") {
      name("div")
      add_class("mw_btn1")
      text(fetch("./@alt"))
    }
    //End button
    $(".//div[contains(@class, 'card_logo_help')]") {
      make_two_column("./span[1]", "./span[1]")
      remove("../br")
    } 
    $(".//input[@type='text']") {
      add_class("mw_input")
    }
    $(".//div[@id='checkoutPanelsHolder']") {
      ur_toggler("./div[@id='goldCardInfoTitle']//div[contains(@class,'maincolor')]", "./div[@id='goldCardMemberTitle']")
    }
  }
}
