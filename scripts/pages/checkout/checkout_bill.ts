$("./body") {
  add_class("mw_bill")
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
    table_dump(".//table")
    $(".//div[not(contains(@class, 'wiz'))][contains(@class, 'maincolor')]") {
      add_class("mw_bar1")
    }
    $(".//input[@type='text']") {
      add_class("mw_input")
      $("../../div") {
        wrap_nonempty_text("span")
      }
      $("../a|../span"){
       $p = path() 
        $("../../div[1]") {
          move_here($p)
        }
      }
    }
    $(".//input[@id='tcAgree']") {
      $("../../div") {
        add_class("mw_margin")
      }
    }
    $(".//div[contains(@class,'bml_ssn')]") {
      add_class('mw_inline')
      $("./input") {
        add_class("mw_inline")
      }
    }
    $(".//div[@id='tcFrameTr']") {
      insert_before("div") {
        text("Full Terms and Conditions")
        add_class("mw_bar1")
      }
      $("../../div") {
        ur_toggler("./div[contains(@class,'mw_bar1')]", "./div[@id='tcFrameTr']")
      }
    }
    $(".//img[contains(@src,'cart')]") {
      name("div")
      text(fetch("./@alt"))
      match(fetch("./@src")) {
        with(/cart2/) {
          add_class("mw_btn2")
        }
        with(/cart/) {
          add_class("mw_btn1")
        }
      }
    }
    $(".//a[@target='new']") {
      $("../../div[contains(@class, 'details')]") {
        add_class("mw_center")
      }
    }
  }
}
