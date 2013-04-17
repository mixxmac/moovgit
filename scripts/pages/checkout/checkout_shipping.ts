$("./body") {
  add_class("mw_checkout_shipping")
  $(".//div[@id='checkout']") {
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
        //remove("//*[contains(@class, 'mw_header')]")
        //add_class("mw_header mw_center")
        remove()
      }
      wrap_together(".//div[contains(@class, 'mw_breadcrumb')]", "div", class: "mw_no_overflow")
    }
  }
  $(".//div[@id='mainContent']") {
    table_dump(".//table")
    remove(".//br")
    remove(".//div[contains(@class, 'rightPanel')]")
    remove(".//font[contains(@class, 'defaultCustServText')]") 
    remove(".//div[@id='items']")
    remove(".//*[contains(@class, 'subheadmed')]")
    $(".//form") {
      $(".//div") {
        remove_self_if_empty()
        $("./span") {
          wrap_text_children("span") {
            remove()
          }
          $("./span") {
            name("div")
            attribute("class","mw_radio_text")
            move_here("../a[1]", position("after")) {
              wrap("div") {
                add_class("mw_details")
              }
            }
            wrap("div") {
              move_here("../input[1]", position("top"))
            }
          }
        }
      }
    }
    
    $(".//img[contains(@src, 'continue')]") {
      name("div")
      add_class("mw_btn1")
      text(fetch("./@alt"))
      remove("../../../br")
      $("../../a") {
        inner_wrap("div", class:"mw_has_btn")
      }
    }
  }
}
