$("./body") {
  add_class("mw_profile_sub")
  remove(".//div[@class='srCheckoutBanner']")
  $(".//div[@id='processgoldCardAddress']") {
    table_dump(".//table")
  }
  //Tracking Order
  $(".//div[@id='processorderTracking']") {
    remove(".//br")
    table_dump(".//table")
    $(".//span[contains(@class, subheadlarge)]") {
      add_class("mw_header")
    }
    $(".//img") {
      $alt = fetch("./@alt")
      $("../../a") {
        add_class("mw_btn1")
        text($alt)
      }
      remove()
    }
  }
  //Billing address change
  $(".//div[@id='processaddress']") {
    remove(".//td/br")
    remove(".//font[contains(@class,'details')]")
    remove(".//td[@class='rightPanel']")
    $(".//div[@id='billingAddressTitle']|.//div[@id='shippingAddressTitle']") {
      add_class("mw_header mw_center")
    }
    
    $(".//td[@id='addressTitle']") {
      remove()
    }
    
    $(".//label") {
      wrap("p")
    }
    $(".//input[@type='image']") {
      add_class("mw_btn1")
      attributes(type: "submit", value: fetch("./@alt"))
    }
    $(".//img") {
      $alt = fetch("./@alt")
      $("../../a[not(contains(@class, 'details'))]") {
        add_class("details")
        text($alt)
        match($alt) {
          with (/Save/) {
            add_class("mw_btn1")
          }
        }
      }
      remove()
    }
    $(".//a[contains(@class, 'details')]") {
      $details = path()
      $("../p") {
        move_here($details)
      }
    }
    $(".//span[contains(@class, 'helpText')]") {
      $helpPath = path()
      $("../p") {
        move_here($helpPath)
      }
    }
    $(".//div[@id='addressShippingOptions']") {
      $("./div[@id='addressShippingOptionsTitle']") {
        inner_wrap("b")
      }
      $(".//div") {
        move_here(".//label")
        remove("./p")
      }
      insert_before("hr")
      insert_after("hr")
    }
    $(".//div") {
      wrap_nonempty_text("span") {
        match(fetch("./text()")) {
          with(/\|/) {
            remove()
          }
          with(/Preferred/) {
            move_to("//div[@id='addressBookTitle']", position("bottom"))
            wrap("div")
            $("//div[@class='address-book-entry']") {
              add_class("mw_green_border")
            }
          }
        }
      }
      remove("./br") 
    }
    $(".//div[contains(@class,'address-book-entry')]") {
      $("./p") {
        insert_after("hr")
        insert_bottom("div", class: "mw_text_right") {
          move_here("../a")
          $("./a[1]") {
            add_class("mw_float_left mw_btn1")
          }
          $("./a[2]") {
            add_class("mw_inline_block mw_btn2")
          }
        }
      }
    }
    $(".//select[@id='country']") {
      attributes(tabindex: "1")
    }
    $(".//input[@type='text']") {
      add_class("mw_input")
      match(fetch("./@id")) {
        with(/^zipCode$/) {
          attributes(type: "text", pattern: "[0-9]*")
        }
        with(/^addrPhone$/)  {
          attributes(type: "text", pattern: "[0-9]*")
        }
        with(/^emailAdd$/) {
          attribute("type", "email")
        }
      }

      $("../p") {
        move_here("../span") {
          add_class("helpText")
        }
        move_here("../a")
      }
    }
  }
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
  
  $(".//div") {
    match(fetch("./@id")) {
      with(/modUser/) {
        remove(".//td[contains(@class,'right')]")
        remove(".//br")
        table_dump(".//table")
        $(".//input[@type='password']") {
          add_class("mw_input")
        }
        $(".//input[@type='text']") {
          add_class("mw_input")
        }
        $(".//input[@type='image']") {
          attributes(value: "Continue", type: "submit")
          add_class("mw_btn1")
          move_to("../div//form")
        }
        $(".//div[contains(@class, 'maincolor')]") {
          add_class("mw_header")
        }
      }
    }  
  }
}
