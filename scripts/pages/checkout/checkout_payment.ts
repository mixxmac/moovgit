$("./body") {
  add_class("mw_checkout_payment")
  //HEADER
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
        remove("//*[contains(@class, 'mw_header')]")
        add_class("mw_header mw_center")
      }
      wrap_together(".//div[contains(@class, 'mw_breadcrumb')]", "div", class: "mw_no_overflow")
    }
    //END HEADER
    //Content manipulation
    $(".//div[@id='mainContent']") {
      table_dump(".//table")
      remove(".//div[contains(@class, 'paymentOption')]")
      remove(".//div[contains(@class,'rightPanel')]")
      
      $(".//input[@type='text']") {
        add_class("mw_input")
      }
      $(".//div[@id='newCCContainer']") {
        $("./div[contains(@class, 'ccForm')]") {
          $("./div") {
            $("./input|./span") {
              add_class("mw_row")
            }
          }
        }
        $(".//input[@type='text']") {
          match(fetch("./@id")) {
            with(/^crdNumbr$/) {
              attribute("pattern","[0-9]*")
            }
            with(/^ccPin$/) {
              attribute("pattern","[0-9]*")
            }
            with(/^cardExpDate/) {
              attribute("pattern","[0-9]*")
            }
          }

          $("../a"){
            remove()
          }
          $("../../*") {
            wrap_nonempty_text("span")
          }
        }
        $(".//div[@id='ccMoYr']") {
          wrap_nonempty_text("span")
          $("./span") {
            attributes(style: "")
          }
        }
      }
      $(".//div[@id='paypalContainer']") {
        wrap_text_children("span") {
          text() {
            replace(/\(|\)/, "")
          }
          remove_self_if_empty()
        }
      }
      $(".//div[@id='billMeLaterContainer']/div") {
        wrap_text_children("span") {
          text() {
            replace(/\(|\)/, "")
          }
          remove_self_if_empty()
        }
      }
      $(".//input[@type='image']") {
        add_class("mw_btn2")
        attributes(type: "button", value: fetch("./@alt"))
      }
      $(".//div[@id='giftPanel']") {
        remove(".//span")
        $("./dl") {
          $("./dt") {
            add_class("mw_bar1")
          }
          $("./dd") {
            $(".//input[@type='text']") {
              attribute("pattern", "[0-9]*")
            }
          }
          ur_toggler("./dt", "./dd")
        }
      }
      $(".//div[@id='promoPanel']") {
        remove(".//span")
        $("./dl") {
          $("./dt") {
            add_class("mw_bar1")
          }
          ur_toggler("./dt", "./dd")
        }
      }
      $(".//div[@id = 'continueCheckout']") {
        $(".//img") {
          name("div")
          add_class("mw_btn1")
          text(fetch("./@alt"))
        }
      }
      $(".//div[contains(@class, 'card_logo_help')]") {
        make_two_column("./span[1]", "./span[1]")
      } 
    }
  }
}
