$("./body") {
  $(".//div[@id='checkout']") {
    move_here(".//div[@id='footer']", position("bottom"))
  }
  add_class("mw_profile_login")
  $(".//div[@id='processlogin']") {
    remove(".//br") 
    //convert table to divs
    table_dump(".//table")
    
    //remove random text
    remove(".//font[@class='defaultCustServText']")

    $(".//div[contains(@class, 'subheadmed')]") {
      add_class("mw_header")
    }
    //fix header
    move_here(".//div[contains(@class, 'mw_header')]", "top")
    $true = '"true"' 
    $(".//img[contains(@src, 'padlock')]") {
      $("../../div["+$true+"]") {
        remove(".//br")
        add_class("mw_left_text")

        tdivide("./font", "./img")
        $("./table") {
          add_class("mw_shift_right")
        }
        
        wrap_text_children("p") {
          remove()
        }
        tdivide(".//a")
        $("./table[2]//td") {
          add_class("mw_center")
        }
      }
      $true = "asfsdfadsfdsf"
    }
    //remove text at these locations
    $(".//div") {
      $hasImage = 'false'
      $("./img[@align='middle']") {
        $hasImage = 'true'
      }
      match($hasImage, 'true') {
        remove()
      }
    }
    $(".//div") {
      match(fetch("./text()"), /If you would like to track/) {
        remove()
      }
      match(fetch("./b/text()"), /\(\xA0or\xA0\)/) {
        remove("../../../../div[2]")
      }
    }
    $(".//input[@type='text']") {
      add_class("mw_input")
      attributes(autocapitalize: "off", autocomplete: "off")
      match(fetch("./@id")) {
        with(/email/) {
          attributes(type: "email")
        }
        with(/(zip)|(Num)/) {
          attributes(type: "number")
        }
      }
    }
    $(".//input[@type='password']") {
      add_class("mw_input")
    }
    //replace images with buttons
    $(".//input[@type='image']") {
      match(fetch("./@src")) {
        with (/signin/) {
          add_class("mw_btn1")
          attributes(src: "", type: "submit", value: fetch("./@alt"))
        }
        with (/continuecheckout/) {
          add_class("mw_btn1")
          attributes(src: "", type: "submit", value: fetch("./@alt"))
        }
      }
    }
    //remove random help text
    remove(".//div[@rowspan='2']")
    $(".//img[contains(@alt, 'Checkout')]") {
      name("input")
      add_class("mw_btn1")
      attributes(src: "", type: 'button', value: fetch("./@alt"))
    }
    //format forgot your password/signin
    $(".//div[contains(@class, 'checkbg_lt')][./input]") {
      tdivide("./a","./input[@type='submit']")
      $("./table") {
        add_class("mw_shift_right mw_arrow")
      }
      wrap_nonempty_text("div", style: "margin: 10px 0px;")
    }
    $(".//div[contains(@class, 'checkbg_lt')][not(./input)]") {
      tdivide("./div", "./a")
      $("./table") {
        add_class("mw_shift_right mw_checkoutbtn mw_arrow")
      }
    }
    //add bars to header formatting
    $(".//div[contains(@class,'maincolor')]") {
      add_class("mw_bar1")
    }
    
    $(".//form") {
      move_here("../../div[2]")
    }
  }
  $(".//div[@id='checkout']") {
    remove(".//table[@width]")
  }
}
